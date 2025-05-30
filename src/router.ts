import { createRouter, createMemoryHistory } from "vue-router";

import Home from "./views/Home.vue";
import Book from "./views/Book.vue";
import Gallery from "./views/Gallery.vue";
import Downloads from "./views/Downloads.vue";
import PhotoGallery from "./components/PhotoGallery.vue";
import VideoGallery from "./components/VideoGallery.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      transitionName: "slide",
    },
  },
  {
    path: "/book",
    name: "book",
    component: Book,
    meta: {
      transitionName: "slide",
    },
  },
  {
    path: "/downloads",
    name: "downloads",
    component: Downloads,
    meta: {
      transitionName: "slide",
    },
  },
  {
    path: "/gallery",
    name: "gallery",
    component: Gallery,
    meta: {
      transitionName: "slide",
    },
    children: [
      {
        path: "/photographs",
        name: "photographs",
        component: PhotoGallery,
        meta: {
          transitionName: "slide",
        },
      },
      {
        path: "/videos",
        name: "videos",
        component: VideoGallery,
        meta: {
          transitionName: "slide",
        },
      },
    ],
  },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
