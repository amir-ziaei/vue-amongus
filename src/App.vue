<template>
  <div id="app">
    <TheTopbar />
    <router-view class="wrapper" :key="$route.path"/>
    <notifications classes="form-alerts" group="form-alerts" position="top center" />
    <TheFooter />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import TheTopbar from "@/components/TheTopbar.vue";
import TheFooter from "@/components/TheFooter.vue";

export default {
  components: {
    TheTopbar,
    TheFooter
  }
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
  height: 100vh;
  display: flex;
}

#app {
  background-color: #f7f7f8;
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  flex: 1;
}

#app a {
  text-decoration: none;
}

.wrapper {
  margin-top: 2rem;
  padding: 1rem;
  flex-grow: 1;
  overflow-y: scroll;
}

.container {
  background: #fff;
  border-radius: 5px;
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  padding-bottom: 0.1rem;
  flex-grow: 1;
}

.form-alerts {
  padding: 1.1rem;
  font-size: 0.85rem;
  color: #ffffff;
  border: 0;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
}

.form-alerts .notification-content {
  text-align: center;
}

.form-alerts.warn {
  background: #ffb648;
}

.form-alerts.error {
  background: #E54D42;
}

.form-alerts.success {
  background: #68CD86;
}

.link {
  background-color: #808080;
  padding:0.4rem 0.75rem;
  margin: 0.35rem 0.25rem;
  border-radius:4px;
  font-size:0.75rem;
  cursor: pointer;
}
</style>
