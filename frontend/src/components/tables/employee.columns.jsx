import { Avatar, Input, Space, Badge } from "@arco-design/web-react";
import { Filter, Search } from "@carbon/icons-react";

export const EmployeeColumns = (inputRef) => [
  {
    title: "ID",
    dataIndex: "employee_id",
    width: 100,
  },
  {
    title: "Nom",
    dataIndex: "full_name",
    render: (col, record, index) => (
      <Space direction="horizontal">
        <Avatar>
          <img alt="avatar" src={record.profile} />
        </Avatar>
        <Space direction="vertical" size="mini">
          <div style={{ fontSize: 15 }}>{record.full_name}</div>
          <div style={{ opacity: "50%", marginTop: -7 }}>{record.designation}</div>
        </Space>
      </Space>
    ),
    filterIcon: <Search />,
    filterDropdown: ({ filterKeys, setFilterKeys, confirm }) => {
      return (
        <div className="arco-table-custom-filter">
          <Input.Search
            ref={inputRef}
            searchButton
            placeholder="Please enter name"
            value={filterKeys[0] || ""}
            onChange={(value) => {
              setFilterKeys(value ? [value] : []);
            }}
            onSearch={() => {
              confirm();
            }}
          />
        </div>
      );
    },
    onFilter: (value, row) => {
      return value ? row.full_name.toLowerCase().indexOf(value.toLowerCase()) !== -1 : true;
    },
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => inputRef.current.focus(), 150);
      }
    },
    width: 200,
  },
  {
    title: "Email",
    dataIndex: "email",
    width: 200,
  },
  {
    title: "Permission",
    dataIndex: "permissions",
    sorter: (a, b) => a.permissions - b.permissions,
    width: 130,
  },
  {
    title: "Status",
    dataIndex: "status",
    render: (col, record, index) => <Badge status={record.status === "active" ? "success" : record.status === "banni" ? "error" : record.status === "suspendu" ? "warning" : record.status === "waiting" ? "processing" : null} text={record.status} />,
    filterIcon: <Filter />,
    filters: [
      {
        text: "Active",
        value: "active",
      },
      {
        text: "Banni",
        value: "banni",
      },
      {
        text: "Suspendu",
        value: "suspendu",
      },
      {
        text: "Waiting",
        value: "waiting",
      },
    ],
    onFilter: (value, row) => row.status.indexOf(value) > -1,
    filterMultiple: false,
    width: 100,
  },
  {
    dataIndex: "options",
    fixed: "right",
    width: 95,
  },
];
