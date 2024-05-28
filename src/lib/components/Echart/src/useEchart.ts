import type { ECOption, ChartAction } from './echarts'
import type { EChartsInitOpts, SetOptionOpts } from 'echarts';
export interface UseEchartProps {
  initOptions?: EChartsInitOpts
  notMerge?: SetOptionOpts['notMerge']
  lazyUpdate?: SetOptionOpts['lazyUpdate']
  silent?: SetOptionOpts['silent']
  replaceMerge?:SetOptionOpts['replaceMerge']
  transition?: SetOptionOpts['transition']
}
type RegisterFn = (event: CustomEvent<{ instance: ChartAction }>) => void
export interface UseChartMethods extends Omit<ChartAction, 'setOption' | 'convertFromPixel' | 'convertToPixel' | 'on' | 'off' | 'appendData'> {
  setOption: (options: ECOption, opts?: SetOptionOpts) => void
}
export type UseChartReturnType = [RegisterFn, UseChartMethods]
const useEchart: (params?: UseEchartProps) => UseChartReturnType = (params) => {
  let instance: ChartAction
  const register: RegisterFn = (e) => {
    instance = e.detail.instance
    if (params?.initOptions) instance.setOption(params.initOptions)
  }
  const getInstance = () => {
    if (!instance) throw new Error('Echart has not been registered, Check if you provide register for the component')
    return instance
  }

  const methods: UseChartMethods = {
    setOption: (options: ECOption, opts?: SetOptionOpts) => {
      getInstance()?.setOption(options, {
        notMerge: params?.notMerge,
        lazyUpdate: params?.lazyUpdate,
        silent: params?.silent,
        replaceMerge: params?.replaceMerge,
        transition: params?.transition,
        ...opts,
      })
    },
    resize: (...args) => {
      getInstance()?.resize(...args)
    },
    dispose: () => {
      getInstance()?.dispose()
    },
    showLoading: (...args) => {
      getInstance()?.showLoading(...args)
    },
    getDom: () => {
      return getInstance()?.getDom()
    },
    getHeight() {
      return getInstance()?.getHeight()
    },
    getWidth() {
      return getInstance()?.getWidth()
    },
    getId() {
      return getInstance()?.getId()
    },
    getZr() {
      return getInstance()?.getZr()
    },
    isSSR() {
      return getInstance()?.isSSR()
    },
    getOption() {
      return getInstance()?.getOption()
    },
    getDevicePixelRatio() {
      return getInstance()?.getDevicePixelRatio()
    },
    getDataURL(...args) {
      return getInstance()?.getDataURL(...args)
    },
    getConnectedDataURL(...args) {
      return getInstance()?.getConnectedDataURL(...args)
    },
    getSvgDataURL() {
      return getInstance()?.getSvgDataURL()
    },
    getVisual: (...args) => {
      return getInstance()?.getVisual(...args)
    },
    renderToCanvas: (...args) => {
      return getInstance()?.renderToCanvas(...args)
    },
    renderToSVGString: (...args) => {
      return getInstance()?.renderToSVGString(...args)
    },
    containPixel: (...args) => {
      return getInstance()?.containPixel(...args)
    },
    isDisposed: () => {
      return getInstance()?.isDisposed()
    },
    clear: () => {
      getInstance()?.clear()
    },
    hideLoading: () => {
      getInstance()?.hideLoading()
    },
    makeActionFromEvent: (...args) => {
      return getInstance()?.makeActionFromEvent(...args)
    },
    dispatchAction: (...args) => {
      getInstance()?.dispatchAction(...args)
    },
    updateLabelLayout: () => {
      getInstance()?.updateLabelLayout()
    },
    isSilent: (...args) => {
      return getInstance()?.isSilent(...args)
    },
    trigger: (...args) => {
      return getInstance()?.trigger(...args)
    },
    triggerWithContext: (...args) => {
      return getInstance()?.triggerWithContext(...args)
    },
  }
  return [
    register,
    methods
  ]
}

export default useEchart;