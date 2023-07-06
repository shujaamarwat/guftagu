import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { ACCESS_TOKEN_KEY, auth } from "../../client/firebase";
import { menuOptions } from "../Shared";
import "./styles.scss";

const SidebarButton = () => {
  return (
    <button
      data-drawer-target="default-sidebar"
      data-drawer-toggle="default-sidebar"
      aria-controls="default-sidebar"
      type="button"
      className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
    >
      <span className="sr-only">Open sidebar</span>
      <svg
        className="w-6 h-6"
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          clipRule="evenodd"
          fillRule="evenodd"
          d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
        ></path>
      </svg>
    </button>
  );
};

const SidebarMenu = () => {
  const navigate = useNavigate();

  const ChatBadge = () => {
    return <span className="chat-badge px-1 rounded-full">88</span>;
  };

  const logoutAction = (e) => {
    e.preventDefault();
    console.log("Here");
    // logout(e)
    signOut(auth)
      .then(function () {
        navigate("/login");
        console.log("Sign Out Successful");
      })
      .catch(function (error) {
        console.log("Sign Out NOT Successful: ", error);
      });
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  };

  const MenuOption = (props) => {
    return (
      <li>
        <NavLink
          className="navbar-brand menu-item space-y-1"
          to={props.action}
          onClick={props.heading === "Logout" ? logoutAction : undefined}
        >
          <div className="flex">
            <FontAwesomeIcon icon={props.icon} className="icon" />
            {props.heading === "Chats" && <ChatBadge />}
          </div>
          <span className="whitespace-nowrap">{props.heading}</span>
        </NavLink>
      </li>
    );
  };

  const FullMenu = () => {
    return menuOptions.map((op, i) => {
      return (
        <MenuOption
          heading={op.heading}
          icon={op.icon}
          action={op.action}
          key={i}
        />
      );
    });
  };

  return (
    <aside
      id="default-sidebar"
      className="fixed top-0 left-0 w-30 h-screen transition-transform -translate-x-full sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="h-full p-4 overflow-y-auto bg-gray-800">
        <ul className="space-y-5">
          <FullMenu />
        </ul>
      </div>
    </aside>
  );
};

export const Navbar = () => {
  return (
    <>
      <SidebarButton />
      <SidebarMenu />
    </>
  );
};
