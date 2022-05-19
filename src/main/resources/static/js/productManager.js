const api = "http://localhost:8083";
const client = "http://localhost:8080";

if (!localStorage.getItem("userId")) {
    window.location.href = `${client}/login`;
}

$(document).ready(function () {
    $("#btnLoguot").click(() => {
        localStorage.removeItem("userId");
        window.location.href = `${client}/login`;
    });

    $.ajax({
        url: `${api}/products`,
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("Error: " + textStatus + " - " + errorThrown);
        },
        success: function (data) {
            let products = data;

            products.map((product) => {
                $.ajax({
                    url: `${api}/productInventory/${product.id}`,
                    error: function (jqXHR, textStatus, errorThrown) {
                        console.log(
                            "Error: " + textStatus + " - " + errorThrown
                        );
                    },
                    success: function (data) {
                        let productInventory = data;

                        let productsHTML = `
                            <tr>
                                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                    <div class="text-sm leading-5 text-gray-900">${
                                        product.id
                                    }</div>
                                </td>

                                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                    <div class="text-sm leading-5 text-gray-900">${
                                        product.name
                                    }</div>
                                </td>

                                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                    <div class="text-sm leading-5 text-gray-900">${product.cost.toLocaleString(
                                        "it-IT",
                                        {
                                            style: "currency",
                                            currency: "VND",
                                        }
                                    )}</div>
                                </td>
                                
                                <td
                                    class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                                    <div class="text-sm leading-5 text-gray-900">${
                                        product.category
                                    }</div>
                                </td>
                                
                                <td
                                    class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                                    <div class="text-sm leading-5 text-gray-900">${
                                        productInventory.quantity
                                    }</div>
                                </td>

                                <td
                                    class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
                                    <a class="text-indigo-600 hover:text-indigo-900" onClick='openModelUpdate(${
                                        product.id
                                    })'>Chỉnh sửa</a>
                                </td>
                                
                            </tr>
                        `;

                        $("#product-list-table").append(productsHTML);
                    },
                    type: "GET",
                });
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
            url: `${api}/products`,
            type: "POST",
            data: JSON.stringify(newProduct),
            async: true,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (result) {
                window.location.href = `${client}/productManager`;
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
            url: `${api}/products`,
            type: "PUT",
            data: JSON.stringify(newProduct),
            async: true,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (result) {
                window.location.href = `${client}/productManager`;
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
                window.location.href = `${client}/productManager`;
            },
            error: function (textStatus, errorThrown) {
                console.log("Error: " + textStatus + errorThrown);
            },
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

                $("#product-list-table").html(() => {
                    return "";
                });

                products.map((product) => {
                    $.ajax({
                        url: `${api}/productInventory/${product.id}`,
                        error: function (jqXHR, textStatus, errorThrown) {
                            console.log(
                                "Error: " + textStatus + " - " + errorThrown
                            );
                        },
                        success: function (data) {
                            let productInventory = data;

                            let productsHTML = `
                                <tr>
                                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                        <div class="text-sm leading-5 text-gray-900">${
                                            product.id
                                        }</div>
                                    </td>
    
                                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                        <div class="text-sm leading-5 text-gray-900">${
                                            product.name
                                        }</div>
                                    </td>
    
                                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                        <div class="text-sm leading-5 text-gray-900">${product.cost.toLocaleString(
                                            "it-IT",
                                            {
                                                style: "currency",
                                                currency: "VND",
                                            }
                                        )}</div>
                                    </td>
                                    
                                    <td
                                        class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                                        <div class="text-sm leading-5 text-gray-900">${
                                            product.category
                                        }</div>
                                    </td>
                                    
                                    <td
                                        class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                                        <div class="text-sm leading-5 text-gray-900">${
                                            productInventory.quantity
                                        }</div>
                                    </td>
    
                                    <td
                                        class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
                                        <a class="text-indigo-600 hover:text-indigo-900" onClick='openModelUpdate(${
                                            product.id
                                        })'>Chỉnh Sửa</a>
                                    </td>
                                    
                                </tr>
                            `;

                            $("#product-list-table").append(productsHTML);
                        },
                        type: "GET",
                    });
                });
            },
            type: "GET",
        });
    });

    $("#btnViewProfile").click(() => {
        let modalProfile = $("#myModalProfile");
        modalProfile.css("display", "block");
        let userId = localStorage.getItem("userId");

        $.ajax({
            url: `${api}/users/${userId}`,
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("Error: " + textStatus + " - " + errorThrown);
            },
            success: function (data) {
                let user = data;

                $("#userId").html(() => {
                    return userId;
                });

                $("#userName").html(() => {
                    return user.name;
                });

                $("#email").html(() => {
                    return user.email;
                });

                $("#phoneNumber").html(() => {
                    return user.phoneNumber;
                });
            },
            type: "GET",
        });
    });

    $("#closeModelProfile").click(() => {
        let myModalProfile = $("#myModalProfile");
        myModalProfile.hide();
    });

    let confirmPassword = false;
    $("#confirmNewPassword").blur(() => {
        let newPassword = formUpdatePassword.elements["newPassword"].value;
        let confirmNewPassword =
            formUpdatePassword.elements["confirmNewPassword"].value;

        if (newPassword != confirmNewPassword) {
            $("#notifycationConfirmNewPassword").html(() => {
                return "Mật khẩu không khớp";
            });
            confirmPassword = false;
        } else {
            $("#notifycationConfirmNewPassword").html(() => {
                return "";
            });
            confirmPassword = true;
        }
    });

    $("#newPassword").blur(() => {
        let newPassword = formUpdatePassword.elements["newPassword"].value;
        let confirmNewPassword =
            formUpdatePassword.elements["confirmNewPassword"].value;

        if (newPassword != confirmNewPassword) {
            $("#notifycationConfirmNewPassword").html(() => {
                return "Mật khẩu không khớp";
            });
            confirmPassword = false;
        } else {
            $("#notifycationConfirmNewPassword").html(() => {
                return "";
            });
            confirmPassword = true;
        }
    });

    let formUpdatePassword = document.getElementById("formUpdatePassword");
    formUpdatePassword.addEventListener("submit", (event) => {
        event.preventDefault();
        if (!confirmPassword) {
            alert("Mật khẩu không khớp");
        } else {
            let currentPassword =
                formUpdatePassword.elements["currentPassword"].value;
            let newPassword = formUpdatePassword.elements["newPassword"].value;

            let userId = localStorage.getItem("userId");
            let user;

            $.ajax({
                url: `${api}/users/${userId}`,
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log("Error: " + textStatus + " - " + errorThrown);
                },
                success: function (data) {
                    user = data;
                    let formUpdatePasswordData = {
                        email: user.email,
                        currentPassword: currentPassword,
                        newPassword: newPassword,
                    };
                    console.log(formUpdatePasswordData);
                    $.ajax({
                        url: `${api}/creds`,
                        type: "PUT",
                        data: JSON.stringify(formUpdatePasswordData),
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
                            if (result.status == "success") {
                                $("#notifycationCurentPassword").html(() => {
                                    return "";
                                });
                                alert("Cập nhật mật khẩu thành công");

                                window.location.href = `${client}/dashboard`;
                            } else {
                                console.log(result.status);
                                $("#notifycationCurentPassword").html(() => {
                                    return "Mật khẩu không đúng";
                                });
                            }
                        },
                        error: function (textStatus, errorThrown) {
                            console.log("Error: " + textStatus + errorThrown);
                        },
                    });
                },
                type: "GET",
            });
        }
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
