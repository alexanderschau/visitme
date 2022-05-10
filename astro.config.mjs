import { defineConfig } from "astro/config";

import node from "@astrojs/node";
import deno from "@astrojs/deno";

import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), svelte()],
  adapter: deno(),
});
