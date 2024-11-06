import { COLORS } from '@/constants';
import { Tag } from 'antd';
import React from 'react';

interface RenderTagProps {
  title: string;
  className?: string;
}
const RenderTag: React.FC<RenderTagProps> = (props) => {
  const { title, className = '' } = props;
  return (
    <Tag className={`px-4 ${className}`} bordered={false} color={COLORS[title]}>
      {title}
    </Tag>
  );
};

export default RenderTag;
