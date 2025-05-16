export default class key{
    constructor(keyElement){             //Key press hone par visual feedback dena (sahi/galat dikhana)
        this.keyElement = keyElement;
        this.keyLetter = keyElement.querySelector(".key__text").textContent;   // letter store thase a,b,c---z
    }

    triggerKey(correctKey , key){
        if(correctKey){
            this.keyElement.classList.add("key_correct");
            setTimeout(()=> this.keyElement.classList.remove("key_correct"), 100);
        }
        else{
            this.keyElement.classList.add("key_incorrect");
            setTimeout(()=> this.keyElement.classList.remove("key_incorrect") , 100);
        }
    }
}


// User ne "T" press kiya
// Actual expected key "R" tha
// triggerKey(false, "T") call hoga
// "T" key blue ho jayegi 0.1 sec ke liye