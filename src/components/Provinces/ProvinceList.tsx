// src/components/Provinces/ProvinceList.tsx
import React, { useEffect, useState } from 'react';
import { Table, message } from 'antd';
import { provinceApi } from '../../services/api';
import { ProvinceDto } from '../../types';
import { ColumnsType } from 'antd/es/table';

const ProvinceList: React.FC = () => {
  const [provinces, setProvinces] = useState<ProvinceDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const columns: ColumnsType<ProvinceDto> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'English Name',
      dataIndex: 'englishName',
      key: 'englishName',
    },
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
  ];

  useEffect(() => {
    loadProvinces();
  }, [pagination]);

  const loadProvinces = async () => {
    setLoading(true);
    try {
      const [data, count] = await Promise.all([
        provinceApi.list({
          skip: (pagination.current - 1) * pagination.pageSize,
          take: pagination.pageSize,
        }),
        provinceApi.count(),
      ]);
      setProvinces(data);
      setTotal(count);
    } catch (error) {
      message.error('Failed to load provinces');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Table
      columns={columns}
      dataSource={provinces}
      rowKey="id"
      loading={loading}
      pagination={{
        total,
        current: pagination.current,
        pageSize: pagination.pageSize,
        onChange: (page, pageSize) =>
          setPagination({ current: page, pageSize: pageSize || 10 }),
      }}
    />
  );
};

export default ProvinceList;