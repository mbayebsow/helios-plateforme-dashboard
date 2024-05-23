import { useRef, useState } from "react";
import { Modal, Button, Form, Input, Grid, Message, DatePicker } from "@arco-design/web-react";
import { AddAlt, Close, Save } from "@carbon/icons-react";

import { addSubTask } from "../functions/subTasks.data";

export default function AddSubTask({ taskId, taskName, callBack }) {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const formRef = useRef();
  const [form] = Form.useForm();

  async function onOk() {
    setConfirmLoading(true);
    try {
      await form.validate().then((res) => {
        res.task_id = taskId;
        saveSubTask(res);
      });
    } catch (_) {
      Message.error("Validation échoué, veuillez vérifier les champs !");
      setConfirmLoading(false);
    }
  }

  const saveSubTask = async (values) => {
    const addData = await addSubTask(values);

    if (addData) {
      Message.success(addData?.message);
      callBack();
      form.resetFields();
    }
    setConfirmLoading(false);
  };

  return (
    <div>
      <Button onClick={() => setVisible(true)} type="primary" style={{ marginBottom: 10 }}>
        <AddAlt />
        Ajouter une sous tache
      </Button>
      <Modal
        title={"Ajouter une sous tache a " + taskName}
        visible={visible}
        onOk={onOk}
        onCancel={() => setVisible(false)}
        confirmLoading={confirmLoading}
        footer={
          <>
            <Button
              onClick={() => {
                setVisible(false);
              }}
            >
              <Close />
              Fermer
            </Button>
            <Button
              loading={confirmLoading}
              onClick={() => {
                onOk();
              }}
              type="primary"
            >
              <Save />
              Ajouter
            </Button>
          </>
        }
      >
        <Form form={form} layout="vertical" ref={formRef} size="large">
          <Form.Item label="Titre" field="title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Description" field="description">
            <Input.TextArea />
          </Form.Item>
          <Grid.Row gutter={24}>
            <Grid.Col span={12}>
              <Form.Item label="Start Date" field="start_date" rules={[{ required: true }]}>
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Grid.Col>
            <Grid.Col span={12}>
              <Form.Item label="Deadline" field="deadline">
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Grid.Col>
          </Grid.Row>
        </Form>
      </Modal>
    </div>
  );
}
