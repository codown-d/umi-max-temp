import { PolicyData } from '@/constants';
import { Table, TableProps } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
export interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}
const PolicyManagement: React.FC<unknown> = () => {
  const columns: TableProps<DataType>['columns'] = [
    {
      title: '策略名称',
      dataIndex: '策略名称',
    },
    {
      title: '仓库生效范围',
      dataIndex: '仓库生效范围',
    },
    {
      title: '标签生效范围',
      dataIndex: '标签生效范围',
    },
    {
      title: '创建人',
      dataIndex: '创建人',
    },
    {
      title: '创建时间',
      dataIndex: '创建时间',
    },
  ];

  const navigate = useNavigate();
  return (
    <>
      <div className="px-8 mb-4 text-[20px] mt-[20px]"> 策略管理</div>
      <Table<DataType>
        columns={columns}
        dataSource={PolicyData}
        className="px-8 mt-4"
        onRow={(record) => {
          return {
            onClick: (event) => {
              navigate(`/policy-info?id=${record.id}`);
            },
          };
        }}
      />
    </>
  );
};

export default PolicyManagement;
