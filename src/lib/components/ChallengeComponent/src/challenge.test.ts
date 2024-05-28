import { render } from '@testing-library/svelte'
import { describe, it, expect } from 'vitest'
import Challenge from './Challenge.svelte'
// import { echarts } from '$lib/components/Echart'

describe('Challenge', () => {
  it('renders chart with given options', () => {
    const { container, baseElement } = render(Challenge, { props: {} });
    const chartElement = container.querySelector('div');
    expect(chartElement).toBeInTheDocument();

    expect(
      baseElement.querySelector('div[_echarts_instance_]'),
      'echarts instance not found',
    ).toBeTruthy()
    expect(baseElement.querySelector('svg'), 'chart svg not found').toBeTruthy()
  });
});