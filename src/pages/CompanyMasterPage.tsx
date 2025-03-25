import { Col, Row, Table } from "antd";
import React from "react";
import { Company } from "../models/Company";
import { companyRepository } from "../repositories/company-repository";
import moment from "moment";

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
            },
            {
              title: "Người đại diện",
              dataIndex: "representative",
              key: "representative",
            },
            {
              title: "Tỉnh thành",
              dataIndex: "provinceName",
              key: "provinceName",
            },
            {
              title: "Ngày tạo",
              dataIndex: "createdAt",
              key: "createdAt",
              render: (value: Date) => moment(value).format("DD/MM/YYYY"),
            },
          ]}
        />
      </Col>
    </Row>
  );
}
