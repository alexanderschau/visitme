<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let item: ContentType;
</script>

<div
  on:click={(e) => {
    e.preventDefault();
    dispatch("close");
  }}
  class="fixed top-0 left-0 flex h-full w-full"
/>
<div
  class="pointer-events-none fixed top-0 left-0 z-20 flex h-full w-full flex-row items-center justify-center bg-black bg-opacity-50"
>
  <div class="pointer-events-auto w-full max-w-md bg-white px-3 py-6">
    <div class="font-bold">Edit item</div>
    <div class="my-3 mb-0">Type</div>
    <select
      on:change={(e) => {
        switch (e.target.value) {
          case "link": {
            item.data = {
              label: "Example link",
              url: "https://example.com",
            };
            break;
          }

          case "heading": {
            item.data = {
              title: "A New Chapter...",
            };
            break;
          }
          case "iframe": {
            item.data = {
              url: "https://example.com",
            };
            break;
          }
          case "image": {
            item.data = {
              url: "https://picsum.photos/1500/1000",
            };
            break;
          }

          default:
            break;
        }
      }}
      bind:value={item.type}
      class="my-2 block w-full border-2 border-gray-800 bg-transparent py-3 px-6"
    >
      <option value="link">Link</option>
      <option value="heading">Heading</option>
      <option value="iframe">IFrame</option>
      <option value="image">Image</option>
    </select>
    {#if item.type == "link"}
      <div class="my-3 mb-0">Label</div>
      <input
        bind:value={item.data.label}
        class="my-2 w-full bg-gray-100 px-5 py-3"
        placeholder="Example Link"
        type="text"
      />
      <div class="my-3 mb-0">URL</div>
      <input
        bind:value={item.data.url}
        class="my-2 w-full bg-gray-100 px-5 py-3"
        placeholder="https://awesome.example.com"
        type="url"
      />
      <div class="my-3 mb-0">Image URL (optional)</div>
      <input
        bind:value={item.data.img}
        class="my-2 w-full bg-gray-100 px-5 py-3"
        placeholder="An image URL"
        type="url"
      />
    {:else if item.type == "heading"}
      <div class="my-3 mb-0">Title</div>
      <input
        bind:value={item.data.title}
        class="my-2 w-full bg-gray-100 px-5 py-3"
        placeholder="Your stunning title"
        type="text"
      />
    {:else if item.type == "iframe"}
      <div class="my-3 mb-0">iFrame URL</div>
      <input
        bind:value={item.data.url}
        class="my-2 w-full bg-gray-100 px-5 py-3"
        placeholder="https://youtu.be/dQw4w9WgXcQ"
        type="url"
      />
    {:else if item.type == "image"}
      <div class="my-3 mb-0">Image URL</div>
      <input
        bind:value={item.data.url}
        class="my-2 w-full bg-gray-100 px-5 py-3"
        placeholder="https://picsum.photos/1500/1000"
        type="url"
      />
    {/if}
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
