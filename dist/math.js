"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rollDie = void 0;
function rollDie(faces, nb = 1) {
    let total = 0;
    for (let i = 0; i < nb; i++) {
        total += Math.floor(Math.random() * faces) + 1;
    }
    return total;
}
exports.rollDie = rollDie;
