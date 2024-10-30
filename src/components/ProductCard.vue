<template>
  <section class="product-card center">
    <div
      class="product-card__container position-relative center animate__animated animate__flipInY cursor-pointer"
      @click="showInfoCard = true"
      :class="{ ' animate__wobble': showInfoCard }"
      v-show="!showInfoCard"
    >
      <img
        src="../assets/images/creditCard.webp"
        alt="American Express"
        class="img-container w-50"
      />
      <div class="product-card__disclaimer text-white position-absolute">
        SCOPRI DI PIÙ
      </div>
    </div>
    <div
      v-show="showInfoCard"
      @click="showInfoCard = false"
      class="animate__animated animate__flipInY cursor-pointer"
    >
      <info-card />
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import InfoCard from "@/components/InfoCard.vue";
const showInfoCard = ref(false);
</script>

<style lang="scss">
.product-card {
  height: 13rem;
  &__disclaimer {
    z-index: -1;
  }
  &__container:hover {
    img {
      filter: blur(7px) brightness(0.8) saturate(2) hue-rotate(87deg);
    }
    .product-card__disclaimer {
      z-index: 1;
    }
  }
}
</style>
