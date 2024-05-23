import { useState, useEffect } from "react";
import {
  useOutletContext,
  useParams,
  useNavigate,
} from "react-router-dom";
import AddContractPage from "./addContract.page";
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
} from "@arco-design/web-react";
import {
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
    title: "Sujet",
    dataIndex: "subject",
    fixed: "left",
    width: 150,
  },
  {
    title: "Client",
    dataIndex: "client_id",
    width: 150,
  },
  {
    title: "Date en vigueur",
    dataIndex: "start_date",
    width: 100,
  },
  {
    title: "Date de fin",
    dataIndex: "end_date",
    width: 100,
  },
  {
    title: "Montant",
    dataIndex: "amount",
    width: 100,
  },
];
const data = Array(200)
  .fill("")
  .map((_, index) => ({
    key: `${index}`,
    subject: "Contrat de maintenance",
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
    start_date: "2019/04/10",
    end_date: "2019/04/10",
    amount: "2.000.000",
  }));

export default function ContractPage({ title }) {
  const navigate = useNavigate();
  const { action } = useParams();
  const [pageTitle, setPageTitle] = useOutletContext();
  useEffect(() => {
    setPageTitle(title);
  });
  return (
    <div>
      <Grid.Row style={{ marginBottom: 20 }}>
        <Grid.Col span={12}>
          <Space direction="horizontal" size="mini">
            <Button
              onClick={() => {
                navigate("/dash/contrats/create", { replace: true });
              }}
              type="primary"
            >
              <DocumentAdd />
              Ajouter un contrat
            </Button>
            <Drawer
              width={800}
              title={"Ajouter une nouvelle tache"}
              visible={action === "create"}
              footer={null}
              onCancel={() => {
                navigate("/dash/contrats", { replace: true });
              }}
            >
              <AddContractPage />
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
            addBefore="Date:"
            defaultValue="all"
            triggerProps={{
              autoAlignPopupWidth: false,
              autoAlignPopupMinWidth: true,
              position: "bl",
            }}
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
            triggerProps={{
              autoAlignPopupWidth: false,
              autoAlignPopupMinWidth: true,
              position: "bl",
            }}
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
            placeholder="Filtrer par etat"
            addBefore="Type:"
            defaultValue="all"
            triggerProps={{
              autoAlignPopupWidth: false,
              autoAlignPopupMinWidth: true,
              position: "bl",
            }}
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
