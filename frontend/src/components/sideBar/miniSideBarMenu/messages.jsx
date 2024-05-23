import { Popover } from "@arco-design/web-react";
import GetIcon from "../../getIcons";

const Content = () => {
  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      Vide1
    </div>
  );
};

export default function MessagesPopover() {
  return (
    <Popover
      position="rt"
      trigger="click"
      title="Title"
      content={Content}
    >
      <div
        style={{
          color: "white",
          display: "flex",
        }}
      >
        <GetIcon size="24" IconName={"Chat"} aria-label={"chat"} />
      </div>
    </Popover>
  );
}
