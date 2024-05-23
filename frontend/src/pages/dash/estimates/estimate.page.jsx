import { useState, useEffect } from "react";
import AddEstimatePage from "./addEstimate.page";
import {
  Grid,
  Space,
  Table,
  Select,
  Message,
  Drawer,
  Button,
  Popover,
  Input,
  Typography,
  Avatar,
  Badge,
} from "@arco-design/web-react";
import {
  Calendar,
  DocumentAdd,
  Export,
  OverflowMenuVertical,
  Search,
} from "@carbon/icons-react";
import { useOutletContext } from "react-router-dom";

const content = (
  <Input.Search
    allowClear
    placeholder="Enter keyword to search"
    style={{ width: 300 }}
  />
);
const columns = [
  {
    title: "Devis N°",
    dataIndex: "estimate_number",
    fixed: "left",
    width: 80,
  },
  {
    title: "Client",
    dataIndex: "client_id",
    width: 150,
  },
  {
    title: "Valable jusqu'au",
    dataIndex: "valid_till",
    width: 100,
  },
  {
    title: "Total",
    dataIndex: "total",
    width: 100,
  },
  {
    title: "Etat",
    dataIndex: "status",
    width: 100,
  },
];
const data = Array(200)
  .fill("")
  .map((_, index) => ({
    key: `${index}`,
    estimate_number: `EST 9412${index}`,
    client_id: (
      <Space direction="horizontal">
        <Avatar>AS</Avatar>
        <Space direction="vertical" size="mini">
          <Typography.Text bold style={{ fontSize: 15 }}>
            Client nom
          </Typography.Text>
          <Typography.Text style={{ opacity: "50%" }}>
            client entrprise
          </Typography.Text>
        </Space>
      </Space>
    ),
    valid_till: "2019/04/10",
    total: "100.000 FCFA",
    status: <Badge status="success" text="Accepter" />,
  }));
export default function EstimatePage({ title }) {
  const [pageTitle, setPageTitle] = useOutletContext();
  useEffect(() => {
    setPageTitle(title);
  });
  const [projectDrawer, setProjectDrawer] = useState(false);
  return (
    <div>
      <Grid.Row style={{ marginBottom: 20 }}>
        <Grid.Col span={12}>
          <Space direction="horizontal" size="mini">
            <Button
              onClick={() => {
                setProjectDrawer(true);
              }}
              type="primary"
            >
              <DocumentAdd />
              Ajouter un devis
            </Button>
            <Drawer
              width={800}
              title={"Ajouter une nouvelle tache"}
              visible={projectDrawer}
              footer={null}
              onCancel={() => {
                setProjectDrawer(false);
              }}
            >
              <AddEstimatePage />
            </Drawer>
            <Button type="outline">
              <Export /> Exporter
            </Button>
          </Space>
        </Grid.Col>
        <Grid.Col
          span={12}
          style={{ display: "flex", justifyContent: "end", gap: 5 }}
        >
          <Popover position="top" trigger="click" content={content}>
            <Button type="primary">
              <Search />
            </Button>
          </Popover>
          <Select
            placeholder="Filtrer par etat"
            addBefore="Etat:"
            defaultValue="all"
            style={{ width: 170 }}
            onChange={(value) =>
              Message.info({
                content: `You select ${value}.`,
                showIcon: true,
              })
            }
            options={[
              {
                label: "Tout",
                value: "all",
              },
              {
                label: "Accepter",
                value: "accepted",
              },
              {
                label: "Refuser",
                value: "declined",
              },
              {
                label: "En attente",
                value: "waiting",
              },
              {
                label: "Brouillons",
                value: "draft",
              },
            ]}
          />
          <Button>
            <Calendar />
          </Button>
        </Grid.Col>
      </Grid.Row>

      <Table
        data={data}
        expandedRowRender={(record) => `Les sous taches ici`}
        scroll={{
          x: 1000,
        }}
        columns={columns.concat({
          dataIndex: "options",
          render: () => (
            <Popover
              position="left"
              trigger="click"
              content={content}
            >
              <Button type="text">
                <OverflowMenuVertical />
              </Button>
            </Popover>
          ),
          fixed: "right",
          width: 50,
        })}
      />
    </div>
  );
}
