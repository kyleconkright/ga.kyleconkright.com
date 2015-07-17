$(document).ready(function(){

    var notify = $('#notifications');

    function dropDown(a){
        notify.find('p').html(a);
        notify.slideDown().delay(2000).fadeOut(250);
    }

    var feed = new Instafeed({
        get: 'user',
        userId: 1404642943,
        accessToken: '1404642943.217ed6e.4c781d9a7fd048cab112a831f0ef5d44',
        limit: 4,
        resolution: 'standard_resolution',
        template: '<a href="{{link}}" style="background-image: url({{image}})" target="_blank">&nbsp;</a>'
    });

    feed.run();

    $('form').on('submit', function(e){
        e.preventDefault();

        $.ajax({
            type: "GET",
            url: 'http://bike.us11.list-manage.com/subscribe/post-json?u=36d2e0c1d407b1b06f295c7a0&amp;id=91160b41ad&c=?',
            data: $(this).serialize(),
            dataType: 'jsonp',
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                console.log(data);
                if (data.result != "success") {
                    console.log(JSON.stringify(data));
                    if(data.msg.indexOf('already subscribed') != -1) {
                        dropDown('You\'re already on our list friend');
                    } else {
                        dropDown('hmm.. something went wrong. Try another email?');
                    }
                } else {
                    dropDown('Success! Check your email!');
                    setTimeout($.fancybox.close, 2000);
                }
            }
        });
    });
});