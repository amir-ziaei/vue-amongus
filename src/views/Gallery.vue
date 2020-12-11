<template>
  <div class="gallery">
    <vue-headful
            title="Among Us – Gallery"/>
    <h2>Gallery</h2>
    <main>
        <p class="cats">
          
          <GalleryCat 
                      v-for="cat in cats"
                      :key="cat.id"
                      v-on:apply-filter="applyFilter"
                      :id="cat.id"
                      :name="cat.name"
                      :color="cat.color"
                      :enabled="cat.is_enabled" />
        </p>
        <div class="images">
          <img src="../assets/1.jpg">
          <img src="../assets/1.jpg">
          <img src="../assets/1.jpg">
        </div>
    </main>
  </div>
</template>

<script>
import GalleryCat from "@/components/GalleryCat.vue";

export default {
  name: "Gallery",
  data() {
    return {
      cats: [
        {
          id: 1,
          name: 'All',
          color: '#2c3e50',
          is_enabled: true
        },
        {
          id: 2,
          name: 'Nature',
          color: '#4f27dd',
          is_enabled: false
        },
        {
          id: 3,
          name: 'Animals',
          color: '#f14c4c',
          is_enabled: false
        },
        {
          id: 4,
          name: 'Cars',
          color: '#3fc380',
          is_enabled: false
        },
        {
          id: 5,
          name: 'People',
          color: '#f1c40f',
          is_enabled: false
        }]
    }
  },
  components: {
    GalleryCat
  },
  methods: {
    applyFilter(id) {
      if(id == 1) { /* "All" selected */
        // Uncheck the other categories
        // Then select "All"
        const catsExceptAll = this.cats.filter((value, index) => 0 !== index);
        catsExceptAll.forEach(cat => {
            cat.is_enabled = false;
        });
        this.cats[0].is_enabled = true;
        return;
      }
      /* Else */

      // Select the clicked cat
      const cat = this.cats.find(cat => cat.id == id);
      cat.is_enabled = ! cat.is_enabled;

      let count_of_cats = this.cats.length - 1;
      let count_of_selected = this.cats.filter(cat => cat.is_enabled === true && cat.id != 1).length;

      // If all the cats are selected OR none of the cats are selected
      if(count_of_cats == count_of_selected || count_of_selected == 0)
      {
        // Then => Turn on "All"
        this.cats[0].is_enabled = true;
      }
      else
      {
        // Else => Turn off "All"
        this.cats[0].is_enabled = false;
      }

    },
  }
}
</script>

<style scoped>
.cats {
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}
.images {
  background-color: transparent;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(268px, 1fr));
  grid-column-gap: 0.5rem;
  grid-row-gap: 0.5rem;
}
.images img {
  width: 100%;
  object-fit: cover;
  place-self: stretch;
}
</style>
