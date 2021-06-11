import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { BsLayoutTextSidebarReverse} from "react-icons/bs";
import { IoEarthOutline } from "react-icons/io5";

function NavBar(){
return(
    <ProSidebar collapsed={true}>
  <Menu iconShape="square">
    <MenuItem icon={<BsLayoutTextSidebarReverse  size="1.5em" color='white'/>}>My Journals</MenuItem>
    <SubMenu title="Explore" icon={<IoEarthOutline size="1.8em" color='white'/>}>
      <MenuItem>Component 1</MenuItem>
      <MenuItem>Component 2</MenuItem>
    </SubMenu>
  </Menu>
</ProSidebar>
)
}
export default NavBar