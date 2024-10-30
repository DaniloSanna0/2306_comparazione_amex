<template>
  <div class="product position-relative">
    <div class="bg-light-grey">
      <div class="mx-auto w-75 py-5">
        <img
          src="../../assets/images/home-logo.webp"
          alt="logo"
          class="img-contain"
        />
      </div>
    </div>
    <div class="bg-primary-alt text-white text-center pt-6 pb-10 big">
      Carta Platino American Express
    </div>
    <!-- Cards -->
    <product-card-mobile v-if="toggler === 2" @click="toggler = 1" />
    <info-card-mobile v-else @click="toggler = 2" />
    <!-- Toggler -->
    <div class="product__btns position-absolute">
      <div class="d-flex product__togglers justify-content-center gap-4">
        <div
          class="product__btns__toggler animate__animated"
          @click="toggler = 2"
          :class="
            toggler === 1
              ? 'animate__wobble primary-alt-light'
              : ' bg-primary-alt'
          "
        ></div>
        <div
          class="product__btns__toggler animate__animated"
          @click="toggler = 1"
          :class="
            toggler === 1
              ? ' bg-primary-alt'
              : 'animate__wobble primary-alt-light'
          "
        ></div>
      </div>
      <div class="center pt-6 pb-2">
        <b-button class="button font-weight-normal" @click="goNextPage"
          >SCEGLI COME ATTIVARLA</b-button
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import ProductCardMobile from "./ProductCardMobile.vue";
import InfoCardMobile from "./InfoCardMobile.vue";
import { ref } from "vue";

import { useRouter } from "vue2-helpers/vue-router";
const router = useRouter();
const goNextPage = () => {
  router.push({ name: "choice-view" });
};
let toggler = ref(2);
</script>

<style lang="scss">
.product {
  height: 100vh;
  &__btns {
    top: 57rem;
    left: 40%;
    transform: translateX(-32%);
    &__toggler {
      height: 1rem;
      width: 1rem;
      border-radius: 2rem;
    }
  }
  &__card {
    top: 11.5rem;
  }
}
</style>
