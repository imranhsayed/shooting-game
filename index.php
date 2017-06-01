<!doctype html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Bird Shooting Game!</title>
    <link href="https://fonts.googleapis.com/css?family=Rock+Salt" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <section id="main-section" class="rain">

        <div id="before-game-start" class="before-game-start">
            <div class="start-button">
                <button class="level1-start-button">
                    <div class="orb-game-start"><span>Start</span></div>
                </button>
            </div>
            <h1>Bird Shooting</h1>
            <div class="level1-instructions-right wrapper">
                <h1>Instructions</h1>
                <p>As the name says ,its a Bird Shooting Game </p>
                <p>So you need to shoot the birds to score points.</p>
                <p>Every level of the game has a preset target points</p>
                <p>You need to score the target Points in order to complete the level</p>
                <p>You can then move on to the next one.</p>
                <p>The game gets challenging as you progress from one level to another.</p>

                <p>You need to achieve the required score within the preset time each level has</p>
                <p>Look at the top of the screen when you start the Game </p>
                <p>It will tell you what is the target score for the level </p>
                <p>It will also tell you how much time is remaining to complete the Game.</p>
                <p>You will see some Tips between each level if you fail to complete it</p>
                <p>Ensure you go through those Tips.</p>

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
            <div class='name'>Ghafir Sayed</div><br>
            <div class='job'>produced by</div>
            <div class='name'>Ghafir Sayed</div><br>
            <div class='job'>Code Reviewer</div>
            <div class='name'>Sayed Taqui</div>
            <div class='job'>CSS Reviewer and Editor</div>
            <div class='name'>Mahvash Fatima</div>
            <div class='job'>Story</div>
            <div class='name'>Ghafir Sayed</div>
            <div class='job'>Game Idea</div>
            <div class='name'>Mahvash Fatima</div>
            <div class='job'>Music</div>
            <div class='name'>Ghafir Sayed</div>
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

    <div class="audio-div">
        <audio id="gun-shot-audio" >
            <source src="sounds/Gunsound.mp3" type="audio/mp3">
        </audio>
        <audio id="bird-killed-sound">
            <source src="sounds/bird-killed-sound.mp3" type="audio/mp3">
        </audio>
        <audio id="bird-flapping">
            <source src="sounds/bird-flapping.mp3" type="audio/mp3">
        </audio>
        <audio id="rain-falling">
            <source src="sounds/Rain-fall-background.mp3" type="audio/mp3">
        </audio>
        <audio id="music-before-start">
            <source src="sounds/Music-before-game-start.mp3" type="audio/mp3">
        </audio>
        <audio id="man-scream">
            <source src="sounds/man-scream.mp3" type="audio/mp3">
        </audio>
        <audio id="background-music-level2">
            <source src="sounds/background-music-level2.mp3" type="audio/mp3">
        </audio>
        <audio id="background-music-level3">
            <source src="sounds/background-music-level3.mp3" type="audio/mp3">
        </audio>
        <audio id="thunderstorm-clip">
            <source src="sounds/loud-thunder.mp3" type="audio/mp3">
        </audio>
        <audio id="angry-dragon">
            <source src="sounds/angry-dragon.mp3" type="audio/mp3">
        </audio>
    </div>

<script src="jquery.js"></script>
<script src="javascript.js"></script>
</body>
</html>
