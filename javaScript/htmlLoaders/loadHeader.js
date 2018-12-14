$(function(){
    $("#header").load("header.html", function(){
        $(this).contents().unwrap();
    });
});