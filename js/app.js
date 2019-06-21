
// create the lists of Cards
let typeOfCards = ["fa fa-google", "fa fa-twitter", "fa fa-reddit", "fa fa-snapchat","fa fa-facebook-square", "fa fa-apple",
    "fa fa-amazon","fa fa-instagram"];
typeOfCards = typeOfCards.concat(typeOfCards);


let temp_rem = [];
let total = 0;
let goal = 8;

let moves = document.querySelector('.moves');
let stars = document.querySelector('.stars');

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// count times
let min = 0;
let second = 1;

function showTimer() {
     let curTime = document.querySelector('.timer');
     curTime.textContent = (min < 10 ? "0" : "") + min + ":" + (second < 10 ? "0" : "") + second;
     second++;
     if (second === 60) {
         min++;
         second = 0;
     }
}

let startTimer = setInterval(showTimer, 1000);

// count total and stars
function countTotal(){
    total += 1;
    moves.textContent = total;
    if (total % 13 === 0 && stars.children.length >= 1) {
        stars.removeChild(stars.firstElementChild);
    }
    if (goal === 0){
        clearInterval(startTimer);
        let result = "";
        const sLength = stars.children.length;
        if (sLength === 0){
            result = 'You have no stars left.';
        }else if(sLength === 1){
            result = 'You have 1 star left.'
        }else if(sLength === 2){
            result = 'You have 2 stars left.'
        }else if(sLength === 3){
            result = 'You have 3 stars left.'
        }
        Swal.fire({
            title: 'Congratulations!',
            html:  'It takes you ' + min  + (min <= 1 ? ' min' : ' mins ') + ' and ' + (second - 1) + (second - 1 <= 1 ? ' sec.' : ' secs.') + '<br>' +
                result +
                '<br>Wanna play again?',
            type: 'success',
            allowEscapeKey: true,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sure!'
        }).then((result) => {
            if (result.value) {
                setTimeout(function () {window.location.reload()}, 300);
            }
            else{
                Swal.fire(
                    "Have a nice day!"
                )
            }
        })
    }
}

function respondToTheClick(p){
    // console.log(p.innerHTML);
    if (!p.classList.contains('match') && !p.classList.contains('current')){
        p.classList.toggle('open');
        p.classList.toggle('show');
        p.classList.toggle('current');
        if (temp_rem.length === 0) {
            temp_rem.push(p);
        } else {
            let k = temp_rem.pop();
            setTimeout(function () {k.classList.toggle('open')}, 500);
            setTimeout(function () {k.classList.toggle('show')}, 500);
            k.classList.toggle('current');
            if (p.innerHTML === k.innerHTML) {
                k.classList.add('match');
                p.classList.add('match');
                goal -= 1;

             }
            setTimeout(function () {p.classList.toggle('open')}, 500);
            setTimeout(function () {p.classList.toggle('show')}, 500);
            p.classList.toggle('current');
            setTimeout(function(){countTotal()}, 0);
        }

    }
}


let cards = document.querySelectorAll('.card');
typeOfCards = shuffle(typeOfCards);

for (let i = 0 ; i < cards.length ; i ++) {
    const card = cards[i];
    card.innerHTML = "<i class = \"" +  typeOfCards[i] + "\" ></i>";
    card.addEventListener('click', function(){
        respondToTheClick(card);
    });

}

// reload
const restart = document.querySelector('.restart');
restart.addEventListener('click', function () {
    window.location.reload();
});

