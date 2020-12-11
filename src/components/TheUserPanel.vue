<template>
  <div id="userpanel">
    <div v-if="isLoggedIn" class="user">
      <div>
        <img src="../assets/logo.png" width="35" height="35" alt="Avatar" title="Amir's Avatar" draggable="false" />
      </div>
      <div>
        <router-link class="username" :to="{name: 'Dashboard', params:{ id: User.id }}">{{ User.name }}</router-link> |
        <a @click="logout">Logout</a>
      </div>
    </div>
    <div v-else class="guest">
      <router-link :to="{name: 'Register'}" class="link signup">Sign Up</router-link>
      <router-link :to="{name: 'Login'}" class="link login">Log In</router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "TheUserPanel",
  computed: {
    ...mapGetters({User: 'stateUser' }),
    isLoggedIn : function(){ return this.$store.getters.isLoggedIn }
  },
  methods: {
    logout: function () {
      this.$store.dispatch('logout')
      .then(() => {
        this.$router.push('/login')
      })
    }
  },
}
</script>

<style scoped>
a {
  cursor: pointer;
}

#userpanel {
  display: flex;
  align-items: center;
  padding: 0.2rem 0.65rem;
}

#userpanel img {
  border-radius: 50%;
}

#userpanel .username {
  font-size: 1rem;
  padding-left: 0.5rem;
  font-weight: bold;
  color:#000;
}

#userpanel .username:hover {
  color:rgb(57, 161, 116);
}

.guest, .user {
  display: flex;
  align-items: center;
}

.login {
  background-color: rgba(0, 0, 0, 0.1);
  color: #000;
}

.login:hover {
  background-color: rgba(0, 0, 0, 0.15);
}

.signup {
  background-color: rgb(57, 161, 116);
  color:#fff;
}

.signup:hover {
  background-color: rgb(57, 161, 116, 0.9);
}
</style>
