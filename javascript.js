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
    audioRainDrop: null,
    backgroundMusicLevel1: null,
    backgroundMusicLevel2: null,
    backgroundMusicLevel3: null,
    thunderstormMusic: null,
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

    init: function () {

        birdAction.body = document.querySelector( 'body' );
        birdAction.mainSection = document.getElementById( 'main-section' );
        birdAction.gunShotAudio = document.getElementById( 'gun-shot-audio' );
        birdAction.birdKilledSound = document.getElementById( 'bird-killed-sound' );
        birdAction.gameOverScoreDiv = document.querySelector( '.game-over-score' );
        birdAction.level2StartButton = document.querySelector( '.level2-start-button' );
        birdAction.level3StartButton = document.querySelector( '.level3-start-button' );
        document.querySelector( '.main-content' ).classList.add( 'display' );
        birdAction.backgroundMusicLevel1 = document.getElementById( 'music-before-start' );
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
        var body = document.querySelector( 'body');
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
        birdAction.audioRainDrop = document.getElementById( 'rain-falling' );
        birdAction.audioRainDrop.play();
        body.style.backgroundImage = "url( 'images/level1-background.jpg' )";
        birdAction.birdMoveNew();
        birdAction.gameTimerLevel1();
    },
    startLevelTwo: function(){
        var timeLeftP = document.querySelector( '.time-left' );
        var birdsDivs = $( '.birds-div' );
        var body = document.querySelector( 'body');

        birdAction.backgroundMusicLevel1.pause();
        birdAction.gameOverScoreDiv.textContent = "";
        birdAction.backgroundMusicLevel2.play();
        document.querySelector( '.target-score ' ).innerText = 0;
        birdAction.gameTimer = 0;
        birdAction.score = 0; // update score back to zero for level two
        birdAction.addScore();
        timeLeftP.classList.remove( 'nine-sec-to-go' );

        if ( birdsDivs.children().length ){
            birdsDivs.remove();
        }
        birdAction.birdImgSourceLeft = 'images/level2-bird-left.gif';
        birdAction.birdImgSourceRight = 'images/level2-bird-right.gif';
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

        birdAction.mainSection.classList.remove( 'display' );
        birdAction.stopRain();
        document.querySelector( '.game-over' ).classList.add( 'display' );
        body.style.backgroundImage = "url( 'images/landscape.gif' )";
        birdAction.birdMoveNew();
        birdAction.gameTimerLevel2();
    },

    startLevelThree: function () {
        var progress;
        var body = document.querySelector( 'body');
        var lightening = 0;
        var dragonEntryGreen;
        birdAction.gameTimer = 90;

        birdAction.originalCursor();
        if ( true === $( '.content' ).find( 'div' ).first( ).hasClass( 'left-bird-nest' )
            && false === $( '.left-bird-nest' ).hasClass( 'display' ) ){
            document.querySelector( '.left-bird-nest' ).remove();
            document.querySelector( '.right-bird-nest' ).remove();
        }

        if( true === $( 'header' ).children().hasClass( 'red-health' ) ){
            document.querySelector( 'progress' ).classList.remove( 'red-health' );
        }

        if( true === $( 'header' ).children().hasClass( 'blue-health' ) ){
            document.querySelector( 'progress' ).classList.remove( 'blue-health' );
        }

        birdAction.gunImage.classList.add( 'display' );
        document.querySelector( '.score-div' ).classList.add( 'display' );
        document.querySelector( '.time-remaining' ).classList.add( 'display' );
        birdAction.backgroundMusicLevel2.pause();
        birdAction.thunderstormMusic = document.getElementById( 'thunderstorm-clip' );
        birdAction.angryDragonScream = document.getElementById( 'angry-dragon' );
        birdAction.thunderstormMusic.play();
        birdAction.angryDragonScream.addEventListener( 'ended', function() {
            this.currentTime = 0;
            this.play();
        }, false );
        birdAction.angryDragonScream.play();
        document.querySelector( '.content' ).style.float = 'right';
        /**
         * Short lightening effect
         * @type {Element}
         */
        var shortLightening = setInterval( function () {
            lightening = lightening + 1;
            /**
             *  Till 10 secs
             */
            if ( lightening > 10 ){
                birdAction.changeCursor();
                body.style.backgroundImage = "url( 'images/dark-castle.gif' )";
                /**
                 * looping through the music
                 */
                birdAction.backgroundMusicLevel3.addEventListener( 'ended', function() {
                    this.currentTime = 0;
                    this.play();
                }, false);
                birdAction.backgroundMusicLevel3.play();
                birdAction.gunImage.classList.remove( 'display' );

                if( true === $( '.header' ).hasClass( 'display' ) ){
                    document.querySelector( '.header' ).classList.remove( 'display' );
                }
                    if( false === $( '.header' ).children().hasClass( 'progress-class' ) ){
                        $( '<p></p>', {
                            class: 'dragon-health-name',
                            text: 'Dragon Health Bar'
                        }).appendTo( '.header' );
                        $( '<progress></progress>', {
                            id: 'health',
                            class: 'progress-class',
                            value: '200',
                            max:'400'
                        }).appendTo( '.header' );
                    }
                progress = $( 'progress' );
                dragonEntryGreen = document.querySelector( '.dragon-entry-green' );
                birdAction.dragonImageEl = dragonEntryGreen;
                birdAction.health = document.getElementById( "health" );
                document.querySelector( '.time-remaining' ).classList.remove( 'display' );
                dragonEntryGreen.addEventListener( 'click', birdAction.dragonHitStronger );
                birdAction.newDragonEntry();
                clearInterval( shortLightening );
                return;
            }
            if( body.style.backgroundImage != "url( 'images/lightening-img.gif' )" ){
                body.style.backgroundImage = "url( 'images/lightening-img.gif' )";
            }
            if( false === $( '.content' ).children().hasClass( 'dragon-entry-green') ){
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

        },1000 );

        if ( false === $( '.game-over' ).hasClass( 'display' ) ){
                document.querySelector( '.game-over' ).classList.add( 'display' );
        }
        birdAction.gameTimerLevel3();
        if ( true === $( '#main-section' ).hasClass( 'display' ) ){
            birdAction.mainSection.classList.remove( 'display' );
        }

        birdAction.mainSection.classList.add( 'rain' );
        birdAction.createRain();

    },

    birdMoveNew: function (event) {
        var z = 0, k = 0,
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
        if( $( leftDiv ).children().length === 0 &&
            $( rightDiv ).children().length === 0 ) {
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
        var birdManShot;
        var birdHitId = event.target.parentNode.getAttribute( 'id' );

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
        birdAction.addScore();
    },

    addScore: function () {
        birdAction.scoreBox.innerText = document.querySelector( '.score-box' );
    },

    changeCursor: function () {
        birdAction.body.style.cursor = "url( 'images/gun-aim.png' ), auto";
    },

    originalCursor: function () {
        birdAction.body.style.cursor = 'none';
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
        var mainSection = $( '#main-section' );
        if( mainSection.hasClass( 'rain' ) ){
            birdAction.mainSection.classList.remove( 'rain' );
        }
        if( 0 != mainSection.find( 'div.drop' ).length ){
            for( var i = 1; i < birdAction.nbRainDrop; i++ ){
                document.getElementById( 'drop' + i  ).remove();
            }
        }
    },

    gameTimerLevel1: function ( ) {
        var timeLeftP = document.querySelector( '.time-left' );
        birdAction.timer = birdAction.gameTimer;
        document.querySelector( '.target-score ' ).innerText = birdAction.requiredScore;
        var scoreIntervalCheck = setInterval( function () {

            birdAction.timer = birdAction.timer - 1;
            timeLeftP.innerText =  birdAction.timer ;

            if( 20 > birdAction.timer ){
                timeLeftP.classList.add( 'twenty-sec-to-go' );
            }
            if( 10 > birdAction.timer ){
                timeLeftP.classList.remove( 'twenty-sec-to-go' );
                timeLeftP.classList.add( 'nine-sec-to-go' );
            }
            if( ( birdAction.requiredScore >  birdAction.score )
                && ( 0 === birdAction.timer ) ){
                    if( $( timeLeftP ).hasClass( 'twenty-sec-to-go' ) ){
                        timeLeftP.classList.remove( 'twenty-sec-to-go' );
                    }
                    timeLeftP.classList.remove( 'nine-sec-to-go' );
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
        var timeLeftP = document.querySelector( '.time-left' );
            birdAction.timer = birdAction.gameTimer;
        document.querySelector( '.target-score ' ).innerText = birdAction.requiredScore;
        var scoreIntervalCheck = setInterval( function () {

            birdAction.timer = birdAction.timer - 1;
            timeLeftP.innerText =  birdAction.timer;

            if( $( timeLeftP ).hasClass( 'twenty-sec-to-go' ) ){
                timeLeftP.classList.remove( 'twenty-sec-to-go' );
            }
            if( $( timeLeftP ).hasClass( 'nine-sec-to-go' ) ){
                timeLeftP.classList.remove( 'nine-sec-to-go' );
            }
            if( 20 > birdAction.timer ){
                timeLeftP.classList.add( 'twenty-sec-to-go' );
            }
            if( 10 > birdAction.timer ){
                timeLeftP.classList.remove( 'twenty-sec-to-go' );
                timeLeftP.classList.add( 'nine-sec-to-go' );
            }
            if( 0 === birdAction.timer ){
                if( $( timeLeftP ).hasClass( 'twenty-sec-to-go') ){
                    timeLeftP.classList.remove( 'twenty-sec-to-go' );
                }
                timeLeftP.classList.remove( 'nine-sec-to-go' );
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
        var timeLeftP = document.querySelector( '.time-left' );
        birdAction.timer = birdAction.gameTimer;
        var scoreIntervalCheck = setInterval( function () {

            birdAction.timer = birdAction.timer - 1;
            timeLeftP.innerText =  birdAction.timer ;
            if( $( timeLeftP ).hasClass( 'twenty-sec-to-go') ){
                timeLeftP.classList.remove( 'twenty-sec-to-go' );
            }
            if( $( timeLeftP ).hasClass( 'nine-sec-to-go' ) ){
                timeLeftP.classList.remove( 'nine-sec-to-go' );
            }
            if( 20 > birdAction.timer ){
                timeLeftP.classList.add( 'twenty-sec-to-go' );
            }
            if( 10 > birdAction.timer ){
                timeLeftP.classList.remove( 'twenty-sec-to-go' );
                timeLeftP.classList.add( 'nine-sec-to-go' );
            }
            if( 0 === birdAction.timer ){
                if( $( timeLeftP ).hasClass( 'twenty-sec-to-go') ){
                    timeLeftP.classList.remove( 'twenty-sec-to-go' );
                }
                timeLeftP.classList.remove( 'nine-sec-to-go' );
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
            pTags = '<p></p>',
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
            $( pTags, {
                text: 'Congratulations You have made it to the Next level.',
                class: 'congrats-text'
            } ).prependTo( birdAction.gameOverScoreDiv );
            document.querySelector( '.game-over').classList.remove( 'display' );

        }else{
               if( 1 === birdManShot ){
                birdAction.score = 0;
                birdAction.gameOverScoreDiv.classList.add( 'birdman-came' );
                manScreamAudio.play();

                $( pTags, {
                    text: 'Oops! You killed the BIRDMAN . Any progress Made is lost. Please go back to the home screen and restart.' +
                    'Your Scored Points have changed to :- ',
                    class: 'bird-man-killed',
                    color: 'red'
                } ).prependTo( birdAction.gameOverScoreDiv );

                $( pTags, {
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
                       .replaceWith( '<button class="level1-start-button">Go to Home Screen and Start Again</button>' );
                   $( 'button.level1-start-button' ).on( 'click', birdAction.gameRestartLevel1 );
                   document.querySelector( '.game-over').classList.remove( 'display' );
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
                            .replaceWith( '<button class="level1-start-button">Go to Home Screen and Start Again</button>' );
                        $( 'button.level1-start-button' ).on( 'click', birdAction.gameRestartLevel1 );
                        document.querySelector( '.game-over' ).classList.remove( 'display' );
                        return;
                    }
            }
        }
    },

    gameOverLevel2: function () {
        var pTags = '<p></p>',
            timeTookToFinish = birdAction.gameTimer - birdAction.timer,
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
            $( pTags, {
                text: 'Congratulations You have made it to the Next level. You have unlocked Level3 : The Angry Dragon',
                class: 'congrats-text'
            } ).prependTo( birdAction.gameOverScoreDiv );

            $( pTags, {
                text: 'About the Dragon: This dragon has been sleeping in his castle in the jungle for years.' +
                ' However your shooting business has disturbed his sleep. He is now awake and is ' +
                'very angry. You must find a way to put him back to sleep. The Dragon changes colors and has the power to ' +
                'become invisible. Its tricky to beat the Dragon.' +
                ' However, I leave this in your able hands to accept the challenge and beat him. If you are not able to ,' +
                ' then the trick to beat him will be shared with you.',
                class: 'dragon-story'
            } ).appendTo( birdAction.gameOverScoreDiv );

            birdAction.level2StartButton.classList.add( 'display' );
            birdAction.level3StartButton.classList.remove( 'display' );
            $( 'button.level3-start-button' ).on( 'click', birdAction.startLevelThree );

        }else{

            if( false === $( birdAction.gameOverScoreDiv ).hasClass( 'birdman-came' ) ) {

                birdAction.gameOverScoreDiv.innerText = 'You Scored ' + birdAction.score + ' pts ' + 'in '
                    + birdAction.gameTimer + ' secs';
                    couldNotScoreEl = document.createElement( 'p' ),
                    couldNotScoreText = document.createTextNode('Sorry you could not score the required target. Please Try Again' ),
                    birdTipEl = document.createElement( 'p' ),
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

                $( birdAction.level2StartButton ).replaceWith( '<button class="level2-start-button">ReStart</button>' );
                $( 'button.level2-start-button' ).on( 'click', birdAction.gameRestartLevel2 );
            }
        }
        document.querySelector( '.game-over' ).classList.remove( 'display' );
    },

    gameOverLevel3: function () {
        var timeTookToFinish, gameOverDiv,couldNotScoreEl
            ,couldNotScoreText,dragonKillingTipEl,dragonKillingTipText,
            pTags = '<p></p>',
            creditsDiv = document.querySelector( '.credits' );

        birdAction.angryDragonScream.pause();
        birdAction.gunImage.classList.add( 'display' );
        if( $( '.content' ).children().hasClass( 'dragon-entry-green' ) ){
            document.querySelector( '.dragon-entry-green' ).remove();
        }
        birdAction.stopRain();
        document.querySelector( '.header' ).classList.add( 'display' );

            timeTookToFinish = birdAction.gameTimer - birdAction.timer;
            gameOverDiv = document.querySelector( '.game-over');

            if( ( 0 === birdAction.health.value ) && ( 0 < birdAction.timer ) )  {
                birdAction.originalCursor();
                birdAction.gameOverScoreDiv.textContent = "";
                birdAction.level3StartButton.classList.add( 'display' );
                creditsDiv.classList.add( 'wrapper' );
                creditsDiv.classList.remove( 'display' );
                setTimeout( function () {
                    creditsDiv.classList.add( 'display' );
                    creditsDiv.classList.remove( 'wrapper' );

                    $( '<img></img>', {
                        src: 'images/dragon-sleeping.gif',
                        class: 'sleeping-dragon'
                    } ).prependTo( gameOverDiv );

                    $( pTags, {
                        text: 'Congratulations You have completed all three levels.You have put the Dragon back to Sleep in '
                        + timeTookToFinish + ' secs. ' +' Go back to the home Screen and Restart the Game',
                        class: 'congrats-text'
                    } ).prependTo( gameOverDiv );

                    birdAction.gameOverScoreDiv.textContent = "";
                    $( birdAction.level3StartButton ).replaceWith( '<button class="level2-start-button">Go to Home Screen</button>' );
                    $( 'button.level2-start-button' ).on( 'click', birdAction.gameRestartLevel1 );
                }, 40000 );

            }else{

                couldNotScoreEl = document.createElement( 'p' );
                couldNotScoreText = document.createTextNode( 'Sorry you could not put the Dragon to Sleep in Required Time. Please Try Again' );
                dragonKillingTipEl = document.createElement( 'p' );
                dragonKillingTipText = document.createTextNode( 'Tip on How to put the Dragon back to Sleep : The dragons outer skin ' +
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
                birdAction.gameOverScoreDiv.textContent = "";
                birdAction.gameOverScoreDiv.appendChild( couldNotScoreEl );
                birdAction.gameOverScoreDiv.appendChild( dragonKillingTipEl );
                birdAction.level2StartButton.classList.add( 'display' );
                birdAction.level3StartButton.classList.remove( 'display' );
                document.querySelector( 'progress' ).remove();
                document.querySelector( '.dragon-health-name' ).remove();
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
        document.querySelector( '.game-over' ).classList.add( 'display' );
        birdAction.startLevelTwo();
    },

    newDragonEntry: function () {
        var timeInterval = 0,
            imgTags = '<img></img>',
            newDragonEntryInterval = setInterval( function () {
            timeInterval += 1;
            /**
             * After 15 secs from the start of Level3 Game
             */
            if ( timeInterval > 5 ){
                $( '.dragon-entry-green' ).fadeOut( 2000 );
            }
            if ( timeInterval > 10 ){
                if( false === $( '.content' ).children().hasClass( 'dragon-entry-brown') ){
                    $( '.dragon-entry-green' ).remove();
                    $( '<img></img>', {
                        src: 'images/dragon-entry-brown.png',
                        class: 'dragon-entry-brown'

                    } ).fadeIn( 1000 )
                        .delay( 2000 )
                        .prependTo( '.content' )
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
            if ( timeInterval > 21 ){
                $( '.dragon-entry-brown' ).remove();
                if( false === $( '.content' ).children().hasClass( 'dragon-entry-dark-green' ) ){
                    $( imgTags, {
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
                    birdAction.dragonImageEl = document.querySelector( '.dragon-entry-dark-green' );
                    birdAction.dragonImageEl.addEventListener( 'click', birdAction.dragonHitStronger );
                }
            }
            if( timeInterval > 32 ){
                $( '.dragon-entry-dark-green' ).remove();
                if( false === $( '.content' ).children().hasClass( 'dragon-fire-left' ) ){
                    $( imgTags, {
                        src: 'images/dragon-fire-left.gif',
                        class: 'dragon-fire-left'

                    } ).fadeIn( 1000 )
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
                $( '.dragon-fire-left' ).remove();
                if( false === $( '.content' ).children().hasClass( 'dragon-fire-right' ) ){
                    $( imgTags, {
                        src: 'images/dragon-fire-right.gif',
                        class: 'dragon-fire-right'

                    } ).fadeIn( 1000 )
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
                $( '.dragon-fire-right' ).remove();
                if( false === $( '.content').children().hasClass( 'dragon-fire' ) ){
                    $( imgTags, {
                        src: 'images/dragon-fire.gif',
                        class: 'dragon-fire'

                    } ).fadeIn( 1000 )
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
                $( '.dragon-fire' ).remove();
                if( false === $( '.content').children().hasClass( 'dragon-final' ) ){
                    $( imgTags, {
                        src: 'images/dragon-final.gif',
                        class: 'dragon-final'

                    } ).fadeIn( 1000 )
                        .prependTo( '.content' )
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
        birdAction.health.value -= 5;
        $( birdAction.dragonImageEl ).fadeOut( 200 );
        $( birdAction.dragonImageEl ).fadeIn( 100 );
    }
};

birdAction.init();