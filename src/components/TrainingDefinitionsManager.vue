<template>
  <div class="defs-container">
    <div class="toolbar-section">
      <b-navbar toggleable="sm" type="dark" variant="primary" class="toolbar">
        <b-navbar-brand href="#">
          <b-icon icon="filter"></b-icon>&nbsp;
          <small>Definition</small>
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-form-select
              v-model="$store.state.selectedDefinitionId"
              :options="$store.state.definitions"
              @change="setSelectedDefinition(selectedDefinition)"
              id="trainingDefinition"
              value-field="id"
              text-field="name"
              size="sm"
              class="mt-1"
              style="min-width: 400px;"
            ></b-form-select>
            <!-- left toolbar actions -->
            <b-button-toolbar class="ml-2">
              <b-button-group>
                <b-button
                  title="Edit definition"
                  @click="setIsEditing(!$store.state.isEditing)"
                  :disabled="$store.state.isEditing"
                >
                  <b-icon icon="pencil" aria-hidden="true"></b-icon>
                </b-button>
                <b-button
                  title="Clone definition"
                  class="ml-1"
                  @click="cloneDefinition"
                >
                  <b-icon icon="files" aria-hidden="true"></b-icon>
                </b-button>
                <b-button
                  title="Remove definition"
                  class="ml-1"
                  :disabled="!canRemoveDefinitions"
                  @click="removeDefinition"
                >
                  <b-icon icon="trash" aria-hidden="true"></b-icon>
                </b-button>
                <b-button
                  title="Test definition"
                  class="ml-3"
                  :disabled="!selectedDefinition.sourceTests.length"
                  @click="testDefinition"
                >
                  <b-icon icon="play" aria-hidden="true"></b-icon>
                </b-button>
              </b-button-group>
            </b-button-toolbar>
          </b-navbar-nav>

          <!-- right toolbar actions -->
          <b-navbar-nav class="ml-auto">
            <b-nav-form class="mr-2">
              <b-form-input
                size="sm"
                class="mr-sm-2"
                placeholder="Type your definition..."
              ></b-form-input>
              <b-button size="sm" class="my-2 my-sm-0" type="submit">
                <b-icon icon="filter" class="mr-1" aria-hidden="true"></b-icon
                >Filter
              </b-button>
            </b-nav-form>

            <b-button-toolbar>
              <b-button-group>
                <b-button title="New definition" @click="addDefinition">
                  <b-icon icon="plus-circle" aria-hidden="true"></b-icon>
                </b-button>
              </b-button-group>
              <b-dropdown class="mx-1" size="sm" right text="Download">
                <b-dropdown-item @click="downloadJson">
                  <b-icon
                    icon="cloud-download"
                    class="mr-1"
                    aria-hidden="true"
                  ></b-icon
                  >Json File
                </b-dropdown-item>
                <b-dropdown-item @click="downloadMarkdown" active>
                  <b-icon
                    icon="download"
                    class="mr-1"
                    aria-hidden="true"
                  ></b-icon
                  >Markdown File
                </b-dropdown-item>
              </b-dropdown>
            </b-button-toolbar>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <div class="description-section">
      <MonacoEditor
        v-if="!isEditMode"
        class="md-editor-section"
        v-model="selectedDefinition.description"
        :options="$data.mdOptions"
      />
      <DefinitionForm class="md-editor-section" v-if="isEditMode" />
      <div
        class="md-editor-preview-section"
        v-html="compiledDescriptionMarkdown"
        v-if="!isEditMode"
      ></div>
    </div>
    <div class="actions-section">
      <b-navbar
        toggleable="sm"
        type="dark"
        variant="primary"
        style="opacity: 0.95;"
      >
        <b-navbar-brand href="#">
          <b-icon icon="filter"></b-icon>&nbsp;
          <small>Test</small>
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-form-select
              v-model="$store.state.selectedTestId"
              :options="selectedDefinition.sourceTests"
              id="testDefinition"
              value-field="id"
              text-field="text"
              size="sm"
              class="mt-1"
              style="min-width: 345px;"
            ></b-form-select>
            <!-- left toolbar actions -->
            <b-button-toolbar class="ml-2">
              <b-button-group>
                <b-button
                  title="Edit test"
                  @click="setIsEditingTest(!$store.state.isEditingTest)"
                  :disabled="$store.state.isEditingTest"
                >
                  <b-icon icon="pencil" aria-hidden="true"></b-icon>
                </b-button>
                <b-button title="Clone test" class="ml-1" @click="cloneTest">
                  <b-icon icon="files" aria-hidden="true"></b-icon>
                </b-button>
                <b-button
                  title="Remove test"
                  class="ml-1"
                  :disabled="!canRemoveTests"
                  @click="removeTest"
                >
                  <b-icon icon="trash" aria-hidden="true"></b-icon>
                </b-button>
              </b-button-group>
            </b-button-toolbar>
          </b-navbar-nav>

          <!-- right toolbar actions -->
          <b-navbar-nav class="ml-auto">
            <b-button-toolbar>
              <b-button-group>
                <b-button title="New test" class="ml-1" @click="addTest">
                  <b-icon icon="plus-circle" aria-hidden="true"></b-icon>
                </b-button>
              </b-button-group>
            </b-button-toolbar>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
      <ul v-if="!$store.state.isEditingTest">
        <li
          class="item"
          v-for="(test, index) in compiledTestsMarkdown"
          :key="index"
        >
          <div v-html="test" class="succeeded-failed"></div>
        </li>
      </ul>
      <TestDefinitionForm v-if="$store.state.isEditingTest" />
    </div>
    <MonacoEditor
      class="editor-section"
      v-model="selectedDefinition.htmlSource"
      :options="$data.htmlOptions"
    />
    <div class="test-results-section">
      <ul>
        <li
          class="failed-item"
          v-for="(test, index) in compiledFailedTestsMarkdown"
          :key="index"
        >
          <div v-html="test" class="succeeded-failed"></div>
        </li>
      </ul>
      <ul>
        <li
          class="succeeded-item"
          v-for="(test, index) in compiledSucceededTestsMarkdown"
          :key="index"
        >
          <div v-html="test" class="succeeded-failed"></div>
        </li>
      </ul>
    </div>
    <div class="view-section" v-html="selectedDefinition.htmlSource"></div>
  </div>
</template>

<script lang="js">
import { Component, Vue } from "vue-property-decorator";
import { mapActions, mapGetters } from "vuex";
import MonacoEditor from "vue-monaco";
import marked from "marked";

import DefinitionForm from "./../forms/DefinitionForm.vue";
import TestDefinitionForm from "./../forms/TestDefinitionForm.vue";
import { downloader, buildMarkdown } from "./../utils";
import jQuery from 'jquery';

window.$ = jQuery;

@Component({
  components: {
    MonacoEditor,
    DefinitionForm,
    TestDefinitionForm
  },
  computed: {
    ...mapGetters([
      "selectedDefinition",
      "compiledDescriptionMarkdown",
      "compiledTestsMarkdown",
      "compiledFailedTestsMarkdown",
      "compiledSucceededTestsMarkdown",
      "isEditMode",
      "canRemoveDefinitions",
      "canRemoveTests",
      "selectedLanguage"
    ])
  },
  methods: {
    ...mapActions([
      "setIsEditing",
      "setSelectedDefinition",
      "addDefinition",
      "cloneDefinition",
      "removeDefinition",
      "setIsEditingTest",
      "addTest",
      "cloneTest",
      "removeTest",
      "setFailedTests"
    ])
  },
  data: () => ({
    mdOptions: {
      theme: "vs-dark",
      language: "markdown",
      minimap: {
        enabled: false,
      },
      automaticLayout: {
        enabled: true,
      },
    },
    htmlOptions: {
      theme: "vs-dark",
      language: "html",
      minimap: {
        enabled: false,
      },
      automaticLayout: {
        enabled: true,
      },
    }
  })
})
export default class TrainingDefinitionsManager extends Vue {
  testDefinition() {
    window.code = this.selectedDefinition.htmlSource;
    const failedTests = [];
    this.selectedDefinition.sourceTests.forEach(t => {
      try {
        /*
        test strings may require jQuery and are written as the following examples.
          jquery expressions:
              assert("!$('h2').attr('style')");
          or regular expressions:
              code.match(/.container\s*?{[\s\S]*grid-template-columns\s*?:\s*?100px\s*?100px\s*?100px\s*?;[\s\S]*}/gi);
        */
        const unAsserted = t.testString.substring("assert".length + 1).replace(");", ";");
        // console.log("@eval", unAsserted, "=", eval(unAsserted));
        const result = eval(unAsserted);
        t.failed = result === false || result === null;
        failedTests.push({...t});
      } catch (error) {
        // console.log('@error', error);
        t.failed = true;
        failedTests.push({...t});
      }
    });
    this.$store.dispatch("setFailedTests", failedTests);
  }

  compiledMarkdown() {
    return this.selectedDefinition
      .sourceTests
      .filter(t => t.failed === true)
      .map(t => marked(t.text));
  }

  downloadJson() {
    downloader(
      JSON.stringify(this.selectedDefinition),
      'application/json',
      `${this.selectedDefinition.name}.${this.selectedLanguage.toLowerCase()}.json`
    );
  }

  downloadMarkdown() {
    downloader(
      buildMarkdown(this.selectedDefinition),
      'application/markdown',
      `${this.selectedDefinition.name}.${this.selectedLanguage.toLowerCase()}.md`
    );
  }
}
</script>

<style scoped lang="scss">
.defs-container {
  width: 100%;
  height: 91vh;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 56px 1fr 180px;
}

.toolbar-section {
  grid-area: 1/1/1/4;
  align-self: stretch;
  margin: 1px 0 0 0;
}

.toolbar {
  max-height: 56px;
}

.description-section {
  grid-area: 2/1/2/1;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 0.4fr 1fr;
  background: --bg-color;
}

.md-editor-section {
  grid-area: 1/1/1/2;
  width: 34vw;
  height: calc(30vh);
}

.md-editor-preview-section {
  grid-area: 2/1/2/1;
  max-height: calc(35vh);
  overflow-y: auto;
  padding: 8px;
}

.actions-section {
  grid-area: 3/1/3/1;
  border-right: 1px solid #ccc;
  background: --bg-color;
  height: 180px;
  overflow-y: auto;
}

.editor-section {
  grid-area: 2/2/3/2;
  border-left: 1px solid #ccc;
  width: 33vw;
  height: calc(65vh - 3px);
}

.test-results-section {
  grid-area: 3/2/3/2;
  background: --bg-color;
}

.view-section {
  grid-area: 2/3/4/3;
  padding: 8px;
  border-left: 1px solid #ccc;
  background: --bg-color;
}

ul {
  list-style-type: none;
}

.item:before {
  content: "\f0c3"; // flask
  font-family: "FontAwesome";
  display: inline-block;
  color: var(--info);
  margin-left: -24px;
}

.succeeded-item:before {
  content: "\f0c3"; // flask
  font-family: "FontAwesome";
  display: inline-block;
  color: var(--success);
  margin-left: -24px;
}

.succeeded-failed {
  margin-top: -24px;
}

.failed-item:before {
  content: "\f0c3"; // flask
  font-family: "FontAwesome";
  display: inline-block;
  color: var(--danger);
  margin-left: -24px;
}
</style>
