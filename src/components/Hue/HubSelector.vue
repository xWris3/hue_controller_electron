<template>
  <div class="flex flex-col justify-center text-center bg-gray-300 m-4 rounded">
    <!-- hubSetupModal -->
    <Modal v-if="hubSetupModal">
      <template v-slot:header>Hub pairing</template>
      <template v-slot:body>
        <div>
          <svg class="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
        <div>Please press the button on your hub</div>
      </template>
      <template v-slot:footer>
        <button
          class="
            bg-blue-500
            hover:bg-blue-700
            text-white
            p-2
            font-semibold
            rounded
          "
          @click="hubSetupModal = false"
        >
          Close (stop pairing process)
        </button>
      </template>
    </Modal>
    <!-- /hubSetupModal -->

    <span>{{ apiAppId }}</span>
    <div v-if="knownHubs.length || unknownHubs.length">
      <h1 class="text-xl">Detected hubs:</h1>
      <!-- Known hubs (i.e hubs with an API token in config files) -->
      <div v-if="knownHubs.length" class="bg-white m-4 p-4 rounded">
        <h1 class="text-xl">Known hubs:</h1>
        <article
          class="bg-green-200 m-2 p-2 rounded"
          v-for="hub in knownHubs"
          :key="hub.bridgeid"
        >
          <span>{{ hub.name }} (id: {{ hub.bridgeid }})</span>
          <button
            @click="
              $router.push({
                name: 'HueHub',
                params: {
                  hub: {
                    id: hub.bridgeid,
                    ip: hub.ip,
                    username: $store.state.config.hubs[hub.id].username,
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
          :key="hub.bridgeid"
        >
          <span>{{ hub.name }} (id: {{ hub.bridgeid }})</span>
          <button
            @click="hubSetup(hub.bridgeid, hub.ip)"
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
      class="
        bg-blue-500
        hover:bg-blue-700
        text-white
        font-bold
        py-2
        px-4
        rounded-b
        p-x-10
      "
    >
      Rescan !
    </button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "HubSelector",

  data() {
    return {
      unknownHubs: [],
      knownHubs: [],
      hubSetupModal: false,
    };
  },

  created() {
    this.hubSearch();
  },

  computed: {
    apiAppId() {
      return this.$store.getters.apiAppId;
    },
  },

  methods: {
    hubFirstContact(hubIp) {
      return axios
        .get(`http://${hubIp}/api/0/config`)
        .then((response) => {
          // Simple request to get hub information
          window.system.log.info(
            `[hubFirstContact()] Promise resolved: ${JSON.stringify(
              response.data
            )}`
          );
          return response.data;
        })
        .catch((error) => {
          window.system.log.debug(
            `[hubFirstContact()] Promise rejected: ${JSON.stringify(error)}`
          );
          return error;
        });
    },

    hubSearch() {
      //Clear data
      this.knownHubs = [];
      this.unknownHubs = [];
      // MDns hub discovery
      window.system.mdns
        .mdnsLookup()
        .then((hubs) => {
          // handle success
          window.system.log.info(
            `[hubSearch()] Mdns lookup Promise resolved: ${JSON.stringify(
              hubs
            )}`
          );

          hubs.forEach((h) => {
            this.hubFirstContact(h.ip).then((hInfo) => {
              let new_hub = { ...hInfo, ip: h.ip };
              if (new_hub.bridgeid in this.$store.state.knownHubs) {
                this.knownHubs.push(new_hub);
              } else {
                this.unknownHubs.push(new_hub);
              }
            });
          });
        })
        .catch((error) => {
          // log error
          window.system.log.info(
            `[hubSearch()] Mdns lookup Promise rejected: ${JSON.stringify(
              error
            )}`
          );
        });
    },

    hubSetup(hubId, hubIp) {
      const requestDeviceType = {
        devicetype: this.apiAppId,
      };

      axios.post(`http://${hubIp}/api`, requestDeviceType).then((response) => {
        // Request contains error until the button of hub is pressed
        if (response.data[0]["error"]) {
          // TODO do the same bellow but use Vuex to save the config in the Vuex store.
          // Add a logic to save the Vuex $store.config dans le configstore local (.json) à la fermeture du programme (voir background.js)
          window.system.sendSystemMessageBox({
            type: "info",
            title: "Setup your Hub",
            message: "Please go press the hub button and retry.",
          });
          // Success: Button was pressed
        } else if (response.data[0]["success"]) {
          window.system.config.writeConfig(`hubs.${hubId}`, {
            username: response.data[0]["success"]["username"],
            requestDeviceType,
          });
        } else {
          window.system.sendSystemErrorBox({
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