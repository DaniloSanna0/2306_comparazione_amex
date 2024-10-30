<template>
  <section class="consulant">
    <div v-if="!notInjectForm && !showCalendar">
      <div class="px-10 pt-7 text-primary big">
        Trova l'agente più vicino a te
      </div>
      <AppMaps
        class="px-10 py-4"
        @openCalendar="showCalendar = true"
        @selected="verify($event)"
      >
        <div>
          <b-button
            class="btn-variant rounded-pill mx-auto px-7"
            @click="notInjectForm = true"
            >Indietro</b-button
          >
        </div></AppMaps
      >
    </div>
    <div v-if="notInjectForm">
      <div
        class="text-primary py-6 text-center"
        :class="{ big: isBigDesk }"
        v-html="formSubtitle"
      ></div>

      <form
        id="consultant-form-user"
        class="form needs-validation d-flex flex-column gap-3"
        :class="{ 'was-validated': !v$.$invalid }"
        novalidate
        autocomplete="off"
        @submit.prevent
      >
        <div class="px-8 py-6">
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
          <div class="center">
            <button
              name="submit"
              class="btn-variant rounded-pill mt-5 w-50 mb-5"
              :class="{ disabled: v$.$invalid || loading }"
              @click="notInjectForm = false"
            >
              <span class="spinner-border" role="status" v-if="loading"> </span>
              <span v-else> {{ buttonText }}</span>
            </button>
          </div>
        </div>
      </form>
    </div>

    <div v-if="showCalendar && !confirm">
      <VueCal
        small
        :class="{ 'pointer-events-none': delay }"
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
        <b-button
          class="rounded-pill px-7 btn-variant"
          @click="showCalendar = false"
          >Indietro</b-button
        >
      </div>
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
        Il
        {{ formData.start_date.replace(" ", " alle ").slice(0, -3) }} ?<br />
      </div>
      <div class="center gap-6">
        <b-button
          class="rounded-pill px-7 btn-variant"
          @click="(confirm = null), events.pop()"
          >Indietro</b-button
        >
        <b-button
          class="btn-variant rounded-pill px-7"
          variant="primary"
          @click="Submit"
          >Avanti</b-button
        >
      </div>
    </div>
    <div :class="{ 'py-8': sended }">
      <success-page v-if="sended === true" :title="successTitle" />
    </div>
  </section>
</template>

<script setup>
import { inject, ref, onMounted } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email, helpers } from "@vuelidate/validators";
import { usePrivaciesFormSchemas } from "@/composables";
import { FormPrivacy } from "@smart-contact/smartify";
//import { SendData } from "@/api/index.js"; //Da sbloccare quando abbiamo api
import SuccessPage from "@/components/SuccessPage.vue";
//import { useRouter } from "vue2-helpers/vue-router";
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";
import AppMaps from "@/components/AppMaps.vue";
import { Appointment } from "@/api/";
import Vue from "vue";
// import { Map } from "@/api/";

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
    default: "Avanti",
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

// const emit = defineEmits(["submit"]);
const notInjectForm = ref("notInjectForm");
const { model } = usePrivaciesFormSchemas();
const landing = inject("landing");
const showCalendar = ref(false);
const loading = ref(false);
const confirm = ref(false);
const sended = ref(false);
const isBigDesk = inject("isBigDesk");
const confirmData = ref(null);
let successTitle = ref("");
const delay = ref(false);

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

const verify = (data) => {
  confirmData.value = data;
  formData.value.consulant_name = data.name;
  formData.value.consulant_adress = data.indirizzo;
  console.log(data);
};

const events = ref(null);
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

const createEvent = async (date) => {
  events.value.push(date);
  console.log(date);
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

const formData = ref({
  name: undefined,
  surname: undefined,
  email: undefined,
  phone: undefined,
  start_date: undefined,
  end_date: undefined,
  consulant_name: undefined,
  consulant_adress: undefined,

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
  start_date: {},
  end_date: {},

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
    consulant_adress: formData.value.consulant_adress,
    consulant_name: formData.value.consulant_name,
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
//functions
// const onSubmit = async () => {
//   if (!v$.value.$invalid) {
//     loading.value = true;
//     let data = {
//       name: formData.value.name ? formData.value.name : "-",
//       surname: formData.value.surname ? formData.value.surname : "-",
//       email: formData.value.email ? formData.value.email : "-",
//       phone: formData.value.phone,
//       // start_date: formData.value.start_date,
//       // end_date: formData.value.end_date,
//       ...formData.value.privacies,
//       testoPrivacy1: landing.params.get("*privacy_1"),
//     };

//     //   loading.value = true;
//     //const resp = await SendData.sendLead({...data}) //Da sbloccare quando abbiamo api
//     //if(resp.data.response==='OK'){
//     //  loading.value = false;
//     //notInjectForm.value = false;
//     // }else{

//     // Vue.notify({
//     //       title: "Errore nella richiesta",
//     //       type: "error",
//     //     });
//     //  loading.value = false;
//     // notInjectForm.value = true;
//     //  }
//     emit("submit", data);
//     console.log(data);
//     notInjectForm.value = false;
//   }
// };
</script>

<style lang="scss">
// .consulant {
//   height: 87vh;
// }
.vuecal {
  width: 40rem !important;
  height: auto !important;
  &__event-title {
    display: none;
  }

  &__event {
    background-color: #d2d2d2;
    border-radius: 0.8rem;
  }
  &__event-time {
    display: none;
  }

  &__no-event {
    display: none;
  }
  &__header button {
    font-size: 2rem;
  }
  &__flex span {
    font-size: 1.4rem;
  }
}

.pac-container {
  z-index: 99999;
}
#consultant-form-user {
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
}
.business-hours {
  background-color: rgba(20, 146, 230, 0.15);
  border: solid rgba(0, 65, 159, 0.3);
  border-width: 2px 0;
}

.confirm {
  text-decoration: underline;
}
</style>
