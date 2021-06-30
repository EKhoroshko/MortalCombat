
const createReloadButton = () => {
    const $wrapper = createElement('div', 'reloadWrap');
    const $btnReload = createElement('button', 'button');
    $btnReload.textContent = ' Restart';
    $wrapper.appendChild($btnReload);
    $btnReload.addEventListener('click', () => {
        window.location.pathname = './index.html';
    });
    return $wrapper;
};

const createElement = (tag, className) => {
    const $tag = document.createElement(tag);
    if (className) {
        $tag.classList.add(className);
    }
    return $tag;
};

export { createElement, createReloadButton };