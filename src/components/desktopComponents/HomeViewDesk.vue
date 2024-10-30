<template>
  <div class="home-view-desk position-relative" @click.once="showHero = true">
    <div class="home-view-desk__logo position-absolute" v-if="!showHero">
      <img
        src="@/assets/images/home-logo.webp"
        alt="logo"
        class="img-contain"
      />
    </div>
    <div class="d-flex">
      <div
        class="home-view-desk__woman-with-phone"
        :class="showHero ? 'reduceImg' : 'cursor-pointer'"
      ></div>

      <app-hero v-if="showHero" />

      <div
        class="home-view-desk__man-with-phone"
        :class="showHero ? 'reduceImg' : 'cursor-pointer'"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import AppHero from "@/components/AppHero.vue";
const showHero = ref(false);
</script>

<style lang="scss">
.reduceImg {
  transition: all 1s ease-in-out;
  animation: reduceImg 1s ease-in-out;
  animation-fill-mode: forwards;
}

.home-view-desk {
  .hero {
    z-index: 1;
    animation: grow 1s ease-in-out;
    animation-fill-mode: forwards;
    transition: all 1s ease-in-out;
  }
  &__logo {
    top: 79%;
    right: 50%;
    transform: translate(50%, -400%) scale(0.6);
  }
  &__man-with-phone,
  &__woman-with-phone {
    background-size: cover;
    width: 100%;
    height: 90vh;
    background-position: top;
    background-repeat: no-repeat;
  }

  &__man-with-phone {
    background-image: url("@/assets/images/home-man-with-phone.webp");
  }
  &__woman-with-phone {
    background-image: url("@/assets/images/home-woman-with-phone.webp");
  }
}

@keyframes grow {
  from {
    width: 60%;
    opacity: 0;
  }
  to {
    width: 100%;
    opacity: 1;
  }
}
@keyframes reduceImg {
  from {
    width: 100%;
  }
  to {
    width: 70%;
  }
}
</style>
