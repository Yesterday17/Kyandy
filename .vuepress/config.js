module.exports = {
  title: "Kyandy",
  description: "歩き出すんだ、自分の軌跡になるから、止まらない。",
  dest: "./_book/",
  extraWatchFiles: [
    "./book/config.js",
    "./source/config.js",
    "./book/*/toc.js"
  ],
  plugins: [
    "@vuepress/back-to-top",
    "smooth-scroll",
    [
      "@vuepress/pwa",
      {
        serviceWorker: true,
        updatePopup: {
          message: "发现新内容可用！",
          buttonText: "刷新"
        }
      }
    ],
    require("./plugins/vuepress-plugin-heimu/index.js"),
    require("./plugins/vuepress-plugin-codeblock/src/index.js")
  ],
  theme: "kyandy",
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    repo: "Yesterday17/Kyandy",
    repoLabel: "GitHub",
    editLinks: true,
    editLinkText: "来帮忙吗？",
    nav: [
      { text: "正文", link: "/book/" },
      { text: "源码", link: "/source/" },
      { text: "Harbinger", link: "https://harbinger.covertdragon.team/" },
      { text: "Blog", link: "https://www.yesterday17.cn/" },
      { text: "MMF", link: "https://mmf.moe/" }
    ],
    sidebar: {
      "/source/": require("../source/config"),
      "/book/": require("../book/config")
    },
    // displayAllHeaders: true,
    lastUpdated: "最后更新"
  },
  evergreen: true
};
