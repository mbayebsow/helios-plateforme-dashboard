import { NavLink } from "react-router-dom";
import GetIcon from "../getIcons";
import { Menu } from "@arco-design/web-react";
import { Calendar } from "@carbon/icons-react";
const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;

const ButtonNav = ({ label, icon, link }) => {
  return (
    <NavLink style={{ display: "flex", alignItems: "center", gap: "10px" }} to={"/dash" + link} className={({ isActive }) => (isActive ? "arco-menu-item  arco-menu-selected" : "arco-menu-item ")}>
      <GetIcon size={19} IconName={icon} />
      {label}
    </NavLink>
  );
};

export default function SideNavMenu() {
  return (
    <Menu style={{ backgroundColor: "transparent" }}>
      <ButtonNav icon={"Home"} label={"Dashboard"} link={"/"} variant="activeGhost" />
      <ButtonNav label={"Projets"} icon={"IbmCloudProjects"} link={"/projets"} />
      <ButtonNav label={"Taches"} icon={"Task"} link={"/dashboard"} />
      <ButtonNav label={"Devis"} icon={"ChartCustom"} link={"/dashboard"} />
      <ButtonNav label={"Factures"} icon={"Receipt"} link={"/dashboard"} />
      <ButtonNav label={"Transactions"} icon={"Wallet"} link={"/dashboard"} />
      <ButtonNav label={"Contrats"} icon={"WhitePaper"} link={"/dashboard"} />
      <ButtonNav label={"Catalogues"} icon={"ShoppingCatalog"} link={"/dashboard"} />
      <ButtonNav label={"Commandes"} icon={"ShoppingCartPlus"} link={"/dashboard"} />
      <ButtonNav label={"Employers"} icon={"Identification"} link={"/dashboard"} />
      <ButtonNav label={"Clients"} icon={"UserMultiple"} link={"/dashboard"} />
    </Menu>
  );
}

//TODO: Changer le buttonNav en MenuItem
export function NavMenu(props) {
  return (
    <Menu {...props}>
      <ButtonNav icon={"Home"} label={"Dashboard"} link={"/"} variant="activeGhost" />
      <ButtonNav label={"Projets"} icon={"IbmCloudProjects"} link={"/projets"} />
      <ButtonNav label={"Taches"} icon={"Task"} link={"/taches"} />
      <ButtonNav label={"Devis"} icon={"ChartCustom"} link={"/devis"} />
      <ButtonNav label={"Factures"} icon={"Receipt"} link={"/factures"} />
      <ButtonNav label={"Transactions"} icon={"Wallet"} link={"/transactions"} />
      <ButtonNav label={"Contrats"} icon={"WhitePaper"} link={"/contrats"} />
      <ButtonNav label={"Catalogues"} icon={"ShoppingCatalog"} link={"/dashboard"} />
      <ButtonNav label={"Commandes"} icon={"ShoppingCartPlus"} link={"/dashboard"} />
      <ButtonNav label={"Employers"} icon={"Identification"} link={"/employes"} />
      <ButtonNav label={"Clients"} icon={"UserMultiple"} link={"/clients"} />
      <SubMenu
        key="1"
        title={
          <span>
            <Calendar />
            Navigation 1
          </span>
        }
      >
        <MenuItem key="1_1">Menu 1</MenuItem>
        <MenuItem key="1_2">Menu 2</MenuItem>
        <SubMenu key="2" title="Navigation 2">
          <MenuItem key="2_1">Menu 1</MenuItem>
          <MenuItem key="2_2">Menu 2</MenuItem>
        </SubMenu>
        <SubMenu key="3" title="Navigation 3">
          <MenuItem key="3_1">Menu 1</MenuItem>
          <MenuItem key="3_2">Menu 2</MenuItem>
          <MenuItem key="3_3">Menu 3</MenuItem>
        </SubMenu>
      </SubMenu>
    </Menu>
  );
}
