<template>
   <div class="toy-preview" v-if="toy">
        {{toy.name}}
        <br>
        ${{toy.price}}
        <!-- <router-link :to="'/tosy/details/'+toy._id">Details</router-link>
        <router-link :to="'/toy/edit/'+toy._id">Edit</router-link>
        <button @click="remove(toy._id)">x</button> -->
    </div>
</template>

<script>
export default {
    props: ['toy'],

    methods:
    {
        remove(id) {
            this.$emit('removeToy', id)
        },
       
    }
}
</script>
