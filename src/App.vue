<script setup lang="ts">
import router from "./router";
const DEFAULT_TRANSITION = "fade";

let transitionName = DEFAULT_TRANSITION;

router.beforeEach(async (to, from, next) => {
  let transitionName = to.meta.transitionName || from.meta.transitionName;

  if (transitionName === "slide") {
    const toDepth = to.path.split("/").length;
    const fromDepth = from.path.split("/").length;
    transitionName = toDepth < fromDepth ? "slide-left" : "slide-right";
  }

  transitionName = transitionName || DEFAULT_TRANSITION;

  next();
});
</script>

<template>
  <div id="app">
    <div class="fixednav lg:flex lg:justify-between sticky top-0 z-99 bg-white">
      <img src="./assets/images/Farmside.png" class="navbar-img" alt="" />
      <div class="flex space-x-4 my-auto mx-4 justify-center">
        <RouterLink
          :to="{ name: 'home' }"
          class="nav-link font-bold p-2 hover:cursor-pointer"
          >Home</RouterLink
        >
        <RouterLink
          :to="{ name: 'photographs' }"
          class="nav-link font-bold py-2 px-2 hover:cursor-pointer"
          >Gallery</RouterLink
        >
        <RouterLink
          :to="{ name: 'book' }"
          class="nav-link font-bold py-2 px-2 hover:cursor-pointer"
          >Book a Shoot</RouterLink
        >
        <!-- <RouterLink
          to="#about"
          class="nav-link font-bold p-2 hover:cursor-pointer"
          >About</RouterLink
        > -->
        <!-- <RouterLink to="/downloads" class="nav-link font-bold py-2 px-4 hover:cursor-pointer">Downloads</RouterLink> -->
      </div>
    </div>
    <div class="content">
      <main class="App__main">
        <router-view v-slot="{ Component, route }">
          <transition
            :name="route.meta.transitionName || transitionName"
            appear
          >
            <component :is="Component" :key="route.path" />
          </transition>
        </router-view>
      </main>
    </div>
  </div>
</template>

<style scoped>
body {
  overflow-x: hidden;
}
[v-cloak] {
  display: none;
}
.navbar {
  background-color: #fff;
}
.content {
  margin-top: 65px;
}

.slide-enter-active,
.slide-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition-duration: 0.5s;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
  overflow: hidden;
}

.slide-enter,
.slide-right-leave-active {
  opacity: 0;
  transform: translate(2em, 0);
}

.slide-leave-active,
.slide-right-enter {
  opacity: 0;
  transform: translate(-2em, 0);
}

.navbar-img {
  width: 300px;
  padding: -10px;
  margin-top: 5px;
}

.nav-link {
  margin-top: -10px;
  font-size: 18px;
  color: #000 !important;
  transition: 0.3s !important;
}
.nav-link:hover {
  font-size: 22px;
  background-color: #259946;
  color: #fff !important;
  padding: 4px;
  border-radius: 4px !important;
}

.show ul {
  background-color: #259946;
}

.nav-link {
  color: #000 !important;
}

.show ul > li {
  color: #000;
  text-align: center;
}

@media (max-width: 980px) {
  .navbar-img {
    width: 260px;
  }
  .nav-link {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0;
  }
  .nav-link:hover {
    background-color: #000;
  }
}

@media (max-width: 580px) {
  .navbar-img {
    width: 100%;
    object-fit: contain;
  }
  .nav-link:hover {
    background-color: #000;
  }
}
</style>
