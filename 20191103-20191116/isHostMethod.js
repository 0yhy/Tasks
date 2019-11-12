function isHostMethod(object, property) {
  let type = typeof object[property];
  return type === "function" || (!!(type === "object" && object[property])) || type === "unknown";
}