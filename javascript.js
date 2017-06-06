/**
 * Bird Shooting game
 * global jQuery, window.
 */

var birdShootingGame = (function( $ ) {
    'use strict';

    var game = {

        score: 0,
        timer: 0,
        gameTimer: 0,
        scoreBox: 0,
        requiredScore: 0,
        nbRainDrop: 300,
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
        birdNoToSend: 0,
        randRange: 10,
        birdSpeed: 10000,
        health: 200,
        birdInterval: 100,
        birdEntryInterval: false,
        dragonEntryInterval: null,
        newDragonEntryInterval: false,
        scoreIntervalCheck: false,

        /**
         * Queries elements from the DOM and stores their value in reusable variables
         * Plays game start music in a loop
         * Adds event listeners for Start Button to start Level 1 and level 2
         * Adds event listener for Gun Image to follow the cursor
         *
         * @return {void}
         */
        init: function () {
            game.setEl();
            game.events();
            game.mainContent.classList.add( 'display' );
            game.loadingEl.classList.add( 'display' );
            game.mainSection.classList.remove( 'display' );
            game.body.style.minHeight = window.outerHeight;
            alert( 'Welcome! For the best user experience , this game is designed to play in portrait mode for mobile devices. So if ' +
                'you are using a mobile device, please play in portrait mode. This game is online. So some music and images files may take time to download')
        },

        /**
         * Set events for the game.
         *
         * @return {void}
         */
        events: function() {
            $( game.level1StartButton ).on( 'click', game.startLevelOne );
            $( game.level2StartButton ).on( 'click', game.startLevelTwo );
            $( game.body ).on( 'mousemove', game.imgFollowCursor );
            $( game.beginner ).on( 'click', game.toggleClassBeginner );
            $( game.advanced ).on( 'click', game.toggleClassAdvanced );
        },

        /**
         * Set elements for the game.
         *
         * @return {void}
         */
        setEl: function(){
            game.body = document.querySelector( 'body' );
            game.loadingEl = document.querySelector( '.loading' );
            game.beginner = document.querySelector( '.beginner' );
            game.advanced = document.querySelector( '.advanced' );
            game.mainContent = document.querySelector( '.main-content' );
            game.header = document.querySelector( '.header' );
            game.mainSection = document.getElementById( 'main-section' );
            game.content = document.querySelector( '.content' );
            game.button = document.querySelector( 'button' );
            game.leftBirdNestDiv = document.querySelector( '.left-bird-nest' );
            game.rightBirdNestDiv = document.querySelector( '.right-bird-nest' );
            game.gameOverdiv = document.querySelector( '.game-over' );
            game.gunShotAudio = document.getElementById( 'gun-shot-audio' );
            game.audioBirdFlap = document.getElementById( 'bird-flapping' );
            game.birdKilledSound = document.getElementById( 'bird-killed-sound' );
            game.thunderstormMusic = document.getElementById( 'thunderstorm-clip' );
            game.gameOverScoreDiv = document.querySelector( '.game-over-score' );
            game.level1StartButton = document.querySelector( '.level1-start-button' );
            game.level2StartButton = document.querySelector( '.level2-start-button' );
            game.level3StartButton = document.querySelector( '.level3-start-button' );
            game.backgroundMusicLevel2 = document.getElementById( 'background-music-level2' );
            game.pTags = '<p>';
            game.imgTags = '<img>';
        },

        /**
         * toggles class beginner
         */
        toggleClassBeginner: function () {
            $( game.mainSection ).toggleClass( 'beginner-mode' );
            $( game.mainSection ).removeClass( 'advanced-mode' );
        },

        /**
         * toggles class advanced
         */
        toggleClassAdvanced: function () {
            $( game.mainSection ).toggleClass( 'advanced-mode' );
            $( game.mainSection ).removeClass( 'beginner-mode' );
        },

        /**
         * Clears all intervals
         */
        clearAllInterval : function () {
            clearInterval( game.scoreIntervalCheck );
            clearInterval( game.dragonEntryInterval );
            clearInterval( game.birdEntryInterval );
            clearInterval( game.newDragonEntryInterval );
        },

        /**
         * Sets Value of birdInterval,No of Birds to be Sent,No of Divs to be created
         * left and right from which birds will come out randomly.
         * BirdSpeed which tells how long the bird will take fly from start to window top.
         * Required Score to be achieved to clear the level.
         * Calls createRain() to start Rain.
         * Plays Rain drop audio.
         * Adds background image for Level1
         * Hides before-game-starts div
         * Calls birdsMove() to make the birds fly
         * Calls gameTimerLevel1() to start the game Timer.
         *
         * @return {void}
         */
        startLevelOne: function(){
            /**
             * birdNoToSend is in multiples of 2 .
             * If you choose 2 meaning 4 birds will be sent
             */
            game.birdNoToSend = 60;
            game.birdNestDivNo = 60;

            /*
             * ids to be created from zero up until range.
             */
            game.randRange = game.birdNestDivNo;
            if ( $( game.mainSection ).hasClass( 'advanced-mode' ) ){
                game.requiredScore = game.birdNoToSend * 110 ;
                game.birdSpeed = 15000;
                game.birdInterval = 2300;

            }else{
                game.requiredScore = game.birdNoToSend * 80 ;
                game.birdSpeed = 20000;
                game.birdInterval = 2800;
            }
            game.gameTimer = 100; // In secs
            game.backgroundMusicLevel1 = document.getElementById( 'music-before-start' );
            game.backgroundMusicLevel1.addEventListener( 'ended', function() {
                this.currentTime = 0;
                this.play();
            }, false );
            game.backgroundMusicLevel1.play();
            game.createRain();
            game.audioRainDrop = document.getElementById( 'rain-falling' );
            game.audioRainDrop.play();
            game.body.classList.add( 'level1-background' );
            document.querySelector( '.before-game-start').classList.add( 'display' );
            game.birdsMove();
            game.gameTimerLevel1();
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
         *
         * @return {void}
         */
        startLevelTwo: function(){
            var birdsDivs = $( '.birds-div' ),
                timeLeftP = document.querySelector( '.time-left' );
            $( game.body ).removeClass( 'level1-background' );
            $( game.body ).addClass( 'level2-background' );
            game.clearAllInterval();
            game.stopRain();
            game.backgroundMusicLevel1.pause();
            game.backgroundMusicLevel2.play();
            game.gameOverScoreDiv.textContent = "";
            document.querySelector( '.target-score ' ).innerText = String( 0 );
            game.gameTimer = 0;
            game.score = 0; // update score back to zero for level two
            game.updateScore();
            $( timeLeftP ).removeClass( 'nine-sec-to-go' );

            birdsDivs.each( function () {
                $( this ).remove();
            } );

            /**
             * birdNoToSend is in multiples of 4 .
             * If you choose 2 meaning 4 birds will be sent
             * @type {number}
             */
            game.birdNoToSend = 80;
            game.birdNestDivNo = 80;

            /*
             * ids to be created from zero up until range
             */
            game.randRange = game.birdNestDivNo;
            if ( $( game.mainSection ).hasClass( 'advanced-mode' ) ){
                game.requiredScore = game.birdNoToSend * 100 ;
                game.birdInterval = 1500;
                game.birdSpeed = 12000;
            }else{
                game.requiredScore = game.birdNoToSend * 80 ;
                game.birdInterval = 2000;
                game.birdSpeed = 15000;
            }
            game.gameTimer = 110; // in secs
            game.birdImgSourceLeft = 'images/level2-bird-left.gif';
            game.birdImgSourceRight = 'images/level2-bird-right.gif';
            game.mainSection.classList.remove( 'display' );
            game.gameOverdiv.classList.add( 'display' );
            game.birdsMove();
            game.gameTimerLevel2();
        },

        /**
         * Sets gameTimer to 90secs.
         * Removes bird images from previous level
         * Removes classes red-health and blue-health if they exist
         * Hides game over div, creates Rain
         * Starts gameTimer
         * Changes the cursor back to default
         * Hides the gun image while lightening strikes.
         * Hides score-div and time remaining.
         * Plays thunderstorm Music and angryDragon Music
         * Sets the Image of the dragon to float right
         * Creates an InterVal for 80 secs for Dragon Entry and exit.
         * Creates dragon image and animates it position for 10 secs
         * After 10 secs changes cursor to gun-target img, re-displays gun img
         * Changes background img ,starts playing level3 music
         * Creates progress-div for health bar ,
         * Displays header,time remaining, adds event listener to dragon img
         * to increase his health when hit,
         *
         * @return {void}
         */
        startLevelThree: function() {
            var progress, headerChildren = $( 'header' ).children(),
                contentHasLeftBirdNestClass,
                nestDivHasClassDisplay;
            game.backgroundMusicLevel3 = document.getElementById( 'background-music-level3' );
            game.backgroundMusicLevel3.play();
            game.backgroundMusicLevel3.volume = 0.085;
            if ( ! $( game.body ).hasClass( 'lightening-background' ) ){
                game.body.classList.add( 'lightening-background' );
            }
            game.clearAllInterval();
            game.gameTimer = 90;
            $( game.body ).removeClass( 'level2-background' );
            $( game.body ).removeClass( 'level3-background');

            contentHasLeftBirdNestClass = $( game.content ).find( 'div' ).first().hasClass( 'left-bird-nest' );
            nestDivHasClassDisplay = $( game.leftBirdNestDiv ).hasClass( 'display' );

            if ( contentHasLeftBirdNestClass && ! nestDivHasClassDisplay ){
                game.leftBirdNestDiv.remove();
                game.rightBirdNestDiv.remove();
            }
            if( headerChildren.hasClass( 'red-health' ) ){
                document.querySelector( 'progress' ).classList.remove( 'red-health' );
            }
            if( headerChildren.hasClass( 'blue-health' ) ){
                document.querySelector( 'progress' ).classList.remove( 'blue-health' );
            }
            if ( ! $( game.gameOverdiv ).hasClass( 'display' ) ) {
                game.gameOverdiv.classList.add( 'display' );
            }
            if ( $( game.mainSection ).hasClass( 'display' ) ) {
                game.mainSection.classList.remove( 'display' );
            }

            game.mainSection.classList.add( 'rain' );
            game.createRain();
            game.gameTimerLevel3();
            game.originalCursor();
            game.gunImage.classList.add( 'display' );
            document.querySelector( '.score-div' ).classList.add( 'display' );
            document.querySelector( '.time-remaining' ).classList.add( 'display' );
            game.backgroundMusicLevel2.pause();

            /**
             * Short lightening effect
             */
            game.angryDragonScream = document.getElementById( 'angry-dragon' );
            game.thunderstormMusic.play();
            game.angryDragonScream.addEventListener( 'ended', function() {
                this.currentTime = 0;
                this.play();
            }, false );
            game.angryDragonScream.play();
            game.content.style.float = 'right';

            game.lighteningIntervalCounter = 0;

            /**
             * Interval for Dragon entry an exit
             * @type {number}
             */
            game.dragonEntryInterval = setInterval( game.dragonEntry, 1000 );
        },

        dragonEntry: function () {
            var progress,dragonEntryGreen ,
                dragonRightPos = ( window.outerWidth / 4 ) ;

            game.lighteningIntervalCounter++;
            if ( ! $( game.content ).children().hasClass( 'dragon-entry-green') ){
                $( game.imgTags, {
                    src: 'images/dragon-entry-green.gif',
                    class: 'dragon-entry-green'
                } ).animate(
                    {
                        'position': 'absolute',
                        'top': '0px',
                        'right': dragonRightPos // was orignially set to 350px
                    }, 10000
                )
                    .prependTo( game.content );
            }

            /**
             * After 10 secs.
             */
            if ( game.lighteningIntervalCounter > 10 ){
                game.changeCursor();
                game.gunImage.classList.remove( 'display' );
                game.body.classList.add( 'level3-background');
                $( game.body ).removeClass( 'lightening-background' );
                game.backgroundMusicLevel3.volume = 1.0;

                if( ! $( game.header ).children().hasClass( 'progress-class' ) ){
                    $( '<p></p>', {
                        class: 'dragon-health-name',
                        text: 'Dragon Health Bar'
                    }).appendTo( game.header );
                    $( '<progress></progress>', {
                        id: 'health',
                        class: 'progress-class',
                        value: '200',
                        max:'400'
                    }).appendTo( game.header );
                }
                if( $( game.header ).hasClass( 'display' ) ){
                    game.header.classList.remove( 'display' );
                }
                progress = $( 'progress' );
                dragonEntryGreen = document.querySelector( '.dragon-entry-green' );
                game.dragonImageEl = dragonEntryGreen;
                game.health = document.getElementById( "health" );
                document.querySelector( '.time-remaining' ).classList.remove( 'display' );
                dragonEntryGreen.addEventListener( 'click', game.dragonHitStronger );
                game.newDragonEntry();
                clearInterval( game.dragonEntryInterval );
            }
        },

        /**
         * Declares variables birdIntervalCounter,leftDiv and rightDiv for inserting
         * bird images randomly.
         * Re-displays  main-content div.
         * Plays birdFlap audio, hides buttons. Calls changeCursor() to change the
         * cursor to gun-aim img.
         * Creates gun-img if it already does not exist
         * Creates required no of divs inside leftBirdNestDiv and rightBirdNestDiv.
         * Gives ids to left and right divs
         * Sets Interval for required time.
         * Inside the interval we call createBirdsLeft() and createBirdsRight() to
         * create the birds img dynamically and insert them inside the divs we just created
         * Then animate their position to make them fly randomly.
         * And remove them from DOM once they reach the top of the window
         * There are conditions inside Set intervals to check
         * when the timer is 0 or user achieves the required target ,exit out of the interval
         *
         * @return {void}
         */
        birdsMove: function () {
            var birdIntervalCounter = 0, divLeftBird, divRightBird, rightId,
                leftDiv = document.querySelector( '.left-bird-nest' ),
                rightDiv = document.querySelector( '.right-bird-nest' );

            game.mainContent.classList.remove( 'display' );
            game.audioBirdFlap.play();
            game.button.classList.add( 'display' );
            game.changeCursor();

            if ( null === game.gunImage ) {
                game.createGunImage();
            }
            /**
             * Making bird nest divs
             */
            if( $( game.leftBirdNestDiv ).children().length === 0 &&
                $( game.rightBirdNestDiv ).children().length === 0 ) {
                for( var i = 0; i < game.birdNestDivNo; i++  ){
                    divLeftBird = document.createElement( 'div' ),
                        divRightBird = document.createElement( 'div' ),
                        rightId = i + game.birdNestDivNo;

                    divLeftBird.setAttribute( 'id', 'id' + i );
                    divLeftBird.setAttribute( 'class', 'birds-div' );
                    divRightBird.setAttribute( 'id', 'id' + rightId );
                    divRightBird.setAttribute( 'class', 'birds-div' );
                    rightDiv.appendChild( divRightBird );
                    leftDiv.appendChild( divLeftBird );
                }
            }

            game.birdEntryInterval = setInterval( function () {
                if ( birdIntervalCounter > game.birdNoToSend ){
                    clearInterval( game.birdEntryInterval );
                    return;
                }
                if ( 0 === game.timer ){
                    clearInterval( game.birdEntryInterval );
                    return;
                }
                if ( ( game.requiredScore <=  game.score ) &&
                    ( 0 < game.timer ) )  {
                    clearInterval( game.birdEntryInterval );
                    return;
                }

                game.createBirdsLeft();

                $( game.newBirdLeft ).animate(
                    {
                        'bottom': window.innerHeight,
                        'left': window.innerWidth
                    },
                    {
                        duration:game.birdSpeed,
                        complete: function () {
                            $( this ).remove();
                        }
                    }
                );

                game.createBirdsRight();
                $( game.newBirdRight ).delay(1000).animate(
                    {
                        'bottom': window.innerHeight,
                        'right': window.innerWidth
                    },
                    {
                        duration:game.birdSpeed,
                        complete: function () {
                            $( this ).remove();

                        }
                    }
                );

                birdIntervalCounter++;

            }, game.birdInterval );
        },

        /**
         *Calls createRandomIdLeft() and randomIdCheckerLeft()
         * Check if random id already exists, if not make a new one
         * Then searches DOM for the div that has that random id.
         * It then creates an img element for the bird and inserts the image in that
         * div with that random id ( if the div does not have the img already)
         * Also checks if the random id is 5 , then inserts birdman img and adds a
         * class to it.
         *
         * @return {void}
         */
        createBirdsLeft: function () {
            var leftBirdNest;

            /**
             * Checking if random id already exists, if no make a new one.
             */
            game.createRandomIdLeft();
            game.randomIdCheckerLeft();
            leftBirdNest = document.getElementById( 'id' + game.randLeft );

            if ( "" === leftBirdNest.innerHTML ){
                game.newBirdLeft = document.createElement( 'img' );
                game.newBirdLeft.setAttribute( 'class', 'bird' );

                if ( 5 === game.randLeft ){
                    game.newBirdLeft.setAttribute( 'src', 'images/man-flying.gif' );
                    game.newBirdLeft.setAttribute( 'class', 'man-bird-image');
                } else {
                    game.newBirdLeft.setAttribute( 'src', game.birdImgSourceLeft );
                }

                leftBirdNest.appendChild( game.newBirdLeft );
                game.newBirdLeft.addEventListener( 'click', game.birdDisappear );
            }
        },

        /**
         * Does Same as the createBirdsLeft except it does it for the right divs
         * and does not inserts bird-man img
         *
         * @return {void}
         */
        createBirdsRight: function () {
            var rightBirdNest;

            /**
             * Checking if random id already exists, if yes make a new one.
             */
            game.createRandomIdRight();
            game.randomIdCheckerRight();
            rightBirdNest = document.getElementById( 'id' + game.randRight );

            if( "" === rightBirdNest.innerHTML ) {
                game.newBirdRight = document.createElement( 'img' );
                game.newBirdRight.setAttribute( 'class', 'bird' );
                game.newBirdRight.setAttribute( 'src', game.birdImgSourceRight );
                rightBirdNest.appendChild( game.newBirdRight );
                game.newBirdRight.addEventListener( 'click', game.birdDisappear );
            }
        },

        /**
         * Create random Id left.
         *
         * @return {void}
         */
        createRandomIdLeft: function () {
            game.randLeft = Math.floor( Math.random() * game.randRange );
        },

        /**
         * Create random id right.
         *
         * @return {void}
         */
        createRandomIdRight: function () {
            game.randRight = game.birdNestDivNo + Math.floor( Math.random() * game.randRange );
        },

        /**
         * Checks if  the id does not exist in the array, if not creates an id
         * and pushes the same id into the arrayLeftDivId so that it can be checked
         * again while creating a new id
         *
         * @return {void}
         */
        randomIdCheckerLeft: function () {
            var itemCheck = $.inArray( 'id' + game.randLeft, game.arrayLeftDivId );
            if ( -1 !== itemCheck ){
                game.createRandomIdLeft();
            } else{
                game.arrayLeftDivId.push( 'id' + game.randLeft );
            }
        },

        /**
         * Checks if  the id does not exist in the array, if not creates an id
         * and pushes the same id into the arrayRightDivId so that it can be checked
         * again while creating a new id
         *
         * @return {void}
         */
        randomIdCheckerRight: function () {
            var itemCheck = $.inArray( 'id' + game.randRight, game.arrayRightDivId );
            if( -1 !== itemCheck ){
                game.createRandomIdRight();
            }else{
                game.arrayRightDivId.push( 'id' + game.randRight );
            }
        },

        /**
         * It is called when the bird or bird-man is shot.
         * Checks if the bird-man has been shot, if yes then calls gameOverLevel1()
         * Plays birdKilledSound.
         * Plays gunShotAudio.
         * Finds the id of the bird div shot and pushes into the totalBirdShot Array
         * Changes the bird image to blood-splatter img when it is shot using setAttribute
         * Adds class of animated and fadeout to fadeout the birds when shot
         * Adds the score and calls update score to update the score into score-box
         *
         * @param {object} event Event passed through click.
         * @return {void}
         */
        birdDisappear: function ( event ) {
            var birdManShot,
                birdHitId = event.target.parentNode.getAttribute( 'id' );

            if ( $( event.target ).hasClass( 'man-bird-image' ) ){
                birdManShot = 1;
                game.gameOverLevel1( birdManShot );
            } else {
                game.birdKilledSound.volume = 0.08;
                game.birdKilledSound.play();
            }

            game.totalBirdsShot.push( birdHitId );
            event.target.setAttribute( 'src', 'images/blood-splatter.jpg' );
            event.target.classList.add( 'blood-splat-img' );
            game.gunShotAudio.play();
            event.target.parentNode.classList.add( 'animated' );
            event.target.parentNode.classList.add( 'fadeOut' );
            game.score = game.score + 100;
            game.updateScore();
            event.target.style.pointerEvents = 'none';
        },

        updateScore: function () {
            game.scoreBox = document.querySelector( '.score-box' );
            game.scoreBox.innerText = String( game.score );
        },

        changeCursor: function () {
            game.body.style.cursor = "url( 'images/gun-aim.png' ), auto";
        },

        originalCursor: function () {
            game.body.style.cursor = 'default';
        },

        createGunImage: function () {
            var  gameArea = document.querySelector( 'footer' );

            game.gunImage = document.createElement( 'img' );
            game.gunImage.setAttribute( 'src', game.gunImageSrc );
            game.gunImage.setAttribute( 'class', 'gun-image' );
            gameArea.appendChild( game.gunImage );
        },

        /**
         * Makes the gun image follow the cursor
         * @param event
         */
        imgFollowCursor: function ( event ) {
            var left, top;

            if ( event.pageX > ( window.innerWidth / 2 ) ) {
                left = event.pageX + 100;
                top = event.pageY - 50;
                $( game.gunImage ).addClass( 'look-left' );
                $( game.gunImage ).css( 'left', left );
                $( game.gunImage ).css( 'top', top );
            } else {
                left = event.pageX - 300;
                top = event.pageY + 200;
                $( game.gunImage ).removeClass( 'look-left' );
                $( game.gunImage ).css( 'left', left );
                $( game.gunImage ).css( 'top', top );
            }
        },

        createRain: function () {
            var drop, getRandomNumber, dropLeft, dropTop, id,
                rainDiv = $( '.rain' );

            /**
             * Generate a random number.
             */
            getRandomNumber = function( minNum, maxNum ) {
                return Math.floor( Math.random() * ( maxNum - minNum + 1 ) ) + minNum;
            };

            /**
             * Generate drops.
             */
            for ( var i = 1; i < game.nbRainDrop; i++ ) {
                dropLeft = getRandomNumber( 0, window.outerWidth );
                dropTop = getRandomNumber( -1000, 1400 );
                id = 'drop' + i;

                rainDiv.append( '<div class="drop" id="' + id + '"></div>' );
                drop = $( '#' + id );
                drop.css( 'left', dropLeft );
                drop.css( 'top', dropTop );
            }
        },

        stopRain: function () {
            if ( ! $( game.mainSection ).hasClass( 'rain' ) ){
                game.mainSection.classList.remove( 'rain' );
            }

            if ( $( game.mainSection ).find( 'div.drop' ).length ){
                for ( var i = 1; i < game.nbRainDrop; i++ ) {
                    document.getElementById( 'drop' + i  ).remove();
                }
            }
        },

        /**
         * Sets the timer to GameTimer and inserts that value into timer-box
         * Sets an interval for the gameTimer period which keep replacing the
         * current time into time-box.
         * Checks conditions to change the color of  the time if time value goes below
         * 20s and 10s and also removes classes which were already added to change the color
         * If the user achieves the score higher or equal to whats required or
         * if time lapses it calls gameOver()
         *
         * @return {void}
         */
        gameTimerLevel1: function ( ) {
            var timeLeftP = document.querySelector( '.time-left' ),
                runTimer, scoreAchieved, scoreNotAchieved;

            game.timer = game.gameTimer;
            document.querySelector( '.target-score' ).innerText = String( game.requiredScore );

            runTimer = function () {

                timeLeftP.innerText = String( --game.timer );
                scoreAchieved = game.requiredScore <= game.score && 0 <= game.timer;
                scoreNotAchieved = game.requiredScore > game.score && 0 === game.timer;

                if ( 19 === game.timer ){
                    timeLeftP.classList.add( 'twenty-sec-to-go' );
                }

                if ( 9 === game.timer ){
                    timeLeftP.classList.remove( 'twenty-sec-to-go' );
                    timeLeftP.classList.add( 'nine-sec-to-go' );
                }

                if ( scoreAchieved || scoreNotAchieved ){
                    $( timeLeftP ).remove( 'twenty-sec-to-go nine-sec-to-go' );
                    game.gameOverLevel1( game.timer );
                    clearInterval( game.scoreIntervalCheck );
                }
            };

            game.scoreIntervalCheck = setInterval( runTimer, 1000 );
        },

        /**
         * Same as gameTimerLevel1
         *
         * @return {void}
         */
        gameTimerLevel2: function () {

            var timeLeftP = document.querySelector( '.time-left' ),
                runTimer, scoreIntervalCheck, scoreAchieved, scoreNotAchieved, runTimerInterval;
            clearInterval( game.scoreIntervalCheck );
            runTimerInterval = 1000;
            game.timer = game.gameTimer;
            timeLeftP.innerText =  String( game.timer );
            document.querySelector( '.target-score' ).innerText = String( game.requiredScore );
            if( $( timeLeftP ).hasClass( 'twenty-sec-to-go' ) ){
                timeLeftP.classList.remove( 'twenty-sec-to-go' );
            }
            if( $( timeLeftP ).hasClass( 'nine-sec-to-go' ) ){
                timeLeftP.classList.remove( 'nine-sec-to-go' );
            }
            runTimer = function () {

                timeLeftP.innerText = String( --game.timer );
                scoreAchieved = game.requiredScore <= game.score && 0 <= game.timer;
                scoreNotAchieved = game.requiredScore > game.score && 0 === game.timer;

                if ( 19 === game.timer ){
                    timeLeftP.classList.add( 'twenty-sec-to-go' );
                }

                if ( 9 === game.timer ){
                    timeLeftP.classList.remove( 'twenty-sec-to-go' );
                    timeLeftP.classList.add( 'nine-sec-to-go' );
                }

                if ( scoreAchieved || scoreNotAchieved ){
                    $( timeLeftP ).remove( 'twenty-sec-to-go nine-sec-to-go' );
                    game.gameOverLevel2( game.timer );
                    clearInterval( game.scoreIntervalCheck );
                }
            };

            game.scoreIntervalCheck = setInterval( runTimer, runTimerInterval );
        },

        /**
         * Sets the Game timer .
         * Creates an interval to run the time within which checks condition when the time
         * lapses or dragon health value reduces to 0 calls gameOverLevel3()
         *
         * @return {void}
         */
        gameTimerLevel3: function () {
            var timeLeftP = document.querySelector( '.time-left' );

            game.timer = game.gameTimer;
            if( $( timeLeftP ).hasClass( 'twenty-sec-to-go') ){
                timeLeftP.classList.remove( 'twenty-sec-to-go' );
            }
            if( $( timeLeftP ).hasClass( 'nine-sec-to-go' ) ){
                timeLeftP.classList.remove( 'nine-sec-to-go' );
            }
            game.scoreIntervalCheck = setInterval( function () {

                if( 0 < game.timer ){
                    game.timer = game.timer - 1;
                    timeLeftP.innerText =  game.timer;
                }
                if( 20 === game.timer ){
                    timeLeftP.classList.add( 'twenty-sec-to-go' );
                }
                if( 10 === game.timer ){
                    timeLeftP.classList.remove( 'twenty-sec-to-go' );
                    timeLeftP.classList.add( 'nine-sec-to-go' );
                }
                if( 0 === game.timer ){
                    if( $( timeLeftP ).hasClass( 'twenty-sec-to-go') ){
                        timeLeftP.classList.remove( 'twenty-sec-to-go' );
                    }
                    timeLeftP.classList.remove( 'nine-sec-to-go' );
                    game.gameOverLevel3( game.timer );
                    clearInterval( game.scoreIntervalCheck );
                    return;
                }

                if( 60 > game.health.value ){
                    if( false === $( 'progress' ).hasClass( 'red-health' ) ){
                        document.querySelector( 'progress').classList.add( 'red-health' );
                    }
                }
                if( 200 < game.health.value ){
                    if( false === $( 'progress' ).hasClass( 'blue-health' ) ){
                        document.querySelector( 'progress').classList.add( 'blue-health' );
                    }
                }
                if( 200 >= game.health.value ){
                    if( true === $( 'progress' ).hasClass( 'blue-health' ) ){
                        document.querySelector( 'progress').classList.remove( 'blue-health' );
                    }
                }

                if( ( 0 ===  game.health.value ) && ( 0 < game.timer ) ){
                    game.gameOverLevel3( game.timer );
                    clearInterval( game.scoreIntervalCheck );
                }
            },1000);
        },

        /**
         * Checks the time and score and asks user to restart the level if birdman shot
         * Stops the level1 music,rain
         * Hides the main-section and displays message and performs action basis
         * if user has cleared the level or failed to do so
         *
         * @param birdManShot
         *
         * @return {void}
         */
        gameOverLevel1: function ( birdManShot ) {
            var timeTookToFinish = game.gameTimer - game.timer,
                manScreamAudio = document.getElementById( 'man-scream' ),
                couldNotScoreEl, couldNotScoreText;

            /**
             * Stop Rain Music
             */
            game.audioRainDrop.pause();
            game.audioBirdFlap.pause();

            /**
             * Stop rain
             */
            game.mainSection.classList.remove( 'rain' );
            game.mainSection.classList.add( 'display' );

            if ( game.score >= game.requiredScore ){
                game.gameOverScoreDiv.innerText = 'You Scored ' + game.score + ' pts ' + 'in '
                    + timeTookToFinish + ' secs';
                $( game.pTags, {
                    text: 'Congratulations You have made it to the Next level.',
                    class: 'congrats-text'
                } ).prependTo( game.gameOverScoreDiv );
                game.gameOverdiv.classList.remove( 'display' );

            } else {
                if ( 1 === birdManShot ){
                    game.score = 0;
                    game.gameOverScoreDiv.classList.add( 'birdman-came' );
                    manScreamAudio.play();

                    $( game.pTags, {
                        text: 'Oops! You killed the BIRDMAN. Any progress made is lost. Please go back to the home screen and restart.' +
                        'Your Scored Points have changed to :- ',
                        class: 'bird-man-killed',
                        color: 'red'
                    } ).prependTo( game.gameOverScoreDiv );

                    $( game.pTags, {
                        text: 'BIRDMAN: The man who has wings is called Birdman.' +
                        ' He may or may not come in any level.But when he does ensure that you don’t shoot him.' +
                        ' He is your friend and under no circumstances should be killed. ' +
                        'If he is shot then the game will be over . ' +
                        'Any progress you might have made in the game will be lost . Point score will change to 0. ' +
                        'And you will need to restart the game from level one, irrespective of what level you might be on.',
                        class: 'bird-man-tip',
                        color: 'black'
                    } ).prependTo( game.gameOverScoreDiv );

                    $( game.level2StartButton ).replaceWith( game.level1StartButton );
                    $( game.level1StartButton ).on( 'click', game.gameRestartLevel1 );
                    game.level1StartButton.classList.remove( 'display' );
                    game.gameOverdiv.classList.remove( 'display' );

                } else if ( ! $( game.gameOverScoreDiv ).hasClass( 'birdman-came' ) ) {
                    game.gameOverScoreDiv.innerText = 'You Scored ' + game.score
                        + ' pts ' + 'in ' + game.gameTimer + ' secs';
                    couldNotScoreEl = document.createElement( 'p' );
                    couldNotScoreText = document.createTextNode( 'Sorry you could not score the required target. Please Try Again' );
                    couldNotScoreEl.appendChild( couldNotScoreText );
                    game.gameOverScoreDiv.appendChild( couldNotScoreEl );
                    $( game.level2StartButton ).replaceWith( game.level1StartButton );
                    $( game.level1StartButton ).on( 'click', game.gameRestartLevel1 );
                    game.level1StartButton.classList.remove( 'display' );
                    game.gameOverdiv.classList.remove( 'display' );
                }
            }
        },

        /**
         * Stops the level2 music
         * Hides the main-section and displays message and performs action basis
         * if user has cleared the level or failed to do so
         *
         * @return {void}
         */
        gameOverLevel2: function () {
            var timeTookToFinish = game.gameTimer - game.timer,
                couldNotScoreEl,couldNotScoreText, birdTipEl, birdTipText;

            /**
             * Stop Rain Music
             */
            game.audioRainDrop.pause();
            game.audioBirdFlap.pause();

            /**
             * Stop rain
             */
            game.mainSection.classList.remove( 'rain' );
            game.mainSection.classList.add( 'display' );

            if( game.score >= game.requiredScore ){

                game.gameOverScoreDiv.innerText = 'You Scored ' + game.score + ' pts ' + 'in '
                    + timeTookToFinish + ' secs';
                $( game.pTags, {
                    text: 'Congratulations You have made it to the Next level. You have unlocked Level3 : The Angry Dragon',
                    class: 'congrats-text'
                } ).prependTo( game.gameOverScoreDiv );

                $( game.pTags, {
                    text: 'About the Dragon: This dragon has been sleeping in his castle in the jungle for years.' +
                    ' However your shooting business has disturbed his sleep. He is now awake and is ' +
                    'very angry. You must find a way to put him back to sleep. The Dragon changes colors and has the power to ' +
                    'become invisible. Its tricky to beat the Dragon.' +
                    ' However, I leave this in your able hands to accept the challenge and beat him. If you are not able to ,' +
                    ' then the trick to beat him will be shared with you.Click on Level3 to Unleash the dragon.',
                    class: 'dragon-story'
                } ).appendTo( game.gameOverScoreDiv );

                game.level2StartButton.classList.add( 'display' );
                game.level3StartButton.classList.remove( 'display' );
                $( game.level3StartButton ).on( 'click', game.startLevelThree );

            } else if ( ! $( game.gameOverScoreDiv ).hasClass( 'birdman-came' ) ) {
                game.gameOverScoreDiv.innerText = 'You Scored ' + game.score + ' pts ' + 'in '
                    + game.gameTimer + ' secs';
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
                game.gameOverScoreDiv.appendChild( couldNotScoreEl );
                game.gameOverScoreDiv.appendChild( birdTipEl );
                $( game.level2StartButton ).on( 'click', game.gameRestartLevel2 );
            }

            game.gameOverdiv.classList.remove( 'display' );
        },

        /**
         * Checks the time taken to complete the level
         * Stops the level3 music,rain
         * Hides the header,gun-image and displays message and performs action basis
         * if user has cleared the level or failed to do so
         *
         * @return {void}
         */
        gameOverLevel3: function () {
            var timeTookToFinish, couldNotScoreEl,couldNotScoreText,
                dragonKillingTipEl, dragonKillingTipText,
                creditsDiv = document.querySelector( '.credits' );

            game.angryDragonScream.pause();
            game.gunImage.classList.add( 'display' );

            if ( $( game.content ).children().hasClass( 'dragon-entry-green' ) ){
                document.querySelector( '.dragon-entry-green' ).remove();
            }

            game.stopRain();
            game.header.classList.add( 'display' );
            timeTookToFinish = game.gameTimer - game.timer;

            if( ( 0 === game.health.value ) && ( 0 < game.timer ) )  {
                $( '.dragon-fire' ).remove();
                $( '.dragon-final' ).remove();
                game.originalCursor();
                game.gameOverScoreDiv.textContent = "";
                game.level3StartButton.classList.add( 'display' );
                creditsDiv.classList.add( 'wrapper' );
                creditsDiv.classList.remove( 'display' );

                var postDisplayCredits = function () {
                    creditsDiv.classList.add( 'display' );
                    creditsDiv.classList.remove( 'wrapper' );

                    $( game.imgTags, {
                        src: 'images/dragon-sleeping.gif',
                        class: 'sleeping-dragon'
                    } ).prependTo( game.gameOverdiv );

                    $( game.pTags, {
                        text: 'Congratulations You have completed all three levels.You have put the Dragon back to Sleep in '
                        + timeTookToFinish + ' secs. ' +' Go back to the home Screen and Restart the Game',
                        class: 'congrats-text'
                    } ).prependTo( game.gameOverdiv );

                    game.gameOverScoreDiv.textContent = "";
                    $( game.level3StartButton ).replaceWith( game.level1StartButton );
                    game.level1StartButton.classList.remove( 'display');
                    $( game.level1StartButton ).on( 'click', game.gameRestartLevel1 );
                };

                setTimeout( postDisplayCredits, 40000 );

            } else {
                $( '.dragon-final' ).remove();
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
                game.gameOverScoreDiv.textContent = "";
                game.gameOverScoreDiv.appendChild( couldNotScoreEl );
                game.gameOverScoreDiv.appendChild( dragonKillingTipEl );
                game.level2StartButton.classList.add( 'display' );
                game.level3StartButton.classList.remove( 'display' );
                document.querySelector( 'progress' ).remove();
                document.querySelector( '.dragon-health-name' ).remove();
            }

            game.gameOverdiv.classList.remove( 'display' );
        },

        gameRestartLevel1: function () {
            location.reload();
        },

        gameRestartLevel2: function () {
            game.score = 0;
            game.audioBirdFlap.play();
            game.gameOverdiv.classList.add( 'display' );

        },

        /**
         * Creates Images of different dragons and animates their position within
         * a time interval
         *
         * @return {void}
         */
        newDragonEntry: function () {
            var timeInterval = 0,
                dragonEntryGreenImg = $( '.dragon-entry-green' ),
                dragonImgTags = '<img></img>';

            game.newDragonEntryInterval = setInterval( function () {
                timeInterval += 1;
                /**
                 * After 15 secs from the start of Level3 Game
                 */
                if ( timeInterval === 5 ){
                    dragonEntryGreenImg.fadeOut( 2000 );
                }
                if ( timeInterval === 10 ){
                    if( false === $( game.content ).children().hasClass( 'dragon-entry-brown') ){
                        dragonEntryGreenImg.remove();
                        $( dragonImgTags, {
                            src: 'images/dragon-entry-brown.png',
                            class: 'dragon-entry-brown'

                        } ).fadeIn( 1000 )
                            .delay( 2000 )
                            .prependTo( game.content )
                            .animate(
                                {
                                    'position': 'absolute',
                                    'bottom': '400px',
                                    'right': '1500px'
                                }, 9000
                            ).fadeOut( 5000 );
                        game.dragonImageEl = document.querySelector( '.dragon-entry-brown' );
                        game.dragonImageEl.addEventListener( 'click', game.dragonHitStronger );
                    }
                }
                if ( timeInterval === 21 ){
                    $( '.dragon-entry-brown' ).remove();
                    if( false === $( game.content ).children().hasClass( 'dragon-entry-dark-green' ) ){
                        $( dragonImgTags, {
                            src: 'images/dragon-entry-dark-green.gif',
                            class: 'dragon-entry-dark-green'

                        } ).fadeIn(1000)
                            .delay( 2000 )
                            .prependTo( game.content )
                            .animate(
                                {
                                    'position': 'absolute',
                                    'left': '-700px',
                                    'bottom': '1500px'
                                }, 7000
                            )
                            .fadeOut( 7000 );
                        game.dragonImageEl = document.querySelector( '.dragon-entry-dark-green' );
                        game.dragonImageEl.addEventListener( 'click', game.dragonHitStronger );
                    }
                }
                if( timeInterval === 32 ){
                    $( '.dragon-entry-dark-green' ).remove();
                    if( false === $( game.content ).children().hasClass( 'dragon-fire-left' ) ){
                        var dragFireLeftRightPos = window.outerWidth/2;
                        $( dragonImgTags, {
                            src: 'images/dragon-fire-left.gif',
                            class: 'dragon-fire-left'

                        } ).fadeIn( 1000 )
                            .prependTo( game.content )
                            .animate(
                                {
                                    'position': 'absolute',
                                    'top': 0,
                                    'right': dragFireLeftRightPos
                                }, 2000
                            )
                            .fadeOut( 5000 );
                        game.dragonImageEl = document.querySelector( '.dragon-fire-left' );
                        game.dragonImageEl.addEventListener( 'click', game.dragonHitVulnerable );
                    }
                }
                if( timeInterval === 40 ){
                    $( '.dragon-fire-left' ).remove();
                    if( false === $( game.content ).children().hasClass( 'dragon-fire-right' ) ){
                        var dragFireRightBotPos = window.outerHeight/5.6;
                        $( dragonImgTags, {
                            src: 'images/dragon-fire-right.gif',
                            class: 'dragon-fire-right'

                        } ).fadeIn( 1000 )
                            .prependTo( game.content )
                            .animate(
                                {
                                    'position': 'absolute',
                                    'bottom': dragFireRightBotPos,
                                    'right': 0
                                }, 2000
                            )
                            .fadeOut( 5000 );
                        game.dragonImageEl = document.querySelector( '.dragon-fire-right' );
                        game.dragonImageEl.addEventListener( 'click', game.dragonHitVulnerable );
                    }
                }
                if( timeInterval === 47 ){
                    $( '.dragon-fire-right' ).remove();
                    if( false === $( game.content ).children().hasClass( 'dragon-fire' ) ){
                        game.stopRain();
                        $( dragonImgTags, {
                            src: 'images/dragon-fire.gif',
                            class: 'dragon-fire'

                        } ).fadeIn( 1000 )
                            .prependTo( game.content )
                            .animate(
                                {
                                    'position': 'absolute',
                                    'top': '120px',
                                    'right': '200px'
                                }, 5000
                            )
                            .fadeOut( 4000 );
                        game.dragonImageEl = document.querySelector( '.dragon-fire' );
                        game.dragonImageEl.addEventListener( 'click', game.dragonHitVulnerable );
                    }
                }
                /**
                 * Dragon Red Vulnerable
                 */
                if( timeInterval === 55 ){
                    $( '.dragon-fire' ).remove();
                    if( false === $( game.content ).children().hasClass( 'dragon-final' ) ){
                        $( dragonImgTags, {
                            src: 'images/dragon-final.gif',
                            class: 'dragon-final'

                        } ).fadeIn( 1000 )
                            .prependTo( game.content )
                            .animate(
                                {
                                    'position': 'absolute',
                                    'bottom': '85px',
                                    'right': '180px'
                                }, 10000
                            )
                            .fadeOut( 9000 );

                        game.dragonImageEl = document.querySelector( '.dragon-final' );
                        game.dragonImageEl.addEventListener( 'click', game.dragonHitVulnerable );
                    }
                }
                if ( timeInterval > 80 ){
                    $( '.dragon-final' ).remove();
                    clearInterval( game.newDragonEntryInterval );
                }
            }, 1000 );
        },

        /**
         * Increases the value of the health progressbar and increases the size of
         * dragon image when img is clicked
         *
         * @param event
         * @return {void}
         */
        dragonHitStronger: function ( event ) {
            var w, r, imgW, imgR ;
            game.health = document.getElementById( "health" );
            game.gunShotAudio.play();
            game.health.value += 5;
            imgW = parseInt( window.getComputedStyle( event.target ).width );
            imgR = parseInt( window.getComputedStyle( event.target ).right );
            if( 820 > imgW ){
                w = imgW + 20;
                r = imgR - 20;
                event.target.style.width = w + 'px';
                event.target.style.right = r + 'px';
            }
        },

        /**
         * Decreases the value of the health progressbar and tha image
         * fades out and fades in .Plays gunshot
         *
         * @param event
         * @return {void}
         */
        dragonHitVulnerable: function ( event ) {
            game.gunShotAudio.play();
            if ( $( game.mainSection ).hasClass( 'advanced-mode' ) ){
                game.health.value -= 1;
            }else{
                game.health.value -= 2;
            }
            $( event.target ).fadeOut( 200 );
            $( event.target ).fadeIn( 100 );
        }
    };

    return game;

})( jQuery );

window.onload = function() {
        birdShootingGame.init();
};
