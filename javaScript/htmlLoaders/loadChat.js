$(function () {
    $("#chatbot").load("chatbot.html", function () {
        console.log(1);
        $(this).contents().unwrap();
    });
});