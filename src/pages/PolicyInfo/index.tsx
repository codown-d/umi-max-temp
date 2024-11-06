import RenderTag from '@/components/RenderTag';
import { PolicyData, fxdj, gzmj, gzms, qxmc } from '@/constants';
import { usePageHeader } from '@/hooks/page';
import { ProCard, ProDescriptions } from '@ant-design/pro-components';
import { Segmented, Table, TableProps } from 'antd';
import { keys, sample } from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { DataType } from '../ProjectManagement';

const PolicyInfo: React.FC = () => {
  let location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  let id = queryParams.get('id');
  const [dataInfo, setDataInfo] = useState(
    PolicyData.filter((item) => item.id == id)[0],
  );
  const [value, setValue] = useState<string>('代码扫描');
  let { setPageHeader } = usePageHeader(
    dataInfo['策略名称'],
    <span className="flex items-center">
      {dataInfo['策略名称']}
      <RenderTag title={'高'} className="ml-2" />
    </span>,
  );
  let PolicyDescription = useMemo(() => {
    let obj: any = { ...dataInfo };
    delete obj.id;
    return keys(obj).map((item) => {
      return {
        label: item,
        desc: obj[item],
      };
    });
  }, [dataInfo]);
  useEffect(() => {
    setPageHeader();
  }, [setPageHeader]);
  const columns: TableProps<DataType>['columns'] = useMemo(() => {
    let obj: any = {
      代码扫描: [
        {
          title: '缺陷名称',
          dataIndex: 'name',
          key: 'name',
          render: (text) => <>{sample(qxmc)}</>,
        },
        {
          title: '代码语言',
          dataIndex: 'age',
          render: (_, row) => {
            let txt = sample(['Java/Jsp']);
            return <RenderTag title={txt} />;
          },
        },
        {
          title: '风险等级',
          dataIndex: 'address',
          render: (_, row) => <>{sample(fxdj)}</>,
        },
      ],
      开源软件扫描: [
        {
          title: '规则名称',
          dataIndex: 'name',
          key: 'name',
          render: (text) => sample(gzmj),
        },
        {
          title: '规则类型',
          dataIndex: 'age',
          render: (_, row) => {
            let txt = sample(['组件']);
            return txt;
          },
        },
        // {
        //   title: '规则名称',
        //   dataIndex: 'address',
        //   render: (_, row) => (
        //     <>
        //       按照组件严重等级[
        //       {sample(['超危', '高危', '中危', '低危', '建议'])}]
        //     </>
        //   ),
        // },
        {
          title: '规则描述',
          dataIndex: 'address',
          render: (_, row) => sample(gzms),
        },
      ],
      镜像扫描: [
        {
          title: '镜像名称',
          dataIndex: 'name',
          key: 'name',
          render: (text) => 'library/kube-rbac-proxy:v0.8.0',
        },
        {
          title: '风险级别',
          dataIndex: 'age',
          render: (_, row) => {
            let txt = sample(['风险', '安全']);
            return <RenderTag title={txt} />;
          },
        },
        {
          title: '仓库',
          dataIndex: 'address',
          render: (_, row) => (
            <>
              {sample([
                'test(https://harbor-test.example.com)',
                'test(https://harbor-test.example.com)',
              ])}
            </>
          ),
        },
        {
          title: '运行状态',
          dataIndex: 'address',
          render: (_, row) => {
            let txt = sample(['离线', '在线']);
            return <RenderTag title={txt} />;
          },
        },
      ],
    };
    return obj[value];
  }, [value]);
  const data: any[] = new Array(100).fill('').map((item) => ({}));
  return (
    <>
      <ProCard bordered>
        <ProDescriptions column={2} title="基本信息">
          {PolicyDescription.map((item) => {
            return (
              <ProDescriptions.Item label={item.label} span={item.span}>
                <div className="max-w-[80%]">{item.desc}</div>
              </ProDescriptions.Item>
            );
          })}
        </ProDescriptions>
      </ProCard>
      <Segmented
        className="mt-4"
        options={['代码扫描', '开源软件扫描', '镜像扫描']}
        value={value}
        onChange={setValue}
        block
      />
      {['代码扫描', '开源软件扫描'].includes(value) ? (
        <ProCard bordered className="mt-4" title="安全规则">
          <Table columns={columns} dataSource={data} />
        </ProCard>
      ) : (
        <iframe
          src="https://console-test-cn.tensorsecurity.cn/#/shy/image-security/security-policy/info?id=23&imageFromType=deploy"
          className="w-full h-[calc(100vh-48px)]"
        ></iframe>
      )}
    </>
  );
};

export default PolicyInfo;
