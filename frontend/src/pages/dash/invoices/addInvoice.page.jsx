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
  Upload,
  Progress,
  Typography,
} from "@arco-design/web-react";
import {
  AddAlt,
  AddFilled,
  Edit,
  TrashCan,
} from "@carbon/icons-react";
const FormItem = Form.Item;

const footerStyle = {
  borderBottom: "1px solid var(--color-fill-2)",
  margin: 0,
  marginTop: 10,
  height: 40,
  padding: 5,
  display: "flex",
  alignItems: "center",
};
export default function AddInvoicePage() {
  const formRef = useRef();
  useEffect(() => {
    formRef.current.setFieldsValue({
      rate: 5,
    });
  }, []);

  const [file, setFile] = useState();
  const cs = `arco-upload-list-item${
    file && file.status === "error" ? " is-error" : ""
  }`;

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
        discount: 0,
        items: [
          {
            quantity: 1,
            unit_price: 0,
          },
        ],
      }}
      scrollToFirstError
    >
      <Grid.Row gutter={24}>
        <Grid.Col span={8}>
          <FormItem
            label="Facture N°"
            field="invoice_number"
            rules={[{ required: true, type: "number" }]}
          >
            <InputNumber placeholder="please enter..." prefix="INV" />
          </FormItem>
        </Grid.Col>
        <Grid.Col span={8}>
          <FormItem
            label="Date du facture"
            field="invoice_date"
            rules={[{ required: true }]}
          >
            <DatePicker />
          </FormItem>
        </Grid.Col>
        <Grid.Col span={8}>
          <FormItem
            label="Due Date"
            field="due_date"
            rules={[{ required: true }]}
          >
            <DatePicker />
          </FormItem>
        </Grid.Col>
      </Grid.Row>

      <Grid.Row gutter={24}>
        <Grid.Col span={12}>
          <FormItem
            label="Estimation"
            field="estimate_id"
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
        <Grid.Col span={12}>
          <FormItem label="Projet" field="project_id">
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
        <Grid.Col span={12}>
          <FormItem label="Service" field="service_id">
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

      <Form.List label="Articles" field="items">
        {(fields, { add, remove }) => {
          return (
            <div>
              {fields.map((item, index) => {
                return (
                  <div
                    key={item.key}
                    style={{
                      border: "2px dashed var(--color-neutral-3)",
                      padding: 15,
                      marginBottom: 5,
                    }}
                  >
                    <FormItem label={"Article " + index}>
                      <Space direction="horizontal" size="large">
                        <Button
                          icon={<TrashCan />}
                          shape="circle"
                          status="danger"
                          onClick={() => remove(index)}
                        ></Button>

                        <Grid.Row>
                          <Grid.Col>
                            <FormItem
                              label="Titre"
                              field="item_name"
                              rules={[{ required: true }]}
                            >
                              <Input placeholder="Nom de l'article" />
                            </FormItem>
                          </Grid.Col>
                          <Grid.Row gutter={24}>
                            <Grid.Col span={8}>
                              <FormItem
                                label="Quantite / Heur"
                                field="quantity"
                                rules={[
                                  {
                                    required: true,
                                    type: "number",
                                  },
                                ]}
                              >
                                <InputNumber placeholder="Qty/Hrs" />
                              </FormItem>
                            </Grid.Col>

                            <Grid.Col span={8}>
                              <FormItem
                                label="Prix"
                                field="unit_price"
                                rules={[
                                  {
                                    required: true,
                                    type: "number",
                                  },
                                ]}
                              >
                                <InputNumber
                                  placeholder="Prix unitaire"
                                  suffix="FCFA"
                                />
                              </FormItem>
                            </Grid.Col>

                            <Grid.Col span={8}>
                              <FormItem label="Sommes" field="amount">
                                <Input
                                  placeholder="Montant"
                                  suffix="FCFA"
                                  disabled
                                />
                              </FormItem>
                            </Grid.Col>
                          </Grid.Row>

                          <Grid.Col>
                            <FormItem
                              label="Decription"
                              field="description"
                            >
                              <Input.TextArea
                                placeholder="Please enter ..."
                                autoSize={{
                                  minRows: 6,
                                  maxRows: 7,
                                }}
                              />
                            </FormItem>
                          </Grid.Col>
                        </Grid.Row>

                        <Upload
                          action="/"
                          fileList={file ? [file] : []}
                          showUploadList={false}
                          onChange={(_, currentFile) => {
                            setFile({
                              ...currentFile,
                              url: URL.createObjectURL(
                                currentFile.originFile
                              ),
                            });
                          }}
                          onProgress={(currentFile) => {
                            setFile(currentFile);
                          }}
                        >
                          <div className={cs}>
                            {file && file.url ? (
                              <div className="arco-upload-list-item-picture custom-upload-avatar">
                                <img src={file.url} />
                                <div className="arco-upload-list-item-picture-mask">
                                  <Edit />
                                </div>
                                {file.status === "uploading" &&
                                  file.percent < 100 && (
                                    <Progress
                                      percent={file.percent}
                                      type="circle"
                                      size="mini"
                                      style={{
                                        position: "absolute",
                                        left: "50%",
                                        top: "50%",
                                        transform:
                                          "translateX(-50%) translateY(-50%)",
                                      }}
                                    />
                                  )}
                              </div>
                            ) : (
                              <div className="arco-upload-trigger-picture">
                                <div className="arco-upload-trigger-picture-text">
                                  <AddAlt />
                                  <div
                                    style={{
                                      marginTop: 10,
                                      fontWeight: 600,
                                    }}
                                  >
                                    Upload
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </Upload>
                      </Space>
                    </FormItem>
                  </div>
                );
              })}
              <FormItem>
                <Button
                  type="text"
                  onClick={() => {
                    add();
                  }}
                >
                  <AddFilled />
                  Ajouter un article
                </Button>
              </FormItem>
            </div>
          );
        }}
      </Form.List>
      <Grid.Row gutter={24} style={{ marginBlock: 40 }}>
        <Grid.Col span={14}>
          <Grid.Row gutter={24} align="center" style={footerStyle}>
            <Grid.Col span={16}>
              <Typography.Text>SOUS TOTAL</Typography.Text>
            </Grid.Col>
            <Grid.Col span={8}>
              <Typography.Text bold>0.00 FCFA</Typography.Text>
            </Grid.Col>
          </Grid.Row>
          <Grid.Row gutter={24} align="center" style={footerStyle}>
            <Grid.Col span={8}>
              <Typography.Text>REDUCTION</Typography.Text>
            </Grid.Col>

            <Grid.Col span={8}>
              <FormItem
                field="discount"
                rules={[{ required: true, type: "number" }]}
              >
                <InputNumber
                  placeholder="please enter..."
                  suffix="%"
                />
              </FormItem>
            </Grid.Col>

            <Grid.Col span={8}>
              <Typography.Text bold>0.00 FCFA</Typography.Text>
            </Grid.Col>
          </Grid.Row>
          <Grid.Row gutter={24} align="center" style={footerStyle}>
            <Grid.Col span={16}>
              <Typography.Text>TOTAL</Typography.Text>
            </Grid.Col>

            <Grid.Col span={8}>
              <Typography.Text bold>0.00 FCFA</Typography.Text>
            </Grid.Col>
          </Grid.Row>
        </Grid.Col>
        <Grid.Col span={10}>
          <FormItem label="Note" field="note">
            <Input.TextArea
              placeholder="Please enter ..."
              autoSize={{ minRows: 6, maxRows: 7 }}
            />
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
