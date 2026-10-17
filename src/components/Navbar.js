import React, {useState, createElement} from "react";
import { content } from "../Content";
import { HiOutlineMenu } from "react-icons/hi";
import { useAuth } from "../context/AuthContext";

function Navbar() {
    const { nav } = content;
    const [showMenu, setShowMenu] = useState(false);
    const [active, setActive] = useState(0);
    const { isLoggedIn } = useAuth();
  return (
    <div className="w-full flex justify-center">
      <div
        className={`sm:cursor-pointer fixed ${isLoggedIn ? "top-[56px]" : "top-7"} left-[38px] z-[999] rounded-xl bg-[#f4e9ee] p-[10px] text-[#6f3c61] transition-colors hover:bg-[#ecdce5]`}
        onClick={() => setShowMenu(!showMenu)}
      >
        <HiOutlineMenu size={24} />
      </div>
      <nav
        className={`fixed  z-[999] flex items-center sm:gap-5 bg-slate-200/60 px-2 sm:px-6 py-3 backdrop-blur-md rounded-full text-dark_primary duration-300 ${
          showMenu ? "bottom-10" : "bottom-[-100%]"
        }`}
      >
        {nav.map((item, i) => (
          <a key={i}
            href={item.link}
            onClick={(e) => {
              e.preventDefault()
              setActive(i)
              document.querySelector(item.link)?.scrollIntoView({ behavior: "smooth" })
            }}
            className={`relative group text-xl p-2.5 rounded-full sm:cursor-pointer
     ${i === active && "bg-dark_primary text-white"} `}
          >
            {createElement(item.icon)}
            <span className="absolute -top-11 left-1/2 -translate-x-1/2 bg-[#1d293a]/85 text-white text-[11px] font-medium px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 shadow-sm">
              {item.label}
            </span>
          </a>
        ))}
      </nav>
    </div>
  )
}

export default Navbar