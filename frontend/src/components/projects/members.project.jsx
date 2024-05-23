import { Avatar, Divider, Grid, Space, List } from "@arco-design/web-react";
import { CloseOutline, TrashCan } from "@carbon/icons-react";
import React from "react";

function Members({ member }) {
  return (
    <>
      <Grid.Row>
        <Grid.Col span={8}>
          <Space>
            <Avatar>
              <img src={member.profile} alt="avatar" />
            </Avatar>
            <div>
              <div>{member.first_name + " " + member.last_name}</div>
              <div>{member.designation}</div>
            </div>
          </Space>
        </Grid.Col>
        <Grid.Col span={8}>Taux horaire: 0</Grid.Col>
        <Grid.Col span={8}>Taches:</Grid.Col>
      </Grid.Row>
      <Divider />
    </>
  );
}
export default function MembersProject({ members }) {
  return (
    <div>
      <List
        dataSource={members}
        render={(member, index) => (
          <List.Item
            key={index}
            actions={[
              <span className="list-demo-actions-icon">
                <CloseOutline />
              </span>,
              <span className="list-demo-actions-icon">
                <TrashCan />
              </span>,
            ]}
          >
            <List.Item.Meta
              avatar={
                <Avatar>
                  <img src={member.profile} alt="avatar" />
                </Avatar>
              }
              title={
                <Space split={<Divider type="vertical" />}>
                  <div>{member.first_name + " " + member.last_name}</div>
                  <div>{member.designation}</div>
                </Space>
              }
              description={
                <Space split={<Divider type="vertical" />}>
                  <div>
                    Taux: <strong>0h</strong>
                  </div>
                  <div>
                    Taches: <strong>20</strong>
                  </div>
                  <div>
                    Taches fini: <strong>6</strong>
                  </div>
                  <div>
                    Taches a faire: <strong>14</strong>
                  </div>
                </Space>
              }
            />
          </List.Item>
        )}
      />
    </div>
  );
}
