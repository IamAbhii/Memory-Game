const board = document.querySelector('.deck');
const restart = document.querySelector('.restart');
const hideCards = document.querySelectorAll('.deck li')
let cardOneToMatch;
let cardTwoToMatch;
let selectingCard = true;
let clickCounter = 0;
let moveCounter = 0;
let cardMacthed = 0;
let allCards = document.querySelectorAll('li.card i');
let allNewCards = document.querySelectorAll('li.card')
let arrayOfNewCards = Array.from(allNewCards);
let arrayOfCards = Array.from(allCards);
let moves = document.querySelector('span');
let stars = document.querySelectorAll('.stars li i');
let starCounter = 4;

/*Function name: removeStars
  return: none
  input: none
  Description: This functions removes the star from display as movecounter increses. */

function removeStars() {
  if (moveCounter > 12 && starCounter > 3) {
    stars[0].style.display = 'none';
    starCounter--;
  }
  if (moveCounter > 20 && starCounter > 2) {
    stars[1].style.display = 'none';
    starCounter--;
  }
  if (moveCounter > 24 && starCounter > 1) {
    stars[2].style.display = 'none';
    starCounter--;
  }
}
/*Function name: resetStars
  return: none
  input: none
  Description: This function reset the stars as initial position */
function resetStars() {
  for (const star of stars) {
    star.style.display = 'inline-block';
  }
  starCounter = 4;
}
/*Function name: shrinkBoxSize
  return: none
  input: none
  Description: This function shrink the size of card after they matched */
function shrinkBoxSize() {
  cardOneToMatch.classList.remove('grow');
  cardTwoToMatch.classList.remove('grow');
}
/*Function name: shffle
  return: shffuled array
  input: array
  Description: THis function take input as arrya and shuffle it and returs it */
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
/*Function name: cardMatched
  return: none
  input: none
  Description: This function matches the card and if the matched make it grow in
  size and shrink it back to normal size.if all the card get matched it displays
  the winning alert message on screen. if card dont matches then it remove the
  class*/
function cardMatched() {
  if (cardOneToMatch.innerHTML === cardTwoToMatch.innerHTML) {
    cardOneToMatch.classList.add('match', 'grow');
    cardTwoToMatch.classList.add('match', 'grow');
    cardMacthed++;
    setTimeout(shrinkBoxSize, 40);
    console.log(cardMacthed);
    if (cardMacthed === (allCards.length / 2)) {
      swal({
        title: "Good job!",
        text: `You finished the game with ${moveCounter} moves with ${starCounter-1} star memory.`,
        icon: "success",
        button: "Ok",
      });
    }
  } else {
    cardOneToMatch.classList.remove('occupied', 'open', 'show');
    cardTwoToMatch.classList.remove('occupied', 'show', 'open');
  }
  clickCounter = 0;
}
/*Function name: reset
  return: none
  input: none
  Description: reseting everything to intial position */
function resetsEverything() {
  let shuffledCards = shuffle(arrayOfCards);
  for (const hideCard of hideCards) {
    hideCard.classList.remove('open', 'show', 'occupied', 'match');
  }
  for (let i = 0; i < allCards.length; i++) {
    arrayOfNewCards[i].appendChild(shuffledCards[i]);
  }
  cardMacthed = 0;
  clickCounter = 0;
  selectingCard = true;
  moveCounter = 0;
  moves.textContent = moveCounter;
}
/*Function name: restart
  return: none
  input: none
  Description: reseting of refresh button click. */
restart.addEventListener('click', function () {
  resetsEverything();
  resetStars();
})
/*Function name:board
  return: none
  input: none
  Description: taking clicks and excute it for matching card */
board.addEventListener('click', function (e) {
  if (selectingCard) {
    if (e.target.classList.contains('card') && !e.target.classList.contains('occupied') && (clickCounter < 2)) {
      e.target.classList.add('open', 'show', 'occupied', 'rotate');
      cardOneToMatch = e.target;
      selectingCard = !selectingCard
      clickCounter++;
    }
  } else {
    if (e.target.classList.contains('card') && !e.target.classList.contains('occupied') && (clickCounter < 2)) {
      e.target.classList.add('open', 'show', 'occupied', 'rotate');
      cardTwoToMatch = e.target;
      selectingCard = !selectingCard;
      clickCounter++;
      moveCounter++;
      setTimeout(cardMatched, 500);
    }
  }
  moves.textContent = moveCounter;
  removeStars();
})