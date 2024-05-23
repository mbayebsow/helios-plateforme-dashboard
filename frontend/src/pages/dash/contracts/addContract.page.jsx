import { useRef, useEffect, useState } from "react";
import {
  Form,
  Input,
  Select,
  Button,
  Message,
  InputNumber,
  DatePicker,
  Grid,
  Space,
} from "@arco-design/web-react";
const FormItem = Form.Item;

export default function AddContractPage() {
  const formRef = useRef();
  useEffect(() => {
    formRef.current.setFieldsValue({
      rate: 5,
    });
  }, []);

  const onValuesChange = (changeValue, values) => {
    console.log("onValuesChange: ", changeValue, values);
  };
  return (
    <Form
      layout="vertical"
      ref={formRef}
      size="large"
      onValuesChange={onValuesChange}
      onSubmit={(values) => {
        console.log(values);
      }}
      scrollToFirstError
    >
      <Grid.Row gutter={24}>
        <Grid.Col span={12}>
          <FormItem
            label="Sujet"
            field="subject"
            rules={[{ required: true }]}
          >
            <Input placeholder="please enter..." />
          </FormItem>
        </Grid.Col>
        <Grid.Col span={12}>
          <FormItem
            label="Client"
            field="client_id"
            rules={[{ required: true }]}
          >
            <Select
              placeholder="Selecter un client"
              options={[
                {
                  label: "Employee 1",
                  value: "in_progress",
                },
                {
                  label: "Employee 2",
                  value: "completed",
                },
                {
                  label: "Employee 3",
                  value: "on_hold",
                },
              ]}
              allowClear
            />
          </FormItem>
        </Grid.Col>
      </Grid.Row>
      <Grid.Row gutter={24}>
        <Grid.Col span={8}>
          <FormItem
            label="Montant"
            field="amount"
            rules={[{ required: true, type: "number" }]}
          >
            <InputNumber
              placeholder="please enter..."
              suffix="FCFA"
            />
          </FormItem>
        </Grid.Col>
        <Grid.Col span={8}>
          <FormItem
            label="Date en vigueur"
            field="start_date"
            rules={[{ required: true }]}
          >
            <DatePicker />
          </FormItem>
        </Grid.Col>
        <Grid.Col span={8}>
          <FormItem label="Date de fin" field="end_date">
            <DatePicker />
          </FormItem>
        </Grid.Col>
      </Grid.Row>

      <FormItem label="Decription" field="description">
        <Input.TextArea
          placeholder="Please enter ..."
          autoSize={{
            minRows: 15,
          }}
        />
      </FormItem>

      <FormItem style={{ marginTop: 20 }}>
        <Space direction="horizontal" size="large">
          <Button
            onClick={async () => {
              if (formRef.current) {
                try {
                  await formRef.current.validate();
                  Message.info("Tache ajouter avec success !");
                } catch (_) {
                  //console.log(formRef.current.getFieldsError());
                  Message.error(
                    "Validation échoué, veuillez vérifier les champs !"
                  );
                }
              }
            }}
            type="primary"
          >
            Enregistrer
          </Button>
        </Space>
      </FormItem>
    </Form>
  );
}
