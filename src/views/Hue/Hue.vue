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

  computed: {
    systemUser() {
      return this.$store.state.systemUsername;
    },
    settings() {
      return this.$store.state.config;
    },
  },
};
</script>
