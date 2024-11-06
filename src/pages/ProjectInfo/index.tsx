import RenderTag from '@/components/RenderTag';
import {
  ProjectCode,
  ProjectDataSource,
  apName,
  apType,
  apZuJian,
  file,
  images,
  vuln,
  vulnBH,
  vulnDesc,
  vulnType,
  xkqc,
} from '@/constants';
import { usePageHeader } from '@/hooks/page';
import { ProCard, ProDescriptions } from '@ant-design/pro-components';
import { Button, Drawer, Segmented, Table, TableProps } from 'antd';
import { keys, sample } from 'lodash';
import Mock from 'mockjs';
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { DataType } from '../ProjectManagement';

const PolicyInfo: React.FC = () => {
  let location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  let id = queryParams.get('id');
  const [dataInfo, setDataInfo] = useState(
    ProjectDataSource.filter((item) => item.id == id)[0],
  );
  const [value, setValue] = useState<string>('代码安全');
  const [open, setOpen] = useState(false);
  const [actItem, setActItem] = useState({ type: '组件数量', name: undefined });
  let { setPageHeader } = usePageHeader(
    dataInfo['项目名称'],
    <span className="flex items-center">
      {dataInfo['项目名称']}
      <RenderTag title={dataInfo['风险等级']} className="ml-2" />
    </span>,
  );
  let ProjectDescription = useMemo(() => {
    let obj: any = { ...dataInfo };
    delete obj.风险等级;
    delete obj.id;
    delete obj.项目标签;
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
    if (value.indexOf('代码安全') != -1) {
      return [
        {
          title: '漏洞信息',
          dataIndex: 'name',
          key: 'name',
          render: (text) => sample(vuln),
        },
        {
          title: '严重级别',
          dataIndex: 'age',
          render: (_, row) => {
            let txt = sample(['高', '中', '低']);
            return <RenderTag title={txt} />;
          },
        },
        {
          title: '漏洞类型',
          dataIndex: 'address',
          render: (_, row) => <>{sample(['网络访问', '本地访问'])}</>,
        },
        {
          title: '漏洞库',
          dataIndex: 'address',
          render: (_, row) => <>{sample(['nvd'])}</>,
        },

        {
          title: '文件',
          dataIndex: 'tags',
          render: (_, row) => <>{sample([...file])}</>,
        },
        {
          title: '漏洞标签',
          dataIndex: 'tags',
          render: (_, row) => <>{sample(['待确认', '误报', '可疑'])}</>,
        },
      ];
    } else if (value.indexOf('开源软件') != -1) {
      return [
        {
          title: '应用名称',
          dataIndex: 'name',
          key: 'name',
          render: (text) => <>{sample(apName)}</>,
        },
        {
          title: '严重级别',
          dataIndex: 'age',
          render: (_, row) => {
            let txt = sample(['严重', '高', '中', '低']);
            return <RenderTag title={txt} />;
          },
        },
        {
          title: '应用类型',
          dataIndex: 'address',
          render: (_, row) => <>{sample([...apType])}</>,
        },
        {
          title: '组件数量',
          dataIndex: 'address',
          render: (_, row) => (
            <Button
              type={'link'}
              onClick={() => {
                console.log(row);
                setActItem({ type: '组件数量', name: '组件数量统计' });
                setOpen(true);
              }}
            >
              {Mock.Random.integer(50, 100)}
            </Button>
          ),
        },

        {
          title: '漏洞数量',
          dataIndex: 'tags',
          render: (_, row) => (
            <Button
              type={'link'}
              onClick={() => {
                setActItem({ type: '漏洞数量', name: '漏洞数量统计' });
                setOpen(true);
              }}
            >
              {Mock.Random.integer(50, 100)}
            </Button>
          ),
        },
        {
          title: '许可数量',
          dataIndex: 'tags',
          render: (_, row) => (
            <Button
              type={'link'}
              onClick={() => {
                setActItem({ type: '许可数量', name: '许可数量统计' });
                setOpen(true);
              }}
            >
              {Mock.Random.integer(50, 100)}
            </Button>
          ),
        },
        {
          title: '风险描述',
          dataIndex: 'tags',
          render: (_, row) => <>{sample(['存在高危风险的组件、漏洞、许可'])}</>,
        },
      ];
    } else if (value.indexOf('镜像安全') != -1) {
      return [
        {
          title: '镜像名称',
          dataIndex: 'name',
          key: 'name',
          render: (text) => <>{sample([...images])}</>,
        },
        {
          title: '风险级别',
          dataIndex: 'age',
          render: (_, row) => {
            let txt = sample(['风险']);
            return <RenderTag title={txt} />;
          },
        },
        {
          title: '仓库',
          dataIndex: 'address',
          render: (_, row) => (
            <>
              {sample([
                // 'test(https://harbor-test.example.com)',
                'harborv2(https://harbor.tensorsecurity.com)',
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
      ];
    }
  }, [value]);
  const columnsDrawer: TableProps<DataType>['columns'] = useMemo(() => {
    console.log(actItem);
    let obj: any = {
      组件数量: [
        {
          title: '组件名称',
          dataIndex: 'name',
          key: 'name',
          render: (text) => sample([...apZuJian]),
        },
        {
          title: '严重级别',
          dataIndex: 'age',
          render: (_, row) => {
            let txt = sample(['严重', '高', '中', '低']);
            return <RenderTag title={txt} />;
          },
        },
        {
          title: '语言',
          dataIndex: 'address',
          render: (_, row) => <>{sample(['JAVA'])}</>,
        },
        {
          title: '版本',
          dataIndex: 'address',
          render: (_, row) => <>{sample(['2.3.5'])}</>,
        },

        {
          title: '推荐版本',
          dataIndex: 'tags',
          render: (_, row) => <>{sample(['2.3.10'])}</>,
        },
        {
          title: '许可名称',
          dataIndex: 'tags',
          render: (_, row) => <>{sample(['MIT'])}</>,
        },
      ],
      漏洞数量: [
        {
          title: '漏洞信息',
          dataIndex: 'name',
          key: 'name',
          render: (_, row) => <>{sample(vuln)}</>,
        },
        {
          title: '严重级别',
          dataIndex: 'age',
          render: (_, row) => {
            let txt = sample(['严重', '高', '中', '低']);
            return <RenderTag title={txt} />;
          },
        },
        {
          title: '漏洞类型',
          dataIndex: 'address',
          render: (_, row) => <>{sample(vulnType)}</>,
        },
        {
          title: 'CWE编号',
          dataIndex: 'address',
          render: (_, row) => <>{sample(vulnBH)}</>,
        },

        {
          title: '漏洞描述',
          dataIndex: 'tags',
          render: (_, row) => <>{sample(vulnDesc)}</>,
        },
      ],
      许可数量: [
        // {
        //   title: '许可简称',
        //   dataIndex: 'name',
        //   key: 'name',
        //   render: (_, row) => <>{sample(['GPL'])}</>,
        // },
        {
          title: '许可全称',
          dataIndex: 'age',
          render: (_, row) => <>{sample(xkqc)}</>,
        },
        {
          title: '严重级别',
          dataIndex: 'address',
          render: (_, row) => {
            let txt = sample(['严重', '高', '中', '低']);
            return <RenderTag title={txt} />;
          },
        },
      ],
    };
    return obj[actItem.type];
  }, [actItem]);

  const navigate = useNavigate();
  const data2: any[] = new Array(100).fill('').map((item) => ({}));
  const handleRowClick = () => {
    if (value.indexOf('镜像安全') != -1) {
      navigate('/mage-security-detail');
    }
  };
  let getDom = useMemo(() => {
    const data: any[] = new Array(value === '开源软件' ? 2 : 100)
      .fill('')
      .map((item) => ({}));
    return (
      <Table
        columns={columns}
        dataSource={data}
        onRow={(record) => ({
          onClick: handleRowClick,
        })}
      />
    );
  }, [columns]);
  return (
    <>
      <ProCard bordered>
        <ProDescriptions column={2} title="基本信息">
          {ProjectDescription.map((item) => {
            return (
              <ProDescriptions.Item label={item.label}>
                <div className="max-w-[80%]">{item.desc}</div>
              </ProDescriptions.Item>
            );
          })}
        </ProDescriptions>
      </ProCard>
      <Segmented
        className="mt-4"
        options={[
          `代码安全（${dataInfo['项目标签']}）`,
          `开源软件（${dataInfo['项目标签']}）`,
          `镜像安全（${dataInfo['项目标签']}）`,
        ]}
        value={value}
        onChange={setValue}
        block
      />
      <ProCard bordered className="mt-4">
        <ProDescriptions column={2} title="代码统计">
          {ProjectCode.map((item) => {
            return (
              <ProDescriptions.Item label={item.label}>
                <div className="max-w-[80%]">{item.desc}</div>
              </ProDescriptions.Item>
            );
          })}
        </ProDescriptions>
      </ProCard>
      <ProCard bordered className="mt-4" title={value.split('（')[0]}>
        {getDom}
      </ProCard>
      <Drawer
        title={actItem?.name}
        width={860}
        onClose={() => setOpen(false)}
        open={open}
      >
        <Table
          columns={columnsDrawer}
          dataSource={data2}
          tableLayout={'fixed'}
        />
      </Drawer>
    </>
  );
};

export default PolicyInfo;
