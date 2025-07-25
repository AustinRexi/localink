import { NavLinkType } from "@/constants/sidebar";
import { cn } from "@/lib/utils";
import { useDashboardStore } from "@/store/dashboard-store";
import { normalizeUrl } from "@/utils/helpers";
import Image from "next/image";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavigationProps {
  navLinks: NavLinkType[];
}

export default function Navigation({ navLinks }: NavigationProps) {
  const { sidebarCollapsed } = useDashboardStore();
  const pathname = usePathname();

  //
  const linkIsMatch = (href: string) => {
    return normalizeUrl(pathname) === normalizeUrl(href);
  };

  //
  const RenderNavIcon = (navItem: NavLinkType) => {
    return (
      <Image
        src={
          linkIsMatch(navItem.url) ? navItem.icon.active : navItem.icon.normal
        }
        alt={navItem.name}
        width={20}
        height={20}
      />
    );
  };

  return (
    <aside className="flex flex-col gap-y-3">
      {navLinks.map((navLink) => (
        <Link
          key={navLink.name}
          href={navLink.url}
          className={cn(
            "capitalize p-3 px-6 text-sm flex items-center gap-x-3 text-neutral-500 duration-300",
            linkIsMatch(navLink.url)
              ? "bg-white text-primary font-medium"
              : "bg-transparent text-white",
            sidebarCollapsed ? "justify-center" : "justify-start"
          )}
        >
          {sidebarCollapsed ? (
            <RenderNavIcon {...navLink} />
          ) : (
            <>
              <RenderNavIcon {...navLink} />
              {!sidebarCollapsed && <span>{navLink.name}</span>}
            </>
          )}
        </Link>
      ))}
    </aside>
  );
}
