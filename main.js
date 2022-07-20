let randomNumbers = [];
let amountCard = 16;
let cardValue =[];
let openReplay = 0;
const minute = document.querySelector('.timer');
let timer = setInterval(timerOneSecond, 1000);
const amountForm = document.querySelector('.amount-form');
const btnReplay = document.querySelector('.btn-replay');

function createRandomNumbers() {
    randomNumbers = [];
    let numbers = [];

    for(let i = 1; i <= (amountCard / 2); ++i) {
        numbers.push(i);
        numbers.push(i);
    }

    randomNumbers.push(...numbers.sort(() => Math.random() -0.5));
}

function createCard(text) {
    const cardList = document.querySelector('.card-list');
    const card = document.createElement('button');
    const descr = document.createElement('p');
    card.classList.add('card');
    descr.classList.add('descr');
    descr.textContent = `${text}`;
    card.append(descr);

    card.addEventListener('click', function() {
        const cardOne = document.querySelector('.card-one');
        const descrOne = document.querySelector('.descr-one'); 
        descr.style.visibility = 'visible';
        card.style.backgroundColor = 'white';
        card.setAttribute('disabled', 'disabled');
        cardValue.push(text);

        if(cardValue.length === 1) {
            card.classList.add('card-one');
            descr.classList.add('descr-one')
            ++openReplay
        }

        if(cardValue.length === 2 && cardValue[0] !== cardValue[1]){
            cardList.style.pointerEvents = 'none';

            function cardVisibility() {
            descrOne.style.visibility = 'hidden';
            descr.style.visibility = 'hidden';
            cardOne.style.backgroundColor = 'royalblue';
            card.style.backgroundColor = 'royalblue';
            card.removeAttribute('disabled', 'disabled');
            cardOne.removeAttribute('disabled', 'disabled');
            cardValue.splice(0,2);
            descrOne.classList.remove('descr-one');
            cardOne.classList.remove('card-one');
            --openReplay
            cardList.style.pointerEvents = 'auto';
            }

            setTimeout(cardVisibility, 800);
        } 
        
        if(cardValue.length === 2 && cardValue[0] === cardValue[1]) {
            cardValue.splice(0,2);
            cardOne.classList.remove('card-one');
            descrOne.classList.remove('descr-one');
            card.setAttribute('disabled', 'disabled');
            ++openReplay
            if(openReplay === amountCard){
                btnReplay.style.visibility = 'visible'
                minute.style.visibility = 'hidden'
                clearInterval(timer);
            }
        }
    })

    cardList.append(card);

    return card;
}

function addCard() {
    randomNumbers.map((element) => {createCard(element)});
}

function replay() {
    const cardList = document.querySelector('.card-list');
    cardList.innerHTML = "";
    cardValue = [];
    openReplay = 0;
    minute.innerHTML = ('60');
    
}

function timerOneSecond() {
    const time = parseInt(minute.textContent);
    minute.textContent = time - 1;
    if(time <= 1) {
        clearInterval(timer);
        replay();
        btnReplay.style.visibility = 'visible'
        minute.style.visibility = 'hidden'
    }
}



amountForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const choiceCard = document.querySelector('.choice-card')
    amountCard = parseInt(choiceCard.value);
    if(amountCard > 4 && amountCard <= 20 && amountCard % 2 === 0){
        replay();
        minute.style.visibility = 'visible'
        clearInterval(timer);
        timer = setInterval(timerOneSecond, 1000);
        createRandomNumbers();
        addCard();
        timer;
        btnReplay.style.visibility = 'hidden'
    } else {
        replay();
        minute.style.visibility = 'visible'
        clearInterval(timer);
        timer = setInterval(timerOneSecond, 1000);
        amountCard = 4;
        createRandomNumbers();
        addCard();
        timer;
        btnReplay.style.visibility = 'hidden'
    }
})

btnReplay.addEventListener('click', function() {
    minute.style.visibility = 'visible'
    clearInterval(timer);
    timer = setInterval(timerOneSecond, 1000);
    replay();
    createRandomNumbers();
    addCard();
    timer;
    btnReplay.style.visibility = 'hidden'
})

document.addEventListener('DOMContentLoaded', function(){
    createRandomNumbers();
    addCard();
    timer;
})