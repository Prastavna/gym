import { defineConfig } from "vite-plus";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";
// https://vite.dev/config/
export default defineConfig({
  base: "./",
  staged: {
    "*": "vp check --fix",
  },
  fmt: {},
  lint: { options: { typeAware: true, typeCheck: true } },
  plugins: [
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "favicon.svg",
        "appstore-images/android/launchericon-192x192.png",
        "appstore-images/android/launchericon-512x512.png",
        "appstore-images/ios/180.png",
      ],
      manifest: {
        name: "gym | prastavna",
        short_name: "gym | prastavna",
        description: "Interactive muscle map with exercise guidance and built-in workout timers.",
        theme_color: "#0f172a",
        background_color: "#f1f5f9",
        display: "standalone",
        scope: "./",
        start_url: "./",
        icons: [
          {
            src: "appstore-images/android/launchericon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "appstore-images/android/launchericon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
    vue(),
  ],
});
