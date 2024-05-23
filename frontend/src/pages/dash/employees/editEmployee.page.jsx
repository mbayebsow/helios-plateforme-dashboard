import { useEffect, useRef, useState } from "react";
import {
  Form,
  Input,
  Select,
  Button,
  Message,
  Grid,
  DatePicker,
  Spin,
  Result,
} from "@arco-design/web-react";
import { getEmployee, updateEmployee } from "../../../components/functions/employees.data";
import { employeesStatue } from "../../../lib/config";
import { Crypt, Decrypt } from "../../../lib/crypto";
import UploadAvatar from "../../../components/UploadAvatar";
import { useParams } from "react-router-dom";

const FormItem = Form.Item;

export default function EditEmployeePage() {
  const { id } = useParams();
  const formRef = useRef();
  const [profileUrl, setProfileUrl] = useState();
  const [initialValues, setInitialValues] = useState();

  const getDataEmployee = async () => {
    const { data } = await getEmployee(id);
    if (data.password) {
      const password = await Decrypt(data.password);
      setInitialValues({ ...data, password });
      return;
    }
    setInitialValues(data);
    return true;
  };

  const updateDataEmployee = async (values) => {
    if (profileUrl) values.profile = profileUrl;

    Message.loading({
      id: "updateData",
      content: "Sauvegarde des modifications",
    });

    if (values.newPassword & values.confirmPassword) {
      if (values.newPassword !== values.confirmPassword) {
        Message.error("Les nouvel mot de passe ne correspond pas");
        return;
      }
      if (initialValues.password !== values.oldPassword) {
        Message.error("Mot de passe ne correspond pas");
        return;
      }
      values.password = await Crypt(values.newPassword, true);
    }
    delete values.newPassword;
    delete values.confirmPassword;
    delete values.oldPassword;

    const updateData = await updateEmployee(id, values);

    if (updateData) {
      Message.success({
        id: "updateData",
        content: updateData?.message,
      });
    }
  };

  useEffect(() => {
    getDataEmployee();
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
              getDataEmployee();
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
            updateDataEmployee(values);
          }}
          scrollToFirstError
        >
          <Grid.Row gutter={24}>
            <Grid.Col span={8}>
              <FormItem label="Employé ID" field="employee_id" rules={[{ required: true }]}>
                <Input prefix="EPL" placeholder="Selecter un client" />
              </FormItem>
            </Grid.Col>
            <Grid.Col span={8}>
              <FormItem label="Status" field="status" rules={[{ required: true }]}>
                <Select options={employeesStatue} placeholder="Please enter" />
              </FormItem>
            </Grid.Col>
            <Grid.Col span={8}>
              <FormItem label="Anniversaire" field="birthday" rules={[{ required: true }]}>
                <DatePicker style={{ width: "100%" }} />
              </FormItem>
            </Grid.Col>
          </Grid.Row>

          <Grid.Row gutter={24}>
            <Grid.Col span={8}>
              <FormItem label="Prenom" field="first_name" rules={[{ required: true }]}>
                <Input placeholder="please enter..." />
              </FormItem>
            </Grid.Col>
            <Grid.Col span={8}>
              <FormItem label="Nom" field="last_name" rules={[{ required: true }]}>
                <Input placeholder="please enter..." />
              </FormItem>
            </Grid.Col>
            <Grid.Col span={8}>
              <FormItem label="Adresse mail" field="email" rules={[{ required: true }]}>
                <Input placeholder="Nom de la societe" />
              </FormItem>
            </Grid.Col>
          </Grid.Row>

          <Grid.Row gutter={24}>
            <Grid.Col span={16}>
              <FormItem label="Adresse postal" field="address" rules={[{ required: true }]}>
                <Input placeholder="please enter..." />
              </FormItem>
            </Grid.Col>
            <Grid.Col span={8}>
              <FormItem label="Genre" field="genre" rules={[{ required: true }]}>
                <Select
                  options={[
                    {
                      label: "Homme",
                      value: "homme",
                    },
                    {
                      label: "Femme",
                      value: "femme",
                    },
                  ]}
                  placeholder="Please enter"
                />
              </FormItem>
            </Grid.Col>
          </Grid.Row>

          <Grid.Row gutter={24}>
            <Grid.Col span={12}>
              <FormItem label="Designation" field="designation" rules={[{ required: true }]}>
                <Select
                  allowClear
                  allowCreate
                  placeholder="Please enter"
                  options={[
                    {
                      label: "FullStack JavaScript",
                      value: "FullStack JavaScript",
                    },
                    {
                      label: "Chef de projet",
                      value: "cdp",
                    },
                  ]}
                />
              </FormItem>
            </Grid.Col>
            <Grid.Col span={12}>
              <FormItem label="Department" field="department" rules={[{ required: true }]}>
                <Select
                  allowClear
                  allowCreate
                  placeholder="Please enter"
                  options={[
                    {
                      label: "Frontend",
                      value: "Frontend",
                    },
                    {
                      label: "Backend",
                      value: "Backend",
                    },
                    {
                      label: "Digital",
                      value: "Digital",
                    },
                    {
                      label: "FullSatack",
                      value: "FullSatack",
                    },
                  ]}
                />
              </FormItem>
            </Grid.Col>
          </Grid.Row>

          <FormItem label="Skills" field="skills">
            <Select
              mode="multiple"
              placeholder="Select a tag"
              allowClear
              allowCreate
              options={[
                {
                  label: "React",
                  value: "React",
                },
                {
                  label: "Angular",
                  value: "Angular",
                },
                {
                  label: "Adobe CC",
                  value: "Adobe CC",
                },
              ]}
            />
          </FormItem>
          <FormItem label="Permissions" field="permissions">
            <Select
              mode="multiple"
              placeholder="Select a tag"
              allowClear
              allowCreate
              options={[
                {
                  label: "Administrateur",
                  value: "Admin",
                },
                {
                  label: "Employé",
                  value: "Employee",
                },
              ]}
            />
          </FormItem>

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
              htmlType="submit"
              type="primary"
            >
              Enregistrer
            </Button>
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
