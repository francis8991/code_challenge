<script lang="ts">
  import echarts, { type ECOption, type ECharts } from './echarts'
  import type {
    SetOptionOpts,
    EChartsInitOpts,
  } from 'echarts'
  import type { Action } from 'svelte/action'
  import { createEventDispatcher, onMount } from 'svelte'
  import { EVENT_NAMES, type EventHandlers, type CustomEventHandlers } from './constant'
  import type { ChartAction } from './echarts'

  type EchartsTheme = string | object | null
  export let theme: EchartsTheme = 'light'
  // the style of echarts div.
  export let className = ''
  export let style = ''
  export let initOptions: EChartsInitOpts | undefined = undefined
  export let options: ECOption | undefined = undefined
  export let notMerge: SetOptionOpts['notMerge'] = true // deviation from ECharts default, works better with Svelte
  export let lazyUpdate: SetOptionOpts['lazyUpdate'] = false
  export let silent: SetOptionOpts['silent'] = false
  export let replaceMerge: SetOptionOpts['replaceMerge'] = undefined
  export let transition: SetOptionOpts['transition'] = undefined

  let instance: ECharts | undefined = undefined

  let echartElement: HTMLDivElement
  $: if (instance && options) instance.setOption(options, { notMerge, lazyUpdate, silent, replaceMerge, transition })

  const dispatch = createEventDispatcher<EventHandlers & CustomEventHandlers>()

  const handleResize = () => {
    if (instance && !instance.isDisposed()) instance.resize()
  }
 
  const initChartAction = (element: HTMLElement, theme: EchartsTheme, initOptions?: EChartsInitOpts) => {
    let echartInstance = echarts.init(element, theme, initOptions)
    let action: ChartAction | Object = {}
    for (const key in echartInstance) {
      if (typeof echartInstance[key] === 'function') {
        action[key] = (...args) => {
          echartInstance[key](...args)
        }
      }
    }
    instance = echartInstance

    EVENT_NAMES.forEach((eventName) => {
      // @ts-expect-error
      instance.on(eventName, (event) => dispatch(eventName, event))
    })
    return action as ChartAction
  }
  const initial = (element: HTMLElement) => {
    instance?.dispose()
    const action = initChartAction(element, theme, initOptions)
    dispatch('register', {
      instance: action
    })
  }

  const initChart: Action<HTMLDivElement> = (element) => {
    initial(element)
    return {
      destroy() {
        instance!.dispose()
      },
    }
  }

  let prevTheme: EchartsTheme = theme
  $: changeTheme(theme)

  function changeTheme(theme: EchartsTheme) {
    prevTheme !== theme && initial(echartElement)
    prevTheme = theme
  }

  onMount(() => {
    const resizeObserver = new ResizeObserver(handleResize)
    resizeObserver.observe(echartElement)
    return () => {
      resizeObserver?.disconnect()
    }
  })

  $: elClassName = ['root', className].join(' ')

  $: {
    if (!!instance) {
      instance?.resize()
    }
    [style, className]
  }

  export const getInstance = () => {
    return instance
  }
</script>

<style>
  .root {
    width: 100%;
    height: 100%;
  }
</style>


<div bind:this={echartElement} use:initChart {...$$restProps} {style} class={elClassName}></div>
