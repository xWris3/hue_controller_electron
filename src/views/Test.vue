<template>
  <div>
    <h1>My name is : {{ name }}</h1>
    <button @click="saveConfig()">Save Config !</button>
  </div>
</template>

<script>
export default {
  methods: {
    saveConfig() {
      window.ipc.invoke("save-config", { test: true });
    },
  },
  data: function () {
    return {
      name: "Erwan",
    };
  },
};
</script>

<style>
</style>