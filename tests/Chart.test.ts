import { render } from '@testing-library/svelte'
import { describe, it, expect, vi } from 'vitest'
import Chart, { useEchart } from '$lib/components/Echart'
import { options } from './data/Chart/testOptions'


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
  });

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
  it('should throw error if setOptions called before registration', () => {
    const [, { setOption }] = useEchart();
    const options = {}

    expect(() => setOption(options)).toThrowError('Echart has not been registered')
  })

  it('should register EChart instance', () => {
    const [register, instanceMethods] = useEchart()
    const instance = {} as any
    const detail = { instance }
    const event = new CustomEvent('test', { detail })
    register(event)
    expect(() => instanceMethods.setOption(options)).not.toThrowError('registered')
  });

  it('should set options on registered instance', () => {
    const [register, { setOption }] = useEchart({ initOptions: {} });
    const instance = { setOption: vi.fn() } as any;
    const detail = { instance };
    const event = new CustomEvent('test', { detail });

    register(event);
    setOption({});

    expect(instance.setOption).toHaveBeenCalled();
  });
})