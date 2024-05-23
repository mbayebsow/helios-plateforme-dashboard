import { useEffect, useState } from "react";
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
  Tag,
  Tabs,
} from "@arco-design/web-react";
import { getEmployee } from "../../../components/functions/employees.data";
import Moment from "react-moment";
import { useParams } from "react-router-dom";

export default function ViewEmployeePage() {
  const { id } = useParams();
  const [initialValues, setInitialValues] = useState();
  const [recapUser, setRecapUser] = useState();

  const getDataEmployee = async () => {
    const { data } = await getEmployee(id);
    setInitialValues(data);
    const user = [
      {
        label: "Status",
        value: data.status,
      },
      {
        label: "ID",
        value: data.employee_id,
      },
      {
        label: "Nom",
        value: data.first_name + " " + data.last_name,
      },
      {
        label: "Genre",
        value: data.genre,
      },
      {
        label: "Anniversaire",
        value: <Moment date={data.birthday} format="DD/MM/YYYY" />,
      },
      {
        label: "Designation",
        value: data.designation,
      },
      {
        label: "Department",
        value: data.department,
      },
      {
        label: "Email",
        value: data.email,
      },
      {
        label: "Address",
        value: data.address,
      },
      {
        label: "Skills",
        value: data.skills.length,
      },
      {
        label: "Permissions",
        value: data.permissions.length,
      },
      {
        label: "Inscrit le",
        value: <Moment date={data.created_at} format="DD/MM/YYYY" />,
      },
    ];
    setRecapUser(user);
    return;
  };

  useEffect(() => {
    getDataEmployee();
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
                  getDataEmployee();
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
                data={recapUser}
                layout="inline-horizontal"
                colon=":"
                column={3}
              />
              <Grid.Row gutter={24}>
                <Grid.Col span={4}>
                  <Statistic title="Projets" value={19} />
                </Grid.Col>
                <Grid.Col span={4}>
                  <Statistic title="Taches" value={93} />
                </Grid.Col>
                <Grid.Col span={4}>
                  <Statistic title="Taches fini" value={70} />
                </Grid.Col>
                <Grid.Col span={4}>
                  <Statistic title="Taches ouvert" value={23} />
                </Grid.Col>
                <Grid.Col span={4}>
                  <Statistic title="Clients" value={50} />
                </Grid.Col>
                <Grid.Col span={4}>
                  <Statistic title="Contrats" value={50} />
                </Grid.Col>
              </Grid.Row>
              <Tabs defaultActiveTab="1" type="card-gutter">
                <Tabs.TabPane key="1" title="Projets">
                  <Typography.Paragraph>Content of Tab Panel 1</Typography.Paragraph>
                </Tabs.TabPane>
                <Tabs.TabPane key="2" title="Taches">
                  <Typography.Paragraph>Content of Tab Panel 2</Typography.Paragraph>
                </Tabs.TabPane>
                <Tabs.TabPane key="3" title="Documents">
                  <Typography.Paragraph>Content of Tab Panel 3</Typography.Paragraph>
                </Tabs.TabPane>
                <Tabs.TabPane key="4" title="Sessions">
                  <Typography.Paragraph>Content of Tab Panel 3</Typography.Paragraph>
                </Tabs.TabPane>
                <Tabs.TabPane key="5" title="Logs">
                  <Typography.Paragraph>Content of Tab Panel 3</Typography.Paragraph>
                </Tabs.TabPane>
                <Tabs.TabPane key="6" title="Permissions">
                  <Space wrap>
                    {initialValues.permissions.map((permission, i) => (
                      <Tag key={i}>{permission}</Tag>
                    ))}
                  </Space>
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
