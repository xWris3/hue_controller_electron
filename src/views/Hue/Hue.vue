<template>
  <div>
    <HubSelector :settings="settings" :systemUser="systemUser" />
  </div>
</template>

<script>
import HubSelector from "@/components/Hue/HubSelector.vue";

export default {
  components: {
    HubSelector,
  },

  data() {
    return {
      systemUser: undefined,  // TODO: System user should be in the app (Vuex) state
      settings: {},
    };
  },

  created: function () {
    this.loadSettings();
  },

  methods: {
    loadSettings() {
      //Store current system user as data
      window.ipc.invoke("get-system-username").then((user) => {
        this.systemUser = user;
      });
      //Load hub settings
      window.ipc.invoke("read-config", "hubs").then((settings) => {
        if (settings != undefined) {
          this.settings.hubs = settings;
        }else{
          this.settings.hubs = {};
        }
      });
    },
  },
};
</script>
