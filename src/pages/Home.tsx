import NavbarRightItem from "../components/NavbarRightItem";
import Search from "../components/Search";

const Home: React.FC = () => {
  return (
    <div>
      <header className="px-10 py-20 z-1000 w-full flex justify-between items-center transition duration-500">
        <a
          className="cursor-pointer font-bold text-white tracking-wider"
          href="/"
        >
          Movie Application
        </a>
        <ul>
          <NavbarRightItem />
        </ul>
      </header>
      <Search />
    </div>
  );
};

export default Home;
