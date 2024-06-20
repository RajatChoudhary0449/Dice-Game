'use strict';
const btnroll = document.querySelector('.btn--roll')
const btnhold = document.querySelector('.btn--hold')
const btnnew = document.querySelector('.btn--new')
const p1 = document.querySelector('.player--0')
const p2 = document.querySelector('.player--1')
const dc = document.querySelector('.dice')
let dice = 3, turn = 0
let sc1 = 0, sc2 = 0, cur1 = 0, cur2 = 0
let firstmove = 1
dc.style.display = 'none'
const show = function () {
    document.querySelector('#score--0').textContent = sc1
    document.querySelector('#score--1').textContent = sc2
    document.querySelector('#current--0').textContent = cur1
    document.querySelector('#current--1').textContent = cur2
    document.querySelector('img').src = `dice-${dice}.png`;
    if (!turn) {
        p1.classList.add('player--active')
        p2.classList.remove('player--active')
    }
    else {
        p1.classList.remove('player--active')
        p2.classList.add('player--active')
    }
}
show()
function check() {
    if (sc1 >= 100) {
        sc1 = 100;
    }
    else if (sc2 >= 100) {
        sc2 = 100;
    }
    show()
    if (sc1 == 100 || sc2 == 100) {
        alert(`Congrats player${(sc1 == 100 ? '1' : '2')}! you had won the game.`)
        firstmove = 1
        dc.style.display = 'none'
    }
}
btnroll.addEventListener('click', function () {
    if (sc1 == 100 || sc2 == 100) return
    if (firstmove) {
        dc.style.display = 'block'
        firstmove = 0
    }
    dice = Math.trunc(Math.random() * 6) + 1
    if (dice == 1) {
        turn ? cur2 = 0 : cur1 = 0
        turn = turn ^ 1
    }
    else {
        turn ? cur2 += dice : cur1 += dice
    }
    check()
})
btnhold.addEventListener('click', function () {
    if (sc1 == 100 || sc2 == 100) return
    if (!turn) {
        sc1 += cur1
        cur1 = 0
        turn = 1
    }
    else {
        sc2 += cur2
        cur2 = 0
        turn = 0
    }
    check()
})
btnnew.addEventListener('click', function () {
    firstmove = 1
    dc.style.display = 'none'
    turn = cur1 = cur2 = sc1 = sc2 = 0
    dice = 3
    show()
})
