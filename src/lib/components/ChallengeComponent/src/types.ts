import type { LineSeriesOption } from 'echarts'
import type { ECOption, CustomOption } from '@/lib/components/Echart'

export type ModeType = 'line' | 'stack'
export type DataType<T extends Record<string, any> = Record<string, any>, R extends Record<string, any> = Record<string, any>> = { [key in keyof T]: any } & { seriesName: string; data: R[] }

export type AreaStyle = LineSeriesOption['areaStyle']
export type AreaStyleProps<T extends Record<string, any> = Record<string, any>, R extends Record<string, any> = Record<string, any>> = ((val: DataType<T, R>, i: number) => AreaStyle) | AreaStyle | undefined

type XAxisOptionType = Omit<App.ExtractUndefinedOrArrayItem<ECOption['xAxis']>, 'data'>
export type CustomXAxis = XAxisOptionType | XAxisOptionType[] 

export type CustomSeries = Omit<LineSeriesOption, 'data' | 'type' | 'areaStyle' | 'name'>
export type ChallengeOption = CustomOption & {
  color?: string[],
  xAxis?: CustomXAxis
  yAxis?: ECOption['yAxis']
  series?: CustomSeries[]
}
