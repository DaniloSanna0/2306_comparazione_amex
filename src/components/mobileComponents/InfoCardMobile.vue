<template>
  <div>
    <div
      class="product__description bg-white rounded-lg px-6 py-7 shadow animate__animated animate__flipInY position-absolute"
      @click="$emit('click')"
    >
      <div class="product__description__title text-primary">
        Carta Business American Express
      </div>
      <div class="product__description__title text-primary-alt">
        Fino a <b>48 giorni</b> per pagare le tue spese.
      </div>
      <div class="product__description__title text-primary">ORA IN PROMO</div>
      <div class="text-tertiary">Gratuita il 1º anno*,</div>
      <div class="text-tertiary">dal 2º anno 75 € all'anno</div>
      <div class="text-tertiary">(quota deducibile fiscalmente)*</div>
    </div>
    <div class="product__features d-flex flex-column gap-5 mx-6 mb-4">
      <div class="product__features__title pb-2 text-center">
        Facilità e semplicità per il tuo business.
      </div>
      <div class="d-flex justify-content-start align-items-baseline gap-4">
        <div class="product__features__icon">
          <img
            src="../../assets/images/icon-stella1.webp"
            alt=""
            class="img-contain"
          />
        </div>
        <div>
          Iscrizione gratuita al Club Membership Rewards® per accumulare punti
          con le tue spese
        </div>
      </div>
      <div class="d-flex justify-content-start gap-4">
        <div>
          <img
            src="../../assets/images/icon-scudo.webp"
            alt=""
            class="img-contain"
          />
        </div>
        <div>Coperture assicurative base</div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss">
.product {
  .blu {
    color: #00135e;
  }
  height: 90vh;
  &__description {
    width: 85%;
    top: 11.5rem;
    left: 7%;
    transform: translate(-10%, 0);
    &__title {
      font-weight: 500;
    }
  }
  &__features {
    margin-top: 20rem;
    &__title {
      color: #302d2d;
      font-weight: 600;
      font-size: 1.85rem;
    }
  }
}
</style>
