import { textAreaInput, textAreaText, getRandomParagraph, keys, ignoredKeys, punctuationOrSpace,} from "./constants.js";
import Word from "./Word.js";
import Letter from "./Letter.js";

export default class Input {
  constructor(keyboardObj, wpmObj, accuracyObj, timeObj) {
    this.textAreaInput = textAreaInput;       //hidden input field
    this.textAreaText = textAreaText;         //visible text area

    this.wordObjs = [];
    this.letterObjs = [];

    this.isRunning = false;
    this.isReset = true;
    this.time = null;

    this.currentLetterIndex = 0;

    this.correctKeysTyped = 0;
    this.keysTyped = 0;

    //keybooard
    this.Keyboard = keyboardObj;    //virtual keyboard handler

    // tiles
    this.Accuracy = accuracyObj;
    this.WPM = wpmObj;
    this.Time = timeObj;

    this.setEventListeners(); // set listeners
    this.populateText(); // loads paragraph
  }

  setEventListeners() {
    document.addEventListener("keydown", () => this.textAreaInput.focus());    //focus hidden input when key is pressed

    this.textAreaInput.addEventListener("keydown", (e) => {
      this.handleKeydown(e.key);  //pressed key
    });
  }

  reset() {
    this.hideResults();

    this.currentLetterIndex = 0;

    this.isRunning = false;
    this.isDisplayingResults = false;

    this.startTime = null;
    this.endTime = null;

    this.correctKeysTyped = 0;
    this.keysTyped = 0;

    this.wordObjs = [];
    this.letterObjs = [];

    this.textAreaText.innerHTML = "";
    this.populateText();   //default para loads again
  }

  start() {
    this.isRunning = true;
    this.isDisplayingResults = false;
    this.startTime = new Date();
  }

  stop() {
    this.isRunning = false;
    this.isDisplayingResults = true;
    this.endTime = new Date();
    this.showResults();
  }

  populateText() {
    let paragraph = getRandomParagraph();

    if (!paragraph || paragraph.length === 0) {
    console.error("No valid paragraph loaded");
    return;
    }
    
    let time = 0;

    paragraph.forEach((word) => {
      const wordObj = new Word(word);
      const letters = [...word, " "];   //joins space

      letters.forEach((letter) => {
        const letterObj = new Letter(letter);    //each letter's object
        wordObj.insertLetter(letterObj);      //add that to word
        this.letterObjs.push(letterObj);    
      });

      this.wordObjs.push(wordObj);      //add that whole word to global wordobjs

      setTimeout(() => {
        this.textAreaText.append(wordObj.wordElement);
      }, time);
      time += 25;   //each letter takes 25ms to appear when page loads
    });

    this.currentLetterObj = this.letterObjs[0];   //letter object's first letter
    this.currentLetterObj.addCursor();    //add cursor to that first letter
  }

  handleKeydown(key) {
    if (!this.isRunning && !this.isDisplayingResults) {
      this.start();
    }

    if (
      this.isRunning &&
      this.currentLetterIndex < this.letterObjs.length - 1
    ) {
      this.checkInput(key);
    }

    if (
      this.isRunning &&
      this.currentLetterIndex === this.letterObjs.length - 1
    ) {
      this.stop();
    }
  }

  checkInput(key) {
    // invalid key input
    if (ignoredKeys.includes(key)) return;

    // backspace input
    if (key === "Backspace") {
      this.setLastKey();   //go to last letter
      return;
    }

    this.keysTyped++;

    // valid key input
    if (key === this.currentLetterObj.letter) {
      this.currentLetterObj.setCorrect();
      this.Keyboard.triggerKey(true, key.toLowerCase());   //if correct key is pressed then triggerkey will show blue bg
      this.correctKeysTyped++;
    } else {
      this.currentLetterObj.setInCorrect();     //if incorrect is key then triggerkey will show red bg
      this.Keyboard.triggerKey(false, key.toLowerCase());
    }

    // move to next key
    this.setNextKey();
  }

  setNextKey() {
    this.currentLetterObj.removeCursor();
    this.currentLetterIndex++;
    this.currentLetterObj = this.letterObjs[this.currentLetterIndex]; // update letter
    this.currentLetterObj.addCursor();
  }

  setLastKey() {
    if (this.currentLetterIndex > 0) {
      this.currentLetterObj.removeCursor();
      this.currentLetterIndex--;
      this.currentLetterObj = this.letterObjs[this.currentLetterIndex];
      this.currentLetterObj.addCursor();
      this.currentLetterObj.setUntyped();
    }
  }

  calculateWPM() {
    let correctWords = 0;

    for (let i = 0; i < this.wordObjs.length; i++) {
      let typedCorrect = true;    //check each word
      let wordObj = this.wordObjs[i];
      let letterObjs = wordObj.letterObjs;

      for (let j = 0; j < letterObjs.length; j++) {
        let letterObj = letterObjs[j];  //check each letter
        let letter = letterObj.letter; // a b c

        if (!punctuationOrSpace.includes(letter) && !letterObj.isCorrect()) {
          typedCorrect = false;  //ignore space and punctuation
          break;
        }
      }

      correctWords += typedCorrect;
    }

    let timeTakenSeconds = this.calculateTimeTaken();
    let WPM = correctWords / (timeTakenSeconds / 60);
    let WPMrounded = Math.round(WPM);
    return WPMrounded;
  }

  calculateAccuracy() {
    let accuracyPercent = (this.correctKeysTyped / this.keysTyped) * 100;
    let accuracyRounded = Math.round(accuracyPercent);
    let accuracyFormatted = accuracyRounded + "%";
    return accuracyFormatted;
  }

  calculateTimeTaken() {
    return (this.endTime - this.startTime) / 1000;  //1sec
  }

  showResults() {
    let WPM = this.calculateWPM();
    let accuracy = this.calculateAccuracy();
    let time = Math.round(this.calculateTimeTaken(), 1) + "s";

    this.WPM.displayResult(WPM, 0);
    this.Accuracy.displayResult(accuracy, 50);   // 0 50 100 are delays
    this.Time.displayResult(time, 100);         // after that time the results will be displayed
  }

  hideResults() {
    this.WPM.hideResult(100);
    this.Accuracy.hideResult(50);
    this.Time.hideResult(0);
  }
}