<template>
  <div>
    <HubSelector :settings="this.settings" :systemUser="this.systemUser" />
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
      systemUser: undefined,
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
