<template>
  <section class="hero">
    <div class="hero__media" aria-hidden="true">
      <img
        src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1800&q=85"
        alt=""
      />
    </div>
    <div class="hero__overlay" />
    <div class="hero__content">
      <p class="eyebrow">Photography, film and event storytelling</p>
      <h1>Farmside Media captures the moments people come back to.</h1>
      <p class="hero__copy">
        Studio portraits, outdoor shoots, weddings, graduations, brand stories
        and event coverage produced with care from planning to final delivery.
      </p>
      <div class="hero__actions">
        <RouterLink :to="{ name: 'book' }" class="button button--primary">
          Book a Shoot
        </RouterLink>
        <RouterLink :to="{ name: 'photographs' }" class="button button--ghost">
          View Work
        </RouterLink>
      </div>
      <dl class="hero__stats" aria-label="Farmside Media services">
        <div>
          <dt>Photo</dt>
          <dd>Portraits and events</dd>
        </div>
        <div>
          <dt>Video</dt>
          <dd>Stories and coverage</dd>
        </div>
        <div>
          <dt>Kenya</dt>
          <dd>Available on location</dd>
        </div>
      </dl>
    </div>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped>
.hero {
  position: relative;
  min-height: calc(100vh - 76px);
  display: grid;
  align-items: end;
  overflow: hidden;
  color: #ffffff;
  background: #101412;
}

.hero__media,
.hero__media img,
.hero__overlay {
  position: absolute;
  inset: 0;
}

.hero__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero__overlay {
  background:
    linear-gradient(90deg, rgba(7, 13, 10, 0.92), rgba(7, 13, 10, 0.5) 52%, rgba(7, 13, 10, 0.2)),
    linear-gradient(0deg, rgba(7, 13, 10, 0.9), rgba(7, 13, 10, 0.05) 48%);
}

.hero__content {
  position: relative;
  z-index: 1;
  width: min(1360px, calc(100% - 40px));
  margin: 0 auto;
  padding: 96px 0 44px;
}

.eyebrow {
  color: #9fe6b3;
  font-size: 0.92rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  margin-bottom: 18px;
  text-transform: uppercase;
}

h1 {
  max-width: 850px;
  font-size: clamp(2.8rem, 8vw, 6.4rem);
  font-weight: 900;
  line-height: 0.94;
  margin: 0;
}

.hero__copy {
  max-width: 820px;
  color: rgba(255, 255, 255, 0.84);
  font-size: clamp(1.12rem, 2vw, 1.42rem);
  line-height: 1.7;
  margin: 28px 0;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 0 22px;
  border-radius: 6px;
  font-weight: 800;
  text-decoration: none;
}

.button--primary {
  background: #2fb85e;
  color: #061008;
}

.button--ghost {
  border: 1px solid rgba(255, 255, 255, 0.48);
  color: #ffffff;
}

.hero__stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1px;
  width: min(920px, 100%);
  margin: 56px 0 0;
  background: rgba(255, 255, 255, 0.18);
  border: 1px solid rgba(255, 255, 255, 0.18);
}

.hero__stats div {
  padding: 18px;
  background: rgba(6, 16, 8, 0.58);
  backdrop-filter: blur(14px);
}

.hero__stats dt {
  font-size: 1.08rem;
  font-weight: 900;
}

.hero__stats dd {
  color: rgba(255, 255, 255, 0.72);
  font-size: 1rem;
  margin: 4px 0 0;
}

@media (max-width: 760px) {
  .hero {
    min-height: auto;
  }

  .hero__content {
    padding: 72px 0 28px;
  }

  .hero__stats {
    grid-template-columns: 1fr;
    margin-top: 36px;
  }
}
</style>
