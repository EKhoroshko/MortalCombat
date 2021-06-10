document.addEventListener('DOMContentLoaded', function () {

    const $arena = document.querySelector('.arenas');
    const $formFight = document.querySelector('.control');

    const HIT = {
        head: 30,
        body: 25,
        foot: 20,
    };

    const ATTACK = ['head', 'body', 'foot'];

    const player1 = {
        player: 1,
        name: 'Scorpion',
        hp: 100,
        img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
        weapon: 'harpoon',
        attack: function () {
            console.log(this.name + ' ' + 'Fight...');
        },
        changeHp,
        elHP,
        renderHP,
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
        changeHp,
        elHP,
        renderHP,
    };

    function createElement(tag, className) {
        const $tag = document.createElement(tag);
        if (className) {
            $tag.classList.add(className);
        }
        return $tag;
    }

    function createPlayer(obj) {
        const $box = createElement('div', 'player' + obj.player);
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
        this.hp -= num;
        if (this.hp <= 0) {
            this.hp = 0;
        }
    }

    function elHP() {
        return document.querySelector('.player' + this.player + ' .life');
    }

    function renderHP() {
        this.elHP().style.width = this.hp + '%';
    }

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

    function createReloadButton() {
        const $wrapper = createElement('div', 'reloadWrap');
        const $btnReload = createElement('button', 'button');
        $btnReload.textContent = ' Restart';
        $wrapper.appendChild($btnReload);
        $btnReload.addEventListener('click', () => {
            window.location.reload();
        });
        return $wrapper;
    }

    function enemyAttack() {
        const hit = ATTACK[getRandom(3) - 1];
        const defence = ATTACK[getRandom(3) - 1];
        return {
            value: getRandom(HIT[hit]),
            hit,
            defence,
        };
    }

    $formFight.addEventListener('submit', function (e) {
        e.preventDefault();
        const enemy = enemyAttack();
        const attack = {};

        for (let item of $formFight) {
            if (item.checked && item.name === 'hit') {
                attack.value = getRandom(HIT[item.value]);
                attack.hit = item.value;
            }

            if (item.checked && item.name === 'defence') {
                attack.defence = item.value;
            }
            item.checked = false;
        }

        if (attack.hit !== enemy.defence) {
            player1.changeHp(attack.value);
            player1.renderHP();
        }
        if (enemy.hit !== attack.defence) {
            player2.changeHp(attack.value);
            player2.renderHP();
        }

       /* function checkTach(player1, player2) {
            if (player1.hit != player2.defence) {
                player2.changeHp();
                player2.renderHP();
            } else if (player1.defence != player2.hit) {
                player1.changeHp();
                player1.renderHP();
            }
        }

        //checkTach(player1, player2);
       // console.log(checkTach(player1, player2));*/

        if (player1.hp === 0 || player2.hp === 0) {
            $formFight.disabled = true;
            $arena.appendChild(createReloadButton());
        }

        if (player1.hp === 0 && player1.hp < player2.hp) {
            $arena.appendChild(playerWins(player2.name));
        } else if (player2.hp === 0 && player2.hp < player1.hp) {
            $arena.appendChild(playerWins(player1.name));
        } else if (player1.hp === 0 && player2.hp === 0) {
            $arena.appendChild(playerWins());
        }
    });
});

