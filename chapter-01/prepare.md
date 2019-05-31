# 准备工作

这里我们不讨论基本的开发环境部署。事实上，我建议你直接去看 [Harbinger][harbinger-homepage] 的[对应篇目][harbinger-chapter-02]。这里我们只限定，那就是本文对应的 `ForestryMC` 的分支。

## 刻在 DNA 里的……

```bash
gradle setupDecompWorkspace -DsocksProxyHost=127.0.0.1 -DsocksProxyPort=1080
gradle idea -DsocksProxyHost=127.0.0.1 -DsocksProxyPort=1080
```

<black>不要什么都往 DNA 里刻啊 kora</black>

## 对应 commit

本文对应的 commit 为 [946e88c][forestry-commit]，之后更新的内容与本文无关（存在更新的可能性）。

[harbinger-homepage]: https://harbinger.covertdragon.team/
[harbinger-chapter-02]: https://harbinger.covertdragon.team/chapter-02/
[forestry-commit]: https://github.com/ForestryMC/ForestryMC/tree/946e88ced8cfdfaaa49cbf359c9ef615d8916109
