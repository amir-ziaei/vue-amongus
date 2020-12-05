<template>
  <nav id="nav">
    <font-awesome-icon icon="bars" size="lg" @click="isHidden = !isHidden"/>
    <ul v-if="!isHidden">
      <li class="active">
        <router-link :to="{ name: 'Home' }">Home</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'Gallery' }">Gallery</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'Contact' }">Contact</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "TopbarMenu",
  data: function () {
    return {
      isHidden: true
    }
  },
}
</script>

<style scoped>
#nav {
  display: flex;
  align-items: center;
  padding: 0.2rem 0.65rem;
}

#nav ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  background: #fff;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 8px 0px,
    rgba(0, 0, 0, 0.05) 0px 0px 4px 0px;
  border-radius: 4px;
  position: absolute;
  top: 1.75rem;
  right: 0.65rem;
  padding: 1rem;
  align-items: center;
}

#nav li {
  padding: 0.5rem;
}

#nav a {
  color: #0f0d10;
  padding: 0.1rem 0;
}

#nav li:hover a {
  border-bottom: 2px solid #40B381;
}

#nav a.router-link-exact-active {
  border-bottom: 2px solid #40B381;
  font-weight: bold;
}
</style>
