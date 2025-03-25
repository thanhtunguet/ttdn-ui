import React from "react";
import { Modal, Descriptions, Tag, Divider, Typography } from "antd";
import { Company } from "../models/Company";

const { Title, Paragraph } = Typography;

interface CompanyDetailsModalProps {
  open: boolean;
  onClose: () => void;
  company: Company | null;
}

const CompanyDetailsModal: React.FC<CompanyDetailsModalProps> = ({
  open,
  onClose,
  company,
}) => {
  if (!company) return null;

  return (
    <Modal
      title={<Title level={4}>{company.name}</Title>}
      open={open}
      onCancel={onClose}
      footer={null}
      width="xl"
    >
      <Descriptions bordered column={2} size="middle">
        <Descriptions.Item label="Tax Code">
          {company.taxCode}
        </Descriptions.Item>
        <Descriptions.Item label="Status">
          <Tag color={company.currentStatus === "Active" ? "green" : "red"}>
            {company.currentStatus}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Alternate Name">
          {company.alternateName}
        </Descriptions.Item>
        <Descriptions.Item label="Representative">
          {company.representative}
        </Descriptions.Item>
        <Descriptions.Item label="Main Business">
          {company.mainBusiness}
        </Descriptions.Item>
        <Descriptions.Item label="Main Business ID">
          {company.mainBusinessId}
        </Descriptions.Item>
        <Descriptions.Item label="Province">
          {company.provinceName}
        </Descriptions.Item>
        <Descriptions.Item label="District">
          {company.districtName}
        </Descriptions.Item>
        <Descriptions.Item label="Ward">{company.wardName}</Descriptions.Item>
        <Descriptions.Item label="Full Address">
          {company.formattedAddress}
        </Descriptions.Item>
        <Descriptions.Item label="Issued At">
          {new Date(company.issuedAt).toLocaleDateString()}
        </Descriptions.Item>
        <Descriptions.Item label="Created At">
          {new Date(company.createdAt).toLocaleDateString()}
        </Descriptions.Item>
        <Descriptions.Item label="Updated At">
          {new Date(company.updatedAt).toLocaleDateString()}
        </Descriptions.Item>
        {company.deletedAt && (
          <Descriptions.Item label="Deleted At">
            {new Date(company.deletedAt).toLocaleDateString()}
          </Descriptions.Item>
        )}
        <Descriptions.Item label="Slug">{company.slug}</Descriptions.Item>
        <Descriptions.Item label="Is Crawled Fully">
          <Tag color={company.isCrawledFull ? "blue" : "default"}>
            {company.isCrawledFull ? "Yes" : "No"}
          </Tag>
        </Descriptions.Item>
      </Descriptions>

      <Divider />

      <Title level={5}>Business Categories</Title>
      {company.businesses?.length ? (
        company.businesses.map((biz) => (
          <Tag key={biz.id} color="geekblue">
            {biz.name}
          </Tag>
        ))
      ) : (
        <Paragraph type="secondary">
          No additional business categories.
        </Paragraph>
      )}

      {company.description && (
        <>
          <Divider />
          <Title level={5}>Description</Title>
          <Paragraph>{company.description}</Paragraph>
        </>
      )}
    </Modal>
  );
};

export default CompanyDetailsModal;
