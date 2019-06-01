const toc = [["", "Kyandy"], require("./preface/toc.js")];

function increase(n) {
  if (Number(n) < 9) return `0${Number(n) + 1}`;
  else return (Number(n) + 1).toString();
}

let number = "01";
while (true) {
  try {
    toc.push(require(`./chapter-${number}/toc.js`));
    number = increase(number);
  } catch (e) {
    break;
  }
}

module.exports = toc;
