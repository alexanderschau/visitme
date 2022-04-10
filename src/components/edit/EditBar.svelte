<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let profile: ProfileType, initialProfile: string;

  const save = () => {
    dispatch("save", { profile: profile, callback: savedCallback });
  };
  let saved = false;
  let infoMessage = "";
  const savedCallback = async (msg: string) => {
    infoMessage = msg;
    saved = true;
    await new Promise((r) => setTimeout(r, 5000));
    saved = false;
    await new Promise((r) => setTimeout(r, 400));
    infoMessage = "";
  };
</script>

<div class="edit-bar">
  <div class="info" style={`opacity: ${saved ? "1" : "0"};`}>{infoMessage}</div>
  <button
    class="button"
    on:click={() => {
      initialProfile = JSON.stringify(profile);
      save();
    }}
  >
    Save changes
  </button>
  <button
    class="button"
    on:click={() => {
      profile = JSON.parse(initialProfile);
    }}>Cancel</button
  >
</div>

<style lang="scss">
  .edit-bar {
    z-index: 5;
    position: sticky;
    top: 0;
    padding: 1rem 4rem;
    text-align: right;
    backdrop-filter: blur(10px);

    .info {
      display: inline-block;
      font-style: italic;
      color: var(--text-ultra-light);
      transition: opacity 0.4s;
    }
    .button {
      border: none;
      font-size: inherit;
      margin: 0 0.5rem;
      display: inline-block;
      background: var(--btn-bg);
      color: inherit;
      padding: 0.7rem 1rem;
      border-radius: 0.8rem;
      text-decoration: none;
      transition: background-color 0.2s, color 0.2s;
      cursor: pointer;

      &:hover {
        background: var(--text);
        color: var(--text-ultra-light);
      }
    }
  }
</style>
