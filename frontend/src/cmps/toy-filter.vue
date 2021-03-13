<template>
          <form @submit.prevent="setFilter">
            <label for="filter-toys">Filter</label>
            <select @change="setFilter" v-model="filterBy.status" id="filter-toys">
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="done">Done</option>
            </select>
            <label> Search
                <input type="text" @input="setFilter" v-model="filterBy.text">
            </label>

            <button>Search</button>
        </form>

</template>

<script>
import { utilService } from '../services/util.service.js'
export default {

    props: [],
    data() {
        return {
            filterBy: { status: 'all', text: '' }

        }
    },
    methods: {
        setFilter() {
            this.$emit('setFilter', { ...this.filterBy })
        },
        sum(x, y) {
            return x + y;
        }
    },
    components: {},
    computed: {
    },
    created() {
        this.setFilter = utilService.debounce(this.setFilter, 500)
        
    },
}
</script>

<style>

</style>


