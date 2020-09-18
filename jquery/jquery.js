$(function(){
    $('#reqDetail').hide()
    $('#testDetail').hide()
    $('#regDetail').hide()
    $('#contactDetail').hide()
    $('#benefitDetail').show()

    var currTab = '#benefitDetail'
    //slide animation

    function ease(name){
        $('.titleCell').animate({
            opacity: '0.5'
        })
        
        $(name).animate({
            opacity: '1'
        })
    }

    $('#benefit').click(function(){
        $(currTab).slideUp(300, function(){
            $('#benefitDetail').slideDown(500)
        })
        
        ease('#benefit');

        currTab = '#benefitDetail'
    })
    $('#req').click(function(){
        $(currTab).slideUp(300, function(){
            $('#reqDetail').slideDown(500)
        })
        
        ease('#req');

        currTab = '#reqDetail'
    })
    $('#test').click(function(){
        $(currTab).slideUp(300, function(){
            $('#testDetail').slideDown(500)
        })

        ease('#test');

        currTab = '#testDetail'
    })
    $('#reg').click(function(){
        $(currTab).slideUp(300, function(){
            $('#regDetail').slideDown(500)
        })

        ease('#reg');

        currTab = '#regDetail'
    })
    $('#contact').click(function(){
        $(currTab).slideUp(300, function(){
            $('#contactDetail').slideDown(500)
        })

        ease('#contact');

        currTab = '#contactDetail'
    })
    
})
