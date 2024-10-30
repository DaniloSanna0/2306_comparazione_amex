<template>
  <div class="header">
    <div class="bg-light-grey">
      <div class="mx-auto w-75 pb-6 pt-5">
        <img
          src="../../assets/images/home-logo.webp"
          alt="logo"
          class="img-contain"
        />
      </div>
    </div>
    <div class="bg-gradient py-8">
      <div class="big text-white text-center">Offerta esclusiva</div>
      <div
        class="d-flex text-center justify-content-center align-items-center gap-2"
      >
        <div class="text-white font-weight-light">per i clienti</div>
        <div class="w-25">
          <img
            src="../../assets/images/icon-vodafone.webp"
            alt="vodafone"
            class="img-contain"
          />
        </div>
      </div>
    </div>
    <div class="home__cta d-flex py-6">
      <div class="home__cta__content align-self-end text-center mx-auto">
        <div class="text-white big pb-8">
          Perché scegliere American Express per il tuo business?
        </div>
        <b-button
          class="btn-variant border border-none font-weight-normal"
          @click="goNextPage"
          >SCOPRI TUTTI I VANTAGGI</b-button
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue2-helpers/vue-router";
const router = useRouter();
const goNextPage = () => {
  router.push({ name: "product-view" });
};
</script>

<style lang="scss">
.home {
  &__cta {
    background: url("../../assets/images/home-bg-mobile.webp") no-repeat;
    background-size: cover;
    height: 60vh;
    &__content {
      width: 70%;
    }
  }
}
</style>
