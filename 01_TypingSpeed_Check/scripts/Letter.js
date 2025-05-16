export default class letter{
    constructor(letter){                                           // - Major use
        this.letter = letter; // a                                // - Display
        this.letterElement = this.getLetterTemplate(letter);     // - Styling (correct/incorrect)
        this.letterElement.textContent = letter;                // - Cursor management
    }

    getLetterTemplate() {
        const template = document.querySelector("#letter-template");
        if (!template) {
        throw new Error("Letter template not found in DOM!");
        }
    
        const content = template.content.querySelector(".letter");
        if (!content) {
        throw new Error(".letter element not found in template!");
    }
    
    return content.cloneNode(true);
    }

    getCursorTemplate() {
        return document.querySelector("#cursor-template").content.querySelector(".letter__cursor").cloneNode(true);
    }

    setCorrect(){
        this.letterElement.classList.add("letter_correct");
        this.letterElement.classList.remove("letter_incorrect");
    }

    setInCorrect(){
        this.letterElement.classList.remove("letter_correct");
        this.letterElement.classList.add("letter_incorrect");
    }

    isCorrect(){
        return this.letterElement.classList.contains("letter_correct");
    }

    addCursor(){
        const cursor = this.getCursorTemplate();
        this.letterElement.append(cursor);  // Current letter ke andar daalo
    }

    removeCursor(){
        this.letterElement.children[0].remove();  // Pehla child (cursor) hatao
    }

    setUntyped(){
        this.letterElement.classList.remove("letter_incorrect");
        this.letterElement.classList.remove("letter_correct");
    }
}



// Example:
// User types 'a' ➔ setCorrect() call ➔ Green color
// User types wrong letter ➔ setIncorrect() ➔ Red color
// Cursor moves ➔ removeCursor() + next letter pe addCursor()
// Backspace ➔ setUntyped() ➔ Reset styling