$("p").click(function() {
    $(this).slideToggle('slow');
})


$('button').mouseenter(function() {
    $(this).removeClass('makeRed').addClass('makeBlue');
});
$("button").mouseleave(function() {
    $(this).removeClass('makeBlue').addClass('makeRed');
});

$(document).ready(function() {
    $(".box").click(function() {
        var classNames = $(this).attr("class").split(" ");
        $("." + classNames[1]).css("background-
        
        color", "red");
    })

})


$(document).ready(function() {
    $(".box").on("click", function() {
        var classNames = $(this).attr("class").split(" ");
        var boxClass = classNames[0];
        var className = classNames[1];
        if $(this).css("background-color") == "rgb(255, 0, 0)") {
            $("." + className).css("background-color", "#000");
        } else {
            $("." + boxClass).css("background-color", "#000");
            $("." + className).css("background-color", "red");
        }
    });
});