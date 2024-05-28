<script lang="ts">
  import { echarts } from '$lib/components/Echart'
  import Challenge, { type ModeType } from '$lib/components/ChallengeComponent'
	import { onMount } from 'svelte';

  export let data
  export let mode: ModeType = 'line'

  let chart: typeof data.data | undefined = undefined
  let initial = false
  $: if (initial) chart = data.data
  onMount(() => {
    initial = true
  })

  function setAreaStyle(_, i: number) {
    if (chart?.linearGradient) {
      return {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: chart.linearGradient[i][0]
          },
          {
            offset: 1,
            color: chart.linearGradient[i][1]
          }
        ])
      }
    } else {
      return undefined
    }
  }
</script>

<div class="text-center">
  <span>Current mode is {mode}.</span>
  <button on:click={() => (mode = mode === 'line' ? 'stack' : 'line')} class="underline text-red-400">click switch mode</button>
</div>
<Challenge
  areaStyle={chart?.linearGradient ? setAreaStyle : chart?.areaStyle || undefined}
  mode={mode}
  data={chart?.demoData}
  legend
  fieldNames={{ xAxis: 'week_day', yAxis: 'data' }}
  option={chart?.option} class="w-full h-full"
/>