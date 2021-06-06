document.addEventListener('DOMContentLoaded', function () {
    
// task 0
const player1 = {
    player: 1,
    name: 'Scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: 'harpoon',
    attack: function () {
        console.log(this.name +' ' + 'Fight...');
    }
};

const player2 = {
    player: 2,
    name: 'Sub-Zero',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: 'suriken',
    attack: function () {
        console.log(this.name + ' ' + 'Fight...');
    }
};

// task 1 + 2
const $arena = document.querySelector('.arenas');
const $btn = document.querySelector('.button');
/*function createPlayer(player,name, hp) {
    const $box = document.createElement('div');
        $box.classList.add(player);
    const $progres = document.createElement('div');
        $progres.classList.add('progressbar');
    const $life = document.createElement('div');
        $life.classList.add('life');
        $life.style.width = `${ hp }%`;
    const $pname = document.createElement('div');
        $pname.classList.add('name');
        $pname.textContent = name;
    const $char = document.createElement('div');
        $char.classList.add('character');
    const picter = document.createElement('img');
        picter.src = 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif';
    $progres.append($life, $pname);
    $char.appendChild(picter);
    $box.append($progres, $char);
    $arena.appendChild($box);
}

createPlayer('player1', 'SCORPION', 50);
createPlayer('player2', 'SUB-ZERO', 80);*/

// task 3

function createElement(tag, className) {
    const $tag = document.createElement(tag);
    if (className) {
        $tag.classList.add(className);
    }
    return $tag;
}

function createPlayer(obj) {
    const $box = createElement('div', 'player'+obj.player);
    const $progres = createElement('div', 'progressbar');
    const $life = createElement('div', 'life');
    const $pname = createElement('div', 'name');
    const $char = createElement('div', 'character');
    const picter = createElement('img');
    
    $life.style.width = `${obj.hp}%`;
    $pname.textContent = obj.name;
    picter.src = obj.img;
    $progres.append($life, $pname);
    $char.appendChild(picter);
    $box.append($progres, $char);
    return $box;
}

$arena.appendChild(createPlayer(player1));
$arena.appendChild(createPlayer(player2));

    function changeHp(player) {
        const $playerlife = document.querySelector('.player'+ player.player +' .life');
        player.hp -= Math.ceil(Math.random()*20);
        $playerlife.style.width = player.hp + '%';
        if (player.hp <= 0) {
            $playerlife.style.width = 0;
             $arena.appendChild(playerWin(player.name));
            $btn.disabled = true;
        }  
    }

    function playerWin(name) {
        const $winnermsg = createElement('div', 'loseTitle');
        $winnermsg.textContent = name + ' lose';
        return $winnermsg;
    }

$btn.addEventListener('click', function () {
    changeHp(player1);
    changeHp(player2);
});

});
