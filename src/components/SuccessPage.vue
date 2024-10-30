<template>
  <section class="success-page center flex-column">
    <div class="success-page__lottie mx-auto">
      <lottie-animation
        ref="anim"
        :animationData="
          require('@/assets/lottie-files/icon-phone-success.json')
        "
        :loop="true"
      />
    </div>
    <div v-html="title" class="text-primary text-center big mt-6"></div>
  </section>
</template>

<script setup>
import LottieAnimation from "lottie-web-vue";
defineProps({
  title: {
    type: String,
    default: "",
  },
});
</script>

<style lang="scss">
.success-page {
  height: 57vh;
  &__lottie {
    width: 150px;
  }
  @include media-breakpoint-up("md") {
    width: 40vw;
  }
}
</style>
