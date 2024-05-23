import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Avatar,
  Grid,
  Spin,
  Result,
  Space,
  Typography,
  Descriptions,
  Statistic,
  Divider,
  Tabs,
} from "@arco-design/web-react";
import { getUser } from "../../../components/functions/users.data";
import Moment from "react-moment";

export default function ViewClientPage() {
  const { id } = useParams();
  const [initialValues, setInitialValues] = useState();
  const [dataState, setDataState] = useState();

  const getData = async () => {
    const { data } = await getUser(id);
    setInitialValues(data);
    const user = [
      {
        label: "Nom",
        value: data.full_name,
      },
      {
        label: "Telephone",
        value: data.phone + data.indicatif,
      },
      {
        label: "Email",
        value: data.email,
      },
      {
        label: "Societe",
        value: data.company_name,
      },
      {
        label: "Website",
        value: data.website,
      },
      {
        label: "Adresse",
        value: data.address,
      },
      {
        label: "Genre",
        value: data.genre,
      },
      {
        label: "Verifié",
        value: data.verified,
      },
      {
        label: "Status",
        value: data.status,
      },
      {
        label: "Inscrit le",
        value: <Moment date={data.created_at} format="DD/MM/YYYY" />,
      },
    ];
    setDataState(user);
    return;
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {initialValues ? (
        initialValues === "error" ? (
          <Result
            status="error"
            title="Erreur"
            subTitle="Quelque chose s'est mal passé. Veuillez réessayer."
            extra={[
              <Button
                key="again"
                onClick={() => {
                  setInitialValues("");
                  getData();
                }}
              >
                Actualiser
              </Button>,
            ]}
          ></Result>
        ) : (
          <div style={{ margin: 20, display: "flex", flexDirection: "column" }}>
            <Avatar size={100} style={{ marginBottom: 50 }}>
              <img src={initialValues.profile} alt="avatar" />
            </Avatar>
            <Space direction="vertical" split={<Divider />}>
              <Descriptions
                title="Detail personnel"
                data={dataState}
                layout="inline-horizontal"
                colon=":"
                column={3}
              />
              <Grid.Row gutter={24}>
                <Grid.Col span={5}>
                  <Statistic title="Total Projects" value={19} />
                </Grid.Col>
                <Grid.Col span={5}>
                  <Statistic title="Services" value={23} />
                </Grid.Col>
                <Grid.Col span={4}>
                  <Statistic title="Total gains" value={93} />
                </Grid.Col>
                <Grid.Col span={5}>
                  <Statistic title="Factures" value={50} />
                </Grid.Col>
                <Grid.Col span={5}>
                  <Statistic title="Non payes" value={70} />
                </Grid.Col>
              </Grid.Row>
              <Tabs defaultActiveTab="1" type="card-gutter">
                <Tabs.TabPane key="1" title="Projets">
                  <Typography.Paragraph>Content of Tab Panel 1</Typography.Paragraph>
                </Tabs.TabPane>
                <Tabs.TabPane key="7" title="Services">
                  <Typography.Paragraph>Content of Tab Panel 1</Typography.Paragraph>
                </Tabs.TabPane>
                <Tabs.TabPane key="2" title="Factures">
                  <Typography.Paragraph>Content of Tab Panel 2</Typography.Paragraph>
                </Tabs.TabPane>
                <Tabs.TabPane key="3" title="Devis">
                  <Typography.Paragraph>Content of Tab Panel 3</Typography.Paragraph>
                </Tabs.TabPane>
                <Tabs.TabPane key="4" title="Transaction">
                  <Typography.Paragraph>Content of Tab Panel 3</Typography.Paragraph>
                </Tabs.TabPane>
                <Tabs.TabPane key="5" title="Sessions">
                  <Typography.Paragraph>Content of Tab Panel 3</Typography.Paragraph>
                </Tabs.TabPane>
                <Tabs.TabPane key="6" title="Logs">
                  <Typography.Paragraph>Content of Tab Panel 3</Typography.Paragraph>
                </Tabs.TabPane>
              </Tabs>
            </Space>
          </div>
        )
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Spin size={30} tip="Recuperation des données" loading />
        </div>
      )}
    </>
  );
}
