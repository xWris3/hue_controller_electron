<template>
  <!-- A simple "Article" card for the light representation -->
  <article v-if="light" class="flex flex-col rounded-xl shadow-md bg-white p-4">
    <h1 class="text-center md:text-left text-xl font-semibold">
      {{ light.name }}
    </h1>
    <div class="flex flex-col items-center justify-center mt-4">
      <span>Brightness :</span>
      <round-slider
        name="bri"
        min="1"
        max="254"
        circleShape="pie"
        rangeColor="rgb(243 172 12)"
        startAngle="315"
        radius="75%"
        :editableTooltip="false"
        :tooltipFormat="sliderPercentage"
        :value="light.state.bri"
        @input="(payload) => setState({ bri: payload })"
      />
      <span>Color temperature :</span>
      <round-slider
        name="bri"
        :min="light.capabilities.control.ct.min"
        :max="light.capabilities.control.ct.max"
        circleShape="half-top"
        startAngle="315"
        radius="75%"
        :editableTooltip="false"
        :tooltipFormat="sliderPercentage"
        :value="light.state.ct"
        @input="(payload) => setState({ ct: payload })"
      />
      <button
        @click="toggleLight()"
        :class="{
          'bg-red-500 hover:bg-red-700': light.state.on,
          'bg-green-500 hover:bg-green-700': !light.state.on,
        }"
        class="text-white rounded w-2/3 mt-4 py-2"
      >
        <span v-if="light.state.on">Turn off</span>
        <span v-else>Turn on</span>
      </button>
    </div>
    <div class="mb-16"></div>
  </article>
</template>

<script>
import axios from "axios";
import RoundSlider from "vue-round-slider";

export default {
  name: "HueLight",
  components: {
    RoundSlider,
  },
  props: {
    apiId: String,
    uri: String,
  },
  computed: {
    baseApiUri() {
      return `${this.uri}/lights`;
    },
  },
  created: function () {
    this.fetchLight();
  },
  data() {
    return {
      light: null,
    };
  },
  methods: {
    fetchLight() {
      axios
        .get(`${this.baseApiUri}/${this.apiId}`)
        .then((response) => {
          // handle success
          this.light = response.data;
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
    },
    fetchState() {
      axios
        .get(`${this.baseApiUri}/${this.apiId}/state`)
        .then((response) => {
          // handle success
          this.light.state = response.data;
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
    },
    setState(state) {
      axios
        .put(`${this.baseApiUri}/${this.apiId}/state`, state)
        .then((response) => {
          response.data.forEach((feedback) => {
            if ("success" in feedback) {
              this.handleStateSuccess(feedback.success);
            } else {
              this.handleStateError(feedback.error);
            }
          });
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
    },
    handleStateError(error) {
      // TODO: improve on that to handle error and relay api message
      console.log(error);
    },
    handleStateSuccess(success) {
      let key = Object.keys(success)[0].split("/").pop();
      let value = Object.values(success)[0];

      this.light.state[key] = value;
    },
    toggleLight() {
      this.setState({ on: !this.light.state.on }); // send state to api
    },
    sliderPercentage: function (arg) {
      return `${Math.round((arg.value / arg.options.max) * 100)}%`;
    },
  },
};
</script>

<style>
</style>