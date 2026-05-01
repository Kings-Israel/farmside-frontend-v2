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
[v-cloak] {
  display: none;
}
html {
  scroll-behavior: smooth;
  scroll-padding-top: 76px;
}
#home {
  scroll-margin-top: 10px;
}
</style>
