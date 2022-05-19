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

    let modalAdd = $("#myModalAdd");

    let btnAdd = $("#myBtnAdd");

    let spanCloseAdd = $("#closeModelAdd");

    btnAdd.click(function () {
        modalAdd.css("display", "block");
    });

    spanCloseAdd.click(function () {
        modalAdd.hide();
    });

    let checkPromotionCode = false;
    $("#txtPromotionCode").blur(() => {
        let promotionCode = $("#txtPromotionCode").val();

        $.ajax({
            url: `${api}/promotions/promotionCode?promotionCode=${promotionCode}`,
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("Error: " + textStatus + " - " + errorThrown);
            },
            success: function (data) {
                if (data.promotionCode) {
                    $("#notifycationPromotionCode").html(() => {
                        return "Mã khuyến mãi đã tồn tại";
                    });
                    checkPromotionCode = false;
                } else {
                    $("#notifycationPromotionCode").html(() => {
                        return "";
                    });
                    checkPromotionCode = true;
                }
            },
            type: "GET",
        });
    });

    let form = document.getElementById("form-add-promotion");
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        if (!checkPromotionCode) {
            alert("Mã giảm giá đã tồn tại, vuo lòng kiểm tra lại");
        } else {
            let promotionCode = form.elements["promotionCode"].value;
            let limit = form.elements["limit"].value;
            let deducted = form.elements["deducted"].value;
            let createdBy = localStorage.getItem("userId");
            let expiredDate = form.elements["expiredDate"].value;

            let newPromotion = {
                promotionCode: promotionCode,
                limit: limit,
                deducted: deducted,
                createdBy: createdBy,
                expiredDate: expiredDate,
            };

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
                    window.location.href = `${client}/promotionManager`;
                },
                error: function (textStatus, errorThrown) {
                    console.log("Error: " + textStatus + errorThrown);
                },
            });
        }
    });

    $.ajax({
        url: `${api}/promotions`,
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("Error: " + textStatus + " - " + errorThrown);
        },
        success: function (data) {
            let promotions = data;

            promotions.map((promotion) => {
                $.ajax({
                    url: `${api}/users/${promotion.createdBy}`,
                    error: function (jqXHR, textStatus, errorThrown) {
                        console.log(
                            "Error: " + textStatus + " - " + errorThrown
                        );
                    },
                    success: function (data) {
                        let user = data;

                        let promotionsHTML = `
                            <tr>
                                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                    ${promotion.promotionCode}
                                </td>

                                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                    ${promotion.expiredDate.split("T")[0]}
                                </td>

                                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                    ${promotion.limit}
                                </td>

                                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                    ${promotion.deducted * 100} %
                                </td>
                                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                    ${user.name}
                                </td>
                            </tr>
                        `;

                        $("#promotion-list-table").append(promotionsHTML);
                    },
                    type: "GET",
                });
            });
        },
        type: "GET",
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

    $.ajax({
        url: `${api}/promotions/stats`,
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("Error: " + textStatus + " - " + errorThrown);
        },
        success: function (data) {
            $("#totalPromotion").html(() => {
                return data.totalPromotion;
            });
        },
        type: "GET",
    });
});
