const api = "http://localhost:8083";

$(document).ready(function () {
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
                                        order.orderDate
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
                        return `${customer.id}`;
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
                    $("#phoneNumber").html(() => {
                        return `${customer.phoneNumber}`;
                    });
                    $("#shippingAddress").html(() => {
                        return `${order.shippingAddress}`;
                    });
                    $("#orderDate").html(() => {
                        return `${order.orderDate}`;
                    });
                    $("#discount").html(() => {
                        return `${order.discount}`;
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
