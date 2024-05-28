// import type { EChartsInitOpts } from 'echarts'
import type { CallbackDataParams } from 'echarts/types/dist/shared.js'
import type { ChartAction } from './echarts'

export type {
  CallbackDataParams
}
export const CUSTOM_EVENT_NAMES = [
  'register'
] as const

// https://echarts.apache.org/en/api.html#events
export const MOUSE_EVENT_NAMES = [
  'click',
  'dblclick',
  'mousedown',
  'mousemove',
  'mouseover',
  'mouseout',
  'globalout',
  'contextmenu',
] as const

export const INTERACTION_EVENT_NAMES = [
  'highlight',
  'downplay',
  'selectchanged',
  'legendselectchanged',
  'legendselected',
  'legendunselected',
  'legendinverseselect',
  'legendscroll',
  'datazoom',
  'datarangeselected',
  'timelinechanged',
  'timelineplaychanged',
  'restore',
  'dataviewchanged',
  'magictypechanged',
  'geoselectchanged',
  'geoselected',
  'geounselected',
  'axisareaselected',
  'brush',
  'brushend',
  'brushselected',
  'globalcursortaken',
  'rendered',
  'finished',
] as const

export const EVENT_NAMES = [...MOUSE_EVENT_NAMES, ...INTERACTION_EVENT_NAMES]

export type ECMouseEvent = CallbackDataParams & {
  event: MouseEvent
}

export type ECInteractionEvent = CallbackDataParams

export type CustomRegisterEvent = {
  instance: ChartAction,
  // init: (opts: EChartsInitOpts) => ChartAction
}
export type CustomEventHandlers = {
  register: CustomRegisterEvent
}

export type MouseEventHandlers = {
  click: ECMouseEvent
  dblclick: ECMouseEvent
  mousedown: ECMouseEvent
  mousemove: ECMouseEvent
  mouseover: ECMouseEvent
  mouseout: ECMouseEvent
  globalout: ECMouseEvent
  contextmenu: ECMouseEvent
}

export type InteractionEventHandlers = {
  highlight: ECInteractionEvent
  downplay: ECInteractionEvent
  selectchanged: ECInteractionEvent
  legendselectchanged: ECInteractionEvent
  legendselected: ECInteractionEvent
  legendunselected: ECInteractionEvent
  legendinverseselect: ECInteractionEvent
  legendscroll: ECInteractionEvent
  datazoom: ECInteractionEvent
  datarangeselected: ECInteractionEvent
  timelinechanged: ECInteractionEvent
  timelineplaychanged: ECInteractionEvent
  restore: ECInteractionEvent
  dataviewchanged: ECInteractionEvent
  magictypechanged: ECInteractionEvent
  geoselectchanged: ECInteractionEvent
  geoselected: ECInteractionEvent
  geounselected: ECInteractionEvent
  axisareaselected: ECInteractionEvent
  brush: ECInteractionEvent
  brushend: ECInteractionEvent
  brushselected: ECInteractionEvent
  globalcursortaken: ECInteractionEvent
  rendered: ECInteractionEvent
  finished: ECInteractionEvent
}

export type EventHandlers = MouseEventHandlers & InteractionEventHandlers