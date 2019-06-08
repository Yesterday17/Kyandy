# 模组加载阶段与林业加载阶段

我们知道，模组的加载大致分为 6 个阶段<heimu>如果不知道去看 Harbinger 的[对应章节][harbinger-starting-class]！</heimu>。而林业为了其自身抽象考虑，又将这些阶段细分，最终形成了具有林业特色的加载阶段。

我们这里不介绍常规的加载阶段<heimu>不知道去看上面那个就是了</heimu>，只介绍林业的加载阶段以及其与常规加载阶段的对应。

[harbinger-starting-class]: https://harbinger.covertdragon.team/chapter-02/#%E5%85%A5%E5%8F%A3%E7%B1%BB

## 林业加载阶段表

下表列出了**林业的加载阶段**与其对应的功能：

<heimu title="草">// TODO: 好好翻译一下.jpg</heimu>

| 阶段             | 功能简介                                                                                     |
| ---------------- | -------------------------------------------------------------------------------------------- |
| SETUP            | setup API to make it functional. **GameMode Configs are not yet accessible**                 |
| SETUP_DISABLED   | 一些`fallback`内容，以防止游戏爆炸。                                                         |
| REGISTER         | 注册基本的物品和方块。                                                                       |
| PRE_INIT         | 注册 `handler`，`trigger`，`defination` 之类依赖上一阶段注册的基本物品(basic item)的东西。   |
| BACKPACKS_CRATES | 背包，板条箱。<heimu>面子真大（</heimu>                                                      |
| INIT             | 处理`recipe` 之类的基于`preInit`结果的东西。                                                 |
| POST_INIT        | stubborn mod integration, dungeon loot, and finalization of things that take input from mods |
| FINISHED         | 加载完成。                                                                                   |

## 林业加载阶段与常规加载阶段对应表

下表列出了**林业的加载阶段**与**常规加载阶段**之间的对应：

| 常规加载阶段(`Event`)          | 林业加载阶段                                      |
| ------------------------------ | ------------------------------------------------- |
| `FMLPreInitializationEvent`    | `SETUP`, `SETUP_DISABLED`, `REGISTER`, `PRE_INIT` |
| `RegistryEvent.Register<Item>` | `BACKPACKS_CRATES`                                |
| `FMLInitializationEvent`       | `INIT`                                            |
| `FMLPostInitializationEvent`   | `POST_INIT`                                       |
