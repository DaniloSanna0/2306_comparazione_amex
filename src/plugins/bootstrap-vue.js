import Vue from "vue";

import {
  ButtonPlugin,
  OverlayPlugin,
  SpinnerPlugin,
  ModalPlugin,
  BIcon,
  BIconTelephoneFill,
  FormRadioPlugin,
  CalendarPlugin,
  BFormGroup,
} from "bootstrap-vue";

Vue.use(ButtonPlugin);
Vue.use(SpinnerPlugin);
Vue.use(OverlayPlugin);
Vue.use(ModalPlugin);
Vue.use(FormRadioPlugin);
Vue.use(CalendarPlugin);

Object.entries({
  BIcon,
  BFormGroup,
  BIconTelephoneFill,
}).forEach(([name, component]) => Vue.component(name, component));
