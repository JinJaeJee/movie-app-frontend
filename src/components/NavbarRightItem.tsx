import { useState } from "react";
import { NAV_RIGHTS } from "../constants/data/navbar";
import { FaRegStar } from "react-icons/fa";

const NavbarRightItem = () => {
  const [isUserLogin, setIsUserLogin] = useState(false);

  const handleLogout = () => {
    setIsUserLogin(!isUserLogin);
  };
  return (
    <div>
      {isUserLogin ? (
        <ul>
          {NAV_RIGHTS.map((link, index) => (
            <li key={index}>
              <a
                className="cursor-pointer font-bold text-white tracking-wider "
                href={link.url}
              >
                {link.title}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex gap-10">
          <a
            className="cursor-pointer font-bold text-white tracking-wider"
            href="#"
          >
            Fullname
          </a>
          <div className="text-white">Picture</div>
          <button className="cursor-pointer font-bold text-white tracking-wider">
            <FaRegStar />
          </button>
          <button
            className="cursor-pointer font-bold text-white tracking-wider"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default NavbarRightItem;
