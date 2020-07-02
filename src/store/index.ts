import Vue from "vue";
import Vuex from "vuex";

import marked from "marked";
import { v4 as uuidv4 } from "uuid";

import IDefinition, { ITestDefinition } from "./../types/Definition";
import IMenuItem from "./../types/MenuItem";

Vue.use(Vuex);

const definitionFiles = (ctx => {
  return ctx.keys().map(ctx);
})(require.context("./../training-definitions", true, /.*.json/));

const firstDefinitionFile = (): IDefinition =>
  definitionFiles && Array.isArray(definitionFiles) && definitionFiles.length
    ? definitionFiles[0]
    : null;

const firstTestDefinition = (def: IDefinition): ITestDefinition =>
  (def.sourceTests && Array.isArray(def.sourceTests) && def.sourceTests.length
    ? def.sourceTests[0]
    : null
  ) as ITestDefinition;

const findSelectedDefinition = (state: any): IDefinition =>
  state.definitions.find((d: IDefinition) =>
    d.id === state.selectedDefinitionId
  ) as IDefinition;

const findSelectedTestDefinition = (state: any): ITestDefinition =>
  findSelectedDefinition(state).sourceTests.find(st =>
    st.id === state.selectedTestId
  ) as ITestDefinition;

const SELECTED_MENU_OPTION_KEY = "selectedMenuOption";

export default new Vuex.Store({
  state: {
    // side-bar menu options
    menuOptions: [
      {
        label: "Home",
        route: "/",
        icon: "home"
      },
      {
        label: "About",
        route: "/about",
        icon: "about"
      }
    ] as IMenuItem[],
    selectedMenuOptionLabel: localStorage.getItem(SELECTED_MENU_OPTION_KEY) || "Home",

    // training definition items
    definitions: definitionFiles as IDefinition[],
    selectedDefinitionId: firstDefinitionFile().id,
    selectedTestId: firstTestDefinition(firstDefinitionFile()).id,

    // failed tests
    failedTests: [] as ITestDefinition[],

    // editor mode
    isEditing: false,
    isEditingTest: false,
    isSidebarActive: false,

    // languages
    languages: [
      "Arabic",
      "Chinese",
      "English",
      "French",
      "Portuguese",
      "Russian",
      "Spanish",
    ],
    selectedLanguage: "English"
  },
  getters: {
    selectedMenuOption: (state): IMenuItem =>
      state.menuOptions.find(d => d.label === state.selectedMenuOptionLabel
      ) as IMenuItem,
    selectedDefinition: (state): IDefinition => findSelectedDefinition(state),
    selectedTest: (state): ITestDefinition => findSelectedTestDefinition(state),
    compiledDescriptionMarkdown: (state) => marked(findSelectedDefinition(state).description),
    compiledTestsMarkdown: (state) => findSelectedDefinition(state).sourceTests.map(t => marked(t.text)),
    compiledFailedTestsMarkdown: (state) =>
      state.failedTests.filter(t => t.failed === true).map(t => marked(t.text)),
    compiledSucceededTestsMarkdown: (state) =>
      state.failedTests.filter(t => t.failed === false).map(t => marked(t.text)),
    isEditMode: (state) => state.isEditing,
    isTestEditMode: (state) => state.isEditingTest,
    sideBarActive: (state) => state.isSidebarActive,
    canRemoveDefinitions: (state) => state.definitions.length > 1,
    canRemoveTests: (state) => findSelectedDefinition(state).sourceTests.length > 1,
    selectedLanguage: (state) => state.selectedLanguage
  },
  mutations: {
    setSelectedMenuOption(state, option: IMenuItem) {
      state.selectedMenuOptionLabel = option.label;
      localStorage.setItem(SELECTED_MENU_OPTION_KEY, option.label);
    },
    setSelectedDefinition(state, def: IDefinition) {
      state.selectedTestId = firstTestDefinition(def).id;
      state.failedTests = [];
    },
    setIsEditing(state, value: boolean) {
      state.isEditing = value;
    },
    setIsEditingTest(state, value: boolean) {
      state.isEditingTest = value;
    },
    setIsSidebarActive(state, value: boolean) {
      state.isSidebarActive = value;
    },
    
    // definitions
    addDefinition(state) {
      state.definitions.push({
        id: uuidv4(),
        name: `Definition${state.definitions.length + 1}`,
        category: "Default",
        description: `## Description ${state.definitions.length + 1}`,
        htmlSource: "",
        sourceTests: [],
        failedTests: [],
        isComplete: false,
        isHidden: false,
        videoUrl: "https://scrimba.com/c/cJKMBT2" 
      });
      state.selectedDefinitionId = state.definitions[state.definitions.length - 1].id;
    },
    cloneDefinition(state) {
      const selectedDef = findSelectedDefinition(state);
      state.definitions.push({
        ...selectedDef,
        id: uuidv4(),
        name: `${selectedDef.name}-${state.definitions.filter(d => d.name.startsWith(selectedDef.name)).length + 1}`
      });
      state.selectedDefinitionId = state.definitions[state.definitions.length - 1].id;
    },
    removeDefinition(state) {
      const selectedIndex = state.definitions.indexOf(findSelectedDefinition(state));
      state.definitions.splice(selectedIndex, 1);
      state.selectedDefinitionId = state.definitions[0].id;
      state.definitions = [...state.definitions];
    },

    // tests
    addTest(state) {
      const selectedDef = findSelectedDefinition(state);
      selectedDef.sourceTests.push({
        id: uuidv4(),
        text: `Text-${selectedDef.sourceTests.length + 1}`,
        testString: "assert(true);",
        failed: false
      });
      state.selectedTestId = selectedDef.sourceTests[selectedDef.sourceTests.length - 1].id;
    },
    cloneTest(state) {
      const selectedDef = findSelectedDefinition(state);
      const selectedTst = findSelectedTestDefinition(state);
      selectedDef.sourceTests.push({
        ...selectedTst,
        id: uuidv4(),
        text: `${selectedTst.text}-${selectedDef.sourceTests.filter(t => t.text.startsWith(selectedTst.text)).length + 1}`
      });
      state.selectedTestId = selectedDef.sourceTests[selectedDef.sourceTests.length - 1].id;
    },
    removeTest(state) {
      const selectedDef = findSelectedDefinition(state);
      const selectedIndex = selectedDef.sourceTests.indexOf(findSelectedTestDefinition(state));
      selectedDef.sourceTests.splice(selectedIndex, 1);
      state.selectedTestId = selectedDef.sourceTests[0].id;
      selectedDef.sourceTests = [...selectedDef.sourceTests];
    },

    // failed tests
    setFailedTests(state, tests: ITestDefinition[]) {
      state.failedTests = [...tests];
    }
  },
  actions: {
    setSelectedMenuOption: ({ commit }, option: IMenuItem) =>
      commit("setSelectedMenuOption", option),
    setIsEditing: ({ commit }, value: boolean) =>
      commit("setIsEditing", value),
    setIsEditingTest: ({ commit }, value: boolean) =>
      commit("setIsEditingTest", value),
    setIsSidebarActive: ({ commit }, value: boolean) =>
      commit("setIsSidebarActive", value),
    
    // definitions
    setSelectedDefinition: ({ commit}, def: IDefinition) =>
      commit("setSelectedDefinition", def),
    addDefinition: ({ commit }) =>
      commit("addDefinition"),
    cloneDefinition: ({ commit }) =>
      commit("cloneDefinition"),
    removeDefinition: ({ commit }) =>
      commit("removeDefinition"),
    
    // tests
    addTest: ({ commit }) =>
      commit("addTest"),
    cloneTest: ({ commit }) =>
      commit("cloneTest"),
    removeTest: ({ commit }) =>
      commit("removeTest"),

    // failed tests
    setFailedTests: ({ commit }, tests: ITestDefinition[]) =>
      commit("setFailedTests", tests)
  },
  modules: {}
});
