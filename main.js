// task 0
const scorpion = {
    name: 'Scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: 'harpoon',
    attack: function () {
        console.log(scorpion.name +' ' + 'Fight...');
    }
};

const subzero = {
    name: 'Sub-Zero',
    hp: 75,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: 'suriken',
    attack: function () {
        console.log(subzero.name + ' ' + 'Fight...');
    }
};

// task 1 + 2

/*function createPlayer(player,name, hp) {
    const $arena = document.querySelector('.arenas');
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

function createPlayer(player, obj) {
    const $arena = document.querySelector('.arenas');
    const $box = document.createElement('div');
    $box.classList.add(player);
    const $progres = document.createElement('div');
    $progres.classList.add('progressbar');
    const $life = document.createElement('div');
    $life.classList.add('life');
    $life.style.width = `${obj.hp}%`;
    const $pname = document.createElement('div');
    $pname.classList.add('name');
    $pname.textContent = obj.name;
    const $char = document.createElement('div');
    $char.classList.add('character');
    const picter = document.createElement('img');
    picter.src = obj.img;
    $progres.append($life, $pname);
    $char.appendChild(picter);
    $box.append($progres, $char);
    $arena.appendChild($box);
}

createPlayer('player1', scorpion);
createPlayer('player2', subzero);


