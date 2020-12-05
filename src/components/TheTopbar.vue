<template>
  <header id="topbar">
    <TheUserPanel />
    <TheNavigation />
  </header>
</template>

<script>
import TheUserPanel from "@/components/TheUserPanel.vue";
import TheNavigation from "@/components/TheNavigation.vue";

export default {
  name: "TheTopbar",
  components: {
    TheUserPanel,
    TheNavigation
  }
}
</script>

<style scoped>
#topbar {
  background: #fff;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 2px 0px,
    rgba(0, 0, 0, 0.1) 0px 0px 2px 0px;
  display: flex;
  justify-content: space-between;
  position: fixed;
  right: 0;
  left: 0;
  padding: 0.2rem 0;
  z-index:999;
}
</style>
