<template>
  <div class="app-main">
      <section class="toy-app">
            <toy-filter @setFilter="setFilter" />
            <toy-list 
                @removeToy="removeToy" 
                :toys="toys" 
            />
        </section>
  </div>
</template>

<script>
import toyList from '../cmps/toy-list.vue'
import toyFilter from '../cmps/toy-filter.vue'
import { showMsg } from '../services/eventBus.service.js'

export default {
 
    computed: {
        toys() {
            return this.$store.getters.toys
        },
          },
    methods: {
        removeToy(id) {
            this.$store.dispatch({ type: 'removeToy', id })
                .then(() => {
                    showMsg('Toy removed!', 'success')
                }).catch((err) => {
                    showMsg('Cannot remove toy', 'danger')
                })
        },
        setFilter(filterBy) {
            this.$store.commit({ type: 'setFilter', filterBy })
        },
      
    },
    created() {
        this.$store.dispatch({ type: 'loadToys' })
            .then(() => {
                showMsg('Toys loaded successfully', 'success')
                
            }).catch((err) => {
                showMsg('Cannot load toys', 'danger')
            })
    },
    components: {
        toyFilter,
        toyList,
    }
}
</script>
