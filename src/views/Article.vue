<template>
    <div v-if="article" id="article">
        <vue-headful
                :title="'Among Us – ' + article.title"/>
        <div class="container article">
            <header class="title">
                <h1>{{ article.title }}</h1>
            </header>
            <div class="meta">
                <p>
                    Written by <a v-if="article.author" href="#">{{ article.author.name }}</a>
                    at {{ article.created_at }}
                    <br/>
                    <span v-if="article.updated_at">Last updated at {{ article.updated_at }}</span>
                </p>
            </div>
            <div v-if="article.id" class="thumbnail">
                <img :src="thumbnail" width="150" height="150" alt="Article Thumbnail" :title="article.title" />
            </div>
            <main class="content">
                    <p>
                    {{ article.body }}
                </p>
            </main>
            <footer class="footer" v-if="isModificationAllowed">
                <router-link :to="{name: 'ArticleEdit' , params:{ slug: article.slug }}" class="link edit">Edit</router-link> 
                <a @click="deleteArticle" class="link delete">Delete</a>
            </footer>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    ...mapActions(['Posts']),
    data() {
        return {
            userId: this.$store.getters.stateUser.id || null,
            article: {},
            author: {}
        }
    },
    created : function () {
      this.$store.dispatch('GetSinglePost', this.$route.params.slug)
        .then(resp => {
          this.article = this.$store.getters.StatePosts;
          this.author = this.article.author;
        })
        .catch(err => {
          this.$router.push('/')
         })
    },
    computed: {
      thumbnail() {
        const imgId = (this.article.id%4) + 1;
        return require(`@/assets/crew${imgId}.png`)
      },
      isModificationAllowed() {
        return this.author.id == this.userId
      },
    },
    methods: {
        deleteArticle: function() {
            this.$store.dispatch('DeletePost', this.article.id)
            .then(resp => {
                this.$router.push('/')
                this.$notify({
                    group: 'form-alerts',
                    type: 'success',
                    text: 'Article deleted successfully!',
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