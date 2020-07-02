<template>
  <div class="about">
    <b-card-group columns>
      <b-card title="Trainee">
        <b-card-text>
          A very simple TypeScript application created to learn Vue
        </b-card-text>
      </b-card>

      <b-card title="Uses">
        <b-card-text>
          <ul>
            <li>vuex</li>
            <li>vue-router</li>
            <li>bootstrap-vue</li>
            <li>vue-monaco</li>
            <li>uuid</li>
            <li>marked</li>
          </ul>
        </b-card-text>
        <template v-slot:footer>
          <small class="text-muted">
            <b-button
              href="https://github.com/migfig/trainee"
              variant="secondary"
              >source</b-button
            >
          </small>
        </template>
      </b-card>

      <b-card title="What is for?">
        <b-card-text
          >Creates freeCampCode challenge markdown definitions, which internally
          are created as json files, so you can contribute to freeCampCode
          knowledge curriculum</b-card-text
        >
        <b-card-text class="small text-muted"
          ><b-button href="https://freecampcode.org" variant="primary"
            >freeCampCode</b-button
          ></b-card-text
        >
      </b-card>

      <b-card title="How it works?">
        <b-card-text
          >Edit <em>in-place</em> markdown definitions, html sources &amp; tests
          + you can also run the tests &amp; see their results</b-card-text
        >
        <b-card-text class="small text-muted">1/4</b-card-text>
      </b-card>

      <b-card title="How it works?">
        <b-card-text
          >You can quickly add/edit/clone or remove challenges</b-card-text
        >
        <b-card-text class="small text-muted">2/4</b-card-text>
      </b-card>

      <b-card title="How it works?">
        <b-card-text
          >You can quickly add/edit/clone or remove challenge tests</b-card-text
        >
        <b-card-text class="small text-muted">3/4</b-card-text>
      </b-card>

      <b-card title="How it works?">
        <b-card-text
          >Save your downloaded definitions into the freeCampCode challenges
          folder and rebuild freeCampCode project to see the new
          definitions</b-card-text
        >
        <b-card-text class="small text-muted">4/4</b-card-text>
      </b-card>

      <b-card title="Disclaimer">
        <b-card-text
          >This implementation may not cover all freeCampCode challenge features
          but only the basic ones</b-card-text
        >
        <b-card-text
          >To avoid manually copying challenge definitions, some sort of api
          integration should be implemented to retrieve existing ones and append
          new ones</b-card-text
        >
        <b-card-text>This is just the starting point!</b-card-text>
        <b-card-text class="small text-muted">...</b-card-text>
      </b-card>
    </b-card-group>
  </div>
</template>

<style scoped lang="scss">
.about {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 64px;
}
</style>
