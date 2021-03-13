<template>
  <div id="app">
    <nav>
      <section class="logo-section">
      <div class="logo"></div>
          <h1>Toys</h1>
      </section>
<section class="nav-links">
      <router-link to="/">Home</router-link> |
      <router-link to="/toy-app">Toys</router-link>
</section>
    </nav>
    <router-view/>
  </div>
</template>

