<template>
  <div class="flex flex-col justify-center text-center bg-gray-300 m-4 rounded">
    <div v-if="knownHubs.length || unknownHubs.length">
      <h1 class="text-xl">Detected hubs:</h1>
      <!-- Known hubs (i.e hubs with an API token in config files) -->
      <div v-if="knownHubs.length" class="bg-white m-4 p-4 rounded">
        <h1 class="text-xl">Known hubs:</h1>
        <article
          class="bg-green-200 m-2 p-2 rounded"
          v-for="hub in knownHubs"
          :key="hub.id"
        >
          <span>IP: {{ hub.internalipaddress }} (id: {{ hub.id }})</span>
          <button
            @click="
              $router.push({
                name: 'HueHub',
                params: {
                  hub: {
                    id: hub.id,
                    ip: hub.internalipaddress,
                    username: settings.hubs[hub.id].username,
                  },
                },
              })
            "
            class="bg-green-500 hover:bg-green-700 text-white rounded px-1 mx-2"
          >
            Control
          </button>
        </article>
      </div>
      <!-- Unknown hubs (i.e without token) -->
      <div v-if="unknownHubs.length" class="bg-white m-4 p-4 rounded">
        <h1 class="text-xl">Unknown hubs:</h1>
        <article
          class="bg-gray-200 m-2 p-2 rounded"
          v-for="hub in unknownHubs"
          :key="hub.id"
        >
          <span>IP: {{ hub.internalipaddress }} (id: {{ hub.id }})</span>
          <button
            @click="hubSetup(hub.id, hub.internalipaddress)"
            class="bg-gray-500 hover:bg-gray-700 text-white rounded px-1 mx-2"
          >
            Configure
          </button>
        </article>
      </div>
    </div>
    <div v-else>
      <h1 class="text-xl">No hubs detected on your network.</h1>
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

  // TODO: rewrite the methods bellow to use the app name + both the machine name and the username as api app identifier
  // TODO: use Vuex nd the methods from the preload because ipc is not exposed anymore.

  methods: {
    hubSearch() {
      axios
        .get("https://discovery.meethue.com/")
        .then((response) => {
          // handle success
          this.knownHubs = response.data.filter((hub) => {
            return hub.id in this.settings.hubs;
          });
          this.unknownHubs = response.data.filter((hub) => {
            return !(hub.id in this.settings.hubs);
          });
        })
        .catch((error) => {
          // handle error
          //Clear array, in case of error this will represent the api call result (empty)
          console.log(error);
          this.knownHubs = [];
          this.unknownHubs = [];
        });
    },

    hubSetup(hubId, hubIp) {
      const requestDeviceType = {
        devicetype: `electron_hue_app#${this.systemUser}`,
      };
      axios.post(`http://${hubIp}/api`, requestDeviceType).then((response) => {
        // Request contains error until the button of hub is pressed
        if (response.data[0]["error"]) {
          window.ipc.invoke("messagebox", {
            type: "info",
            title: "Setup your Hub",
            message: "Please go press the hub button and retry.",
          });
          // Success: Button was pressed
        } else if (response.data[0]["success"]) {
          window.ipc.invoke("save-config", `hubs.${hubId}`, {
            username: response.data[0]["success"]["username"],
            requestDeviceType,
          });
        } else {
          window.ipc.invoke("errorbox", {
            content: "Error: unhandled hub api response.",
          });
        }
      });
    },
  },
};
</script>

<style>
</style>