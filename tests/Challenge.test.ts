import { render } from '@testing-library/svelte'
import { describe, it, expect } from 'vitest'
import Challenge from '$lib/components/ChallengeComponent'

const options = {
  series: [{ lineStyle: { width: 3 } }],
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  legend: {
    data: ['test']
  },
  brush: {
    toolbox: ['keep', 'lineY', 'clear']
  }
}
describe('Challenge', () => {
  it('renders chart with given empty options', () => {
    const { container, baseElement } = render(Challenge, { props: {} });
    const chartElement = container.querySelector('div');
    expect(chartElement).toBeInTheDocument();

    expect(
      baseElement.querySelector('div[_echarts_instance_]'),
      'echarts instance not found',
    ).toBeTruthy()
    expect(baseElement.querySelector('svg'), 'chart svg not found').toBeTruthy()
  })

  it('renders chart with given props empty data', () => {
    const { container, baseElement, component } = render(Challenge, { props: { option: {}, mode: 'line', data: [], legend: true } });
    const chartElement = container.querySelector('div');
    expect(chartElement).toBeInTheDocument();

    expect(
      baseElement.querySelector('div[_echarts_instance_]'),
      'echarts instance not found',
    ).toBeTruthy()
    expect(baseElement.querySelector('svg'), 'chart svg not found').toBeTruthy()
    
    component.$set({ mode: 'stack', data: [{seriesName: 'stack', data: []}] })
    component.$set({ mode: 'line' })
    component.$set({
      data: [{seriesName: 'stack', data: []}],
      option: {
        series: [{ lineStyle: { width: 3 } }],
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        legend: {
          data: ['test']
        }
      },
      legend: false
    })

    component.$set({
      data: [{seriesName: 'stack', data: []}],
      option: {
        series: [{ lineStyle: { width: 3 } }],
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        legend: {
          data: ['test']
        }
      },
    })
    component.$set({
      data: [{seriesName: 'stack', data: []}],
      option: {
        series: [{ lineStyle: { width: 3 } }],
        toolbox: {
          feature: {
            saveAsImage: {},
            brush: {}
          }
        },
        legend: undefined
      },
      legend: true
    })

  })

  it('renders chart with given props data', () => {
    const { container, baseElement, component } = render(Challenge, { props: { options, mode: 'line', data: [] } });
    const chartElement = container.querySelector('div');
    expect(chartElement).toBeInTheDocument();

    expect(
      baseElement.querySelector('div[_echarts_instance_]'),
      'echarts instance not found',
    ).toBeTruthy()
    expect(baseElement.querySelector('svg'), 'chart svg not found').toBeTruthy()
    
    component.$set({ mode: 'stack', data: [{seriesName: 'stack', data: []}] })
    component.$set({ mode: 'line' })

    component.$set({
      data: [{seriesName: 'stack', data: []}],
      showBrush: false
    })
    component.$set({
      data: [{seriesName: 'stack', data: []}],
      showLegend: false,
    })

    expect(baseElement.querySelector('svg'), 'chart svg not found').toBeTruthy()
  })
})