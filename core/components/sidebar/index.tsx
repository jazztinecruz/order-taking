"use client";

import Link from "next/link";
import { SIDEBARLINKS } from "./constants";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <aside className="w-52 p-4 border-r-2">
      <ul className="flex items-center flex-col gap-4">
        {SIDEBARLINKS.map((link) => {
          const isActive = pathname === link.url;
          return (
            <Link
              key={link.url}
              href={link.url}
              className={`w-full p-2 rounded-lg text-left hover:bg-slate-200 cursor-pointer ${
                isActive && "font-bold bg-slate-200"
              }`}>
              {link.title}
            </Link>
          );
        })}
      </ul>
    </aside>
  );
};

export default Sidebar;
