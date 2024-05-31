import { initBoard } from "./scripts.js";

const canvas = document.querySelector('#canvas');

let boardWidth = 10;
let boardHeight = 20;


initBoard(canvas, boardHeight, boardWidth)

console.log('hello')