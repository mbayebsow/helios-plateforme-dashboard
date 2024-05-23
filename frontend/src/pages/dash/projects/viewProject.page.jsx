import { useOutletContext, useParams } from "react-router-dom";
import { Tabs, Typography, Result, Spin, Button } from "@arco-design/web-react";
import { useEffect, useState } from "react";

import { getProject } from "../../../components/functions/projects.data";

import OverviewProject from "../../../components/projects/overview.project";
import MembersProject from "../../../components/projects/members.project";

export default function ViewProjectPage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("1");
  const [initialValues, setInitialValues] = useState();
  const [setDrawerTitle] = useOutletContext();

  const getData = async () => {
    const { data } = await getProject(id, "populate");
    setInitialValues(data);
    setDrawerTitle(data.project_name);
    return;
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {initialValues ? (
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
          <Tabs activeTab={activeTab} onChange={setActiveTab}>
            <Tabs.TabPane key="1" title="Aperçu">
              <OverviewProject data={initialValues} />
            </Tabs.TabPane>
            <Tabs.TabPane key="2" title="Membres">
              <MembersProject members={initialValues.members} />
            </Tabs.TabPane>
            <Tabs.TabPane key="3" title="Fichiers">
              <Typography.Paragraph>Content of Tab Panel 3</Typography.Paragraph>
            </Tabs.TabPane>
            <Tabs.TabPane key="4" title="Taches">
              <Typography.Paragraph>Content of Tab Panel 3</Typography.Paragraph>
            </Tabs.TabPane>
            <Tabs.TabPane key="5" title="Factures">
              <Typography.Paragraph>Content of Tab Panel 3</Typography.Paragraph>
            </Tabs.TabPane>
            <Tabs.TabPane key="6" title="Depenses">
              <Typography.Paragraph>Content of Tab Panel 3</Typography.Paragraph>
            </Tabs.TabPane>
            <Tabs.TabPane key="7" title="Paiement">
              <Typography.Paragraph>Content of Tab Panel 3</Typography.Paragraph>
            </Tabs.TabPane>
            <Tabs.TabPane key="8" title="Notes">
              <Typography.Paragraph>Content of Tab Panel 3</Typography.Paragraph>
            </Tabs.TabPane>
            <Tabs.TabPane key="9" title="Discussions">
              <Typography.Paragraph>Content of Tab Panel 3</Typography.Paragraph>
            </Tabs.TabPane>
          </Tabs>
        )
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Spin tip="Recuperation des données" loading />
        </div>
      )}
    </div>
  );
}
