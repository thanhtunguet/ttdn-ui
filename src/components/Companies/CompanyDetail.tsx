// src/components/Companies/CompanyDetail.tsx
import React, { useEffect, useState } from "react";
import { Card, Descriptions, Spin, message } from "antd";
import { useParams } from "react-router-dom";
import { companyApi } from "../../services/api";
import { CompanyDto } from "../../types";

const CompanyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [company, setCompany] = useState<CompanyDto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadCompany(id);
    }
  }, [id]);

  const loadCompany = async (idOrTaxCode: string) => {
    try {
      const data = await companyApi.getDetails(idOrTaxCode);
      setCompany(data);
    } catch (error) {
      message.error("Failed to load company details");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Spin size="large" />;
  }

  if (!company) {
    return <div>Company not found</div>;
  }

  return (
    <Card title={company.name}>
      <Descriptions bordered column={2}>
        <Descriptions.Item label="Tax Code">
          {company.taxCode}
        </Descriptions.Item>
        <Descriptions.Item label="Status">
          {company.currentStatus}
        </Descriptions.Item>
        <Descriptions.Item label="Representative">
          {company.representative}
        </Descriptions.Item>
        <Descriptions.Item label="Main Business">
          {company.mainBusiness}
        </Descriptions.Item>
        <Descriptions.Item label="Address" span={2}>
          {company.formattedAddress}
        </Descriptions.Item>
        <Descriptions.Item label="Province">
          {company.provinceName}
        </Descriptions.Item>
        <Descriptions.Item label="District">
          {company.districtName}
        </Descriptions.Item>
        <Descriptions.Item label="Ward">{company.wardName}</Descriptions.Item>
        <Descriptions.Item label="Issued Date">
          {new Date(company.issuedAt).toLocaleDateString()}
        </Descriptions.Item>
        <Descriptions.Item label="Description" span={2}>
          {company.description}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default CompanyDetail;
