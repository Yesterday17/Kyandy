# 模块与 Container

模块是林业抽象中最基本的一环，而对模块的抽象则是基本中的基本。在这一章，我们将详细探讨林业对模块的抽象过程，以便在后文中更好地分析各个模块。

## IModuleContainer

`IModuleContainer` 位于 `forestry.api.modules` 下，其唯二的实现便是前文提到的模块与插件对应的类。在看 `Module` 本身之前，我们先来看一看这个接口：

~~话说是不是应该叫 `IModuleManagerContainer` ?~~

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
