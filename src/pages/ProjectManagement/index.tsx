import RenderTag from '@/components/RenderTag';
import { ProjectDataSource } from '@/constants';
import { Table, TableProps } from 'antd';
import { Button } from 'antd/lib';
import { sample } from 'lodash';
import React from 'react';
import { useNavigate } from 'react-router-dom';
export interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}
const ProjectManagement: React.FC<unknown> = () => {
  const columns: TableProps<DataType>['columns'] = [
    {
      title: '项目名称',
      dataIndex: '项目名称',
      key: 'name',
    },
    {
      title: '风险等级',
      dataIndex: '风险等级',
      render: (risk, row) => {
        let txt = sample(['高', '中', '低']);
        return <RenderTag title={risk} />;
      },
    },
    {
      title: '项目类型',
      dataIndex: '项目类型',
    },
    {
      title: '项目标签',
      dataIndex: '项目标签',
    },
    {
      title: '创建人',
      dataIndex: '创建人',
    },

    {
      title: '创建时间',
      dataIndex: '创建时间',
    },
    {
      title: '操作',
      render: (_, record) => <Button type={'link'}>下载报告</Button>,
    },
  ];

  const navigate = useNavigate();
  return (
    <>
      <div className="px-8 mb-4 text-[20px] mt-[20px]"> 项目管理</div>
      <Table<DataType>
        columns={columns}
        dataSource={ProjectDataSource}
        className="px-8 mt-4"
        onRow={(record) => {
          return {
            onClick: (event) => {
              navigate(`/project-info?id=${record.id}`);
            },
          };
        }}
      />
    </>
  );
};

export default ProjectManagement;
