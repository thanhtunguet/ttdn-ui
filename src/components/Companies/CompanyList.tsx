// src/components/Companies/CompanyList.tsx
import React, { useEffect, useState } from 'react';
import { Table, Select, Space, message } from 'antd';
import { companyApi, provinceApi } from '../../services/api';
import { CompanyDto, ProvinceDto } from '../../types';
import { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';

const CompanyList: React.FC = () => {
  const [companies, setCompanies] = useState<CompanyDto[]>([]);
  const [provinces, setProvinces] = useState<ProvinceDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    provinceId: undefined as number | undefined,
  });
  
  const navigate = useNavigate();

  const columns: ColumnsType<CompanyDto> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <a onClick={() => navigate(`/companies/${record.id}`)}>{text}</a>
      ),
    },
    {
      title: 'Tax Code',
      dataIndex: 'taxCode',
      key: 'taxCode',
    },
    {
      title: 'Province',
      dataIndex: 'provinceName',
      key: 'provinceName',
    },
    {
      title: 'Status',
      dataIndex: 'currentStatus',
      key: 'currentStatus',
    },
  ];

  useEffect(() => {
    loadProvinces();
    loadCompanies();
  }, [pagination]);

  const loadProvinces = async () => {
    try {
      const data = await provinceApi.list();
      setProvinces(data);
    } catch (error) {
      message.error('Failed to load provinces');
    }
  };

  const loadCompanies = async () => {
    setLoading(true);
    try {
      const params = {
        skip: (pagination.current - 1) * pagination.pageSize,
        take: pagination.pageSize,
        provinceId: pagination.provinceId,
      };
      const [data, count] = await Promise.all([
        companyApi.list(params),
        companyApi.count(params),
      ]);
      setCompanies(data);
      setTotal(count);
    } catch (error) {
      message.error('Failed to load companies');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
      <Select
        style={{ width: 200 }}
        placeholder="Filter by Province"
        allowClear
        onChange={(value) => setPagination({ ...pagination, current: 1, provinceId: value })}
      >
        {provinces.map((province) => (
          <Select.Option key={province.id} value={province.id}>
            {province.name}
          </Select.Option>
        ))}
      </Select>

      <Table
        columns={columns}
        dataSource={companies}
        rowKey="id"
        loading={loading}
        pagination={{
          total,
          current: pagination.current,
          pageSize: pagination.pageSize,
          onChange: (page, pageSize) =>
            setPagination({ ...pagination, current: page, pageSize }),
        }}
      />
    </Space>
  );
};

export default CompanyList;