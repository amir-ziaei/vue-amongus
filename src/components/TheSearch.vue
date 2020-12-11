<template>
<form id="search" @submit.prevent v-on:change="submit" autocomplete="off">
    <div class="form-group">
      <label for="search" class="form__label">Search</label>
      <input id="search" class="form__input" v-model="searchBar" />
    </div>
    <div class="form-group row">
        <div class="form-group row wrap">
           <div class="checkbox-group" v-for="category in categories" :key="category.id">
            <input :id="category.title" type="checkbox" :value="category.title" v-model="cat">
            <label :for="category.title" class="form__label">{{ category.title }}</label>
           </div>
        </div>
        <div class="row self-end">
          <div class="form-group row">
            <select class="form__input" name="year" id="year" v-model="year">
              <option disabled selected value="0">----</option>
              <option value="2020">2020</option>
              <option value="2019">2019</option>
              <option value="2018">2018</option>
            </select>
          </div>
          <div class="form-group row">
            <select class="form__input" name="order" id="order" v-model="order">
              <option value="desc" selected>Desc</option>
              <option value="asc">Asc</option>
            </select>
          </div>
        </div>
    </div>
</form>
</template>

<script>
export default {
  name: "TheSearch",
  props: {
    categories: Array
  },
  data() {
    return {
      searchBar: "",
      cat: [],
      order: "desc",
      year: 0
    }
  },
  methods: {
    submit() {
      const searchParams =  {
        search: this.searchBar,
        category: this.cat,
        order: this.order,
        year: this.year
      }
      this.$emit("apply-filter",searchParams);
    },
  }
};
</script>

<style scoped>
#search {
  padding: 0.3rem;
}

#search {
  display:flex;
  flex-direction: column;
}

.form-group {
  display:flex;
  flex-direction: column;
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

.row {
  flex-direction: row;
  justify-content: space-between;
  display: flex;
}

.wrap {
  flex-wrap: wrap;
}

.self-end {
  align-self: flex-end;
}

.checkbox-group {
  padding: 0.5rem 0.5rem 0 0;
  display: flex;
  align-items: center;
}

.checkbox-group:first-child {
  padding-left:0;
}

.checkbox-group label {
  position: relative;
  top:0.15rem;
}

.form-group select {
  font-size: 0.7rem;
  padding:0.5rem 0.3rem;
  line-height: 1;
  min-height: auto;
  margin: 0.1rem 0;
  outline: 0;
}
</style>
