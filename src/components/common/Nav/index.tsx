import { LiaHomeSolid } from "react-icons/lia";
import { IoChatbubblesSharp } from "react-icons/io5";
import { FaCirclePlus } from "react-icons/fa6";
import { IoMdSearch } from "react-icons/io";
import { BsFillPersonFill } from "react-icons/bs";
import { NavLink } from "react-router-dom";

const navItem = [
  { id: 1, path: "/home", icon: <LiaHomeSolid size={25} /> },
  {
    id: 2,
    path: "/chat",
    icon: <IoChatbubblesSharp size={25} />,
  },
  { id: 3, path: "/report/create", icon: <FaCirclePlus size={25} /> },
  { id: 4, path: "/search", icon: <IoMdSearch size={25} /> },
  {
    id: 5,
    path: "/mypage",
    icon: <BsFillPersonFill size={25} />,
  },
];

const Nav = () => {
  return (
    <nav className="flex justify-evenly items-center max-w-default m-auto w-full h-14 fixed bottom-0 left-0 right-0">
      {navItem.map((nav) => (
        <NavLink
          key={nav.id}
          to={nav.path}
          className={({ isActive }) =>
            isActive ? "text-defaultColor" : "text-gray3"
          }
        >
          {nav.icon}
        </NavLink>
      ))}
    </nav>
  );
};

export default Nav;
