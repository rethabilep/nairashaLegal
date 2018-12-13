// When the user clicks the button, open the modal
$(".btn").click(function () {
    let id = this.id;
    id=id.substring(3);
    console.log(id);
    $("#modal"+id).show();
});
// When the user clicks on <span> (x), close the modal
$(".close").click(function () {
    $(".csrModal").hide();
});



