<template>
  <div>
    <div
      @click="$emit('click')"
      class="product__card position-absolute container px-7 animate__animated animate__flipInY"
    >
      <img
        src="../../assets/images/creditCard-mobile.webp"
        alt="Carta di credito"
        class="img-contain"
      />
    </div>
    <div class="product__features-list pt-10 text-primary-alt container pb-2">
      <ul>
        <li>Gestisci la contabilità aziendale in modo più efficace</li>
        <li>Hai più tempo per pagare le tue spese</li>
        <li>Carte supplementari a disposizione per i tuoi collaboratori</li>
        <li>Per te c’è un pacchetto di assicurazioni incluse</li>
        <li>Accedi a programmi esclusivi</li>
        <li>Puoi contare sul servizio clienti 24/7</li>
        <li>Tieni tutto sotto controllo con i servizi online e l’app AMEX</li>
      </ul>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss">
.product {
  height: 90vh;
  &__features-list {
    margin-top: 11vh;
    ul {
      line-height: 2.2rem;
    }
    li::marker {
      color: #00419f;
    }
  }
  &__card {
    top: 11.5rem;
  }
}
</style>
