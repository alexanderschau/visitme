<script lang="ts">
  export let profile: ProfileType;
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
{#each profile.links as link}
  <div class="my-3 flex w-full border-2 border-black">
    <div class="flex-1 px-5 py-3">{link.label}</div>
    <div class="w-8 bg-black" />
  </div>
{/each}
