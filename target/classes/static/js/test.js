$(document).ready(function () {
    $("#text").html(function () {
        return "content";
    });

    $.ajax({
        url: "http://localhost:8083/products",
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("Error: " + textStatus + " - " + errorThrown);
        },
        success: function (data) {
            console.log(data);
        },
        type: "GET",
    });

    $.get("http://localhost:8083/products", (data) => {
        console.log(data);
    });
});

// $.ajax({
//     type: "GET",
//     url: "http://localhost:8083/products",
//     success: function (data) {
//         console.log(data);
//     },
//     error: function (requestObject, error, errorThrown) {
//         console.log(error, errorThrown);
//     },
// });
