// src/components/Crawler/CrawlerControls.tsx
import React, { useState } from "react";
import { Card, Space, Button, Input, message, Form } from "antd";
import { crawlerApi } from "../../services/api";

const CrawlerControls: React.FC = () => {
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});
  const [form] = Form.useForm();

  const setLoadingState = (key: string, state: boolean) => {
    setLoading((prev) => ({ ...prev, [key]: state }));
  };

  const handleFullCrawl = async () => {
    setLoadingState("full", true);
    try {
      await crawlerApi.triggerFullCrawl();
      message.success("Full crawl job started successfully");
    } catch (error) {
      message.error("Failed to start full crawl job");
      console.log(error);
    } finally {
      setLoadingState("full", false);
    }
  };

  const handleProvinceCrawl = async (province: string) => {
    setLoadingState("province", true);
    try {
      await crawlerApi.triggerProvinceCrawl(province);
      message.success(`Province crawl job started for ${province}`);
    } catch (error) {
      message.error("Failed to start province crawl job");
      console.log(error);
    } finally {
      setLoadingState("province", false);
    }
  };

  const handlePageCrawl = async (values: { url: string }) => {
    console.log(values);
    setLoadingState("page", true);
    try {
      await crawlerApi.triggerPageCrawl();
      message.success("Page crawl job started successfully");
    } catch (error) {
      message.error("Failed to start page crawl job");
      console.log(error);
    } finally {
      setLoadingState("page", false);
    }
  };

  const handleDetailCrawl = async () => {
    setLoadingState("detail", true);
    try {
      await crawlerApi.triggerDetailCrawlFull();
      message.success("Detail crawl job started successfully");
    } catch (error) {
      message.error("Failed to start detail crawl job");
      console.log(error);
    } finally {
      setLoadingState("detail", false);
    }
  };

  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <Card title="Full Data Crawl">
        <Button
          type="primary"
          loading={loading.full}
          onClick={handleFullCrawl}
          block
        >
          Start Full Crawl
        </Button>
      </Card>

      <Card title="Province Crawl">
        <Form onFinish={handleProvinceCrawl}>
          <Space>
            <Form.Item name="provinceUrl">
              <Input placeholder="Enter province name" />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                loading={loading.province}
                htmlType="submit"
              >
                Start Province Crawl
              </Button>
            </Form.Item>
          </Space>
        </Form>
      </Card>

      <Card title="Single Page Crawl">
        <Form form={form} onFinish={handlePageCrawl}>
          <Space>
            <Form.Item
              name="url"
              rules={[
                { required: true, message: "Please input the page URL!" },
              ]}
            >
              <Input placeholder="Enter page URL" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" loading={loading.page} htmlType="submit">
                Start Page Crawl
              </Button>
            </Form.Item>
          </Space>
        </Form>
      </Card>

      <Card title="Detail Crawl">
        <Button
          type="primary"
          loading={loading.detail}
          onClick={handleDetailCrawl}
          block
        >
          Start Detail Crawl
        </Button>
      </Card>
    </Space>
  );
};

export default CrawlerControls;
