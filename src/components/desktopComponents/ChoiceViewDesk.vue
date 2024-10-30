<template>
  <div
    class="choice-view-desk d-flex align-items-center bg-gradient"
    :class="
      selectedForm != ''
        ? 'justify-content-between pl-6'
        : 'justify-content-center py-8'
    "
  >
    <progress-bar
      :step="selectedForm == '' ? '2' : '3'"
      :class="{ 'd-none': isInjectionOk }"
      class="step w-100 position-absolute"
    />

    <div
      class="choice-view-desk__container text-white text-center font-weight-light center"
      :class="
        selectedForm != ''
          ? 'animate__animated animate__fadeInRight mx-auto'
          : 'gap-10'
      "
    >
      <div class="d-flex flex-column gap-3">
        <div class="choice-view-desk__card mx-auto mb-4">
          <img
            src="@/assets/images/creditCard.webp"
            alt="carta amex"
            class="img-contain"
          />
        </div>
        <div
          class="choice-view-desk__title font-weight-light"
          v-html="title"
        ></div>
        <div class="center">
          <b-form-group
            class="choices-flow gap-4 mt-5"
            :class="{ 'mb-10': selectedForm == '' }"
          >
            <b-form-radio
              @click.native="isInjectionOk = false"
              v-for="(choice, index) in choiceButtonsValues"
              :key="index"
              v-model="selectedForm"
              name="some-radios"
              :value="choice.value"
              button
              >{{ choice.label }}</b-form-radio
            >
          </b-form-group>
        </div>
      </div>
      <div
        v-if="selectedForm != ''"
        class="choice-view-desk-arrow position-absolute"
      >
        <img
          src="@/assets/images/right-arrow.webp"
          alt="icon"
          class="img-contain"
        />
      </div>
    </div>

    <div
      class="choice-view-desk__form bg-light-grey"
      :class="{
        'animate__animated animate__fadeInDown ': selectedForm != '',
      }"
    >
      <div
        v-if="selectedForm != ''"
        v-html="formTitle"
        class="text-center small bg-secondary text-white py-6"
      ></div>

      <appointment-form-user
        :formSubtitle="formSubtitle"
        @submit="isInjectionOk = true"
        v-if="selectedForm == 'appointmentFormVisibile'"
      />
      <consultant-form-user
        :formSubtitle="formSubtitle"
        @submit="isInjectionOk = true"
        v-if="selectedForm == 'consultantFormVisible'"
      />
      <user-data-form
        :formSubtitle="formSubtitle"
        @submit="isInjectionOk = true"
        v-if="selectedForm == 'dataFormUserVisible'"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import AppointmentFormUser from "@/components/Forms/AppointmentFormUser.vue";
import ConsultantFormUser from "@/components/Forms/ConsultantFormUser.vue";
import UserDataForm from "@/components/Forms/UserDataForm.vue";
import ProgressBar from "@/components/ProgressBar.vue";
import { choiceViewParams, choiceButtonsValues } from "../../../contents.js";
const title = ref(
  "Seleziona l'ozione che desideri, avrai il <br> nostro completo supporto"
);
const selectedForm = ref("");
const isInjectionOk = ref(false);
const formTitle = ref("");
const formSubtitle = ref("");
watch(selectedForm, () => {
  if (selectedForm.value === "appointmentFormVisibile") {
    title.value = choiceViewParams[0].title;
    formTitle.value = choiceViewParams[0].formTitle;
    formSubtitle.value = choiceViewParams[0].formSubtitle;
  } else if (selectedForm.value === "consultantFormVisible") {
    title.value = choiceViewParams[1].title;
    formTitle.value = choiceViewParams[1].formTitle;
    formSubtitle.value = choiceViewParams[1].formSubtitle;
  } else if (selectedForm.value === "dataFormUserVisible") {
    title.value = choiceViewParams[2].title;
    formTitle.value = choiceViewParams[2].formTitle;
    formSubtitle.value = choiceViewParams[2].formSubtitle;
  }
});
</script>

<style lang="scss">
.choice-view-desk {
  min-height: 91vh;
  .step {
    bottom: 0;
    left: 0;
    z-index: 2;
    margin-top: 5rem;
  }
  .btn-group-toggle {
    background-color: transparent;
    border-radius: 5rem !important;
    border: 1px solid white;
    font-size: 1rem;

    label.btn {
      border-radius: 5rem !important;
      background-color: unset;
      border: unset;
      font-weight: 400;
      padding: 1.2rem 1.6rem;
      font-size: 1.2rem;
      width: 18rem;

      &.active {
        background-color: white;
        color: $primary;
        opacity: 0.5;
      }
      &:hover {
        background-color: white;
        color: $primary;
      }
    }
  }

  .choices-flow :first-child {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &__container {
    width: 30vw;
  }
  &__card {
    width: 20rem;
  }
  &__title {
    font-size: $h6-font-size;
  }
  &-arrow {
    right: -6rem;
    width: 4rem;
  }
  &__form {
    min-height: inherit;
  }
}

.reduce-box {
  transition: all 1s ease-in-out;
  animation: reduceBox 1s ease-in-out;
  animation-fill-mode: forwards;
}
.show-form {
  transition: all 1s ease-in-out;
  animation: showForm 1s ease-in-out;
  animation-fill-mode: forwards;
}

@keyframes showForm {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes reduceBox {
  from {
    width: 100%;
  }
  to {
    width: 50%;
  }
}
</style>
