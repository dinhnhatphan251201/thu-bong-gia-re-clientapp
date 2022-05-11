$(document).ready(function () {
    let url = window.location.pathname;
    let id = url.substring(url.lastIndexOf("/") + 1);

    $.ajax({
        url: `http://localhost:8083/products/${id}`,
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("Error: " + textStatus + " - " + errorThrown);
        },
        success: function (data) {
            let product = data;
            let productsHTML = "";

            productsHTML =
                productsHTML +
                `
                    <div class="grid grid-cols-3 wide">
                        <div class="col-span-1 bg-[#fff]">
                            <div class="p-[80px]">
                                <img src="${product.image}" alt="">
                            </div>
                        </div>
                        <div class="col-span-2 bg-[#fff]">
                            <div class="py-[80px] mx-[20px]">
                                <h1 class="text-4xl">${product.name}</h1>
                                <span class="text-3xl block mt-[10px]">${product.cost}</span>
                                <p class="text-xl block mt-[10px]">
                                    ${product.description}
                                </p>
                                <div class="counter mt-[10px]">
                                    <span class="down" onClick='decreaseCount(event, this)'>-</span>
                                    <input type="text" class="text-ml" id="product-quantity" value="1">
                                    <span class="up"  onClick='increaseCount(event, this)'>+</span>
                                </div>
                                    <button id="btn-buy-product" class="header__search-btn mt-[30px] text-lg" onClick='testQuantity()'>
                                        <span class="text-white">Mua ngay</span>
                                    </button>
                            </div>
                        </div>
                    </div>
                `;

            document.getElementById("app_container").innerHTML = productsHTML;
        },
        type: "GET",
    });

    // $("#btn-buy-product").click(function (event) {
    //     event.preventDefault();

    // });
});

function testQuantity() {
    let quantity = document.getElementById("product-quantity").value;

    console.log(quantity);
}
