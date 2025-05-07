<template>
    <div id="gallery">
        <div id="section-header">
            <h1 id="gallery">Gallery</h1>
        </div>
        <div class="gallery-links">
            <router-link class="gallery-link" :to="{name: 'photographs'}">
                <IconCamera size="48" />
            </router-link>
            <router-link class="gallery-link" :to="{name: 'videos'}">
                <IconVideo size="48" />
            </router-link>
        </div>

        <main class="App__main">
            <router-view v-slot="{ Component, route }">
                <transition :name="route.meta.transition || transitionName">
                    <component :is="Component" />
                </transition>
            </router-view>
        </main>
        <bottom-page />
    </div>
</template>

<script setup lang="ts">
import { onBeforeRouteLeave } from 'vue-router';
import BottomPage from '../components/BottomPage.vue';
import { IconCamera, IconVideo } from '@tabler/icons-vue';
const DEFAULT_TRANSITION = "fade"

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

// export default {
//   components: {BottomPage },
//     name: "Gallery",
//     data() {
//         return {
//             transitionName: DEFAULT_TRANSITION,
//         }
//     },
//     created() {
//     this.$router.beforeEach((to, from, next) => {
//       let transitionName = to.meta.transitionName || from.meta.transitionName

//       if(transitionName === 'slide') {
//         const toDepth = to.path.split('/').length
//         const fromDepth = from.path.split('/').length
//         transitionName = toDepth < fromDepth ? 'slide-left' : 'slide-right'
//       }

//       this.transitionName = transitionName || DEFAULT_TRANSITION

//       next()
//     })
//   },
// }
</script>

<style scoped>
.gallery-links {
    display: flex;
    justify-content: center;
}

.gallery-link {
    text-decoration: none;
    color: #000;
    padding: 5px 5px 0px;
    margin-bottom: 0;
}

.gallery-link:hover {
    background-color: rgb(61, 61, 61);
    color: #fff;
    border-radius: 5px;
}
</style>