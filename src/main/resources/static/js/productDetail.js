const api = "http://localhost:8083";
let productDetail;
let quantity_inventory = 0;
let quantity_cart = 0;
let token = localStorage.getItem("token");

$(document).ready(function () {
    let url = window.location.pathname;
    let id = url.substring(url.lastIndexOf("/") + 1);
    let token = localStorage.getItem("token");

    $.ajax({
        url: `${api}/products/${id}`,
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("Error: " + textStatus + " - " + errorThrown);
        },
        success: function (data) {
            productDetail = data;
            let product = data;
            let productsHTML = "";

            productsHTML = `
                    <div class="grid grid-cols-3 wide">
                        <div class="col-span-1 bg-[#fff]">
                            <div class="p-[80px]">
                                <img src="${product.image}" alt="">
                            </div>
                        </div>
                        <div class="col-span-2 bg-[#fff]">
                            <div class="py-[80px] mx-[20px]">
                                <h1 class="text-4xl">${product.name}</h1>
                                <span class="text-3xl block mt-[10px]">${product.cost.toLocaleString(
                                    "it-IT",
                                    { style: "currency", currency: "VND" }
                                )}</span>
                                <p class="text-xl block mt-[10px]">
                                    ${product.description}
                                </p>
                                <span class="text-3xl block mt-[10px]" id="quantity_Inventory">sản phẩm còn trong kho: </span>
                                <div class="grid grid-cols-6 wide pt-4 pb-4">
                                <div class="col-span-2 grid grid-cols-5 mt-3">
                                    <div class="col-span-3 text-2xl text-[#999999]">
                                        Loại sản phẩm
                                    </div>
                                    <div class="col-span-2 text-2xl">
                                        ${product.category}
                                    </div>
                                </div>
                                <div class="col-span-3"></div>
                                <div class="col-span-2 grid grid-cols-5 mt-3">
                                    <div class="col-span-3 text-2xl text-[#999999]">
                                        Chất liệu
                                    </div>
                                    <div class="col-span-2 text-2xl">
                                        ${product.material}
                                    </div>
                                </div>
                                <div class="col-span-3"></div>
                                <div class="col-span-2 grid grid-cols-5 mt-3">
                                    <div class="col-span-3 text-2xl text-[#999999]">
                                        Chiều dài
                                    </div>
                                    <div class="col-span-2 text-2xl">
                                        ${product.width} cm
                                    </div>
                                </div>
                                <div class="col-span-3"></div>
                                <div class="col-span-2 grid grid-cols-5 mt-3">
                                    <div class="col-span-3 text-2xl text-[#999999]">
                                        Chiều cao
                                    </div>
                                    <div class="col-span-2 text-2xl">
                                        ${product.height} cm
                                    </div>
                                </div>
                                <div class="col-span-3"></div>
                                <div class="col-span-2 grid grid-cols-5 mt-3">
                                    <div class="col-span-3 text-2xl text-[#999999]">
                                        Trọng lượng
                                    </div>
                                    <div class="col-span-2 text-2xl">
                                        ${product.weight} g
                                    </div>
                                </div>
                                <div class="col-span-3"></div>
                                <div class="col-span-2 grid grid-cols-5 mt-3">
                                    <div class="col-span-3 text-2xl text-[#999999]">
                                        Xuất xứ
                                    </div>
                                    <div class="col-span-2 text-2xl">
                                        ${product.origin}
                                    </div>
                                </div>
                                <div class="col-span-3"></div>
                                
                            </div>
                                <div class="counter mt-[10px]">
                                    <span class="down" onClick='decreaseCount(event, this)'>-</span>
                                    <input type="text" class="text-ml" id="product-quantity" value="1">
                                    <span class="up"  onClick='increaseCount(event, this)'>+</span>
                                </div>
                                    <button id="btn-buy-product" class="header__search-btn mt-[30px] text-lg">
                                        <span class="text-white">Mua ngay</span>
                                    </button>
                            </div>
                        </div>
                    </div>
                `;

            // document.getElementById("app_container").innerHTML = productsHTML;
            $("#app_container").append(productsHTML);

            $("#btn-buy-product").click(function (event) {
                event.preventDefault();

                let token = localStorage.getItem("token");
                let quantity = parseInt($("#product-quantity").val());
                let productId = product.id;
                let cost = product.cost;

                let cartDetail = {
                    cart: token,
                    product: productId,
                    quantity: quantity,
                    cost: cost,
                    totalLine: cost * quantity,
                };

                $.ajax({
                    url: `${api}/carts/detail`,
                    type: "POST",
                    data: JSON.stringify(cartDetail),
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
                        window.location.href = "http://localhost:8080/cart";
                    },
                    error: function (textStatus, errorThrown) {
                        console.log("Error: " + textStatus + errorThrown);
                    },
                });
            });
        },
        type: "GET",
    });

    $.ajax({
        url: `${api}/productInventory/${id}`,
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("Error: " + textStatus + " - " + errorThrown);
        },
        success: function (data) {
            quantity_inventory = data.quantity;
            let product_Inventory = data;
            $("#quantity_Inventory").append(`${product_Inventory.quantity}`);
            quantity = product_Inventory;
        },
        type: "GET",
    });

    $("#btnSearch").click(() => {
        let value = $("#txtSearch").val();

        $.ajax({
            url: `${api}/products?name=${value}`,
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("Error: " + textStatus + " - " + errorThrown);
            },
            success: function (data) {
                window.location.href = "http://localhost:8080/products";
                let products = data;

                $("#product-list").html(() => {
                    return "";
                });

                products.map((product) => {
                    let productsHTML = `
                            <div class="col l-2-4 m-4 c-6">
                                <a href="/products/${product.id}" class="home-product-item">
                                    <div class="home-product-item__img"
                                        style="background-image: url(${product.image})">
                                    </div>
                                    <h4 class="home-product-item__name">${product.name}</h4>
                                    <div class="home-product-item__price">
                                        <span class="home-product-item__price-current">${product.cost}</span>
                                    </div>
                                    <div class="home-product-item__action">
                                        <span class="home-product-item__like home-product-item__like--liked">
                                            <i class="home-product-item__like-icon-empty far fa-heart"></i>
                                            <i class="home-product-item__like-icon-fill fas fa-heart"></i>
                                        </span>
                                        <div class="home-product-item__rating">
                                            <i class="home-product-item__star--gold fas fa-star"></i>
                                            <i class="home-product-item__star--gold fas fa-star"></i>
                                            <i class="home-product-item__star--gold fas fa-star"></i>
                                            <i class="home-product-item__star--gold fas fa-star"></i>
                                            <i class=" fas fa-star"></i>
                                        </div>
                                        <span class="home-product-item__sold">88 Đã bán</span>
                                    </div>
                                    <div class="home-product-item__origin">
                                        <span class="home-product-item__brand">${product.category}</span>
                                        <span class="home-product-item__origin-name"></span>
                                    </div>
                                    <div class="home-product-item__favourite">
                                        <i class="fas fa-check"></i>
                                        <span>Yêu thích</span>
                                    </div>
                                </a>
                            </div>
                    `;

                    $("#product-list").append(productsHTML);
                });
            },
            type: "GET",
        });
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

    $.ajax({
        url: `${api}/carts/${token}`,
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("Error: " + textStatus + " - " + errorThrown);
        },
        success: function (data) {
            let cart = data;

            quantity_cart = cart.cartDetails.filter(
                (cartDetail) => cartDetail.product === productDetail.id
            )[0].quantity;
            console.log(quantity_cart);
        },
        type: "GET",
    });
});

function increaseCount(a, b) {
    let input = b.previousElementSibling;
    let value = parseInt(input.value, 10);
    value = isNaN(value) ? 0 : value;
    // console.log(productDetail);
    console.log(quantity_inventory);

    if (value + quantity_cart < quantity_inventory) {
        value++;
    } else {
        alert("Số lượng cần mua vượt quá mức trong kho");
    }

    input.value = value;
}
function decreaseCount(a, b) {
    let input = b.nextElementSibling;
    let value = parseInt(input.value, 10);
    if (value > 1) {
        value = isNaN(value) ? 0 : value;
        value--;
        input.value = value;
    }
}
