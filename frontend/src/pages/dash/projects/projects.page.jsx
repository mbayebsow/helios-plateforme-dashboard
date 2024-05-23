import { useEffect, useRef, useState } from "react";
import { useOutletContext, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Grid, Space, Table, Message, Drawer, Button, Spin, Modal } from "@arco-design/web-react";
import { Box, DocumentAdd, Export, List, Edit, Pin, TrashCan, View } from "@carbon/icons-react";

import { getProjects, deleteProject } from "../../../components/functions/projects.data";
import { projectColumns } from "../../../components/tables/project.columns";

var newObj = {};

export default function ProjectsPage({ title }) {
  const [pageTitle, setPageTitle] = useOutletContext();
  const location = useLocation();
  const navigate = useNavigate();
  const onCreate = location.pathname.includes("/create");
  const onView = location.pathname.includes("/view");
  const onEdit = location.pathname.includes("/edit");

  const [drawerTitle, setDrawerTitle] = useState("");
  const [tableDatas, setTableDatas] = useState([]);
  const [loadingTable, setLoadingTable] = useState(true);
  const inputRef = useRef(null);

  const tableRows = async () => {
    const response = await getProjects();
    if (!response.success) {
      Message.error("Erreur " + response.message);
      return;
    }
    if (response === "error") return;
    let row = response.data.map((d) => {
      newObj = {
        key: d._id,
        project_name: d.project_name,
        members: d.members,
        deadline: d.deadline,
        client: d.client_id,
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
    setTableDatas(data);
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
        id: "deleteEmployee",
        content: "Supression en cour",
      });
      const deleteData = await deleteProject(id);

      if (deleteData?.success) {
        Message.success({
          id: "deleteEmployee",
          content: deleteData.message,
        });
        setDataToTable();
        return;
      } else {
        Message.error({
          id: "deleteEmployee",
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
              Ajouter un projet
            </Button>
            <Drawer
              width={800}
              title={drawerTitle}
              visible={onCreate || onView || onEdit}
              footer={null}
              onCancel={() => {
                setDataToTable();
                setDrawerTitle("");
                navigate(`/dash/${pageTitle.toLowerCase()}`, {
                  replace: true,
                });
              }}
            >
              <Outlet context={[setDrawerTitle]} />
            </Drawer>
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
            <Box />
          </Button>
          <Button>
            <Pin />
          </Button>
        </Grid.Col>
      </Grid.Row>
      <Spin loading={loadingTable} style={{ width: "100%" }}>
        <Table
          data={tableDatas}
          border={{
            wrapper: true,
            headerCell: true,
          }}
          scroll={{
            x: 1200,
          }}
          columns={projectColumns(inputRef)}
        />
      </Spin>
    </div>
  );
}
