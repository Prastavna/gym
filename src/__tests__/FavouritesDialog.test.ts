// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from "vite-plus/test";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import FavouritesDialog from "../components/FavouritesDialog.vue";
import { useFavourites } from "../composables/useFavourites";

describe("FavouritesDialog", () => {
  beforeEach(() => {
    localStorage.clear();
    const { favourites } = useFavourites();
    favourites.value = new Set();
  });

  it("does not render when closed", () => {
    const wrapper = mount(FavouritesDialog, { props: { open: false } });
    expect(wrapper.find("[role='dialog']").exists()).toBe(false);
  });

  it("shows empty state when open with no favourites", () => {
    const wrapper = mount(FavouritesDialog, { props: { open: true } });
    expect(wrapper.text()).toContain("No favourites yet");
    expect(wrapper.text()).toContain("Tap the star on any exercise to save it here");
  });

  it("shows favourited exercise name and muscle group", async () => {
    const { toggle } = useFavourites();
    toggle("Bench Press"); // defined under Chest (Pectoralis Major) in muscles.ts
    await nextTick();

    const wrapper = mount(FavouritesDialog, { props: { open: true } });
    expect(wrapper.text()).toContain("Bench Press");
    expect(wrapper.text()).toContain("Chest");
  });

  it("shows all favourited exercises", async () => {
    const { toggle } = useFavourites();
    toggle("Bench Press");
    toggle("Push-Ups");
    await nextTick();

    const wrapper = mount(FavouritesDialog, { props: { open: true } });
    expect(wrapper.text()).toContain("Bench Press");
    expect(wrapper.text()).toContain("Push-Ups");
  });

  it("shows correct count in dialog description", async () => {
    const { toggle } = useFavourites();
    toggle("Bench Press");
    toggle("Push-Ups");
    await nextTick();

    const wrapper = mount(FavouritesDialog, { props: { open: true } });
    expect(wrapper.text()).toContain("2 exercises saved");
  });

  it("shows singular label for exactly one favourite", async () => {
    const { toggle } = useFavourites();
    toggle("Bench Press");
    await nextTick();

    const wrapper = mount(FavouritesDialog, { props: { open: true } });
    expect(wrapper.text()).toContain("1 exercise saved");
    expect(wrapper.text()).not.toContain("1 exercises saved");
  });

  it("clicking the star button removes the exercise from the list", async () => {
    const { toggle } = useFavourites();
    toggle("Bench Press");
    await nextTick();

    const wrapper = mount(FavouritesDialog, { props: { open: true } });
    expect(wrapper.text()).toContain("Bench Press");

    const starBtn = wrapper.find("button[aria-label='Remove Bench Press from favourites']");
    expect(starBtn.exists()).toBe(true);
    await starBtn.trigger("click");
    await nextTick();

    expect(wrapper.text()).not.toContain("Bench Press");
  });

  it("shows empty state after all favourites are removed", async () => {
    const { toggle } = useFavourites();
    toggle("Bench Press");
    await nextTick();

    const wrapper = mount(FavouritesDialog, { props: { open: true } });
    await wrapper.find("button[aria-label='Remove Bench Press from favourites']").trigger("click");
    await nextTick();

    expect(wrapper.text()).toContain("No favourites yet");
  });

  it("emits close when backdrop is clicked", async () => {
    const wrapper = mount(FavouritesDialog, { props: { open: true } });
    // The backdrop is the outermost div with the click.self handler
    await wrapper.find(".fixed.inset-0").trigger("click");
    expect(wrapper.emitted("close")).toBeTruthy();
  });
});
