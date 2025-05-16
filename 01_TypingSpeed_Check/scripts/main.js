import Input from "./Input.js";
import Keyboard from "./Keyboard.js";
import Reset from "./Reset.js";
import Word from "./Word.js";
import Letter from "./Letter.js";
import Tile from "./Tile.js";

import {
  ValidInputKeys,
  textAreaInput,
  resetbutton,
  paragraphs,
  WpmTile,
  accuracyTile,
  TimeTile,
} from "./constants.js";

document.addEventListener("DOMContentLoaded" , ()=>{
  if (!WpmTile || !accuracyTile || !TimeTile) {
    throw new Error("One or more tile elements not found in DOM!");
  }

  const wpmTileObj = new Tile(WpmTile);
  const accuracyTileObj = new Tile(accuracyTile);
  const timeTileObj = new Tile(TimeTile);

  const keyboardObj = new Keyboard();
   const inputObj = new Input(
    keyboardObj,
    wpmTileObj,
    accuracyTileObj,
    timeTileObj
  )
  const resetObj = new Reset(resetbutton, inputObj);
});


// User "Hello World" type karta hai
// Input class har letter ko check karegi
// Keyboard har key press ko highlight karegi
// Tiles real-time WPM/Accuracy dikhayengi
// Reset dabate hi sab stats 0 ho jayenge