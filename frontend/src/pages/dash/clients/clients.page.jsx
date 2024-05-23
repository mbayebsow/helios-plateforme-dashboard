import { useEffect, useRef, useState } from "react";
import { useOutletContext, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Statistic, Grid, Space, Table, Select, Message, Drawer, Button, Popover, Input, Modal, Spin } from "@arco-design/web-react";
import { DocumentAdd, Edit, Export, FolderDetails, Search, TrashCan } from "@carbon/icons-react";
import { deleteUser, getUsers } from "../../../components/functions/users.data";
import { userColumns } from "../../../components/tables/user.columns";
import Moment from "react-moment";

var newObj = {};

export default function ClientstPage({ title }) {
  const navigate = useNavigate();
  const location = useLocation();
  const onCreate = location.pathname.includes("/create");
  const onView = location.pathname.includes("/view");
  const onEdit = location.pathname.includes("/edit");

  const [pageTitle, setPageTitle] = useOutletContext();
  const [tableEmployees, setTableEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const inputRef = useRef(null);

  const tableRows = async () => {
    const users = await getUsers();
    if (!users.success) {
      Message.error("Erreur " + users.message);
      return;
    }
    if (users === "error") return;
    let row = users.data.map((user) => {
      newObj = {
        key: user._id,
        mail: user.email,
        full_name: user.full_name,
        profile: user.profile,
        group: user.group,
        created_at: (
          <Moment locale="fr" fromNow>
            {user.created_at}
          </Moment>
        ),
        status: user.status,
        options: (
          <Button.Group>
            <Button
              icon={<Edit />}
              onClick={() => {
                navigate(`/dash/${title.toLowerCase()}/edit/${user._id}`, {
                  replace: true,
                });
              }}
            />
            <Button
              status="danger"
              icon={<TrashCan />}
              onClick={() => {
                deleteData(user._id);
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
    setTableEmployees(await tableRows());
    setLoading(false);
    return;
  };

  //TODO
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
      const deleteData = await deleteUser(id);

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
      <Drawer
        width={800}
        title={title}
        visible={onCreate || onView || onEdit}
        footer={null}
        onCancel={() => {
          setDataToTable();
          navigate(`/dash/${pageTitle.toLowerCase()}`, {
            replace: true,
          });
        }}
      >
        <Outlet />
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
              Ajouter un client
            </Button>
            <Button type="outline">
              <Export /> Exporter
            </Button>
          </Space>
        </Grid.Col>
        <Grid.Col span={12} style={{ display: "flex", justifyContent: "end", gap: 7 }}>
          <Popover position="top" trigger="click" content={<Input.Search allowClear placeholder="Enter keyword to search" style={{ width: 300 }} />}>
            <Button type="primary">
              <Search />
            </Button>
          </Popover>
          <Select
            placeholder="Filtrer par etat"
            addBefore="Status:"
            defaultValue="all"
            triggerProps={{
              autoAlignPopupWidth: false,
              autoAlignPopupMinWidth: true,
              position: "bl",
            }}
            style={{ width: 170 }}
            onChange={(value) =>
              Message.info({
                content: `You select ${value}.`,
                showIcon: true,
              })
            }
            options={[
              {
                label: "Tout",
                value: "all",
              },
              {
                label: "Active",
                value: "active",
              },
              {
                label: "Banni",
                value: "banni",
              },
              {
                label: "Suspendu",
                value: "suspendu",
              },
            ]}
          />
          <Select
            placeholder="Filtrer par client"
            addBefore="Ajouter le:"
            defaultValue="all"
            triggerProps={{
              autoAlignPopupWidth: false,
              autoAlignPopupMinWidth: true,
              position: "bl",
            }}
            style={{ width: 170 }}
            onChange={(value) =>
              Message.info({
                content: `You select ${value}.`,
                showIcon: true,
              })
            }
            options={[
              {
                label: "Tout",
                value: "all",
              },
              {
                label: "Accepter",
                value: "accepted",
              },
              {
                label: "Refuser",
                value: "declined",
              },
              {
                label: "En attente",
                value: "waiting",
              },
              {
                label: "Brouillons",
                value: "draft",
              },
            ]}
          />
        </Grid.Col>
      </Grid.Row>

      <Spin loading={loading} style={{ width: "100%" }}>
        <Table
          data={tableEmployees}
          border={{
            wrapper: true,
            headerCell: true,
          }}
          expandedRowRender={(record) => (
            <div style={{ paddingLeft: 10, display: "flex", alignItems: "center" }}>
              <div style={{ width: "100%" }}>
                <Grid.Row gutter={24}>
                  <Grid.Col span={3}>
                    <Statistic title="Projects" value={19} />
                  </Grid.Col>
                  <Grid.Col span={3}>
                    <Statistic title="Services" value={23} />
                  </Grid.Col>
                  <Grid.Col span={3}>
                    <Statistic title="Total gains" value={93} />
                  </Grid.Col>
                  <Grid.Col span={3}>
                    <Statistic title="Devis" value={50} />
                  </Grid.Col>
                  <Grid.Col span={3}>
                    <Statistic title="Factures" value={50} />
                  </Grid.Col>
                  <Grid.Col span={3}>
                    <Statistic title="Non payes" value={70} />
                  </Grid.Col>
                  <Grid.Col span={3}>
                    <Statistic title="Contrats" value={7} />
                  </Grid.Col>
                </Grid.Row>
              </div>
              <Space direction="vertical">
                <Button
                  type="primary"
                  long
                  onClick={() => {
                    navigate(`/dash/${title.toLowerCase()}/view/${record.key}`, {
                      replace: true,
                    });
                  }}
                  style={{
                    backgroundColor: "black",
                    color: "white",
                    border: "none",
                  }}
                >
                  <FolderDetails /> Details
                </Button>
                <Button
                  type="outline"
                  long
                  style={{
                    backgroundColor: "transparent",
                    color: "black",
                    border: "1px solid black",
                  }}
                >
                  <Export /> Expoter
                </Button>
              </Space>
            </div>
          )}
          columns={userColumns(inputRef)}
        />
      </Spin>
    </div>
  );
}
