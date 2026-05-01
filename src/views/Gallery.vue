<template>
  <div id="gallery">
    <section class="gallery-hero">
      <p class="section-kicker">Gallery</p>
      <h1>Browse the Farmside visual archive.</h1>
    </section>
    <div class="gallery-links">
      <router-link class="gallery-link" :to="{ name: 'photographs' }">
        <IconCamera size="48" />
      </router-link>
      <router-link class="gallery-link" :to="{ name: 'videos' }">
        <IconVideo size="48" />
      </router-link>
    </div>

    <main class="App__main">
      <router-view v-slot="{ Component }">
        <transition :name="transitionName">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <bottom-page />
  </div>
</template>

<script setup lang="ts">
import BottomPage from "../components/BottomPage.vue";
import { IconCamera, IconVideo } from "@tabler/icons-vue";

const transitionName = "slide";

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
#gallery {
  background: #f6f7f1;
}

.gallery-hero {
  background:
    linear-gradient(90deg, rgba(7, 13, 10, 0.92), rgba(7, 13, 10, 0.44)),
    url("https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1800&q=85") center/cover;
  color: #ffffff;
  padding: 90px clamp(20px, 4vw, 72px) 70px;
}

.section-kicker {
  color: #9fe6b3;
  font-size: 0.92rem;
  font-weight: 900;
  letter-spacing: 0.14em;
  margin-bottom: 14px;
  text-transform: uppercase;
}

h1 {
  font-size: clamp(2.3rem, 6vw, 5rem);
  font-weight: 900;
  line-height: 1;
  margin: 0;
  max-width: 820px;
}

.gallery-links {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin: -28px auto 36px;
  position: relative;
  z-index: 2;
}

.gallery-link {
  align-items: center;
  background: #ffffff;
  border: 1px solid rgba(16, 20, 18, 0.1);
  border-radius: 8px;
  box-shadow: 0 14px 40px rgba(16, 20, 18, 0.12);
  color: #101412;
  display: inline-flex;
  height: 64px;
  justify-content: center;
  text-decoration: none;
  width: 76px;
}

.gallery-link:hover {
  background-color: #2fb85e;
  color: #061008;
}
</style>
