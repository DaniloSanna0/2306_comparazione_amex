<template>
  <div class="info-card d-flex justify-content-center position-relative">
    <div class="info-card__line bg-white position-absolute"></div>
    <div
      class="info-card__box-promo pt-11 pr-3 pl-5 py-5 text-primary small bg-white"
    >
      Carta Business American Express <br />
      <span class="small text-secondary"
        >Fino a <b>48 giorni</b> per pagare le tue spese.</span
      ><br />
      <b>ORA IN PROMO:</b>
      <div class="small text-tertiary">
        <span>Gratuita il 1° anno*, </span><br />
        <span>dal 2° anno 75€ all'anno </span><br />
        <span>(quota deducibile fiscalmente)*</span><br />
      </div>
    </div>
    <div
      class="info-card__box-business d-flex flex-column justify-content-between gap-2 small py-5 p-3 bg-white"
    >
      <div class="">Facilità e semplicità per il tuo business.</div>
      <div class="d-flex gap-3 align-items-start text-tertiary">
        <div>
          <img
            src="@/assets/images/icon-stella.webp"
            alt="icona"
            class="img-contain mr-2"
          />
        </div>
        <div class="small">
          Iscrizione gratuita al Club Membership Rewards® per accumulare punti
          con le tue spese
        </div>
      </div>
      <div class="d-flex gap-3 align-items-start text-tertiary">
        <div>
          <img
            src="@/assets/images/icon-scudo.webp"
            alt="icona"
            class="img-contain"
          />
        </div>
        <div class="small">Coperture assicurative base</div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss">
.info-card {
  height: 13rem;
  &__box-business {
    flex: 0 0 38%;
    border-radius: 10px;
    box-shadow: -1px 0px 16px -4px #000000;
  }
  &__box-promo {
    flex: 0 0 34%;
    border-radius: 10px;
  }
  &__line {
    top: 0;
    height: 100%;
    left: 45%;
    width: 5rem;
    z-index: -1;
  }
}
</style>
