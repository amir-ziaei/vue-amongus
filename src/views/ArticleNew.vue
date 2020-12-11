<template>
    <div id="article">
        <vue-headful
                title="Among Us – New Article"/>
        <h2>New Article</h2>
        <div class="container">
            <TheArticleForm
                v-on:insert-event="insertArticle"
                :categories="categories"
                :callMethod="'insert'"
            />
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import TheArticleForm from "@/components/TheArticleForm.vue";

export default {
    ...mapActions(['Posts', 'Categories']),
    components: {
        TheArticleForm
    },
    data() {
        return {
            categories: []
        }
    },
    created: function() {
        this.$store.dispatch('GetCategories')
        .then(resp => {
          this.categories = this.$store.getters.StateCategories;
        })
        .catch(err => {
          this.error = true;
        })
    },
    methods: {
        insertArticle: function(article) {
            this.$store.dispatch('InsertPost', article)
            .then(resp => {
                this.$router.push('/')
                this.$notify({
                    group: 'form-alerts',
                    type: 'success',
                    text: 'Article posted successfully!',
                    duration: 1500,
                });
            })
            .catch(err => {
                this.$notify({
                    group: 'form-alerts',
                    type: 'error',
                    text: 'There was an error!',
                    duration: 2000,
                });
            })
        }
    }
}
</script>

<style scoped>
#article {
    margin-top:4rem;
}

.title h1 {
    font-size: 1.5rem;
    margin-bottom: 0;
}

.meta {
    font-size: 0.65rem;
    text-transform: uppercase;
    color:#555;
    text-shadow: 1px 1px 1px #eee;
}

a {
    text-transform: initial;
    color: #40B381;
}

.thumbnail {
    text-align: center;
}

.content p {
    text-align: justify;
    font-size:0.8125rem;
}

.footer {
    display: flex;
    margin-bottom:0.5rem;
}

.delete {
  background-color: rgba(161, 29, 29, 0.5);
  color: #fff;
}

.delete:hover {
  background-color: rgba(161, 29, 29, 0.6);
}

.edit {
  background-color: rgb(57, 161, 116);
  color:#fff;
}

.edit:hover {
  background-color: rgb(57, 161, 116, 0.9);
  color:#fff;
}
</style>