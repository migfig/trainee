<template>
  <div class="app-container">
    <div class="app-bar">
      <b-navbar toggleable="lg" type="dark" variant="primary">
        <b-navbar-brand href="#">
          <b-icon
            :icon="!sideBarActive ? 'list' : 'arrow-left-circle'"
            @click="setIsSidebarActive(!$store.state.isSidebarActive)"
          ></b-icon>
          {{ title }}
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown text="Language" right>
              <b-dropdown-item
                v-for="language in $store.state.languages"
                :key="language"
                v-model="$store.state.selectedLanguage"
                :active="language === $store.state.selectedLanguage"
                href="#"
                >{{ language }}</b-dropdown-item
              >
            </b-nav-item-dropdown>

            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template v-slot:button-content>
                <em>User</em>
              </template>
              <b-dropdown-item href="#">Profile</b-dropdown-item>
              <b-dropdown-item href="#">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <div id="sidebar" class="side-bar" v-if="sideBarActive">
      <SideBar />
    </div>
    <div class="content">
      <slot></slot>
    </div>
    <div class="status-bar">
      Created by
      <a
        href="https://migfig.github.com"
        style="margin-left: 4px; margin-right: 4px;"
        >migfig</a
      >
      @ 2020
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { mapGetters, mapActions } from "vuex";
import SideBar from "./SideBar.vue";

@Component({
  components: {
    SideBar
  },
  computed: {
    ...mapGetters(["sideBarActive"])
  },
  methods: {
    ...mapActions(["setIsSidebarActive"])
  }
})
export default class Layout extends Vue {
  @Prop() private title!: string;
}
</script>

<style scoped lang="scss">
.app-container {
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr auto;
}

.app-bar {
  grid-area: 1/1/1/3;
  align-self: stretch;
}

.side-bar {
  grid-area: 2/1/2/1;
  width: 250px;
  background: --bg-color;
}

.content {
  grid-area: 2/2/2/2;
  border-left: 1px solid #ccc;
}

.status-bar {
  grid-area: 3/1/3/3;
  color: #fff;
  background: #343a40;
  display: flex;
  justify-content: center;
}
</style>
