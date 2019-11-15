var isValid = function (s) {
  let myStack = [];
  let brackets = {
    "}": "{",
    ")": "(",
    "]": "["
  }
  for (let c of s) {
    if (c === "(" || c === "[" || c === "{") {
      myStack.push(c);
    }
    if (c === ")" || c === "]" || c === "}") {
      if (brackets[c] !== myStack.pop()) {
        return false;
      }
    }
  }
  return !myStack.length;
};