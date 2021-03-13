<template>
   <section v-if="toyToEdit" class="toy-edit app-main">
        <form @submit.prevent="submitToy">
            <input type="text" placeholder="Toy Title:" v-model="toyToEdit.name">
            <input type="text" placeholder="Category:" v-model="toyToEdit.type">
            <input type="number" placeholder="Price" v-model.number="toyToEdit.price">
            <button>Save</button>
        </form>
   </section>
   
</template>

<script>
import { toyService } from '../services/toy.service.js'
import { showMsg } from '../services/eventBus.service.js'
export default {
   
    data() {
        return {
            toyToEdit: null
        }
    },
    methods: {
        setToyToSave(id) {
            toyService.getById(id).then(toy => {
                this.toyToEdit = toy
                console.log('toy to edit:',this.toyToEdit)
            })
        },
        submitToy() {
            this.$store.dispatch({ type: 'saveToy', toy: JSON.parse(JSON.stringify(this.toyToEdit))})
                .then(() => {
                    this.$router.push('/toy-app')
                    showMsg('Toy Added', 'success')
                })
                .catch(() => {
                    showMsg('Cannot set toy', 'danger')
                })
            this.$store.commit({ type: 'updateToy', toy: JSON.parse(JSON.stringify(this.toyToEdit))});
                        this.toyToEdit = toyService.getEmptyToy()

        }
    },
    computed: {
 
    },
    created() {
        const id = this.$route.params.toyId
        if (!id) {
            this.toyToEdit = toyService.getEmptyToy()
            console.log('toytoedit',this.toyToEdit);
        } else {
            this.setToyToSave(id)
        }

    },
    
}
</script>

