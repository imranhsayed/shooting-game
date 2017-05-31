/**
 * Created by ghafir on 25/05/17.
 */

var birdAction = {

    score: 0,
    t: 0,
    gameTimer: 0,
    scoreBox: 0,
    requiredScore: 0,
    nbRainDrop: 300,
    audioBirdFlap: null,
    audioRainDrop: null,
    backgroundMusicLevel1: null,
    backgroundMusicLevel2: null,
    backgroundMusicLevel3: null,
    thunderstormMusic: null,
    angryDragonScream:null,
    dragonImageEl: null,
    gunImage: null,
    gunImageSrc: 'images/manshooting.png',
    birdImageLeft: null,
    birdImageRight: null,
    newBirdLeft: null,
    newBirdRight: null,
    birdImgSourceLeft: 'images/giphy-bird-left.gif',
    birdImgSourceRight: 'images/giphy-bird-right.gif',
    birdNestDivNo: 0,
    arrayLeftDivId: [],
    arrayRightDivId: [],
    totalBirdsFlew:[],
    totalBirdsShot:[],
    birdsMissed: null,
    randLeft: null,
    randRight: null,
    birdInterval: 100,
    birdNoToSend: 0,
    randRange: 10,
    birdSpeed: 10000,
    health: 200,

    init: function () {

        document.querySelector( '.main-content' ).classList.add( 'display');
        birdAction.backgroundMusicLevel1 = document.getElementById( 'music-before-start');
        birdAction.backgroundMusicLevel2 = document.getElementById( 'background-music-level2' );
        birdAction.backgroundMusicLevel3 = document.getElementById( 'background-music-level3' );
        birdAction.backgroundMusicLevel1.play();
        $( '.level1-read-instructions' ).on( 'click', birdAction.gameInstructions );
        $( 'button.level1-start-button' ).on( 'click', birdAction.startLevelOne );
        $( 'button.level2-start-button' ).on( 'click', birdAction.startLevelTwo );

        $( 'body' ).on( 'mousemove', birdAction.imgFollowCursor );
    },

    gameInstructions: function () {
        $( '.level1-instructions-div' ).slideToggle( 2000 ).delay( 50000).slideToggle( 3000 );
    },

    startLevelOne: function(){
        /**
         * meaning after how many seconds next bird will be sent
         * @type {number}
         */
        birdAction.birdInterval = 3000;

        /**
         * birdNoToSend is in multiples of 2 .
         * If you choose 2 meaning 4 birds will be sent
         * @type {number}
         */
        birdAction.birdNoToSend = 20;

        birdAction.birdNestDivNo = 20;

        /*
         * ids to be created from zero up until range
         */
        birdAction.randRange = birdAction.birdNestDivNo;
        birdAction.birdSpeed = 20000;
        birdAction.requiredScore = birdAction.birdNoToSend * 10 ;
        birdAction.gameTimer = 60; // in secs

        birdAction.createRain();
        birdAction.audioRainDrop = document.getElementById( 'rain-falling');
        birdAction.audioRainDrop.play();
        var body = document.querySelector( 'body');
        body.style.backgroundImage = "url( 'images/night-jungle-background.jpg' )";
        birdAction.birdMoveNew();
        birdAction.gameTimerLevel1();
    },
    startLevelTwo: function(){

        birdAction.backgroundMusicLevel1.pause();
        document.querySelector( '.game-over-score' ).textContent = "";
        birdAction.backgroundMusicLevel2.play();
        document.querySelector( '.target-score ' ).innerText = 0;
        birdAction.gameTimer = 0;

        birdAction.score = 0; // update score back to zero for level two
        birdAction.addScore();
        var timeLeftP = document.querySelector( '.time-left' );
        timeLeftP.classList.remove( 'nine-sec-to-go' );




        var birdsDivs = $( '.birds-div' );
        if ( birdsDivs.children().length ){
            birdsDivs.remove();
            console.log( birdsDivs );
        }

        birdAction.birdImgSourceLeft ='images/level2-bird-left.gif';
        birdAction.birdImgSourceRight ='images/level2-bird-right.gif';
        /**
         * meaning after how many seconds next bird will be sent
         * @type {number}
         */
        birdAction.birdInterval = 2000;

        /**
         * birdNoToSend is in multiples of 4 .
         * If you choose 2 meaning 4 birds will be sent
         * @type {number}
         */
        birdAction.birdNoToSend = 40;


        birdAction.birdNestDivNo = 40;
        /*
         * ids to be created from zero up until range
         */
        birdAction.randRange = birdAction.birdNestDivNo;
        birdAction.birdSpeed = 15000;
        birdAction.requiredScore = birdAction.birdNoToSend * 10;
        birdAction.gameTimer = 90; // in secs



        document.querySelector( 'section' ).classList.remove( 'display' );
        birdAction.stopRain();
        document.querySelector( '.game-over').classList.add( 'display');


        var body = document.querySelector( 'body');
        body.style.backgroundImage = "url( 'images/landscape.gif' )";
        birdAction.birdMoveNew();
        birdAction.gameTimerLevel2();

    },

    startLevelThree: function () {
        birdAction.gameTimer = 90;
        if ( true === $( '.content div').first( ).hasClass( 'left-bird-nest' ) && false === $( '.left-bird-nest' ).hasClass( 'display' )   ){
            document.querySelector( '.left-bird-nest' ).remove();
            document.querySelector( '.right-bird-nest' ).remove();

        }
        document.querySelector( '.gun-image' ).classList.add( 'display' );
        document.querySelector( '.score-div' ).classList.add( 'display' );
        document.querySelector( '.time-remaining' ).classList.add( 'display' );



        birdAction.backgroundMusicLevel2.pause();
        birdAction.thunderstormMusic = document.getElementById( 'thunderstorm-clip' ),
        birdAction.angryDragonScream = document.getElementById( 'angry-dragon' );
        birdAction.thunderstormMusic.play();
        birdAction.angryDragonScream.addEventListener( 'ended', function() {
            this.currentTime = 0;
            this.play();
        }, false);
        birdAction.angryDragonScream.play();

        document.querySelector( '.content' ).style.float = 'right';
        /**
         * Short lightening effect
         * @type {Element}
         */
        var body = document.querySelector( 'body');
        var lightening = 0;
        var shortLightening = setInterval( function () {
            lightening = lightening + 1;
            /**
             *  Till 10 secs
             */
            if ( lightening > 10 ){
                body.style.backgroundImage = "url( 'images/dark-castle.gif' )";
                /**
                 * looping through the music
                 */
                birdAction.backgroundMusicLevel3.addEventListener( 'ended', function() {
                    this.currentTime = 0;
                    this.play();
                }, false);
                birdAction.backgroundMusicLevel3.play();
                document.querySelector( '.gun-image' ).classList.remove( 'display');
                if( true === $( '.header' ).hasClass( 'display' ) ){
                    document.querySelector( '.header' ).classList.remove( 'display' );
                }

                    $( '<p></p>', {
                        class: 'dragon-health-name',
                        text: 'Dragon Health Bar'
                    }).appendTo( '.header' );
                    $( '<progress></progress>', {
                        id: 'health',
                        class: 'progress-class',
                        value: '200',
                        max:'400',
                    }).appendTo( '.header' );

                birdAction.health = document.getElementById( "health" );
                document.querySelector( '.time-remaining' ).classList.remove( 'display' );
                var dragonEntryGreen = document.querySelector( '.dragon-entry-green' );
                birdAction.dragonImageEl = dragonEntryGreen;
                dragonEntryGreen.addEventListener( 'click', birdAction.dragonHitStronger )
                birdAction.newDragonEntry();
                clearInterval( shortLightening );
                return;
            }
            if( body.style.backgroundImage != "url( 'images/lightening-img.gif' )" ){
                body.style.backgroundImage = "url( 'images/lightening-img.gif' )";
            }
            if( false === $( '.content').children().hasClass( 'dragon-entry-green') ){
                $( '<img></img>', {
                    src: 'images/dragon-entry-green.gif',
                    class: 'dragon-entry-green'

                } ).animate(
                    {
                        'position': 'absolute',
                        'top': '0px',
                        'right': '350px'
                    }, 10000
                )
                    .prependTo( '.content' );
            }



        },1000);

        if ( false === $( '.game-over' ).hasClass( 'display')   ){
                document.querySelector( '.game-over' ).classList.add( 'display');
        }

        birdAction.gameTimerLevel3();
        if ( true === $( 'section' ).hasClass( 'display')   ){
            document.querySelector( 'section' ).classList.remove( 'display');
        }

        document.querySelector( 'section' ).classList.add( 'rain');
        birdAction.createRain();

    },

    birdMoveNew: function (event) {

        document.querySelector( '.main-content' ).classList.remove( 'display');
        document.querySelector( '.before-game-start').classList.add( 'display');
        birdAction.audioBirdFlap = document.getElementById( 'bird-flapping' );
        birdAction.audioBirdFlap.play();

        // document.querySelector( 'button' ).disabled = true;
        document.querySelector( 'button' ).classList.add( 'display');

        birdAction.changeCursor();

        if ( null === birdAction.gunImage ) {
            birdAction.createGunImage();
        }

        var z = 0, k = 0,
            leftDiv = document.querySelector( '.left-bird-nest' ),
            rightDiv = document.querySelector( '.right-bird-nest' );
        /**
         * Making bird nest divs
          */
        if( $( leftDiv ).children().length === 0 && $( rightDiv).children().length === 0 ){
            for( var i = 0; i < birdAction.birdNestDivNo; i++  ){
                console.log( 'nest divs made' );
                var divLeftBird = document.createElement( 'div' ),
                    divRightBird = document.createElement( 'div' ),
                    rightId = i + birdAction.birdNestDivNo;

                divLeftBird.setAttribute( 'id', 'id' + i );
                divLeftBird.setAttribute( 'class', 'birds-div')
                divRightBird.setAttribute( 'id', 'id' + rightId );
                divRightBird.setAttribute( 'class', 'birds-div')

                rightDiv.appendChild( divRightBird );
                leftDiv.appendChild( divLeftBird );

                }
        }


        var interval = setInterval( function () {
            if ( z > birdAction.birdNoToSend ){
                clearInterval( interval );
                console.log( 'z = ', z );
                return;
            }
            if ( 0 === birdAction.t ){
                clearInterval( interval );
                return;
            }
            if( ( birdAction.requiredScore <=  birdAction.score ) && ( 0 < birdAction.t ) )  {
                clearInterval( interval );
                return;
            }
            console.log( 'z:', z );
            // console.log( 'Current birdAction Score = ', birdAction.score );

            birdAction.createBirdsLeft();

            $( birdAction.newBirdLeft ).animate(
                {
                    'bottom': window.innerHeight,
                    'left': window.innerWidth
                },
                {
                    duration:birdAction.birdSpeed,
                    complete: function () {
                        console.log( 'complete' );


                    }
                }
            );
            birdAction.createBirdsRight();

            $( birdAction.newBirdRight ).delay(1000).animate(
                {
                    'bottom': window.innerHeight,
                    'right': window.innerWidth
                },
                {
                    duration:birdAction.birdSpeed,
                    complete: function () {
                        $( this ).remove();
                        console.log( 'complete 2nd' );

                    }
                }
            );
            z = z + 1;

        },birdAction.birdInterval );


    },
    createBirdsLeft: function () {
        var leftBirdNest;
        /*
         Checking if random id already exists, if yes make a new one.
         */
        birdAction.createRandomIdLeft();
        // console.log( 'First randLeft Created: ' , birdAction.randLeft );

        birdAction.randomIdCheckerLeft();
        // console.log( 'After Checking New RandLeft: ' , birdAction.randLeft );
        // console.log( 'arrayLeftDivId: ' , birdAction.arrayLeftDivId );

        leftBirdNest = document.getElementById( 'id' + birdAction.randLeft );

        if( "" === leftBirdNest.innerHTML ){
            birdAction.newBirdLeft = document.createElement( 'img' );
            birdAction.newBirdLeft.setAttribute( 'class', 'bird' );
            if( 5 === birdAction.randLeft ){

                birdAction.newBirdLeft.setAttribute( 'src', 'images/man-flying.gif' );
                birdAction.newBirdLeft.setAttribute( 'class', 'man-bird-image');

            }else{
                birdAction.newBirdLeft.setAttribute( 'src', birdAction.birdImgSourceLeft );
            }
            leftBirdNest.appendChild( birdAction.newBirdLeft );
            birdAction.newBirdLeft.addEventListener( 'click', birdAction.birdDisappear );
        }
        // console.log( 'After Appending to div ,Div is : ', leftBirdNest );

    },
    createBirdsRight: function () {
        var rightBirdNest;

        /**
         * Checking if random id already exists, if yes make a new one.
         */
        birdAction.createRandomIdRight();
        // console.log( 'First randRight Created: ' , birdAction.randLeft );

        birdAction.randomIdCheckerRight();
        // console.log( 'randRight: ' , birdAction.randRight );
        // console.log( 'arrayRightDivId: ' , birdAction.arrayRightDivId );

        rightBirdNest = document.getElementById( 'id' + birdAction.randRight );

        if( "" === rightBirdNest.innerHTML ) {
            birdAction.newBirdRight = document.createElement( 'img' );
            birdAction.newBirdRight.setAttribute( 'class', 'bird' );
            birdAction.newBirdRight.setAttribute( 'src', birdAction.birdImgSourceRight );
            rightBirdNest.appendChild(birdAction.newBirdRight);
            birdAction.newBirdRight.addEventListener( 'click', birdAction.birdDisappear );

        }
    },
    createRandomIdLeft: function () {
        birdAction.randLeft = Math.floor( Math.random() * birdAction.randRange );;
    },
    createRandomIdRight: function () {
        birdAction.randRight = birdAction.birdNestDivNo + Math.floor( Math.random() * birdAction.randRange );;
    },

    randomIdCheckerLeft: function () {
        var itemCheck = $.inArray( 'id' + birdAction.randLeft, birdAction.arrayLeftDivId);
        // console.log( 'itemLeftExists? : ', itemCheck );

        if ( -1 !== itemCheck ){
            birdAction.createRandomIdLeft();
        } else{
            birdAction.arrayLeftDivId.push( 'id' + birdAction.randLeft);
        }
    },
    randomIdCheckerRight: function () {
        var itemCheck = $.inArray( 'id' + birdAction.randRight, birdAction.arrayRightDivId);
        // console.log( 'itemRightExists? : ', itemCheck );
        if( -1 !== itemCheck ){
            birdAction.createRandomIdRight();
        }else{
            birdAction.arrayRightDivId.push( 'id' + birdAction.randRight );
        }
    },
    birdDisappear: function ( event ) {
        if( $( event.target ).hasClass( 'man-bird-image')){
            var birdManShot = 1;
            birdAction.gameOverLevel1( birdManShot );
        }
        var audio = document.getElementById( 'audio' );

        var birdHitId = event.target.parentNode.getAttribute( 'id' );

        birdAction.totalBirdsShot.push( birdHitId );
        // console.log( 'totalBirdsShot', birdAction.totalBirdsShot );
        event.target.setAttribute( 'src', 'images/blood-splatter.jpg' );
        event.target.classList.add( 'blood-splat-img' );
        audio.play();
        event.target.parentNode.classList.add( 'animated' );
        event.target.parentNode.classList.add( 'fadeOut' );

        birdAction.score = birdAction.score + 100;
        birdAction.addScore();
    },

    addScore: function () {
        birdAction.scoreBox = document.querySelector( '.score-box' );
        birdAction.scoreBox.innerText= birdAction.score;
    },

    changeCursor: function () {
        var playArea = document.querySelector( 'body' );
        playArea.style.cursor = "url( 'images/gun-aim.png' ), auto";

    },
    createGunImage: function () {
        var  gameArea = document.querySelector( 'footer' );

        birdAction.gunImage = document.createElement( 'img' );
        birdAction.gunImage.setAttribute( 'src', birdAction.gunImageSrc );
        birdAction.gunImage.setAttribute( 'class', 'gun-image');
        gameArea.appendChild( birdAction.gunImage );

    },
    imgFollowCursor: function (event) {
        var left, top;


        if ( event.pageX > ( window.innerWidth / 2 ) ) {
            left = event.pageX + 100,
                top = event.pageY - 50;
            $( birdAction.gunImage ).addClass( 'look-left' );
            $( birdAction.gunImage ).css( 'left', left );
            $( birdAction.gunImage ).css( 'top', top );
        } else {
            left = event.pageX - 300;
            top = event.pageY + 200;
            $( birdAction.gunImage ).removeClass( 'look-left' );
            $( birdAction.gunImage ).css( 'left', left );
            $( birdAction.gunImage ).css( 'top', top );
        }

    },

    createRain: function () {
        /**
         * number of drops created.
         * @type {number}
         */
        birdAction.nbRainDrop = 300;

        /**
         * function to generate a random number range.
          * @param minNum
         * @param maxNum
         * @return {*}
         */
        function randRange( minNum, maxNum) {
            return (Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum);
        }

        /**
         * function to generate drops
         */
        for( i = 1; i < birdAction.nbRainDrop ; i++ ) {
            var dropLeft = randRange(0,1600);
            var dropTop = randRange(-1000,1400);

            $('.rain').append('<div class="drop" id="drop'+i+'"></div>');
            $('#drop'+i).css('left',dropLeft);
            $('#drop'+i).css('top',dropTop);
        }
    },

    stopRain: function () {
        if( $( 'section').hasClass( 'rain') ){
            document.querySelector( 'section' ).classList.remove( 'rain' );
        }
        if( 0 != $( 'section' ).find( 'div.drop').length ){
            for( var i = 1; i < birdAction.nbRainDrop; i++){
                document.getElementById( 'drop' + i  ).remove();
            }
        }
    },

    gameTimerLevel1: function ( ) {
         birdAction.t = birdAction.gameTimer;

        // console.log( 'required score = ', birdAction.requiredScore );
        document.querySelector( '.target-score ' ).innerText = birdAction.requiredScore;
        var scoreIntervalCheck = setInterval( function () {

            birdAction.t = birdAction.t - 1;
            var timeLeftP = document.querySelector( '.time-left' );
            timeLeftP.innerText =  birdAction.t ;
            if( 20 > birdAction.t ){
                timeLeftP.classList.add( 'twenty-sec-to-go' );

            }
            if( 10 > birdAction.t ){
                timeLeftP.classList.remove( 'twenty-sec-to-go' );
                timeLeftP.classList.add( 'nine-sec-to-go' );
            }
            if( ( birdAction.requiredScore >  birdAction.score ) && ( 0 === birdAction.t ) ){
                if( $( timeLeftP ).hasClass( 'twenty-sec-to-go') ){
                    timeLeftP.classList.remove( 'twenty-sec-to-go' );
                }
                timeLeftP.classList.remove( 'nine-sec-to-go' );
                birdAction.gameOverLevel1( birdAction.t );
                clearInterval( scoreIntervalCheck );
                return;
            }

            if( ( birdAction.requiredScore <=  birdAction.score ) && ( 0 < birdAction.t ) )  {
                birdAction.gameOverLevel1( birdAction.t );
                clearInterval( scoreIntervalCheck );
            }
        },1000);
    },
    gameTimerLevel2: function () {
        birdAction.t = birdAction.gameTimer;

        // console.log( 'required score = ', birdAction.requiredScore );
        document.querySelector( '.target-score ' ).innerText = birdAction.requiredScore;
        var scoreIntervalCheck = setInterval( function () {

            birdAction.t = birdAction.t - 1;
            var timeLeftP = document.querySelector( '.time-left' );
            timeLeftP.innerText =  birdAction.t ;
            if( $( timeLeftP ).hasClass( 'twenty-sec-to-go') ){
                timeLeftP.classList.remove( 'twenty-sec-to-go' );
            }
            if( $( timeLeftP ).hasClass( 'nine-sec-to-go' ) ){
                timeLeftP.classList.remove( 'nine-sec-to-go' );
            }
            if( 20 > birdAction.t ){

                timeLeftP.classList.add( 'twenty-sec-to-go' );
            }
            if( 10 > birdAction.t ){
                timeLeftP.classList.remove( 'twenty-sec-to-go' );
                timeLeftP.classList.add( 'nine-sec-to-go' );
            }
            if( 0 === birdAction.t ){
                if( $( timeLeftP ).hasClass( 'twenty-sec-to-go') ){
                    timeLeftP.classList.remove( 'twenty-sec-to-go' );
                }
                timeLeftP.classList.remove( 'nine-sec-to-go' );
                birdAction.gameOverLevel2( birdAction.t );
                clearInterval( scoreIntervalCheck );
                return;
            }

            if( ( birdAction.requiredScore <=  birdAction.score ) && ( 0 < birdAction.t ) )  {
                birdAction.gameOverLevel2( birdAction.t );
                clearInterval( scoreIntervalCheck );
            }
        },1000);
    },

    gameTimerLevel3: function () {
        birdAction.t = birdAction.gameTimer;
        var scoreIntervalCheck = setInterval( function () {

            birdAction.t = birdAction.t - 1;
            var timeLeftP = document.querySelector( '.time-left' );
            timeLeftP.innerText =  birdAction.t ;
            if( $( timeLeftP ).hasClass( 'twenty-sec-to-go') ){
                timeLeftP.classList.remove( 'twenty-sec-to-go' );
            }
            if( $( timeLeftP ).hasClass( 'nine-sec-to-go' ) ){
                timeLeftP.classList.remove( 'nine-sec-to-go' );
            }
            if( 20 > birdAction.t ){
                timeLeftP.classList.add( 'twenty-sec-to-go' );
            }
            if( 10 > birdAction.t ){
                timeLeftP.classList.remove( 'twenty-sec-to-go' );
                timeLeftP.classList.add( 'nine-sec-to-go' );
            }
            if( 0 === birdAction.t ){
                if( $( timeLeftP ).hasClass( 'twenty-sec-to-go') ){
                    timeLeftP.classList.remove( 'twenty-sec-to-go' );
                }
                timeLeftP.classList.remove( 'nine-sec-to-go' );
                birdAction.gameOverLevel3( birdAction.t );
                clearInterval( scoreIntervalCheck );
                return;
            }

            if( ( 0 ===  birdAction.health.value ) && ( 0 < birdAction.t ) )  {
                birdAction.gameOverLevel3( birdAction.t );
                clearInterval( scoreIntervalCheck );
            }
        },1000);

    },

    gameOverLevel1: function ( birdManShot ) {

        /**
         * Stop Rain Music
         */
        birdAction.audioRainDrop.pause();
        birdAction.audioBirdFlap.pause();

        /**
         * Stop rain
         */
        document.querySelector( 'section' ).classList.remove( 'rain' );
        document.querySelector( 'section' ).classList.add( 'display' );
        var gameOverScore = document.querySelector( '.game-over-score'),
            timeTookToFinish = birdAction.gameTimer - birdAction.t;

        if( birdAction.score >= birdAction.requiredScore ){

            gameOverScore.innerText = 'You Scored ' + birdAction.score + ' pts ' + 'in '
                + timeTookToFinish + ' secs';
            $( '<p></p>', {
                text: 'Congratulations You have made it to the Next level.',
                class: 'congrats-text'
            } ).prependTo( gameOverScore );
            document.querySelector( '.game-over').classList.remove( 'display');


        }else{


               if( 1 === birdManShot ){
                birdAction.score = 0;
                gameOverScore.classList.add( 'birdman-came' );
                var manScreamAudio = document.getElementById( 'man-scream' );
                manScreamAudio.play();

                $( '<p></p>', {
                    text: 'Oops! You killed the BIRDMAN . Any progress Made is lost. Please go back to the home screen and restart.' +
                    'Your Scored Points have changed to :- ',
                    class: 'bird-man-killed',
                    color: 'red'
                } ).prependTo( gameOverScore );
                $( '<p></p>', {
                    text: 'BIRDMAN: The man who has wings is called Birdman.' +
                    ' He may or may not come in any level.But when he does ensure that you don’t shoot him.' +
                    ' He is your friend and under no circumstances should be killed. ' +
                    'If he is shot then the game will be over . ' +
                    'Any progress you might have made in the game will be lost . Point score will change to 0. ' +
                    'And you will need to restart the game from level one, irrespective of what level you might be on.',
                    class: 'bird-man-tip',
                    color: 'black'
                } ).prependTo( gameOverScore );
                   $( '.level2-start-button' ).replaceWith( '<button class="level1-start-button">Go to Home Screen and Start Again</button>' );
                   $( 'button.level1-start-button' ).on( 'click', birdAction.gameRestartLevel1 );
                   document.querySelector( '.game-over').classList.remove( 'display');
                   return;
            }else{
                    if( false === $( '.game-over-score' ).hasClass( 'birdman-came' ) ){
                        console.log( 'birdmanshot = ', birdManShot );
                        gameOverScore.innerText = 'You Scored ' + birdAction.score + ' pts ' + 'in '
                            + birdAction.gameTimer + ' secs';
                        var couldNotScoreEl = document.createElement('p'),
                            couldNotScoreText = document.createTextNode('Sorry you could not score the required target. Please Try Again');
                        couldNotScoreEl.appendChild(couldNotScoreText);
                        gameOverScore.appendChild(couldNotScoreEl);
                        $( '.level2-start-button' ).replaceWith( '<button class="level1-start-button">Go to Home Screen and Start Again</button>' );
                        $( 'button.level1-start-button' ).on( 'click', birdAction.gameRestartLevel1 );
                        document.querySelector( '.game-over').classList.remove( 'display');
                        return;
                    }
            }

        }

    },

    gameOverLevel2: function () {
        /**
         * Stop Rain Music
         */
        birdAction.audioRainDrop.pause();
        birdAction.audioBirdFlap.pause();

        /**
         * Stop rain
         */
        document.querySelector( 'section' ).classList.remove( 'rain' );
        document.querySelector( 'section' ).classList.add( 'display' );
        var gameOverScore = document.querySelector( '.game-over-score'),
            timeTookToFinish = birdAction.gameTimer - birdAction.t;

        if( birdAction.score >= birdAction.requiredScore ){

            gameOverScore.innerText = 'You Scored ' + birdAction.score + ' pts ' + 'in '
                + timeTookToFinish + ' secs';
            $( '<p></p>', {
                text: 'Congratulations You have made it to the Next level. You have unlocked the Level3 : The Angry Dragon',
                class: 'congrats-text'
            } ).prependTo( gameOverScore );
            $( '<p></p>', {
                text: 'About the Dragon: This dragon has been sleeping in his castle in the jungle for years.' +
                ' However your shooting business has disturbed his sleep. He is now awake and is ' +
                'very angry. You must find a way to put him back to sleep. Its tricky to beat the Dragon.' +
                ' However, I leave this in your able hands to accept the challenge to beat him. If you are not able to ,' +
                ' then the trick to beat him will be shared with you.',
                class: 'dragon-story'
            } ).appendTo( gameOverScore );
            document.querySelector( '.level2-start-button' ).classList.add( 'display' );
            document.querySelector( '.level3-start-button' ).classList.remove( 'display' );
            $( 'button.level3-start-button' ).on( 'click', birdAction.startLevelThree );


        }else{

            if( false === $( '.game-over-score' ).hasClass( 'birdman-came' ) ) {

                gameOverScore.innerText = 'You Scored ' + birdAction.score + ' pts ' + 'in '
                    + birdAction.gameTimer + ' secs';
                var couldNotScoreEl = document.createElement('p'),
                    couldNotScoreText = document.createTextNode('Sorry you could not score the required target. Please Try Again'),
                    birdTipEl = document.createElement('p'),
                    birdTipText = document.createTextNode('Tip : Try Shooting the birds which are about to leave the game play area ' +
                        'to ensure you don’t miss onto them. The others who still have time to reach the end can be shot later.' +
                        ' Some birds are very smart and would keep flying at the bottom for a short period and then disappear. While a few will' +
                        ' fly in groups together making it more challenging for you to hit them. So be alert so that they are not missed.'
                    );
                birdTipEl.appendChild( birdTipText );
                birdTipEl.setAttribute( 'class', 'bird-tip' );
                couldNotScoreEl.appendChild( couldNotScoreText );
                gameOverScore.appendChild( couldNotScoreEl );
                gameOverScore.appendChild( birdTipEl );

                $('.level2-start-button').replaceWith('<button class="level2-start-button">Start Again</button>');
                $('button.level2-start-button').on('click', birdAction.gameRestartLevel2);
            }

        }

        document.querySelector( '.game-over').classList.remove( 'display');

    },
    gameOverLevel3: function () {
        birdAction.angryDragonScream.pause();
        if( $( '.content' ).children().hasClass( 'dragon-entry-green' ) ){
            document.querySelector( '.dragon-entry-green' ).remove();
        }
        birdAction.stopRain();
        document.querySelector( '.header' ).classList.add( 'display' );

        var timeTookToFinish = birdAction.gameTimer - birdAction.t,
            gameOverDiv = document.querySelector( '.game-over'),
            gameOverScore = document.querySelector( '.game-over-score');

            if( ( birdAction.health.value ===  0 ) && ( 0 < birdAction.t ) )  {

            $( '<img></img>', {
                src: 'images/dragon-sleeping.gif',
                class: 'sleeping-dragon'
            } ).prependTo( gameOverDiv );
            $( '<p></p>', {
                text: 'Congratulations You have completed all three levels.You have put the Dragon back to Sleep in '
                        + timeTookToFinish + ' secs. ' +' Go back to the home Screen and Restart the Game',
                class: 'congrats-text'
            } ).prependTo( gameOverDiv );
                document.querySelector( '.game-over-score' ).textContent = "";
                $( '.level3-start-button' ).replaceWith( '<button class="level2-start-button">Go to Home Screen</button>' );
            $( 'button.level2-start-button' ).on( 'click', birdAction.gameRestartLevel1 );
        }else{

                var couldNotScoreEl = document.createElement( 'p' ),
                    couldNotScoreText = document.createTextNode( 'Sorry you could not put the Dragon to Sleep in Required Time. Please Try Again' ),
                    dragonKillingTipEl = document.createElement('p'),
                    dragonKillingTipText = document.createTextNode('Tip on How to put the Dragon back to Sleep : The dragons outer skin ' +
                        'is very strong and your bullets cannot harm him. If you shoot him he will eat the fire' +
                        ' from your bullets and get stronger and bigger. So how do we put him back to sleep. ' +
                        'The dragon at some stage will spit fire and start becoming red. Once he has spit out all his fire ' +
                        'and becomes completely red. His skin becomes softer and vulnerable because of heat .' +
                        'Your bullets have tranquilizers. This is the time you need to attack him and put him ' +
                        'back to sleep. Best of Luck This Time!'
                    );
                dragonKillingTipEl.appendChild( dragonKillingTipText );
                dragonKillingTipEl.setAttribute( 'class', 'dragon-killing-tip' );
                couldNotScoreEl.appendChild( couldNotScoreText );
                document.querySelector( '.game-over-score' ).textContent = "";
                gameOverScore.appendChild( couldNotScoreEl );
                gameOverScore.appendChild( dragonKillingTipEl );
                document.querySelector( '.level2-start-button' ).classList.add( 'display' );
                document.querySelector( '.level3-start-button' ).classList.remove( 'display' );
                document.querySelector( 'progress' ).remove();
                document.querySelector( '.dragon-health-name' ).remove();

                // $( 'button.level3-start-button' ).on( 'click', birdAction.startLevelThree );
            }
        document.querySelector( '.game-over').classList.remove( 'display' );





    },

    gameRestartLevel1: function () {
        location.reload();

    },
    gameRestartLevel2: function () {
        birdAction.score = 0;
        birdAction.gameTimer = 0;

        birdAction.audioBirdFlap.play();
        /**
         * Start rain
         */
        document.querySelector( 'section' ).classList.add( 'rain' );
        document.querySelector( 'section' ).classList.remove( 'display' );
        document.querySelector( '.game-over').classList.add( 'display');
        birdAction.startLevelTwo();
    },
    newDragonEntry: function () {

        var timeInterval = 0;
        var newDragonEntryInterval = setInterval( function () {
            timeInterval += 1;
            console.log( 'Main timeInterval = ', timeInterval );

            /**
             * After 15 secs from the start of Level3 Game
             */
            if ( timeInterval > 5 ){
                $( '.dragon-entry-green' ).fadeOut( 2000 );
            }
            if ( timeInterval > 10 ){
                if( false === $( '.content').children().hasClass( 'dragon-entry-brown') ){
                    console.log( 'Dragon-entry-brown at 11 sec = ', timeInterval );
                    $( '.dragon-entry-green' ).remove();
                    $( '<img></img>', {
                        src: 'images/dragon-entry-brown.png',
                        class: 'dragon-entry-brown'

                    } ).fadeIn(1000)
                        .delay( 2000 )
                        .prependTo( '.content' )
                        .animate(
                            {
                                'position': 'absolute',
                                'bottom': '400px',
                                'right': '1500px'
                            }, 9000
                        ).fadeOut( 5000 );
                    birdAction.dragonImageEl = document.querySelector( '.dragon-entry-brown');
                    birdAction.dragonImageEl.addEventListener( 'click', birdAction.dragonHitStronger );
                }
            }
            if ( timeInterval > 21 ){
                console.log( 'Dragon-entry-dark-green at 22 sec = ', timeInterval );
                $( '.dragon-entry-brown' ).remove();
                if( false === $( '.content').children().hasClass( 'dragon-entry-dark-green') ){
                    $( '<img></img>', {
                        src: 'images/dragon-entry-dark-green.gif',
                        class: 'dragon-entry-dark-green'

                    } ).fadeIn(1000)
                        .delay( 2000 )
                        .prependTo( '.content' )
                        .animate(
                            {
                                'position': 'absolute',
                                'left': '-700px',
                                'bottom': '1500px'
                            }, 7000
                        )
                        .fadeOut( 7000 );
                    birdAction.dragonImageEl = document.querySelector( '.dragon-entry-dark-green');
                    birdAction.dragonImageEl.addEventListener( 'click', birdAction.dragonHitStronger );
                }

            }
            if( timeInterval > 32 ){
                console.log( 'Dragon-fire-left at 33 sec = ', timeInterval );
                $( '.dragon-entry-dark-green' ).remove();
                if( false === $( '.content').children().hasClass( 'dragon-fire-left') ){
                    console.log( 'timeInterval dragon-fire-left = ', timeInterval );
                    $( '<img></img>', {
                        src: 'images/dragon-fire-left.gif',
                        class: 'dragon-fire-left'

                    } ).fadeIn(1000)
                        .prependTo( '.content' )
                        .animate(
                            {
                                'position': 'absolute',
                                'top': '-240px',
                                'left': '-900px'
                            }, 2000
                        )
                        .fadeOut( 5000 );
                }
            }
            if( timeInterval > 40 ){
                console.log( 'Dragon-fire-right at 41 sec = ', timeInterval );
                $( '.dragon-fire-left' ).remove();
                if( false === $( '.content').children().hasClass( 'dragon-fire-right') ){
                    $( '<img></img>', {
                        src: 'images/dragon-fire-right.gif',
                        class: 'dragon-fire-right'

                    } ).fadeIn(1000)
                        .prependTo( '.content' )
                        .animate(
                            {
                                'position': 'absolute',
                                'top': '-160px',
                                'left': '-170px'
                            }, 2000
                        )
                        .fadeOut( 5000 );
                }

            }

            if( timeInterval > 47 ){
                console.log( 'Dragon-fire-full at 48 sec = ', timeInterval );

                $( '.dragon-fire-right' ).remove();
                if( false === $( '.content').children().hasClass( 'dragon-fire') ){
                    $( '<img></img>', {
                        src: 'images/dragon-fire.gif',
                        class: 'dragon-fire'

                    } ).fadeIn(1000)
                        .prependTo( '.content' )
                        .animate(
                            {
                                'position': 'absolute',
                                'top': '400px',
                                'right': '200px'
                            }, 5000
                        )
                        .fadeOut( 4000 );
                }
            }
            /**
             * Dragon Red Vulnerable
             */
            if( timeInterval > 55 ){
                console.log( 'Dragon-fire-full at 56 sec = ', timeInterval );

                $( '.dragon-fire' ).remove();
                if( false === $( '.content').children().hasClass( 'dragon-final') ){
                    $( '<img></img>', {
                        src: 'images/dragon-final.gif',
                        class: 'dragon-final'

                    } ).fadeIn(1000)
                        .prependTo( '.content' )
                        .animate(
                            {
                                'position': 'absolute',
                                'bottom': '300px',
                                'right': '800px'
                            }, 10000
                        )
                        .fadeOut( 9000 );

                    birdAction.dragonImageEl = document.querySelector( '.dragon-final');
                    birdAction.dragonImageEl.addEventListener( 'click', birdAction.dragonHitVulnerable );
                }
            }

            if ( timeInterval > 80 ){
                console.log( 'Timeint at completion = ', timeInterval );

                $( '.dragon-final' ).remove();
                clearInterval( newDragonEntryInterval );
                return;
            }
        }, 1000);
    },
    dragonHitStronger: function () {
        var audio = document.getElementById( 'audio' );
        birdAction.health = document.getElementById( "health" );
        audio.play();
        birdAction.health.value += 5;
        var w, r, imgW, imgR ;
        imgW = parseInt( window.getComputedStyle( birdAction.dragonImageEl ).width);
        imgR = parseInt( window.getComputedStyle( birdAction.dragonImageEl ).right);
        if( 820 > imgW ){
            w = imgW + 20;
            r = imgR - 20;
            birdAction.dragonImageEl.style.width = w + 'px';
            birdAction.dragonImageEl.style.right = r + 'px';
            return;
        }
    },
    dragonHitVulnerable: function () {
        birdAction.health.value -= 5;
        $( birdAction.dragonImageEl ).fadeOut(100);
        $( birdAction.dragonImageEl ).fadeIn(100);
    }
};

birdAction.init();