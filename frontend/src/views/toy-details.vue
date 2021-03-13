
<template>
    <section v-if="toyForDisplay" class="toy-details app-main">
    <section class="toy-details-card">
        <img :src="require(`@/assets/img/${toyForDisplay.url}.png`)" class="toy-img"/>    
        <h2>{{toyForDisplay.name}}</h2>
        <p>Category: {{toyForDisplay.type}}</p>
        <p>In Stock: {{toyForDisplay.inStock}}</p>
        <p>Created at: {{new Date(toyForDisplay.createdAt).toLocaleDateString()}}</p>
        <p>Price: ${{toyForDisplay.price}}</p>
        <router-link to="/toy-app">Back</router-link>

    </section>
    </section>
</template>

<script>

export default {
  name: 'Details',
    computed: {
    toyForDisplay() {
      return this.$store.getters.toyForDetails;
    }
  },
  created() {
    const id = this.$route.params.toyId;
    this.$store.commit({ type: 'getToyForDisplay', id });

  },
}
</script>
