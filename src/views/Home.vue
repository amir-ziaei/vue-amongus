<template>
  <div class="home">
    <vue-headful
            title="Among Us – Home"/>
    <div class="form-alerts error" v-if="error">Failed to connect to the API</div>
    <div v-else>
      <h2>Latest Articles</h2>
      <router-link v-if="isLoggedIn" :to="{name: 'ArticleNew'}" class="link new">New Article</router-link>
      <a class="link export" v-if="isLoggedIn" @click="exportToFile">Export</a>
      <a v-if="isLoggedIn" @click="print" class="link report">Print Report</a> 
      <div>
        <header id="contentToPrint">
          <h2>Data Report</h2>
          <div>
            <b>Reported to: </b> {{ User.name }} <br/>
            <b>At: </b> {{ currentTime }} <br/>
            <hr/>
            <b>Number of Posts: </b> {{ countArticles }} <br/>
            <b>Number of Posts by Me: </b> {{ countArticlesByMe }} <br/>
            <b>Number of Posts in 2020: </b> {{ countArticlesInSpecificYear(2020) }} <br/>
            <b>Number of Posts in 2019: </b> {{ countArticlesInSpecificYear(2019) }}
          </div>
        </header>
        <TheSearch 
          v-on:apply-filter="applyFilter"
          :categories="categories"
        />
        <div v-if="countArticles > 0" class="performance">
          <span>Found {{countArticles}} results in {{ resultTime/1000 }} seconds!</span>
        </div>
        <div v-else class="performance">
          <span>Found no results :(</span>
        </div>
        <main class="articles">
          <ArticlePreview
            v-for="article in articles"
            :id="parseInt(article.id)"
            :key="article.id"
            :title="article.title"
            :slug="article.slug"
            :body="article.body"
            :author="article.author"
            :published_at="article.created_at"
          />
        </main>
      </div>
      <div id="printSection">
        <span v-html="output"></span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ArticlePreview from "@/components/ArticlePreview.vue";
import TheSearch from "@/components/TheSearch.vue";

export default {
...mapActions(['Posts']),
...mapActions(['Categories']),
  name: "Home",
  data() {
    return {
      error: null,
      articles: [],
      categories: [],
      output: null,
      resultTime: 0
    }
  },
  created : function () {
      const searchParams =  {
        search: "",
        category: [],
        order: "desc",
        year: 0
      }
      const init_time = + new Date()
      this.$store.dispatch('GetPosts', searchParams)
        .then(resp => {
          this.articles = this.$store.getters.StatePosts;
          const finish_time = + new Date();
          this.resultTime = finish_time - init_time;
        })
        .catch(err => {
          this.error = true;
        })
      
      this.$store.dispatch('GetCategories')
        .then(resp => {
          this.categories = this.$store.getters.StateCategories;
        })
        .catch(err => {
          this.error = true;
        })
  },
  computed: {
    ...mapGetters({User: 'stateUser' }),
    isLoggedIn : function(){ return this.$store.getters.isLoggedIn },
    countArticles: function() {return this.articles.length},
    countArticlesByMe: function() {
      return this.articles.filter(article => {
        return article.author.id == this.User.id;
      }).length
    },
    currentTime: function() {
      const m = new Date();
      return m.getUTCFullYear() + "-" +
        ("0" + (m.getUTCMonth()+1)).slice(-2) + "-" +
        ("0" + m.getUTCDate()).slice(-2) + " " +
        ("0" + m.getUTCHours()).slice(-2) + ":" +
        ("0" + m.getUTCMinutes()).slice(-2) + ":" +
        ("0" + m.getUTCSeconds()).slice(-2);
    }
  },
  components: {
    ArticlePreview,
    TheSearch
  },
  methods: {
    countArticlesInSpecificYear(year) {
      return this.articles.filter(article => {
        return article.created_at.slice(0,4) == year
      }).length
    },
    print () {
      this.$htmlToPaper('contentToPrint');
    },
    exportToFile() {
      this.$store.dispatch('ExportPosts')
      .then(resp => {
        window.open(`http://localhost:8888/public/reports/${resp.data.data}`);
      })
    },
    applyFilter(searchParams) {
      this.articles = []
      const init_time = + new Date()
      this.$store.dispatch('GetPosts', searchParams)
        .then(resp => {
          this.articles = this.$store.getters.StatePosts;
          const finish_time = + new Date()
          this.resultTime = finish_time - init_time
        })
        .catch(err => {
          this.error = true;
        })
    }
  }
};
</script>

<style scoped>
#contentToPrint {
  display: none;
}

.error {
  position: unset;
  margin-top:1rem;
  border-radius:5px;
}

.home h2 {
  color: #1f1f23;
  margin-bottom: 0.5rem;
}

.articles {
  display: flex;
  flex-wrap: wrap;
}

.link {
  display:inline-block;
  margin-bottom:0.5rem;
  color:#fff;
  border-radius:5px;
}

.new {
  background-color: rgb(57, 161, 116);
}

.new:hover {
  background-color: rgb(57, 161, 116, 0.9);
}

.export {
  background-color: rgb(255, 159, 67);
  color:#000;
}

.export:hover {
  background-color:rgba(255, 159, 67, 0.9);
}

.report {
  background-color: rgb(238, 82, 83);
}

.report:hover {
  background-color: rgba(238, 82, 83, 0.9);
}

.performance {
  padding: 0 0 0.2rem 0.6rem;
}

.performance span {
  color:#4b6372;
  font-size: 0.8125rem;
}
</style>
