<script lang="ts">
  import { flip } from "svelte/animate";
  export let profile: ProfileType;

  let hovering: number;
  let dragId: number;
  const drop = (event, target) => {
    event.dataTransfer.dropEffect = "move";
    const start = parseInt(event.dataTransfer.getData("text/plain"));
    const newTracklist = profile.links;

    if (start < target) {
      newTracklist.splice(target + 1, 0, newTracklist[start]);
      newTracklist.splice(start, 1);
    } else {
      newTracklist.splice(target, 0, newTracklist[start]);
      newTracklist.splice(start + 1, 1);
    }
    profile.links = newTracklist;
    hovering = null;
  };

  const dragstart = (event, i) => {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.dropEffect = "move";
    const start = i;
    event.dataTransfer.setData("text/plain", start);
    dragId = i;
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
<div class="my-3">Links</div>
{#each profile.links as link, i (link)}
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
        console.log("click");
      }}
      class="flex-1 px-5 py-3"
    >
      {link.label}
    </div>
    <div class="w-8 bg-black" />
  </div>
{/each}
