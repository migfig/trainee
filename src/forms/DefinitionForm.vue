<template>
  <b-form id="formDefinition" @submit="onFormSubmit" @reset="onFormCancel">
    <b-form-group id="lblName" label="Name" label-for="name">
      <b-form-input
        id="name"
        v-model="selectedDefinition.name"
        type="text"
        required
        placeholder="Enter name"
      ></b-form-input>
    </b-form-group>
    <b-form-group id="lblCategory" label="Category" label-for="category">
      <b-form-input
        id="category"
        v-model="selectedDefinition.category"
        type="text"
        required
        placeholder="Enter category"
      ></b-form-input>
    </b-form-group>
    <b-form-group id="lblVideoUrl" label="Video Url" label-for="videoUrl">
      <b-form-input
        id="videoUrl"
        v-model="selectedDefinition.videoUrl"
        type="text"
        required
        placeholder="Enter video url"
      ></b-form-input>
    </b-form-group>
    <b-form-group
      id="lblChallengeType"
      label="Challenge Type"
      label-for="challengeType"
    >
      <b-form-input
        id="challengeType"
        v-model="selectedDefinition.challengeType"
        type="text"
        required
        placeholder="Enter challenge type"
      ></b-form-input>
    </b-form-group>
    <b-form-group
      id="lblForumTopicId"
      label="Forum Topic Id"
      label-for="forumTopicId"
    >
      <b-form-input
        id="forumTopicId"
        v-model="selectedDefinition.forumTopicId"
        type="text"
        required
        placeholder="Enter forum topic id"
      ></b-form-input>
    </b-form-group>
    <b-form-group id="lblIsHidden">
      <b-form-checkbox id="isHidden" v-model="selectedDefinition.isHidden"
        >Hidden</b-form-checkbox
      >
    </b-form-group>
    <b-button
      class="mr-auto"
      type="submit"
      variant="secondary"
      @click="setIsEditing(!$store.state.isEditing)"
      >Save</b-button
    >
  </b-form>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { mapGetters, mapActions } from "vuex";

@Component({
  computed: {
    ...mapGetters(["selectedDefinition"])
  },
  methods: {
    ...mapActions(["setIsEditing"])
  }
})
export default class DefinitionForm extends Vue {
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
#formDefinition {
  padding: 8px;
}
</style>
