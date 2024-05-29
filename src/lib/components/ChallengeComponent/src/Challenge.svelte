<script lang="ts" generics="R extends Record<string, any>, T extends Record<string, any>">
  import { onMount, createEventDispatcher } from 'svelte'
  import Chart, { useEchart, EVENT_NAMES, type EventHandlers } from '@/lib/components/Echart'
  import type { LineSeriesOption, EChartOption } from 'echarts'
  import type { ModeType, AreaStyleProps, DataType, AreaStyle, ChallengeOption } from './types'

  type LineSeriesDataItem = App.ExtractUndefinedOrArrayItem<LineSeriesOption['data']>;
  export let mode: ModeType = 'line'
  export let data: DataType<R, T>[] = []
  export let areaStyle: AreaStyleProps<R, T> = undefined
  export let showBrush: boolean = true
  export let fieldNames: { xAxis: string; yAxis: string } = { xAxis: 'xAxis', yAxis: 'yAxis' }
  export let xAxisTextStyle: ((record: T, index?: number) => EChartOption['textStyle']) | undefined = undefined
  export let option: ChallengeOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    yAxis: [
      {
        type: 'value',
      }
    ],
    series: [
      {
        emphasis: {
          focus: 'series'
        },
      }
    ]
  }
  export let legend: boolean = false
  export const formatData: undefined | ((v: T) => LineSeriesDataItem) = undefined

  let chartComponent: Chart
  const dispatch = createEventDispatcher<EventHandlers>()
  onMount(() => {
    EVENT_NAMES.forEach((eventName) => {
      chartComponent.$on(eventName, (event) => {
        // @ts-ignore
        dispatch(eventName, event)
      })
    })
  })
  // export function isMultilple(val: any): val is MultipleDataType<T>[] {
  //   return val && 'seriesName' in val[0];
  // }
  const [register, chartAction] = useEchart()

  function getAreaStyle(record: DataType<R, T>, i: number): AreaStyle {
    if (mode !== 'stack') return undefined
    if (typeof areaStyle === 'function') {
      return areaStyle(record, i)
    } else {
      return areaStyle || {}
    }
  }
  function getXAxisData(index?: number) {
    return data[0].data.map((item: T) => xAxisTextStyle ? { value: item[fieldNames.xAxis], textStyle: xAxisTextStyle(item, index) } : item[fieldNames.xAxis])
  }
  function getXAxis() {
    if (Array.isArray(option.xAxis)) {
      return option.xAxis.map((item, i) => ({ ...item, data: getXAxisData(i) }))
    } else {
      return {
        ...option.xAxis,
        data: getXAxisData()
      }
    }
  }
  function getSeries(): LineSeriesOption[] {
    return data.map((item, i) => {
      const seriesData: LineSeriesOption['data'] = item.data.map((e, i) => formatData ? formatData(e) : e[fieldNames.yAxis === 'index' ? i : fieldNames.yAxis])
      return {
        ...option?.series?.[i],
        name: item.seriesName,
        type: 'line',
        areaStyle: getAreaStyle(item, i), 
        data: seriesData
      }
    })
  }

  const formatOptions = async (customOption: ChallengeOption, legend: boolean) => {
    chartAction.clear()
    chartAction.setOption({
      ...customOption,
      brush: showBrush ? customOption.brush || { toolbox: ['rect', 'polygon', 'keep', 'clear'] } : undefined,
      legend: legend ? customOption.legend || { data: data.map(item => item.seriesName) } : undefined,
      xAxis: getXAxis(),
      yAxis: customOption.yAxis || [
        {
          type: 'value',
        }
      ],
      series: getSeries()
    })
  }

  $: {
    if (data.length) formatOptions(option, legend)
    [mode]
  }

  export const getInstance = () => {
    return chartAction
  }
</script>

<div {...$$restProps}>
  <Chart bind:this={chartComponent} on:register={register} />
</div>