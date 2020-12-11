<template>
    <form @submit.prevent="submit">
        <div class="form-group" :class="{ 'form-group--error': $v.title.$error }">
            <label class="form__label">Title</label>
            <input class="form__input" v-model.trim="$v.title.$model"/>
        </div>
        <div class="error" v-if="!$v.title.required">Title is required</div>
        <div class="error" v-if="!$v.title.minLength">Title must have at least {{$v.title.$params.minLength.min}} characters</div>
        <div class="form-group" :class="{ 'form-group--error': $v.slug.$error }">
            <label class="form__label">Slug</label>
            <input class="form__input" v-model.trim="$v.slug.$model"/>
        </div>
        <div class="error" v-if="!$v.slug.required">Slug is required</div>
        <div class="error" v-if="!$v.slug.alpha_dash">Slug can only contain alpha, numbers, and dashes</div>
        <div class="error" v-if="!$v.slug.minLength">Slug must have at least {{$v.slug.$params.minLength.min}} characters</div>
        <Categories
            v-if="mode == 'vertical'"
            :categories="catgs"
            :selectedCategories="articleCategories"
            :view="mode"
            v-on:category-selected="getCategories"
            v-on:category-new="newCategory"
            v-on:category-deleted="deleteCategory" />
        <Categories
            v-else
            :categories="catgs"
            :view="mode"
            v-on:category-selected="getCategories"
            v-on:category-new="newCategory"
            v-on:category-deleted="deleteCategory" />
        <div class="form-group" :class="{ 'form-group--error': $v.body.$error }">
            <label class="form__label">Body</label>
            <textarea rows="10" class="form__input" v-model.trim="$v.body.$model"></textarea>
        </div>
        <div class="error" v-if="!$v.body.required">Body is required</div>
        <div class="form-group">
            <button class="submit" type="submit">{{ buttonName }}</button>
        </div>
    </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { required, minLength, alphaNum } from 'vuelidate/lib/validators'
import Categories from "@/components/Categories.vue";

const alpha_dash = (value) => {
    const regexp = /^[a-z0-9_\-]+$/i;
    return regexp.test(value);
}

export default {
    name: "ArticleForm",
    components: {
        Categories
    },
    props: {
        articleId: Number,
        articleTitle: String,
        articleSlug: String,
        articleBody: String,
        articleCategories: Array,
        callMethod: String,
        categories: Array,
    },
    created: function() {
        this.$store.dispatch('SetCats', this.categories);
    },
    data () {
        return {
            id: this.articleId || "",
            title: this.articleTitle || "",
            slug: this.articleSlug || "",
            body: this.articleBody || "",
            cats: []
        }
    },
    computed: {
        ...mapGetters({getCatgs: 'StateCategories'}),
        ...mapActions({setCatgs: 'SetCats'}),
        catgs: {
           get(){
                return this.getCatgs
           },
           set(catgs){
                this.$store.dispatch('SetCats', catgs);
           }
        },
        buttonName() {
            return this.callMethod == 'insert' ? 'Post' : 'Update'
        },
        mode() {
            return this.callMethod == 'insert' ? 'horizontal' : 'vertical';
        }
    },
    validations: {
        title: {
            required,
            minLength: minLength(4)
        },
        slug: {
            required,
            alpha_dash,
            minLength: minLength(8)
        },
        body: {
            required
        }
    },
    methods: {
        ...mapActions(['Categories']),
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
                let article = {
                    id: this.id,
                    title: this.title,
                    slug: this.slug,
                    body: this.body,
                    author: this.$store.getters.stateUser.id,
                    categories: this.cats.join(",")
                }
                switch(this.callMethod) {
                    case 'insert':
                        this.$emit('insert-event', article)
                        break;
                    case 'edit':
                        this.$emit('update-event', article)
                        break;
                } 
            }
        },
        getCategories: function(cats) {
            this.cats = cats;
        },
        newCategory: function(cat) {
            this.$store.dispatch('InsertCategory', {title: cat})
            .then(resp => {
                this.catgs = this.$store.getters.StateCategories;
            })
            .catch(err => {
                this.$notify({
                    group: 'form-alerts',
                    type: 'error',
                    text: 'Something went wrong!',
                    duration: 2000,
                });
            })
        },
        deleteCategory: function(id) {
            this.$store.dispatch('DeleteCategory', id)
            .then(resp => {
                this.catgs = this.$store.getters.StateCategories;
            })
            .catch(err => {
                this.$notify({
                    group: 'form-alerts',
                    type: 'error',
                    text: 'Something went wrong!',
                    duration: 2000,
                });
            })
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

textarea {
    font-family: 'Roboto';
    line-height: 2 !important;
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