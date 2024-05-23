import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { Avatar, Button, Descriptions, Space, Tabs, Spin, Result } from "@arco-design/web-react";
import { Task, Checkmark, FileStorage, Play, Send, TimePlot, WhitePaper } from "@carbon/icons-react";
import Moment from "react-moment";
import { humanize } from "../../../lib/config";

import AddSubTask from "../../../components/task/addSubTask";
import SubTasksList from "../../../components/task/subTasksList";

import { getTask } from "../../../components/functions/tasks.data";
import { getSubTasks } from "../../../components/functions/subTasks.data";

export default function ViewTaskPage() {
  const { id } = useParams();
  const [setDrawerTitle] = useOutletContext();
  const [activeTab, setActiveTab] = useState("1");
  const [initialValues, setInitialValues] = useState();
  const [dataDescriptions, setDataDescriptions] = useState();
  const [subTasks, setSubTasks] = useState();

  const getData = async () => {
    const { data } = await getTask(id);

    const dataResume = [
      {
        label: "Projet",
        value: data.title,
      },
      {
        label: "Status",
        value: humanize(data.status),
      },
      {
        label: "Priorité",
        value: data.priority,
      },
      {
        label: "Heures Enregistrées",
        value: data.tite,
      },
      {
        label: "Start date",
        value: <Moment date={data.start_date} format="dddd D MMM YYYY" />,
      },
      {
        label: "Deadeline",
        value: <Moment date={data.deadline} format="dddd D MMM YYYY" />,
      },
      {
        label: "Assigné a",
        value: (
          <Space direction="horizontal">
            <Avatar>
              <img alt="avatar" src={data.assigned_to?.profile} />
            </Avatar>
            <div>
              <div style={{ fontSize: 15 }}>{data.assigned_to?.first_name}</div>
              <div style={{ fontSize: 15 }}>{data.assigned_to?.last_name}</div>
            </div>
          </Space>
        ),
      },
      {
        label: "Creer par",
        value: (
          <Space direction="horizontal">
            <Avatar>
              <img alt="avatar" src={data.created_by?.profile} />
            </Avatar>
            <div>
              <div style={{ fontSize: 15 }}>{data.created_by?.first_name}</div>
              <div style={{ fontSize: 15 }}>{data.created_by?.last_name}</div>
            </div>
          </Space>
        ),
      },
      {
        label: "Description",
        value: data.description,
      },
    ];

    setInitialValues(data);
    setDataDescriptions(dataResume);
    setDrawerTitle(data.title);

    return;
  };

  const getSubTaskData = async () => {
    const { data } = await getSubTasks(id);
    setSubTasks(data);
    return;
  };

  useEffect(() => {
    getData();
    getSubTaskData();
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
      <div style={{ width: "initial", display: "flex", flexDirection: "column", gap: 20 }}>
        <Space size="small">
          <Button status="danger" icon={<Play />}>
            Démarrer la minuterie
          </Button>
          <Button status="success" icon={<Checkmark />}>
            Marqué comme terminer
          </Button>
          <Button status="warning" icon={<Send />}>
            Envoyer un rappel
          </Button>
        </Space>
        <Descriptions data={dataDescriptions} layout="inline-vertical" border column={4} />
        <Tabs activeTab={activeTab} onChange={setActiveTab} style={{ backgroundColor: "var(--color-fill-2)", width: "100%", paddingTop: 10 }}>
          <Tabs.TabPane
            key="1"
            title={
              <div style={{ display: "flex", gap: 5, alignItems: "center", paddingInline: 5 }}>
                <Task />
                Sous taches
              </div>
            }
          >
            <div>
              <AddSubTask taskId={initialValues._id} taskName={initialValues.title} callBack={getSubTaskData} />
              <SubTasksList subTasks={subTasks} callBack={getSubTaskData} />
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane
            key="2"
            title={
              <div style={{ display: "flex", gap: 5, alignItems: "center", paddingInline: 5 }}>
                <FileStorage />
                Fichiers
              </div>
            }
          >
            <div>Content of Tab Panel 3</div>
          </Tabs.TabPane>
          <Tabs.TabPane
            key="3"
            title={
              <div style={{ display: "flex", gap: 5, alignItems: "center", paddingInline: 5 }}>
                <WhitePaper />
                Notes
              </div>
            }
          >
            <div>Content of Tab Panel 3</div>
          </Tabs.TabPane>
          <Tabs.TabPane
            key="4"
            title={
              <div style={{ display: "flex", gap: 5, alignItems: "center", paddingInline: 5 }}>
                <TimePlot />
                Times logs
              </div>
            }
          >
            <div>Content of Tab Panel 3</div>
          </Tabs.TabPane>
        </Tabs>
      </div>
    )
  ) : (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
      <Spin tip="Recuperation des données" loading />
    </div>
  );
}
