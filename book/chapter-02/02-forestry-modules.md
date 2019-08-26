# 林业的 ModuleContainer 实现

通过前面的阅读我们知道，林业的拓展系统分为模块和插件两种。虽然确实是分了，但二者同样都实现了 IModuleContainer，因此基本架构可以说是一样的。这一节我们来详细观察一下二者的实现。

<black title="不要妄图在这里找到线索啊 kora!">之后不妨试着找找哪里有思考题？（笑）</black>

## [ForestryModules](/source/modules/ForestryModules)

看到这个文件你可能会很眼熟，没错，它在 [1.2 基础架构](/book/chapter-01/structure) 里也出现过，当时出现的是前三行<black>但是你以为这就可以跳过吗? （笑）</black>。

```java
public class ForestryModules implements IModuleContainer {
	private static final String MODULE_CONFIG_FILE_NAME = "modules.cfg";
	private static final String CONFIG_CATEGORY = "modules";
	private static Configuration config;

	@Override
	public String getID() {
		return Constants.MOD_ID;
	}
```

首先是 ID，这是区分不同 ModuleContainer 的唯一方式。这里林业选择了自身的 ModID。

```java
	@Override
	public boolean isAvailable() {
		return true;
	}
```

作为主 ModuleContainer 必须有效。

```java
	@Override
	public Configuration getModulesConfig() {
		return getModulesConfiguration();
	}

	public static final Configuration getModulesConfiguration() {
		if (config == null) {
			config = new Configuration(new File(Forestry.instance.getConfigFolder(), MODULE_CONFIG_FILE_NAME));
		}
		return config;
	}
```

这里是一个简单的 Configuration 单例，获得 ModuleContainer 对应的配置文件。

```java
	@Override
	public boolean isModuleEnabled(IForestryModule module) {
		ForestryModule info = module.getClass().getAnnotation(ForestryModule.class);

		String comment = ForestryPluginUtil.getComment(module);
		Property prop = getModulesConfig().get(CONFIG_CATEGORY, info.moduleID(), true, comment);
		return prop.getBoolean();
	}
```

这里检查模块是否启用的方式同时利用到了注解和配置文件。通过注解，我们得到了对应的 ForestryModule，其中包括了所有我们需要的信息；再通过 Configuration 的 get 获取到了在 `CONFIG_CATEGORY`（即 modules）对应 ForestryModule ID 的配置文件。至于之后两个参数，可以参照下面这个：

```properties
    # Adds bees, beekeeping and bee products. Affects world generation.
    # Dependencies: [ forestry:core ]
    B:apiculture=true
```

<black>不要问我为什么叫 ForestryPluginUtil 而不叫 ForestryModuleUtil（</black>

```java
	@Override
	public void onConfiguredModules(Collection<IForestryModule> activeModules, Collection<IForestryModule> unloadedModules) {
		ModuleManager.getInternalHandler().addModules(activeModules, unloadedModules);
	}
}
```

最后是这个 onConfiguredModules，它是在 runSetup 的时候固定调用的，负责将不论是 active 还是 unloaded 的 Module 都丢给 InternalModuleHandler。这个实现在两个类里完 全 一 致。

## [ForestryCompatPlugins](/source/plugins/ForestryCompatPlugins)

<black>这个和上面那个几乎完全一致啊 kora</black>

<black>看看就行</black>

```java
public class ForestryCompatPlugins implements IModuleContainer {
	private static final String MODULE_CONFIG_FILE_NAME = "modules.cfg";
	private static final String CONFIG_CATEGORY = "modules.plugins";
	public static final String ID = "forestry_compat";
	private Configuration config;

	@Override
	public String getID() {
		return ID;
	}

	@Override
	public boolean isAvailable() {
		return true;
	}

	@Override
	public Configuration getModulesConfig() {
		return ForestryModules.getModulesConfiguration();
	}

	@Override
	public boolean isModuleEnabled(IForestryModule module) {
		ForestryModule info = module.getClass().getAnnotation(ForestryModule.class);

		String comment = ForestryPluginUtil.getComment(module);
		Property prop = getModulesConfig().get(CONFIG_CATEGORY, info.moduleID(), true, comment);
		return prop.getBoolean();
	}

	@Override
	public void onConfiguredModules(Collection<IForestryModule> activeModules, Collection<IForestryModule> unloadedModules) {
		ModuleManager.getInternalHandler().addModules(activeModules, unloadedModules);
	}
}
```
