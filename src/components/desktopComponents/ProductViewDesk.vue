<template>
  <div
    class="product-view-desk center flex-column bg-gradient py-8 position-relative"
  >
    <progress-bar step="1" class="step w-100 position-absolute" />
    <div
      class="text-white text-center font-weight-light d-flex flex-column gap-3"
    >
      <div class="product-view-desk__title font-weight-light">
        Carta Business American Express
      </div>
      <div class="product-view-desk__subtitle">
        Facilità e semplicità per il tuo business.
      </div>
      <div class="product-view-desk__disclaimer center gap-5 my-6">
        <div><b>Offerta esclusiva</b> per i clienti</div>
        <div class="product-view-desk__logo">
          <img
            src="https://prezzogiusto-api-production-storage.s3.eu-central-1.amazonaws.com/buyers-image/uRK8a5ASHkqy8YC0D1XsUZ9Bvw7XOffjwGIclQmA.png"
            alt="logo-vodafone"
            class="img-contain"
          />
        </div>
      </div>
    </div>
    <product-card class="mt-5 mt-lg-3" />
    <div class="mt-7 text-white d-flex flex-column align-items-center gap-5">
      <b-form-group>
        <b-form-radio v-model="cartaBusiness" name="some-radios" value="true"
          >Carta Business</b-form-radio
        >
      </b-form-group>
      <div>
        <b-button
          @click="router.push({ name: 'choice-view' })"
          :class="{ 'disabled pointer-events-none': cartaBusiness === '' }"
          class="btn-variant rounded-pill"
          >Scegli come attivarla</b-button
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import ProductCard from "@/components/ProductCard.vue";
import ProgressBar from "@/components/ProgressBar.vue";
import { useRouter } from "vue2-helpers/vue-router";
const router = useRouter();
const cartaBusiness = ref("");
</script>

<style lang="scss">
.product-view-desk {
  min-height: 91vh;
  .custom-control-label::before {
    background: none !important;
  }
  .step {
    bottom: 0;
    left: 0;
  }
  &__logo {
    width: 12rem;
  }
  &__title {
    font-size: $h1-font-size;
  }
  &__subtitle {
    font-size: $h3-font-size;
  }
  &__disclaimer {
    font-size: $h5-font-size;
  }
}
</style>
