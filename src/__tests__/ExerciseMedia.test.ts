// @vitest-environment jsdom
import { describe, expect, it } from "vite-plus/test";
import { mount } from "@vue/test-utils";
import { h, nextTick, ref } from "vue";
import ExerciseMedia from "../components/ExerciseMedia.vue";

const CDN = "https://cdn.jsdelivr.net/gh/owner/repo@abc123/videos/0001-x.gif";
const RAW = "https://raw.githubusercontent.com/owner/repo/abc123/videos/0001-x.gif";

describe("ExerciseMedia", () => {
  it("renders the primary URL first", () => {
    const wrapper = mount(ExerciseMedia, { props: { src: CDN, alt: "Sit-up" } });
    expect(wrapper.find("img").attributes("src")).toBe(CDN);
  });

  it("falls back to the GitHub raw mirror, then to a placeholder", async () => {
    const wrapper = mount(ExerciseMedia, { props: { src: CDN, alt: "Sit-up" } });

    await wrapper.find("img").trigger("error");
    expect(wrapper.find("img").attributes("src")).toBe(RAW);

    await wrapper.find("img").trigger("error");
    expect(wrapper.find("img").exists()).toBe(false);
    expect(wrapper.find('[role="img"]').attributes("aria-label")).toBe(
      "Sit-up (media unavailable)",
    );
  });

  it("goes straight to the placeholder when there is no mirror", async () => {
    const wrapper = mount(ExerciseMedia, {
      props: { src: "https://example.com/a.gif", alt: "Sit-up" },
    });
    await wrapper.find("img").trigger("error");
    expect(wrapper.find("img").exists()).toBe(false);
  });

  it("resets the fallback chain when the source changes", async () => {
    const src = ref(CDN);
    const wrapper = mount(() => h(ExerciseMedia, { src: src.value, alt: "Sit-up" }));
    await wrapper.find("img").trigger("error");
    await wrapper.find("img").trigger("error");

    const next = CDN.replace("0001-x", "0002-y");
    src.value = next;
    await nextTick();
    expect(wrapper.find("img").attributes("src")).toBe(next);
  });
});
