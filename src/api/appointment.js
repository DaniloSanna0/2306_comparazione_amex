//import axios from "./axios.js";

let appointment = {
  data: {
    result: "OK",
    list: [
      {
        start: "2023-8-14 10:35",
        end: "2023-8-14 11:30",
      },
      {
        start: "2023-8-15 10:35",
        end: "2023-8-15 11:30",
      },
      {
        start: "2023-8-16 16:35",
        end: "2023-8-16 18:00",
      },
    ],
  },
};

export default {
  getAppointment() {
    //const objectInJson = JSON.stringify(data);
    // return axios.post(
    //   import.meta.env.VITE_DB_URL + "/investors/",
    //   objectInJson
    // );
    return appointment;
  },
  CreateAppointment() {
    //const objectInJson = JSON.stringify(data);
    // return axios.post(
    //   import.meta.env.VITE_DB_URL + "/investors/",
    //   objectInJson
    // );
    return appointment;
  },
};
