<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  import { onMount } from "svelte";
  import EditBar from "./EditBar.svelte";

  export let edit = false;
  export let profile: ProfileType;
  let initialProfile = "";
  onMount(() => {
    initialProfile = JSON.stringify(profile);
  });
</script>

<div class="edit">
  {#if edit}
    <EditBar
      bind:profile
      bind:initialProfile
      on:save={(e) => dispatch("save", e.detail)}
    />
    <slot />
    <div
      class="footer"
      on:click={() => {
        profile.links = [
          ...profile.links,
          { text: "New Link", url: "https://example.com/" },
        ];
      }}
    >
      <u>+ Add link</u>
    </div>
  {:else}
    <slot />
  {/if}
</div>

<style lang="scss">
  .edit {
    .footer {
      text-align: center;
      width: 100%;
      margin: 1rem 0;
      color: var(--text-light);
      cursor: pointer;
    }
  }
</style>
