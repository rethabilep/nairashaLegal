function myFunction() {
    var x = document.getElementById("responsiveTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}
console.log("detected");
$(".bookingButton").click(function () {
    console.log("clicked");
    $("#bookingModal").show();
});

$(".close").click(function (){
    $("#bookingModal").hide();
});
