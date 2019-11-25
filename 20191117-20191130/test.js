let book = {
  _year: 2004,
  edition: 1
};

Object.defineProperty(book, "year", {
  enumerable: true,
  get: function () {
    return this._year;
  },
  set: function (newYear) {
    if (newYear > 2004) {
      this._year = newYear;
      this.edition += newYear - 2004;
    }
  }
});

console.log(book);