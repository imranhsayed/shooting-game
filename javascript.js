/**
 * Created by ghafir on 25/05/17.
 */

var birdAction = {

    score: 0,
    timer: 0,
    gameTimer: 0,
    scoreBox: 0,
    requiredScore: 0,
    nbRainDrop: 300,
    audioBirdFlap: null,
    backgroundMusicLevel1: null,
    backgroundMusicLevel2: null,
    backgroundMusicLevel3: null,
    angryDragonScream:null,
    dragonImageEl: 'images/dragon-entry-green.gif',
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
    totalBirdsFlew: [],
    totalBirdsShot: [],
    birdsMissed: null,
    randLeft: null,
    randRight: null,
    birdInterval: 100,
    birdNoToSend: 0,
    randRange: 10,
    birdSpeed: 10000,
    health: 200,

    /**
     * Queries elements from the DOM and stores their value in reusable variables
     * Plays game start music in a loop
     * Adds event listeners for Start Button to start Level 1 and level 2
     * Adds event listener for Gun Image to follow the cursor
     */
    init: function () {

        birdAction.body = document.querySelector( 'body' );
        birdAction.header = document.querySelector( '.header' );
        birdAction.mainSection = document.getElementById( 'main-section' );
        birdAction.content = document.querySelector( '.content' );
        birdAction.leftBirdNestDiv = document.querySelector( '.left-bird-nest' );
        birdAction.rightBirdNestDiv = document.querySelector( '.right-bird-nest' );
        birdAction.gameOverdiv = document.querySelector( '.game-over' );
        birdAction.timeLeftP = document.querySelector( '.time-left' );
        birdAction.pTags = '<p></p>';
        birdAction.imgTags = '<img></img>';
        birdAction.audioRainDrop = document.getElementById( 'rain-falling' );
        birdAction.gunShotAudio = document.getElementById( 'gun-shot-audio' );
        birdAction.birdKilledSound = document.getElementById( 'bird-killed-sound' );
        birdAction.thunderstormMusic = document.getElementById( 'thunderstorm-clip' );
        birdAction.gameOverScoreDiv = document.querySelector( '.game-over-score' );
        birdAction.level1StartButton = document.querySelector( '.level1-start-button' );
        birdAction.level2StartButton = document.querySelector( '.level2-start-button' );
        birdAction.level3StartButton = document.querySelector( '.level3-start-button' );
        document.querySelector( '.main-content' ).classList.add( 'display' );
        birdAction.backgroundMusicLevel1 = document.getElementById( 'music-before-start' );
        birdAction.backgroundMusicLevel2 = document.getElementById( 'background-music-level2' );
        birdAction.backgroundMusicLevel3 = document.getElementById( 'background-music-level3' );
        birdAction.backgroundMusicLevel1.addEventListener( 'ended', function() {
            this.currentTime = 0;
            this.play();
        }, false );
        birdAction.backgroundMusicLevel1.play();
        $( birdAction.level1StartButton ).on( 'click', birdAction.startLevelOne );
        $( birdAction.level2StartButton ).on( 'click', birdAction.startLevelTwo );
        $( birdAction.body ).on( 'mousemove', birdAction.imgFollowCursor );
    },

    /**
     * Sets Value of birdInterval,No of Birds to be Sent,No of Divs to be created
     * left and right from which birds will come out randomly.
     * BirdSpeed which tells how long the bird will take fly from start to window top.
     * Required Score to be achieved to clear the level.
     * Calls createRain() to start Rain.
     * Plays Rain drop audio.
     * Adds background image for Level1
     * Calls birdsMove() to make the birds fly
     * Calls gameTimerLevel1() to start the game Timer.
     */
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
        birdAction.audioRainDrop.play();
        birdAction.body.style.backgroundImage = "url( 'images/level1-background.jpg' )";
        birdAction.birdsMove();
        birdAction.gameTimerLevel1();
    },

    /**
     * Stops rain and Level1 background Music and starts playing Level2 background Music
     * Sets background image for Level 2
     * Clears the previously stored content from the gameOverScoreDiv
     * Sets the score  and gameTimer to 0.
     * Calls updateScore() to add the scores when the birds are shot.
     * Removes class .nine-sec-to-go that might have been added from Level1.
     * Checks if there were any previous bird images from level1 that have not been
     * removed and removes them using birdsDivs.remove()
     * Sets Value of birdInterval,No of Birds to be Sent,No of Divs to be created
     * left and right from which birds will come out randomly
     * Calls updateScore() to update the scores in the Score box to zero.
     * Sets the source value of bird images to birdImgSourceLeft and birdImgSourceRight
     * Hides gameOverDiv and displays main-section
     * Calls birdsMove() to make the birds fly
     * Calls gameTimerLevel2() to start the game Timer.
     */
    startLevelTwo: function(){
        var birdsDivs = $( '.birds-div' );

        birdAction.stopRain();
        birdAction.body.style.backgroundImage = "url( 'images/landscape.gif' )";
        birdAction.backgroundMusicLevel1.pause();
        birdAction.backgroundMusicLevel2.play();
        birdAction.gameOverScoreDiv.textContent = "";
        document.querySelector( '.target-score ' ).innerText = 0;
        birdAction.gameTimer = 0;
        birdAction.score = 0; // update score back to zero for level two
        birdAction.updateScore();
        if( $( birdAction.timeLeftP).hasClass( 'nine-sec-to-go') ){
            birdAction.timeLeftP.classList.remove( 'nine-sec-to-go' );
        }
        if ( birdsDivs.children().length ){
            birdsDivs.remove();
        }
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
        birdAction.birdImgSourceLeft = 'images/level2-bird-left.gif';
        birdAction.birdImgSourceRight = 'images/level2-bird-right.gif';
        birdAction.mainSection.classList.remove( 'display' );
        birdAction.gameOverdiv.classList.add( 'display' );
        birdAction.birdsMove();
        birdAction.gameTimerLevel2();
    },

    /**
     * Creates variables for progress health-bar, lighteningIntervalCounter,
     * header-div children and dragonEntryGreen image.
     * Sets gameTimer to 90secs.
     * Checks if bird images from previous level exist and removes them
     * Checks of the classes red-health and blue-health exist from the first time
     * you played the game and removes them.
     * Calls birdAction.originalCursor() to change the cursor back to default and
     * hides the gun image during dragon Entry while lightening strikes.
     * Hides score-div and time remaining.
     * Plays thunderstorm Music. Plays angryDragon Music in a loop.
     * Sets the Image of the dragon to float right
     * Creates an InterVal for 80 secs for Dragon Entry and exit.
     * For 10 secs lightening strikes and dragon roars.
     * After 10 secs changes cursor to gun-target img, re-displays gun img
     * changes background img ,starts playing level3 music in a loop,
     * Checks if progress-div for health bar already exits ,if not creates one,
     * displays header
     */
    startLevelThree: function () {
        var progress,
            lighteningIntervalCounter = 0,
            headerChildren = $( 'header' ).children(),
            dragonEntryGreen;
        birdAction.gameTimer = 90;

        if ( true === $( birdAction.content ).find( 'div' ).first( ).hasClass( 'left-bird-nest' )
            && false === $( birdAction.leftBirdNestDiv ).hasClass( 'display' ) ){
            birdAction.leftBirdNestDiv.remove();
            birdAction.rightBirdNestDiv.remove();
        }
        if( true === headerChildren.hasClass( 'red-health' ) ){
            document.querySelector( 'progress' ).classList.remove( 'red-health' );
        }
        if( true === headerChildren.hasClass( 'blue-health' ) ){
            document.querySelector( 'progress' ).classList.remove( 'blue-health' );
        }
        /**
         * Short lightening effect
         */
        birdAction.originalCursor();
        birdAction.gunImage.classList.add( 'display' );
        document.querySelector( '.score-div' ).classList.add( 'display' );
        document.querySelector( '.time-remaining' ).classList.add( 'display' );
        birdAction.backgroundMusicLevel2.pause();
        birdAction.angryDragonScream = document.getElementById( 'angry-dragon' );
        birdAction.thunderstormMusic.play();
        birdAction.angryDragonScream.addEventListener( 'ended', function() {
            this.currentTime = 0;
            this.play();
        }, false );
        birdAction.angryDragonScream.play();
        birdAction.content.style.float = 'right';
        /**
         * Interval for Dragon entry an exit
         * @type {number}
         */
        var dragonEntryInterval = setInterval( function () {
            lighteningIntervalCounter = lighteningIntervalCounter + 1;
            /**
             *  after 10 secs
             */
            if ( lighteningIntervalCounter > 10 ){
                birdAction.changeCursor();
                birdAction.gunImage.classList.remove( 'display' );
                birdAction.body.style.backgroundImage = "url( 'images/dark-castle.gif' )";
                birdAction.backgroundMusicLevel3.addEventListener( 'ended', function() {
                    this.currentTime = 0;
                    this.play();
                }, false);
                birdAction.backgroundMusicLevel3.play();

                    if( false === $( birdAction.header ).children().hasClass( 'progress-class' ) ){
                        $( '<p></p>', {
                            class: 'dragon-health-name',
                            text: 'Dragon Health Bar'
                        }).appendTo( birdAction.header );
                        $( '<progress></progress>', {
                            id: 'health',
                            class: 'progress-class',
                            value: '200',
                            max:'400'
                        }).appendTo( birdAction.header );
                    }
                    if( true === $( birdAction.header ).hasClass( 'display' ) ){
                        birdAction.header.classList.remove( 'display' );
                    }
                progress = $( 'progress' );
                dragonEntryGreen = document.querySelector( '.dragon-entry-green' );
                birdAction.dragonImageEl = dragonEntryGreen;
                birdAction.health = document.getElementById( "health" );
                document.querySelector( '.time-remaining' ).classList.remove( 'display' );
                dragonEntryGreen.addEventListener( 'click', birdAction.dragonHitStronger );
                birdAction.newDragonEntry();
                clearInterval( dragonEntryInterval );
                return;
            }
            if( birdAction.body.style.backgroundImage != "url( 'images/lightening-img.gif' )" ){
                birdAction.body.style.backgroundImage = "url( 'images/lightening-img.gif' )";
            }
            if( false === $( birdAction.content ).children().hasClass( 'dragon-entry-green') ){
                $( birdAction.imgTags, {
                    src: 'images/dragon-entry-green.gif',
                    class: 'dragon-entry-green'
                } ).animate(
                    {
                        'position': 'absolute',
                        'top': '0px',
                        'right': '350px'
                    }, 10000
                )
                    .prependTo( birdAction.content );
            }

        },1000 );

        if ( false === $( birdAction.gameOverdiv ).hasClass( 'display' ) ){
                birdAction.gameOverdiv.classList.add( 'display' );
        }
        birdAction.gameTimerLevel3();
        if ( true === $( birdAction.mainSection ).hasClass( 'display' ) ){
            birdAction.mainSection.classList.remove( 'display' );
        }

        birdAction.mainSection.classList.add( 'rain' );
        birdAction.createRain();

    },

    birdsMove: function (event) {
        var z = 0,
            leftDiv = document.querySelector( '.left-bird-nest' ),
            rightDiv = document.querySelector( '.right-bird-nest' );
        document.querySelector( '.main-content' ).classList.remove( 'display' );
        document.querySelector( '.before-game-start').classList.add( 'display' );
        birdAction.audioBirdFlap = document.getElementById( 'bird-flapping' );
        birdAction.audioBirdFlap.play();
        document.querySelector( 'button' ).classList.add( 'display' );
        birdAction.changeCursor();

        if ( null === birdAction.gunImage ) {
            birdAction.createGunImage();
        }
        /**
         * Making bird nest divs
          */
        if( $( birdAction.leftBirdNestDiv ).children().length === 0 &&
            $( birdAction.rightBirdNestDiv ).children().length === 0 ) {
            for( var i = 0; i < birdAction.birdNestDivNo; i++  ){
                var divLeftBird = document.createElement( 'div' ),
                    divRightBird = document.createElement( 'div' ),
                    rightId = i + birdAction.birdNestDivNo;

                divLeftBird.setAttribute( 'id', 'id' + i );
                divLeftBird.setAttribute( 'class', 'birds-div' );
                divRightBird.setAttribute( 'id', 'id' + rightId );
                divRightBird.setAttribute( 'class', 'birds-div' );
                rightDiv.appendChild( divRightBird );
                leftDiv.appendChild( divLeftBird );

                }
        }

        var interval = setInterval( function () {
            if ( z > birdAction.birdNoToSend ){
                clearInterval( interval );
                return;
            }
            if ( 0 === birdAction.timer ){
                clearInterval( interval );
                return;
            }
            if( ( birdAction.requiredScore <=  birdAction.score ) &&
                ( 0 < birdAction.timer ) )  {
                clearInterval( interval );
                return;
            }

            birdAction.createBirdsLeft();
            $( birdAction.newBirdLeft ).animate(
                {
                    'bottom': window.innerHeight,
                    'left': window.innerWidth
                },
                {
                    duration:birdAction.birdSpeed,
                    complete: function () {
                        $( this ).remove();
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
        birdAction.randomIdCheckerLeft();
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
    },

    createBirdsRight: function () {
        var rightBirdNest;
        /**
         * Checking if random id already exists, if yes make a new one.
         */
        birdAction.createRandomIdRight();
        birdAction.randomIdCheckerRight();
        rightBirdNest = document.getElementById( 'id' + birdAction.randRight );

        if( "" === rightBirdNest.innerHTML ) {
            birdAction.newBirdRight = document.createElement( 'img' );
            birdAction.newBirdRight.setAttribute( 'class', 'bird' );
            birdAction.newBirdRight.setAttribute( 'src', birdAction.birdImgSourceRight );
            rightBirdNest.appendChild( birdAction.newBirdRight );
            birdAction.newBirdRight.addEventListener( 'click', birdAction.birdDisappear );
        }
    },

    createRandomIdLeft: function () {
        birdAction.randLeft = Math.floor( Math.random() * birdAction.randRange );
    },

    createRandomIdRight: function () {
        birdAction.randRight = birdAction.birdNestDivNo + Math.floor( Math.random() * birdAction.randRange );
    },

    randomIdCheckerLeft: function () {
        var itemCheck = $.inArray( 'id' + birdAction.randLeft, birdAction.arrayLeftDivId );
        if ( -1 !== itemCheck ){
            birdAction.createRandomIdLeft();
        } else{
            birdAction.arrayLeftDivId.push( 'id' + birdAction.randLeft );
        }
    },

    randomIdCheckerRight: function () {
        var itemCheck = $.inArray( 'id' + birdAction.randRight, birdAction.arrayRightDivId );
        if( -1 !== itemCheck ){
            birdAction.createRandomIdRight();
        }else{
            birdAction.arrayRightDivId.push( 'id' + birdAction.randRight );
        }
    },

    birdDisappear: function ( event ) {
        var birdManShot,
            birdHitId = event.target.parentNode.getAttribute( 'id' );

        if( $( event.target ).hasClass( 'man-bird-image' ) ){
            birdManShot = 1;
            birdAction.gameOverLevel1( birdManShot );
        }else{
            birdAction.birdKilledSound.volume = 0.08;
            birdAction.birdKilledSound.play();
        }
        birdAction.totalBirdsShot.push( birdHitId );
        event.target.setAttribute( 'src', 'images/blood-splatter.jpg' );
        event.target.classList.add( 'blood-splat-img' );
        birdAction.gunShotAudio.play();
        event.target.parentNode.classList.add( 'animated' );
        event.target.parentNode.classList.add( 'fadeOut' );
        birdAction.score = birdAction.score + 100;
        birdAction.updateScore();
        event.target.style.pointerEvents = 'none';
    },

    updateScore: function () {
        birdAction.scoreBox = document.querySelector( '.score-box' );
        birdAction.scoreBox.innerText = birdAction.score;
    },

    changeCursor: function () {
        birdAction.body.style.cursor = "url( 'images/gun-aim.png' ), auto";
    },

    originalCursor: function () {
        birdAction.body.style.cursor = 'default';
    },

    createGunImage: function () {
        var  gameArea = document.querySelector( 'footer' );

        birdAction.gunImage = document.createElement( 'img' );
        birdAction.gunImage.setAttribute( 'src', birdAction.gunImageSrc );
        birdAction.gunImage.setAttribute( 'class', 'gun-image' );
        gameArea.appendChild( birdAction.gunImage );

    },
    imgFollowCursor: function ( event ) {
        var left, top;
        if ( event.pageX > ( window.innerWidth / 2 ) ) {
                left = event.pageX + 100;
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
        var drop;
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
        function randRange( minNum, maxNum ) {
            return ( Math.floor( Math.random() * ( maxNum - minNum + 1 ) )
                        + minNum );
        }
        /**
         * function to generate drops
         */
        for( i = 1; i < birdAction.nbRainDrop ; i++ ) {
            var dropLeft = randRange( 0, 1600 );
            var dropTop = randRange( -1000, 1400 );

            $( '.rain' ).append( '<div class="drop" id="drop'+i+'"></div>' );
            drop = $( '#drop' + i );
            drop.css( 'left', dropLeft );
            drop.css( 'top', dropTop );
        }
    },

    stopRain: function () {
        if( false === $(birdAction.mainSection).hasClass( 'rain' ) ){
            birdAction.mainSection.classList.remove( 'rain' );
        }
        if( 0 != $(birdAction.mainSection).find( 'div.drop' ).length ){
            for( var i = 1; i < birdAction.nbRainDrop; i++ ){
                document.getElementById( 'drop' + i  ).remove();
            }
        }
    },

    gameTimerLevel1: function ( ) {

         birdAction.timer = birdAction.gameTimer;
        document.querySelector( '.target-score ' ).innerText = birdAction.requiredScore;
        var scoreIntervalCheck = setInterval( function () {

            birdAction.timer = birdAction.timer - 1;
            birdAction.timeLeftP.innerText =  birdAction.timer ;

            if( 19 === birdAction.timer ){
                birdAction.timeLeftP.classList.add( 'twenty-sec-to-go' );
            }
            if( 9 === birdAction.timer ){
                birdAction.timeLeftP.classList.remove( 'twenty-sec-to-go' );
                birdAction.timeLeftP.classList.add( 'nine-sec-to-go' );
            }
            if( ( birdAction.requiredScore >  birdAction.score )
                && ( 0 === birdAction.timer ) ){
                    if( $( birdAction.timeLeftP ).hasClass( 'twenty-sec-to-go' ) ){
                        birdAction.timeLeftP.classList.remove( 'twenty-sec-to-go' );
                    }
                    birdAction.timeLeftP.classList.remove( 'nine-sec-to-go' );
                    birdAction.gameOverLevel1( birdAction.timer );
                    clearInterval( scoreIntervalCheck );
                    return;
            }
            if( ( birdAction.requiredScore <=  birdAction.score )
                && ( 0 < birdAction.timer ) ) {
                birdAction.gameOverLevel1( birdAction.timer );
                clearInterval( scoreIntervalCheck );
            }
        }, 1000 );
    },

    gameTimerLevel2: function () {
        birdAction.timer = birdAction.gameTimer;
        birdAction.timeLeftP.innerText =  birdAction.timer;
        document.querySelector( '.target-score ' ).innerText = birdAction.requiredScore;
        var scoreIntervalCheck = setInterval( function () {

            birdAction.timer = birdAction.timer - 1;
            birdAction.timeLeftP.innerText =  birdAction.timer;

            if( $( birdAction.timeLeftP ).hasClass( 'twenty-sec-to-go' ) ){
                birdAction.timeLeftP.classList.remove( 'twenty-sec-to-go' );
            }
            if( $( birdAction.timeLeftP ).hasClass( 'nine-sec-to-go' ) ){
                birdAction.timeLeftP.classList.remove( 'nine-sec-to-go' );
            }
            if( 20 > birdAction.timer ){
                birdAction.timeLeftP.classList.add( 'twenty-sec-to-go' );
            }
            if( 10 > birdAction.timer ){
                birdAction.timeLeftP.classList.remove( 'twenty-sec-to-go' );
                birdAction.timeLeftP.classList.add( 'nine-sec-to-go' );
            }
            if( 0 === birdAction.timer ){
                if( $( birdAction.timeLeftP ).hasClass( 'twenty-sec-to-go') ){
                    birdAction.timeLeftP.classList.remove( 'twenty-sec-to-go' );
                }
                birdAction.timeLeftP.classList.remove( 'nine-sec-to-go' );
                birdAction.gameOverLevel2( birdAction.timer );
                clearInterval( scoreIntervalCheck );
                return;
            }
            if( ( birdAction.requiredScore <=  birdAction.score ) && ( 0 < birdAction.timer ) )  {
                birdAction.gameOverLevel2( birdAction.timer );
                clearInterval( scoreIntervalCheck );
            }
        },1000);
    },

    gameTimerLevel3: function () {
        birdAction.timer = birdAction.gameTimer;
        var scoreIntervalCheck = setInterval( function () {

            birdAction.timer = birdAction.timer - 1;
            birdAction.timeLeftP.innerText =  birdAction.timer ;
            if( $( birdAction.timeLeftP ).hasClass( 'twenty-sec-to-go') ){
                birdAction.timeLeftP.classList.remove( 'twenty-sec-to-go' );
            }
            if( $( birdAction.timeLeftP ).hasClass( 'nine-sec-to-go' ) ){
                birdAction.timeLeftP.classList.remove( 'nine-sec-to-go' );
            }
            if( 20 > birdAction.timer ){
                birdAction.timeLeftP.classList.add( 'twenty-sec-to-go' );
            }
            if( 10 > birdAction.timer ){
                birdAction.timeLeftP.classList.remove( 'twenty-sec-to-go' );
                birdAction.timeLeftP.classList.add( 'nine-sec-to-go' );
            }
            if( 0 === birdAction.timer ){
                if( $( birdAction.timeLeftP ).hasClass( 'twenty-sec-to-go') ){
                    birdAction.timeLeftP.classList.remove( 'twenty-sec-to-go' );
                }
                birdAction.timeLeftP.classList.remove( 'nine-sec-to-go' );
                birdAction.gameOverLevel3( birdAction.timer );
                clearInterval( scoreIntervalCheck );
                return;
            }

            if( 60 > birdAction.health.value ){
                if( false === $( 'progress' ).hasClass( 'red-health' ) ){
                    document.querySelector( 'progress').classList.add( 'red-health' );
                }
            }
            if( 200 < birdAction.health.value ){
                if( false === $( 'progress' ).hasClass( 'blue-health' ) ){
                    document.querySelector( 'progress').classList.add( 'blue-health' );
                }
            }
            if( 200 >= birdAction.health.value ){
                if( true === $( 'progress' ).hasClass( 'blue-health' ) ){
                    document.querySelector( 'progress').classList.remove( 'blue-health' );
                }
            }

            if( ( 0 ===  birdAction.health.value ) && ( 0 < birdAction.timer ) ){
                birdAction.gameOverLevel3( birdAction.timer );
                clearInterval( scoreIntervalCheck );
            }
        },1000);

    },

    gameOverLevel1: function ( birdManShot ) {
        var timeTookToFinish = birdAction.gameTimer - birdAction.timer,
            manScreamAudio = document.getElementById( 'man-scream' ),
            couldNotScoreEl,couldNotScoreText;

        /**
         * Stop Rain Music
         */
        birdAction.audioRainDrop.pause();
        birdAction.audioBirdFlap.pause();

        /**
         * Stop rain
         */
        birdAction.mainSection.classList.remove( 'rain' );
        birdAction.mainSection.classList.add( 'display' );

        if( birdAction.score >= birdAction.requiredScore ){
            birdAction.gameOverScoreDiv.innerText = 'You Scored ' + birdAction.score + ' pts ' + 'in '
                + timeTookToFinish + ' secs';
            $( birdAction.pTags, {
                text: 'Congratulations You have made it to the Next level.',
                class: 'congrats-text'
            } ).prependTo( birdAction.gameOverScoreDiv );
            birdAction.gameOverdiv.classList.remove( 'display' );

        }else{
               if( 1 === birdManShot ){
                birdAction.score = 0;
                birdAction.gameOverScoreDiv.classList.add( 'birdman-came' );
                manScreamAudio.play();

                $( birdAction.pTags, {
                    text: 'Oops! You killed the BIRDMAN . Any progress Made is lost. Please go back to the home screen and restart.' +
                    'Your Scored Points have changed to :- ',
                    class: 'bird-man-killed',
                    color: 'red'
                } ).prependTo( birdAction.gameOverScoreDiv );

                $( birdAction.pTags, {
                    text: 'BIRDMAN: The man who has wings is called Birdman.' +
                    ' He may or may not come in any level.But when he does ensure that you don’t shoot him.' +
                    ' He is your friend and under no circumstances should be killed. ' +
                    'If he is shot then the game will be over . ' +
                    'Any progress you might have made in the game will be lost . Point score will change to 0. ' +
                    'And you will need to restart the game from level one, irrespective of what level you might be on.',
                    class: 'bird-man-tip',
                    color: 'black'
                } ).prependTo( birdAction.gameOverScoreDiv );

                   $( birdAction.level2StartButton )
                       .replaceWith( birdAction.level1StartButton );
                   $( birdAction.level1StartButton ).on( 'click', birdAction.gameRestartLevel1 );
                   birdAction.level1StartButton.classList.remove( 'display' );
                   birdAction.gameOverdiv.classList.remove( 'display' );
                   return;
            }else{
                    if( false === $( birdAction.gameOverScoreDiv ).hasClass( 'birdman-came' ) ){
                        birdAction.gameOverScoreDiv.innerText = 'You Scored ' + birdAction.score
                            + ' pts ' + 'in ' + birdAction.gameTimer + ' secs';
                        couldNotScoreEl = document.createElement( 'p' );
                        couldNotScoreText = document.createTextNode('Sorry you could not score the required target. Please Try Again');
                        couldNotScoreEl.appendChild( couldNotScoreText );
                        birdAction.gameOverScoreDiv.appendChild( couldNotScoreEl );
                        $( birdAction.level2StartButton )
                            .replaceWith( birdAction.level1StartButton );
                        $( birdAction.level1StartButton ).on( 'click', birdAction.gameRestartLevel1 );
                        birdAction.level1StartButton.classList.remove( 'display' );
                        birdAction.gameOverdiv.classList.remove( 'display' );
                        return;
                    }
            }
        }
    },

    gameOverLevel2: function () {
        var timeTookToFinish = birdAction.gameTimer - birdAction.timer,
            couldNotScoreEl,couldNotScoreText;

        /**
         * Stop Rain Music
         */
        birdAction.audioRainDrop.pause();
        birdAction.audioBirdFlap.pause();

        /**
         * Stop rain
         */
        birdAction.mainSection.classList.remove( 'rain' );
        birdAction.mainSection.classList.add( 'display' );

        if( birdAction.score >= birdAction.requiredScore ){

            birdAction.gameOverScoreDiv.innerText = 'You Scored ' + birdAction.score + ' pts ' + 'in '
                + timeTookToFinish + ' secs';
            $( birdAction.pTags, {
                text: 'Congratulations You have made it to the Next level. You have unlocked Level3 : The Angry Dragon',
                class: 'congrats-text'
            } ).prependTo( birdAction.gameOverScoreDiv );

            $( birdAction.pTags, {
                text: 'About the Dragon: This dragon has been sleeping in his castle in the jungle for years.' +
                ' However your shooting business has disturbed his sleep. He is now awake and is ' +
                'very angry. You must find a way to put him back to sleep. The Dragon changes colors and has the power to ' +
                'become invisible. Its tricky to beat the Dragon.' +
                ' However, I leave this in your able hands to accept the challenge and beat him. If you are not able to ,' +
                ' then the trick to beat him will be shared with you.Click on Level3 to Unleash the dragon.',
                class: 'dragon-story'
            } ).appendTo( birdAction.gameOverScoreDiv );

            birdAction.level2StartButton.classList.add( 'display' );
            birdAction.level3StartButton.classList.remove( 'display' );
            $( birdAction.level3StartButton ).on( 'click', birdAction.startLevelThree );

        }else{

            if( false === $( birdAction.gameOverScoreDiv ).hasClass( 'birdman-came' ) ) {

                birdAction.gameOverScoreDiv.innerText = 'You Scored ' + birdAction.score + ' pts ' + 'in '
                    + birdAction.gameTimer + ' secs';
                    couldNotScoreEl = document.createElement( 'p' );
                    couldNotScoreText = document.createTextNode('Sorry you could not score the required target. Please Try Again' );
                    birdTipEl = document.createElement( 'p' );
                    birdTipText = document.createTextNode( 'Tip : Try Shooting the birds which are about to leave the game play area ' +
                        'to ensure you don’t miss onto them. The others who still have time to reach the end can be shot later.' +
                        ' Some birds are very smart and would keep flying at the bottom for a short period and then disappear. While a few will' +
                        ' fly in groups together making it more challenging for you to hit them. So be alert so that they are not missed.'
                    );

                birdTipEl.appendChild( birdTipText );
                birdTipEl.setAttribute( 'class', 'bird-tip' );
                couldNotScoreEl.appendChild( couldNotScoreText );
                birdAction.gameOverScoreDiv.appendChild( couldNotScoreEl );
                birdAction.gameOverScoreDiv.appendChild( birdTipEl );

                // $( birdAction.level2StartButton ).replaceWith( birdAction.level2StartButton );
                // birdAction.level2StartButton.classList.remove( display);
                $( birdAction.level2StartButton ).on( 'click', birdAction.gameRestartLevel2 );
            }
        }
        birdAction.gameOverdiv.classList.remove( 'display' );
    },

    gameOverLevel3: function () {
        var timeTookToFinish, couldNotScoreEl
            ,couldNotScoreText, dragonKillingTipEl, dragonKillingTipText,
            creditsDiv = document.querySelector( '.credits' );

        birdAction.angryDragonScream.pause();
        birdAction.gunImage.classList.add( 'display' );
        if( $( birdAction.content ).children().hasClass( 'dragon-entry-green' ) ){
            document.querySelector( '.dragon-entry-green' ).remove();
        }
        birdAction.stopRain();
        birdAction.header.classList.add( 'display' );
        timeTookToFinish = birdAction.gameTimer - birdAction.timer;

            if( ( 0 === birdAction.health.value ) && ( 0 < birdAction.timer ) )  {
                birdAction.originalCursor();
                birdAction.gameOverScoreDiv.textContent = "";
                birdAction.level3StartButton.classList.add( 'display' );
                creditsDiv.classList.add( 'wrapper' );
                creditsDiv.classList.remove( 'display' );
                setTimeout( function () {
                    creditsDiv.classList.add( 'display' );
                    creditsDiv.classList.remove( 'wrapper' );

                    $( birdAction.imgTags, {
                        src: 'images/dragon-sleeping.gif',
                        class: 'sleeping-dragon'
                    } ).prependTo( birdAction.gameOverdiv );

                    $( birdAction.pTags, {
                        text: 'Congratulations You have completed all three levels.You have put the Dragon back to Sleep in '
                        + timeTookToFinish + ' secs. ' +' Go back to the home Screen and Restart the Game',
                        class: 'congrats-text'
                    } ).prependTo( birdAction.gameOverdiv );

                    birdAction.gameOverScoreDiv.textContent = "";
                    $( birdAction.level3StartButton ).replaceWith( birdAction.level1StartButton );
                    birdAction.level1StartButton.classList.remove( 'display');
                    $( birdAction.level1StartButton ).on( 'click', birdAction.gameRestartLevel1 );
                }, 40000 );

            }else{

                couldNotScoreEl = document.createElement( 'p' );
                couldNotScoreText = document.createTextNode( 'Sorry you could not put the Dragon to Sleep in Required Time. Please Try Again' );
                dragonKillingTipEl = document.createElement( 'p' );
                dragonKillingTipText = document.createTextNode( 'Tip on How to put the Dragon back to Sleep : The dragons outer skin ' +
                    'is very strong and your bullets cannot harm him. If you shoot him he will eat the fire' +
                    ' from your bullets and get stronger and bigger. So how do we put him back to sleep. ' +
                    'The dragon at some stage will spit fire and start becoming red. ' +
                    'When he spits fire ,his skin becomes softer and vulnerable because of heat .' +
                    'Your bullets have tranquilizers. This is the time you need to attack him and put him ' +
                    'back to sleep. Best of Luck This Time!'
                );
                dragonKillingTipEl.appendChild( dragonKillingTipText );
                dragonKillingTipEl.setAttribute( 'class', 'dragon-killing-tip' );
                couldNotScoreEl.appendChild( couldNotScoreText );
                birdAction.gameOverScoreDiv.textContent = "";
                birdAction.gameOverScoreDiv.appendChild( couldNotScoreEl );
                birdAction.gameOverScoreDiv.appendChild( dragonKillingTipEl );
                birdAction.level2StartButton.classList.add( 'display' );
                birdAction.level3StartButton.classList.remove( 'display' );
                document.querySelector( 'progress' ).remove();
                document.querySelector( '.dragon-health-name' ).remove();
            }
        birdAction.gameOverdiv.classList.remove( 'display' );
    },

    gameRestartLevel1: function () {
        location.reload();
    },

    gameRestartLevel2: function () {
        birdAction.score = 0;
        birdAction.gameTimer = 0;
        birdAction.audioBirdFlap.play();
        birdAction.gameOverdiv.classList.add( 'display' );
        birdAction.startLevelTwo();
    },

    newDragonEntry: function () {
        var timeInterval = 0,
            dragonEntryGreenImg = $( '.dragon-entry-green' ),
            dragonImgTags = '<img></img>',
            newDragonEntryInterval = setInterval( function () {
            timeInterval += 1;
            /**
             * After 15 secs from the start of Level3 Game
             */
            if ( timeInterval === 5 ){
                dragonEntryGreenImg.fadeOut( 2000 );
            }
            if ( timeInterval === 10 ){
                if( false === $( birdAction.content ).children().hasClass( 'dragon-entry-brown') ){
                    dragonEntryGreenImg.remove();
                    $( dragonImgTags, {
                        src: 'images/dragon-entry-brown.png',
                        class: 'dragon-entry-brown'

                    } ).fadeIn( 1000 )
                        .delay( 2000 )
                        .prependTo( birdAction.content )
                        .animate(
                            {
                                'position': 'absolute',
                                'bottom': '400px',
                                'right': '1500px'
                            }, 9000
                        ).fadeOut( 5000 );
                    birdAction.dragonImageEl = document.querySelector( '.dragon-entry-brown' );
                    birdAction.dragonImageEl.addEventListener( 'click', birdAction.dragonHitStronger );
                }
            }
            if ( timeInterval === 21 ){
                $( '.dragon-entry-brown' ).remove();
                if( false === $( birdAction.content ).children().hasClass( 'dragon-entry-dark-green' ) ){
                    $( dragonImgTags, {
                        src: 'images/dragon-entry-dark-green.gif',
                        class: 'dragon-entry-dark-green'

                    } ).fadeIn(1000)
                        .delay( 2000 )
                        .prependTo( birdAction.content )
                        .animate(
                            {
                                'position': 'absolute',
                                'left': '-700px',
                                'bottom': '1500px'
                            }, 7000
                        )
                        .fadeOut( 7000 );
                    birdAction.dragonImageEl = document.querySelector( '.dragon-entry-dark-green' );
                    birdAction.dragonImageEl.addEventListener( 'click', birdAction.dragonHitStronger );
                }
            }
            if( timeInterval === 32 ){
                $( '.dragon-entry-dark-green' ).remove();
                if( false === $( birdAction.content ).children().hasClass( 'dragon-fire-left' ) ){
                    $( dragonImgTags, {
                        src: 'images/dragon-fire-left.gif',
                        class: 'dragon-fire-left'

                    } ).fadeIn( 1000 )
                        .prependTo( birdAction.content )
                        .animate(
                            {
                                'position': 'absolute',
                                'top': '-240px',
                                'left': '-900px'
                            }, 2000
                        )
                        .fadeOut( 5000 );
                    birdAction.dragonImageEl = document.querySelector( '.dragon-fire-left' );
                    birdAction.dragonImageEl.addEventListener( 'click', birdAction.dragonHitVulnerable );
                }
            }
            if( timeInterval === 40 ){
                $( '.dragon-fire-left' ).remove();
                if( false === $( birdAction.content ).children().hasClass( 'dragon-fire-right' ) ){
                    $( dragonImgTags, {
                        src: 'images/dragon-fire-right.gif',
                        class: 'dragon-fire-right'

                    } ).fadeIn( 1000 )
                        .prependTo( birdAction.content )
                        .animate(
                            {
                                'position': 'absolute',
                                'top': '-160px',
                                'left': '-170px'
                            }, 2000
                        )
                        .fadeOut( 5000 );
                    birdAction.dragonImageEl = document.querySelector( '.dragon-fire-right' );
                    birdAction.dragonImageEl.addEventListener( 'click', birdAction.dragonHitVulnerable );
                }
            }
            if( timeInterval === 47 ){
                $( '.dragon-fire-right' ).remove();
                if( false === $( birdAction.content ).children().hasClass( 'dragon-fire' ) ){
                    $( dragonImgTags, {
                        src: 'images/dragon-fire.gif',
                        class: 'dragon-fire'

                    } ).fadeIn( 1000 )
                        .prependTo( birdAction.content )
                        .animate(
                            {
                                'position': 'absolute',
                                'top': '400px',
                                'right': '200px'
                            }, 5000
                        )
                        .fadeOut( 4000 );
                    birdAction.dragonImageEl = document.querySelector( '.dragon-fire' );
                    birdAction.dragonImageEl.addEventListener( 'click', birdAction.dragonHitVulnerable );
                }
            }
            /**
             * Dragon Red Vulnerable
             */
            if( timeInterval === 55 ){
                $( '.dragon-fire' ).remove();
                if( false === $( birdAction.content ).children().hasClass( 'dragon-final' ) ){
                    $( dragonImgTags, {
                        src: 'images/dragon-final.gif',
                        class: 'dragon-final'

                    } ).fadeIn( 1000 )
                        .prependTo( birdAction.content )
                        .animate(
                            {
                                'position': 'absolute',
                                'bottom': '300px',
                                'right': '800px'
                            }, 10000
                        )
                        .fadeOut( 9000 );

                    birdAction.dragonImageEl = document.querySelector( '.dragon-final' );
                    birdAction.dragonImageEl.addEventListener( 'click', birdAction.dragonHitVulnerable );
                }
            }
            if ( timeInterval > 80 ){
                $( '.dragon-final' ).remove();
                clearInterval( newDragonEntryInterval );
                return;
            }
        }, 1000 );
    },

    dragonHitStronger: function () {
        var w, r, imgW, imgR ;
        birdAction.health = document.getElementById( "health" );
        birdAction.gunShotAudio.play();
        birdAction.health.value += 5;
        imgW = parseInt( window.getComputedStyle( birdAction.dragonImageEl ).width );
        imgR = parseInt( window.getComputedStyle( birdAction.dragonImageEl ).right );
        if( 820 > imgW ){
            w = imgW + 20;
            r = imgR - 20;
            birdAction.dragonImageEl.style.width = w + 'px';
            birdAction.dragonImageEl.style.right = r + 'px';
            return;
        }
    },

    dragonHitVulnerable: function () {
        birdAction.gunShotAudio.play();
        birdAction.health.value -= 1;
        $( birdAction.dragonImageEl ).fadeOut( 200 );
        $( birdAction.dragonImageEl ).fadeIn( 100 );
    }
};

birdAction.init();