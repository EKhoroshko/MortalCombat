import { createElement } from './utils/createMark.js';
class Player {
    constructor(props) {
        this.player = props.player;
        this.name = props.name;
        this.hp = props.hp;
        this.img = props.img;
        this.selector = `player${this.player}`;
        this.rootSelector = props.rootSelector;
    }

    elHP(){
        return document.querySelector(`.${this.selector} .life`);
    }

    changeHp(num){
        this.hp -= num;
        if (this.hp <= 0) {
            this.hp = 0;
        }
        return this.hp;
    }

    renderHP(){
       return (this.elHP().style.width = this.hp + '%');
    }

    createPlayer(){
    const $box = createElement('div', this.selector);
    const $progres = createElement('div', 'progressbar');
    const $life = createElement('div', 'life');
    const $pname = createElement('div', 'name');
    const $char = createElement('div', 'character');
    const picter = createElement('img');

    $life.style.width = this.hp + '%';
    $pname.textContent = this.name;
    picter.src = this.img;
    $progres.append($life, $pname);
    $char.appendChild(picter);
    $box.append($progres, $char);
        
    const $root = document.querySelector(`.${this.rootSelector}`);
    $root.appendChild($box);

    return $box;
}
}

export const player1 = new Player({
    player: 1,
    name: 'Scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    rootSelector: 'arenas',
    selector: 'div',
});

export const player2 = new Player({
    player: 2,
    name: 'Sub-Zero',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    rootSelector: 'arenas',
    selector: 'div',
});


export { Player};