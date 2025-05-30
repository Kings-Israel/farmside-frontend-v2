<template>
  <div id="home">
    <brand id="brand" />
    <about id="about" />
    <portfolio id="portfolio" />
    <contacts id="contact" />
    <bottom-page id="bottom-page" />
  </div>
</template>

<script setup lang="ts">
import About from "../components/About.vue";
import Brand from "../components/Brand.vue";
import Contacts from "../components/Contacts.vue";
import Portfolio from "../components/Portfolio.vue";
import BottomPage from "../components/BottomPage.vue";
</script>

<style>
* {
  transition: 0.5s;
}

[v-cloak] {
  display: none;
}
html {
  scroll-behavior: smooth;
  scroll-padding-top: 60px;
}
#home {
  scroll-margin-top: 10px;
}
#section-header h1 {
  font-weight: bold;
  display: flex;
  justify-content: center;
}
</style>
