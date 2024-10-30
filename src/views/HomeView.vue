<template>
  <div class="home-view">
    <HomeViewMobile v-if="isMobile" />
    <HomeViewDesk v-else />
  </div>
</template>

<script setup>
import { inject } from "vue";
import HomeViewDesk from "@/components/desktopComponents/HomeViewDesk.vue";
import HomeViewMobile from "@/components/mobileComponents/HomeViewMobile.vue";
const isMobile = inject("isMobile");
</script>

<style lang="scss"></style>
