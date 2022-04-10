<script lang="ts">
  import PopUp from "../edit/PopUp.svelte";
  import PopUpInput from "../edit/PopUpInput.svelte";
  import PopUpButton from "../edit/PopUpButton.svelte";
  import PopUpLink from "../edit/PopUpLink.svelte";

  export let profile: ProfileType;
  export let active: boolean;
  export let currentLink: number;

  let name: string = profile.links[currentLink].text;
  let url: string = profile.links[currentLink].url;
</script>

<PopUp
  title="Edit link"
  on:close={() => {
    active = false;
  }}
>
  <PopUpInput
    label="Name"
    bind:content={name}
    id="name"
    placeholder="e.g. Twitter, Facebook, Instagram"
  />
  <PopUpInput
    label="URL"
    bind:content={url}
    id="url"
    placeholder="e.g. https://twitter.com/twitter"
  />
  <PopUpButton
    name="Submit"
    on:click={() => {
      profile.links[currentLink].text = name;
      profile.links[currentLink].url = url;
      active = false;
    }}
  />
  <PopUpButton
    name="Cancel"
    on:click={() => {
      active = false;
    }}
  />
  <PopUpLink
    name="Remove link"
    on:click={() => {
      profile.links = profile.links.filter((lnk, i) => i != currentLink);
      active = false;
    }}
  />
</PopUp>
