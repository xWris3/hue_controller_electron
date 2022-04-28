<template>
  <div>
    <label for="key">Save in key:</label>
    <input v-model="key" type="text" id="key" name="key" />
    <label for="value">Save:</label>
    <input v-model="value" type="text" id="value" name="value" />
    <button @click="saveConfig()">Save Config !</button>
    <button @click="readConfig()">Read Config !</button>
  </div>
</template>

<script>
export default {
  methods: {
    saveConfig() {
      window.system.config.writeConfig(this.key, this.value);
    },
    readConfig() {
      window.system.config.readConfig(this.key).then(e => console.log(e));
    },
  },
  data: function () {
    return {
      key: "",
      value: "",
    };
  },
};
</script>

<style>
</style>