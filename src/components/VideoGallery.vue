<template>
  <div class="container mb-5" id="videos-gallery">
    <div
      v-for="type in filteredVideoshootTypes"
      :key="type"
    >
      <h3>{{ type }}</h3>
      <vueper-slides
        :breakpoints="breakpoints"
      :bullets="false"
      class="no-shadow"
      arrows-outside
      fixed-height="640px"
      >
        <vueper-slide
          v-for="(slide, i) in categorizedVideos[type]"
          :key="`${type}-${i}`"
          :video="slide.video"
          style="border-radius: 5px"
        />
      </vueper-slides>
    </div>
    <!-- <h3>Birthdays</h3>
    <vueper-slides
      :breakpoints="breakpoints"
      :bullets="false"
      class="no-shadow"
      arrows-outside
      fixed-height="640px"
    >
      <vueper-slide
        v-for="(slide, i) in carouselVideos"
        :key="i"
        :video="slide.video"
      />
    </vueper-slides>
    <br />
    <hr />
    <h3>Graduations</h3>
    <vueper-slides
      :breakpoints="breakpoints"
      :bullets="false"
      class="no-shadow"
      arrows-outside
      fixed-height="640px"
    >
      <vueper-slide
        v-for="(slide, i) in carouselVideos"
        :key="i"
        :video="slide.video"
      />
    </vueper-slides>
    <br />
    <hr />
    <h3>Music Videos</h3>
    <vueper-slides
      :breakpoints="breakpoints"
      :bullets="false"
      class="no-shadow"
      arrows-outside
      fixed-height="640px"
    >
      <vueper-slide
        v-for="(slide, i) in carouselVideos"
        :key="i"
        :video="slide.video"
      />
    </vueper-slides> -->
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, reactive } from "vue";
import { VueperSlides, VueperSlide } from "vueperslides";
import { http } from "../lib/axios";

const videoshootTypes = [
  "Studio Videoshoots",
  "Outdoor Videoshoots",
  "Events",
  "Birthdays",
  "Graduations",
  "Weddings",
  "Funerals",
  "Baby Showers",
  "Other",
];

const videoLinks = ref<string[]>([]);

const carouselVideos = [
  {
    title: "Aurora Borealis",
    content:
      "This Youtube video has params in the URL and extra attributes on the iframe.",
    image: "https://i.ytimg.com/vi_webp/T75IKSXVXlc/maxresdefault.webp",
    video: {
      url: "https://www.youtube.com/embed/T75IKSXVXlc?rel=0&showinfo=0&controls=0&fs=0&modestbranding=1&color=white&iv_load_policy=3&autohide=1&enablejsapi=1",
      props: {
        allow:
          "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture",
      },
    },
  },
  {
    title: "Fjords",
    content: "This video can't be interacted with.",
    image: "https://i.ytimg.com/vi/2sr9MGkkeks/maxresdefault.jpg",
    video: {
      url: "https://www.youtube.com/embed/2sr9MGkkeks?controls=0&fs=0&modestbranding=1&color=white&iv_load_policy=3&autohide=1&enablejsapi=1",
      props: {
        allow: "autoplay",
      },
      pointerEvents: false,
    },
  },
  // {
  //     title: "24 in 254 Ep 4",
  //     content: "24 in 254 Ep 4",
  //     video: {
  //         url: 'https://www.youtube.com/embed/wz092iZFP-s?si=Gw6mEwxYSoTWTS56',
  //         props: {
  //             allow: 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
  //          }
  //     }
  // },
  // {
  //     title: "24 in 254 Ep 3",
  //     content: "24 in 254 Ep 3",
  //     video: {
  //         url: 'https://www.youtube.com/embed/W6MuhsnZBaA?si=aNT689i9bw4_TIBF',
  //         props: {
  //             allow: 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
  //          }
  //     }
  // },
  // {
  //     title: "Man of Valor",
  //     content: "Man of Valor",
  //     video: {
  //         url: "https://www.youtube.com/embed/N4cPSpLTNe8?si=OgCdt2vojccQi1I2",
  //         props: {
  //             allow: 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
  //          }
  //     }
  // },
  // {
  //     title: "Minions4",
  //     content: "Minions 4",
  //     video: {
  //         url: 'https://www.youtube.com/embed/zToczpO0FJ4?si=LCoLdxm8SBAKApeM',
  //         props: {
  //             allow: 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
  //          }
  //     }
  // },
];

const studioVideos = [
  {
    video: {
      url: "https://www.youtube.com/embed/T75IKSXVXlc?rel=0&showinfo=0&controls=0&fs=0&modestbranding=1&color=white&iv_load_policy=3&autohide=1&enablejsapi=1",
      props: {
        allow:
          "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture",
      },
    },
  },
];

const outdoorVideos = [
  {
    video: {
      url: "https://www.youtube.com/embed/2sr9MGkkeks?controls=0&fs=0&modestbranding=1&color=white&iv_load_policy=3&autohide=1&enablejsapi=1",
      props: {
        allow: "autoplay",
      },
      pointerEvents: false,
    },
  },
];

const weddingVideos = [
  {
    video: {
      url: "https://www.youtube.com/embed/wz092iZFP-s?si=Gw6mEwxYSoTWTS56",
      props: {
        allow:
          "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture",
      },
    },
  },
];

const categorizedVideos = reactive<Record<string, Array<{ video: any }>>>({});
videoshootTypes.forEach((type) => {
  categorizedVideos[type] = [];
});

categorizedVideos["Studio Videoshoots"] = [...studioVideos];
categorizedVideos["Outdoor Videoshoots"] = [...outdoorVideos];
categorizedVideos["Events"] = [...weddingVideos];

const filteredVideoshootTypes = computed(() =>
  videoshootTypes.filter((type) => categorizedVideos[type]?.length)
);

const getCategoryFromLink = (link: string) => {
  const normalizedLink = link.toLowerCase();

  for (const type of videoshootTypes) {
    if (type === "Other") {
      continue;
    }

    const typeWords = type.toLowerCase().split(/\s+/).filter(Boolean);
    if (typeWords.some((word) => normalizedLink.includes(word))) {
      return type;
    }
  }

  return "Other";
};

const fetchVideos = () => {
  http
    .get("web-media?page=Portfolio&type=video")
    .then((res) => {
      res.data.forEach((item: any) => {
        if (!item.link) {
          return;
        }

        videoLinks.value.push(item.link);

        const category = getCategoryFromLink(item.link);
        categorizedVideos[category].push({ video: item.link });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

onMounted(() => {
  fetchVideos();
});

const breakpoints = {
  980: {
    slideRatio: 1 / 5,
    visibleSlides: "1",
    fixedHeight: "390px",
  },
  580: {
    visibleSlides: "1",
    fixedHeight: "370px",
    arrowsInside: true,
  },
};
</script>

<style scoped>
#videos-gallery {
  margin-bottom: 70px;
  width: min(1360px, calc(100% - 40px));
}

h3 {
  color: #101412;
  font-size: clamp(1.4rem, 3vw, 2.2rem);
  font-weight: 900;
  margin: 34px 0 16px;
}
</style>
