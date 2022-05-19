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
