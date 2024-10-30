<template>
  <section>
    <gmap-autocomplete
      class="pb-6"
      placeholder="Inserisci un indirizzo, città o CAP"
      @place_changed="setPlace"
    />
    <GmapMap
      :center="mapCenter"
      :zoom="10"
      map-type-id="roadmap"
      style="width: 570px; height: 370px"
      :options="{
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: true,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        disableDefaultUi: false,
      }"
    >
      <GmapMarker :position="mapCenter" />
      <GmapMarker
        :icon="m.isSelectedMarker ? gmapMarkerIconsSelected : gmapMarkerIcons"
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        @click="selectedMarkerIndex(index), $emit('selected', selectedMarker)"
      />
    </GmapMap>
    <div v-if="selectedMarker" class="">
      <div class="text-primary-alt pt-6">
        {{ selectedMarker.name }}
        {{ selectedMarker.ruolo }} <br />
      </div>
      <div class="text-tertiary">
        {{ selectedMarker.indirizzo }} <br />
        orari : {{ selectedMarker.orari }}, giorni : {{ selectedMarker.giorni }}
      </div>
      <div class="center py-6 gap-6">
        <slot />
        <b-button
          class="button rounded-pill px-7"
          @click="$emit('openCalendar')"
          >Conferma</b-button
        >
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { Map } from "@/api/";
import markerIcon from "@/assets/images/markerLogo.webp";
import markerIconSelected from "@/assets/images/markerLogoSelected.webp";

const ROME_LOCATION = { lat: 41.8967838, lng: 12.5062219 };

const gmapMarkerIcons = {
  url: markerIcon,
  scaledSize: { width: 32, height: 32 },
};
const gmapMarkerIconsSelected = {
  url: markerIconSelected,
  scaledSize: { width: 32, height: 32 },
};
const mapCenter = ref(ROME_LOCATION);
const markers = ref([]);
const selectedMarker = ref(null);

const setPlace = function (data) {
  mapCenter.value.lat = data.geometry.location.lat();
  mapCenter.value.lng = data.geometry.location.lng();
};

const selectedMarkerIndex = function (index) {
  selectedMarker.value = markers.value[index];

  markers.value.forEach((marker, i) => {
    marker.isSelectedMarker = i === index;
  });
};

onMounted(async () => {
  try {
    let resp = await Map.getMarkers(mapCenter);

    if (resp.data.result == "OK") {
      markers.value = resp.data.list;
    }
  } catch (error) {
    console.error(error);
  }
});
</script>

<style lang="scss">
.pac-target-input {
  height: 2rem !important;
  padding: 1.5rem !important;
  padding-left: 1rem !important;
  padding-right: 1rem !important;
  width: 100%;
  border: 1px solid gray !important;
  border-radius: 0.8rem !important;
  &::placeholder {
    font-size: 1.5rem !important;
  }
}
</style>
