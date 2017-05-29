<?php
/**
 * Created by PhpStorm.
 * User: ghafir
 * Date: 25/05/17
 * Time: 4:23 AM
 */
?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Bird Shooting Game!</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
<section class="rain">

    <div class="before-game-start">
        <div class="start-button">
            <button class="level1-start-button">Start the Game</button>
        </div>
        <h1>Bird Shooting Game</h1>

        <div class="bird-game-start-gif">
            <img src="images/many=birds-flying.gif" alt="">
        </div>
    </div>

    <div class="main-content ">
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
        <content class="content">
            <div class="left-bird-nest"></div>
            <div class="right-bird-nest"></div>
        </content>
        <footer class="footer"></footer>

    </div>
</section>

<div class="game-over display ">
    <p class="game-over-score">0</p>
    <button class="level2-start-button">Play Level Two</button>
    <button class="level3-start-button display">Play Level Three</button>
</div>

<div class="audio-div">
    <audio id="audio" >
        <source src="sounds/Gunsound.mp3" type="audio/mp3">
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
