var simplifyPath = function (path) {
  const folders = getFolders(path);
  let normalizedPath = [];
  let ans = "";
  for (let folder of folders) {
    if (normalizedPath && folder === "..") {
      normalizedPath.pop();
    }
    else if (folder !== ".") {
      normalizedPath.push(folder);
    }
  }
  for (let folder of normalizedPath) {
    ans += "/";
    ans += folder;
  }
  return ans === "" ? "/" : ans;
};

var getFolders = function (path) {
  path += "/";
  let folders = [];
  currentFolder = "";
  let cur = 0;
  while (cur !== path.length) {
    if (path[cur] !== "/") {
      currentFolder += path[cur];
      ++cur;
    }
    else {
      while (path[cur] === "/") {
        ++cur;
      }
      if (currentFolder) {
        folders.push(currentFolder);
        currentFolder = "";
      }
    }
  }
  return folders;
};