import React, { useState } from "react";
import { Avatar, Button, Space, List, Divider, Message, Typography } from "@arco-design/web-react";
import { Checkmark, TrashCan, InProgressWarning, InProgressError, Close } from "@carbon/icons-react";
import Moment from "react-moment";

import { setCompleted, deleteSubTask } from "../functions/subTasks.data";

export default function SubTasksList({ subTasks, callBack }) {
  const [completedLonding, setcompletedLonding] = useState(false);

  const changeCompletedSubTask = async (id, completed) => {
    setcompletedLonding(id + "c");
    const addData = await setCompleted(id, completed);

    if (addData) {
      Message.success(addData?.message);
      if (callBack) callBack();
    }
    setcompletedLonding(false);
    return;
  };

  const delSubTask = async (id) => {
    setcompletedLonding(id + "d");
    const delData = await deleteSubTask(id);

    if (delData) {
      Message.success(delData?.message);
      if (callBack) callBack();
    }
    setcompletedLonding(false);
    return;
  };

  return (
    <List
      className="list-demo-actions"
      style={{ backgroundColor: "white" }}
      dataSource={subTasks}
      render={(subTask, index) => (
        <List.Item
          key={index}
          actions={[
            <Button.Group>
              <Button
                onClick={() => {
                  delSubTask(subTask._id);
                }}
                loading={completedLonding === subTask._id + "d"}
                type="text"
                status="danger"
                icon={<TrashCan />}
                iconOnly
              />
              <Button
                onClick={() => {
                  changeCompletedSubTask(subTask._id, subTask.is_completed ? false : true);
                }}
                loading={completedLonding === subTask._id + "c"}
                status={subTask.is_completed ? "success" : "danger"}
                icon={subTask.is_completed ? <Checkmark /> : <Close />}
                iconOnly
              />
            </Button.Group>,
          ]}
        >
          <List.Item.Meta
            avatar={<Avatar>AB</Avatar>}
            title={<Typography.Text delete={subTask.is_completed}>{subTask.title}</Typography.Text>}
            description={
              <Space split={<Divider type="vertical" />}>
                <div style={{ width: 200 }}>
                  <Typography.Text delete={subTask.is_completed} style={{ width: 200 }}>
                    {subTask.description}
                  </Typography.Text>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <InProgressWarning />
                  <Moment date={subTask.start_date} format="dddd D MMM" />
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <InProgressError />
                  <Moment date={subTask.deadline} format="dddd D MMM" />
                </div>
              </Space>
            }
          />
        </List.Item>
      )}
    />
  );
}
