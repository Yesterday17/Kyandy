# 模块与 Container

模块是林业抽象中最基本的一环，而对模块的抽象则是基本中的基本。在这一章，我们将详细探讨林业对模块的抽象过程，以便在后文中更好地分析各个模块。

## [IModuleContainer](/source/api/modules/IModuleContainer.html) (接口)

`IModuleContainer` 位于 `forestry.api.modules` 下，其唯二的实现便是前文提到的模块与插件对应的类，也就是说，它是对于林业中所有 `ModuleManager` 的基本抽象接口。在看 `Module` 本身之前，我们先来看一看这个接口：

~~话说是不是应该叫 `IModuleManagerContainer` ?~~

<heimu>后来我发现如果要叫 IModuleManagerContainer 的话</heimu>

<heimu>那现在的 ModuleManager 就要叫 ModuleManagerManager</heimu>

```java
public interface IModuleContainer {
	/**
	 * @return Unique identifier for the module container, no spaces!
	 */
	String getID();
```

字符串类型的 ID，不带空格。

```java
	boolean isAvailable();
```

表示是否可用，至少目前的代码中没看到不可用的。

```java
	Configuration getModulesConfig();
```

获取配置信息用的。在具体实现中，这个函数的实现用到了`config` 单例以避免重复获取配置。

```java
	/**
	 * @return true if the module is enabled in the config file of this container.
	 */
	boolean isModuleEnabled(IForestryModule module);
```

用以获取指定模块是否启用。

```java
	/**
	 * Called after configured the modules.
	 */
	default void onConfiguredModules(Collection<IForestryModule> activeModules, Collection<IForestryModule> unloadedModules) {
	}
}
```

在配置完之后调用，通过阅读具体实现及调用可以发现是为了将通过运算得到的**需要加载**和**不需要加载**的模块存到对应的 `Set` 中。

## [IForestryModule](/source/api/modules/IForestryModule.html) (接口)

`IForestryModule`与 `IModuleContainer`位置相同，是对于林业中所有模块的基本抽象接口。

```java
/**
 * Defines a Forestry module.
 * Any class implementing this interface and annotated by {@link ForestryModule} to be loaded by
 * the model manager of Forestry.
 */
public interface IForestryModule {
	default boolean isAvailable() {
		return true;
	}
```

是否可用，默认为 `true`。

```java
	default boolean canBeDisabled() {
		return true;
	}
```

能否被禁用，诸如 `core` 之类的模块是不能禁用的。

```java
	default String getFailMessage() {
		return "";
	}
```

当且仅当上述的 `isAvailable` 返回 `false` 时在日志中输出的错误信息。

```java
	/**
	 * The ForestryModule.moduleID()s of any other modules this module depends on.
	 */
	default Set<ResourceLocation> getDependencyUids() {
		return Collections.emptySet();
	}
```

获得该模块的依赖项。对于通常的林业模块而言，其依赖 `core` 模块（出自`BlankForestryModule`）。但对于诸如林业拓展，其可能会增加依赖自己 `Mod` 对应的 `core` 模块。

```java
	/**
	 * Can be used to setup the api.
	 * Will only be called if the module is active if not {@link #disabledSetupAPI()} will be called.
	 * <p>
	 * Must be called by the mod that registers the container.
	 */
	default void setupAPI() {
	}
```

在 `SETUP` 阶段调用。只有当模块未被禁用(`disable`)时才会调用，与下面刚好相反。

```java
	/**
	 * Called to setup the api if this module is disabled in the config or has missing dependencies.
	 * <p>
	 * Must be called by the mod that registers the container.
	 */
	default void disabledSetupAPI() {
	}
```

在 `SETUP_DISABLED` 阶段调用。只有当模块被禁用(`disable`)时才会调用，与上面刚好相反。

```java
	/**
	 * Can be used to register items and blocks. Called before {@link #preInit()}.
	 * <p>
	 * Must be called by the mod that registers the container.
	 */
	default void registerItemsAndBlocks() {
	}
```

在 `REGISTER` 阶段调用。用于注册物品和方块，它的执行在 `preInit` 之前，在上述两函数执行之后。

```java
	/**
	 * Must be called by the mod that registers the container.
	 */
	default void preInit() {
	}
```

在 `PRE_INIT` 阶段调用。

```java
	/**
	 * Can be used to register Buildcraft triggers.
	 */
	default void registerTriggers() {
	}
```

用于注册 `BuildCraft` 的 `trigger`，当且仅当 `BuildCraft` 存在（即 `BuildCraft` 兼容启用）时执行。笔者这里没有详细研究过。

```java
	default void doInit() {
	}
```

在 `INIT` 阶段调用。

```java
	/**
	 * Can be used to register recipes. Called after {@link #doInit()}.
	 */
	default void registerRecipes() {
	}
```

在 `INIT` 阶段调用。用于注册合成，它的执行在 `doInit` 之前。

```java
	default void addLootPoolNames(Set<String> lootPoolNames) {
	}
```

用于操纵 `LootTable`，该函数在 `LootTableLoadEvent` 触发时被调用。

```java
	default void postInit() {
	}
```

在 `POST_INIT` 阶段调用。

```java
	@Nullable
	default ICommand[] getConsoleCommands() {
		return null;
	}
}
```

用于注册命令，因为可以没有命令所以可能为 `NULL`（也就是默认情况）。在 `FMLServerStartingEvent` 触发时调用。

## [ForestryModule](/source/api/modules/ForestryModule.html) (注解)

ForesryModule 是注解，它负责的是给林业的 Module 提供额外的信息。  
在注释中，还特意强调了某<heimu>~~科学~~</heimu>不知名的命令 `/forestry module info ${moduleID}` 的存在。

```java
/**
 * Annotation to provide additional information on IForestryModules. This information will be available via the "/forestry module info {@link #moduleID()}" command ingame.
 * Any class annotated by this and implementing {@link IForestryModule} will be loaded by the model manager of Forestry.
 *
 * @author Nedelosk
 */
```

<heimu title="问题">Q: 你发现 typo 了吗?</heimu>
<heimu title="答案">A: model manager -> module manager</heimu>

这一部分的内容不详细分析了，有兴趣的读者可以自行点击上方标题阅读源码。

## [IModuleManager](/source/api/modules/IModuleManager.html) (接口)

IModuleManager 是对 ModuleManager 的抽象。其将 ModuleManager 的部分方法以接口的形式暴露在 ForestryAPI 中，供其他模组调用。下面我们对其四个方法进行分析：

```java
public interface IModuleManager {
	default boolean isModuleEnabled(String containerID, String moduleID) {
		return isModuleEnabled(new ResourceLocation(containerID, moduleID));
	}
```

isModuleEnabled 这一方法对 ResourceLocation 的简化操作。<heimu title="让我看看你口腔发育正不正常啊！">张嘴吃糖！</heimu>

```java
	boolean isModuleEnabled(ResourceLocation id);
```

看 Module 是否启用的。

```java
	void registerContainers(IModuleContainer... container);
```

注册新的 ModuleContainer，也就是说你可以用这个做一个完全独立于 Module 或 Plugin 的东西出来<black title="完全意义不明的存在">Extension(?)</black>。

```java
	Collection<IModuleContainer> getContainers();
}
```

获得所有的 IModuleContainer。
