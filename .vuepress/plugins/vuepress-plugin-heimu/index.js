const path = require("path");

module.exports = (options, ctx) => {
  return {
    name: "heimu",
    enhanceAppFiles: [path.resolve(__dirname, "enhanceAppFile.js")]
  };
};
