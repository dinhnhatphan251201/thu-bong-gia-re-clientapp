const api = "http://localhost:8083";

$(document).ready(function () {
    // $("#product-list").html(function () {
    //     return `
    //     `;
    // });
    let token = localStorage.getItem("token");

    $.ajax({
        url: `${api}/products`,
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("Error: " + textStatus + " - " + errorThrown);
        },
        success: function (data) {
            let products = data;

            products.map((product) => {
                let productsHTML = `
                            <div class="col l-2-4 m-4 c-6">
                                <a href="/products/${
                                    product.id
                                }" class="home-product-item">
                                    <div class="home-product-item__img"
                                        style="background-image: url(${
                                            product.image
                                        })">
                                    </div>
                                    <h4 class="home-product-item__name">${
                                        product.name
                                    }</h4>
                                    <div class="home-product-item__price">
                                        <span class="home-product-item__price-current">${product.cost.toLocaleString(
                                            "it-IT",
                                            {
                                                style: "currency",
                                                currency: "VND",
                                            }
                                        )}</span>
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
                                        <span class="home-product-item__sold">${
                                            product.origin
                                        }</span>
                                    </div>
                                    <div class="home-product-item__origin">
                                        <span class="home-product-item__brand">${
                                            product.category
                                        }</span>
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

    $("#sort-product-ASC").click(function () {
        $.ajax({
            url: `${api}/products?sortBy=cost&sort=asc`,
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("Error: " + textStatus + " - " + errorThrown);
            },
            success: function (data) {
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

                $("#select-input__label").html(() => {
                    return "Giá: Thấp đến cao";
                });
            },
            type: "GET",
        });
    });

    $("#sort-product-DESC").click(function () {
        $.ajax({
            url: `${api}/products?sortBy=cost&sort=desc`,
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("Error: " + textStatus + " - " + errorThrown);
            },
            success: function (data) {
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

                $("#select-input__label").html(() => {
                    return "Giá: Cao đến thấp";
                });
            },
            type: "GET",
        });
    });

    $("#btnSearch").click(() => {
        let value = $("#txtSearch").val();

        $.ajax({
            url: `${api}/products?name=${value}`,
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("Error: " + textStatus + " - " + errorThrown);
            },
            success: function (data) {
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
});
