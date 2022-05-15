function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
        (
            c ^
            (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
    );
}

let token;

if (!localStorage.getItem("token")) {
    localStorage.setItem("token", uuidv4());

    let cart = {
        token: localStorage.getItem("token"),
        createdAt: "2022-05-12T06:42:30.492Z",
        expiredAt: "2023-05-12T06:42:30.492Z",
        cartDetails: [],
    };

    $.ajax({
        url: `${api}/carts`,
        type: "POST",
        data: JSON.stringify(cart),
        async: true,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
            xhr.setRequestHeader("Accept", "application/json");
            xhr.setRequestHeader("Content-Type", "application/json");
        },
        success: function (result) {},
        error: function (textStatus, errorThrown) {
            console.log("Error: " + textStatus + errorThrown);
        },
    });
}
token = localStorage.getItem("token");
