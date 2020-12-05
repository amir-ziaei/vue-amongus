<template>
  <div class="home">
    <vue-headful
            title="Among Us – Home"/>
    <h2>Latest Articles</h2>
    <main class="articles">
      <ArticlePreview
        v-for="article in articles"
        :key="article.id"
        :title="article.title"
        :slug="article.slug"
        :body="article.body"
        :thumbnail="article.thumbnail"
        :author="article.author"
        :published_at="article.published_at" 
      />
    </main>
  </div>
</template>

<script>
import storage from "@/storage.js";
import ArticlePreview from "@/components/ArticlePreview.vue";

export default {
  name: "Home",
  data() {
    return {
      articles: storage.articles
    }
  },
  components: {
    ArticlePreview
  }
};
</script>

<style scoped>
.home h2 {
  color: #1f1f23;
}

.articles {
  display: flex;
  flex-wrap: wrap;
}
</style>
