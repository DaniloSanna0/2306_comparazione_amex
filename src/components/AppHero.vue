<template>
  <section class="hero bg-gradient py-5">
    <div class="container center flex-column text-white h-100 gap-5">
      <div class="hero__img">
        <img src="@/assets/images/hero-logo.webp" class="img-contain" alt="" />
      </div>
      <h1 class="text-center">
        Perchè scegliere American Express<br />
        per il tuo business?
      </h1>

      <div class="mt-7">
        <ul>
          <li
            class="hero__description"
            v-for="(description, i) in heroDescription"
            :key="i"
          >
            {{ description }}
          </li>
        </ul>
      </div>
      <div class="mt-7">
        <b-button
          @click="goNextPage"
          :class="{ 'active-btn': isActive }"
          class="btn-variant rounded-pill px-7"
          >Scopri di più</b-button
        >
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { heroDescription } from "../../contents.js";
import { useRouter } from "vue2-helpers/vue-router";
const router = useRouter();
const isActive = ref(false);
const goNextPage = () => {
  isActive.value = true;
  router.push({ name: "product-view" });
  isActive.value = false;
};
</script>

<style lang="scss">
.hero {
  overflow: hidden;
  h1 {
    font-size: 2em;
  }
  font-size: 1rem;
  &__description {
    font-size: 1em;
  }
  &__img {
    width: 10rem;
  }
}
</style>
