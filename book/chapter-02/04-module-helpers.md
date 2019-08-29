# 模块与插件的其他内容

在前面的篇章中，其实我们跳过了很多东西，比如 `ForestryPluginUtil.getComment` 。鉴于这一章即将进入尾声，我选择在介绍最后的 ModuleManager 之前把这一部分杂项讲完。

## [ForestryModuleUids](/source/modules/ForestryModuleUids)

在林业中，专门存在这样一个东西负责把这些模块/插件的 Uid 记录下来。鉴于其内容都是 `public static final String` ，这里不再多说了。

<black title="泣">虽然我不知道有什么优势，但他这么做了我也很绝望啊</black>

<black title="干">这是没事找事吧……</black>

## [ForestryPluginUtil](/source/modules/ForestryPluginUtil)

工具类<black>(人)</black>。

<black title="草">你又为什么不是抽象类???</black>

```java
public class ForestryPluginUtil {
	private ForestryPluginUtil() {
    
	}
```

<black title="干">我佛了，你不是抽象类也就算了，还来个构造函数。</black>

```java
	public static Map<String, List<IForestryModule>> getForestryModules(ASMDataTable asmDataTable) {
		List<IForestryModule> instances = getInstances(asmDataTable, ForestryModule.class, IForestryModule.class);
		Map<String, List<IForestryModule>> modules = new LinkedHashMap<>();
		for (IForestryModule module : instances) {
			ForestryModule info = module.getClass().getAnnotation(ForestryModule.class);
			modules.computeIfAbsent(info.containerID(), k -> new ArrayList<>()).add(module);
		}
		return modules;
	}
```

这个函数负责生成 containerID -> `List<IForestryModule>` 的 Map。通过 `getInstance` (下文的函数，会详细介绍)，我们获得了存在的模块的 List。  
接下来，我们对这个列表进行遍历。对每个 module，我们将其加入其 containerID 对应的 `List<IForestryModule>` 中。 `modules.computeIfAbsent` 负责确保每个 containerID 都能够对应一个 `List<IForestryModule>` ，不存在就创建新的。  
于是，我们得到了一个像下面这样的 Map：

``` json
{
  "forestry": [
    // IForestryModules
  ],
  "another_container_id": [
    // IForestryModules
	]
}
```

```java
	public static String getComment(IForestryModule module) {
		ForestryModule info = module.getClass().getAnnotation(ForestryModule.class);
    
		String comment = I18n.translateToLocal(info.unlocalizedDescription());
		Set<ResourceLocation> dependencies = module.getDependencyUids();
		if (!dependencies.isEmpty()) {
			Iterator<ResourceLocation> iDependencies = dependencies.iterator();
    
			StringBuilder builder = new StringBuilder(comment);
			builder.append("\n");
			builder.append("Dependencies: [ ");
			builder.append(iDependencies.next());
			while (iDependencies.hasNext()) {
				ResourceLocation uid = iDependencies.next();
				builder.append(", ").append(uid.toString());
			}
			builder.append(" ]");
			comment = builder.toString();
		}
		return comment;
	}
```

这个函数负责生成配置文件中各模块/插件上方的注释。其结构很简单，这里不过多阐述。

<black title="作业?!">留给读者：这个函数用到了已经 @deprecated 的I18n.translateToLocal，请修改~~并给林业提交 Pull Request~~。</black>

```java
	private static <T> List<T> getInstances(ASMDataTable asmDataTable, Class annotationClass, Class<T> instanceClass) {
		String annotationClassName = annotationClass.getCanonicalName();
		Set<ASMDataTable.ASMData> asmDatas = asmDataTable.getAll(annotationClassName);
		List<T> instances = new ArrayList<>();
		for (ASMDataTable.ASMData asmData : asmDatas) {
			try {
				Class<?> asmClass = Class.forName(asmData.getClassName());
				Class<? extends T> asmInstanceClass = asmClass.asSubclass(instanceClass);
				T instance = asmInstanceClass.newInstance();
				instances.add(instance);
			} catch (ClassNotFoundException | IllegalAccessException | InstantiationException e) {
				Log.error("Failed to load: {}", asmData.getClassName(), e);
			}
		}
		return instances;
	}
}
```
这个函数<black>其实在黑历史里也提到过</black>负责的是将 ASMDataTable 中和 annotationClass 有关且合法的部分提炼出来，相当与一个 filter。首先，它根据 annotationClass 的 canonicalName 过滤了一部分信息，然后对过滤出来的每一个 Class 进行 newInstance（相当于检查，同时也新建了）。最后，将所有合法的 instance 塞进 List 里返回。