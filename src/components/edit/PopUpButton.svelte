<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let name: string;

  const click = () => {
    dispatch("click");
  };
</script>

<div class="button" on:click={click}>{name}</div>

<style lang="scss">
  .button {
    font-size: inherit;
    font-family: inherit;
    border: none;
    margin: 1.5rem 0;
    display: block;
    background: var(--btn-bg);
    color: inherit;
    padding: 1rem;
    border-radius: 1rem;
    text-decoration: none;
    transition: background-color 0.2s, color 0.2s;
    text-align: center;
    cursor: pointer;

    &:hover {
      background: var(--text);
      color: var(--text-ultra-light);
    }
  }
</style>
