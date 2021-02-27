<template>
  <div class="flex flex-col justify-center text-center bg-gray-300 m-4 rounded">
    <h1 class="text-xl">Detected hubs:</h1>
    <!-- Known hubs (i.e hubs with an API token in config files) -->
    <div v-if="knownHubs.length" class="bg-white m-4 rounded">
      <h1 class="text-xl">Known hubs:</h1>
      <article
        class="bg-green-200 underline cursor-pointer m-2 rounded"
        v-for="hub in knownHubs"
        :key="hub.id"
      >
        <span>IP: {{ hub.internalipaddress }} (id: {{ hub.id }})</span>
      </article>
    </div>
    <!-- Unknown hubs (i.e without token) -->
    <div v-if="unknownHubs.length" class="bg-white m-4 rounded">
      <h1 class="text-xl">Unknown hubs:</h1>
      <article
        @click="hubSetup(hub.id, hub.internalipaddress)"
        class="bg-white underline cursor-pointer m-2 rounded"
        v-for="hub in unknownHubs"
        :key="hub.id"
      >
        <span>IP: {{ hub.internalipaddress }} (id: {{ hub.id }})</span>
      </article>
    </div>
    <button
      @click="hubSearch()"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-b p-x-10"
    >
      Rescan !
    </button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "HubSelector",
  props: {
    settings: Object,
    systemUser: String,
  },

  data() {
    return {
      unknownHubs: [],
      knownHubs: [],
    };
  },

  created: function () {
    this.hubSearch();
  },

  methods: {
    hubSearch() {
      axios
        .get("https://discovery.meethue.com/")
        .then((response) => {
          // handle success
          response.data.forEach((element) => {
            if (this.settings.hubs[element.id]) {
              this.knownHubs.push(element);
            } else {
              this.unknownHubs.push(element);
            }
          });
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    },

    hubSetup(hubId, hubIp) {
      const requestDeviceType = {
        devicetype: `electron_hue_app#${this.systemUser}`,
      };
      axios.post(`http://${hubIp}/api`, requestDeviceType).then((response) => {
        // Request contains error until the button of hub is pressed
        if (response.data[0]["error"]) {
          alert("Please press your hub button and retry.");
          // Success: Button was pressed
        } else if (response.data[0]["success"]) {
          window.ipc.invoke("save-config", `hubs.${hubId}`, {
            username: response.data[0]["success"]["username"],
            requestDeviceType,
          });
        } else {
          alert("Unhandled response.");
        }
      });
    },
  },
};
</script>

<style>
</style>