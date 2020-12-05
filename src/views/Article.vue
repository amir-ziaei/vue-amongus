<template>
    <div id="article">
        <vue-headful
                :title="'Among Us – ' + article.title"/>
        <div class="container article">
            <header class="title">
                <h1>{{ article.title }}</h1>
            </header>
            <div class="meta">
                <p>
                    Written by <a href="#">{{ article.author }}</a>
                    at {{ article.published_at }}
                </p>
            </div>
            <div class="thumbnail">
                <img :src="require(`@/assets/${article.thumbnail}`)" width="150" height="150" alt="Article Thumbnail" :title="article.title" />
            </div>
            <main class="content">
                    <p>
                    {{ article.body }}
                </p>
            </main>
        </div>
    </div>
</template>

<script>
import storage from "@/storage.js";

export default {
    data() {
        return {
            articleSlug: this.$route.params.slug
        }
    },
    computed: {
        article() {
            return storage.articles.find(
                article => article.slug === this.articleSlug
            );
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
</style>