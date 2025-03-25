import { Button, Col, Row, Table, Tooltip } from "antd";
import React from "react";
import { Company } from "../models/Company";
import { companyRepository } from "../repositories/company-repository";
import moment from "moment";
import AddressLink from "../components/AddressLink";
import { FundViewOutlined } from "@ant-design/icons";
import CompanyDetailsModal from "./CompanyDetailModal";

export default function CompanyMasterPage() {
  const [companies, setCompanies] = React.useState<Company[]>([]);

  const [count, setCount] = React.useState<number>(0);

  const [skip, setSkip] = React.useState<number>(0);

  const [take, setTake] = React.useState<number>(10);

  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    setLoading(true);
    Promise.all([companyRepository.list(skip, take), companyRepository.count()])
      .then((values) => {
        setCompanies(values[0]);
        setCount(values[1]);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [skip, take]);

  const [currentCompany, setCurrentCompany] = React.useState<Company | null>(
    null
  );
  const [isDetailOpen, setIsDetailOpen] = React.useState<boolean>(false);
  const handleViewCompanyDetail = React.useCallback((company: Company) => {
    setCurrentCompany(company);
    setIsDetailOpen(true);
  }, []);

  const handleCloseDetail = React.useCallback(() => {
    setIsDetailOpen(false);
  }, []);

  return (
    <Row>
      <Col span={24}>
        <Table
          loading={loading}
          dataSource={companies}
          rowKey="id"
          pagination={{
            position: ["topRight", "bottomRight"],
            current: skip / take + 1,
            pageSize: take,
            total: count,
            showSizeChanger: true,
            showQuickJumper: true,
            onChange: (page) => setSkip((page - 1) * take),
            onShowSizeChange: (_, size) => {
              setTake(size);
              setSkip(0);
            },
          }}
          columns={[
            {
              title: "ID",
              dataIndex: "id",
              key: "id",
            },
            {
              title: "Mã số thuế",
              dataIndex: "taxCode",
              key: "taxCode",
            },

            {
              title: "Tên công ty",
              dataIndex: "name",
              key: "name",
              render(name: string, record: Company) {
                return (
                  <Tooltip title={record.description}>
                    <span>{name}</span>
                  </Tooltip>
                );
              },
            },
            {
              title: "Người đại diện",
              dataIndex: "representative",
              key: "representative",
            },
            {
              title: "Ngành nghề chính",
              dataIndex: "mainBusiness",
              key: "mainBusiness",
              render(mainBusiness: string, record: Company) {
                return (
                  <Tooltip title={record.description}>
                    <span>{mainBusiness}</span>
                  </Tooltip>
                );
              },
            },
            {
              title: "Tỉnh thành",
              dataIndex: "provinceName",
              key: "provinceName",
              render(_: string, record: Company) {
                return <AddressLink company={record} />;
              },
            },
            {
              title: "Ngày tạo",
              dataIndex: "createdAt",
              key: "createdAt",
              render: (value: Date) => moment(value).format("DD/MM/YYYY"),
            },
            {
              title: "Hành động",
              dataIndex: "id",
              key: "actions",
              render(id: number, record: Company) {
                return (
                  <div className="flex">
                    <Button
                      type="link"
                      icon={<FundViewOutlined />}
                      onClick={() => {
                        handleViewCompanyDetail(record);
                      }}
                    ></Button>
                  </div>
                );
              },
            },
          ]}
        />

        {currentCompany && (
          <CompanyDetailsModal
            open={isDetailOpen}
            company={currentCompany}
            onClose={handleCloseDetail}
          ></CompanyDetailsModal>
        )}
      </Col>
    </Row>
  );
}
