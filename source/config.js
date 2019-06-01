const fs = require("fs");
const path = require("path");

const base = "./source/";

const children = [["", "关于源码"]];

function IsDirectory(dir, name) {
  return fs.statSync(path.resolve(base, dir, name)).isDirectory();
}

function IterateDir(dir = "") {
  const files = fs.readdirSync(path.resolve(base, dir));
  const ch = [];
  files.forEach(file => {
    if (IsDirectory(dir, file)) {
      ch.push(IterateDir(dir + file + "/"));
    } else if (file === "Readme.md") {
      return;
      // ch.unshift(dir, "About");
    } else if (path.extname(file) === ".md") {
      ch.push([
        dir + path.basename(file, ".md"),
        path.basename(file, ".md") + ".java"
      ]);
    }
  });
  return {
    title: dir === "" ? "ForestryMC" : dir,
    children: ch
  };
}

module.exports = [IterateDir()];
