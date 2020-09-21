

//memanggil canvas di tag HTML
    // var canvas = document.getElementById("surface");
var snd = document.getElementById("suara");
var isPlayed = false;
var isPlayed2 = false;
var isPlayed3 = false;
var onceOnly = false;


var pathPlayer = ["../Assets/sprites/1.png"
                    ,"../Assets/sprites/2.png"
                    ,"../Assets/sprites/3.png"
                    ,"../Assets/walkSprites/walk1.png"
                    ,"../Assets/walkSprites/walk2.png"
                    ,"../Assets/walkSprites/walk3.png"
                    ,"../Assets/walkSprites/walk4.png"
                    ,"../Assets/walkSprites/walk5.png"
                    ,"../Assets/walkSprites/walk6.png"
                    ,"../Assets/walkSprites/walk7.png"
                    ,"../Assets/walkSprites/walk8.png"
                    ,"../Assets/walkSprites/walk9.png"
                    ,"../Assets/sprites/13.png"
                    ,"../Assets/sprites/6.png"]

    var pathPlayerDeath = ["../Assets/sprites/13t1.png"
                    ,"../Assets/sprites/13t2.png"
                    ,"../Assets/sprites/13t3.png"
                    ,"../Assets/sprites/13t4.png"]

    var pathMoveToY = ["../Assets/sprites/6t1.png"
                    ,"../Assets/sprites/6t2.png"
                    ,"../Assets/sprites/6t3.png"
                    ,"../Assets/sprites/6t4.png"]

var imageSrc = [
    "../Assets/bgParallax.png",
    "../Assets/bgAssets/jembatanAsset.png",
    "../Assets/layeredBg/ly5.png",
    "../Assets/bgAssets/cart1Asset.png",
    "../Assets/bgAssets/cart2Asset.png",
    "../Assets/layeredBg/ly2.png",
    "../Assets/layeredBg/ly1.png",
    "../Assets/layeredBg/ly4.png",
    "../Assets/layeredBg/ly3.png",
    "../Assets/obstacle/coin.png",
    "../Assets/obstacle/missile.png"
]

var audioSrc = [
    "../Assets/sound/charge.wav",
    "../Assets/sound/duar.wav",
    "../Assets/sound/fall.wav",
    "../Assets/sound/coin.mp3",
    "../Assets/sound/damage.mp3",
    "../Assets/sound/awalNew.mp3",
    "../Assets/sound/back1.mp3",
]


var pPlayerObject = []
var pPlayerDeathObject = []
var pPlayerMoveToYObject = []
var imageObject = []
var audioObject = []
function init(){
    for(let i = 0 ; i < imageSrc.length ;i++ ){
        imageObject[i] = new Image()
        imageObject[i].src = imageSrc[i]
    }

    for(let i = 0 ; i < audioSrc.length ; i++ ){
        audioObject[i] = new Audio()
        audioObject[i].src = audioSrc[i]
        audioObject[i].loop = false
    }

    for(let i = 0 ; i < pathPlayer.length ;i++ ){
        pPlayerObject[i] = new Image()
        pPlayerObject[i].src = pathPlayer[i]
    }

    for(let i = 0 ; i < pathPlayerDeath.length ;i++ ){
        pPlayerDeathObject[i] = new Image()
        pPlayerDeathObject[i].src = pathPlayerDeath[i]
    }

    for(let i = 0 ; i < pathMoveToY.length ;i++ ){
        pPlayerMoveToYObject[i] = new Image()
        pPlayerMoveToYObject[i].src = pathMoveToY[i]
    }

}




init()
var beginAudio = document.getElementById("awal");
beginAudio.volume = 0.2;

function game(){


    snd.volume = 0.2;
    snd.play();

    var canvas = document.getElementById("surface");
    canvas.width = canvas.getBoundingClientRect().width;
    canvas.height = canvas.getBoundingClientRect().height;
    var ctx = canvas.getContext('2d');
    var ctx2 = canvas.getContext('2d');
    var ctx3 = canvas.getContext('2d');

    var indexImage = 3


    var isPressed = false

    document.addEventListener("keydown",ControlDown);
    document.addEventListener("keyup",ControlUp);
    var totalCoin = 5
    var arrCoin = 0
    var maxY = 80
    var minY = canvas.height - (canvas.height*0.35);
    var linearXCoin = []
    var linearYCoin = []
    var totalCoinAbs = 5

    var coinCollision = []

    var linearXCart = []
    var linearYCart = (0.5*canvas.height) - 85

    var framesCoin = 0
    var framesObstacle = 0
    var arrObstacle = []

    var framesMissile = 0
    var linearXMissile = []
    var linearYMissile = []
    var totalMissile = 0

    var viewportmeta = document.querySelector('meta[name="viewport"]');
    viewportmeta.content = 'user-scalable=NO, width=device-width, initial-scale=1.0'


    var totalFramesCounter = 0
    var acc = 5


    var cartSpeed = -200
    var cartAcc = 3.5


    var isDead = false
    var gravity = 9
    var posX = 100 , posY = 520; // posisi player
    var speedY = 0; // speed Y atasbawah

    var paralaxX = 0 // untuk background
    var roadX = 0 // untuk efek road

    var isWin = false
    var isBounce = false
    var isHit = false;
    var reallyDie = false
    var opacity = 1;

    var accWin = 0



    var fpsInterval, startTime, now, then, elapsed;
    
    
    // initialize the timer variables and start the animation
    
    function startAnimating(fps) {
        fpsInterval = 1000 / fps;
        then = Date.now();
        startTime = then;
        draw();
    }

    startAnimating(60)

    function clear()
    {

        ctx.drawImage(imageObject[0],paralaxX,0,2*canvas.width,canvas.height)


        ctx.drawImage(imageObject[1],paralaxX,0.5*canvas.height,2*canvas.width,0.5*canvas.height)
        if(isDead == false)
            paralaxX-=3
        if(isWin == true)
        {
            paralaxX -= ( 20 + accWin )
            accWin += 0.35
        }
        // paralaxX-=5
        paralaxX%=canvas.width
    }

    function road()
    {
        if(isDead == false && isWin == false)
            roadX -= acc
        if(isWin == true)
            roadX -= ( 20+ accWin )
        roadX%=canvas.width

        ctx.drawImage(imageObject[2],roadX,10,2*canvas.width,canvas.height)

    }

    function cart()
    {
    	cartSpeed += cartAcc
        let cartindex
		if(cartAcc < 0)
		{
            cartindex = 3
		}
        else
            cartindex = 4

        ctx.drawImage(imageObject[cartindex],cartSpeed,linearYCart,150,100)
        ctx.drawImage(imageObject[cartindex],cartSpeed+125,linearYCart,150,100)
        if(cartSpeed >= canvas.width+350 && cartAcc > 0)
        {
        	cartAcc += 4
            cartAcc *= -1
        }
        else if(cartSpeed < -350 && cartAcc < 0)
        {
            cartAcc *= -1
            cartAcc -= 4
        }

    }

    function road2()
    {

        ctx.drawImage(imageObject[5],roadX,10,2*canvas.width,canvas.height)

        ctx.drawImage(imageObject[6],roadX,10,2*canvas.width,canvas.height)

        ctx.drawImage(imageObject[7],roadX,-10,2*canvas.width,canvas.height)

        ctx.drawImage(imageObject[8],roadX,10,2*canvas.width,canvas.height)
    }

    function imageIndex()
    {
        if(isDead == false && isWin == false)
        {
            if(isPressed)
            {
                if(indexImage > 2) indexImage = 0
                indexImage++
                indexImage %= 3
                // image ada api 0  1  2
            }
            else if(posY+20 >= minY)
            {
                if(indexImage < 3)indexImage = 3
                if(totalFramesCounter % (isWin == true ? 1 : 6) == 0)
                {
                    indexImage++
                    indexImage %= 12
                    if(indexImage < 3) indexImage = 3
                }

                // sprite jalan 3 - 11
            }
            else
            {
                indexImage = 12
                // terbang tanpa klik (turun)
            }
        }
        else
        {
            if(totalFramesCounter % 10 == 0)
            {
                if(indexImage > 3) indexImage = 0

                if(indexImage != 3)indexImage++

                indexImage %= 4
            }else{
                indexImage%=4
            }
        }
    }

    function movement()
    {
        posY+=speedY // naik turun
        posY+=gravity // gravitasi


        if(posY>=minY)
        {
            posY=minY
            gravity=0
        }
        else
        {
            gravity = 10
        }

        if(posY<=maxY)
        {
            posY = maxY
        }

        if(isHit){
            ctx2.globalAlpha = opacity;

            setTimeout(() => {
                opacity += 0.1
            }, 10);

            if(opacity >= 1){
                isHit = false
                opacity = 1
            }
        }

        ctx2.drawImage(pPlayerObject[indexImage],posX,posY,120,120)

        ctx2.globalAlpha = 1;
    }

    function coin()
    {
        framesCoin += 1
        // untuk bikin coin baru
        if(framesCoin>=200 && isDead == false && isWin == false)
        {
            framesCoin = 0
            var posCoinY = Math.round(Math.random())
            for(let i = 0 ; i < 5 ; i++)
            {
                linearXCoin[arrCoin] = canvas.width + i*60
                linearYCoin[arrCoin] = (posCoinY ? 200 : 400)
                arrCoin++
                coinCollision.push(canvas.width + i*60)
            }
        }

        // print coin
        for(let i = 0 ; i < arrCoin ; i++)
        {
            ctx.drawImage(imageObject[9],linearXCoin[i],linearYCoin[i],60,60)

            // collision coin
            if(posY + 110 >= linearYCoin[i] && posY <= linearYCoin[i] + 60 && linearXCoin[i] <= posX  + 95 && linearXCoin[i] + 60 >= posX)
            {
                linearXCoin.splice(i,1)
                linearYCoin.splice(i,1)
                i--
                arrCoin--
                totalCoin += 1
                totalCoinAbs += 1
                audioObject[3].currentTime = 0
                audioObject[3].play();
            }
            else
            {
                if(isDead==false )
                {
                    coinCollision[i] -= (acc + accWin)
                    linearXCoin[i] -= (acc + accWin)
                }
                if(linearXCoin[i]<=-70)
                {
                    linearXCoin.shift()
                    linearYCoin.shift()
                    arrCoin--
                    i--
                }
            }
        }
    }


    function missileHit()
    {


        if(isHit && !isDead && !isWin)
        {

            ctx.save();
            var dx = Math.random()*10 ;
            var dy = Math.random()*10 ;
            dx-=3
            dy-=3

            if(Math.random() * 10 < 5)dx*=-1

            if(Math.random() * 10 < 5)dy*=-1

            ctx.translate(dx, dy);

            isPlayed2 = false;
        }

    }

    function coinCounter()
    {
        ctx.drawImage(imageObject[9],30,20,60,60)

        ctx.font = "2.2vw Lucida Sans Unicode"
        ctx.fillStyle = "lightblue"
        ctx.fillText("x " + totalCoin, 100, 60)
    }

    function missile()
    {
        framesMissile++
        if(framesMissile >= 30 - ((acc)+2) && isWin == false)
        {
            framesMissile = 0

            linearXMissile[totalMissile] = canvas.width

            linearYMissile[totalMissile] = posY
            totalMissile++
            if(Math.floor(Math.random() * 10) < 8)
            {
                linearYMissile[totalMissile] = Math.floor(Math.random() * (maxY-minY)) + minY
                linearXMissile[totalMissile] = canvas.width + Math.floor(Math.random() * (200-120)) + 120
                totalMissile++
            }
        }

        for(let i = 0 ; i < totalMissile ; i++)
        {
            ctx.drawImage(imageObject[10],linearXMissile[i],linearYMissile[i],180,25)

            if((posY + 110 >= linearYMissile[i] && posY <= linearYMissile[i]+25  && linearXMissile[i]+180 >= posX && linearXMissile[i] <= posX+95) && !isWin && isDead == false)
            {
                linearXMissile.splice(i,1)
                linearYMissile.splice(i,1)
                i--
                totalMissile--
                isHit = true
                opacity = 0.1
                totalCoin -= 1
                dmgSound();
            }
            else
            {
                linearXMissile[i] -= (acc+7)
                if(linearXMissile[i]<=-200)
                {
                    linearXMissile.splice(i,1)
                    linearYMissile.splice(i,1)
                    totalMissile--
                    i--
                }
            }
        }

    }

    function point()
    {
        ctx.fillStyle = "blue"
        ctx.font= "italic small-caps bold 3vw arial"
        let total = (totalFramesCounter*3 + (totalCoinAbs-5)*1200)
        if(total<0)total=0
        ctx.fillText(total, 1400, 60)
    }

    var a = false
    function dead()
    {
        // posY+=speedY // naik turun
        if(isDead == true)
        {
            totalCoin = 0
            posY+=gravity // gravitasi

            shakeX = 4

            if(posY < minY){
                if(!isBounce){
                    // if(Math.random() * 10 < 5) shakeX*=-1
                    posX += shakeX
                }
                posX += 2
            }

            if(isBounce){
                posX += 4;


            }

        }
        if(posY >= minY - 40 && isBounce && !reallyDie)
        {
            fallSound();
            gravity = -2.5;
        }
        else if (posY < minY - 40 && isBounce && !reallyDie)
        {
            reallyDie = true
        }
        else if (posY >= minY && !isBounce){
            isBounce = true
        }
        else if(posY>=minY)
        {
            posY=minY
            posX -= 4
            gravity=0
        }
        else if (reallyDie){
            gravity = 3
        }
        else
        {
            gravity = 10
        }

        if(posY<=maxY)
        {
            posY = maxY
        }
        if(!a && isWin == true)
        {
            if(posY > (canvas.height * 0.5) - ((0.5*canvas.height) % 2 == 1 ? 81 : 80))
            {
                posY -= 2

            }
            else if(posY >= ((canvas.height * 0.5) - ((0.5*canvas.height) %2 == 1 ? 81 : 80)  + 1))
            {
                 // a = true

            }
            else
            {
                posY += 2

            }


            if(posY +1 > ((canvas.height * 0.5) - ((0.5*canvas.height) %2 == 1 ? 81 : 80)  + 1) && posY -1 < ((canvas.height * 0.5) - ((0.5*canvas.height) %2 == 1 ? 81 : 80)  + 1) && posX >= canvas.width*0.01)
            {

                setTimeout(() => {
                 a = true
                }, 2000);

            }
            else{
                posX += 4
            }
        }
        if(totalFramesCounter % 2 == 0 && a)
            posX += (accWin)

        if(isWin)
        {
            if(posY + ((0.5*canvas.height) & 1 == 1 ? 81 : 80 ) ==  (canvas.height*0.5)){
                ctx2.drawImage(pPlayerObject[13],posX,posY,120,120)
            }
            else {

                ctx2.drawImage(pPlayerMoveToYObject[indexImage],posX,posY,120,120)

            }

        }
        else if(isDead)
        {
            if(posY + ((0.5*canvas.height) & 1 == 1 ? 81 : 80 ) ==  (canvas.height*0.5)){

                ctx2.drawImage(pPlayerObject[13],posX,posY,120,120)
            }
            else {
                ctx2.drawImage(pPlayerDeathObject[indexImage],posX,posY,120,120)

            }
        }


        // 0 - 3

        // ctx2.drawImage(sprite,posX,posY,120,120)

    }


    function draw()
    {

        requestAnimationFrame(draw)
        
    now = Date.now();
    elapsed = now - then;

    // if enough time has elapsed, draw the next frame

        if (elapsed > fpsInterval) {

            // Get ready for next frame by setting then=now, but also adjust for your
            // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
            then = now - (elapsed % fpsInterval);

            // Put your drawing code here




            clear() // background paralax
            missileHit() // efek getar
            imageIndex()
    
            road2() // untuk atas bawah
    
            cart()
    
            if(isDead || isWin)
            {
                dead()
            }
            else
                movement() // playe☺r
    
            road() // untuk atas bawah
            ctx.restore()
    
            //point() // point kanan atas
    
    
            coinCounter() // coin counter kiri atas
    
    
    
            coin() // random coin
    
            missile()
    
    
    
            totalFramesCounter++
            if(totalFramesCounter%4 == 0 && isDead == false)
            {
                acc += 0.01
                if(acc>=50)acc = 50
            }
    
            if(totalCoin >= 20)
            {
                // kalah
                // isDead = true
                isWin = true
    
                winSound();
    
    
                setWinAndLose(6000);
    
            }
            else if(totalCoin < 1)
            {
                // menang
                isDead = true
    
                setWinAndLose(3000);
    
            }

        }
    }

    function setWinAndLose(t){
        setTimeout(() => {
                onlyOnce();
                snd.pause();
                canvas.style.display = "none";
                document.getElementsByClassName("outerdiv")[0].style.visibility = "visible";
                document.getElementsByClassName("outerdiv")[0].style.left = "25vw"
                document.body.style.backgroundImage = "url('../Assets/images/background/bgAkhirv2.png')";
                details()
                return
            }, t);
    }

    function overlay()
    {
        $('#overlayImage').animate({left: '0px'},2500).animate({opacity: '1.0'});
    }

    function onlyOnce(){
        if (!onceOnly){
            beginAudio.currentTime = 0;
            beginAudio.play();
            onceOnly = true;
        }
    }

    function ControlUp(event)
    {
        // w
        if(event.keyCode == 87 && isDead == false && !isWin)
        {
            speedY=0
            isPressed = false
        }

    }
    function ControlDown(event)
    {
        // w
        if(event.keyCode == 87 && isDead == false && !isWin)
        {
            speedY=-23
            isPressed = true
        }

    }

    function winSound(){
        if (!isPlayed){
            audioObject[0].play()
            isPlayed = true;

            setTimeout(function(){
                audioObject[1].play()
                isPlayed = true;


            }, 3500);
        }

    }

    function loseSound(){
        if (!isPlayed){
            audioObject[0].play()
            isPlayed = true;

            setTimeout(function(){
                audioObject[1].play()
                isPlayed = true;


            }, 3500);
        }

    }

    function dmgSound(){
        if (!isPlayed2){
            audioObject[4].currentTime = 0
            audioObject[4].play()
            isPlayed2 = true;
        }

    }

    function fallSound(){
        if (!isPlayed3){
            audioObject[2].volume = 1
            audioObject[2].play()

            setTimeout(() => {
                 fS.play();
                }, 700);
            isPlayed3 = true;


        }

    }


    draw();
    function animateTitle(){
        var title=document.title;
        document.title=title.substr(1,title.length)+title.substr(0,1);
    }
    setInterval(animateTitle,100);
}

// mulai dari sini buat progress bar

var screen;

function removeLogo(){
    screen = document.getElementsByClassName('wrapper-container-logo')[0];
	screen.style.display = "none";
}

function loadImage(){
    var imgPath = ["../Assets/sprites/1.png"
                    ,"../Assets/sprites/2.png"
                    ,"../Assets/sprites/3.png"
                    ,"../Assets/walkSprites/walk1.png"
                    ,"../Assets/walkSprites/walk2.png"
                    ,"../Assets/walkSprites/walk3.png"
                    ,"../Assets/walkSprites/walk4.png"
                    ,"../Assets/walkSprites/walk5.png"
                    ,"../Assets/walkSprites/walk6.png"
                    ,"../Assets/walkSprites/walk7.png"
                    ,"../Assets/walkSprites/walk8.png"
                    ,"../Assets/walkSprites/walk9.png"
                    ,"../Assets/sprites/13.png"
                    ,"../Assets/sprites/6.png"
                    ,"../Assets/sprites/13t1.png"
                    ,"../Assets/sprites/13t2.png"
                    ,"../Assets/sprites/13t3.png"
                    ,"../Assets/sprites/13t4.png"
                    ,"../Assets/sprites/6t1.png"
                    ,"../Assets/sprites/6t2.png"
                    ,"../Assets/sprites/6t3.png"
                    ,"../Assets/sprites/6t4.png"
                    ,"../Assets/sound/awalNew.mp3"
                    ,"../Assets/sound/back1.mp3"
                    ,"../Assets/sound/damage.mp3"
                    ,"../Assets/layeredBg/ly5.png"
                    ,"../Assets/layeredBg/ly1.png"
                    ,"../Assets/layeredBg/ly2.png"
                    ,"../Assets/layeredBg/ly3.png"
                    ,"../Assets/layeredBg/ly4.png"
                    ,"../Assets/bgAssets/jembatanAsset.png"
                    ,"../Assets/bgAssets/cart1Asset.png"
                    ,"../Assets/bgAssets/cart2Asset.png"
                    ,"../Assets/endsScreen4.png"
                    ,"../Assets/obstacle/missile.png"
                    ,"../Assets/images/background/bgAkhirv2.png"
                    ]

    var xhrArray =  new Array();
    var percent = 0;
    var roundedPercent = 0;
    var totalSize = 0;
    for (let i = 0;i < imgPath.length; i++) {
        xhrArray[i] = new XMLHttpRequest();
        xhrArray[i].open("GET", imgPath[i]);
         xhrArray[i].onprogress = function (e) {
            if (e.lengthComputable) {
            }
        }
        xhrArray[i].onloadstart = function (e) {
        }
        xhrArray[i].onloadend = function (e) {
            totalSize += 1;
             percent = totalSize/36 *100
                document.getElementById('text').style.fontSize = "x-large"
                roundedPercent = Math.round(percent)
                if(roundedPercent >= 100){
                    doneLoading = true
                    roundedPercent = 100
                    // if(doneLoading){
                        // screen.style.display = "none";
                        // document.getElementById('progress-image').style.visibility = "hidden";
                        // beginAudio.pause();
                        // game()

                    setTimeout(function(){
                            document.getElementById("start-button").style.display = "flex"
                            document.getElementById("start-button").style.visibility = "visible"

                    }, 5000);
                }
                document.getElementById('text').innerHTML = roundedPercent +"%"
                document.getElementById("barbar").style.width = percent +"%"

                // roundedPercent /= 2
                // var leftValue = document.getElementById('progress-image').style.leftValue
                // leftValue = roundedPercent
                // document.getElementById('progress-image').style.left = leftValue + "vw"
        }

        xhrArray[i].send();

    }

}
function progressBar(){
    screen = document.getElementsByClassName('progress-load')[0];
    screen.style.display = "block";

    var bar = document.getElementById("barbar");

}


function main() {
    document.getElementById('progress-image').style.left = "24vw"
    document.getElementById('progress-image').style.visibility = "visible"
    removeLogo();
    document.getElementById("start-button").onclick = function(){
            screen.style.display = "none";
            document.getElementById('progress-image').style.visibility = "hiddden";
            document.getElementById("start-button").style.display = "none"
            document.getElementById("start-button").style.visibility = "hidden"
            beginAudio.pause();
            game()
    }
    progressBar();
    loadImage();



    // 8200
}


function details()
{
    var benefit = document.getElementById("benefit");
    var req = document.getElementById("req");
    var test = document.getElementById("test");
    var reg = document.getElementById("reg");
    var contact = document.getElementById("contact");

    document.getElementById("benefitDetail").style.position = "absolute";
    document.getElementById("reqDetail").style.position = "absolute";
    document.getElementById("testDetail").style.position = "absolute";
    document.getElementById("regDetail").style.position = "absolute";
    document.getElementById("contactDetail").style.position = "absolute";

    document.getElementById("benefitDetail").style.top = "5vw";
    document.getElementById("reqDetail").style.top = "5vw";
    document.getElementById("testDetail").style.top = "5vw";
    document.getElementById("regDetail").style.top = "5vw";
    document.getElementById("contactDetail").style.top = "5vw";

    document.getElementById("benefitDetail").style.left = "1vw";
    document.getElementById("reqDetail").style.left = "1vw";
    document.getElementById("testDetail").style.left = "1vw";
    document.getElementById("regDetail").style.left = "1vw";
    document.getElementById("contactDetail").style.left = "1vw";

    //document.getElementById("benefitDetail").style.display = "block";


    benefit.onclick = function(){
        document.getElementById("benefitDetail").style.visibility = "visible";
        document.getElementById("reqDetail").style.visibility = "hidden";
        document.getElementById("testDetail").style.visibility = "hidden";
        document.getElementById("regDetail").style.visibility = "hidden";
        document.getElementById("contactDetail").style.visibility = "hidden";
    }

    req.onclick = function(){
        document.getElementById("benefitDetail").style.visibility = "hidden";
        document.getElementById("reqDetail").style.visibility = "visible";
        document.getElementById("testDetail").style.visibility = "hidden";
        document.getElementById("regDetail").style.visibility = "hidden";
        document.getElementById("contactDetail").style.visibility = "hidden";
    }

    test.onclick = function(){
        document.getElementById("benefitDetail").style.visibility = "hidden";
        document.getElementById("reqDetail").style.visibility = "hidden";
        document.getElementById("testDetail").style.visibility = "visible";
        document.getElementById("regDetail").style.visibility = "hidden";
        document.getElementById("contactDetail").style.visibility = "hidden";
    }

    reg.onclick = function(){
        document.getElementById("benefitDetail").style.visibility = "hidden";
        document.getElementById("reqDetail").style.visibility = "hidden";
        document.getElementById("testDetail").style.visibility = "hidden";
        document.getElementById("regDetail").style.visibility = "visible";
        document.getElementById("contactDetail").style.visibility = "hidden";
    }

    contact.onclick = function(){
        document.getElementById("benefitDetail").style.visibility = "hidden";
        document.getElementById("reqDetail").style.visibility = "hidden";
        document.getElementById("testDetail").style.visibility = "hidden";
        document.getElementById("regDetail").style.visibility = "hidden";
        document.getElementById("contactDetail").style.visibility = "visible";
        document.getElementById("contactDetail1").style.display = "block";
    }

}




document.addEventListener("contextmenu", function(e){
    e.preventDefault();
}, false);



function fade(){
  $(".outerdiv").fadeIn(1000);
}




Image.prototype.load = function(url){
        var thisImg = this;
        var xmlHTTP = new XMLHttpRequest();
        xmlHTTP.open('GET', url,true);
        xmlHTTP.responseType = 'arraybuffer';
        xmlHTTP.onload = function(e) {
            var blob = new Blob([this.response]);
            thisImg.src = window.URL.createObjectURL(blob);
        };
        xmlHTTP.onprogress = function(e) {
            thisImg.completedPercentage = parseInt((e.loaded / e.total) * 100);
        };
        xmlHTTP.onloadstart = function() {
            thisImg.completedPercentage = 0;
        };
        xmlHTTP.send();
    };

    Image.prototype.completedPercentage = 0;

var imgPathPlayer = new Array();



for(let i=0;i<14;i++){
    imgPathPlayer[i] = new Image();
    imgPathPlayer[i].load(pathPlayer[i]);
}





document.onkeydown = function(e) {
    if(e.keyCode == 123) {
    return false;
    }
    if(e.ctrlKey && e.keyCode == 'E'.charCodeAt(0)){
    return false;
    }
    if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)){
    return false;
    }
    if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)){
    return false;
    }
    if(e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)){
    return false;
    }
    if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)){
    return false;
    }
    if(e.ctrlKey && e.keyCode == 'S'.charCodeAt(0)){
    return false;
    }
    if(e.ctrlKey && e.keyCode == 'H'.charCodeAt(0)){
    return false;
    }
    if(e.ctrlKey && e.keyCode == 'A'.charCodeAt(0)){
    return false;
    }
    if(e.ctrlKey && e.keyCode == 'F'.charCodeAt(0)){
    return false;
    }
    if(e.ctrlKey && e.keyCode == 'E'.charCodeAt(0)){
    return false;
    }
}
