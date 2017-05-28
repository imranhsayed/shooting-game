/**
 * Created by ghafir on 25/05/17.
 */

var birdAction = {

    score: 0,
    requiredScore: 0,
    gameTimer: 0,
    nbRainDrop: 300,
    audioBirdFlap: null,
    audioRainDrop: null,
    gunImage: null,
    newBirdLeft: null,
    newBirdRight: null,
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
        birdAction.birdInterval = 2000;

        /**
         * birdNoToSend is in multiples of 2 .
         * If you choose 2 meaning 4 birds will be sent
         * @type {number}
         */
        birdAction.birdNoToSend = 35;

        birdAction.birdNestDivNo = 25;

        /*
         * ids to be created from zero up until range
         */
        birdAction.randRange = birdAction.birdNestDivNo;
        birdAction.birdSpeed = 15000;
        birdAction.requiredScore = birdAction.birdNoToSend * 10;
        birdAction.gameTimer = 60; // in secs

        birdAction.createRain();
        birdAction.audioRainDrop = document.getElementById( 'rain-falling');
        birdAction.audioRainDrop.play();
        var body = document.querySelector( 'body');
        body.style.backgroundImage = "url( 'images/night-jungle-background.jpg' )";
        birdAction.birdMoveNew();
    },
    startLevelTwo: function(){
        birdAction.score = 0; // update score back to zero for level two
        birdAction.addScore();
        /**
         * meaning after how many seconds next bird will be sent
         * @type {number}
         */
        birdAction.birdInterval = 100;

        /**
         * birdNoToSend is in multiples of 4 .
         * If you choose 2 meaning 4 birds will be sent
         * @type {number}
         */
        birdAction.birdNoToSend = 30;


        birdAction.birdNestDivNo = 30;
        /*
         * ids to be created from zero up until range
         */
        birdAction.randRange = birdAction.birdNestDivNo;
        birdAction.birdSpeed = 10000;
        birdAction.requiredScore = birdAction.birdNoToSend * 150;
        birdAction.gameTimer = 180; // in secs




        document.querySelector( 'section' ).classList.remove( 'display' );
        document.querySelector( 'section' ).classList.remove( 'rain' );
        for( var i = 1; i < birdAction.nbRainDrop; i++){
            document.getElementById( 'drop' + i  ).remove();
        }

        document.querySelector( '.game-over').classList.add( 'display');


        var body = document.querySelector( 'body');
        body.style.backgroundImage = "url( 'images/landscape.png' )";
        birdAction.birdMoveNew();
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
        for( var i = 0; i < birdAction.birdNestDivNo; i++  ){
            console.log( 'nest divs made' );
            var divLeftBird = document.createElement( 'div' ),
                divRightBird = document.createElement( 'div' ),
                rightId = i + 10;

            divLeftBird.setAttribute( 'id', 'id' + i );
            divLeftBird.setAttribute( 'class', 'birds-div')
            divRightBird.setAttribute( 'id', 'id' + rightId );
            divRightBird.setAttribute( 'class', 'birds-div')

            rightDiv.appendChild( divRightBird );
            leftDiv.appendChild( divLeftBird );

        }

        var t = birdAction.gameTimer;

        console.log( 'required score = ', birdAction.requiredScore );
        document.querySelector( '.target-score ' ).innerText = birdAction.requiredScore;
        var scoreIntervalCheck = setInterval( function () {
            t = t - 1;
            var timeLeftP = document.querySelector( '.time-left' );
            timeLeftP.innerText =  t ;
            if( 20 > t ){
                timeLeftP.style.color = 'orange';
                timeLeftP.style.fontSize = '80px';
            }
            if( 10 > t ){
                timeLeftP.style.color = 'red';
                timeLeftP.style.fontSize = '500px';
                timeLeftP.style.opacity = '0.5';

            }
            if( 0 === t ){
                birdAction.gameOver();
                clearInterval( scoreIntervalCheck );
                return;
            }

            if( ( birdAction.requiredScore <=  birdAction.score ) && ( 0 < t ) )  {
                console.log( 'score achieved', birdAction.score );
                birdAction.gameOver( t );
                clearInterval( scoreIntervalCheck );
            }
        },1000);

        var interval = setInterval( function () {
            if ( z > birdAction.birdNoToSend ){
                clearInterval( interval );
                console.log( 'z = ', z );
                return;
            }
            console.log( 'z:', z );
            console.log( 'Current birdAction Score = ', birdAction.score );

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
        console.log( 'arrayLeftDivId: ' , birdAction.arrayLeftDivId );

        leftBirdNest = document.getElementById( 'id' + birdAction.randLeft );

        if( "" === leftBirdNest.innerHTML ){
            birdAction.newBirdLeft = document.createElement( 'img' );
            birdAction.newBirdLeft.setAttribute( 'class', 'bird' );
            birdAction.newBirdLeft.setAttribute( 'src', 'images/giphy-bird-left.gif');
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
        console.log( 'arrayRightDivId: ' , birdAction.arrayRightDivId );

        rightBirdNest = document.getElementById( 'id' + birdAction.randRight );

        if( "" === rightBirdNest.innerHTML ) {
            birdAction.newBirdRight = document.createElement( 'img' );
            birdAction.newBirdRight.setAttribute( 'class', 'bird' );
            birdAction.newBirdRight.setAttribute( 'src', 'images/giphy-bird-right.gif' );
            rightBirdNest.appendChild(birdAction.newBirdRight);
            birdAction.newBirdRight.addEventListener( 'click', birdAction.birdDisappear );

        }
    },
    createRandomIdLeft: function () {
        birdAction.randLeft = Math.floor( Math.random() * birdAction.randRange );;
    },
    createRandomIdRight: function () {
        birdAction.randRight = 10 + Math.floor( Math.random() * birdAction.randRange );;
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
        var audio = document.getElementById( 'audio' );

        var birdHitId = event.target.parentNode.getAttribute( 'id' );

        birdAction.totalBirdsShot.push( birdHitId );
        console.log( 'totalBirdsShot', birdAction.totalBirdsShot );
        event.target.setAttribute( 'src', 'images/blood-splatter.jpg' );
        event.target.classList.add( 'blood-splat-img' );
        audio.play();
        event.target.parentNode.classList.add( 'animated' );
        event.target.parentNode.classList.add( 'fadeOut' );

        birdAction.score = birdAction.score + 100;
        birdAction.addScore();
    },

    addScore: function () {
        var scoreBox = document.querySelector( '.score-box' );
        scoreBox.innerText= birdAction.score;
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
    gameOver: function ( t ) {

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
        if( birdAction.score >= birdAction.requiredScore ){
            $( '<p></p>', {
                'text': 'Congratulations You have made it to the Next level.',
                'class': 'congrats-text'
            } ).prependTo( 'p.game-over-score' );
            console.log( 'Congratulationsssss' );
        }
        var gameOverScore = document.querySelector( '.game-over-score');
        gameOverScore.innerText = 'You Scored ' + birdAction.score + ' pts ' + 'in '
                                    + t + ' secs';
        document.querySelector( '.game-over').classList.remove( 'display');



    }
};

birdAction.init();