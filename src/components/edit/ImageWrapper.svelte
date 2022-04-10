<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  let input: HTMLInputElement;

  const uploadImage = async (objectUrl: string) => {
    dispatch("change", { url: objectUrl });
  };
</script>

<input
  bind:this={input}
  id="file-input"
  type="file"
  name="name"
  style="display: none;"
  accept="image/*"
  on:input={(e) => {
    e.preventDefault();
    //@ts-ignore
    uploadImage(window.URL.createObjectURL(e.target.files[0]));
  }}
/>
<div
  class="image-upload"
  on:dragover={(e) => {
    e.preventDefault();
  }}
  on:drop={(e) => {
    e.preventDefault();
    uploadImage(window.URL.createObjectURL(e.dataTransfer.files[0]));
  }}
  on:click={() => {
    input.click();
  }}
>
  <slot />
</div>

<style lang="scss">
  .image-upload {
    cursor: pointer;
    &:hover {
      opacity: 0.5;
    }
  }
</style>
