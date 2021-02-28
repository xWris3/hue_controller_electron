<template>
  <div>
    <HubController :id="hub.id" :ip="hub.ip" :username="hub.username" />
  </div>
</template>

<script>
import HubController from "@/components/Hue/HubController.vue";

export default {
  components: {
    HubController,
  },

  props: {
    hub: Object,
  },
};
</script>

<style>
</style>