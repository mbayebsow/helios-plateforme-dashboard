import * as icon from "@carbon/icons-react";

export default function GetIcon({ IconName, size, className = "" }) {
  const Icon = icon[IconName];
  return <Icon size={size} className={className} />;
}
