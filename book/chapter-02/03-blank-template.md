# 模块和插件的空白模板

在有了 IForestryModule 之后，理论上我们就可以基于这个接口实现我们的模块/插件了，然而这还不够<black title="林明美? (逃">林太难了</black>。对于模块/插件而言，还存在更多的东西是各自本身共通的。因此，对于二者，分别存在一个空白模板。

## [BlankForestryModule](/source/modules/BlankForestryModule)

<black>所以为什么你不是抽象类?</black>

```java
public class BlankForestryModule implements IForestryModule {
	/**
	 * The ForestryModule.moduleID()s of any other modules this module depends on.
	 */
	public Set<ResourceLocation> getDependencyUids() {
		return ImmutableSet.of(new ResourceLocation(Constants.MOD_ID, ForestryModuleUids.CORE));
	}
```

显而易见<black title="🔫">稍有常识的人都能看出</black>，所有的模块都依赖 Core 模块。

```java
	@Override
	public String toString() {
		ForestryModule forestryModule = getClass().getAnnotation(ForestryModule.class);
		if (forestryModule == null) {
			return getClass().getSimpleName();
		}
		return forestryModule.name() + " Module";
	}
```

对模块 -> String 的方法。现在为 `${simple_name}Module`。

```java
	public boolean processIMCMessage(FMLInterModComms.IMCMessage message) {
		return false;
	}
```

默认不处理 IMCMessage。

```java
	public void populateChunk(IChunkGenerator chunkGenerator, World world, Random rand, int chunkX, int chunkZ, boolean hasVillageGenerated) {
	}

	public void populateChunkRetroGen(World world, Random rand, int chunkX, int chunkZ) {
	}

	public void decorateBiome(World world, Random rand, BlockPos pos) {
	}

	/**
	 * Can be used to register items to the backpack via the {@link forestry.api.storage.IBackpackInterface}.
	 */
	public void registerBackpackItems() {
	}

	/**
	 * Can be used to register crates via the {@link forestry.api.storage.ICrateRegistry}.
	 */
	public void registerCrates() {
	}

	/**
	 * Can be used to hide items in JEI.
	 */
	public void getHiddenItems(List<ItemStack> hiddenItems) {
	}

	@Nullable
	public ISaveEventHandler getSaveEventHandler() {
		return null;
	}

	@Nullable
	public IPacketRegistry getPacketRegistry() {
		return null;
	}

	@Nullable
	public IPickupHandler getPickupHandler() {
		return null;
	}

	@Nullable
	public IResupplyHandler getResupplyHandler() {
		return null;
	}
}
```

以上全为占位方法。

## [CompatPlugin](/source/plugins/CompatPlugin)

<black>你个浓眉大眼的又**是**抽象类了?????</black>

```java
public abstract class CompatPlugin extends BlankForestryModule {
	protected final String modName;
	protected final String modID;

	public CompatPlugin(String modName, String modID) {
		this.modName = modName;
		this.modID = modID;
	}
```

根据前文我们知道，这两个属性是插件的功能决定的。

```java
	@Override
	public final boolean isAvailable() {
		return ModUtil.isModLoaded(modID);
	}
```

插件是否生效取决与对应的模组是否加载。

```java
	@Override
	public final String getFailMessage() {
		return modName + " not found";
	}
```

当不生效时，返回信息为 `${modname} not found`。

```java
	@Nullable
	protected ItemStack getItemStack(@Nonnull String itemName) {
		return getItemStack(itemName, 0);
	}

	@Nullable
	protected ItemStack getItemStack(@Nonnull String itemName, int meta) {
		Item item = getItem(itemName);
		if (item == null) {
			return null;
		}
		return new ItemStack(item, 1, meta);
	}
```

获取指定 itemName 的物品，若未指定 meta 则默认为 0，物品数量为 1。

```java
	@Nullable
	protected Block getBlock(@Nonnull String blockName) {
		ResourceLocation key = new ResourceLocation(modID, blockName);
		if (ForgeRegistries.BLOCKS.containsKey(key)) {
			return ForgeRegistries.BLOCKS.getValue(key);
		}
		Log.debug("Could not find block {}", key);
		return null;
	}
```

获取该插件对应模组的对应 blockName 的 Block。

```java
	@Nullable
	protected Item getItem(String itemName) {
		ResourceLocation key = new ResourceLocation(modID, itemName);
		if (ForgeRegistries.ITEMS.containsKey(key)) {
			return ForgeRegistries.ITEMS.getValue(key);
		}
		Log.debug("Could not find item {}", key);
		return null;
	}
```

获取该插件对应模组的对应 itemName 的 Item。

```java
	@Nullable
	protected Fluid getFluid(String fluidName) {
		Fluid fluid = FluidRegistry.getFluid(fluidName);
		if (fluid == null) {
			Log.debug("Could not find fluid {}", fluidName);
		}
		return fluid;
	}
```

获取该插件对应模组的对应 fluidName 的 Fluid。

```java
	protected void addBlocksToBackpack(String backpackUid, String... blockNames) {
		for (String blockName : blockNames) {
			Block block = getBlock(blockName);
			if (block != null) {
				Item item = Item.getItemFromBlock(block);
				ItemStack blockStack = new ItemStack(item, 1, OreDictionary.WILDCARD_VALUE);
				if (!blockStack.isEmpty()) {
					BackpackManager.backpackInterface.addItemToForestryBackpack(backpackUid, blockStack);
				} else {
					Log.warning("Could not find an item for block: {}", blockName);
				}
			} else {
				Log.warning("Missing block: {}", blockName);
			}
		}
	}
}
```

把对应的 Block 加入指定背包的白名单列表中。

<black title="震撼我妈">????????????????????????????????????</black>
