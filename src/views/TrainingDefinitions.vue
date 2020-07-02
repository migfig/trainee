<template>
  <div class="defs-view-container">
    <DefinitionsManager />
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import DefinitionsManager from "@/components/TrainingDefinitionsManager.vue";

export default {
  name: "definitions",
  components: {
    DefinitionsManager
  }
};
</script>

<style scoped lang="scss">
.defs-view-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 91vh;
}
</style>
