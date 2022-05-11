$(document).ready(function () {
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
                    <tr>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div class="text-sm leading-5 text-gray-900">${product.id}</div>
                        </td>

                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div class="text-sm leading-5 text-gray-900">${product.name}</div>
                        </td>

                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div class="text-sm leading-5 text-gray-900">${product.cost}</div>
                        </td>
                        
                        <td
                            class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                            <div class="text-sm leading-5 text-gray-900">${product.category}</div>
                        </td>
                        
                        <td
                            class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                            <div class="text-sm leading-5 text-gray-900">quantity</div>
                        </td>

                        <td
                            class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
                            <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit</a>
                        </td>
                        
                    </tr>
                `;
            });

            document.getElementById("product-list-table").innerHTML =
                productsHTML;
        },
        type: "GET",
    });

    let modal = document.getElementById("myModal");

    let btn = document.getElementById("myBtn");

    let span = document.getElementsByClassName("close")[0];

    btn.onclick = function () {
        modal.style.display = "block";
    };

    span.onclick = function () {
        modal.style.display = "none";
    };

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

    let form = document.getElementById("form-add-product");
    form.addEventListener("submit", (event) => {
        let name = form.elements["name"].value;
        let origin = form.elements["origin"].value;
        let brand = form.elements["brand"].value;
        let category = form.elements["category"].value;
        let material = form.elements["material"].value;
        let weight = parseFloat(form.elements["weight"].value);
        let height = parseFloat(form.elements["height"].value);
        let width = parseFloat(form.elements["width"].value);
        let image = form.elements["image"].value;
        let cost = parseFloat(form.elements["cost"].value);
        let description = form.elements["description"].value;

        let newProduct = {
            name,
            origin,
            brand,
            category,
            material,
            height,
            width,
            image,
            cost,
            description,
        };

        console.log(newProduct);

        event.preventDefault();

        $.ajax({
            url: "http://localhost:8083/products",
            type: "POST",
            data: JSON.stringify(newProduct),
            async: true,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (result) {
                window.location.href = "http://localhost:8080/productManager";
            },
            error: function (textStatus, errorThrown) {
                console.log("Error: " + textStatus + errorThrown);
            },
        });
    });
});

