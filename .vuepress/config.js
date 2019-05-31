module.exports = {
  title: "Kyandy",
  description: "歩き出すんだ、自分の軌跡になるから、止まらない。",
  dest: "./_book/",
  plugins: ["@vuepress/back-to-top"],
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
      { text: "Blog", link: "https://www.yesterday17.cn/" },
      {
        text: "Melody Flag",
        link: "https://mmf.moe/"
      }
    ],
    sidebar: {
      "/": [
        {
          title: "前言",
          children: [
            ["/preface/", "写在前面：这是什么？"],
            ["/preface/kyandy", "0.1 序：水中キャンデイ"],
            ["/preface/video", "0.2 【数据删除】"]
          ]
        },
        {
          title: "1. 在一切开始之前",
          children: [
            ["/chapter-01/prepare", "1.1 准备工作"],
            ["/chapter-01/structure", "1.2 基本架构"],
            ["/chapter-01/yakusoku", "1.3 一些约定"]
          ]
        }
        // {
        //   title: "2. core 模块",
        //   children: [["", "2.1 简介"]]
        // }
      ]
    },
    displayAllHeaders: true,
    lastUpdated: "最后更新"
  },
  evergreen: true
};
