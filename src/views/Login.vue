<template>
  <div class="login">
    <vue-headful
            title="Among Us – Log In"/>
    <h2>Log In</h2>
    <div class="container">
      <form @submit.prevent="submit">
        <div class="form-group" :class="{ 'form-group--error': $v.email.$error }">
            <label class="form__label">Email *</label>
            <input class="form__input" v-model.trim="$v.email.$model"/>
        </div>
        <div class="error" v-if="!$v.email.required">Email is required</div>
        <div class="error" v-if="!$v.email.email">Email must be valid</div>
        <div class="form-group" :class="{ 'form-group--error': $v.password.$error }">
            <label class="form__label">Password *</label>
            <input class="form__input" v-model.trim="$v.password.$model" type="password"/>
        </div>
        <div class="error" v-if="!$v.password.required">Password is required</div>
        <div class="form-group row">
            
            <input type="checkbox" id="checkbox" v-model="checked">
            <label class="form__label" for="checkbox">Remember Me?</label>
        </div>
        <div class="form-group">
            <button class="submit" type="submit">Log In</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { required, email, boolean } from 'vuelidate/lib/validators'

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: '',
      checked: ''
    }
  },
  validations: {
    email: {
        required, email
    },
    password: {
        required
    }
  },
  methods: {
    ...mapActions(['Login']),
    async submit() {
      this.$v.$touch()
      if (this.$v.$invalid) {
          this.$notify({
              group: 'form-alerts',
              type: 'error',
              text: 'Please check your inputs!',
              duration: 2000,
          });
      } else {
          let data = {
              email: this.email,
              password: this.password,
              remember: !! this.checked
          }
		   		this.$store.dispatch('login', data)
           .then(() => {
             this.$router.push('/')
             this.$notify({
                group: 'form-alerts',
                type: 'success',
                text: 'Login successful!',
                duration: 1000,
              });
           })
           .catch(err => {
               this.$notify({
                group: 'form-alerts',
                type: 'error',
                text: 'Username or password is wrong!',
                duration: 2000,
              });
              this.reset();
           })
      }
    },
    reset() {
        this.$v.$reset();
        this.email = '';
        this.password = '';
    }
  },
};
</script>

<style scoped>
* {
    outline: none;
}

input:focus {
  border-color: #ccc;
}

.form-group {
    display: flex;
    flex-direction: column;
    margin-top:0.5rem;
}

.row {
  flex-direction: row;
}

.form__label {
    font-size: 0.8125rem;
    color: #4b6372;
    margin:0 0 0.3125rem 0.3rem;
}

.form__input {
    font-size: 0.875rem;
    color: #374853;
    line-height: 2.375rem;
    min-height: 2.375rem;
    border: 1px solid #E8E8E8;
    border-radius: 5px;
    background: #fff;
    padding: 0 0.8125rem;
    transition: border .1s ease;
    box-sizing: border-box;
}

.submit {
    background-color: #40B381;
    border-radius: 4px;
    line-height: 1.5;
    border: none;
    outline: none;
    padding: 0.4rem;
    border: 2px solid rgba(0, 0, 0, 0);
    cursor: pointer;
    font-weight: bold;
    color: #fff;
    margin: 0.2rem 0 1rem;
}

.error {
    font-size: 0.75rem;
    line-height: 1;
    margin: 0.2rem 0 1rem 0.6rem;
    display:none;
}

.form-group--error input, .form-group--error input:focus, .form-group--error input:hover {
    border-color: #f79483;
}

.form-group--error + .form-group__message, .form-group--error + .error {
    color: #f57f6c;
    display: block;
}

.form-group--error label {
    color: #f04124;
}

.form-group--error {
    animation-name: shakeError;
    animation-fill-mode: forwards;
    animation-duration: .6s;
    animation-timing-function: ease-in-out;
}

@keyframes shakeError {
  0% {
    transform: translateX(0); }
  15% {
    transform: translateX(0.375rem); }
  30% {
    transform: translateX(-0.375rem); }
  45% {
    transform: translateX(0.375rem); }
  60% {
    transform: translateX(-0.375rem); }
  75% {
    transform: translateX(0.375rem); }
  90% {
    transform: translateX(-0.375rem); }
  100% {
    transform: translateX(0); } }
  
input[type=checkbox] + label {
  display: block;
  margin: 0.2em;
  cursor: pointer;
  padding: 0.2em;
}

input[type=checkbox] {
  display: none;
}

input[type=checkbox] + label:before {
  content: "\2714";
  border: 0.1em solid #dbdbdb;
  border-radius: 0.2em;
  display: inline-block;
  width: 1em;
  height: 1em;
  padding-left: 0.2em;
  padding-bottom: 0.3em;
  margin-right: 0.5em;
  vertical-align: unset;
  color: transparent;
  transition: .2s;
}

input[type=checkbox] + label:active:before {
  transform: scale(0);
}

input[type=checkbox]:checked + label:before {
  background-color: MediumSeaGreen;
  border-color: MediumSeaGreen;
  color: #fff;
}

input[type=checkbox]:disabled + label:before {
  transform: scale(1);
  border-color: #aaa;
}

input[type=checkbox]:checked:disabled + label:before {
  transform: scale(1);
  background-color: #bfb;
  border-color: #bfb;
}
</style>