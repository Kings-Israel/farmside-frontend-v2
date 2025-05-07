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
import About from '../components/About.vue'
import Brand from '../components/Brand.vue'
import Contacts from '../components/Contacts.vue'
import Portfolio from '../components/Portfolio.vue'
import BottomPage from '../components/BottomPage.vue'

import { onBeforeRouteLeave } from 'vue-router'
const DEFAULT_TRANSITION = "fade";

let transitionName = DEFAULT_TRANSITION

onBeforeRouteLeave((to, from) => {
  let transitionName = to.meta.transitionName || from.meta.transitionName
  
  if(transitionName === 'slide') {
    const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      transitionName = toDepth < fromDepth ? 'slide-left' : 'slide-right'
    }

    transitionName = transitionName || DEFAULT_TRANSITION

    // next()
})
</script>

<style>
* {
  transition: .5s;
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
