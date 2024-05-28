<script lang="ts">
  import { examplesOptions } from '@/routes/options.js'
  export let data
</script>

<main class="h-[100vh] flex flex-col">
  <h1 class="text-center">
    {`Demo${data.index} for display`}
  </h1>
  <div class="text-center">
    {#each examplesOptions as _, i}
      {#if data.index - 1 !== i}
        <a href={`/demo/${i + 1}`}>
          {`go demo${i + 1}`}
        </a>
      {/if}
    {/each}
  </div>
  <div class="flex-1 pb-10">
    <slot />
  </div>
</main>