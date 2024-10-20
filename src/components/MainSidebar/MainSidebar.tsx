import { Sidebar } from "flowbite-react";
import { MdOutlinePeopleOutline, MdOutlineMoney, MdOutlineDashboard, MdPeopleOutline, MdOutlinePersonAdd, MdOutlineArrowForward, MdOutlineArrowBack, MdOutlineArticle } from "react-icons/md"
import { Link } from "react-router-dom";
export default function MainSidebar() {

  return (
    <Sidebar className="w-full h-full rounded-none  border-e-2" aria-label="Default sidebar">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item icon={MdOutlineDashboard}>
            <Link to='/app'>Dashboard</Link>
          </Sidebar.Item>
          <Sidebar.Collapse icon={MdPeopleOutline} label="Patients">
            <Sidebar.Item>
              <Link className="flex items-center" to='all-patients'><MdOutlinePeopleOutline className="text-2xl" /> <span className="ms-2">All patients</span></Link>
            </Sidebar.Item>
            <Sidebar.Item>
              <Link className="flex items-center" to='add-new'><MdOutlinePersonAdd className="text-2xl" /> <span className="ms-2">New Admission</span></Link>
            </Sidebar.Item>
          </Sidebar.Collapse>
          <Sidebar.Collapse icon={MdOutlineMoney} label="Finance">
            <Sidebar.Item>
              <Link className="flex items-center" to='income'> <MdOutlineArrowForward className="text-2xl" /> <span className="ms-2">Income</span></Link>
            </Sidebar.Item>
            <Sidebar.Item>
              <Link className="flex items-center" to='expenses'> <MdOutlineArrowBack className="text-2xl" /> <span className="ms-2">Expenses</span></Link>
            </Sidebar.Item>
            <Sidebar.Item>
              <Link className="flex items-center" to='invoices'><MdOutlineArticle className="text-2xl" /><span className="ms-2">Invoices</span></Link>
            </Sidebar.Item>
          </Sidebar.Collapse>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
