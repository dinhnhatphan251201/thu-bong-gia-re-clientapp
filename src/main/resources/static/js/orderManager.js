const api = "http://localhost:8080";
const client = "http://localhost:8000";

if (!localStorage.getItem("userId")) {
    window.location.href = `${client}/login`;
}

$(document).ready(function () {
    $("#btnLoguot").click(() => {
        localStorage.removeItem("userId");
        window.location.href = `${client}/login`;
    });

    $.ajax({
        url: `${api}/orders`,
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("Error: " + textStatus + " - " + errorThrown);
        },
        success: function (data) {
            let orders = data;

            orders.map((order) => {
                $.ajax({
                    url: `${api}/customers/${order.customer}`,
                    error: function (jqXHR, textStatus, errorThrown) {
                        console.log(
                            "Error: " + textStatus + " - " + errorThrown
                        );
                    },
                    success: function (data) {
                        let customer = data;

                        let ordersHTML = `
                            <tr>
                                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                    <div class="text-sm leading-5 text-gray-900">${
                                        order.id
                                    }</div>
                                </td>

                                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                    <div class="text-sm leading-5 text-gray-900">${
                                        customer.name
                                    }</div>
                                </td>

                                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                    <div class="text-sm leading-5 text-gray-900">${
                                        // order.orderDate.split(".")[0]
                                        new Date(
                                            order.orderDate
                                        ).toLocaleDateString() +
                                        " " +
                                        new Date(
                                            order.orderDate
                                        ).toLocaleTimeString()
                                    }</div>
                                </td>

                                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                    <div class="text-sm leading-5 text-gray-900">${order.total.toLocaleString(
                                        "it-IT",
                                        {
                                            style: "currency",
                                            currency: "VND",
                                        }
                                    )}</div>
                                </td>
                                <td
                                    class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
                                    <a class="text-indigo-600 hover:text-indigo-900" onClick='openModelOrder(${
                                        order.id
                                    })'>Chi tiết</a>
                                </td>
                            </tr>
                        `;

                        $("#order-list-table").append(ordersHTML);
                    },
                    type: "GET",
                });
            });
        },
        type: "GET",
    });

    $("#btnSearch").click(() => {
        let value = $("#txtSearch").val();

        $.ajax({
            url: `${api}/orders/${value}`,
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("Error: " + textStatus + " - " + errorThrown);
            },
            success: function (data) {
                let order = data;
                $("#order-list-table").html(() => {
                    return "";
                });

                $.ajax({
                    url: `${api}/customers/${order.customer}`,
                    error: function (jqXHR, textStatus, errorThrown) {
                        console.log(
                            "Error: " + textStatus + " - " + errorThrown
                        );
                    },
                    success: function (data) {
                        let customer = data;

                        let ordersHTML = `
                            <tr>
                                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                    <div class="text-sm leading-5 text-gray-900">${
                                        order.id
                                    }</div>
                                </td>

                                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                    <div class="text-sm leading-5 text-gray-900">${
                                        customer.name
                                    }</div>
                                </td>

                                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                    <div class="text-sm leading-5 text-gray-900">${
                                        new Date(
                                            order.orderDate
                                        ).toLocaleDateString() +
                                        " " +
                                        new Date(
                                            order.orderDate
                                        ).toLocaleTimeString()
                                    }</div>
                                </td>

                                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                    <div class="text-sm leading-5 text-gray-900">${order.total.toLocaleString(
                                        "it-IT",
                                        {
                                            style: "currency",
                                            currency: "VND",
                                        }
                                    )}</div>
                                </td>
                                <td
                                    class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
                                    <a class="text-indigo-600 hover:text-indigo-900" onClick='openModelOrder(${
                                        order.id
                                    })'>Chi tiết</a>
                                </td>
                            </tr>
                        `;

                        $("#order-list-table").append(ordersHTML);
                    },
                    type: "GET",
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

                                window.location.href = `${client}/productManager`;
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

    $("#filterByDate").blur(() => {
        let value = $("#filterByDate").val().split("T")[0];

        $.ajax({
            url: `${api}/orders?date=${value}`,
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("Error: " + textStatus + " - " + errorThrown);
            },
            success: function (data) {
                let orders = data;
                $("#order-list-table").html(() => {
                    return "";
                });

                orders.map((order) => {
                    $.ajax({
                        url: `${api}/customers/${order.customer}`,
                        error: function (jqXHR, textStatus, errorThrown) {
                            console.log(
                                "Error: " + textStatus + " - " + errorThrown
                            );
                        },
                        success: function (data) {
                            let customer = data;

                            let ordersHTML = `
                                <tr>
                                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                        <div class="text-sm leading-5 text-gray-900">${
                                            order.id
                                        }</div>
                                    </td>
    
                                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                        <div class="text-sm leading-5 text-gray-900">${
                                            customer.name
                                        }</div>
                                    </td>
    
                                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                        <div class="text-sm leading-5 text-gray-900">${
                                            new Date(
                                                order.orderDate
                                            ).toLocaleDateString() +
                                            " " +
                                            new Date(
                                                order.orderDate
                                            ).toLocaleTimeString()
                                        }</div>
                                    </td>
    
                                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                        <div class="text-sm leading-5 text-gray-900">${order.total.toLocaleString(
                                            "it-IT",
                                            {
                                                style: "currency",
                                                currency: "VND",
                                            }
                                        )}</div>
                                    </td>
                                    <td
                                        class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
                                        <a class="text-indigo-600 hover:text-indigo-900" onClick='openModelOrder(${
                                            order.id
                                        })'>Chi tiết</a>
                                    </td>
                                </tr>
                            `;

                            $("#order-list-table").append(ordersHTML);
                        },
                        type: "GET",
                    });
                });
            },
            type: "GET",
        });
    });

    $.ajax({
        url: `${api}/orders/stats`,
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("Error: " + textStatus + " - " + errorThrown);
        },
        success: function (data) {
            $("#totalOrder").html(() => {
                return `${data.totalOrder} hóa đơn`;
            });

            $("#totalProductSoldInAMonth").html(() => {
                return `${data.totalProductSoldInAMonth} sản phẩm`;
            });
        },
        type: "GET",
    });
});

function openModelOrder(id) {
    let modalUpdate = $("#myModalUpdate");
    modalUpdate.css("display", "block");
    console.log("btn update click:" + id);

    let spanCloseUpdate = $("#closeModelUpdate");

    spanCloseUpdate.click(function () {
        modalUpdate.hide();
    });

    $.ajax({
        url: `${api}/orders/${id}`,
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("Error: " + textStatus + " - " + errorThrown);
        },
        success: function (data) {
            let order = data;

            $.ajax({
                url: `${api}/customers/${order.customer}`,
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log("Error: " + textStatus + " - " + errorThrown);
                },
                success: function (data) {
                    let customer = data;

                    $("#id").html(() => {
                        return `${order.id}`;
                    });
                    $("#customerName").html(() => {
                        return `${customer.name}`;
                    });
                    $("#shippingCost").html(() => {
                        return `${order.shippingCost.toLocaleString("it-IT", {
                            style: "currency",
                            currency: "VND",
                        })}`;
                    });
                    $("#phoneNumberCustomer").html(() => {
                        return `${customer.phoneNumber}`;
                    });
                    $("#shippingAddress").html(() => {
                        return `${order.shippingAddress}`;
                    });
                    $("#orderDate").html(() => {
                        return `${
                            new Date(order.orderDate).toLocaleDateString() +
                            " " +
                            new Date(order.orderDate).toLocaleTimeString()
                        }`;
                    });
                    $("#discount").html(() => {
                        return `${order.discount * 100} %`;
                    });
                    $("#total").html(() => {
                        return `${order.total.toLocaleString("it-IT", {
                            style: "currency",
                            currency: "VND",
                        })}`;
                    });
                },
                type: "GET",
            });

            $("#detail-list-table").html(() => {
                return "";
            });

            order.details.map((detail) => {
                $.ajax({
                    url: `${api}/products/${detail.product}`,
                    error: function (jqXHR, textStatus, errorThrown) {
                        console.log(
                            "Error: " + textStatus + " - " + errorThrown
                        );
                    },
                    success: function (data) {
                        let product = data;

                        let detailHTML = `
                            <tr>
                                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                    <div class="text-sm leading-5 text-gray-900">${
                                        detail.product
                                    }</div>
                                </td>

                                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                    <div class="text-sm leading-5 text-gray-900">${
                                        product.name
                                    }</div>
                                </td>

                                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                    <div class="text-sm leading-5 text-gray-900">${detail.cost.toLocaleString(
                                        "it-IT",
                                        {
                                            style: "currency",
                                            currency: "VND",
                                        }
                                    )}</div>
                                </td>

                                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                    <div class="text-sm leading-5 text-gray-900">${
                                        detail.quantity
                                    }</div>
                                </td>
                                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                    <div class="text-sm leading-5 text-gray-900">${detail.totalLine.toLocaleString(
                                        "it-IT",
                                        {
                                            style: "currency",
                                            currency: "VND",
                                        }
                                    )}</div>
                                </td>
                            </tr>

                        `;

                        $("#detail-list-table").append(detailHTML);
                    },
                    type: "GET",
                });
            });
        },
        type: "GET",
    });
}
