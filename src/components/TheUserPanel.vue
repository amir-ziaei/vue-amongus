<template>
  <div id="userpanel">
    <div v-if="isLoggedIn" class="user">
      <div>
        <img src="../assets/logo.png" width="35" height="35" alt="Avatar" title="Amir's Avatar" draggable="false" />
      </div>
      <div>
        <span>{{ User.name }}</span> | 
        <a @click="logout">Logout</a>
      </div>
    </div>
    <div v-else class="guest">
      <router-link to="/register" class="link signup">Sign Up</router-link>
      <router-link to="/login" class="link login">Log In</router-link>
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
#userpanel {
  display: flex;
  align-items: center;
  padding: 0.2rem 0.65rem;
}

#userpanel img {
  border-radius: 50%;
}

#userpanel span {
  font-size: 1rem;
  padding-left: 0.5rem;
  font-weight: bold;
}

.guest, .user {
  display: flex;
  align-items: center;
}

.link {
  background-color: gray;
  padding:0.4rem 0.75rem;
  margin: 0.35rem 0.25rem;
  border-radius:4px;
  font-size:0.75rem;
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
  color:#fff;
}
</style>
