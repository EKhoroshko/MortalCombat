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
    },
    changeHp: changeHp,
    elHP: elHP,
    renderHP: renderHP,
};

const player2 = {
    player: 2,
    name: 'Sub-Zero',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: 'suriken',
    attack: function () {
        console.log(this.name + ' ' + 'Fight...');
    },
    changeHp: changeHp,
    elHP: elHP,
    renderHP: renderHP,
};

const $arena = document.querySelector('.arenas');
const $btn = document.querySelector('.button');

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

    function changeHp(num) {
    if (this.hp > 0) {
        this.hp -= num;
    } else {
        this.hp = 0;
    }
    }

    function elHP() {
        return document.querySelector('.player' + this.player + ' .life');
    }

    function renderHP() { 
        this.elHP().style.width = this.hp + '%';
       
    }
    
    /*function changeHp(player) {
        const $playerlife = document.querySelector('.player'+ player.player +' .life');
        player.hp -= getRandom(20);
        $playerlife.style.width = player.hp + '%';
        if (player.hp <= 0) {
            player.hp = 0;
            $playerlife.style.width = 0;
        }  
    }*/

    function playerWins(name) {
        const $losemsg = createElement('div', 'loseTitle');
        if (name) {
            $losemsg.textContent = name + ' win';
        } else {
            $losemsg.textContent = 'drow';
        }
        return $losemsg;
    }

    function getRandom(num) {
        return Math.ceil(Math.random() * num);
    }

    $btn.addEventListener('click', function () {
        player1.changeHp(getRandom(20));
        player1.changeHp.call(player2, (getRandom(20)));
        player2.renderHP();
        player2.renderHP.call(player1);

        if (player1.hp === 0 || player2.hp === 0) {
            $btn.disabled = true;
            $arena.appendChild(createReloadButton());
        }

        if (player1.hp === 0 && player1.hp < player2.hp) {
            $arena.appendChild(playerWins(player2.name));        
        } else if (player2.hp === 0 && player2.hp < player1.hp) {
            $arena.appendChild(playerWins(player1.name));
        } else if (player1.hp === 0 && player2.hp === 0) {
            $arena.appendChild(playerWins());
        }

        document.querySelector('.reloadWrap .button').addEventListener('click', () => {
            window.location.reload();
        });
    });

    function createReloadButton() {
        const $wrapper = createElement('div', 'reloadWrap');
        const $btnReload = createElement('button', 'button');
        $btnReload.textContent = ' Restart';
        $wrapper.appendChild($btnReload);
        return $wrapper;
    }
});
