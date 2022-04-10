<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let title: string = "";
  const close = () => {
    dispatch("close");
  };
</script>

<div class="popup">
  <div class="bg" on:click={close} />
  <div class="elemcontainer">
    <div class="elem">
      {#if title != ""}
        <div class="heading">{title}</div>
      {/if}
      <slot />
    </div>
  </div>
</div>

<style lang="scss">
  .popup {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 10;
    color: var(--text);

    .bg {
      z-index: -1;
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background: var(--text-ultra-light);
      opacity: 0.6;
    }
    .elemcontainer {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      overflow-y: auto;
      pointer-events: none;

      .elem {
        position: relative;
        top: 50%;
        transform: translateY(-50%);
        max-width: 20rem;
        margin: 0 auto;
        background-color: var(--bg);
        padding: 3rem 4rem;
        border-radius: 2rem;
        pointer-events: all;

        .heading {
          font-weight: bold;
          font-size: 1.4rem;
        }
      }
    }
  }
</style>
