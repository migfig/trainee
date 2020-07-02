import { shallowMount } from "@vue/test-utils";
import Layout from "@/components/Layout.vue";

describe("Layout.vue", () => {
  it("renders props.title when passed", () => {
    const title = "Layout Title";
    const wrapper = shallowMount(Layout, {
      propsData: { title }
    });
    expect(wrapper.text()).toMatch(title);
  });
});
