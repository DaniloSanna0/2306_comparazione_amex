<template>
  <section>
    <div v-if="notInjectForm">
      <div
        v-if="!showCalendar"
        class="text-primary py-6 text-center"
        :class="{ big: isBigDesk }"
        v-html="formSubtitle"
      ></div>
      <div class="text-primary py-4 text-center" v-else>
        Scegli il giorno e l’orario che preferisci
      </div>

      <form
        id="appointment-form-user"
        class="appointment-form-user form needs-validation d-flex flex-column gap-3"
        :class="{ 'was-validated': !v$.$invalid }"
        novalidate
        autocomplete="off"
      >
        <div class="px-8 py-6" v-if="!showCalendar">
          <div>
            <label for="nameInput" class="form-label">Nome</label>
            <input
              type="text"
              placeholder="Inserisci il tuo nome"
              name="name"
              id="nameInput"
              class="form-control"
              :class="{
                'is-invalid': v$.name.$errors.length > 0,
                'is-valid': v$.name.$dirty && v$.name.$errors.length == 0,
              }"
              v-model="v$.name.$model"
            />
            <div
              class="invalid-feedback"
              v-for="error of v$.name.$errors"
              :key="error.$uid"
            >
              {{ error.$message }}
            </div>
          </div>

          <div>
            <label for="surnameInput" class="form-label">Cognome</label>
            <input
              type="text"
              name="surname"
              placeholder="Inserisci il tuo cognome"
              id="surnameInput"
              class="form-control"
              :class="{
                'is-invalid': v$.surname.$errors.length > 0,
                'is-valid': v$.surname.$dirty && v$.surname.$errors.length == 0,
              }"
              v-model="v$.surname.$model"
            />
            <div
              class="invalid-feedback"
              v-for="error of v$.surname.$errors"
              :key="error.$uid"
            >
              {{ error.$message }}
            </div>
          </div>

          <div>
            <label for="emailInput" class="form-label">Email</label>
            <input
              type="text"
              name="email"
              placeholder="Inserisci il tuo indirizzo @mail"
              id="emailInput"
              class="form-control"
              :class="{
                'is-invalid': v$.email.$errors.length > 0,
                'is-valid': v$.email.$dirty && v$.email.$errors.length == 0,
              }"
              v-model="v$.email.$model"
            />
            <div
              class="invalid-feedback"
              v-for="error of v$.email.$errors"
              :key="error.$uid"
            >
              {{ error.$message }}
            </div>
          </div>

          <div>
            <label for="phoneInput" class="form-label">Telefono</label>
            <div class="flex-grow-1">
              <input
                type="tel"
                name="phone"
                placeholder="Inserisci il tuo numero di telefono"
                id="phoneInput"
                class="form-control"
                :class="{
                  'is-invalid': v$.phone.$errors.length > 0,
                  'is-valid': v$.phone.$dirty && v$.phone.$errors.length == 0,
                }"
                v-model="v$.phone.$model"
              />
              <div
                class="invalid-feedback"
                v-for="error of v$.phone.$errors"
                :key="error.$uid"
              >
                {{ error.$message }}
              </div>
            </div>
          </div>

          <form-privacy
            v-bind="privaciesOptions"
            data-form-item-id="privacies"
            :schema="model[0]"
            :state="v$.privacies"
            @click="v$.privacies.$touch()"
            v-model="formData.privacies"
          />

          <div
            class="center flex-column flex-lg-row"
            :class="{ 'gap-4': isBigDesk }"
            v-if="!showCalendar"
          >
            <b-button
              @click.prevent="showCalendar = true && !v$.$invalid"
              class="btn-variant rounded-pill mt-5 w-75 mx-auto mb-lg-5"
              :class="{ 'disabled pointer-events-none': v$.$invalid }"
            >
              Chiamatemi più tardi
            </b-button>
            <b-button
              @click.prevent="onSubmit"
              name="submit"
              class="button rounded-pill text-white mt-5 w-75 mx-auto mb-5"
              :class="{ 'disabled pointer-events-none': v$.$invalid }"
            >
              <span class="spinner-border" role="status" v-if="loading"> </span>
              <span v-else> {{ buttonText }}</span>
            </b-button>
          </div>
        </div>

        <div
          class="appointment-form-user__call-later-container bg-white"
          v-if="showCalendar"
        >
          <div>
            <div class="mx-lg-auto py-6" :class="{ 'w-75': isBigDesk }">
              <b-calendar
                :min="new Date()"
                class="w-100 px-5"
                :hide-header="hideHeader"
                v-model="v$.date.$model"
                locale="it-IT"
              ></b-calendar>
            </div>

            <div class="mb-6" v-if="v$.date.$model">
              <b-form-group class="choices-time center gap-6 mt-5">
                <b-form-radio
                  class="appointment-form-user__choice-hours"
                  v-for="(choice, index) in choiceButtonsAppointment"
                  :key="index"
                  v-model="v$.orario.$model"
                  name="some-radios"
                  :value="choice.value"
                  button
                  >{{ choice.label }}</b-form-radio
                >
              </b-form-group>
            </div>
          </div>

          <div class="center flex-column" v-if="formData.orario">
            <div class="big">
              {{ v$.date.$model.split("-").reverse().join("/") }}
            </div>
            <div class="text-secondary">
              Nella fascia oraria {{ v$.orario.$model }}
            </div>
            <div>
              <b-button
                @click.prevent="onSubmitDelay"
                name="submit"
                class="btn-variant rounded-pill px-9 my-5 w-200 mx-auto"
                :class="{ 'disabled pointer-events-none': v$.$invalid }"
              >
                <span class="spinner-border" role="status" v-if="loading">
                </span>
                <span v-else> Conferma </span>
              </b-button>
            </div>
          </div>

          <div
            class="appointment-form-user__alternative__cta py-3 mb-6 cursor-pointer text-center small"
            @click.prevent="onSubmit"
            @mouseleave="isHovered = false"
            @mouseenter="isHovered = true"
          >
            <div v-show="!isHovered" class="font-weight-bold">
              Hai cambiato idea? ti chiamiamo ora
            </div>
            <div v-show="isHovered">Chiamami ora</div>
          </div>
        </div>
      </form>
    </div>
    <div :class="{ 'py-8': !notInjectForm }">
      <success-page v-if="!notInjectForm" :title="successTitle" />
    </div>
  </section>
</template>

<script setup>
import { choiceButtonsAppointment } from "../../../contents.js";
import { inject, ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email, helpers } from "@vuelidate/validators";
import { usePrivaciesFormSchemas } from "@/composables";
import { FormPrivacy } from "@smart-contact/smartify";
//import { SendData } from "@/api/index.js"; //Da sbloccare quando abbiamo api
import SuccessPage from "@/components/SuccessPage.vue";
//import { useRouter } from "vue2-helpers/vue-router";

defineProps({
  title: {
    type: String,
    default: "",
  },
  formSubtitle: {
    type: String,
    default: "",
  },
  buttonText: {
    type: String,
    default: "Chiamatemi ora",
  },
  buttonIcon: {
    type: String,
  },
  subtitle: {
    type: String,
    default: "",
  },
  size: {
    type: String,
    default: "md",
  },
});

const emit = defineEmits(["submit"]);
const notInjectForm = ref("notInjectForm");
const { model } = usePrivaciesFormSchemas();
const landing = inject("landing");
const loading = ref(false);
const hideHeader = ref(false);
const showCalendar = ref(false);
const isHovered = ref(false);
let successTitle = ref("");
const isBigDesk = inject("isBigDesk");
//const router = useRouter();
//data
const formData = ref({
  name: undefined,
  surname: undefined,
  email: undefined,
  phone: undefined,
  date: undefined,
  orario: undefined,
  privacies: {
    privacy_1: 0,
    privacy_2: 0,
    privacy_3: 0,
    privacy_4: 0,
  },
});

const privaciesOptions = {
  uncheckedValue: 0,
  checkedValue: 1,
  checkAllChildren: true,
  uncheckAllChildren: true,
  collapseToggleText: landing.params.get("collapseToggleText"),
  // collapseOptionalText: ", per espandere",
  // invalidFeedback: ''
};

//validations
const phone = helpers.regex(
  /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4,6}$/
);

const validations = {
  name: { required: helpers.withMessage("campo richiesto", required) },
  surname: { required: helpers.withMessage("campo richiesto", required) },
  email: {
    email: helpers.withMessage("formato email non valido", email),
    required: helpers.withMessage("campo richiesto", required),
  },
  date: {},
  orario: {},
  phone: {
    phone: helpers.withMessage("numero non valido", phone),
    required: helpers.withMessage("campo richiesto", required),
  },

  privacies: model.value[0].getValidations(),
};

const v$ = useVuelidate(validations, formData.value);

//functions
const onSubmit = async () => {
  if (!v$.value.$invalid) {
    loading.value = true;
    let data = {
      name: formData.value.name ? formData.value.name : "-",
      surname: formData.value.surname ? formData.value.surname : "-",
      email: formData.value.email ? formData.value.email : "-",
      phone: formData.value.phone,
      ...formData.value.privacies,
      testoPrivacy1: landing.params.get("*privacy_1"),
    };

    //   loading.value = true;
    //const resp = await SendData.sendLead({...data}) //Da sbloccare quando abbiamo api
    //if(resp.data.response==='OK'){
    //  loading.value = false;
    //notInjectForm.value = false;
    // successTitle.value =
    //   "Messaggio inviato.<br> Fai click sul link all'interno dell'sms <br> e procedi in autonomia con la richiesta.";
    // }else{

    // Vue.notify({
    //       title: "Errore nella richiesta",
    //       type: "error",
    //     });
    //  loading.value = false;
    // notInjectForm.value = true;
    //  }
    emit("submit", data);
    console.log(data);
    successTitle.value = `Grazie ${formData.value.name}!<br> Verrai contattato entro<br> un minuto da un nostro<br> specialist <br><br> Fai tap sul link ricevuto via sms<br> per confermare la richiesta`;
    notInjectForm.value = false;
  }
};

const onSubmitDelay = async () => {
  if (!v$.value.$invalid) {
    loading.value = true;
    let data = {
      name: formData.value.name ? formData.value.name : "-",
      surname: formData.value.surname ? formData.value.surname : "-",
      email: formData.value.email ? formData.value.email : "-",
      phone: formData.value.phone,
      orario: formData.value.orario.replace("-", " e le "),
      data: formData.value.date,
      ...formData.value.privacies,
      testoPrivacy1: landing.params.get("*privacy_1"),
    };

    //   loading.value = true;
    //const resp = await SendData.sendLead({...data}) //Da sbloccare quando abbiamo api
    //if(resp.data.response==='OK'){
    //  loading.value = false;
    //notInjectForm.value = false;
    //successTitle.value =
    //  "Messaggio inviato.<br> Fai click sul link all'interno dell'sms <br> e procedi in autonomia con la richiesta.";
    // }else{

    // Vue.notify({
    //       title: "Errore nella richiesta",
    //       type: "error",
    //     });
    //  loading.value = false;
    // notInjectForm.value = true;
    //  }
    emit("submit", data);
    console.log(data);
    successTitle.value = `Grazie ${
      formData.value.name
    }!<br> Verrai contattato il<br> <b>${new Date(data.data).toLocaleString(
      "it-IT",
      { day: "numeric", month: "long", year: "numeric" }
    )}</b><br class='d-lg-block d-none'> tra le <b>${
      data.orario
    }</b> <br ><br> Clicca sul link ricevuto via sms<br> per confermare la richiesta`;
    notInjectForm.value = false;
  }
};
</script>

<style lang="scss">
.pac-container {
  z-index: 99999;
}
.no-hover-text {
  display: block;
}

.hover-text {
  display: none;
}
.appointment-form-user button[title="Next month"],
.appointment-form-user button[title="Previous month"] {
  border: none !important;
}
.appointment-form-user {
  width: 40vw;
  overflow-x: hidden !important;

  input::placeholder {
    color: #636363;
  }
  input {
    font-size: 1.2rem;
    border-radius: 0.5rem;
    padding: 1.5rem;
  }

  label {
    font-weight: 500;
    font-size: 1.1rem;
  }

  .form-privacy-nested {
    font-size: 1rem;
    color: #979797;
    display: flex;
    flex-direction: column;
    gap: 0rem;

    &__children-toggle {
      padding-left: 0.5rem;
      color: map-get($theme-colors, "luce-gas");
      text-decoration: underline;
    }

    .custom-control-input:valid:checked ~ .custom-control-label::before {
      background-color: map-get($theme-colors, "luce-gas") !important;
      border-color: map-get($theme-colors, "luce-gas") !important;
    }

    .custom-control-label {
      color: #979797 !important;
      font-size: 0.9rem;
      margin-top: 2rem;
      line-height: 1.4;

      &::before,
      &::after {
        width: 1.5rem;
        height: 1.5rem;
        border: unset;
        filter: drop-shadow(1px 3px 2px rgba(0, 0, 0, 0.25));
      }
    }
  }
  &__choice-hours {
    .btn-secondary {
      border: 1px solid $secondary !important;
      color: $secondary !important;
      &:hover {
        background-color: $secondary !important;
        color: white !important;
      }
    }
  }
  &__call-later-container {
    position: relative;
    width: 100%;
  }
  &__alternative__cta {
    background-color: gray("500");
    color: $secondary;

    width: 100%;
    &:hover {
      background-color: $primary;
      color: white;
    }
  }

  .choices-time :first-child {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  //regole calendar

  .b-calendar-inner {
    .form-control {
      border: none !important;
    }
  }
  .form-control:focus {
    box-shadow: none !important;
  }

  .b-calendar-grid-body {
    .bg-light {
      background-color: white !important;
    }
  }
  button[title="Current month"] {
    display: none;
  }
  .flex-fill {
    flex: 0 0 auto !important;
  }
  .b-calendar-nav {
    justify-content: center;
    align-items: center;
    gap: 1rem;
    button {
      padding: 0 !important;
      width: 3rem;
      height: 3rem;
    }
  }
  .b-calendar-grid-caption {
    text-transform: capitalize;
    font-size: 1.5rem;
  }
  .b-calendar-inner {
    width: 100% !important;
  }
  .b-calendar-header,
  .b-calendar-grid-help {
    display: none;
  }
}
</style>
