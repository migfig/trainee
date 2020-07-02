<template>
  <div class="app-menu">
    <b-nav vertical class="w-100">
      <b-nav-item
        v-for="option in $store.state.menuOptions"
        :key="option.label"
        :to="option.route"
        exact
        exact-active-class="active"
        :class="{ 'item-active': option === selectedMenuOption }"
        @click="setSelectedMenuOption(option)"
        >{{ option.label }}</b-nav-item
      >
    </b-nav>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapActions, mapGetters } from "vuex";

@Component({
  computed: {
    ...mapGetters(["selectedMenuOption"])
  },
  methods: {
    ...mapActions(["setSelectedMenuOption"])
  }
})
export default class SideBar extends Vue {}
</script>

<style scoped lang="scss">
.app-menu {
  height: 91vh;
}

.item {
  background: transparent;
}

.item-active {
  border-left: 4px solid var(--primary, dodgerblue);
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}
</style>
