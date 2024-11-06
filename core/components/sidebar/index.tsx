"use client";

import Link from "next/link";
import { SIDEBARLINKS } from "./constants";

const Sidebar = () => {
  return (
    <aside className="w-52 p-4 border-r-2">
      {SIDEBARLINKS.map((link) => (
        <ul className="flex items-center flex-col gap-4">
          <Link
            key={link.url}
            href={link.url}
            className="w-full p-2 rounded-lg text-left hover:bg-slate-200 cursor-pointer">
            {link.title}
          </Link>
        </ul>
      ))}
    </aside>
  );
};

export default Sidebar;
