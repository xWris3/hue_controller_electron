<template>
  <div class="flex items-stretch">
    <section class="flex flex-wrap w-4/6">
      <div
        v-for="(light, lightId) in lights"
        :key="light.uniqueid"
        class="w-full md:w-1/3 p-4"
      >
        <HueLight :apiId="lightId" :uri="baseApiUri" />
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import HueLight from "@/components/Hue/HueLight.vue";

export default {
  name: "HubController",
  components: {
    HueLight,
  },
  props: {
    ip: String,
    id: String,
    username: String,
  },
  computed: {
    baseApiUri() {
      return `http://${this.ip}/api/${this.username}`;
    },
  },
  data() {
    return {
      lights: [],
    };
  },
  created: function () {
    this.fetchLights();
  },
  methods: {
    fetchLights() {
      axios
        .get(this.baseApiUri)
        .then((response) => {
          // handle success
          this.lights = response.data.lights;
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
    },
  },
};
</script>

<style>
</style>