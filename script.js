"use strict";

const PASSWORD_LENGTH = 260;
const DEFAULT_CHUNK_LENGTH = 12;
const DEFAULT_TEMPLATES = {
    char: {
        upperCase: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
        lowerCase: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
        numbers: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
        symbols: ['!', '@', '#', '$', '%', '^', '&', '*'],
    },
    color: ['red', 'blue', 'yellow', 'green', 'black', 'white', 'purple', 'gray'],
    figure: ['UP', 'DOWN', 'LEFT', 'RIGHT'],
};
const DEFAULT_REQUIREMENTS = {
    char: {
        upperCase: true,
        lowerCase: true,
        numbers: true,
        symbols: true,
    },
    color: true,
    figure: true,
}


class Character {
    constructor(char, color, figure) {
        this.char = char;
        this.color = color;
        this.figure = figure;
    }
}

class Template {
    constructor(requirements, templates) {
        for (const key in requirements) {
            //to enter the object
            if (typeof requirements[key] == 'object' && typeof templates[key] == 'object') {
                this[key] = [];
                for (const prop in requirements[key]) {
                    if (requirements[key][prop]) {
                        this[key] = this[key].concat(templates[key][prop]);
                    }
                }
                continue;
            }

            if (requirements[key]) {
                this[key] = templates[key];
            }
        }
    }
}


function getRandomChunk(template, chunkLength) {
    const chunk = [];
    console.log('generated');
    let {
        char,
        color,
        figure
    } = template;
    char = getShuffle(char);
    color = getShuffle(color);
    figure = getShuffle(figure);

    for (let i = 0; i < chunkLength; i++) {
        chunk.push(new Character(
            pullRandom(char),
            pullRandom(color),
            pullRandom(figure)
        ));
    }

    return isChunkCorrect(chunk, template) ? chunk : getRandomChunk(template, chunkLength);
}

function pullRandom(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function getShuffle(array) {
    const arr = array;
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * arr.length);
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

//checking char only    
function isChunkCorrect(chunk, requirements, templates) {
    for (const demand in requirements.char) {
        if (requirements.char[demand]) {
            if (isMet(chunk, templates.char[demand])) {
                continue;
            } else {
                return false;
            }
        }
    }
    return true;
}

function isMet(chunk, template) {
    for (const obj of chunk) {
        for (const char of template) {
            if (obj.char == char) {
                return true;
            }
        }
    }
    return false;
}