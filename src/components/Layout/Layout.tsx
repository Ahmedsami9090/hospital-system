import MainNavbar from '../MainNavbar/MainNavbar'
import { Outlet } from 'react-router-dom'
import MainSidebar from '../MainSidebar/MainSidebar'
import useWindowWidth from '../../hooks/useWindowWidth'
const Layout = () => {
    const screenWidth = useWindowWidth()
    return (
        <>
            <div className='h-screen flex flex-col'>
                <div>
                <MainNavbar />
                </div>
                <div className='flex-grow flex gap-4 '>
                    {screenWidth! > 766 ?
                        <div className='w-1/6'>
                            <MainSidebar />
                        </div>
                        :
                        ''
                    }
                    <div className={`${screenWidth! > 766 ? 'w-5/6' : 'w-full'} py-3 px-5`}>
                        <Outlet />
                    </div>
                </div>
                <div className='p-8 bg-gray-100 border-t-2'></div>
            </div>

        </>
    )
}
export default Layout