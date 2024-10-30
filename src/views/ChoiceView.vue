<template>
  <div class="home-view">
    <ChoiceViewMobile v-if="isMobile" />
    <ChoiceViewDesk v-else />
  </div>
</template>

<script setup>
import { inject } from "vue";
import ChoiceViewDesk from "@/components/desktopComponents/ChoiceViewDesk.vue";
import ChoiceViewMobile from "@/components/mobileComponents/ChoiceViewMobile.vue";
const isMobile = inject("isMobile");
</script>

<style lang="scss"></style>
