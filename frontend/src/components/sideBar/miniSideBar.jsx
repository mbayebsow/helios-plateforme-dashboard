import { Space } from "@arco-design/web-react";
import SearchPopover from "./miniSideBarMenu/search";
import NotificationsPopover from "./miniSideBarMenu/notifications";
import MessagesPopover from "./miniSideBarMenu/messages";
import ApplicationsPopover from "./miniSideBarMenu/applications";
import HelpPopover from "./miniSideBarMenu/help";
import AccountPopover from "./miniSideBarMenu/account";

export default function MiniSideBar() {
  return (
    <div
      style={{
        backgroundColor: "black",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Space
        direction="vertical"
        size={"large"}
        style={{ marginTop: 20 }}
      >
        <SearchPopover />
        <NotificationsPopover />
        <MessagesPopover />
        <ApplicationsPopover />
      </Space>
      <Space
        direction="vertical"
        size={"large"}
        style={{ marginBottom: 20 }}
      >
        <HelpPopover />
        <AccountPopover />
      </Space>
    </div>
  );
}
