const api = "http://localhost:8083";

$(document).ready(function () {
    let token = localStorage.getItem("token");

    $.ajax({
        url: `${api}/carts/${token}`,
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("Error: " + textStatus + " - " + errorThrown);
        },
        success: function (data) {
            let cart = data;

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
                                <div class="flex cursor-pointer" onClick='navigateProductDetail(${
                                    product.id
                                })'>
                                    <div class="w-[20%] mr-3">
                                        <img
                                            class="w-full h-full object-cover"
                                            src=${product.image}
                                            alt=""
                                        />
                                    </div>
                                    <div class="w-[70%]">
                                        <h3 class="cartdetail__item h-[95px] font-medium text-2xl">
                                            ${product.name}
                                        </h3>
                                        <span class="text-xl">Phân loại: ${
                                            product.category
                                        }</span>
                                    </div>
                                </div>
                                <div class="flex flex-col">
                                    <span class="text-xl">
                                        ${cartDetail.cost.toLocaleString(
                                            "it-IT",
                                            {
                                                style: "currency",
                                                currency: "VND",
                                            }
                                        )} X ${cartDetail.quantity}
                                    </span>
                                    <div class="flex flex-row-reverse mt-[60px]">
                                        <div class="text-xl bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 cursor-pointer" id="delete-product-in-cart" onClick='deleteProductInCart(${
                                            product.id
                                        })'>
                                            Xóa
                                        </div>
                                    </div>
                                </div>
                            </li>
                            `;

                        $("#cart").append(productsHTML);
                    },
                    type: "GET",
                });
            });

            let totalQuantity = 0;
            let total = 0;

            cart.cartDetails.map((cartDetail) => {
                totalQuantity += cartDetail.quantity;
                total += cartDetail.totalLine;
            });

            $("#total-quantity").append(totalQuantity);
            $("#total").append(
                total.toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                })
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
                return `${totalQuantity}`;
            });
        },
        type: "GET",
    });
});

function deleteProductInCart(productId) {
    $.ajax({
        url: `${api}/carts/detail`,
        type: "DELETE",
        data: JSON.stringify({
            token: localStorage.getItem("token"),
            product: productId,
        }),
        async: true,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
            xhr.setRequestHeader("Accept", "application/json");
            xhr.setRequestHeader("Content-Type", "application/json");
        },
        success: function (result) {
            window.location.href = `http://localhost:8080/cart`;
        },
        error: function (textStatus, errorThrown) {
            console.log("Error: " + textStatus + errorThrown);
        },
    });
}

function navigateProductDetail(productId) {
    window.location.href = `http://localhost:8080/products/${productId}`;
}
