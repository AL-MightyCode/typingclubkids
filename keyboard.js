// This file is the "brain" of our reusable keyboard component.

const keyboardLayout = [
    ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace'],
    ['tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
    ['capslock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'enter'],
    ['shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'shift'],
    ['ctrl', 'alt', ' ', 'alt', 'ctrl']
];

// This function builds the keyboard and adds it to the page.
function generateKeyboard() {
    const virtualKeyboard = document.getElementById('virtual-keyboard');
    if (!virtualKeyboard) return;

    virtualKeyboard.innerHTML = '';
    keyboardLayout.forEach(row => {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'keyboard-row';
        row.forEach(key => {
            const keyDiv = document.createElement('div');
            keyDiv.className = 'key';
            keyDiv.textContent = key.length > 1 && key !== ' ' ? key.charAt(0).toUpperCase() + key.slice(1) : key;
            keyDiv.dataset.key = key;
            rowDiv.appendChild(keyDiv);
        });
        virtualKeyboard.appendChild(rowDiv);
    });
}

// This function handles the green "hint" highlight.
function highlightKeyHint(nextChar, shiftMap = {}) {
    document.querySelectorAll('.key.hint').forEach(k => k.classList.remove('hint'));
    if (!nextChar) return;

    let keyToHighlight = nextChar.toLowerCase();

    if ((nextChar >= 'A' && nextChar <= 'Z') || shiftMap[nextChar]) {
        document.querySelectorAll('.key[data-key="shift"]').forEach(key => key.classList.add('hint'));
        if (shiftMap[nextChar]) {
            keyToHighlight = shiftMap[nextChar];
        }
    }

    const keyElement = document.querySelector(`.key[data-key="${keyToHighlight}"]`);
    if (keyElement) {
        keyElement.classList.add('hint');
    }
}

// This function handles the "press down" animation.
function animateKeyPress(key) {
    const keyElement = document.querySelector(`.key[data-key="${key.toLowerCase()}"]`);
    if (keyElement) {
        keyElement.classList.add('active');
        setTimeout(() => keyElement.classList.remove('active'), 100);
    }
}