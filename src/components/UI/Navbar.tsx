import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { NAV_LINKS } from "../../lib/constants";
import { handleNavigationScroll } from "../../lib/helpers";
import { NavItem } from "../../lib/types";
import HeaderSettings from "./HeaderSettings";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (scrollTo?: string, path?: string, isLink = false) => {
    if (scrollTo) handleNavigationScroll(scrollTo, navigate);
    if (isLink && path) navigate(path);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const renderNavItem = (
    { name, scrollTo, path, isLink }: NavItem,
    index: number
  ) => {
    return isLink ? (
      <li key={index}>
        <NavLink
          className={({ isActive }) =>
            isActive ? "nav-item !text-accent" : "nav-item"
          }
          onClick={(e) => {
            e.preventDefault();
            handleNavClick(undefined, path, true);
          }}
          to={path}
        >
          {name.toUpperCase()}
        </NavLink>
      </li>
    ) : (
      <li key={index}>
        <button
          className="nav-item-subpage"
          onClick={() => handleNavClick(scrollTo)}
        >
          {name.toUpperCase()}
        </button>
      </li>
    );
  };

  return (
    <nav className="container">
      <div className="flex flex-wrap items-center justify-between mx-auto">
        <button
          type="button"
          onClick={toggleMenu}
          className="inline-flex items-center p-1 w-10 h-10 justify-center text-sm transition-all duration-300 cursor-pointer text-text-primary rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-accent dark:hover:bg-gray-700 ml-auto"
          aria-controls="navbar-default"
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only">Open main menu</span>
          <Bars3Icon className="h-10 w-10 stroke-current" />
        </button>

        {/* desktop */}
        <div className="hidden w-full lg:block" id="navbar-default">
          <ul className="flex flex-col border border-gray-100 lg:flex-row lg:justify-between lg:items-center lg:gap-8 lg:border-0">
            {NAV_LINKS.map(renderNavItem)}
          </ul>
        </div>

        {/* mobile */}
        {isMenuOpen && (
          <>
            {/* backdrop */}
            <div
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setIsMenuOpen(false)}
            ></div>

            {/* menu */}
            <div
              className={`overflow-y-auto fixed top-0 z-50 right-0 h-full min-w-[320px] w-1/2 bg-primary transform transition-all duration-300 ease-in-out lg:hidden pt-6 flex flex-col ${
                isMenuOpen ? "translate-x-0" : "translate-x-[360px]"
              }`}
            >
              <button
                type="button"
                onClick={() => setIsMenuOpen(false)}
                className="inline-flex items-center p-1 w-10 h-10 justify-center text-sm transition-all duration-300 cursor-pointer text-text-primary rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-accent dark:hover:bg-gray-700 ml-auto mr-4 sm:mr-8"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-10 w-10 stroke-current" />
              </button>
              <ul className="flex flex-col p-4 space-y-4">
                {NAV_LINKS.map(renderNavItem)}
              </ul>
              <HeaderSettings className="flex flex-col lg:hidden items-start ps-4" />
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
