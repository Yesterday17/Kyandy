<template>
  <span class="heimu" :title="title">
    <slot></slot>
  </span>
</template>

<style>
.heimu,
.heimu a,
a .heimu {
  background-color: #252525;
  color: #252525;
  text-shadow: none;
}

.heimu p {
  display: inline;
}

.heimu:hover,
.heimu:active {
  transition: color 0.13s linear;
  color: #fff;
}

.heimu:hover a {
  transition: color 0.13s linear;
  color: #add8e6;
}

.heimu .icon.outbound {
  display: none;
}
</style>


<script>
export default {
  props: ["title"]
};
</script>