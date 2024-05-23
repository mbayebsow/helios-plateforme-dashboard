import { Popover, Badge } from "@arco-design/web-react";
import GetIcon from "../../getIcons";

const Content = () => {
  return <div className="flex w-full max-w-sm items-center space-x-2">Vide1</div>;
};

export default function NotificationsPopover() {
  return (
    <Popover position="rt" trigger="click" title="Title" content={Content}>
      <div
        style={{
          color: "white",
          display: "flex",
        }}
      >
        <Badge count={9} dotStyle={{ height: 15, with: 15, lineHeight: "normal", fontSize: 10, padding: 0, boxShadow: "none" }}>
          <GetIcon size="24" IconName={"Notification"} aria-label={"Notification"} />
        </Badge>
      </div>
    </Popover>
  );
}
