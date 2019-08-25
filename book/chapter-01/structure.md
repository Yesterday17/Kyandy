# 基本架构

想要了解任何一个项目，首要的任务就是了解这个项目的架构。而对于林业的架构，其实初看目录结构就能很清晰地分辨出来：

## 目录结构

ForestryMC 的目录结构如下所示：

```
forestry
   ├─api
   │  ├─apiculture
   │  ├─arboriculture
   │  ├─book
   │  ├─circuits
   │  ├─climate
   │  ├─core
   │  ├─farming
   │  ├─food
   │  ├─fuels
   │  ├─genetics
   │  ├─gui
   │  ├─lepidopterology
   │  ├─mail
   │  ├─modules
   │  ├─multiblock
   │  ├─recipes
   │  ├─storage
   │  └─world
   ├─apiculture
   ├─arboriculture
   ├─book
   ├─climatology
   ├─core
   ├─cultivation
   ├─database
   ├─energy
   ├─factory
   ├─farming
   ├─food
   ├─greenhouse
   ├─lepidopterology
   ├─mail
   ├─modules
   ├─plugins
   ├─sorting
   ├─storage
   └─worktable
```

## Module? Plugin?

从上面的目录结构来看，你可以看到同时存在的 `module` 和 `plugin`。那么这两者的关系究竟是什么呢? <black title="kora!">ならば、答えは一つ——</black>

其实某种意义上来说这个答案很讨巧。他们二者是既平级又有上下级的关系。具体体现在哪儿呢? 我们首先来看 [ForestryModules][forestry-modules-forestrymodules-java]：

```java {3}
public class ForestryModules implements IModuleContainer {
	private static final String MODULE_CONFIG_FILE_NAME = "modules.cfg";
	private static final String CONFIG_CATEGORY = "modules";
	private static Configuration config;
```

再来比较 [ForestryCompatPlugins][forestry-plugins-forestrycompactplugins-java]：

```java {3}
public class ForestryCompatPlugins implements IModuleContainer {
	private static final String MODULE_CONFIG_FILE_NAME = "modules.cfg";
	private static final String CONFIG_CATEGORY = "modules.plugins";
	public static final String ID = "forestry_compat";
```

为什么说它们是平级呢? 首先，它们都实现了 `IModuleContainer` 接口，并且它们对应的配置文件都是 `module.cfg`；而层级关系，则是出现在了上述代码中各自高亮的那一行——第三行。从第二行我们可以看出，二者是共用一个配置文件的，而从配置文件的层级来看，无疑是 `Module` 的层级更高。

```properties {10, 83}
# Configuration file

##########################################################################################################
# modules
#--------------------------------------------------------------------------------------------------------#
# Disabling these modules can greatly change how the mod functions.
# Your mileage may vary, please report any issues.
##########################################################################################################

modules {
    # Adds bees, beekeeping and bee products. Affects world generation.
    # Dependencies: [ forestry:core ]
    B:apiculture=true

    # Adds additional tree species and products.
    # Dependencies: [ forestry:core ]
    B:arboriculture=true

    # Adds backpacks.
    # Dependencies: [ forestry:core ]
    B:backpacks=true

    # Adds a guide book that contains information about all other modules.
    # Dependencies: [ forestry:core ]
    B:book=true

    # Adds wood piles, loam and a charcoal production.
    # Dependencies: [ forestry:core ]
    B:charcoal=true

    # Adds a greenhouse multiblock.
    # Dependencies: [ forestry:core ]
    B:climatology=true

    # Adds crates.
    # Dependencies: [ forestry:core ]
    B:crates=true

    # Adds automatic farms for a wide variety of products.
    # Dependencies: [ forestry:core, forestry:farming ]
    B:cultivation=true

    # Adds a new storage block for bees / trees and butterflies.
    # Dependencies: [ forestry:core ]
    B:database=true

    # Adds several RF engines.
    # Dependencies: [ forestry:core ]
    B:energy=true

    # Adds a wide variety of machines to craft, produce and process products.
    # Dependencies: [ forestry:core ]
    B:factory=true

    # Adds automatic multiblock farm for a wide variety of products.
    # Dependencies: [ forestry:core ]
    B:farming=true

    # Adds food.
    # Dependencies: [ forestry:core ]
    B:food=true

    # Adds a greenhouse multiblock.
    # Dependencies: [ forestry:core ]
    B:greenhouse=true

    # Butterflies. Shiny.
    # Dependencies: [ forestry:arboriculture, forestry:core ]
    B:lepidopterology=true

    # Adds Forestry's mail and trade system.
    # Dependencies: [ forestry:core ]
    B:mail=true

    # Adds a filter for sorting items with genetic material
    # Dependencies: [ forestry:core ]
    B:sorting=true

    # Adds a crafting table that can save 8 recipes.
    # Dependencies: [ forestry:core ]
    B:worktable=true

    plugins {
        # Compatibility module for Actually Additions.
        # Dependencies: [ forestry:core ]
        B:actuallyadditions=true

        # Compatibility module for Better With Mods. Enables farming hemp.
        # Dependencies: [ forestry:core ]
        B:betterwithmods=true

        # Compatibility module for Biomes O Plenty. Enables farming BoP saplings.
        # Dependencies: [ forestry:core ]
        B:biomes.o.plenty=true

        # Compatibility module for BuildCraft. Currently version 7.99.
        # Dependencies: [ forestry:core ]
        B:buildcraft.fuels=true

        # Compatibility module for BuildCraft. Currently version 7.99.
        # Dependencies: [ forestry:core ]
        B:buildcraft.recipes=true

        # Compatibility module for BuildCraft. Currently version 7.99.
        # Dependencies: [ forestry:core ]
        B:buildcraft.statements=true

        # Compatibility module for BuildCraft. Currently version 7.99.
        # Dependencies: [ forestry:core ]
        B:buildcraft.transport=true

        # Compatibility module for EnderIO.
        # Dependencies: [ forestry:core ]
        B:ender.io=true

        # Compatibility module for Extra Utilities. Enables farming ender lilies and red orchid.
        # Dependencies: [ forestry:farming ]
        B:extra.utilities=true

        # Compatibility module for HarvestCraft. Enables farming HarvestCraft plants and trees.
        # Dependencies: [ forestry:core ]
        B:harvestcraft=true

        # Compatibility module for Immersive Engineering.
        # Dependencies: [ forestry:core ]
        B:immersiveengineering=true

        # Compatibility module for IC2. Adds electrical engine and generator for power conversion.
        # Dependencies: [ forestry:farming, forestry:factory, forestry:core ]
        B:industrialcraft2=true

        # Compatibility module for Mystical Agriculture. Enables farming Mystical Agriculture crops.
        # Dependencies: [ forestry:core ]
        B:mysticalagriculture=true

        # Compatibility module for Natura. Enables farming Natura saplings.
        # Dependencies: [ forestry:core ]
        B:natura=true

        # Compatibility module for Roots.
        # Dependencies: [ forestry:core ]
        B:roots=true

        # Compatibility module for Rustic.
        # Dependencies: [ forestry:core ]
        B:rustic=true

        # Compatibility module for Tech reborn. Enables harvesting rubber from rubber trees.
        # Dependencies: [ forestry:core ]
        B:techreborn=true
    }

}
```

而从事实上来看，这样的设计也是有道理的。`Plugin` 和 `Module` 的结构类似，但最大的不同在于 `Plugin` 其实很大程度上是**依赖** `Module` 的。

`ForestryMC` 有哪些 `Plugin` 呢? 从[这篇专栏][this-bilibili-cv]中可以了解一些<black>虽然有些信息不完整/过时了</black>。林业的 `Plugin` 其实就是**主动向其他 `Mod` 兼容**的一个手段。

::: warning
**以下是私货。**

我个人不喜欢这样的设计。

我之前是这么考虑的，不应该是别的 `Mod` 来兼容林业吗? 直到后来我看到了对 `TechReborn` 兼容的 `Plugin`。于是我明白了存在即合理。对于两个体量对等的 `Mod` 而言，究竟应该谁去兼容谁呢?

说句实话，我不知道。

作为理想主义者的我希望是存在一个专门的 `Adapter`。

我甚至在想是不是能有一个转门的 `Mod` 负责作为所有 `Mod` 之间的桥梁，而其本身不带有任何 `Mod` 对游戏性上的更改。

但这可能终究只能是我的理想吧。
:::

总之说到这里大家应该都明白了。因为 `Module` 和 `Plugin` 某种意义上是平级的，所以 `Plugin` 其实也是 `Module`，只不过是在同一套体制下运行的两个独立部分。而对于这两个独立部分而言，`Plugin` 又对 `Module` 有依赖性。

[forestry-modules-forestrymodules-java]: https://github.com/ForestryMC/ForestryMC/blob/946e88ced8cfdfaaa49cbf359c9ef615d8916109/src/main/java/forestry/modules/ForestryModules.java
[forestry-plugins-forestrycompactplugins-java]: https://github.com/ForestryMC/ForestryMC/blob/946e88ced8cfdfaaa49cbf359c9ef615d8916109/src/main/java/forestry/plugins/ForestryCompatPlugins.java
[this-bilibili-cv]: https://www.bilibili.com/read/cv34259
