//import axios from "./axios.js";

let fakeMarkers = {
  data: {
    result: "OK",
    list: [
      {
        position: { lat: 41.88, lng: 12.75 },
        name: "Paolo Rossi",
        orari: "09-21",
        giorni: "lun-ven",
        telefono: 3333333333,
        indirizzo: "Via Roma 1, Milano, MI",
        ruolo: "agente AMEX Meglioquesto",
      },
      {
        position: { lat: 41.98, lng: 12.55 },
        name: "Giovanni Rossi",
        orari: "08-12",
        giorni: "lun-ven",
        telefono: 3333333333,
        indirizzo: "Via cina 55, Cagliari, Ca",
        ruolo: "agente segreto Amazon",
      },
      {
        position: { lat: 41.78, lng: 12.45 },
        name: "Giuda Farris",
        orari: "12-20",
        giorni: "lun-sab",
        telefono: 3333333333,
        indirizzo: "Via Togliatti 33, Sinai, RO",
        ruolo: "Agente service now",
      },
    ],
  },
};

export default {
  getMarkers() {
    //const objectInJson = JSON.stringify(data);
    // return axios.post(
    //   import.meta.env.VITE_DB_URL + "/investors/",
    //   objectInJson
    // );
    return fakeMarkers;
  },
};
