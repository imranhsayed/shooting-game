<!doctype html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Bird Shooting Game!</title>
    <link href="https://fonts.googleapis.com/css?family=Bangers|Nosifer|Chewy" rel="stylesheet">
    <link rel="stylesheet"  href="style.css">
</head>
<body>
    <div class="audio-div display">
        <audio id="music-before-start" preload="" loop >
            <source src="sounds/background-music-level1.mp3" type="audio/mp3">
        </audio>
        <audio id="rain-falling" preload="" >
            <source src="sounds/rain-fall-background.mp3" type="audio/mp3">
        </audio>
        <audio id="background-music-level2" preload="" >
            <source src="sounds/background-music-level2.mp3" type="audio/mp3">
        </audio>
        <audio id="background-music-level3" preload="" >
            <source src="sounds/background-music-level3.mp3" type="audio/mp3">
        </audio>
        <audio id="gun-shot-audio" preload="" >
            <source src="sounds/gun-sound.mp3" type="audio/mp3">
        </audio>
        <audio id="bird-killed-sound" preload="" >
            <source src="sounds/bird-killed-sound.mp3" type="audio/mp3" >
        </audio>
        <audio id="bird-flapping" preload="" loop >
            <source src="sounds/bird-flapping.mp3" type="audio/mp3">
        </audio>
        <audio id="man-scream" preload="" >
            <source src="sounds/man-scream.mp3" type="audio/mp3">
        </audio>
        <audio id="thunderstorm-clip" preload="" >
            <source src="sounds/loud-thunder.mp3" type="audio/mp3">
        </audio>
        <audio id="angry-dragon" preload="" >
            <source src="sounds/angry-dragon.mp3" type="audio/mp3">
        </audio>
    </div>
    <div class="loading">
    <img src="images/loading.gif" alt="Game Loading. Please wait"  >
    </div>

    <section id="main-section" class="rain display beginner-mode">
        <div id="before-game-start" class="before-game-start">
            <div class="start-button">
                <p class="select-game-mode">Select the game mode and Start :</p>
                <p class="beginner">Beginner</p>
                <p class="advanced">Advanced</p>
                <button class="level1-start-button">
                    <span class="orb-game-start"><span>Start</span></span>
                </button>
            </div>
            <h1>Bird Shooting</h1>
            <div class="level1-instructions-right wrapper">
                <h1>Instructions</h1>
                <p>This game works at its best in portrait mode.</p>
                <p>So if you are using a mobile device or tablet
                   request you to please switch to landscape mode before start playing the game.</p>
                <p>Select the game mode/difficulty level and click/press Start .The game starts in beginner mode by default</p>
                <p>As the name says ,its a Bird Shooting Game </p>
                <p>So you need to shoot the birds to score points.</p>
                <p>Every level of the game has a preset target points</p>
                <p>You need to score the target Points in order to complete the level</p>
                <p>You can then move on to the next one.</p>
                <p>The game gets challenging as you progress from one level to another.</p>
                <p>You will encounter a Birdman during the level, if killed you will loose all the progress
                    in the game and you will need to restart the game</p>
                <p>You need to achieve the required score within the preset time each level has</p>
                <p>Look at the top of the screen when you start the Game </p>
                <p>It will tell you what is the target score for the level </p>
                <p>It will also tell you how much time is remaining to complete the Game.</p>
                <p>You will see some Tips between each level if you fail to complete it</p>
                <p>Ensure you go through those Tips.</p>
                <p>Some birds will be easy to shoot while the others will try to dodge you when you try to
                hit them.</p>


            </div>
            <div class="bird-game-start-gif">
                <img src="images/level2-bird-left.gif" alt="">
            </div>
            <div class="flying-birds-multiple"></div>
        </div>

        <main id="main-content" class="main-content">
            <header class="header ">
                <div class="time-remaining">
                    <p>Time Remaining</p>
                    <p class="time-left"></p>
                </div>
                <div class="score-div">
                    <p>Target Score</p>
                    <p class="target-score">0</p>
                    <p>Your Score</p>
                    <p class="score-box">0</p>
                </div>
            </header>
            <section class="content">
                <div class="left-bird-nest"></div>
                <div class="right-bird-nest"></div>
            </section>
            <footer class="footer"></footer>

        </main>
        <section id="credits" class='credits wrapper display'>
            <div class='movie'>Bird Shooting Game</div>
            <div class='job'>developed by</div>
            <div class='name'>Imran Sayed</div><br>
            <div class='job'>produced by</div>
            <div class='name'>Imran Sayed</div><br>
            <div class='job'>Code Reviewer</div>
            <div class='name'>Sayed Taqui</div>
            <div class='job'>CSS Reviewer and Editor</div>
            <div class='name'>Mahvash Fatima</div>
            <div class='job'>Story</div>
            <div class='name'>Imran Sayed</div>
            <div class='job'>Game Idea</div>
            <div class='name'>Mahvash Fatima</div>
            <div class='job'>Music</div>
            <div class='name'>Imran Sayed</div>
            <div class='job'>Background Images & Character Reviewer</div>
            <div class='name'>Mahvash Fatima</div>
            <div class='job'>Game Reviewers</div>
            <div class='name'>Faraz Sayed <br>&<br> Wamiq Sayed</div>
            <div class='job'>Game Player & Tester</div>
            <div class='name'>Zoya Sayed <br>&<br> Elma Sayed</div>
            <div class='job'>Contributors</div>
            <div class='name'>Sayed Taqui <br>&<br> Mahvash Fatima</div>
            <div class='job'>Blessed by</div>
            <div class='name'>Raees Fatima <br>&<br>  Abul Sayed</div>
            <div class='job'>From Game Cast & Crew</div>
            <div class='name'>Thank You for Playing</div>
            <div class='job'>For any questions you can contact me at : </div>
            <div class='name'>imran_2000_smart@yahoo.co.in</div>
        </section>
    </section>

    <div id="game-over" class="game-over display ">
        <p class="game-over-score">0</p>
        <button class="level2-start-button">
            <div class="orb-game-start"><span>Level2</span></div>
        </button>
        <button class="level3-start-button display">
            <div class="orb-game-start"><span>Level3</span></div>
        </button>
    </div>

    <div class="all-images display" >
        <img src="images/blood-splatter.jpg" alt="" class="">
        <img src="images/dark-castle.gif" alt="" class="">
        <img src="images/dragon-entry-brown.png" alt="" class="">
        <img src="images/dragon-entry-dark-green.gif" alt="" class="">
        <img src="images/dragon-entry-green.gif" alt="" class="">
        <img src="images/dragon-final.gif" alt="" class="">
        <img src="images/dragon-fire-left.gif" alt="" class="">
        <img src="images/dragon-fire-right.gif" alt="" class="">
        <img src="images/dragon-fire.gif" alt="" class="">
        <img src="images/dragon-sleeping.gif" alt="" class="">
        <img src="images/flying-birds-multi.gif" alt="" class="">
        <img src="images/game-start-background.jpg" alt="" class="">
        <img src="images/giphy-bird-left.gif" alt="" class="">
        <img src="images/giphy-bird-right.gif" alt="" class="">
        <img src="images/gun-aim.png" alt="" class="">
        <img src="images/landscape.gif" alt="" class="">
        <img src="images/level1-background.jpg" class="level1-background-img" alt="" >
        <img src="images/level2-bird-left.gif" alt="" class="">
        <img src="images/level2-bird-right.gif" alt="" class="">
        <img src="images/lightening-img.gif" alt="" class="lightening-background-img">
        <img src="images/man-flying.gif" alt="" class="">
        <img src="images/manshooting.png" alt="" class="">
        <img src="images/orb-game-start.gif-c200" alt="" class="">
    </div>

<script src="jquery.js"></script>
<script src="javascript.js"></script>
</body>
</html>
