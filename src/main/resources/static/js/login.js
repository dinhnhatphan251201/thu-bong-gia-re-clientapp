const api = "http://localhost:8083";
const client = "http://localhost:8080";

if (localStorage.getItem("userId")) {
    window.location.href = `${client}/productManager`;
}

$(document).ready(function () {
    let form = document.getElementById("form-login");
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        let email = form.elements["email"].value;
        let password = form.elements["password"].value;

        let loginData = {
            email: email,
            password: password,
        };

        $.ajax({
            url: `${api}/creds`,
            type: "POST",
            data: JSON.stringify(loginData),
            async: true,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (result) {
                if (result.userId) {
                    localStorage.setItem("userId", result.userId);
                    window.location.href = `${client}/productManager`;
                } else {
                    $("#notifycationLogin").html(() => {
                        return "Tài khoản hoặc mật khẩu không hợp lệ";
                    });
                }
            },
            error: function (textStatus, errorThrown) {
                console.log("Error: " + textStatus + errorThrown);
            },
        });
    });
});
