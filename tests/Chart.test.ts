import { render } from '@testing-library/svelte'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import Chart, { useEchart, type ChartAction, type UseChartReturnType } from '$lib/components/Echart'

const options = {}
const mockChartAction: ChartAction = {
  // @ts-expect-error type
  setOption: vi.fn(),
  resize: vi.fn(),
  dispose: vi.fn(),
  // @ts-expect-error type
  showLoading: vi.fn(),
  getDom: vi.fn(),
  getHeight: vi.fn(),
  getWidth: vi.fn(),
  getId: vi.fn(),
  getZr: vi.fn(),
  isSSR: vi.fn(),
  getOption: vi.fn(),
  getDevicePixelRatio: vi.fn(),
  getDataURL: vi.fn(),
  getConnectedDataURL: vi.fn(),
  getSvgDataURL: vi.fn(),
  getVisual: vi.fn(),
  renderToCanvas: vi.fn(),
  renderToSVGString: vi.fn(),
  containPixel: vi.fn(),
  isDisposed: vi.fn(),
  clear: vi.fn(),
  hideLoading: vi.fn(),
  makeActionFromEvent: vi.fn(),
  dispatchAction: vi.fn(),
  updateLabelLayout: vi.fn(),
  isSilent: vi.fn(),
  trigger: vi.fn(),
  triggerWithContext: vi.fn(),
}
describe('Chart', () => {
  it('renders chart with given prop options', () => {
    const { container, debug, baseElement } = render(Chart, { props: { options, lazyUpdate: false, notMerge: true } })
    const chartElement = container.querySelector('div')
    expect(chartElement).toBeInTheDocument()

    debug()

    // echarts 标识 div[_echarts_instance_]
    expect(
      baseElement.querySelector('div[_echarts_instance_]'),
      'echarts instance not found',
    ).toBeTruthy()
    expect(baseElement.querySelector('svg'), 'chart svg not found').toBeTruthy()
  })

  it('renders chart with given prop empty options', () => {
    const { container, baseElement, component } = render(Chart)
    const chartElement = container.querySelector('div')
    expect(chartElement).toBeInTheDocument()

    expect(
      baseElement.querySelector('div[_echarts_instance_]'),
      'echarts instance not found',
    ).toBeTruthy()
    expect(baseElement.querySelector('svg'), 'chart svg not found').toBeTruthy()

    const instance = component.getInstance()
    expect(instance).not.toBeUndefined()
  })

  it('renders chart with given prop', () => {
    const { container, baseElement, component } = render(Chart, { props: { theme: 'dark' } })
    const chartElement = container.querySelector('div')
    expect(chartElement).toBeInTheDocument()

    expect(
      baseElement.querySelector('div[_echarts_instance_]'),
      'echarts instance not found',
    ).toBeTruthy()
    expect(baseElement.querySelector('svg'), 'chart svg not found').toBeTruthy()

    component.$set({
      theme: 'light',
      className: 'test'
    })
    const instance = component.getInstance()
    expect(instance).not.toBeUndefined()
  })

  it('renders chart with useEchart', async () => {
    const [register, instanceMethods] = useEchart()
    const { container, baseElement } = render(Chart)
    const chartElement = container.querySelector('div')
    // instanceMethods.setOptions(options)

    expect(chartElement).toBeInTheDocument()
    expect(
      baseElement.querySelector('div[_echarts_instance_]'),
      'echarts instance not found',
    ).toBeTruthy()

    expect(() => instanceMethods.setOption(options)).toThrowError('registered')

    const instance = {} as any
    const detail = { instance }
    const event = new CustomEvent('test', { detail })
    register(event)

    expect(() => instanceMethods.setOption(options)).not.toThrowError('registered')
  })
})

describe('useEchart', () => {
  let register: UseChartReturnType[0]
  let methods: UseChartReturnType[1]

  beforeEach(() => {
    vi.clearAllMocks()

    const customEvent = new CustomEvent('register', { detail: { instance: mockChartAction } })

    const result = useEchart()
    register = result[0]
    methods = result[1]

    register(customEvent)
  });
  it('should throw error if setOptions called before registration', () => {
    const [, { setOption }] = useEchart()
    const options = {}

    expect(() => setOption(options)).toThrowError('Echart has not been registered')
  })

  it('should register instance and set initial options if provided', () => {
    const options = {
      initOptions: { width: 300, height: 200 }
    }
    const [register] = useEchart(options)

    const customEvent = new CustomEvent('register', { detail: { instance: mockChartAction } })
    register(customEvent)

    expect(mockChartAction.setOption).toHaveBeenCalledWith(options.initOptions)
  })

  it('should register EChart instance', () => {
    const [register, instanceMethods] = useEchart()
    const instance = {} as any
    const detail = { instance }
    const event = new CustomEvent('test', { detail })
    register(event)
    expect(() => instanceMethods.setOption(options)).not.toThrowError('registered')
  })

  it('should set options on registered instance', () => {
    const [register, { setOption }] = useEchart({ initOptions: {} })
    const instance = { setOption: vi.fn() } as any
    const detail = { instance }
    const event = new CustomEvent('test', { detail })

    register(event)
    setOption({})

    expect(instance.setOption).toHaveBeenCalled()
  })

  it('should call resize method', () => {
    methods.resize()

    expect(mockChartAction.resize).toHaveBeenCalled()
  })

  it('should call dispose method', () => {
    methods.dispose();

    expect(mockChartAction.dispose).toHaveBeenCalled();
  });

  it('should call showLoading method', () => {
    methods.showLoading();

    expect(mockChartAction.showLoading).toHaveBeenCalled();
  });

  it('should call getDom method', () => {
    methods.getDom();

    expect(mockChartAction.getDom).toHaveBeenCalled();
  });

  it('should call getHeight method', () => {
    methods.getHeight();

    expect(mockChartAction.getHeight).toHaveBeenCalled();
  });

  it('should call getWidth method', () => {
    methods.getWidth();

    expect(mockChartAction.getWidth).toHaveBeenCalled();
  });

  it('should call getId method', () => {
    methods.getId();

    expect(mockChartAction.getId).toHaveBeenCalled();
  });

  it('should call getZr method', () => {
    methods.getZr();

    expect(mockChartAction.getZr).toHaveBeenCalled();
  });

  it('should call isSSR method', () => {
    methods.isSSR();

    expect(mockChartAction.isSSR).toHaveBeenCalled();
  });

  it('should call getOption method', () => {
    methods.getOption();

    expect(mockChartAction.getOption).toHaveBeenCalled();
  });

  it('should call getDevicePixelRatio method', () => {
    methods.getDevicePixelRatio();

    expect(mockChartAction.getDevicePixelRatio).toHaveBeenCalled();
  });

  it('should call getDataURL method', () => {
    methods.getDataURL();

    expect(mockChartAction.getDataURL).toHaveBeenCalled();
  });

  it('should call getConnectedDataURL method', () => {
    methods.getConnectedDataURL();

    expect(mockChartAction.getConnectedDataURL).toHaveBeenCalled();
  });

  it('should call getSvgDataURL method', () => {
    methods.getSvgDataURL();

    expect(mockChartAction.getSvgDataURL).toHaveBeenCalled();
  });

  it('should call getVisual method', () => {
    // @ts-ignore
    methods.getVisual();

    expect(mockChartAction.getVisual).toHaveBeenCalled();
  });

  it('should call renderToCanvas method', () => {
    methods.renderToCanvas();

    expect(mockChartAction.renderToCanvas).toHaveBeenCalled();
  });

  it('should call renderToSVGString method', () => {
    methods.renderToSVGString();

    expect(mockChartAction.renderToSVGString).toHaveBeenCalled();
  });

  it('should call containPixel method', () => {
    // @ts-ignore
    methods.containPixel();

    expect(mockChartAction.containPixel).toHaveBeenCalled();
  });

  it('should call isDisposed method', () => {
    methods.isDisposed();

    expect(mockChartAction.isDisposed).toHaveBeenCalled();
  });

  it('should call clear method', () => {
    methods.clear();

    expect(mockChartAction.clear).toHaveBeenCalled();
  });

  it('should call hideLoading method', () => {
    methods.hideLoading();

    expect(mockChartAction.hideLoading).toHaveBeenCalled();
  });

  it('should call makeActionFromEvent method', () => {
    // @ts-ignore
    methods.makeActionFromEvent();

    expect(mockChartAction.makeActionFromEvent).toHaveBeenCalled();
  });

  it('should call dispatchAction method', () => {
    // @ts-ignore
    methods.dispatchAction();

    expect(mockChartAction.dispatchAction).toHaveBeenCalled();
  });

  it('should call updateLabelLayout method', () => {
    methods.updateLabelLayout();

    expect(mockChartAction.updateLabelLayout).toHaveBeenCalled();
  });

  it('should call isSilent method', () => {
    // @ts-ignore
    methods.isSilent();

    expect(mockChartAction.isSilent).toHaveBeenCalled();
  });

  it('should call trigger method', () => {
    // @ts-ignore
    methods.trigger();

    expect(mockChartAction.trigger).toHaveBeenCalled();
  });

  it('should call triggerWithContext method', () => {
    // @ts-ignore
    methods.triggerWithContext();

    expect(mockChartAction.triggerWithContext).toHaveBeenCalled();
  });
})