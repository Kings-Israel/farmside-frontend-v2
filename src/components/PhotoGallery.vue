<template>
  <div id="photographs-gallery">
    <div
      v-for="type in filteredPhotoshootTypes"
      :key="type"
    >
      <h3>{{ type }}</h3>
      <vueper-slides
        autoplay
        :breakpoints="breakpoints"
        pauseOnHover
        class="no-shadow"
        :visible-slides="4"
        :bullets="false"
        :gap="1"
        :touchable="false"
        fixed-height="420px"
      >
        <vueper-slide
          v-for="(slide, i) in categorizedImages[type]"
          :key="`${type}-${i}`"
          :image="slide.image"
          style="border-radius: 5px"
        />
      </vueper-slides>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from "vue";
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";
import { http } from "../lib/axios";

const photoshootTypes = [
  "Studio Photoshoots",
  "Outdoor Photoshoots",
  "Events",
  "Birthdays",
  "Graduations",
  "Weddings",
  "Funerals",
  "Baby Showers",
  "Other",
];

const imageLinks = ref<string[]>([]);

const studioShoots = [
  {
    image:
      "https://images.unsplash.com/photo-1469460340997-2f854421e72f?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDIzfHRvd0paRnNrcEdnfHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
  },
  {
    image:
      "https://images.unsplash.com/photo-1599950613686-b6346036b8dd?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDIxfHRvd0paRnNrcEdnfHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
  },
  {
    image:
      "https://images.unsplash.com/photo-1614283232994-7f56849e2359?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDI4fHRvd0paRnNrcEdnfHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
  },
  {
    image:
      "https://images.unsplash.com/photo-1613506543439-e31c1e58852b?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDMwfHRvd0paRnNrcEdnfHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
  },
  {
    image:
      "https://images.unsplash.com/photo-1614174568206-7620823e6aee?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDM3fHRvd0paRnNrcEdnfHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
  },
  {
    image:
      "https://images.unsplash.com/photo-1614181861555-e1faa52ef45a?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDUzfHRvd0paRnNrcEdnfHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
  },
  {
    image:
      "https://images.unsplash.com/photo-1604967006400-c0606b8f425d?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDc1fHRvd0paRnNrcEdnfHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
  },
  {
    image:
      "https://images.unsplash.com/photo-1560344826-8ede425511aa?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDgxfHRvd0paRnNrcEdnfHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
  },
];
const outdoorShoots = [
  {
    image:
      "https://images.unsplash.com/photo-1544737593-0e686eaeb328?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDU4fHRvd0paRnNrcEdnfHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
  },
  {
    image:
      "https://images.unsplash.com/photo-1567097971008-a7100aa639b8?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDYwfHRvd0paRnNrcEdnfHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
  },
  {
    image:
      "https://images.unsplash.com/photo-1549853230-b66d322703fe?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDYyfHRvd0paRnNrcEdnfHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
  },
  {
    image:
      "https://images.unsplash.com/photo-1605506582235-d62e6a469124?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDY4fHRvd0paRnNrcEdnfHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
  },
  {
    image:
      "https://images.unsplash.com/photo-1505765052322-75804bb2e5f1?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDcwfHRvd0paRnNrcEdnfHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
  },
  {
    image:
      "https://images.unsplash.com/photo-1508205065970-cad01cebebb4?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDcyfHRvd0paRnNrcEdnfHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
  },
  {
    image:
      "https://images.unsplash.com/photo-1613889845660-99b5754aecf1?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDc2fHRvd0paRnNrcEdnfHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
  },
  {
    image:
      "https://images.unsplash.com/photo-1614090839833-b25fe1dd0e57?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDc5fHRvd0paRnNrcEdnfHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
  },
];
const weddingShoots = [
  {
    image:
      "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NHx8d2VkZGluZ3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
  },
  {
    image:
      "https://images.unsplash.com/photo-1541250848049-b4f7141dca3f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8N3x8d2VkZGluZ3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
  },
  {
    image:
      "https://images.unsplash.com/photo-1509927083803-4bd519298ac4?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTV8fHdlZGRpbmd8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
  },
  {
    image:
      "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTh8fHdlZGRpbmd8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
  },
  {
    image:
      "https://images.unsplash.com/photo-1537907690979-ee8e01276184?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTd8fHdlZGRpbmd8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
  },
  {
    image:
      "https://images.unsplash.com/photo-1580151134699-e0cfbeb763d3?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjF8fHdlZGRpbmd8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
  },
  {
    image:
      "https://images.unsplash.com/photo-1548765015-1e047ff5c9e9?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjV8fHdlZGRpbmd8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
  },
  {
    image:
      "https://images.unsplash.com/photo-1507915977619-6ccfe8003ae6?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8MzZ8fHdlZGRpbmd8ZW58MHx8MHw%3D&auto=format&fit=crop&w=400&q=60",
  },
  {
    image:
      "https://images.unsplash.com/photo-1519741196428-6a2175fa2557?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NDJ8fHdlZGRpbmd8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
  },
];

const categorizedImages = reactive<Record<string, Array<{ image: string }>>>({});
photoshootTypes.forEach((type) => {
  categorizedImages[type] = [];
});

categorizedImages["Studio Photoshoots"] = [...studioShoots];
categorizedImages["Outdoor Photoshoots"] = [...outdoorShoots];
categorizedImages["Events"] = [...weddingShoots];

const filteredPhotoshootTypes = computed(() =>
  photoshootTypes.filter((type) => categorizedImages[type]?.length)
);

const getCategoryFromLink = (link: string) => {
  const normalizedLink = link.toLowerCase();

  for (const type of photoshootTypes) {
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

const fetchImages = () => {
  http
    .get("web-media?page=Portfolio&type=image")
    .then((res) => {
      res.data.forEach((item: any) => {
        if (!item.link) {
          return;
        }

        imageLinks.value.push(item.link);

        const category = getCategoryFromLink(item.link);
        categorizedImages[category].push({ image: item.link });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

onMounted(() => {
  fetchImages();
});

const breakpoints = {
  980: {
    slideRatio: 1 / 5,
    visibleSlides: "2",
    fixedHeight: "390px",
  },
  580: {
    visibleSlides: "1",
    fixedHeight: "370px",
  },
};
</script>

<style scoped>
#photographs-gallery {
  margin: 0 auto 70px;
  width: min(1360px, calc(100% - 40px));
}

h3 {
  color: #101412;
  font-size: clamp(1.4rem, 3vw, 2.2rem);
  font-weight: 900;
  margin: 34px 0 16px;
}
</style>
