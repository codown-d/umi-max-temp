import { COLORS } from '@/constants';
import * as echarts from 'echarts';
import { merge } from 'lodash';
import { useCallback, useEffect, useMemo, useRef } from 'react';
interface Props {
  option: any;
}
const Chart: React.FC<Props> = (props) => {
  let refDom = useRef(null);
  const colors = [
    '#c23531', // 红色
    '#2f4554', // 深蓝色
    '#61a0c8', // 浅蓝色
    '#d48265', // 橙色
    '#91c7ae', // 绿色
    '#749f83', // 深绿色
    '#bda29a', // 灰色
    '#ffdb5c', // 黄色
    '#6e7074', // 暗灰色
    '#546570', // 深灰色
    '#c4e3f3', // 浅灰色
    '#d7ab8c', // 粉色
    '#b8b11c', // 亮黄
  ];
  let chartInstance = useRef<echarts.ECharts>();
  let total = useMemo(() => {
    return props.option?.series.reduce(
      (acc: any, cur: { data: any[] }) =>
        acc + cur.data.reduce((a, b) => a + b.value, 0),
      0,
    );
  }, [props.option]);
  let color = useMemo(() => {
    return props.option.series[0]['data'].map((item) => {
      return COLORS[item.name];
    });
  }, [props.option.series]);
  let option = useMemo(() => {
    return merge(
      {
        color: color,
        tooltip: {
          trigger: 'item',
        },
        legend: {
          orient: 'vertical',
          top: '5%',
          left: 'right',
        },
        graphic: {
          type: 'text',
          left: 'center',
          top: 'center',
          style: {
            text: `总数\n${total}`, // 动态显示总数
            textAlign: 'center',
            font: 'bold 16px Arial',
            fill: '#333',
          },
        },
        series: [],
      },
      props.option,
    );
  }, [props.option, total]);
  let initChart = useCallback(() => {
    if (!refDom.current) return;
    let chart = echarts.init(refDom.current);
    option && chart?.setOption(option);
    chart.on('mouseover', function (params) {
      chart.setOption({
        graphic: {
          type: 'text',
          left: 'center',
          top: 'center',
          style: {
            text: `${params.name}\n${params.value}`, // 动态显示总数
            textAlign: 'center',
            font: 'bold 16px Arial',
            fill: '#333',
          },
        },
      });
    });
    chart.on('mouseout', function () {
      chart.setOption({
        graphic: {
          type: 'text',
          left: 'center',
          top: 'center',
          style: {
            text: `总计\n${total}`, // 动态显示总数
            textAlign: 'center',
            font: 'bold 16px Arial',
            fill: '#333',
          },
        },
      });
    });
    chartInstance.current = chart;
  }, [option, total]);
  useEffect(() => {
    initChart();
  }, [initChart]);
  const resizeChart = () => {
    if (chartInstance) {
      chartInstance.current?.resize();
    }
  };

  useEffect(() => {
    initChart();
    window.addEventListener('resize', resizeChart);

    return () => {
      window.removeEventListener('resize', resizeChart);
      if (chartInstance) {
        chartInstance.current?.dispose(); // 销毁图表实例，防止内存泄漏
      }
    };
  }, []);
  return <div ref={refDom} className="w-full h-[260px]"></div>;
};

export default Chart;
