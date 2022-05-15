const api = "http://localhost:8083";

$(document).ready(function () {
    let modalAdd = $("#myModalAdd");

    let btnAdd = $("#myBtnAdd");

    let spanCloseAdd = $("#closeModelAdd");

    btnAdd.click(function () {
        modalAdd.css("display", "block");
    });

    spanCloseAdd.click(function () {
        modalAdd.hide();
    });

    let form = document.getElementById("form-add-promotion");
    form.addEventListener("submit", (event) => {
        let promotionCode = form.elements["promotionCode"].value;
        let limit = form.elements["limit"].value;
        let deducted = form.elements["deducted"].value;
        let createdBy = 2;
        let expiredDate = form.elements["expiredDate"].value;

        let newPromotion = {
            promotionCode: promotionCode,
            limit: limit,
            deducted: deducted,
            createdBy: createdBy,
            expiredDate: expiredDate,
        };

        event.preventDefault();

        $.ajax({
            url: `${api}/promotions`,
            type: "POST",
            data: JSON.stringify(newPromotion),
            async: true,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (result) {
                window.location.href = "http://localhost:8080/promotionManager";
            },
            error: function (textStatus, errorThrown) {
                console.log("Error: " + textStatus + errorThrown);
            },
        });
    });

    $.ajax({
        url: `${api}/promotions`,
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("Error: " + textStatus + " - " + errorThrown);
        },
        success: function (data) {
            let promotions = data;

            promotions.map((promotion) => {
                let promotionsHTML = `
                    <tr>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            ${promotion.promotionCode}
                        </td>

                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            ${promotion.expiredDate}
                        </td>

                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            ${promotion.limit}
                        </td>

                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            ${promotion.deducted}
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            ${promotion.createdBy}
                        </td>
                    </tr>
                `;

                $("#promotion-list-table").append(promotionsHTML);
            });
        },
        type: "GET",
    });
});
