import { Popover } from "@arco-design/web-react";
import { Input } from "@arco-design/web-react";
import GetIcon from "../../getIcons";
const InputSearch = Input.Search;

const Content = () => {
  return (
    <InputSearch
      searchButton="Search"
      defaultValue="Search content"
      placeholder="Enter keyword to search"
      style={{ width: 350 }}
    />
  );
};
export default function SearchPopover() {
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
        <GetIcon
          size="24"
          IconName={"Search"}
          aria-label={"Search"}
        />
      </div>
    </Popover>
  );
}
