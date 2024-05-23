import { useEffect, useRef, useState } from "react";
import { useOutletContext, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Grid, Space, Table, Message, Drawer, Button, Spin, Modal } from "@arco-design/web-react";
import { DocumentAdd, Export, List, Edit, Pin, TrashCan, View, Roadmap, Calendar } from "@carbon/icons-react";

import { getTasks, deleteTask } from "../../../components/functions/tasks.data";
import { taskColums } from "../../../components/tables/task.colums";

export default function TaskPage({ title }) {
  const [pageTitle, setPageTitle] = useOutletContext();
  const location = useLocation();
  const navigate = useNavigate();
  const onCreate = location.pathname.includes("/create");
  const onView = location.pathname.includes("/view");
  const onEdit = location.pathname.includes("/edit");

  const [drawerTitle, setDrawerTitle] = useState("");
  const [tableData, setTableData] = useState([]);
  const [loadingTable, setLoadingTable] = useState(true);
  const inputRef = useRef(null);

  var newObj = {};
  const tableRows = async () => {
    const response = await getTasks();
    if (!response.success) {
      Message.error("Erreur " + response.message);
      return;
    }
    if (response === "error") return;
    let row = response.data.map((d) => {
      newObj = {
        key: d._id,
        deadline: d.deadline,
        title: d.title,
        assigned_to: d.assigned_to,
        project_id: d.project_id,
        priority: d.priority,
        status: d.status,
        options: (
          <Button.Group>
            <Button
              icon={<View />}
              onClick={() => {
                navigate(`/dash/${title.toLowerCase()}/view/${d._id}`, {
                  replace: true,
                });
              }}
            />
            <Button
              icon={<Edit />}
              onClick={() => {
                navigate(`/dash/${title.toLowerCase()}/edit/${d._id}`, {
                  replace: true,
                });
              }}
            />
            <Button
              status="danger"
              icon={<TrashCan />}
              onClick={() => {
                deleteData(d._id);
              }}
            />
          </Button.Group>
        ),
      };
      return newObj;
    });
    return row;
  };

  const setDataToTable = async () => {
    setLoadingTable(true);
    const data = await tableRows();
    setTableData(data);
    setLoadingTable(false);
    return;
  };

  const deleteData = async (id) => {
    Modal.confirm({
      title: "Confirmer la suppression",
      content: "Êtes-vous sûr de vouloir supprimer cette entrée ? Une fois que vous avez appuyé sur le bouton de suppression, l'éléments sera immédiatement supprimés. Vous ne pouvez pas annuler cette action.",
      okButtonProps: {
        status: "danger",
      },
      onOk: () => {
        return deleteAction();
      },
    });

    const deleteAction = async () => {
      Message.loading({
        id: "deleteTask",
        content: "Supression en cour",
      });
      const deleteData = await deleteTask(id);

      if (deleteData?.success) {
        Message.success({
          id: "deleteTask",
          content: deleteData.message,
        });
        setDataToTable();
        return;
      } else {
        Message.error({
          id: "deleteTask",
          content: deleteData.message,
        });
        return;
      }
    };
  };

  useEffect(() => {
    setPageTitle(title);
    setDataToTable();
  }, []);

  return (
    <div>
      <Drawer
        width={800}
        title={drawerTitle}
        visible={onCreate || onView || onEdit}
        footer={null}
        onCancel={() => {
          navigate(`/dash/${pageTitle.toLowerCase()}`, {
            replace: true,
          });
        }}
      >
        <Outlet context={[setDrawerTitle, setDataToTable]} />
      </Drawer>

      <Grid.Row style={{ marginBottom: 20 }}>
        <Grid.Col span={12}>
          <Space direction="horizontal" size="mini">
            <Button
              onClick={() => {
                navigate(`/dash/${pageTitle.toLowerCase()}/create`, {
                  replace: true,
                });
              }}
              type="primary"
            >
              <DocumentAdd />
              Ajouter une tache
            </Button>
            <Button type="outline">
              <Export /> Exporter
            </Button>
          </Space>
        </Grid.Col>
        <Grid.Col span={12} style={{ display: "flex", justifyContent: "end", gap: 5 }}>
          <Button>
            <List />
          </Button>
          <Button>
            <Roadmap />
          </Button>
          <Button>
            <Calendar />
          </Button>
          <Button>
            <Pin />
          </Button>
        </Grid.Col>
      </Grid.Row>
      <Spin loading={loadingTable} style={{ width: "100%" }}>
        <Table
          data={tableData}
          border={{
            wrapper: true,
            headerCell: true,
          }}
          columns={taskColums(inputRef)}
        />
      </Spin>
    </div>
  );
}
