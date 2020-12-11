<template>
    <div v-if="categories" class="form-group wrap" v-bind:class="{'column form-vertical': view == 'vertical', 'row': view == 'horizontal form-horizontal'}">
        <header>
            <label class="form__label">Categories: </label> <a class="modify-link" v-on:click="modifyMode = ! modifyMode">(Modify)</a>
        </header>
        <div v-bind:class="{'row cat-holder': view == 'horizontal'}">
            <div v-bind:class="{'reverse': view == 'horizontal'}" >
                <form v-on:submit.prevent v-on:change="emit" autocomplete="off">
                    <div v-bind:class="{'wrap': view == 'horizontal'}">
                        <div class="checkbox-group" v-for="category in categories" :key="category.id">
                            <span @click="deleteCat(category.id)" v-if="modifyMode">❌</span>
                            <input v-else :id="category.title" type="checkbox" :value="category.id" v-model="cat">
                            <label :for="category.title" class="form__label">{{ category.title }}</label>
                        </div>
                    </div>
                    <div v-if="modifyMode">
                        <input placeholder="New Category" class="form__input" v-model="category" />
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    props: {
        categories: Array,
        selectedCategories: Array,
        view: String
    },
    data() {
        return {
            modifyMode: 0,
            category: ""
        }
    },
    created: function () {
        this.$store.dispatch('Initialize', this.selectedCategories);
    },
    computed: {
        ...mapGetters({cats: 'StateCats'}),
        ...mapActions({newCat: 'newCat'}),
        cat: {
           get(){
                return this.cats
           },
           set(checkbox){
                this.$store.dispatch('Set', checkbox)
           } 
        }
    },
    methods: {
        emit() {
            if(this.category == "") {
                this.$emit('category-selected', this.cats);
            } else {
                this.$emit('category-new', this.category);
                this.category = "";
            }
        },
        deleteCat(id) {
            this.$emit('category-deleted', id);
        }
    }
}
</script>

<style scoped>
.checkbox-group {
    display:flex;
    margin-left:0.2rem;
    align-items: center;
}

header {
    margin-bottom:0.3rem;
}

header label {
    margin-left: 0 !important;
}

.row {
    flex-direction: row;
    display: flex;
}

.column {
    flex-direction: column;
    display: flex;
}

.wrap {
    flex-wrap: wrap;
    display: flex;
}

.cat-holder {
    margin-top:0.1rem;
}

.cat-holder .form__label {
    margin-left: 0.5rem;
    margin-right: 0.2rem;

}

.form-group {
    display: flex;
    flex-direction: column;
    margin-top:0.5rem;
}

.form__label {
    font-size: 0.8125rem;
    color: #4b6372;
    margin: 0.2rem 0 0.2rem 0.5rem;
}

.modify-link {
    color:#2b9768;
    font-size: 0.7rem;
    margin-left:0.3rem;
    cursor: pointer;
}

.form__input {
    font-size: 0.6rem;
    color: #374853;
    line-height: 1.5rem;
    min-height: 1.5rem;
    border: 1px solid #E8E8E8;
    border-radius: 5px;
    background: #fff;
    padding: 0 0.3rem;
    transition: border .1s ease;
    box-sizing: border-box;
    outline:0;
}

button {
    background: transparent;
    outline: 0;
    border: 0;
    padding:0;
    margin: 0;
    cursor: pointer;
}
input {
    margin: 0;
}
</style>