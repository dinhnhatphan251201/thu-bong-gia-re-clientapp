$(document).ready(function () {
    // $("#product-list").html(function () {
    //     return `
    //     `;
    // });

    $.ajax({
        url: "http://localhost:8083/products",
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("Error: " + textStatus + " - " + errorThrown);
        },
        success: function (data) {
            let products = data;
            let productsHTML = "";

            products.map((product) => {
                productsHTML =
                    productsHTML +
                    `
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
            });

            document.getElementById("product-list").innerHTML = productsHTML;
        },
        type: "GET",
    });

    // $.get("http://localhost:8083/products", (data) => {
    //     console.log(data);
    // });

    document
        .getElementById("sort-product-ASC")
        .addEventListener("click", function () {
            $.ajax({
                url: "http://localhost:8083/products?name=costASC",
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log("Error: " + textStatus + " - " + errorThrown);
                },
                success: function (data) {
                    console.log("vao roi ba");
                    let products = data;
                    let productsHTML = "";

                    products.map((product) => {
                        productsHTML =
                            productsHTML +
                            `
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
                    });

                    document.getElementById("product-list-table").innerHTML =
                        productsHTML;
                },
                type: "GET",
            });
        });
});
