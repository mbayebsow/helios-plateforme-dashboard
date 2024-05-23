import { useOutletContext } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import { Form, Input, Select, Button, Message, InputNumber, DatePicker, Grid, Badge, Switch, Space } from "@arco-design/web-react";

import { addTask, updateTask } from "../../../components/functions/tasks.data";
import { getProjects } from "../../../components/functions/projects.data";
import { getEmployees } from "../../../components/functions/employees.data";
import { taskPriority, taskStatus } from "../../../lib/config";

const FormItem = Form.Item;

export default function AddTaskPage() {
  const formRef = useRef();
  const [projects, setProjects] = useState();
  const [employees, setEmployees] = useState();
  const [setDrawerTitle, setDataToTable] = useOutletContext();

  const getRelational = async () => {
    const projects = await getProjects([]);
    const employees = await getEmployees([]);

    if (projects || projects !== "error") {
      const datas = projects.data.map((obj) => {
        const label = obj.project_name;
        const value = obj._id;
        return { label, value };
      });
      setProjects(datas);
    }
    if (employees || employees !== "error") {
      const datas = employees.data.map((obj) => {
        const label = obj.first_name + " " + obj.last_name;
        const value = obj._id;
        return { label, value };
      });
      setEmployees(datas);
    }
  };

  const addData = async (values) => {
    Message.loading("Enregistrement en cour");
    const addData = await addTask(values);

    if (addData) {
      Message.success(addData?.message);
      formRef.current.resetFields();
      setDataToTable();
      return;
    }
  };

  useEffect(() => {
    getRelational();
    setDrawerTitle("Ajouter une tache");
  }, []);

  return (
    <Form
      layout="vertical"
      ref={formRef}
      size="large"
      onSubmit={(values) => {
        addData(values);
      }}
      initialValues={{
        status: "a_faire",
        priority: "faible",
        start_date: Date.now(),
      }}
      scrollToFirstError
    >
      <Grid.Row gutter={24}>
        <Grid.Col span={8}>
          <FormItem label="Titre" field="title" rules={[{ required: true }]}>
            <Input placeholder="please enter..." />
          </FormItem>
        </Grid.Col>
        <Grid.Col span={8}>
          <FormItem label="Projet" field="project_id" rules={[{ required: true }]}>
            <Select placeholder="Selecter un client" options={projects} />
          </FormItem>
        </Grid.Col>
        <Grid.Col span={8}>
          <FormItem label="Assigner a" field="assigned_to" rules={[{ required: true }]}>
            <Select placeholder="Selecter un client" options={employees} />
          </FormItem>
        </Grid.Col>
      </Grid.Row>

      <Grid.Row gutter={24}>
        <Grid.Col span={24}>
          <FormItem label="Description" field="description">
            <Input.TextArea placeholder="Please enter ..." autoSize={{ minRows: 6, maxRows: 7 }} />
          </FormItem>
        </Grid.Col>
      </Grid.Row>

      <Grid.Row gutter={24}>
        <Grid.Col span={8}>
          <FormItem label="Etat" field="status" rules={[{ required: true }]}>
            <Select placeholder="Selecter un client">
              {taskStatus.map((option, index) => (
                <Select.Option key={index} value={option.value}>
                  <Badge status={option.status} text={option.text} />
                </Select.Option>
              ))}
            </Select>
          </FormItem>
        </Grid.Col>
        <Grid.Col span={8}>
          <FormItem label="Start date" field="start_date" rules={[{ required: true }]}>
            <DatePicker style={{ width: "100%" }} />
          </FormItem>
        </Grid.Col>
        <Grid.Col span={8}>
          <FormItem label="Deadline" field="deadline">
            <DatePicker style={{ width: "100%" }} />
          </FormItem>
        </Grid.Col>
      </Grid.Row>

      <Grid.Row gutter={24}>
        <Grid.Col span={4}>
          <FormItem label="Rendre Privée" field="is_private" triggerPropName="is_private" rules={[{ type: "boolean" }]}>
            <Switch />
          </FormItem>
        </Grid.Col>
        <Grid.Col span={6}>
          <FormItem label="Depend de" field="dependent_task_id">
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
          </FormItem>
        </Grid.Col>
        <Grid.Col span={6}>
          <FormItem label="Priorité" field="priority">
            <Select placeholder="Selecter un client" options={taskPriority} />
          </FormItem>
        </Grid.Col>

        <Grid.Col span={8}>
          <FormItem label="Estimation">
            <Grid.Row gutter={8}>
              <Grid.Col span={12}>
                <FormItem
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
                </FormItem>
              </Grid.Col>
              <Grid.Col span={12}>
                <FormItem
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
                </FormItem>
              </Grid.Col>
            </Grid.Row>
          </FormItem>
        </Grid.Col>
      </Grid.Row>

      <FormItem style={{ marginTop: 20 }}>
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
      </FormItem>
    </Form>
  );
}
