export default class Tile {
  constructor(tileElement) {
    if (!tileElement || !(tileElement instanceof HTMLElement)) {
      throw new Error("Valid tile element must be provided");
    }

    // Cache elements
    this.tileElement = tileElement;
    this.tileElementHeading = tileElement.querySelector(".tile__heading");
    this.tileValueElement = tileElement.querySelector(".tile__value");

    if (!this.tileValueElement) {
      throw new Error(`Tile value element not found in: ${tileElement.outerHTML}`);
    }
  }

  displayResult(result, timeout) {
  if (!this.tileValueElement) return;
  setTimeout(() => {
    this.tileElement.classList.add("tile_visible");
    this.tileValueElement.textContent = result;
  }, timeout);
}

hideResult(timeout) {
  setTimeout(() => {
    if (this.tileElement) {
      this.tileElement.classList.remove("tile_visible");
    }
    if (this.tileValueElement) {
      this.tileValueElement.textContent = "";
    }
  }, timeout);
}
}


// test restart ya reset pe tiles hide karna aur value ko blank kar dena
// wpmTile.displayResult(68, 200); 
// 200ms baad show hogi, value 68 hoga