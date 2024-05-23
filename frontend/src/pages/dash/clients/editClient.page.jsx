import { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Form,
  Input,
  Select,
  Button,
  Message,
  Grid,
  Space,
  Switch,
  Result,
  Spin,
} from "@arco-design/web-react";
import { getUser, updateUser } from "../../../components/functions/users.data";
import UploadAvatar from "../../../components/UploadAvatar";
import { employeesStatue } from "../../../lib/config";
import { Crypt, Decrypt } from "../../../lib/crypto";
const FormItem = Form.Item;

export default function EditClientPage() {
  const { id } = useParams();
  const formRef = useRef();
  const [profileUrl, setProfileUrl] = useState();
  const [initialValues, setInitialValues] = useState();

  const getData = async () => {
    const { data } = await getUser(id);
    if (data.password) {
      const password = await Decrypt(data.password);
      setInitialValues({ ...data, password });
      return;
    }
    setInitialValues(data);
    return;
  };

  const updateData = async (values) => {
    if (profileUrl) values.profile = profileUrl;

    Message.loading({
      id: "updateData",
      content: "Sauvegarde des modifications",
    });

    if (values.newPassword & values.confirmPassword) {
      if (values.newPassword !== values.confirmPassword) {
        Message.error({
          id: "updateData",
          content: "Mot de passe ne correspond pas",
        });
        return;
      }
      if (initialValues.password !== values.oldPassword) {
        Message.error({
          id: "updateData",
          content: "Mot de passe ne correspond pas",
        });
        return;
      }
      values.password = await Crypt(values.newPassword, true);
    }
    delete values.newPassword;
    delete values.confirmPassword;
    delete values.oldPassword;

    const data = await updateUser(id, values);

    if (data.success) {
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
      <div>
        <UploadAvatar profileUrl={initialValues.profile} setProfileUrl={setProfileUrl} />
        <Form
          layout="vertical"
          ref={formRef}
          size="large"
          initialValues={initialValues}
          autoComplete="off"
          onSubmit={(values) => {
            updateData(values);
          }}
          scrollToFirstError
        >
          <Grid.Row gutter={24}>
            <Grid.Col span={24}>
              <FormItem label="Verified" field="verified">
                <Switch checked={initialValues.verified} checkedText="OUI" uncheckedText="NON" />
              </FormItem>
            </Grid.Col>
          </Grid.Row>

          <Grid.Row gutter={24}>
            <Grid.Col span={8}>
              <FormItem label="Status" field="status" rules={[{ required: true }]}>
                <Select options={employeesStatue} placeholder="Please enter" />
              </FormItem>
            </Grid.Col>
            <Grid.Col span={8}>
              <FormItem label="Nom Complet" field="full_name" rules={[{ required: true }]}>
                <Input placeholder="please enter..." />
              </FormItem>
            </Grid.Col>
            <Grid.Col span={8}>
              <FormItem label="Adresse mail" field="email" rules={[{ required: true }]}>
                <Input />
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
                  addBefore={
                    <FormItem style={{ margin: 0 }} field="indicatif">
                      <Select
                        defaultValue="+221"
                        style={{ width: 90 }}
                        allowCreate
                        options={["+221", "+33"]}
                      />
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

          <Grid.Row gutter={24}>
            {initialValues.password ? (
              <Grid.Col span={8}>
                <FormItem
                  label="Mot de passe"
                  field="oldPassword"
                  rules={[
                    {
                      validator: (v, cb) => {
                        if (formRef.current.getFieldValue("oldPassword")) {
                          if (formRef.current.getFieldValue("password") !== v) {
                            return cb("Saisissez votre ancien mot de passe");
                          }
                        }
                        cb(null);
                      },
                    },
                  ]}
                >
                  <Input.Password />
                </FormItem>
              </Grid.Col>
            ) : null}
            <Grid.Col span={8}>
              <FormItem label="Nouveau mot de passe" field="newPassword">
                <Input.Password />
              </FormItem>
            </Grid.Col>
            <Grid.Col span={8}>
              <FormItem
                label="Confirmer le mot de passe"
                field="confirmPassword"
                dependencies={["newPassword"]}
                rules={[
                  {
                    validator: (v, cb) => {
                      if (formRef.current.getFieldValue("newPassword")) {
                        if (formRef.current.getFieldValue("newPassword") !== v) {
                          return cb("Ne correspond pas au nouveau mot de passe");
                        }
                      }
                      cb(null);
                    },
                  },
                ]}
              >
                <Input.Password />
              </FormItem>
            </Grid.Col>
          </Grid.Row>

          <FormItem style={{ marginTop: 20 }}>
            <Space direction="horizontal" size="large">
              <Button
                onClick={async () => {
                  if (formRef.current) {
                    try {
                      await formRef.current.validate();
                    } catch (_) {
                      Message.error("Veuillez remplir tous les champs obligatoires svp !");
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
    )
  ) : (
    <div
      style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}
    >
      <Spin size={30} tip="Recuperation des données" loading />
    </div>
  );
}
