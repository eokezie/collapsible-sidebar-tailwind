import React from "react";
import classnames from "classnames";

import { navItems } from ".";

const Sidebar = () => {
  const [width, setWidth] = React.useState(60);
  const [isTransitioning, setIsTransitioning] = React.useState(false);

  const sidebarRef = React.useRef<HTMLElement>(null);
  const sidebar = sidebarRef.current;

  const resize = (e: any) => {
    let newWidth = e.clientX - sidebar?.offsetLeft!;
    if (newWidth < 61) newWidth = 60;
    if (newWidth > 249) newWidth = 250;
    setWidth(newWidth);
  };

  const stopResize = () => {
    document.body.style.cursor = "default";
    window.removeEventListener("mousemove", resize);
    window.removeEventListener("mouseup", stopResize);
  };

  const initResize = () => {
    document.body.style.cursor = "col-resize";
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResize);
  };

  const adjustSidebar = () => {
    setIsTransitioning(true);
    const newWidth = width === 60 ? 250 : 60;

    setTimeout(() => {
      setWidth(newWidth);
      setIsTransitioning(false);
    }, 100);
  };

  return (
    <aside
      style={{ width: `${width}px` }}
      className={classnames([
        "absolute overflow-hidden transition-[width] duration-[0.5s] ease-[ease] left-0 inset-y-0 bg-[#4734d7]",
        { transitioning: isTransitioning },
      ])}
    >
      <div
        className="absolute z-[100] w-2 transition-[0.3s] right-0 inset-y-0 hover:bg-[#FFFFFF19] hover:cursor-col-resize active:bg-[#FFFFFF19] active:cursor-col-resize"
        onMouseDown={initResize}
      ></div>
      <div className="absolute top-0 left-0 w-[260px]">
        <header className="flex items-center h-[72px] bg-[#4734d7] bg-[#00000015]">
          <button
            type="button"
            className="w-[60px] h-[72px] grid place-items-center text-white"
            onClick={adjustSidebar}
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
          <img
            src={
              "https://clipart-library.com/images_k/coca-cola-logo-transparent-background/coca-cola-logo-transparent-background-23.png"
            }
            className="h-[40px]"
          />
        </header>
        <nav className="grid p-[10px]">
          {navItems.map((item) => (
            <button
              key={item}
              type="button"
              className="flex items-center gap-5 h-14 w-full font-poppins text-base capitalize leading-none px-2 rounded-lg text-white opacity-90 mb-1 hover:bg-[#FFFFFF19] active:bg-[#FFFFFF19]"
            >
              <span className="material-symbols-outlined">{item}</span>
              <p className="text-[14px]">{item}</p>
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
