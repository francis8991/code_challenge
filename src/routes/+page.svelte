<script>
  import '@/app.css'
  import { examplesOptions } from './options'
</script>
<style></style>
<h1>Welcome to SvelteKit</h1>
<ul>
	{#each examplesOptions as item, i}
		<li>
      <a href={`/demo/${i + 1}`}>
        {`go demo${i + 1}`}
      </a>
    </li>
	{/each}
</ul>