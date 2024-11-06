import { Card } from 'antd';
import Chart from '../Chart';
const CardChart: React.FC<any> = (props) => {
  let { title, ...otherProps } = props;
  return (
    <Card title={title} className="flex-1" bordered={false}>
      <Chart {...otherProps} />
    </Card>
  );
};

export default CardChart;
