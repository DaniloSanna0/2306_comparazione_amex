<template>
  <section>
    <div v-if="!openMaps" class="position-relative bg-primary-alt py-11"></div>
    <div v-if="!openMaps" class="choice__card position-absolute">
      <img
        src="../../assets/images/creditCard-mobile-mini.webp"
        alt="Credit Card"
        class="img-contain w-75"
      />
    </div>
    <div
      v-if="calendarVisible && !calendarSuccess && !openMaps"
      class="calendar-title text-center text-secondary-alt pt-8"
    >
      Seleziona il giorno e la fascia oraria che preferisci
    </div>
    <div v-if="!submit && notInjectForm && !openMaps">
      <div class="choice__title container pt-8 text-center">
        Compila il modulo con i tuoi dati
      </div>
      <form
        id="mobile-user-data-form"
        class="form needs-validation d-flex flex-column gap-3"
        :class="{ 'was-validated': !v$.$invalid }"
        novalidate
        autocomplete="off"
      >
        <div class="px-6">
          <label for="nameInput" class="form-label">Nome</label>
          <input
            type="text"
            placeholder="Inserisci il tuo Nome"
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

        <div class="px-6">
          <label for="surnameInput" class="form-label">Cognome</label>
          <input
            type="text"
            name="surname"
            placeholder="Inserisci il tuo Cognome"
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

        <div class="px-6">
          <label for="emailInput" class="form-label">Email</label>
          <input
            type="text"
            name="email"
            placeholder="Inserisci il tuo indirizzo eMail"
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

        <div class="px-6">
          <label for="phoneInput" class="form-label">Cellulare</label>
          <div class="flex-grow-1">
            <input
              type="tel"
              name="phone"
              placeholder="Inserisci il tuo numero di Cellulare"
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
          class="px-6"
          :schema="model[0]"
          :state="v$.privacies"
          @click="v$.privacies.$touch()"
          v-model="formData.privacies"
        />
        <div
          class="text-white text-center bg-secondary"
          :class="{ 'opacity-50 pointer-events-none': v$.$invalid }"
        >
          <div
            class="border-bottom border-white p-2 py-5"
            @click="submit = true"
          >
            PARLA CON UN CONSULENTE
          </div>
          <div
            class="border-bottom border-white p-2 py-5"
            @click="openMaps = true"
          >
            FISSA L'APPUNTAMENTO CON UN AGENTE
          </div>
          <div class="p-2 py-5" @click.prevent="onSubmit">
            RICHIEDILA ONLINE
          </div>
        </div>
      </form>
    </div>
    <div
      v-if="notInjectForm && submit && !calendarVisible && !calendarSuccess"
      class="d-flex flex-column mx-auto text-center w-75 px-4 py-10 gap-4"
    >
      <div class="button" @click="onSubmitDirect">CHIAMAMI ORA</div>
      <hr class="w-75 text-tertiary" />
      <div class="btn-variant" @click="calendarVisible = true">
        SCELGO DATA E ORARIO
      </div>
    </div>
    <!-- MAPS -->
    <div v-if="openMaps && !showCalendar">
      <AppMapsMobile
        class="center flex-column"
        @openCalendar="showCalendar = true"
        @selected="verify($event)"
        ><div>
          <b-button
            class="btn-variant mx-auto px-10 my-6"
            @click="openMaps = false"
            >Indietro</b-button
          >
        </div></AppMapsMobile
      >
    </div>

    <div v-if="confirm && !sended" class="p-10">
      <div class="text-tertiary">Confermi l'appuntamento con agente?</div>
      <div class="primary pt-6 text-center pb-2">
        {{ confirmData.name }}, tel {{ confirmData.telefono }} <br />
      </div>
      <div
        class="confirm text-primary big text-center pb-6"
        @click="(confirm = null), events.pop()"
      >
        Il {{ formData.start_date.replace(" ", " alle ").slice(0, -3) }} ?<br />
      </div>
      <div class="center gap-6">
        <b-button
          class="rounded-pill px-7 btn-variant"
          @click="(confirm = null), events.pop()"
          >Indietro</b-button
        >
        <b-button
          class="rounded-pill px-7 btn-primary"
          variant="primary"
          @click="Submit"
          >Avanti</b-button
        >
      </div>
    </div>
    <!--CALENDARIO  -->

    <div v-if="showCalendar && !confirm">
      <VueCal
        small
        hide-view-selector
        locale="it"
        :time-from="9 * 60"
        :time-to="21 * 60"
        :hide-weekdays="[7]"
        :special-hours="specialHours"
        :min-date="new Date().addDays(1)"
        :events="events"
        @cell-click="onCellClick"
      />
      <div class="center py-6">
        <b-button class="px-10 btn-variant" @click="showCalendar = false"
          >Indietro</b-button
        >
      </div>
    </div>
    <!--CALENDARIO  -->
    <div v-if="calendarVisible && !calendarSuccess">
      <div class="mx-lg-auto py-6">
        <b-calendar
          :min="new Date().addDays(1)"
          class="w-100 px-5 mx-auto center"
          :hide-header="hideHeader"
          v-model="v$.date.$model"
          locale="it-IT"
        ></b-calendar>
      </div>

      <div class="center flex-column mb-6" v-if="v$.date.$model">
        <b-form-group class="choices-time center flex-column gap-4 mt-5">
          <b-form-radio
            class="radios text-center"
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

    <div class="center flex-column" v-if="formData.orario && !calendarSuccess">
      <div class="big">
        {{ v$.date.$model.split("-").reverse().join("/") }}
      </div>
      <div class="text-secondary">
        Nella fascia oraria {{ v$.orario.$model }}
      </div>
      <div>
        <button
          @click.prevent="onSubmitDelay"
          name="submit"
          class="button font-weight-bold rounded-pill py-6 mt-5 px-10 mb-5"
          :class="{ 'disabled pointer-events-none': v$.$invalid }"
        >
          <span class="spinner-border" role="status" v-if="loading"> </span>
          <span v-else> {{ buttonText }}</span>
        </button>
      </div>
    </div>
    <!--  -->
    <div>
      <success-page
        v-if="!notInjectForm"
        :title="`Grazie ${formData.name}!<br>Ti abbiamo inviato un messaggio.<br> Fai clic sul link all’interno dell’sms<br> e procedi in autonomia<br> con la richiesta della carta`"
      />
      <success-page class="pt-7" v-if="calendarSuccess" :title="successTitle" />

      <success-page v-if="sended === true" :title="successTitle" />
    </div>
  </section>
</template>

<script setup>
import { inject, ref, onMounted } from "vue";
import Vue from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email, helpers } from "@vuelidate/validators";
import { usePrivaciesFormSchemas } from "@/composables";
import { FormPrivacy } from "@smart-contact/smartify";
//import { SendData } from "@/api/index.js"; //Da sbloccare quando abbiamo api
import SuccessPage from "@/components/SuccessPage.vue";
//import { useRouter } from "vue2-helpers/vue-router";
import { choiceButtonsAppointment } from "../../../contents.js";
import AppMapsMobile from "../AppMapsMobile.vue";
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";
import { Appointment } from "@/api/";

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
    default: "Conferma",
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
const notInjectForm = ref("false");
const calendarSuccess = ref(false);
const { model } = usePrivaciesFormSchemas();
const landing = inject("landing");
const openMaps = ref(false);
const loading = ref(false);
const calendarVisible = ref(false);
const showCalendar = ref(false);
const events = ref(null);
const confirm = ref(false);
const confirmData = ref(null);
const sended = ref(false);
const delay = ref(false);
let submit = ref(false);
let successTitle = ref("");
const hideHeader = ref(false);

const dailyHours = [
  { from: 9 * 60, to: 13 * 60, class: "business-hours" },
  { from: 14 * 60, to: 21 * 60, class: "business-hours" },
];
const specialHours = {
  1: dailyHours,
  2: dailyHours,
  3: dailyHours,
  4: dailyHours,
  5: dailyHours,
  6: dailyHours,
};

// const mindate = computed(() => {
//   return new Date().addDays(1);
// });

const verify = (data) => {
  confirmData.value = data;
  formData.value.consulant = data.indirizzo;
  console.log(data);
};

const createEvent = async (date) => {
  events.value.push(date);
};
const onCellClick = (date) => {
  const selectedHour = date.getHours();
  if (selectedHour >= 13 && selectedHour < 14) {
    Vue.notify({
      title: "Orario non disponibile",
      type: "error",
    });
    return;
  }
  createEvent({
    start: `${date.toDateString()} ${date.getHours()}:00:00`,
    end: `${date.toDateString()} ${date.getHours() + 1}:00:00`,
  });

  formData.value.start_date = `${date.toLocaleDateString(
    "it"
  )} ${date.getHours()}:00:00`;
  formData.value.end_date = `${date.toLocaleDateString("it")} ${
    date.getHours() + 1
  }:00:00`;

  delay.value = true;
  setTimeout(() => {
    confirm.value = true;
    delay.value = false;
  }, 500);
};

onMounted(async () => {
  try {
    let resp = await Appointment.getAppointment(events);

    if (resp.data.result == "OK") {
      events.value = resp.data.list;
    }
  } catch (error) {
    console.error(error);
  }
});

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

const Submit = () => {
  let data = {
    name: formData.value.name ? formData.value.name : "-",
    surname: formData.value.surname ? formData.value.surname : "-",
    email: formData.value.email ? formData.value.email : "-",
    phone: formData.value.phone,
    start_date: formData.value.start_date,
    end_date: formData.value.end_date,
    consulant: formData.value.consulant,
    ...formData.value.privacies,
    testoPrivacy1: landing.params.get("*privacy_1"),
  };
  sended.value = true;
  successTitle.value = `Grazie ${formData.value.name}!<br><br> L'appuntamento è stato confermato.`;
  console.log(data);

  try {
    let resp = Appointment.CreateAppointment(data);

    if (resp.data.result == "OK") {
      console.log(data);
    }
  } catch (error) {
    console.error(error);
  }
};

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
    notInjectForm.value = false;
  }
};

const onSubmitDirect = async () => {
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
    emit("submit", data);
    console.log(data);
    successTitle.value = `Grazie ${formData.value.name}!<br> Verrai contattato entro un minuto da un nostro specialist <br><br> Fai tap sul link ricevuto via sms per confermare la richiesta`;
    calendarSuccess.value = true;
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
    emit("submit", data);
    console.log(data);
    successTitle.value = `Grazie ${
      formData.value.name
    }!<br> Verrai contattato il <b>${new Date(data.data).toLocaleString(
      "it-IT",
      { day: "numeric", month: "long", year: "numeric" }
    )}</b><br class='d-lg-block d-none'> tra le <b>${
      data.orario
    }</b> <br ><br> Clicca sul link ricevuto via sms per confermare la richiesta`;
    calendarSuccess.value = true;
  }
};
</script>

<style lang="scss">
.vuecal {
  width: 37.5rem !important;
  height: 56rem;
  &__no-event {
    display: none;
  }
}

.pac-container {
  z-index: 99999;
}
#mobile-user-data-form label {
  font-size: 1.5rem !important;
  color: #707070 !important;
}
#mobile-user-data-form input {
  font-size: 1.8rem !important;
  border-radius: 1.5rem !important;
  // color: #636363;
}

#mobile-user-data-form .form-privacy-nested .custom-control-label::before,
#mobile-user-data-form .form-privacy-nested .custom-control-label::after {
  border-radius: 1rem !important;
  width: 2.5rem !important;
  height: 2.5rem !important;
}

.btn-variant.mx-auto.px-10.my-6 {
  padding-left: 9.5rem !important;
  padding-right: 9.5rem !important;
}

#mobile-user-data-form .form-privacy-nested .custom-control-label {
  padding-left: 1.5rem;
}

.form-control {
  background-color: white !important;
  border: 1px solid #707070 !important;
}

.calendar-title {
  font-weight: 500;
}
.radios {
  label {
    width: 60vw;
    padding: 2rem;
    font-size: 1.5rem;
    border-radius: 50rem;
    color: #0e74d5;
    background-color: transparent;
    border: 1px solid #0e74d5;
  }
}

#mobile-user-data-form {
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
      background-color: none !important;
      border-color: none !important;
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

.b-calendar .b-calendar-grid-caption {
  padding: 1.25rem !important;
}
.b-calendar-grid-caption {
  font-size: 2.5rem !important;
}

button[title="Next year"],
button[title="Previous year"] {
  display: none;
}
button[title="Current month"] {
  display: none;
}
.choices-time :first-child {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
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

.b-calendar .b-calendar-grid-body .col[data-date] .btn {
  width: 47px !important;
  height: 47px !important;
  font-size: 14px !important;
  line-height: 0 !important;
  margin: 3px auto !important;
  padding: 23px 2px !important;
}

.confirm {
  text-decoration: underline;
}

@include media-breakpoint-down("md") {
  input::placeholder {
    color: rgba(9, 117, 210, 0.5) !important;
  }
}
</style>
