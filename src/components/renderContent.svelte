<script lang="ts">
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
        class="my-4 flex w-full border-2 border-gray-800 px-6 hover:underline hover:underline-offset-2"
      >
        <img
          alt="thumbnail"
          class="my-auto inline-block h-6"
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
        class="my-4 block w-full border-2 border-gray-800 py-4 hover:underline hover:underline-offset-2"
      >
        {item.data.label}
      </a>
    {/if}
  {:else if item.type == "heading"}
    <h2 class="font-bold text-left text-lg my-4">{item.data.title}</h2>
  {:else if item.type == "iframe"}
    <iframe
      class="w-full h-96 my-4"
      title="embed content"
      src={item.data.url}
    />
  {/if}
{/each}
