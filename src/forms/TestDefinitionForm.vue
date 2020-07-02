<template>
  <b-form id="formTest" @submit="onFormSubmit" @reset="onFormCancel">
    <b-form-group id="lblText" label="Text" label-for="text">
      <b-form-input
        id="text"
        v-model="selectedTest.text"
        type="text"
        required
        placeholder="Enter text"
      ></b-form-input>
    </b-form-group>
    <b-form-group id="lblTestString" label="Test" label-for="textString">
      <b-form-input
        id="testString"
        v-model="selectedTest.testString"
        type="text"
        required
        placeholder="Enter test"
      ></b-form-input>
    </b-form-group>
    <b-button
      class="mr-auto"
      type="submit"
      variant="secondary"
      @click="setIsEditingTest(!$store.state.isEditingTest)"
      >Save</b-button
    >
  </b-form>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { mapGetters, mapActions } from "vuex";

@Component({
  computed: {
    ...mapGetters(["selectedTest"])
  },
  methods: {
    ...mapActions(["setIsEditingTest"])
  }
})
export default class TestDefinitionForm extends Vue {
  @Prop() private onSubmit?: Function;
  @Prop() private onCancel?: Function;

  onFormSubmit(evt: Event) {
    evt.preventDefault();
    if (this.onSubmit) this.onSubmit();
  }

  onFormCancel(evt: Event) {
    evt.preventDefault();
    if (this.onCancel) this.onCancel();
  }
}
</script>

<style scoped lang="scss">
form {
  padding: 8px;
}
</style>
