<script lang="ts">
  import { genColor } from "./color";
  export let content: ContentType[];
</script>

{#each content as item}
  {#if item.type == "link"}
    {#if item.data.img}
      <a
        target={new URL(item.data.url, "https://visitme.cyou").hostname !=
        "visitme.cyou"
          ? "_blank"
          : "_self"}
        href={item.data.url}
        style={`box-shadow: 6px 6px 0px ${genColor()};`}
        class="my-6 flex w-full rounded-lg border-2 border-gray-800 px-6 hover:underline hover:underline-offset-2"
      >
        <img
          alt="thumbnail"
          class="my-auto inline-block aspect-square h-6 w-6 object-contain"
          src={item.data.img}
        />
        <div class="flex-1 py-4">{item.data.label}</div>
      </a>
    {:else}
      <a
        target={new URL(item.data.url, "https://visitme.cyou").hostname !=
        "visitme.cyou"
          ? "_blank"
          : "_self"}
        href={item.data.url}
        style={`box-shadow: 6px 6px 0px ${genColor()};`}
        class="my-6 block w-full border-2 border-gray-800 py-4 hover:underline hover:underline-offset-2 rounded-lg"
      >
        {item.data.label}
      </a>
    {/if}
  {:else if item.type == "heading"}
    <h2 class="font-bold text-left text-lg my-4">{item.data.title}</h2>
  {:else if item.type == "iframe"}
    <iframe
      class="w-full h-96 my-6 rounded-lg"
      title="embed content"
      src={item.data.url}
    />
  {:else if item.type == "image"}
    <img alt="image" src={item.data.url} class="rounded-lg w-full" />
  {/if}
{/each}
