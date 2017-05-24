/**
 * Created by ghafir on 25/05/17.
 */

var birdAction = {

    score: null,
    health: 10,
    gunImage: null,
    newBirdLeft: null,
    newBirdRight: null,
    arrayLeftDivId: [],
    arrayRightDivId: [],
    randLeft: null,
    randRight: null,
    config: {
        /**
         * meaning after how many seconds next bird will be sent
         * @type {number}
         */
        birdInterval: 1000,

        /**
         * birdNoToSend is in multiples of 2 .
         * If you choose 2 meaning 4 birds will be sent
         * @type {number}
         */
        birdNoToSend: 5,

        /*
         * ids to be created from zero up until range
         */
        randRange: 10,
        birdSpeed: 20000
    },

    init: function () {
        $( 'button' ).on( 'click', birdAction.birdMoveNew );
        $( 'body' ).on( 'mousemove', birdAction.imgFollowCursor );
    },

    birdMoveNew: function (event) {
        birdAction.createRain();

        var audioBirdFlap = document.getElementById( 'bird-flapping' );
        audioBirdFlap.play();

        document.querySelector( 'button' ).disabled = true;
        birdAction.changeCursor();

        if ( null === birdAction.gunImage ) {
            birdAction.createGunImage();
        }

        var z = 0,
            leftDiv = document.querySelector( '.left-bird-nest' ),
            rightDiv = document.querySelector( '.right-bird-nest' );

        for( var i = 0; i < 10; i++  ){
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
        var interval = setInterval( function () {
            z = z + 1;

            if ( z > birdAction.config.birdNoToSend ){
                clearInterval( interval );
                return;
            }
            console.log( 'z:', z );
            birdAction.createBirdsLeft();
            $( birdAction.newBirdLeft ).animate(
                {
                    'bottom': window.innerHeight,
                    'left': window.innerWidth
                },
                {
                    duration:birdAction.config.birdSpeed,
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
                    duration:birdAction.config.birdSpeed,
                    complete: function () {
                        $( this ).remove();
                        console.log( 'complete 2nd' );
                        audioBirdFlap.pause();

                    }
                }
            );
        },birdAction.config.birdInterval );

    },
    createBirdsLeft: function () {
        var leftBirdNest;
        /*
         Checking if random id already exists, if yes make a new one.
         */
        birdAction.createRandomIdLeft();
        console.log( 'First randLeft Created: ' , birdAction.randLeft );

        birdAction.randomIdCheckerLeft();
        console.log( 'After Checking New RandLeft: ' , birdAction.randLeft );
        console.log( 'After Checking arrayLeftDivId: ' , birdAction.arrayLeftDivId );

        leftBirdNest = document.getElementById( 'id' + birdAction.randLeft );

        if( "" === leftBirdNest.innerHTML ){
            birdAction.newBirdLeft = document.createElement( 'img' );
            birdAction.newBirdLeft.setAttribute( 'class', 'bird' );
            birdAction.newBirdLeft.setAttribute( 'src', 'images/giphy-bird-left.gif');
            leftBirdNest.appendChild( birdAction.newBirdLeft );
            birdAction.newBirdLeft.addEventListener( 'click', birdAction.birdDisappear );
        }
        console.log( 'After Appending to div ,Div is : ', leftBirdNest );

    },
    createBirdsRight: function () {
        var rightBirdNest;

        /**
         * Checking if random id already exists, if yes make a new one.
         */
        birdAction.createRandomIdRight();
        console.log( 'First randRight Created: ' , birdAction.randLeft );

        birdAction.randomIdCheckerRight();
        console.log( 'randRight: ' , birdAction.randRight );
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
        birdAction.randLeft = Math.floor( Math.random() * birdAction.config.randRange );;
    },
    createRandomIdRight: function () {
        birdAction.randRight = 10 + Math.floor( Math.random() * birdAction.config.randRange );;
    },

    randomIdCheckerLeft: function () {
        var itemCheck = $.inArray( 'id' + birdAction.randLeft, birdAction.arrayLeftDivId);
        console.log( 'itemLeftExists? : ', itemCheck );

        if ( -1 !== itemCheck ){
            birdAction.createRandomIdLeft();
        } else{
            birdAction.arrayLeftDivId.push( 'id' + birdAction.randLeft);
        }
    },
    randomIdCheckerRight: function () {
        var itemCheck = $.inArray( 'id' + birdAction.randRight, birdAction.arrayRightDivId);
        console.log( 'itemRightExists? : ', itemCheck );
        if( -1 !== itemCheck ){
            birdAction.createRandomIdRight();
        }else{
            birdAction.arrayRightDivId.push( 'id' + birdAction.randRight );
        }
    },
    birdDisappear: function ( event ) {
        var audio = document.getElementById( 'audio' );

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
        var nbDrop = 300;

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
        for( i = 1; i < nbDrop ; i++ ) {
            var dropLeft = randRange(0,1600);
            var dropTop = randRange(-1000,1400);

            $('.rain').append('<div class="drop" id="drop'+i+'"></div>');
            $('#drop'+i).css('left',dropLeft);
            $('#drop'+i).css('top',dropTop);
        }
    }
};

birdAction.init();