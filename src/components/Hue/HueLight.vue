<template>
  <!-- A simple "Article" card for the light representation -->
  <article v-if="light" class="flex flex-col rounded-xl shadow-md bg-white p-4">
    <h1 class="text-center md:text-left text-xl font-semibold">
      {{ light.name }}
    </h1>
    <div class="flex items-center justify-center mt-4">
      <button
        @click="toggleLight()"
        :class="{
          'bg-red-500 hover:bg-red-700': light.state.on,
          'bg-green-500 hover:bg-green-700': !light.state.on,
        }"
        class="text-white rounded px-1 mx-2"
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

export default {
  name: "HueLight",
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
    setState() {
      axios
        .put(`${this.baseApiUri}/${this.apiId}/state`, this.light.state) //will probably fail, need to put only specific state properties
        .then((response) => {
          // handle success
          //TODO : Gérer le retour de l'api pour les refus de modifications, et garder un state local représentatif de l'état renvoyé
          //this.light.state = response.data;
          console.log(response.data);
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
    },
    toggleLight() {
      this.light.state.on = !this.light.state.on; //inverse state
      this.setState(); // send state to api
    },
  },
};
</script>

<style>
</style>