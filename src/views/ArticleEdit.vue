<template>
    <div v-if="article" id="article">
        <vue-headful
                :title="'Among Us – ' + article.title + ' (Edit)'"/>
        <h2>Edit Article</h2>
        <div class="container">
            <TheArticleForm
                v-if="article"
                :articleId="parseInt(article.id)"
                :articleTitle="article.title"
                :articleSlug="article.slug"
                :articleBody="article.body"
                :articleCategories="article.categories"
                :categories="categories"
                :callMethod="'edit'"
                v-on:update-event="updateArticle"
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
            error: null,
            userId: this.$store.getters.stateUser.id || null,
            article: null,
            author: null,
            categories: []
        }
    },
    created : function () {
      this.$store.dispatch('GetSinglePost', this.$route.params.slug)
        .then(resp => {
          this.article = this.$store.getters.StatePosts;
          this.author = this.article.author;
          if(this.author.id != this.userId) {
              this.$router.push('/');
          }
        })
        .catch(err => {
          this.$router.push('/')
        })

        this.$store.dispatch('GetCategories')
        .then(resp => {
          this.categories = this.$store.getters.StateCategories;
        })
        .catch(err => {
          this.error = true;
        })
    },
    methods: {
        updateArticle: function(article) {
            this.$store.dispatch('UpdatePost', article)
            .then(resp => {
                this.$router.push({name: 'Article', params:{ slug: article.slug }})
                this.$notify({
                    group: 'form-alerts',
                    type: 'success',
                    text: 'Article updated successfully!',
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