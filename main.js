$('.button').on('click', function () {
    var count = +$('.count').html();
    $(this).hide();
    /*hide block width buttons*/
    /*check results in local store*/
    if (localStorage["results"]) {
        count = +localStorage["results"];
        $('.count').html(count)
    } else {
        localStorage.setItem("results", "0")
    }
    $(function () {
        var mouseX = 0, limitX = 950 - 10;
        /*position moving object*/
        $(window).mousemove(function (e) {
            var offset = $('.wrapper').offset();
            mouseX = Math.min(e.pageX - offset.left, limitX);
            /*find mouse*/
            if (mouseX < 0) mouseX = 0;

        });

        var follower = $(".plane");
        var xp = 0;
        /*Начальные координаты объекта на момент загрузки страницы*/
        var loop = setInterval(function () {
            xp += (mouseX - xp) / 5;
            follower.css({left: xp});
        }, 10);
    });

    $(document).on('click', function () {
        $('.weapon').css({height: 97 + 'vh'});
        setTimeout(hideBlock, 200);
        var positionWeapon = Math.round($('.weapon').offset().left - 30);
        /*position weapon*/
        $('.target-item').each(function () {
            var positionTarget = Math.round($(this).offset().left);
            /*position target*/
            if (Math.abs(positionWeapon - positionTarget) < 25) {
                $(this).addClass('deleted-target');
                count = 1 + count;
                $('.count').html(count);
                localStorage["results"] = count;
            }
            setTimeout(hide, 200);
        })

    });

    setInterval(targetShow, 1000);
})

function hideBlock() {
    $('.weapon').css({height: 0})
}

function hide() {
    $('.deleted-target').remove()
}

function targetShow() {
    var randomPosition = Math.random() * (900 - 0);
    var newBlock = '<div class="target-item" style="left: ' + randomPosition + 'px ; transform: translateX(100vh)"></div>';
    $('.targets').append(newBlock);
}