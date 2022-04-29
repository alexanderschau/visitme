<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let link: LinkType;
</script>

<div
  on:click={(e) => {
    e.preventDefault();
    dispatch("close");
  }}
  class="absolute top-0 left-0 flex h-full w-full"
/>
<div
  class="pointer-events-none absolute top-0 left-0 z-20 flex h-full w-full flex-row items-center justify-center bg-black bg-opacity-50"
>
  <div class="pointer-events-auto w-full max-w-md bg-white px-3 py-6">
    <div class="font-bold">Edit link</div>
    <div class="my-3 mb-0">Label</div>
    <input
      bind:value={link.label}
      class="my-2 w-full bg-gray-100 px-5 py-3"
      placeholder="name"
      type="text"
    />
    <div class="my-3 mb-0">URL</div>
    <input
      bind:value={link.url}
      class="my-2 w-full bg-gray-100 px-5 py-3"
      placeholder="name"
      type="url"
    />
    <div class="my-3 mb-0">Image URL (optional)</div>
    <input
      bind:value={link.img}
      class="my-2 w-full bg-gray-100 px-5 py-3"
      placeholder="description"
      type="url"
    />
    <a
      on:click={(e) => {
        e.preventDefault();
        dispatch("delete");
      }}
      href="/"
      class="mt-4 block text-right text-red-500 hover:underline hover:underline-offset-2"
      >Delete link</a
    >
  </div>
</div>
