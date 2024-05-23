import { useRef, useState } from "react";
import { Form, Input, Select, Button, Message, Grid, Space, Switch } from "@arco-design/web-react";
import { addUser } from "../../../components/functions/users.data";
import UploadAvatar from "../../../components/UploadAvatar";

const FormItem = Form.Item;

export default function AddClientPage() {
  const formRef = useRef();
  const [profileUrl, setProfileUrl] = useState();

  const addData = async (values) => {
    if (profileUrl) values.profile = profileUrl;

    values.group = "Client";

    Message.loading("Enregistrement en cour");

    const addData = await addUser(values);

    if (addData) {
      Message.success(addData?.message);
      formRef.current.resetFields();
      return;
    }
  };

  return (
    <div>
      <UploadAvatar profileUrl={profileUrl} setProfileUrl={setProfileUrl} />
      <Form
        layout="vertical"
        ref={formRef}
        size="large"
        initialValues={{ indicatif: "+221" }}
        onSubmit={(values) => {
          addData(values);
        }}
        scrollToFirstError
      >
        <Grid.Row gutter={24}>
          <Grid.Col span={8}>
            <FormItem label="Nom Complet" field="full_name" rules={[{ required: true }]}>
              <Input placeholder="please enter..." />
            </FormItem>
          </Grid.Col>
          <Grid.Col span={8}>
            <FormItem label="Adresse mail" field="email" rules={[{ required: true }]}>
              <Input type="email" />
            </FormItem>
          </Grid.Col>
          <Grid.Col span={8}>
            <FormItem label="Genre" field="genre" rules={[{ required: true, message: "Selectioner un genre svp" }]}>
              <Select
                placeholder="Please enter"
                options={[
                  {
                    label: "Homme",
                    value: "Homme",
                  },
                  {
                    label: "Femme",
                    value: "Femme",
                  },
                  {
                    label: "Neutre",
                    value: "Neutre",
                  },
                ]}
              />
            </FormItem>
          </Grid.Col>
        </Grid.Row>

        <Grid.Row gutter={24}>
          <Grid.Col span={12}>
            <FormItem label="Adresse postal" field="address">
              <Input placeholder="please enter..." />
            </FormItem>
          </Grid.Col>
          <Grid.Col span={12}>
            <FormItem label="Telephone" field="phone">
              <Input
                type="tel"
                addBefore={
                  <FormItem style={{ margin: 0 }} field="indicatif">
                    <Select style={{ width: 90 }} allowCreate options={["+221", "+33"]} placeholder="Indicatif" />
                  </FormItem>
                }
                allowClear
                placeholder="Please enter"
              />
            </FormItem>
          </Grid.Col>
        </Grid.Row>

        <Grid.Row gutter={24}>
          <Grid.Col span={12}>
            <FormItem label="Nom de l'entreprise" field="company_name">
              <Input placeholder="Nom de la societe" />
            </FormItem>
          </Grid.Col>
          <Grid.Col span={12}>
            <FormItem label="Site Web" field="website">
              <Input addBefore="https://" placeholder="please enter..." />
            </FormItem>
          </Grid.Col>
        </Grid.Row>

        <FormItem label="Envoyer un notification au client" field="send_notification">
          <Switch checkedText="OUI" uncheckedText="NON" />
        </FormItem>

        <FormItem style={{ marginTop: 20 }}>
          <Space direction="horizontal" size="large">
            <Button
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
              type="primary"
              htmlType="submit"
            >
              Enregistrer
            </Button>
          </Space>
        </FormItem>
      </Form>
    </div>
  );
}
