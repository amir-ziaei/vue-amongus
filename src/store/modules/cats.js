export default {
    state:{
        cats: []
    },
    getters: {
        StateCats: state => state.cats
    },
    actions: {
        Initialize({ commit }, cats) {
            commit('firstTimeSet', cats)
        },
        Set({ commit }, cats) {
            commit('set', cats)
        }
    },
    mutations: {
        set(state, cats) {
            state.cats = cats;
        },
        firstTimeSet(state, cats) {
            state.cats = [];
            if(typeof cats !== 'undefined' && cats.length > 0)
                cats.forEach(cat => {
                    state.cats.push(cat.id);
                });
        }
    }
}