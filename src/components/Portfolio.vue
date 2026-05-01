<template>
  <section class="portfolio">
    <div class="section-shell portfolio__header">
      <div>
        <p class="section-kicker">Selected work</p>
        <h2>Stories with atmosphere, clarity and feeling.</h2>
      </div>
      <RouterLink :to="{ name: 'photographs' }" class="portfolio__link">
        Open Gallery
      </RouterLink>
    </div>

    <div class="section-shell work-grid">
      <RouterLink
        v-for="item in workItems"
        :key="item.title"
        :to="item.to"
        class="work-card"
      >
        <img :src="item.image" :alt="item.title" />
        <div class="work-card__body">
          <span>{{ item.category }}</span>
          <h3>{{ item.title }}</h3>
          <p>{{ item.copy }}</p>
        </div>
      </RouterLink>
    </div>

    <div class="section-shell carousel-section">
      <h3>Photography Highlights</h3>
      <photos />
      <h3>Video Highlights</h3>
      <videos :carouselVideos="carouselVideos" />
    </div>
  </section>
</template>

<script setup lang="ts">
import Photos from "./Photos.vue";
import Videos from "./Videos.vue";

const workItems = [
  {
    category: "Portraits",
    title: "Studio and Outdoor Shoots",
    copy: "Directed sessions for personal brands, couples, families and milestones.",
    image:
      "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=900&q=80",
    to: { name: "photographs" },
  },
  {
    category: "Events",
    title: "Weddings, Graduations and Parties",
    copy: "Coverage that balances candid energy with composed, frame-worthy images.",
    image:
      "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=900&q=80",
    to: { name: "photographs" },
  },
  {
    category: "Motion",
    title: "Films, Recaps and Brand Videos",
    copy: "Short-form video, social edits and event films built around the story.",
    image:
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=900&q=80",
    to: { name: "videos" },
  },
];

const carouselVideos = [
  {
    title: "Aurora Borealis",
    content: "Event video sample.",
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
    content: "Video sample.",
    image: "https://i.ytimg.com/vi/2sr9MGkkeks/maxresdefault.jpg",
    video: {
      url: "https://www.youtube.com/embed/2sr9MGkkeks?controls=0&fs=0&modestbranding=1&color=white&iv_load_policy=3&autohide=1&enablejsapi=1",
      props: {
        allow: "autoplay",
      },
      pointerEvents: false,
    },
  },
];
</script>

<style scoped>
.portfolio {
  background: #ffffff;
  padding: 96px 0;
}

.section-shell {
  width: min(1360px, calc(100% - 40px));
  margin: 0 auto;
}

.portfolio__header {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 32px;
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
  font-size: clamp(2rem, 4vw, 3.5rem);
  font-weight: 900;
  line-height: 1;
  margin: 0;
  max-width: 880px;
}

.portfolio__link {
  align-items: center;
  border: 1px solid rgba(16, 20, 18, 0.16);
  border-radius: 6px;
  color: #101412;
  display: inline-flex;
  font-weight: 900;
  min-height: 44px;
  padding: 0 18px;
  text-decoration: none;
  white-space: nowrap;
}

.work-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.work-card {
  display: grid;
  min-height: 520px;
  overflow: hidden;
  position: relative;
  border-radius: 8px;
  color: #ffffff;
  text-decoration: none;
  background: #101412;
}

.work-card img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.45s ease;
}

.work-card::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(0deg, rgba(6, 16, 8, 0.88), rgba(6, 16, 8, 0.08));
}

.work-card:hover img {
  transform: scale(1.05);
}

.work-card__body {
  align-self: end;
  position: relative;
  z-index: 1;
  padding: 24px;
}

.work-card__body span {
  color: #9fe6b3;
  display: block;
  font-size: 0.88rem;
  font-weight: 900;
  letter-spacing: 0.12em;
  margin-bottom: 10px;
  text-transform: uppercase;
}

h3 {
  font-size: 1.35rem;
  font-weight: 900;
  margin: 0 0 8px;
}

.work-card__body p {
  color: rgba(255, 255, 255, 0.78);
  font-size: 1.05rem;
  line-height: 1.55;
  margin: 0;
}

.carousel-section {
  margin-top: 64px;
}

.carousel-section > h3 {
  color: #101412;
  margin: 42px 0 18px;
}

@media (max-width: 900px) {
  .portfolio__header {
    align-items: start;
    flex-direction: column;
  }

  .work-grid {
    grid-template-columns: 1fr;
  }

  .work-card {
    min-height: 430px;
  }
}
</style>
