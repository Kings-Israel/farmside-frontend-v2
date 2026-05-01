<script setup lang="ts">
import router from "./router";

const DEFAULT_TRANSITION = "fade";
let transitionName = DEFAULT_TRANSITION;

router.beforeEach(async (to, from, next) => {
  let nextTransition = to.meta.transitionName || from.meta.transitionName;

  if (nextTransition === "slide") {
    const toDepth = to.path.split("/").length;
    const fromDepth = from.path.split("/").length;
    nextTransition = toDepth < fromDepth ? "slide-left" : "slide-right";
  }

  transitionName = nextTransition || DEFAULT_TRANSITION;
  next();
});
</script>

<template>
  <div id="app">
    <notifications />
    <header class="site-header">
      <RouterLink :to="{ name: 'home' }" class="brand-link" aria-label="Farmside Media home">
        <img src="./assets/images/Farmside.png" class="navbar-img" alt="Farmside Media" />
      </RouterLink>
      <nav class="site-nav" aria-label="Primary navigation">
        <RouterLink :to="{ name: 'home' }" class="nav-link">Home</RouterLink>
        <RouterLink :to="{ name: 'photographs' }" class="nav-link">Gallery</RouterLink>
        <RouterLink :to="{ name: 'book' }" class="nav-link nav-link--cta">
          Book a Shoot
        </RouterLink>
      </nav>
    </header>
    <main class="App__main">
      <router-view v-slot="{ Component, route }">
        <transition :name="route.meta.transitionName || transitionName" appear>
          <component :is="Component" :key="route.path" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<style scoped>
.site-header {
  align-items: center;
  backdrop-filter: blur(18px);
  background: rgba(9, 14, 11, 0.88);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  gap: 24px;
  justify-content: space-between;
  min-height: 76px;
  padding: 10px clamp(16px, 4vw, 56px);
  position: sticky;
  top: 0;
  z-index: 999;
}

.brand-link {
  display: inline-flex;
  min-width: 180px;
}

.navbar-img {
  display: block;
  height: 52px;
  object-fit: contain;
  width: 240px;
}

.site-nav {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: end;
}

.nav-link {
  border-radius: 6px;
  color: rgba(255, 255, 255, 0.78);
  font-size: 0.95rem;
  font-weight: 800;
  padding: 10px 14px;
  text-decoration: none;
}

.site-nav > .nav-link:hover,
.site-nav > .router-link-active {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.1);
}

.nav-link--cta {
  background: #2fb85e;
  color: #061008;
}

.nav-link--cta:hover,
.nav-link--cta.router-link-active {
  background: #9fe6b3;
  color: #061008;
}

.slide-enter-active,
.slide-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition-duration: 0.4s;
  transition-property: opacity, transform;
  transition-timing-function: ease;
  overflow: hidden;
}

.slide-enter,
.slide-right-leave-active {
  opacity: 0;
  transform: translate(20px, 0);
}

.slide-leave-active,
.slide-right-enter {
  opacity: 0;
  transform: translate(-20px, 0);
}

@media (max-width: 700px) {
  .site-header {
    align-items: stretch;
    flex-direction: column;
    gap: 8px;
  }

  .brand-link {
    justify-content: center;
  }

  .navbar-img {
    width: min(100%, 280px);
  }

  .site-nav {
    justify-content: center;
  }
}
</style>
