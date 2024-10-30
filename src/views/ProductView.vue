<template>
  <div class="home-view">
    <ProductViewMobile v-if="isMobile" />
    <ProductViewDesk v-else />
  </div>
</template>

<script setup>
import { inject } from "vue";
import ProductViewDesk from "@/components/desktopComponents/ProductViewDesk.vue";
import ProductViewMobile from "@/components/mobileComponents/ProductViewMobile.vue";
const isMobile = inject("isMobile");
</script>

<style lang="scss"></style>
