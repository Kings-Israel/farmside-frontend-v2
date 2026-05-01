<template>
  <section class="about">
    <div class="section-shell about__grid">
      <div class="about__content">
        <p class="section-kicker">What we do</p>
        <h2>Production support for the days you cannot recreate.</h2>
        <p>
          {{ aboutText }}
        </p>
        <div class="service-grid" aria-label="Farmside Media services">
          <article v-for="service in services" :key="service.title">
            <component :is="service.icon" class="service-icon" />
            <h3>{{ service.title }}</h3>
            <p>{{ service.copy }}</p>
          </article>
        </div>
      </div>
      <div class="about__feature">
        <img :src="featureImage" alt="Event photography by Farmside Media" />
        <div class="feature-note">
          <span>Highlight of the month</span>
          <p>{{ highlightText }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { IconCamera, IconMapPin, IconVideo } from "@tabler/icons-vue";
import { http } from "../lib/axios";

const imageLinks = ref<string[]>([]);
const text = ref<string>("");
const aboutTextFromApi = ref<string>("");

const fallbackImages = [
  "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1526231237819-de846f3a7e16?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=900&q=80",
];

const services = [
  {
    icon: IconCamera,
    title: "Portrait and Studio",
    copy: "Clean portraits, family sessions, graduation sets and creative studio looks.",
  },
  {
    icon: IconVideo,
    title: "Event Films",
    copy: "Coverage for birthdays, weddings, brand activations, music videos and recaps.",
  },
  {
    icon: IconMapPin,
    title: "On Location",
    copy: "Mobile production support for Nairobi, Kiambu, Machakos, Kajiado and beyond.",
  },
];

const aboutText = computed(
  () =>
    aboutTextFromApi.value ||
    "Farmside Media is a creative photography and video team helping people, families and brands preserve meaningful moments with sharp images, thoughtful direction and dependable delivery."
);

const highlightText = computed(
  () =>
    text.value ||
    "Recent event coverage blending candid emotion, directed portraits and polished visuals ready for sharing, printing and archiving."
);

const featureImage = computed(() => imageLinks.value[0] || fallbackImages[0]);

const fetchImages = () => {
  http
    .get("web-media?page=Home")
    .then((res) => {
      res.data.forEach((item: any) => {
        if (item.section == "Our Highlight of the Month") {
          imageLinks.value.push(item.link);
        }
      });
    })
    .catch((err) => {
      console.log(err);
      imageLinks.value = fallbackImages;
    });
};

const fetchContent = () => {
  http
    .get("web-content?page=Home")
    .then((res) => {
      res.data.forEach((item: any) => {
        if (item.section == "Our Highlight of the Month") text.value = item.content;
        if (item.section == "About Us") aboutTextFromApi.value = item.content;
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

fetchImages();
fetchContent();
</script>

<style scoped>
.about {
  background: #f6f7f1;
  padding: 96px 0;
}

.section-shell {
  width: min(1360px, calc(100% - 40px));
  margin: 0 auto;
}

.about__grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 56px;
  align-items: center;
}

.section-kicker {
  color: #238045;
  font-size: 0.92rem;
  font-weight: 900;
  letter-spacing: 0.14em;
  margin-bottom: 14px;
  text-transform: uppercase;
}

h2 {
  color: #101412;
  font-size: clamp(2rem, 4vw, 3.7rem);
  font-weight: 900;
  line-height: 1;
  margin: 0 0 22px;
}

.about__content > p:not(.section-kicker) {
  color: #536158;
  font-size: 1.2rem;
  line-height: 1.8;
  margin-bottom: 30px;
}

.service-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}

.service-grid article {
  min-height: 210px;
  padding: 20px;
  border: 1px solid rgba(16, 20, 18, 0.1);
  border-radius: 8px;
  background: #ffffff;
}

.service-icon {
  width: 30px;
  height: 30px;
  color: #2fb85e;
}

h3 {
  color: #101412;
  font-size: 1.12rem;
  font-weight: 900;
  margin: 18px 0 8px;
}

article p {
  color: #647168;
  font-size: 1.02rem;
  line-height: 1.55;
  margin: 0;
}

.about__feature {
  position: relative;
}

.about__feature img {
  display: block;
  width: 100%;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 24px 70px rgba(16, 20, 18, 0.2);
}

.feature-note {
  width: min(330px, calc(100% - 28px));
  margin: -86px auto 0;
  position: relative;
  padding: 20px;
  border-radius: 8px;
  background: #101412;
  color: #ffffff;
}

.feature-note span {
  color: #9fe6b3;
  display: block;
  font-size: 0.86rem;
  font-weight: 900;
  letter-spacing: 0.1em;
  margin-bottom: 8px;
  text-transform: uppercase;
}

.feature-note p {
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.02rem;
  line-height: 1.6;
  margin: 0;
}

@media (max-width: 960px) {
  .about__grid,
  .service-grid {
    grid-template-columns: 1fr;
  }

  .service-grid article {
    min-height: auto;
  }
}
</style>
