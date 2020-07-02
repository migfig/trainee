<template>
  <div v-if="displayVertical" class="vertical-section">
    <div v-if="canEdit === true" class="md-editor-section">
      <MonacoEditor
        class="editor"
        v-model="source"
        :options="selectedLanguageOptions()"
      />
    </div>
    <div v-if="showPreview === true" class="md-editor-preview-section">
      <div v-html="target" style="padding: 4px"></div>
    </div>
  </div>
  <div v-else class="horizontal-section">
    <div class="editor-section">
      <MonacoEditor
        class="html-editor"
        v-model="source"
        :options="selectedLanguageOptions"
      />
    </div>
    <div class="view-section">
      <div v-html="target" style="padding: 4px;"></div>
    </div>
  </div>
</template>

<script lang="js">
import { Component, Prop, Vue } from "vue-property-decorator";
import { mapActions, mapGetters } from "vuex";
import MonacoEditor from "vue-monaco";

import { eDisplayMode } from "./../types/Editor";

@Component({
  components: {
    MonacoEditor
  },
  computed: {
    ...mapGetters([
      "selectedDefinition",
      "compiledDescriptionMarkdown",
      "compiledTestsMarkdown",
      "compiledFailedTestsMarkdown"
    ])
  },
  methods: {
    ...mapActions([])
  }
})
export default class Editor extends Vue {
  @Prop() language;
  @Prop() source;
  @Prop() target;
  @Prop() showPreview;
  @Prop() canEdit;
  @Prop() displayMode;

  selectedLanguageOptions() {
    const options = {
      theme: "vs-dark",
      language: "markdown",
      minimap: {
        enabled: false,
      },
      automaticLayout: {
        enabled: true,
      },
    };

    return this.language === "markdown" ? options : {...options, language: "html"};
  }
  displayVertical = () => this.displayMode === eDisplayMode.Vertical;
}
</script>

<style scoped lang="scss">
.vertical-section {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 0.4fr 1fr;
}

.horizontal-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
}

.md-editor-section {
  grid-area: 1/1/1/2;
}

.editor {
  width: 100%;
  height: calc(30vh);
}

.html-editor {
  width: 100%;
  height: calc(65vh);
}

.md-editor-preview-section {
  grid-area: 2/1/2/1;
}

.editor-section {
  grid-area: 2/2/2/2;
  border-left: 1px solid #ccc;
}

.view-section {
  grid-area: 2/3/4/3;
}
</style>
