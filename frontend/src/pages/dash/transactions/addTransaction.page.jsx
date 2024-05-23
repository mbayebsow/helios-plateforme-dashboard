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
  Upload,
  Space,
} from "@arco-design/web-react";
const FormItem = Form.Item;

export default function AddTransactionPage() {
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
      initialValues={{
        status: "afaire",
        priority: "Low",
        start_date: Date.now(),
      }}
      scrollToFirstError
    >
      <Grid.Row gutter={24}>
        <Grid.Col span={8}>
          <FormItem label="Projet" field="project_id">
            <Select
              placeholder="Selecter un client"
              options={[
                {
                  label: "one",
                  value: 0,
                },
                {
                  label: "two",
                  value: 1,
                },
                {
                  label: "three",
                  value: 2,
                },
              ]}
              allowClear
            />
          </FormItem>
        </Grid.Col>
        <Grid.Col span={8}>
          <FormItem label="Facture" field="invoice_id">
            <Select
              placeholder="Selecter un client"
              options={[
                {
                  label: "one",
                  value: 0,
                },
                {
                  label: "two",
                  value: 1,
                },
                {
                  label: "three",
                  value: 2,
                },
              ]}
              allowClear
            />
          </FormItem>
        </Grid.Col>
        <Grid.Col span={8}>
          <FormItem
            label="Payer le"
            field="paid_on"
            rules={[{ required: true }]}
          >
            <DatePicker showTime />
          </FormItem>
        </Grid.Col>
      </Grid.Row>

      <Grid.Row gutter={24}>
        <Grid.Col span={8}>
          <FormItem
            label="Montant"
            field="amount"
            rules={[{ required: true }]}
          >
            <InputNumber suffix="FCFA" />
          </FormItem>
        </Grid.Col>
        <Grid.Col span={8}>
          <FormItem label="Transaction" field="transaction_id">
            <Input placeholder="Entrer un numero de transaction" />
          </FormItem>
        </Grid.Col>
        <Grid.Col span={8}>
          <FormItem label="Moyen de paiement" field="gateway">
            <Input placeholder="Wave, Orange Money ..." />
          </FormItem>
        </Grid.Col>
      </Grid.Row>

      <Grid.Row gutter={24}>
        <Grid.Col span={24}>
          <FormItem label="Remark" field="note">
            <Input.TextArea
              placeholder="Please enter ..."
              autoSize={{ minRows: 6, maxRows: 7 }}
            />
          </FormItem>
        </Grid.Col>
      </Grid.Row>

      <FormItem label="Receipt" field="receipt">
        <Upload
          drag
          multiple
          accept="image/*"
          action="/"
          // onDrop={(e) => {
          //   let uploadFile = e.dataTransfer.files[0]
          //   if (isAcceptFile(uploadFile, 'image/*')) {
          //     return
          //   } else {
          //      Message.info('不接受的文件类型，请重新上传指定文件类型~');
          //   }
          // }}
          tip="Seules les images peuvent être téléchargées"
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
            Enregistrer & fermer
          </Button>
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
            type="outline"
          >
            Enregistrer & Ajouter
          </Button>
        </Space>
      </FormItem>
    </Form>
  );
}
