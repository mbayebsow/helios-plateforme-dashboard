import { Avatar, Badge, Input, Select, Tooltip, Typography } from "@arco-design/web-react";
import { Filter, Search } from "@carbon/icons-react";
import Moment from "react-moment";
import { humanize, taskPriority, taskStatus } from "../../lib/config";

import { setStatus } from "../functions/tasks.data";

export const taskColums = (inputRef) => [
  {
    title: "Taches",
    dataIndex: "title",
    render: (col, record, index) => (
      <Tooltip position="right" content={"Priorité: " + record.priority}>
        <Badge
          status={record.priority === "faible" ? "success" : record.priority === "moyen" ? "default" : record.priority === "important" ? "error" : null}
          text={<Typography.Text delete={record.status === "terminer"}>{humanize(record.title)}</Typography.Text>}
        />
      </Tooltip>
    ),
    filterIcon: <Filter />,
    filters: taskPriority,
    onFilter: (value, row) => row.priority.indexOf(value) > -1,
    filterMultiple: false,
    width: 200,
  },
  {
    title: "Assigner a",
    dataIndex: "assigned_to",
    render: (col, record, index) => (
      <Tooltip position="right" content={record.assigned_to?.first_name + " " + record.assigned_to?.last_name}>
        <Avatar>
          <img alt="avatar" src={record.assigned_to?.profile} />
        </Avatar>
      </Tooltip>
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
      return value ? row.assigned_to.first_name.toLowerCase().indexOf(value.toLowerCase()) !== -1 : true;
    },
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => inputRef.current.focus(), 150);
      }
    },
    width: 120,
  },
  {
    title: "Deadline",
    dataIndex: "deadline",
    render: (col, record, index) => (record.deadline ? <Moment fromNow>{record.deadline}</Moment> : "- - -"),
    width: 120,
  },
  {
    title: "projet",
    dataIndex: "project_id",
    render: (col, record, index) => record.project_id?.project_name,
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
      return value ? row.project_id?.project_name.toLowerCase().indexOf(value.toLowerCase()) !== -1 : true;
    },
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => inputRef.current.focus(), 150);
      }
    },
    width: 200,
  },
  {
    title: "Etat",
    dataIndex: "status",
    render: (col, record, index) => (
      <Select
        placeholder="Etat de la tache"
        defaultValue={record.status}
        onChange={(value) => {
          setStatus(record.key, value);
        }}
        options={taskStatus}
      >
        {taskStatus.map((option, index) => (
          <Select.Option key={index} value={option.value}>
            <Badge status={option.status} text={option.text} />
          </Select.Option>
        ))}
      </Select>
    ),
    filterIcon: <Filter />,
    filters: taskStatus,
    onFilter: (value, row) => row.status.indexOf(value) > -1,
    filterMultiple: false,
    fixed: "right",
    width: 140,
  },
  {
    dataIndex: "options",
    fixed: "right",
    width: 130,
  },
];
