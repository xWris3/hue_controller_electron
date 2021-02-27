<template>
  <div>
    <HubSelector :settings="this.settings" :systemUser="this.systemUser" />
  </div>
</template>

<script>
import HubSelector from '@/components/Hue/HubSelector.vue';

export default {
  components:{
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
    async loadSettings() {
      //Store current system user as data
      this.systemUser = await window.ipc.invoke("get-system-username");
      //Load hub settings
      this.settings.hubs = await window.ipc.invoke("read-config", "hubs");
    },
  },
};
</script>
