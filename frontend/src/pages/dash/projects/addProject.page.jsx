import { useRef, useEffect, useState } from "react";
import { Form, Input, Select, Button, Message, InputNumber, DatePicker, Grid } from "@arco-design/web-react";

import { projectStatue } from "../../../lib/config";

import { getUsers } from "../../../components/functions/users.data";
import { getEmployees } from "../../../components/functions/employees.data";
import { addProject } from "../../../components/functions/projects.data";

const FormItem = Form.Item;

export default function AddProjectPage() {
  const formRef = useRef();
  const [clients, setClients] = useState();
  const [employees, setEmployees] = useState();

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

  const addData = async (values) => {
    Message.loading("Enregistrement en cour");
    const addData = await addProject(values);

    if (addData) {
      Message.success(addData?.message);
      formRef.current.resetFields();
      return;
    }
  };

  useEffect(() => {
    getRelational();
  }, []);

  return (
    <Form
      layout="vertical"
      ref={formRef}
      autoComplete="off"
      size="large"
      onSubmit={(values) => {
        addData(values);
      }}
      scrollToFirstError
    >
      <Grid.Row gutter={24}>
        <Grid.Col span={8}>
          <FormItem label="Nom de projet" field="project_name" rules={[{ required: true }]}>
            <Input placeholder="please enter..." />
          </FormItem>
        </Grid.Col>
        <Grid.Col span={8}>
          <FormItem label="Client" field="client_id" rules={[{ required: true }]}>
            <Select placeholder="Selecter un client" allowClear options={clients} />
          </FormItem>
        </Grid.Col>
        <Grid.Col span={8}>
          <FormItem label="Budget" field="project_budget" rules={[{ type: "number", required: true }]}>
            <InputNumber placeholder="Estimation du budget" suffix="CFA" />
          </FormItem>
        </Grid.Col>
      </Grid.Row>

      <Grid.Row gutter={24}>
        <Grid.Col span={12}>
          <FormItem label="Description" field="project_summary">
            <Input.TextArea placeholder="Please enter ..." autoSize={{ minRows: 6, maxRows: 7 }} />
          </FormItem>
        </Grid.Col>
        <Grid.Col span={12}>
          <FormItem label="Note" field="notes">
            <Input.TextArea placeholder="Please enter ..." autoSize={{ minRows: 6, maxRows: 7 }} />
          </FormItem>
        </Grid.Col>
      </Grid.Row>

      <Grid.Row gutter={24}>
        <Grid.Col span={8}>
          <FormItem label="Etat" field="status" rules={[{ required: true }]}>
            <Select placeholder="Selecter un client" options={projectStatue} allowClear />
          </FormItem>
        </Grid.Col>
        <Grid.Col span={8}>
          <FormItem label="Start date" field="start_date" rules={[{ required: true }]}>
            <DatePicker showTime />
          </FormItem>
        </Grid.Col>
        <Grid.Col span={8}>
          <FormItem label="Deadline" field="deadline">
            <DatePicker showTime />
          </FormItem>
        </Grid.Col>
      </Grid.Row>

      <Grid.Row gutter={24}>
        <Grid.Col span={16}>
          <FormItem label="Membres de l'equipe" required field="members" rules={[{ type: "array", minLength: 1 }]}>
            <Select mode="multiple" allowCreate placeholder="please select" options={employees} />
          </FormItem>
        </Grid.Col>
        <Grid.Col span={8}>
          <FormItem label="Chef de projet" field="project_admin" rules={[{ required: true }]}>
            <Select placeholder="Selecter un client" options={employees} allowClear />
          </FormItem>
        </Grid.Col>
      </Grid.Row>

      <FormItem>
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
      </FormItem>
    </Form>
  );
}
