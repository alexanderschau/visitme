<script lang="ts">
  export let label: string, content: string, id: string;
  export let placeholder: string = "";
</script>

<label class="label" for={id}>{label}</label>
<input class="input" {id} type="text" bind:value={content} {placeholder} />

<style lang="scss">
  .label {
    display: block;
    text-align: left;
    margin: 1.5rem 0 -1.2rem 1rem;
  }
  .input {
    font-family: inherit;
    font-size: inherit;
    display: block;
    width: calc(100% - 2rem);
    padding: 1rem;
    border-radius: 1rem;
    border: none;
    background: var(--btn-bg);
    color: inherit;
    outline: none;
    margin: 1.5rem 0;
  }
</style>
