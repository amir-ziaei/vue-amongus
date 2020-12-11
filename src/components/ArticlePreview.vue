<template>
    <div>
      <article class="article">
        <header>
            <router-link :to="{ name: 'Article', params: { slug: slug } }">
                <img :src="thumbnail" width="150" height="150" alt="Article Thumbnail" :title="title" />
            </router-link>
        </header>
        <main>
            <h2>
              <router-link :to="{ name: 'Article', params: { slug: slug } }">
                  {{ title }}
              </router-link>
            </h2>
            <p>
              {{ body.substring(0,150) }}
              <router-link :to="{ name: 'Article', params: { slug: slug } }">
                [...]
              </router-link>
            </p>
        </main>
        <footer>
            <p>
              Written by <a href="#">{{ author.name }}</a>
            </p>
            <span>{{dateDiff}}</span>
        </footer>
      </article>
    </div>
</template>

<script>
export default {
    name: "ArticlePreview",
    props: {
      id: Number,
      title: String,
      slug: String,
      body: String,
      author: undefined,
      published_at: String,
    },
    computed: {
      thumbnail() {
        const imgId = (this.id%4) + 1;
        return require(`@/assets/crew${imgId}.png`)
      },
      dateDiff() {
        const publishedDate = new Date(this.published_at);
        const m = new Date();
        const now = new Date(m.getUTCFullYear() +"/"+ (m.getUTCMonth()+1) +"/"+ m.getUTCDate() + " " + m.getUTCHours() + ":" + m.getUTCMinutes() + ":" + m.getUTCSeconds());
        const diff = Math.floor(now - publishedDate);
        
        const oneMinute = 1000 * 60; // ms
        const oneHour = oneMinute * 60;
        const oneDay = oneHour * 24;
        const oneWeek = oneDay * 7;
        const oneMonth = oneWeek * 4;
        const oneYear = oneMonth * 12;

        let output;

        if(diff < oneMinute) { // < one minute
          output = "Just now";
        } else if(diff < oneHour) { // < one hour
          output = Math.floor(diff / oneMinute) + " mins ago";
        } else if(diff < oneDay) { // < one day
          output = Math.floor(diff / oneHour) + " hours ago";
        } else if (diff < oneWeek) { // < one week
          output = Math.floor(diff / oneDay) + " days ago";
        } else if (diff < oneMonth) { // < one month
          output = Math.floor(diff / oneWeek) + " weeks ago";
        } else if (diff < oneYear) { // < month year
          output = Math.floor(diff / oneMonth) + " months ago";
        } else {                    // > one year
          output = Math.floor(diff / oneYear) + " years ago";
        }

        return output;

      }
    }
}
</script>

<style scoped>
div {
  flex-basis: 100%;
  flex-grow: 1;
  flex-shrink: 0;
  padding:0.3rem;
  box-sizing: border-box;
}

.article {
  background: #fff;
  border-radius: 5px;
  padding:1rem;
}

.article header {
  display: flex;
  justify-content: center;
}

.article h2 a {
  font-size: 1.3rem;
  color: #000;
}

.articles a {
  color: #40B381;
}

.article footer {
  font-size: 0.7rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #888;
}
</style>