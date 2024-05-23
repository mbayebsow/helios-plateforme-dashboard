import { useOutletContext, useParams } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import { Form, Input, Select, Button, Message, InputNumber, DatePicker, Grid, Badge, Switch, Space, Result, Spin } from "@arco-design/web-react";

import { getProjects } from "../../../components/functions/projects.data";
import { getEmployees } from "../../../components/functions/employees.data";
import { getTask, updateTask } from "../../../components/functions/tasks.data";

import { taskPriority, taskStatus } from "../../../lib/config";
export default function EditTaskPage() {
  const { id } = useParams();
  const formRef = useRef();
  const [projects, setProjects] = useState({});
  const [employees, setEmployees] = useState({});
  const [setDrawerTitle, setDataToTable] = useOutletContext();
  const [initialValues, setInitialValues] = useState();

  const getRelational = async () => {
    const projects = await getProjects([]);
    const employees = await getEmployees([]);

    if (projects || projects !== "error") {
      const data = projects.data.map((obj) => {
        const label = obj.project_name;
        const value = obj._id;
        return { label, value };
      });
      setProjects(data);
    }
    if (employees || employees !== "error") {
      const data = employees.data.map((obj) => {
        const label = obj.first_name + " " + obj.last_name;
        const value = obj._id;
        return { label, value };
      });
      setEmployees(data);
    }
  };

  const getData = async () => {
    const { data } = await getTask(id);
    setInitialValues(data);
    setDrawerTitle(data.title);
  };

  const updateData = async (values) => {
    Message.loading("Enregistrement en cour");
    const addData = await updateTask(id, values);

    if (addData) {
      Message.success(addData?.message);
      formRef.current.resetFields();
      setDataToTable();
    }
  };

  useEffect(() => {
    getData();
    getRelational();
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
        size="large"
        nitialValues={initialValues}
        scrollToFirstError
        onSubmit={(values) => {
          updateData(values);
        }}
      >
        <Grid.Row gutter={24}>
          <Grid.Col span={8}>
            <Form.Item label="Titre" field="title" rules={[{ required: true }]}>
              <Input placeholder="please enter..." />
            </Form.Item>
          </Grid.Col>
          <Grid.Col span={8}>
            <Form.Item label="Projet" field="project_id" rules={[{ required: true }]}>
              <Select placeholder="Selecter un client" options={projects} />
            </Form.Item>
          </Grid.Col>
          <Grid.Col span={8}>
            <Form.Item label="Assigner a" field="assigned_to" rules={[{ required: true }]}>
              <Select placeholder="Selecter un client" options={employees} />
            </Form.Item>
          </Grid.Col>
        </Grid.Row>

        <Grid.Row gutter={24}>
          <Grid.Col span={24}>
            <Form.Item label="Description" field="description">
              <Input.TextArea placeholder="Please enter ..." autoSize={{ minRows: 6, maxRows: 7 }} />
            </Form.Item>
          </Grid.Col>
        </Grid.Row>

        <Grid.Row gutter={24}>
          <Grid.Col span={8}>
            <Form.Item label="Etat" field="status" rules={[{ required: true }]}>
              <Select placeholder="Selecter un client">
                {taskStatus.map((option, index) => (
                  <Select.Option key={index} value={option.value}>
                    <Badge status={option.status} text={option.text} />
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Grid.Col>
          <Grid.Col span={8}>
            <Form.Item label="Start date" field="start_date" rules={[{ required: true }]}>
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Grid.Col>
          <Grid.Col span={8}>
            <Form.Item label="Deadline" field="deadline">
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Grid.Col>
        </Grid.Row>

        <Grid.Row gutter={24}>
          <Grid.Col span={4}>
            <Form.Item label="Rendre Privée" field="is_private" triggerPropName="is_private" rules={[{ type: "boolean" }]}>
              <Switch />
            </Form.Item>
          </Grid.Col>
          <Grid.Col span={6}>
            <Form.Item label="Depend de" field="dependent_task_id">
              <Select
                placeholder="please select"
                options={[
                  {
                    label: "Tache 1",
                    value: "in_progress",
                  },
                  {
                    label: "Tache 2",
                    value: "completed",
                  },
                  {
                    label: "Tache 3",
                    value: "on_hold",
                  },
                ]}
              />
            </Form.Item>
          </Grid.Col>
          <Grid.Col span={6}>
            <Form.Item label="Priorité" field="priority">
              <Select placeholder="Selecter un client" options={taskPriority} />
            </Form.Item>
          </Grid.Col>

          <Grid.Col span={8}>
            <Form.Item label="Estimation">
              <Grid.Row gutter={8}>
                <Grid.Col span={12}>
                  <Form.Item
                    field="estimate_hours"
                    rules={[
                      {
                        type: "number",
                        min: 0,
                        max: 999,
                      },
                    ]}
                  >
                    <InputNumber placeholder="please enter you username" suffix="Hr" />
                  </Form.Item>
                </Grid.Col>
                <Grid.Col span={12}>
                  <Form.Item
                    field="estimate_minutes"
                    rules={[
                      {
                        type: "number",
                        min: 0,
                        max: 60,
                      },
                    ]}
                  >
                    <InputNumber placeholder="please enter your age" suffix="Mn" />
                  </Form.Item>
                </Grid.Col>
              </Grid.Row>
            </Form.Item>
          </Grid.Col>
        </Grid.Row>

        <Form.Item style={{ marginTop: 20 }}>
          <Space direction="horizontal" size="large">
            <Button
              type="primary"
              htmlType="submit"
              onClick={async () => {
                if (formRef.current) {
                  try {
                    await formRef.current.validate();
                  } catch (_) {
                    //console.log(formRef.current.getFieldsError());
                    Message.error("Validation échoué, veuillez vérifier les champs !");
                  }
                }
              }}
            >
              Ajouter
            </Button>
          </Space>
        </Form.Item>
      </Form>
    )
  ) : (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
      <Spin tip="Recuperation des données" loading />
    </div>
  );
}
