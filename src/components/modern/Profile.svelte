<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  import Edit from "../edit/Edit.svelte";
  import LinkWrapper from "../edit/LinkWrapper.svelte";
  import ImageWrapper from "../edit/ImageWrapper.svelte";
  import PopUp from "./PopUp.svelte";
  import Header from "./Header.svelte";

  import { genStyle } from "../functions";
  import { getColors } from "./getColor";
  import { blob2base64 } from "./blob2base64";

  export let edit = true;
  export let profile: ProfileType;

  let colors: ColorListType = getColors({
    r: profile.primaryColor[0],
    g: profile.primaryColor[1],
    b: profile.primaryColor[2],
  });
  $: colors = getColors({
    r: profile.primaryColor[0],
    g: profile.primaryColor[1],
    b: profile.primaryColor[2],
  });
  let popUp = false;
  let currLink = 0;
</script>

<svelte:head>
  <Header {profile} />
</svelte:head>

<div
  style={genStyle({
    "--c2": colors[2],
    "--c6": colors[6],
    "--c14": colors[14],
    "--c35": colors[35],
    "--c80": colors[80],
    "--c96": colors[96],
  })}
>
  <div class="site">
    <div class="bg-image" style={`background-image: url(${profile.img})`} />
    <div class="bg-cover" />
    <div class="bg" />
    {#if popUp}
      <PopUp bind:active={popUp} bind:profile currentLink={currLink} />
    {/if}
    <Edit {edit} bind:profile on:save={(e) => dispatch("save", e.detail)}>
      <div class="profile">
        {#if edit}
          <ImageWrapper
            on:change={async (e) => {
              const [base64, averageColor] = await blob2base64(e.detail.url);
              profile.img = base64;
              profile.primaryColor = [
                averageColor.r,
                averageColor.g,
                averageColor.b,
              ];
            }}
            ><img
              class="img"
              alt="profile-img"
              src={profile.img}
            /></ImageWrapper
          >
        {:else}
          <img class="img" alt="profile-img" src={profile.img} />
        {/if}
        <div class="profileInfo">
          <div class="name">
            {#if edit}<input
                type="text"
                class="inpt"
                bind:value={profile.name}
              />{:else}
              {profile.name}
            {/if}
          </div>
          <div class="description">
            {#if edit}<input
                type="text"
                class="inpt"
                bind:value={profile.description}
              />{:else}
              {profile.description}
            {/if}
          </div>
        </div>
        {#if edit}
          <LinkWrapper
            let:link
            linkList={profile.links}
            let:linkId={i}
            let:active
          >
            <div
              class="link"
              class:is-active={active}
              on:click={() => {
                popUp = true;
                currLink = i;
              }}
            >
              {link.text}
            </div>
          </LinkWrapper>
        {:else}
          {#each profile.links as link}
            <a target="_blank" class="link" href={link.url}>
              {link.text}
            </a>
          {/each}
        {/if}
      </div>
    </Edit>
  </div>
</div>

<style lang="scss">
  :root {
    color-scheme: light dark;
  }
  .site {
    --bg: #fff;
    --text: var(--c14);
    --text-light: var(--c35);
    --text-ultra-light: var(--c80);
    --btn-bg: var(--c96);

    /*background: var(--bg);*/
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
    overflow: auto;
    color: var(--text);
    transition: background-color 0.2s, color 0.2s;
  }
  @media (prefers-color-scheme: dark) {
    .site {
      --bg: var(--c2);
      --text: var(--c80);
      --text-light: var(--c35);
      --text-ultra-light: var(--c14);
      --btn-bg: var(--c6);
    }
  }
  .bg-image,
  .bg-cover,
  .bg {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: -1;
  }
  .bg-image {
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
  .bg-cover {
    background: var(--bg);
    opacity: 0.7;
  }
  .bg {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    /*background: var(--bg);*/
    /*backdrop-filter: blur(170px);*/
    backdrop-filter: blur(170px);
  }
  .profile {
    max-width: 22rem;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    padding-top: 4rem;

    .img {
      border-radius: 8rem;
      height: 8rem;
      width: 8rem;
      object-fit: contain;
    }
    .profileInfo {
      margin: 1.5rem 0;
      .name {
        font-weight: bold;
        font-size: xx-large;
      }
      .description {
        color: var(--text-light);
      }
    }
    .inpt {
      display: block;
      width: 100%;
      margin: 0;
      padding: 0;
      border: none;
      text-align: inherit;
      font-weight: inherit;
      font-size: inherit;
      color: inherit;
      background: inherit;
    }
    .link {
      margin: 1.5rem 0;
      display: block;
      /*background: var(--btn-bg);*/

      color: inherit;
      padding: 1rem;
      border-radius: 0.7rem;
      border: 2px solid var(--text);
      box-sizing: border-box;
      text-decoration: none;
      transition: background-color 0.2s, color 0.2s;
      cursor: pointer;
      &:hover {
        background: var(--text);
        color: var(--text-ultra-light);
      }
      &.is-active {
        box-shadow: 0 0 0 0.1rem var(--text);
      }
    }
  }
</style>
