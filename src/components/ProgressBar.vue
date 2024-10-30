<template>
  <div v-if="!isMobile" class="pointer-events-none">
    <div class="d-flex text-center small">
      <div
        v-if="step >= 1"
        class="step py-1"
        :class="
          step == 1
            ? 'bg-secondary text-white'
            : 'bg-disabled-progress-bar text-progress-bar-disabled-text'
        "
      >
        SELEZIONA CARTA
      </div>
      <div
        v-if="step >= 2"
        class="step py-1"
        :class="
          step < 3
            ? 'bg-secondary text-white'
            : 'bg-disabled-progress-bar text-progress-bar-disabled-text'
        "
      >
        RICHIESTA CARTA
      </div>
      <div v-if="step == 3" class="step py-1 bg-secondary text-white">
        COMPLETA IL MODULO
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject } from "vue";

defineProps({
  step: {
    type: String,
  },
});
const isMobile = inject("isMobile");
</script>

<style lang="scss">
.step {
  width: 33.333333%;
}
</style>
