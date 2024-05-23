import { useOutletContext, useParams } from "react-router-dom";
import { Result, Spin, Message, Button, Form, Grid, Select, DatePicker, Input, InputNumber } from "@arco-design/web-react";
import { useEffect, useRef, useState } from "react";

import { getProject, updateProject } from "../../../components/functions/projects.data";
import { getUsers } from "../../../components/functions/users.data";
import { getEmployees } from "../../../components/functions/employees.data";

import { projectStatue } from "../../../lib/config";

export default function EditProjectPage() {
  const { id } = useParams();
  const formRef = useRef();
  const [initialValues, setInitialValues] = useState();
  const [clients, setClients] = useState();
  const [employees, setEmployees] = useState();
  const [setDrawerTitle] = useOutletContext();

  const getRelational = async () => {
    const clients = await getUsers([]);
    const employees = await getEmployees([]);

    if (clients || clients !== "error") {
      const newClients = clients.data.map((obj) => {
        const label = obj.full_name;
        const value = obj._id;
        return { label, value };
      });
      setClients(newClients);
    }
    if (employees || employees !== "error") {
      const newEmployees = employees.data.map((obj) => {
        const label = obj.first_name + " " + obj.last_name;
        const value = obj._id;
        return { label, value };
      });
      setEmployees(newEmployees);
    }
  };

  const getData = async () => {
    const { data } = await getProject(id);
    setInitialValues(data);
    setDrawerTitle(data.project_name);
    return;
  };

  const updateData = async (values) => {
    Message.loading({
      id: "updateData",
      content: "Sauvegarde des modifications",
    });

    const data = await updateProject(id, values);

    if (data && data !== "error") {
      Message.success({
        id: "updateData",
        content: data?.message,
      });
      setInitialValues("");
      getData();
      return;
    } else {
      Message.error({
        id: "updateData",
        content: data?.message,
      });
      return;
    }
  };

  useEffect(() => {
    getRelational();
    getData();
  }, []);

  return initialValues ? (
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
      <Form
        layout="vertical"
        ref={formRef}
        autoComplete="off"
        size="large"
        scrollToFirstError
        initialValues={initialValues}
        onSubmit={(values) => {
          updateData(values);
        }}
      >
        <Grid.Row gutter={24}>
          <Grid.Col span={8}>
            <Form.Item label="Nom de projet" field="project_name" rules={[{ required: true }]}>
              <Input placeholder="please enter..." />
            </Form.Item>
          </Grid.Col>
          <Grid.Col span={8}>
            <Form.Item label="Client" field="client_id" rules={[{ required: true }]}>
              <Select placeholder="Selecter un client" allowClear options={clients} />
            </Form.Item>
          </Grid.Col>
          <Grid.Col span={8}>
            <Form.Item label="Budget" field="project_budget" rules={[{ type: "number", required: true }]}>
              <InputNumber placeholder="Estimation du budget" suffix="CFA" />
            </Form.Item>
          </Grid.Col>
        </Grid.Row>

        <Grid.Row gutter={24}>
          <Grid.Col span={12}>
            <Form.Item label="Description" field="project_summary">
              <Input.TextArea placeholder="Please enter ..." autoSize={{ minRows: 6, maxRows: 7 }} />
            </Form.Item>
          </Grid.Col>
          <Grid.Col span={12}>
            <Form.Item label="Note" field="notes">
              <Input.TextArea placeholder="Please enter ..." autoSize={{ minRows: 6, maxRows: 7 }} />
            </Form.Item>
          </Grid.Col>
        </Grid.Row>

        <Grid.Row gutter={24}>
          <Grid.Col span={8}>
            <Form.Item label="Etat" field="status" rules={[{ required: true }]}>
              <Select placeholder="Selecter un client" options={projectStatue} allowClear />
            </Form.Item>
          </Grid.Col>
          <Grid.Col span={8}>
            <Form.Item label="Start date" field="start_date" rules={[{ required: true }]}>
              <DatePicker showTime />
            </Form.Item>
          </Grid.Col>
          <Grid.Col span={8}>
            <Form.Item label="Deadline" field="deadline">
              <DatePicker showTime />
            </Form.Item>
          </Grid.Col>
        </Grid.Row>

        <Grid.Row gutter={24}>
          <Grid.Col span={16}>
            <Form.Item label="Membres de l'equipe" required field="members" rules={[{ type: "array", minLength: 1 }]}>
              <Select mode="multiple" allowCreate placeholder="please select" options={employees} />
            </Form.Item>
          </Grid.Col>
          <Grid.Col span={8}>
            <Form.Item label="Chef de projet" field="project_admin" rules={[{ required: true }]}>
              <Select placeholder="Selecter un client" options={employees} allowClear />
            </Form.Item>
          </Grid.Col>
        </Grid.Row>

        <Form.Item>
          <Button
            onClick={async () => {
              if (formRef.current) {
                try {
                  await formRef.current.validate();
                } catch (_) {
                  Message.error("Validation échoué, veuillez vérifier les champs !");
                }
              }
            }}
            type="primary"
            htmlType="submit"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    )
  ) : (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
      <Spin tip="Recuperation des données" loading />
    </div>
  );
}
