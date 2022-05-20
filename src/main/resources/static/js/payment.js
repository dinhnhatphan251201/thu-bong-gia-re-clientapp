const api = "http://localhost:8083";
const client = "http://localhost:8080";

$(document).ready(function () {
    let token = localStorage.getItem("token");
    let cartDetails;
    let total = 0;
    let checkPromotion = true;

    $.ajax({
        url: `${api}/carts/${token}`,
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("Error: " + textStatus + " - " + errorThrown);
        },
        success: function (data) {
            let cart = data;
            cartDetails = data.cartDetails;

            cart.cartDetails.map((cartDetail) => {
                $.ajax({
                    url: `${api}/products/${cartDetail.product}`,
                    error: function (jqXHR, textStatus, errorThrown) {
                        console.log(
                            "Error: " + textStatus + " - " + errorThrown
                        );
                    },
                    success: function (data) {
                        let product = data;

                        let productsHTML = `
                            <li class="flex justify-between mb-4 p-2 border-b-2" >
                                <div class="flex">
                                    <div class="w-[20%] mr-3">
                                        <img class="w-full h-full object-cover" src=${
                                            product.image
                                        } />
                                    </div>
                                    <div class="w-[70%]">
                                        <h3 class="text-2xl cartdetail__item h-[65px] font-medium">
                                            ${product.name}
                                        </h3>
                                        <span class="text-xl">Phân loại: ${
                                            product.category
                                        }</span>
                                    </div>
                                </div>
                                <div class="flex flex-col">
                                    <span class="text-2xl">${cartDetail.cost.toLocaleString(
                                        "it-IT",
                                        { style: "currency", currency: "VND" }
                                    )} X ${cartDetail.quantity}</span>
                                            
                                </div>
                            </li>
                            `;

                        $("#cart-payment").append(productsHTML);
                    },
                    type: "GET",
                });
            });

            let subTotal = 0;
            let shippingCost = 20000;

            cart.cartDetails.map((cartDetail) => {
                subTotal += cartDetail.totalLine;
            });

            total = subTotal + shippingCost;

            $("#sub-total").append(
                `${subTotal.toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                })}`
            );
            $("#shipping-cost").append(
                `${shippingCost.toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                })}`
            );
            $("#total").append(
                `${(subTotal + shippingCost).toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                })}`
            );
        },
        type: "GET",
    });

    $.ajax({
        url: `${api}/carts/${token}`,
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("Error: " + textStatus + " - " + errorThrown);
        },
        success: function (data) {
            let cart = data;
            let totalQuantity = 0;

            cart.cartDetails.map((cartDetail) => {
                totalQuantity += cartDetail.quantity;
            });

            $("#quantity-cart-icon").html(() => {
                return totalQuantity;
            });
        },
        type: "GET",
    });

    let form = document.getElementById("form-order");
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        if (cartDetails.length === 0) {
            alert("Giỏ hàng đang trống, vui lòng kiểm tra lại");
        } else if (checkPromotion === false) {
            alert("Vui lòng kiểm tra lại mã giảm giá");
        } else {
            event.preventDefault();
            let name = form.elements["name"].value;
            let email = form.elements["email"].value;
            let phoneNumber = form.elements["phoneNumber"].value;

            let newCustomer = {
                name,
                email,
                phoneNumber,
            };

            $.ajax({
                url: `${api}/customers`,
                type: "POST",
                data: JSON.stringify(newCustomer),
                async: true,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
                    xhr.setRequestHeader("Accept", "application/json");
                    xhr.setRequestHeader("Content-Type", "application/json");
                },
                success: function (result) {
                    console.log(result);

                    let shippingCost = 20000;
                    let shippingNote = form.elements["shippingNote"].value;
                    let shippingAddress =
                        form.elements["shippingAddress"].value;
                    let promotionCode = $("#promotionCode").val();
                    if (promotionCode === "") {
                        promotionCode = null;
                    }
                    let details = [];

                    cartDetails.map((cartDetail) => {
                        let temp = {
                            product: cartDetail.product,
                            quantity: cartDetail.quantity,
                        };
                        details.push(temp);
                    });

                    let order = {
                        shippingCost: shippingCost,
                        shippingAddress: shippingAddress,
                        customer: result.id,
                        promotionCode: promotionCode,
                        shippingNote: shippingNote,
                        details: [...details],
                    };

                    console.log(order);

                    $.ajax({
                        url: `${api}/orders`,
                        type: "POST",
                        data: JSON.stringify(order),
                        async: true,
                        beforeSend: function (xhr) {
                            xhr.setRequestHeader(
                                "Access-Control-Allow-Origin",
                                "*"
                            );
                            xhr.setRequestHeader("Accept", "application/json");
                            xhr.setRequestHeader(
                                "Content-Type",
                                "application/json"
                            );
                        },
                        success: function (result) {
                            alert(
                                `   Đặt hàng thành công
                                    Mã hóa đơn của bạn là: ${result.id}
                                    Tổng tiền phải thanh toán: ${result.total}
                                    Địa chỉ: ${result.shippingAddress}
                                    `
                            );
                            $.ajax({
                                url: `${api}/carts/detail/${token}`,
                                type: "DELETE",
                                async: true,
                                beforeSend: function (xhr) {
                                    xhr.setRequestHeader(
                                        "Access-Control-Allow-Origin",
                                        "*"
                                    );
                                    xhr.setRequestHeader(
                                        "Accept",
                                        "application/json"
                                    );
                                    xhr.setRequestHeader(
                                        "Content-Type",
                                        "application/json"
                                    );
                                },
                                success: function (result) {
                                    window.location.href = `${client}/products`;
                                },
                                error: function (textStatus, errorThrown) {
                                    console.log(
                                        "Error: " + textStatus + errorThrown
                                    );
                                },
                            });
                        },
                        error: function (textStatus, errorThrown) {
                            console.log("Error: " + textStatus + errorThrown);
                        },
                    });
                },
                error: function (textStatus, errorThrown) {
                    console.log("Error: " + textStatus + errorThrown);
                },
            });
        }
    });

    //check promotion

    $("#promotionCode").blur(() => {
        let promotionCode = $("#promotionCode").val();

        $.ajax({
            url: `${api}/promotions/promotionCode?promotionCode=${promotionCode}`,
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("Error: " + textStatus + " - " + errorThrown);
            },
            success: function (data) {
                let today, day, month, year;
                if (data.id) {
                    day = data.expiredDate.split("T")[0].split("-")[2];
                    month = data.expiredDate.split("T")[0].split("-")[1];
                    year = data.expiredDate.split("T")[0].split("-")[0];

                    today = new Date();
                }

                if (promotionCode == "") {
                    $("#promotionCode").removeClass("text-red-600");
                    $("#promotionNotifycation").html(function () {
                        return "";
                    });

                    $("#discount").html(function () {
                        return `${0 + "%"}`;
                    });

                    $("#total").html(function () {
                        return `${total.toLocaleString("it-IT", {
                            style: "currency",
                            currency: "VND",
                        })}`;
                    });
                    checkPromotion = true;
                } else if (!data.id) {
                    $("#promotionCode").addClass("text-red-600");
                    $("#promotionNotifycation").html(function () {
                        return "Mã khuyến mãi không hợp lệ";
                    });

                    $("#discount").html(function () {
                        return `${0 + "%"}`;
                    });

                    $("#total").html(function () {
                        return `${total.toLocaleString("it-IT", {
                            style: "currency",
                            currency: "VND",
                        })}`;
                    });
                    checkPromotion = false;
                } else if (!checkDate(today, day, month, year)) {
                    $("#promotionCode").addClass("text-red-600");
                    $("#promotionNotifycation").html(function () {
                        return "Mã khuyến mãi đã quá hạn sử dụng";
                    });

                    $("#discount").html(function () {
                        return `${0 + "%"}`;
                    });

                    $("#total").html(function () {
                        return `${total.toLocaleString("it-IT", {
                            style: "currency",
                            currency: "VND",
                        })}`;
                    });
                    checkPromotion = false;
                } else if (data.limit <= 0) {
                    $("#promotionCode").addClass("text-red-600");
                    $("#promotionNotifycation").html(function () {
                        return "Mã khuyến mãi đã quá số lượng dùng";
                    });

                    $("#discount").html(function () {
                        return `${0 + "%"}`;
                    });

                    $("#total").html(function () {
                        return `${total.toLocaleString("it-IT", {
                            style: "currency",
                            currency: "VND",
                        })}`;
                    });
                    checkPromotion = false;
                } else {
                    $("#promotionCode").removeClass("text-red-600");
                    $("#promotionNotifycation").html(function () {
                        return "";
                    });

                    $("#discount").html(function () {
                        return `${data.deducted * 100 + "%"}`;
                    });

                    $("#total").html(function () {
                        return `${(total * (1 - data.deducted)).toLocaleString(
                            "it-IT",
                            {
                                style: "currency",
                                currency: "VND",
                            }
                        )}`;
                    });
                    checkPromotion = true;
                }
            },
            type: "GET",
        });
    });
});

function checkDate(today, day, month, year) {
    if (year >= today.getFullYear()) {
        if (month >= today.getMonth() + 1) {
            if (day > today.getDate()) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    } else {
        return false;
    }
}
