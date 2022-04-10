<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let name: string;

  const click = () => dispatch("click");
</script>

<div class="link">
  <span on:click={click}>{name}</span>
</div>

<style lang="scss">
  .link {
    text-align: center;
    text-decoration: underline;
    cursor: pointer;
  }
</style>
