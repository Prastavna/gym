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
      workbox: {
        // Exercise media is pinned to an immutable upstream commit, so once a
        // user has seen a demo it keeps working offline / if the source is down.
        runtimeCaching: [
          {
            urlPattern:
              /^https:\/\/(cdn\.jsdelivr\.net\/gh\/hasaneyldrm\/exercises-dataset@|raw\.githubusercontent\.com\/hasaneyldrm\/exercises-dataset\/)[0-9a-f]{40}\//,
            handler: "CacheFirst",
            options: {
              cacheName: "exercise-media",
              expiration: { maxEntries: 300, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [200] },
            },
          },
        ],
      },
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
