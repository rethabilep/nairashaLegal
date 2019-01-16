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

        $("#chatIcon").click(function () {
            $(this).hide();
            $(".dialogflow iframe").show();
            $(".closeChat").show();
        });

        $(".closeChat").click(function () {
            $("#chatIcon").show();
            $(".dialogflow iframe").hide();
            $(".closeChat").hide();

        });

        $(".hamburgerMenu").click(function () {
            $("#drawer").toggle();
            $("#noDrawer").toggle();
        })
    }
);
