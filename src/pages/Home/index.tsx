import CardChart from '@/components/CardChart';
import {
  APPLICATION,
  CODELIST,
  DEFECTS,
  IMAGESVIEW,
  LEAK,
  PERMISSION,
  SECURITYPROFILE,
} from '@/constants';
import { Card, Progress } from 'antd';
import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div className="w-full">
      <div className="flex justify-around gap-x-4 px-4 pt-4">
        <CardChart
          title={'缺陷数量统计'}
          option={{
            series: DEFECTS,
            legend: {
              formatter: function (name) {
                let total = 0;
                const obj = DEFECTS[0].data.reduce((pre, item) => {
                  pre[item.name] = item.value;
                  total += item.value;
                  return pre;
                }, {});
                const value = obj[name];
                return `${name}: ${value} (${((value / total) * 100).toFixed(2)}%)`;
              },
            },
          }}
        />
        <Card
          title={'代码行数统计'}
          className=" w-2/3 flex flex-col"
          classNames={{ body: 'flex-1' }}
        >
          <div className="grid grid-cols-2 gap-4 flex items-center justify-center h-full ">
            {CODELIST.map((item, index) => {
              return (
                <Card
                  key={item.label}
                  bordered={false}
                  styles={{
                    body: { background: '#E9545408' },
                  }}
                >
                  <div className="flex justify-between ">
                    <div>
                      <span>{item.num}</span>
                      <br />
                      {item.label}
                    </div>
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <i
                        className={`icon iconfont ${item.icon} text-[26px] text-red-500`}
                      ></i>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </Card>
      </div>
      <div className="flex justify-around flex-wrap gap-x-4 px-4 pt-4">
        <CardChart
          title={'应用分布'}
          option={{
            series: APPLICATION,
          }}
        />
        <CardChart title={'漏洞分布'} option={{ series: LEAK }} />
        <CardChart title={'许可分布'} option={{ series: PERMISSION }} />
      </div>
      <div className="flex justify-around flex-wrap gap-x-4 px-4 pt-4">
        <CardChart
          title={'镜像概况'}
          option={{
            series: IMAGESVIEW,
            legend: {
              formatter: function (name) {
                let obj = { 在线: 1048, 离线: 735 };
                const total = 1048 + 735;
                return `${name}: ${obj[name]} (${((obj[name] / total) * 100).toFixed(2)}%)`;
              },
            },
          }}
        />
        <Card className="flex-1" title={'镜像安全概况'} bordered={false}>
          <div className="flex gap-x-5">
            <div className="flex-1">
              {SECURITYPROFILE.slice(0, 5).map((item) => {
                return (
                  <div>
                    <div>{item.label}</div>
                    <Progress percent={item.value} />
                  </div>
                );
              })}
            </div>
            <div className="flex-1">
              {SECURITYPROFILE.slice(5).map((item) => {
                return (
                  <div>
                    <div>{item.label}</div>
                    <Progress percent={item.value} showInfo={false} />
                  </div>
                );
              })}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;
