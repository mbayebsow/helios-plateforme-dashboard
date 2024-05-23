import { Popover, Avatar, Button, Grid, Space } from "@arco-design/web-react";
import GetIcon from "../../getIcons";
import { Logout, Settings, User } from "@carbon/icons-react";
import { logoutFunc } from "../../functions/auth.func";
import UseSession from "../../../stores/session.store";

const UserProfile = () => {
  const { state, setSession } = UseSession();

  const logout = async () => {
    const logout = await logoutFunc();
    console.log(logout);
    if (logout) setSession();
  };

  return (
    <Space size="large" direction="vertical">
      <Grid.Row gutter={24}>
        <Grid.Col span={8}>
          <Avatar>
            <img alt="profile" src={state.user?.data?.profile} />
          </Avatar>
        </Grid.Col>
        <Grid.Col span={16}>
          <div>{state.user?.data?.first_name}</div>
          <div>{state.user?.data?.last_name}</div>
        </Grid.Col>
      </Grid.Row>

      <Space direction="vertical">
        <Button>
          <User size={15} /> Mon profiles
        </Button>
        <Button>
          <Settings size={15} /> Parametres
        </Button>
        <Button>Link</Button>
      </Space>

      <Button
        onClick={() => {
          logout();
        }}
      >
        <Logout size={15} /> Deconnecter
      </Button>
    </Space>
  );
};
export default function AccountPopover() {
  return (
    <Popover position="rt" trigger="click" title="Title" content={UserProfile}>
      <div
        style={{
          color: "white",
          display: "flex",
        }}
      >
        <GetIcon size="24" IconName={"UserAvatar"} aria-label={"UserAvatar"} />
      </div>
    </Popover>
  );
}
