import { useEffect, useRef, useState } from "react";
import { useOutletContext, useNavigate, useLocation, Outlet } from "react-router-dom";
import {
  Space,
  Table,
  Select,
  Message,
  Drawer,
  Button,
  Input,
  Modal,
  Statistic,
  Grid,
  Spin,
} from "@arco-design/web-react";
import {
  Add,
  FolderDetails,
  DocumentAdd,
  Edit,
  Export,
  Filter,
  Share,
  TrashCan,
} from "@carbon/icons-react";
import { getEmployees, deleteEmployee } from "../../../components/functions/employees.data";
import { EmployeeColumns } from "../../../components/tables/employee.columns";

var newObj = {};

const filterContent = (
  <Space direction="vertical">
    <Input.Search allowClear placeholder="Enter keyword to search" style={{ width: "100%" }} />
    <Space>
      <Select
        placeholder="Filtrer par etat"
        addBefore="Designation:"
        defaultValue="all"
        triggerProps={{
          autoAlignPopupWidth: false,
          autoAlignPopupMinWidth: true,
          position: "bl",
        }}
        style={{ width: "100%" }}
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
        addBefore="Department:"
        defaultValue="all"
        triggerProps={{
          autoAlignPopupWidth: false,
          autoAlignPopupMinWidth: true,
          position: "bl",
        }}
        style={{ width: "100%" }}
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
    </Space>
  </Space>
);

export default function EmployeesPage({ title }) {
  const navigate = useNavigate();
  const location = useLocation();
  const onCreate = location.pathname.includes("/create");
  const onView = location.pathname.includes("/view");
  const onEdit = location.pathname.includes("/edit");

  const [pageTitle, setPageTitle] = useOutletContext();
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [tableEmployees, setTableEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const inputRef = useRef(null);

  const tableRows = async () => {
    const employees = await getEmployees();
    if (employees === "error" || !employees) {
      return;
    }
    let row = employees.data.map((employee) => {
      newObj = {
        key: employee._id,
        employee_id: employee.employee_id,
        email: employee.email || "-",
        full_name: employee.first_name + " " + employee.last_name,
        profile: employee.profile,
        designation: employee.designation,
        permissions: employee.permissions.length,
        status: employee.status,
        options: (
          <Button.Group>
            <Button
              icon={<Edit />}
              onClick={() => {
                navigate(`/dash/${title.toLowerCase()}/edit/${employee._id}`, {
                  replace: true,
                });
              }}
            />
            <Button
              status="danger"
              icon={<TrashCan />}
              onClick={() => {
                deleteData(employee._id);
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
  const deleteData = async (id) => {
    Modal.confirm({
      title: "Confirmer la suppression",
      content:
        "Êtes-vous sûr de vouloir supprimer cette entrée ? Une fois que vous avez appuyé sur le bouton de suppression, l'éléments sera immédiatement supprimés. Vous ne pouvez pas annuler cette action.",
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
      const deleteData = await deleteEmployee(id);

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
      <Modal
        title="Modal Title"
        visible={showFilterModal}
        footer={null}
        onCancel={() => {
          setShowFilterModal(false);
        }}
      >
        {filterContent}
      </Modal>

      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <Space direction="horizontal">
          <Button
            onClick={() => {
              navigate(`/dash/${pageTitle.toLowerCase()}/create`, {
                replace: true,
              });
            }}
            type="primary"
          >
            <DocumentAdd />
            Ajouter un employé
          </Button>
          <Button type="outline">
            <Share /> Invité
          </Button>
          <Button type="outline">
            <Add /> Designation
          </Button>
          <Button type="outline">
            <Add /> Departement
          </Button>
          <Button type="outline">
            <Export /> Exporter
          </Button>
        </Space>
        <div style={{ width: "fit-content" }}>
          <Button
            onClick={() => {
              setShowFilterModal(true);
            }}
            type="primary"
          >
            <Filter />
          </Button>
        </div>
      </div>
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
          columns={EmployeeColumns(inputRef)}
        />
      </Spin>
    </div>
  );
}
