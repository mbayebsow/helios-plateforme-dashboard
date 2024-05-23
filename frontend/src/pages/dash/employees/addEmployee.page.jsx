import { useRef, useState } from "react";
import { Form, Input, Select, Button, Message, Grid, Space, Switch, DatePicker } from "@arco-design/web-react";
import { addEmployee } from "../../../components/functions/employees.data";
import UploadAvatar from "../../../components/UploadAvatar";
const FormItem = Form.Item;

export default function AddEmployeePage() {
  const formRef = useRef();
  const [profileUrl, setProfileUrl] = useState();

  const addDataEmployee = async (values) => {
    if (profileUrl) values.profile = profileUrl;

    Message.loading({
      id: "addEmployee",
      content: "Enregistrement en cour",
    });

    const addData = await addEmployee(values);

    if (addData.success) {
      Message.success({
        id: "addEmployee",
        content: addData?.message,
      });
      return;
    } else {
      Message.error({
        id: "addEmployee",
        content: "Erreur " + addData?.message,
      });
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
        initialValues={{ permissions: ["Employee"] }}
        onSubmit={(values) => {
          addDataEmployee(values);
        }}
        scrollToFirstError
      >
        <Grid.Row gutter={24}>
          <Grid.Col span={8}>
            <FormItem label="Employé ID" field="employee_id" rules={[{ required: true, message: "Employé ID est requis" }]}>
              <Input prefix="EPL" placeholder="Selecter un client" />
            </FormItem>
          </Grid.Col>
          <Grid.Col span={8}>
            <FormItem label="Prenom" field="first_name" rules={[{ required: true, message: "Le Prenom est requis" }]}>
              <Input placeholder="please enter..." />
            </FormItem>
          </Grid.Col>
          <Grid.Col span={8}>
            <FormItem label="Nom" field="last_name" rules={[{ required: true, message: "Le Nom est requis" }]}>
              <Input placeholder="please enter..." />
            </FormItem>
          </Grid.Col>
        </Grid.Row>

        <Grid.Row gutter={24}>
          <Grid.Col span={12}>
            <FormItem label="Adresse mail" field="email" rules={[{ required: true, message: "L'email est requis" }]}>
              <Input placeholder="Nom de la societe" />
            </FormItem>
          </Grid.Col>
          <Grid.Col span={12}>
            <FormItem label="Adresse postal" field="address" rules={[{ required: true, message: "L'adresse' est requis" }]}>
              <Input placeholder="please enter..." />
            </FormItem>
          </Grid.Col>
        </Grid.Row>

        <Grid.Row gutter={24}>
          <Grid.Col span={12}>
            <FormItem label="Genre" field="genre" rules={[{ required: true, message: "Selectioner un genre svp" }]}>
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
          <Grid.Col span={12}>
            <FormItem label="Anniversaire" field="birthday" rules={[{ required: true, message: "La date d'Anniversaire est requis" }]}>
              <DatePicker />
            </FormItem>
          </Grid.Col>
        </Grid.Row>

        <Grid.Row gutter={24}>
          <Grid.Col span={12}>
            <FormItem label="Designation" field="designation" rules={[{ required: true, message: "Selectionner au moin une Designation svp" }]}>
              <Select
                options={[
                  {
                    label: "Designer",
                    value: "Designer",
                  },
                  {
                    label: "Chef de projet",
                    value: "cdp",
                  },
                ]}
                placeholder="Please enter"
              />
            </FormItem>
          </Grid.Col>
          <Grid.Col span={12}>
            <FormItem label="Department" field="department" rules={[{ required: true, message: "Selectionner le Department svp" }]}>
              <Select
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
                ]}
                placeholder="Please enter"
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
