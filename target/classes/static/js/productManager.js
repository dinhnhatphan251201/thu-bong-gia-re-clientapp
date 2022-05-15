const api = "http://localhost:8083";

$(document).ready(function () {
    $.ajax({
        url: "http://localhost:8083/products",
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("Error: " + textStatus + " - " + errorThrown);
        },
        success: function (data) {
            let products = data;

            products.map((product) => {
                let productsHTML = `
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
                            <a class="text-indigo-600 hover:text-indigo-900" onClick='openModelUpdate(${product.id})'>Edit</a>
                        </td>
                        
                    </tr>
                `;

                $("#product-list-table").append(productsHTML);
            });
        },
        type: "GET",
    });

    let modalAdd = $("#myModalAdd");

    let btnAdd = $("#myBtnAdd");

    let spanCloseAdd = $("#closeModelAdd");

    btnAdd.click(function () {
        modalAdd.css("display", "block");
    });

    spanCloseAdd.click(function () {
        modalAdd.hide();
    });

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
            weight,
            height,
            width,
            image,
            cost,
            description,
        };

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

    let formUpdate = document.getElementById("form-update-product");
    formUpdate.addEventListener("submit", (event) => {
        let id = formUpdate.elements["id"].value;
        let name = formUpdate.elements["name"].value;
        let origin = formUpdate.elements["origin"].value;
        let brand = formUpdate.elements["brand"].value;
        let category = formUpdate.elements["category"].value;
        let material = formUpdate.elements["material"].value;
        let weight = parseFloat(formUpdate.elements["weight"].value);
        let height = parseFloat(formUpdate.elements["height"].value);
        let width = parseFloat(formUpdate.elements["width"].value);
        let image = formUpdate.elements["image"].value;
        let cost = parseFloat(formUpdate.elements["cost"].value);
        let description = formUpdate.elements["description"].value;

        let quantity = parseInt(formUpdate.elements["quantity"].value);

        let newProduct = {
            id,
            name,
            origin,
            brand,
            category,
            material,
            weight,
            height,
            width,
            image,
            cost,
            description,
        };

        event.preventDefault();

        $.ajax({
            url: "http://localhost:8083/products",
            type: "PUT",
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

        $.ajax({
            url: `${api}/productInventory`,
            type: "PUT",
            data: JSON.stringify({
                id: newProduct.id,
                quantity: quantity,
            }),
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

function openModelUpdate(id) {
    let modalUpdate = $("#myModalUpdate");
    modalUpdate.css("display", "block");
    console.log("btn update click:" + id);

    let spanCloseUpdate = $("#closeModelUpdate");

    spanCloseUpdate.click(function () {
        modalUpdate.hide();
    });

    $.ajax({
        url: `${api}/products/${id}`,
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("Error: " + textStatus + " - " + errorThrown);
        },
        success: function (data) {
            let product = data;
            let formUpdate = document.getElementById("form-update-product");
            formUpdate.elements["id"].value = product.id;
            formUpdate.elements["name"].value = product.name;
            formUpdate.elements["origin"].value = product.origin;
            formUpdate.elements["brand"].value = product.brand;
            formUpdate.elements["category"].value = product.category;
            formUpdate.elements["material"].value = product.material;
            formUpdate.elements["weight"].value = product.weight;
            formUpdate.elements["height"].value = product.height;
            formUpdate.elements["width"].value = product.width;
            formUpdate.elements["image"].value = product.image;
            formUpdate.elements["cost"].value = product.cost;
            formUpdate.elements["description"].value = product.description;
        },
        type: "GET",
    });

    $.ajax({
        url: `${api}/productInventory/${id}`,
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("Error: " + textStatus + " - " + errorThrown);
        },
        success: function (data) {
            let product_Inventory = data;
            let formUpdate = document.getElementById("form-update-product");
            formUpdate.elements["quantityInventory"].value =
                product_Inventory.quantity;
        },
        type: "GET",
    });
}
