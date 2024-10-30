<template>
  <section>
    <div v-if="notInjectForm">
      <div
        class="text-primary py-6 text-center"
        v-html="formSubtitle"
        :class="{ big: isBigDesk }"
      ></div>
      <form
        id="user-data-form"
        class="form needs-validation d-flex flex-column gap-3"
        :class="{ 'was-validated': !v$.$invalid }"
        novalidate
        autocomplete="off"
        @submit.prevent="onSubmit"
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
            <b-button
              name="submit"
              class="btn-variant rounded-pill btn mt-5 w-50 mb-5"
              :class="{ disabled: v$.$invalid || loading }"
              @click="onSubmit"
            >
              <span class="spinner-border" role="status" v-if="loading"> </span>
              <span v-else> {{ buttonText }}</span>
            </b-button>
          </div>
        </div>
      </form>
    </div>

    <div :class="{ 'py-8': !notInjectForm }">
      <success-page
        v-if="!notInjectForm"
        title="Messaggio inviato.<br> Fai click sul link all'interno dell'sms<br> e procedi in autonomia con la richiesta."
      />
    </div>
  </section>
</template>

<script setup>
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

const emit = defineEmits(["submit"]);
const notInjectForm = ref("notInjectForm");
const { model } = usePrivaciesFormSchemas();
const landing = inject("landing");
const loading = ref(false);
const isBigDesk = inject("isBigDesk");
//const router = useRouter();
//data
const formData = ref({
  name: undefined,
  surname: undefined,
  email: undefined,
  phone: undefined,

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
</script>

<style lang="scss">
.pac-container {
  z-index: 99999;
}
#user-data-form {
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
</style>
