import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import AddInvoicePage from "./addInvoice.page";
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
  Download,
  Export,
  OverflowMenuVertical,
  Search,
  Send,
  TaskAdd,
  View,
} from "@carbon/icons-react";

const content = (
  <Input.Search
    allowClear
    placeholder="Enter keyword to search"
    style={{ width: 300 }}
  />
);
const colOption = (
  <Space direction="vertical">
    <Button type="text">
      <View /> Voir
    </Button>
    <Button type="text">
      <Download /> Telecharger
    </Button>
    <Button type="text">
      <Send /> Envoyer
    </Button>
    <Button type="text">
      <TaskAdd /> Ajouter une note
    </Button>
  </Space>
);
const columns = [
  {
    title: "Facture N°",
    dataIndex: "invoice_number",
    fixed: "left",
    width: 80,
  },
  {
    title: "Reference",
    dataIndex: "project_id",
    width: 150,
  },
  {
    title: "Client",
    dataIndex: "client_id",
    width: 150,
  },
  {
    title: "Date de la facture",
    dataIndex: "invoice_date",
    width: 100,
  },
  {
    title: "Paiement",
    dataIndex: "paiement",
    width: 150,
  },
  {
    title: "Etat",
    dataIndex: "status",
    width: 80,
  },
];
const data = Array(200)
  .fill("")
  .map((_, index) => ({
    key: `${index}`,
    invoice_number: `INV 9412${index}`,
    project_id: "Service ou projet",
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
    invoice_date: "2019/04/10",
    paiement: (
      <div>
        <Space>
          <Typography.Text>Total: </Typography.Text>
          <Typography.Text>200.000 FCFA</Typography.Text>
        </Space>
        <Space>
          <Typography.Text type="success">Payer: </Typography.Text>
          <Typography.Text>50.000 FCFA</Typography.Text>
        </Space>
        <Space>
          <Typography.Text type="error">Due: </Typography.Text>
          <Typography.Text>150.000 FCFA</Typography.Text>
        </Space>
      </div>
    ),
    status: <Badge status="success" text="Payer" />,
  }));
export default function InvoicePage({ title }) {
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
              Ajouter une facture
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
              <AddInvoicePage />
            </Drawer>
            <Button type="outline">
              <Export /> Exporter
            </Button>
          </Space>
        </Grid.Col>
        <Grid.Col
          span={12}
          style={{ display: "flex", justifyContent: "end", gap: 7 }}
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
          <Select
            placeholder="Filtrer par client"
            addBefore="Client:"
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
          x: 1100,
        }}
        columns={columns.concat({
          dataIndex: "options",
          render: () => (
            <Popover
              position="left"
              trigger="click"
              content={colOption}
            >
              <Button type="text">
                <OverflowMenuVertical />
              </Button>
            </Popover>
          ),
          fixed: "right",
          width: 60,
        })}
      />
    </div>
  );
}
