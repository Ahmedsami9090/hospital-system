import { Button, Navbar } from "flowbite-react";
import useWindowWidth from "../../hooks/useWindowWidth";
import { Link, useNavigate } from "react-router-dom";
import reduxStore from "../../lib/redux/reduxStore";
import { useDispatch, useSelector } from "react-redux";
import { loggedOutUser } from "../../lib/redux/authSlice";
export default function MainNavbar() {
  const sharedData = useSelector((state: ReturnType<typeof reduxStore.getState>) => {
    return state.authSlice
  })
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const screenWidth = useWindowWidth()
  const handleLogout = () => {
    dispatch(loggedOutUser())
    navigate('/', {replace: true})
  }
  return (
    <Navbar fluid className="border-b-2 py-5 bg-gray-100">
      <Navbar.Brand className="flex w-full md:w-fit justify-center">
        <img src={sharedData.userHospitalLogo} className="mr-3 h-9 sm:h-16" alt="hospital logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">{sharedData.userHospital}</span>
      </Navbar.Brand>
      <div className="flex justify-between mt-5 md:mt-0 w-full md:w-fit md:order-2">
        <Button onClick={handleLogout} color={'light'}>Logout</Button>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        {screenWidth! >= 766 ?
          null
          :
          <>
            <Link to="/app" className="cursor-pointer">Dashboard</Link>
            <Link to="all-patients" className="cursor-pointer">Patients</Link>
            <Link to="income" className="cursor-pointer">Finance</Link>
          </>
        }
      </Navbar.Collapse>
    </Navbar>
  );
}
