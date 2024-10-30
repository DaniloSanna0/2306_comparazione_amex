import axios from "./axios.js";

export default {
  sendLead(data) {
    const objectInJson = JSON.stringify(data);
    return axios.post(
      import.meta.env.VITE_DB_URL + "/investors/",
      objectInJson
    );
  },
  sendLeadDelay(data) {
    const objectInJson = JSON.stringify(data);
    return axios.post(
      import.meta.env.VITE_DB_URL + "/investors/",
      objectInJson
    );
  },
};
