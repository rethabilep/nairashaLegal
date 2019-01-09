function myFunction() {
    var x = document.getElementById("responsiveTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

$(".btn_book").click(function () {
    $(".modal").show();
})

$(".close").click(function () {
    $(".modal").hide();
})