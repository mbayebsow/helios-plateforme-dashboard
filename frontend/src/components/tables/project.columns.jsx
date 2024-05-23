import { Avatar, Progress, Badge, Input, Space } from "@arco-design/web-react";
import { Filter, Search } from "@carbon/icons-react";
import Moment from "react-moment";
import { humanize } from "../../lib/config";
import { projectStatue } from "../../lib/config";

export const projectColumns = (inputRef) => [
  {
    title: "Projet",
    dataIndex: "project_name",
    filterIcon: <Search />,
    filterDropdown: ({ filterKeys, setFilterKeys, confirm }) => {
      return (
        <div className="arco-table-custom-filter">
          <Input.Search
            ref={inputRef}
            searchButton
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
      return value ? row.project_name.toLowerCase().indexOf(value.toLowerCase()) !== -1 : true;
    },
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => inputRef.current.focus(), 150);
      }
    },
    width: 200,
  },
  {
    title: "Membres",
    dataIndex: "members",
    width: 150,
    render: (col, record, index) => (
      <Avatar.Group size={35} style={{ zIndex: 0 }}>
        {record.members.map((member, i) => (
          <Avatar key={i}>
            <img src={member.profile} alt="Avatar" />
          </Avatar>
        ))}
      </Avatar.Group>
    ),
    filterIcon: <Search />,
    filterDropdown: ({ filterKeys, setFilterKeys, confirm }) => {
      return (
        <div className="arco-table-custom-filter">
          <Input.Search
            ref={inputRef}
            searchButton
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
      return value ? row.members.map((e) => e.first_name.toLowerCase()).indexOf(value.toLowerCase()) !== -1 : true;
    },
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => inputRef.current.focus(), 150);
      }
    },
  },
  {
    title: "Deadline",
    dataIndex: "deadline",
    width: 150,
    render: (col, record, index) => (record.deadline ? <Moment fromNow>{record.deadline}</Moment> : "- - -"),
  },
  {
    title: "Client",
    dataIndex: "client_id",
    width: 250,
    render: (col, record, index) => (
      <Space direction="horizontal">
        <Avatar>
          <img alt="avatar" src={record.client?.profile} />
        </Avatar>
        <Space direction="vertical" size="mini">
          <div style={{ fontSize: 15 }}>{record.client?.full_name}</div>
          <div style={{ opacity: "50%", marginTop: -7, fontSize: 11 }}>{record.client?.email}</div>
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
      return value ? row.client.full_name.toLowerCase().indexOf(value.toLowerCase()) !== -1 : true;
    },
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => inputRef.current.focus(), 150);
      }
    },
  },
  {
    title: "Progression",
    dataIndex: "progerss",
    with: 200,
    render: (col, record, index) => <Progress percent={50} size="large" animation width={300} />,
  },
  {
    title: "Etat",
    dataIndex: "status",
    render: (col, record, index) => <Badge status={record.status === "terminer" ? "success" : record.status === "suspendu" ? "warning" : record.status === "en_cours" ? "processing" : null} text={humanize(record.status)} />,
    filterIcon: <Filter />,
    filters: projectStatue,
    onFilter: (value, row) => row.status.indexOf(value) > -1,
    filterMultiple: false,
    width: 140,
  },
  {
    dataIndex: "options",
    fixed: "right",
    width: 130,
  },
];
