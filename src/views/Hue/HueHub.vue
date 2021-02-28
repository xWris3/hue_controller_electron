<template>
  <div>
      {{this.id}}
      {{this.ip}}
      {{this.username}}
  </div>
</template>

<script>
export default {
  props: {
    id: String,
    ip: String,
    username: String,
  },
};
</script>

<style>
</style>