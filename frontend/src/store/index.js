import Vue from 'vue'
import Vuex from 'vuex'
import { toyService } from '../services/toy.service.js'


Vue.use(Vuex)

export default new Vuex.Store({
    strict: true,
    state: {
        toys: [],
        toyForDisplay: null,
        filterBy: { status: 'all', text: '' },

    },
    getters: {
        toys(state) {
            return state.toys;
        },

        toyForDetails(state) {
            return state.toyForDisplay;
        },

    },

    mutations: {
        setFilter(state, { filterBy }) {
            state.filterBy = filterBy;
        },
        loadToys(state, { toys }) {
            state.toys = toys;
        },
        addToy(state, { toy }) {
            state.toys.unshift(toy);
        },
        updateToy(state, { toy }) {
            const idx = state.toys.findIndex(t => t._id === toy._id);
            state.toys.splice(idx, 1, toy);
        },
        removeToy(state, { id }) {
            let idx = state.toys.findIndex(t => {
                return t._id === id;
            })
            state.toys.splice(idx, 1)
        },
        getToyForDisplay(state, { id }) {
            // console.log(state)
            let idx = state.toys.findIndex(toy => {
                return toy._id === id;
            })
            state.toyForDisplay = state.toys[idx];
            console.log('toyForDisplay', state.toyForDisplay)
        }
    },
    actions: {
        loadToys({ commit }) {
            return toyService.query()
                .then(toys => {
                    // console.log('toys', toys)
                    commit({ type: 'loadToys', toys });
                })
                .catch(err => {
                    console.log(err, 'FAILED TO LOAD');
                })
        },
        saveToy({ commit }, { toy }) {
            const type = toy._id ? 'updateToy' : 'addToy';
            return toyService.save(toy)
                .then(savedToy => {
                    commit({ type, toy: savedToy })
                })
        },
        removeToy(context, { id }) {
            return toyService.remove(id)
                .then(() => {
                    context.commit({ type: 'removeToy', id })
                })
        },

    },
    modules: {}
})