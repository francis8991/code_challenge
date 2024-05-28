import * as echarts from 'echarts/core'

import {
  BarChart,
  LineChart,
  PieChart,
  MapChart,
  PictorialBarChart,
  RadarChart,
  ScatterChart,
  EffectScatterChart,
} from 'echarts/charts'

import type {
  ComposeOption,
} from 'echarts/core'

import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  PolarComponent,
  AriaComponent,
  LegendComponent,
  RadarComponent,
  ToolboxComponent,
  DataZoomComponent,
  VisualMapComponent,
  TimelineComponent,
  CalendarComponent,
  GraphicComponent,
  MarkPointComponent,
  MarkAreaComponent,
  BrushComponent,
} from 'echarts/components'

import type {
  // 组件类型的定义后缀都为 ComponentOption
  TitleComponentOption,
  TooltipComponentOption,
  GridComponentOption,
  PolarComponentOption,
  AriaComponentOption,
  LegendComponentOption,
  RadarComponentOption,
  ToolboxComponentOption,
  DataZoomComponentOption,
  VisualMapComponentOption,
  TimelineComponentOption,
  CalendarComponentOption,
  GraphicComponentOption,
  MarkPointComponentOption,
  MarkAreaComponentOption,
  BrushComponentOption
} from 'echarts/components'

import { SVGRenderer } from 'echarts/renderers'

echarts.use([
  LegendComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  PolarComponent,
  AriaComponent,
  BarChart,
  LineChart,
  PieChart,
  MapChart,
  RadarChart,
  EffectScatterChart,
  SVGRenderer,
  PictorialBarChart,
  RadarComponent,
  ToolboxComponent,
  DataZoomComponent,
  VisualMapComponent,
  TimelineComponent,
  CalendarComponent,
  GraphicComponent,
  ScatterChart,
  MarkPointComponent,
  MarkAreaComponent,
  BrushComponent
])

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
export interface CustomOption {
  title?: TitleComponentOption
  tooltip?: TooltipComponentOption
  grid?: GridComponentOption
  polar?: PolarComponentOption
  aria?: AriaComponentOption
  legend?: LegendComponentOption
  radar?: RadarComponentOption
  toolbox?: ToolboxComponentOption
  dataZoom?: DataZoomComponentOption
  visualMap?: VisualMapComponentOption
  timeline?: TimelineComponentOption
  calendar?: CalendarComponentOption
  graphic?: GraphicComponentOption
  markPoint?: MarkPointComponentOption
  markArea?: MarkAreaComponentOption
  brush?: BrushComponentOption
}
type CustomUnionOption = App.NonUndefined<App.Values<CustomOption>>
export type ECOption = ComposeOption<CustomUnionOption>

export type ECharts = echarts.ECharts
export type ChartAction = Omit<Pick<ECharts, App.FunctionKeys<ECharts>>, 'getRenderedCanvas'>
export default echarts