<script lang="ts">
  import { flip } from "svelte/animate";
  import EditPopup from "./editPopup.svelte";
  export let profile: ProfileType;
  export let name: string;

  let currentItem: number = -1;

  let hovering: number;
  let dragId: number;
  const drop = (event, target) => {
    event.dataTransfer.dropEffect = "move";
    const start = parseInt(event.dataTransfer.getData("text/plain"));
    const newTracklist = profile.content;

    if (start < target) {
      newTracklist.splice(target + 1, 0, newTracklist[start]);
      newTracklist.splice(start, 1);
    } else {
      newTracklist.splice(target, 0, newTracklist[start]);
      newTracklist.splice(start + 1, 1);
    }
    profile.content = newTracklist;
    hovering = null;
  };

  const dragstart = (event, i) => {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.dropEffect = "move";
    const start = i;
    event.dataTransfer.setData("text/plain", start);
    dragId = i;
  };

  const save = async () => {
    await fetch(`/api/set/${name}`, {
      method: "POST",
      body: JSON.stringify(profile),
    });
    window.location.href = "/" + name;
  };
</script>

<div class="text-lg font-bold">Edit page</div>
<div class="my-3 mb-0">Name</div>
<input
  bind:value={profile.name}
  class="my-2 w-full bg-gray-100 px-5 py-3"
  placeholder="name"
  type="text"
/>
<div class="my-3 mb-0">Description</div>
<input
  bind:value={profile.description}
  class="my-2 w-full bg-gray-100 px-5 py-3"
  placeholder="description"
  type="text"
/>
<div class="my-3 mb-0">Profile Image URL</div>
<input
  bind:value={profile.img}
  class="my-2 w-full bg-gray-100 px-5 py-3"
  placeholder="description"
  type="url"
/>
<div class="my-3">Elements</div>
{#each profile.content as item, i (item)}
  <div
    draggable={true}
    animate:flip={{ duration: 300 }}
    on:dragover|preventDefault
    on:drop|preventDefault={(event) => drop(event, i)}
    on:dragenter={() => (hovering = i)}
    on:dragstart={(event) => dragstart(event, i)}
    class={"my-3 flex w-full border-2 border-black " +
      (hovering === i ? "border-dashed" : "")}
  >
    <div
      on:click={(e) => {
        e.preventDefault();
        currentItem = i;
      }}
      class="flex-1 px-5 py-3"
    >
      {#if item.type == "link"}
        {item.data.label}
      {:else if item.type == "heading"}
        <span class="font-bold">{item.data.title}</span>
      {:else if item.type == "iframe"}
        <!--div class="italic overflow-ellipsis overflow-hidden">{item.data.url}</div-->
        <span class="italic">iFrame</span>
      {:else if item.type == "image"}
        <span class="italic">Image</span>
      {/if}
    </div>
    <div class="w-8 bg-black" />
  </div>
{/each}
<div class="text-center">
  <a
    on:click={(e) => {
      e.preventDefault();
      profile.content = [
        ...profile.content,
        {
          type: "link",
          data: {
            url: "https://example.com",
            label: "Example link",
          },
        },
      ];
    }}
    href="/"
    class="hover:underline hover:underline-offset-2">+ Add new element</a
  >
  <div class="mt-8">
    <a
      on:click={(e) => {
        e.preventDefault();
        save();
      }}
      href={"/" + name}
      class="my-2 block w-full border-2 border-gray-800 py-3 px-6 hover:underline hover:underline-offset-2"
      >Save changes</a
    >
    <a
      href={"/" + name}
      class="my-2 block w-full border-2 border-gray-800 py-3 px-6 hover:underline hover:underline-offset-2"
      >Cancel</a
    >
  </div>
</div>
{#if currentItem != -1}
  <EditPopup
    on:close={() => {
      currentItem = -1;
    }}
    on:delete={() => {
      profile.content = profile.content.filter((c, i) => i != currentItem);
      currentItem = -1;
    }}
    bind:item={profile.content[currentItem]}
  />
{/if}
