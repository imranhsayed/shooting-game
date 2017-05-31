/**
 * Created by ghafir on 29/05/17.
 */



var pBar = document.getElementById('p');
var updateProgress = function(value) {
    pBar.value = value;
    pBar.getElementsByTagName('span')[0].innerHTML = Math.floor((100 / 70) * value);

}

updateProgress(20);

var health = document.getElementById( "p" ),
    button = document.querySelector( 'button' );

button.addEventListener( 'click', killFunc );

function killFunc() {

    health.value -= 5;
}