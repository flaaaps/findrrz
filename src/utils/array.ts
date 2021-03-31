/* eslint-disable no-extend-native */
export {}

declare global {
    interface Array<T> {
        shuffle(): Array<T>;
    }
}

Array.prototype.shuffle = function() {
    let currentIndex = this.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = this[currentIndex];
    this[currentIndex] = this[randomIndex];
    this[randomIndex] = temporaryValue;
  }

  return this;
}

