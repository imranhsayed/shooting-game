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
    gunImage: null,
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

    init: function () {
        document.querySelector( '.main-content' ).classList.add( 'display');
        var musicBeforeGameStart = document.getElementById( 'music-before-start');
        musicBeforeGameStart.play();
        $( 'button.level1-start-button' ).on( 'click', birdAction.startLevelOne );
        $( 'button.level2-start-button' ).on( 'click', birdAction.startLevelTwo );

        $( 'body' ).on( 'mousemove', birdAction.imgFollowCursor );
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
        birdAction.requiredScore = birdAction.birdNoToSend * 10;
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
        birdAction.requiredScore = birdAction.birdNoToSend * 100;
        birdAction.gameTimer = 90; // in secs



        // if( )
        document.querySelector( 'section' ).classList.remove( 'display' );
        if( $( 'section').hasClass( 'rain') ){
            document.querySelector( 'section' ).classList.remove( 'rain' );
        }
        if( 0 != $( 'section' ).find( 'div.drop').length ){
            for( var i = 1; i < birdAction.nbRainDrop; i++){
                document.getElementById( 'drop' + i  ).remove();
            }
        }
        document.querySelector( '.game-over').classList.add( 'display');


        var body = document.querySelector( 'body');
        body.style.backgroundImage = "url( 'images/landscape.gif' )";
        birdAction.birdMoveNew();
        birdAction.gameTimerLevel2();

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
            var birdManShot = true;
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
        var playArea = document.querySelector( '.main-content' );
        playArea.style.cursor = "url( 'images/gun-aim.png' ), auto";

    },
    createGunImage: function () {
        var  gameArea = document.querySelector( 'footer' );

        birdAction.gunImage = document.createElement( 'img' );
        birdAction.gunImage.setAttribute( 'src', 'images/manshooting.png' );
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
    gameTimerLevel1: function ( ) {
         birdAction.t = birdAction.gameTimer;

        // console.log( 'required score = ', birdAction.requiredScore );
        document.querySelector( '.target-score ' ).innerText = birdAction.requiredScore;
        var scoreIntervalCheck = setInterval( function () {

            birdAction.t = birdAction.t - 1;
            var timeLeftP = document.querySelector( '.time-left' );
            timeLeftP.innerText =  birdAction.t ;
            if( 20 > birdAction.t ){
                timeLeftP.style.color = 'orange';
                timeLeftP.style.fontSize = '80px';
            }
            if( 10 > birdAction.t ){

                timeLeftP.classList.add( 'nine-sec-to-go' );
            }
            if( 0 === birdAction.t ){
                birdAction.gameOverLevel1( birdAction.t );
                clearInterval( scoreIntervalCheck );
                return;
            }

            if( ( birdAction.requiredScore <=  birdAction.score ) && ( 0 < birdAction.t ) )  {
                // console.log( 'score achieved', birdAction.score );
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
            if( 20 > birdAction.t ){
                timeLeftP.style.color = 'orange';
                timeLeftP.style.fontSize = '80px';
            }
            if( 10 > birdAction.t ){

                timeLeftP.classList.add( 'nine-sec-to-go' );
            }
            if( 0 === birdAction.t ){
                birdAction.gameOverLevel2( birdAction.t );
                clearInterval( scoreIntervalCheck );
                return;
            }

            if( ( birdAction.requiredScore <=  birdAction.score ) && ( 0 < birdAction.t ) )  {
                // console.log( 'score achieved', birdAction.score );
                birdAction.gameOverLevel2( birdAction.t );
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

        }else{


            gameOverScore.innerText = 'You Scored ' + birdAction.score + ' pts ' + 'in '
                + birdAction.gameTimer + ' secs';

            if( birdManShot === true ){
                birdAction.score = 0;
                $( '<p></p>', {
                    text: 'Oops! You killed the BIRDMAN . Any progress Made is lost.Please go back to the home screen and restart',
                    class: 'birdman-killed'
                } ).prependTo( gameOverScore );
            }else{
                var couldNotScoreEl = document.createElement( 'p' ),
                    couldNotScoreText = document.createTextNode( 'Sorry you could not score the required target. Please Try Again' );
                couldNotScoreEl.appendChild( couldNotScoreText );
                gameOverScore.appendChild( couldNotScoreEl );
            }
            $( '.level2-start-button' ).replaceWith( '<button class="level1-start-button">Go to Home Screen and Start Again</button>' );
            $( 'button.level1-start-button' ).on( 'click', birdAction.gameRestartLevel1 );

        }

        document.querySelector( '.game-over').classList.remove( 'display');
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
                text: 'Congratulations You have made it to the Next level.',
                class: 'congrats-text'
            } ).prependTo( gameOverScore );

        }else{


            gameOverScore.innerText = 'You Scored ' + birdAction.score + ' pts ' + 'in '
                + birdAction.gameTimer + ' secs';
            var couldNotScoreEl = document.createElement( 'p' ),
                couldNotScoreText = document.createTextNode( 'Sorry you could not score the required target. Please Try Again' );
            couldNotScoreEl.appendChild( couldNotScoreText );
            gameOverScore.appendChild( couldNotScoreEl );
            $( '.level2-start-button' ).replaceWith( '<button class="level2-start-button">Start Again</button>' );
            $( 'button.level2-start-button' ).on( 'click', birdAction.gameRestartLevel2 );

        }

        document.querySelector( '.game-over').classList.remove( 'display');

    },


    gameRestartLevel1: function () {
        location.reload();

    },
    gameRestartLevel2: function () {
        birdAction.score = 0;
        birdAction.gameTimer = 0;

        /**
         * Start Rain Music
         */
        birdAction.audioRainDrop.play();
        birdAction.audioBirdFlap.play();
        /**
         * Start rain
         */
        document.querySelector( 'section' ).classList.add( 'rain' );
        document.querySelector( 'section' ).classList.remove( 'display' );
        document.querySelector( '.game-over').classList.add( 'display');
        birdAction.startLevelTwo();
    }
};

birdAction.init();