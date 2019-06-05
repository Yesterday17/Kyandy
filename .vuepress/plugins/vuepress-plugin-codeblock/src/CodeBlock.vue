<template>
  <div class="cb-wrapper">
    <div class="cb-body">
      <slot name="code"/>
    </div>
    <div class="cb-header">
      <a v-if="this.link && this.link != ''" :href="link">{{file}}</a>
      <span v-else>{{file}}</span>
    </div>
    <div class="cb-highlight"></div>
  </div>
</template>

<script>
export default {
  props: ["file", "link"]
};
</script>

<style>
.cb-wrapper {
  position: relative;
  vertical-align: center;
  height: auto;
  border-radius: 6px;
  background-color: #282c34;
}

.cb-header {
  position: absolute;
  top: 0;
  padding: 1rem 1.5rem;
  color: rgba(255, 255, 255, 0.7);
}

.cb-body {
  position: relative;
  padding-top: 1.5rem;
}

.cb-comment {
  padding: 0 !important;
  font-size: 0.9em;
}
</style>

  
