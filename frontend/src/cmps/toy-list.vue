<template>
   <div class="toy-list-container">
        <button><router-link :to="'/toy/edit'"> Add toy </router-link></button>

       <table class="toy-list">
        <tr v-for="toy in toys" :key="toy._id" >
            <td><img :src="require(`@/assets/img/${toy.url}.png`)" class="toy-img"/></td>
            <td><toy-preview :toy="toy" @removeToy="removeToy" /></td>
            <td class="edit-section">
            <button><router-link :toy="toy" :to="'/toy/details/'+toy._id">Details</router-link></button>
            <button><router-link :to="'/toy/edit/'+toy._id">Edit</router-link></button>
            <button @click="removeToy(toy._id)">Remove</button>
            </td>
        </tr>
    </table>



    </div>
</template>

<script>
import toyPreview from '../cmps/toy-preview.vue';
export default {
    props: ['toys'],
   
    data() {
        return {
        }

    },
    methods: {
        removeToy(id) {
            this.$emit('removeToy', id)
        },
 
    },
    components: { toyPreview },
    computed: {},
    created() {
        console.log(this.toys, 'TOYS LIST');
    },
}

</script>



