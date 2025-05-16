export default class Reset {
  constructor(resetBtn, input) {
    this.resetBtn = resetBtn;
    this.Input = input;

    this.setEventListeners();
  }

  setEventListeners() {
    this.resetBtn.addEventListener("click", () => {
      this.reset();
      this.Input.reset();
    });
  }

  reset() {
    this.resetBtn.classList.add("reset_animation");
    this.resetBtn.addEventListener("animationend", this.animationEnd);
  }

  animationEnd = () => {
    this.resetBtn.classList.remove("reset_animation");
    this.resetBtn.removeEventListener("animationend", this.animationEnd);
  };
}


// User test restart karna chahta hai
// Reset button click karta hai
// Button spin karta hai
// Sab data reset ho jata hai
// Animation khatam hone pe button normal ho jata hai


