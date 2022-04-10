<script lang="ts">
  import { flip } from "svelte/animate";

  export let linkList: LinkType[];

  let hovering: number;
  let dragId: number;
  const drop = (event, target) => {
    event.dataTransfer.dropEffect = "move";
    const start = parseInt(event.dataTransfer.getData("text/plain"));
    const newTracklist = linkList;

    if (start < target) {
      newTracklist.splice(target + 1, 0, newTracklist[start]);
      newTracklist.splice(start, 1);
    } else {
      newTracklist.splice(target, 0, newTracklist[start]);
      newTracklist.splice(start + 1, 1);
    }
    linkList = newTracklist;
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

{#each linkList as link, i (link)}
  <div
    draggable={true}
    animate:flip={{ duration: 300 }}
    on:dragover|preventDefault
    on:drop|preventDefault={(event) => drop(event, i)}
    on:dragenter={() => (hovering = i)}
    on:dragstart={(event) => dragstart(event, i)}
  >
    <slot {link} linkId={i} active={hovering === i} />
  </div>
{/each}
