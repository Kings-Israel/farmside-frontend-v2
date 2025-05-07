import { createRouter, createMemoryHistory } from 'vue-router'

import Home from './views/Home.vue'
import Book from './views/Book.vue'
import Gallery from './views/Gallery.vue'
import Downloads from './views/Downloads.vue'
import PhotoGallery from './components/PhotoGallery.vue'
import VideoGallery from './components/VideoGallery.vue'

const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
        meta: {
            transitionName: 'fade'
        }
    },
    {
        path: "/book",
        name: "book",
        component: Book,
        meta: {
            transitionName: 'fade'
        }
    },
    {
        path: '/downloads',
        name: 'downloads',
        component: Downloads,
        meta: {
            transitionName: 'fade'
        }
    },
    {
        path: "/gallery",
        name: "gallery",
        component: Gallery,
        meta: {
            transitionName: 'fade'
        },
        children: [
            {
                path: "/photographs",
                name: "photographs",
                component: PhotoGallery,
                meta: {
                    transitionName: 'fade'
                }
            },
            {
                path: "/videos",
                name: "videos",
                component: VideoGallery,
                meta: {
                    transitionName: 'fade'
                }
            }
        ]
    }
]

const router = createRouter({
    history: createMemoryHistory(),
    routes
})

export default router