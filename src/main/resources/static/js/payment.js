const api = "http://localhost:8083";

$(document).ready(function () {
    let token = localStorage.getItem("token");
    let cartDetails;

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
                                    <div class="flex flex-row-reverse">
                                        <div class="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 cursor-pointer text-xl mt-3">
                                            Xóa
                                        </div>
                                    </div>
                                </div>
                            </li>
                            `;

                        $("#cart-payment").append(productsHTML);
                    },
                    type: "GET",
                });
            });

            let subTotal = 0;
            let shippingCost = 35000;

            cart.cartDetails.map((cartDetail) => {
                subTotal += cartDetail.totalLine;
            });

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

                let shippingCost = 35000;
                let shippingNote = form.elements["shippingNote"].value;
                let shippingAddress = form.elements["shippingAddress"].value;
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
                        window.location.href = "http://localhost:8080/products";
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
    });
});
