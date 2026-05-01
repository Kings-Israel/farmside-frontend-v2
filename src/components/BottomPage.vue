<template>
  <footer class="footer">
    <div class="footer__inner">
      <img src="../assets/images/Farmside.png" class="footer-img" alt="Farmside Media" />
      <div class="footer__content">
        <p>Photo, video and event storytelling.</p>
        <p class="footer__copyright">
          <IconCopyright />
          Farmside Media - {{ d.getFullYear() }}
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { IconCopyright } from "@tabler/icons-vue";
const d = new Date();
</script>

<style scoped>
.footer {
  background: #070d0a;
  color: #ffffff;
  padding: 34px 0;
}

.footer__inner {
  align-items: center;
  display: flex;
  gap: 24px;
  justify-content: space-between;
  width: min(1360px, calc(100% - 40px));
  margin: 0 auto;
}

.footer-img {
  height: 58px;
  object-fit: contain;
  width: 240px;
}

.footer__content {
  color: rgba(255, 255, 255, 0.68);
  text-align: right;
}

.footer__content p {
  margin: 0;
}

.footer__copyright {
  align-items: center;
  display: inline-flex;
  gap: 6px;
  margin-top: 8px;
}

@media (max-width: 700px) {
  .footer__inner {
    align-items: start;
    flex-direction: column;
  }

  .footer__content {
    text-align: left;
  }

  .footer-img {
    width: min(100%, 280px);
  }
}
</style>
