import { Form, Input, Button, Message, Link } from "@arco-design/web-react";
import { Login } from "@carbon/icons-react";
import { useState } from "react";
import { loginFunc } from "../../components/functions/auth.func";
import UseSession from "../../stores/session.store";

const FormItem = Form.Item;

export default function LoginPage() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { setSession } = UseSession();

  const handleSubmit = async (mail, password) => {
    const auth = await loginFunc({
      mail,
      password,
    });

    if (auth === "error" || !auth) {
      setLoading(false);
      return;
    }

    if (auth) {
      setLoading(false);
      Message.success("Connexion reussi");
      setSession();
    }
  };

  return (
    <div>
      <Form
        form={form}
        style={{ marginBottom: 20 }}
        layout="vertical"
        size="large"
        wrapperCol={{ span: 24 }}
        autoComplete="off"
        onSubmit={(v) => {
          setLoading(true);
          handleSubmit(v.mail, v.password);
        }}
      >
        <FormItem field="mail" rules={[{ required: true, message: "L'adresse mail est requis" }]}>
          <Input placeholder="Saisisez votre adresse email." />
        </FormItem>
        <FormItem
          field="password"
          rules={[{ required: true, message: "Le mot de passe est requis" }]}
        >
          <Input.Password placeholder="Entrez votre mot de passe" />
        </FormItem>
        <FormItem>
          <Button loading={loading} type="primary" htmlType="submit" long>
            {!loading && <Login />} Connexion
          </Button>
        </FormItem>
      </Form>
      <div>
        <Link href="#"> Mot de pass oublier? </Link>
      </div>
    </div>
  );
}
