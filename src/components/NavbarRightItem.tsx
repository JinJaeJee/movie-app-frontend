import { NAV_RIGHTS } from "../constants/data/navbar";

const NavbarRightItem = () => {
  return (
    <div>
      {NAV_RIGHTS.map((link, index) => (
        <li key={index}>
          <a href={link.url}>{link.title}</a>
        </li>
      ))}
    </div>
  );
};

export default NavbarRightItem;
