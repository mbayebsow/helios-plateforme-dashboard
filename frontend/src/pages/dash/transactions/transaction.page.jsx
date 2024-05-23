import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import AddTransactionPage from "./addTransaction.page";
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
  Badge,
} from "@arco-design/web-react";
import {
  Calendar,
  DocumentAdd,
  Download,
  Export,
  OverflowMenuVertical,
  Search,
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
  </Space>
);
const columns = [
  {
    title: "projet",
    dataIndex: "project_id",
    fixed: "left",
    width: 200,
  },
  {
    title: "Facture",
    dataIndex: "invoice_id",
    width: 120,
  },
  {
    title: "Montant",
    dataIndex: "amount",
    width: 150,
  },
  {
    title: "Payer le",
    dataIndex: "paid_on",
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
    invoice_id: `INV9412${index}`,
    project_id: "Nom du projet s'il existe.",
    amount: "300.000 FCFA",
    paid_on: "2019/04/10",
    status: <Badge status="success" text="Complete" />,
  }));
export default function TransactionPage({ title }) {
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
              Ajouter une Transaction
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
              <AddTransactionPage />
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
          width: 60,
        })}
      />
    </div>
  );
}
