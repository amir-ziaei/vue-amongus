<template>
    <form id="form" @submit.prevent="submit">
        <div class="form-group" :class="{ 'form-group--error': $v.name.$error }">
            <label class="form__label">Name</label>
            <input data-cy="name" class="form__input" v-model.trim="$v.name.$model"/>
        </div>
        <div class="error" v-if="!$v.name.required">Name is required</div>
        <div class="error" v-if="!$v.name.minLength">Name must have at least {{$v.name.$params.minLength.min}} letters.</div>
        <div class="form-group" :class="{ 'form-group--error': $v.email.$error }">
            <label class="form__label">Email</label>
            <input data-cy="email" class="form__input" v-model.trim="$v.email.$model"/>
        </div>
        <div class="error" v-if="!$v.email.required">Email is required</div>
        <div class="error" v-if="!$v.email.email">Email is invalid</div>
        <div class="form-group" :class="{ 'form-group--error': $v.msg.$error }">
            <label class="form__label">Message</label>
            <textarea data-cy="message" class="form__input form__textarea" v-model.trim="$v.msg.$model"></textarea>
        </div>
        <div class="error" v-if="!$v.msg.required">Message is required</div>
        <div class="error" v-if="!$v.msg.minLength">Message must have at least {{$v.msg.$params.minLength.min}} letters.</div>
        <div class="form-group">
            <button data-cy="reset" class="reset" @click="reset">Reset</button>
            <button class="submit" type="submit">Submit</button>
        </div>
    </form>
</template>

<script>
import { required, minLength, email } from 'vuelidate/lib/validators'

export default {
    name: "TheContactForm",
    data() {
        return {
            name: '',
            email: '',
            msg: ''
        }
    },
    validations: {
        name: {
            required,
            minLength: minLength(5)
        },
        email: {
            required,
            email
        },
        msg: {
            required,
            minLength: minLength(10)
        }
    },
    methods: {
        submit(e) {
            if(e.submitter.className != "submit") return;
            this.$v.$touch()
            if (this.$v.$invalid) {
                this.$notify({
                    group: 'form-alerts',
                    type: 'error',
                    text: 'Please check your inputs!',
                    duration: 2000,
                });
            } else {
                // do your submit logic here
                this.$notify({
                    group: 'form-alerts',
                    type: 'success',
                    text: 'Your message was successfully sent!',
                    duration: 2000,
                });
                this.reset();
            }
        },
        reset() {
            this.$v.$reset();
            this.name = "";
            this.email = "";
            this.msg = "";
        }
    }
}
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

.form__textarea {
    resize: vertical;
    line-height: 1.5;
    min-height: 10rem;
    padding: 0.5rem 0.8125rem;
}

.reset, .submit {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    color: #0e0e10;
    line-height: 1.5;
    border: none;
    outline: none;
    padding: 0.25rem;
    border: 2px solid rgba(0, 0, 0, 0);
    cursor: pointer;
}

.submit {
    background-color: #40B381;
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

.form-group--error input, .form-group--error textarea, .form-group--error input:focus, .form-group--error input:hover {
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