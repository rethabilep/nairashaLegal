$(document).ready(function () {
        // $("#about").hover(function () {
        //     $(".dropdown-content").show();
        // },
        //     // function () {
        //     //     $(".dropdown-content").hide();
        //     // });

        $("#about").click(function () {
            $(".dropdown-content").toggle();
        });

        let clicked = "origins";
        $(".dropdown-content div").click(function () {
            $("."+clicked).hide();
            clicked = this.id;
            console.log(clicked);
            $("." +clicked).show();
        })
    }
);