const path = require("path");
const fs = require("fs");
const container = require("markdown-it-container");
const highlight = require("./highlight");

const comment = /^(?:md |markdown )?comment(?:\{(\d+)(?:-(\d+))?\})$/;

module.exports = (options, ctx) => {
  return {
    name: "codeblock",
    enhanceAppFiles: [path.resolve(__dirname, "enhanceAppFile.js")],
    extendMarkdown(md) {
      md.use(container, "codeblock", {
        render(tokens, idx) {
          const { nesting, info } = tokens[idx];
          if (nesting === -1) {
            return `</CodeBlock>`;
          }

          const infos = info.split(" ");
          let language = infos[1] | "";
          let file = infos[2] | "";

          let html = "";
          let link = "";
          let commentMD = new Map();
          let config;

          for (let index = idx; index < tokens.length; index++) {
            const { info, type, map, content, src } = tokens[index];
            if (type === "container_codeblock_open") continue;
            else if (type === "container_codeblock_close") break;
            else if (type === "fence") {
              if (info === "json config" || info === "config") {
                // override global config
                try {
                  config = JSON.parse(content);
                  if (config.file) {
                    file = config.file;
                  }
                  if (config.link) {
                    link = config.link;
                  }
                  // TODO:
                } catch (e) {
                  console.error(e);
                }
              } else if (comment.test(info)) {
                // source comment
                const result = info.match(comment);
                if (result[2]) {
                  commentMD.set(result[2] - 1, content);
                } else if (result[1]) {
                  commentMD.set(result[1] - 1, content);
                } else {
                  commentMD.set(0, content);
                }
              } else {
                // source code
                language = info.trim();
                if (src) {
                  html = fs.readFileSync(src, {
                    encoding: "utf-8"
                  });
                } else {
                  html = content;
                }
              }
            } else {
              console.log(`Unsupported markdown type: ${type}`);
            }
          }

          let result = highlight(html, language);

          const lines = result.split("\n");

          for (let co of commentMD) {
            // TODO: append, not add
            lines[co[0]] += `</code><div class="cb-comment">${
              co[1]
            }</div><code>`;
          }

          return `<CodeBlock file="${file}" link=${link}>
                    <template slot="code">
                        <pre v-pre class="language-${language}"><code>${lines.join(
            "\n"
          )}</code></pre>
                    </template>
          `;
        }
      });
    }
  };
};

function render(tokens, idx) {}
