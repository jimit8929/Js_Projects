export default class Word{
    constructor(word){                  //constructor is use for initial setup
        this.word = word;
        this.wordElement = this.getWordTemplate();

        this.letterObjs = [];
    }

    getWordTemplate(){
        return document.querySelector("#word-template").content.querySelector(".word").cloneNode(true);
    }

    insertLetter(letter){
        this.letterObjs.push(letter);
        this.wordElement.append(letter.letterElement);
    }
}


// Scenario 1: User ne "hello" type kiya
// Word class "hello" ke sabhi letters ko ek saath manage karega
// Har letter ka state (correct/incorrect) track kar payega

// Scenario 2: User ne galati se "helo" type kiya
// word.letterObjs array se pata chal jayega 4th letter missing hai