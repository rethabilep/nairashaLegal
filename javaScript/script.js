function myFunction() {
    var x = document.getElementById("responsiveTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

$(document).ready(
    function () {
        $("#emergency").click(function () {
            $("#emergencyServices").toggle();
        });
    }
);
