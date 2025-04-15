import Image from "next/image"
import Link from "next/link"
import { CiLogout } from "react-icons/ci"
import { SidebarItem } from "./SidebarItem"
import { IoBasketOutline, IoCalendarOutline, IoCheckboxOutline, IoCodeWorking, IoHomeOutline, IoListOutline, IoPersonOutline } from "react-icons/io5"
import { auth } from "@/auth/auth"
import { LogoutButton } from "./LogoutButton"


const menuItems = [
  {
    icon: <IoCalendarOutline />,
    title: 'Dashboard',
    path: '/dashboard'
  },
  {
    icon: <IoCheckboxOutline />,
    title: 'Rest TODOS',
    path: '/dashboard/rest-todos'
  },
  {
    icon: <IoListOutline />,
    title: 'Server Actions',
    path: '/dashboard/server-actions'
  },
  {
    icon: <IoCodeWorking />,
    title: 'Cookies',
    path: '/dashboard/cookies'
  },
  {
    icon: <IoBasketOutline />,
    title: 'Products',
    path: '/dashboard/products'
  },
  {
    icon: <IoPersonOutline />,
    title: 'Perfil',
    path: '/dashboard/profile'
  },
]

export const Sidebar = async() => {

  const sesion = await auth();

  const avatarURL = ( sesion?.user?.image )
    ?  sesion.user.image
    : 'https://tailus.io/sources/blocks/stats-cards/preview/images/second_user.webp';

  const userName = sesion?.user?.name ?? 'No Name';
  const userRoles = sesion?.user?.roles ?? ['client'];

  return (
    <aside className="fixed z-10 top-0 left-0 h-screen w-[250px] min-w-[250px] overflow-y-auto bg-white border-r px-6 pb-3 flex flex-col justify-between">

        <div>
          <div className="-mx-6 px-6 py-4">
           
          <Link href="/dashboard" title="home">
            <div className="text-4xl text-blue-600">
              <IoHomeOutline />
            </div>
          </Link>

          </div>

          <div className="mt-8 text-center">
            {/* Next/Image */}
            <Image src={ avatarURL } 
            alt="" 
            className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
            width={100}
            height={100}
            />
              <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">{userName}</h5>
              <span className="hidden text-gray-400 lg:block capitalize">
                { userRoles.join(',') }
              </span>
          </div>

          <ul className="space-y-2 tracking-wide mt-8">
            {
              menuItems.map( item => (
                <SidebarItem key={ item.path } {...item} />
              ) )
            }
          </ul>
        </div>

        <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
          <LogoutButton />
        </div>
      </aside>

  )
}
