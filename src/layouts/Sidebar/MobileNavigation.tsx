import { NavLinkType } from "@/constants/sidebar";
import { cn } from "@/lib/utils";
import Image from "next/image";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavigationProps {
  navLinks: NavLinkType[];
}

export default function MobileNavigation({ navLinks }: NavigationProps) {
  const pathname = usePathname();

  //
  const linkIsMatch = (href: string) => {
    return pathname === href;
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
    <nav className="flex items-center fixed bottom-0 left-0 w-screen bg-primary-2 !z-[100]">
      {navLinks.map((navLink) => (
        <Link
          key={navLink.name}
          href={navLink.url}
          className={cn(
            "capitalize w-full p-3 text-sm flex flex-col items-center justify-center gap-2 text-neutral-500 duration-300",
            linkIsMatch(navLink.url)
              ? "bg-white text-primary"
              : "bg-transparent text-white"
          )}
        >
          <RenderNavIcon {...navLink} />
          <span className="text-sm">{navLink.name}</span>
        </Link>
      ))}
    </nav>
  );
}
