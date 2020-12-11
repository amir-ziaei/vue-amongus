<template>
  <div class="register">
      <vue-headful
            title="Among Us – Sign Up"/>
    <h2>Sign Up</h2>
    <div class="container">
        <form @submit.prevent="submit">
            <div class="form-group" :class="{ 'form-group--error': $v.email.$error }">
              <label class="form__label">Email *</label>
              <input class="form__input" v-model.trim="$v.email.$model"/>
            </div>
            <div class="error" v-if="!$v.email.required">Email is required</div>
            <div class="error" v-if="!$v.email.email">Email looks invalid</div>
            <div class="form-group" :class="{ 'form-group--error': $v.name.$error }">
                <label class="form__label">Name *</label>
                <input class="form__input" v-model.trim="$v.name.$model"/>
            </div>
            <div class="error" v-if="!$v.name.required">Name is required</div>
            <div class="error" v-if="!$v.name.alphaNum">Name can only contain alpha characters</div>
            <div class="error" v-if="!$v.name.minLength">Name must have at least {{$v.name.$params.minLength.min}} characters</div>
            <div class="error" v-if="!$v.name.maxLength">Name must have less than {{$v.name.$params.maxLength.max}} characters</div>
            <div class="form-group" :class="{ 'form-group--error': $v.password.$error }">
                <label class="form__label">Password *</label>
                <input class="form__input" v-model.trim="$v.password.$model" type="password"/>
            </div>
            <div class="error" v-if="!$v.password.required">Password is required</div>
            <div class="error" v-if="!$v.password.minLength">Password must have at least {{$v.password.$params.minLength.min}} characters</div>
            <div class="error" v-if="!$v.password.maxLength">Password must have less than {{$v.password.$params.maxLength.max}} characters</div>
            <div class="form-group">
                <button class="submit" type="submit">Sign Up</button>
            </div>
        </form>
      </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { required, minLength, maxLength, email } from 'vuelidate/lib/validators'

export default {
  name: "Register",
  data() {
    return {
      email: "",
      name: "",
      password: ""
    };
  },
  validations: {
    email: {
        required,
        email
    },
    name: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(30)
    },
    password: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(30)
    }
  },
  methods: {
    ...mapActions(["Register"]),
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
              name: this.name,
              email: this.email,
              password: this.password
          }
          this.$store.dispatch('register', data)
          .then(() => {
            this.$router.push('/')
            this.$notify({
              group: 'form-alerts',
              type: 'success',
              text: 'Registered successfully!',
              duration: 1000,
            });
          })
          .catch(err => {
            this.$notify({
              group: 'form-alerts',
              type: 'error',
              text: typeof err === 'object' ? Object.entries(err.response)[0][1].message : err,
              duration: 2000,
            });
          })
      }
    },
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
</style>