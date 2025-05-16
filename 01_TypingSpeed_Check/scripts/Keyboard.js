import {keys} from "./constants.js";
import Key from "./Keys.js";

export default class Keyboard{
    constructor(){
        this.keyobjs = {};      // Empty object (key: "a", value: Key instance)
        this.createKeys();
    }

    createKeys(){
        Array.from(keys).forEach((key)=>{
            const keyText = key.querySelector(".key__text").textContent.trim();  //'a' wii be same as 'a '
            this.keyobjs[keyText] = new Key(key);
        });
    }


    triggerKey(correctKey , key){
        if(key === "") key = "space";
        if (!this.keyobjs[key]) return;

        this.keyobjs[key].triggerKey(correctKey , key);
    }
}


// User ne "K" press kiya
// triggerKey(true, "k") call hoga
// keyobjs["k"] ka triggerKey() method chalega
// Virtual keyboard pe "K" highlight hogi