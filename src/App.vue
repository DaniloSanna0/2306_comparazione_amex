<template>
  <div id="app">
    <s-header-brands
      class="py-5"
      :left-logo="buyerLogo"
      :right-logo="accountLogos"
      data-testid="header-brands"
      @click="landing.params.get('useHeaderScroll') && scrollTo()"
    />

    <b-overlay :show="products.loading.value" spinner-variant="primary">
      <template #overlay="{ spinnerVariant }">
        <overlay-loading-screen
          :logo="accountLogos[0]"
          :spinner-variant="spinnerVariant"
        />
      </template>

      <template v-if="!products.loading.value">
        <router-view />
        <notifications />
      </template>
    </b-overlay>

    <!-- <mq-footer /> -->

    <s-call-me-back-modal
      id="call-me-back-modal"
      :call-me-back-form-options="callMeBackFormOptions"
      v-on="modalEvents"
      @submit="sendLead"
    />
  </div>
</template>

<script setup>
import { computed, provide, onBeforeMount, inject } from "vue";
import { breakpointsBootstrapV5, useBreakpoints } from "@vueuse/core";
import { RouterView } from "vue-router";
import {
  useProducts,
  useLead,
  useLanding,
  HeaderBrands as SHeaderBrands,
  // CallMeBackForm as SCallMeBackForm,
  CallMeBackModal as SCallMeBackModal,
} from "@smart-contact/smartify";
import OverlayLoadingScreen from "@/components/OverlayLoadingScreen.vue";
// import MqFooter from "@/components/MqFooter.vue";

const $bvModal = inject("$bvModal");
const callMeBackFormOptions = inject("callMeBackFormOptions");
const landing = useLanding();
const { account } = landing.params.get();
const products = useProducts();
const lead = useLead({
  disableRecaptchaCheck: !landing.params.get("useRecaptcha"),
});

const breakpoints = useBreakpoints(breakpointsBootstrapV5);
const scrollTo = (selector) => {
  document.querySelector(selector)?.scrollIntoView();
};
const accountLogos = [
  {
    src: "https://smart-contact-cdn.livelanding.it/images/logo-vodafone-mini.png",
    media: "(min-width: 768px)",
  },
  {
    src: "https://smart-contact-cdn.livelanding.it/images/logo-vodafone-mini.png",
    alt: `logo ${account}`,
    default: true,
    media: "(max-width: 767.98px)",
  },
];

const buyerLogo = computed(() => {
  const [buyer] = products.buyers.value;
  return buyer
    ? {
        src: "https://smart-contact-cdn.livelanding.it/images/logo-amex.png",
        alt: `logo ${buyer.name}`,
      }
    : {};
});

const sendLead = async (data = {}) => {
  const { successURL } = landing.params.get();
  try {
    if (window.dataLayer) {
      window.dataLayer.push({
        event: "form_submit",
        eventCategory: "form",
        eventAction: "submit_ok",
        eventLabel: "call-back landing",
      });
    }
    await lead.send(data);
    if (successURL) {
      window.location.href = successURL;
    }
  } catch (err) {
    console.log(err);
  }
};

const onProductSelected = (productIndex) => {
  products.setSelectedIndex(productIndex);
  $bvModal.show("call-me-back-modal");
};

const modalEvents = {
  show: () => {
    if (products.selected.value != undefined) {
      landing.data.set("buyer", products.selected.value.buyer.name);
      landing.data.set("offer", products.selected.value.name);
    }
  },
  hide: () => {
    landing.data.restoreDefaults();
    products.setSelectedIndex(undefined);
  },
};

onBeforeMount(() => {
  products.load({
    // collection: landing.params.get('collection'),
    productsIds: landing.params.get("products"),
  });
});

provide("isMobile", breakpoints.smaller("md"));
provide("isTablet", breakpoints.greater("sm"));
provide("isDesk", breakpoints.greater("md"));
provide("isBigDesk", breakpoints.greater("lg"));
provide("params", landing.params.get());
provide("landing", landing);
provide("onProductSelected", onProductSelected);
provide("sendLead", sendLead);
</script>

<style lang="scss">
html {
  scroll-behavior: smooth;
}
.header-brands {
  .container {
    max-width: 1500px;
  }
}

.custom-control-label::after {
  border: 1px solid #d9d9d9;
  border-radius: 50rem;
}

.was-validated .form-control:valid,
.form-control.is-valid {
  background-image: url("./assets/images/check.svg") !important;
}

#mobile-user-data-form .form-privacy-nested .custom-control-label::before,
#mobile-user-data-form .form-privacy-nested .custom-control-label::after {
  border: 1px solid #006cd3;
  filter: none;
}

.was-validated
  .custom-control-input:valid:checked
  ~ .custom-control-label::before,
.custom-control-input.is-valid:checked ~ .custom-control-label::before {
  background-color: darkblue !important;
}

.appointment-form-user .form-privacy-nested .custom-control-label::before,
.appointment-form-user .form-privacy-nested .custom-control-label::after,
#consultant-form-user .form-privacy-nested .custom-control-label::before,
#consultant-form-user .form-privacy-nested .custom-control-label::after,
#user-data-form .form-privacy-nested .custom-control-label::before,
#user-data-form .form-privacy-nested .custom-control-label::after {
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 0.6rem;
  border: 1px solid #00135e !important;
  filter: none;
}

.was-validated .form-control:valid,
.form-control.is-valid {
  background-size: calc(0.4em + 0.85rem) calc(0.6em + 0.85rem) !important;
}

.custom-control-input:focus ~ .custom-control-label::before {
  box-shadow: none !important;
}

#app {
  .b-overlay {
    // min-height: calc(100vh - #{$s-header-brands-logo-height + (spacer(5) * 2)});

    div:nth-child(2) {
      width: 100%;
    }
  }
  input::placeholder {
    font-size: 0.75em;
  }
}
</style>
