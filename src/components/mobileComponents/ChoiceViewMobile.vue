<template>
  <div class="choice mx-auto">
    <div class="bg-light-grey">
      <div class="mx-auto w-75 py-5">
        <img
          src="../../assets/images/home-logo.webp"
          alt="logo"
          class="img-contain"
        />
      </div>
    </div>

    <div class="">
      <mobile-user-data-form class="" />
    </div>
  </div>
</template>

<script setup>
import MobileUserDataForm from "../Forms/MobileUserDataForm.vue";
</script>

<style lang="scss">
.choice {
  &__card {
    top: 7rem;
    left: 50%;
    transform: translate(-38%, 0);
  }
  &__title {
    font-weight: 500;
    color: rgba(9, 117, 210, 0.8);
  }
}
</style>
