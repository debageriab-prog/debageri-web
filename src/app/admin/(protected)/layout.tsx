import Link from "next/link";
import { LogoLink } from "@/components/Logo";
import { AdminLogoutButton } from "@/components/AdminLogoutButton";
import { requireAdminSession } from "@/lib/admin-session";

export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  const admin = await requireAdminSession();

  return (
    <div className="min-h-screen bg-[#F7F2EA]">
      <header className="border-b border-[#e8d8c8] bg-[#fdfaf6]">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
          <div className="flex items-center gap-6">
            <LogoLink height={24} />
            <span className="hidden h-5 w-px bg-[#e8d8c8] sm:block" aria-hidden="true" />
            <nav aria-label="Admin navigation" className="flex items-center gap-4 sm:gap-5">
              <Link href="/admin/messages" className="text-sm font-semibold text-[#5a4535] hover:text-[#3D3027]">Messages</Link>
              <Link href="/admin/jobs" className="text-sm font-semibold text-[#5a4535] hover:text-[#3D3027]">Jobs</Link>
              <Link href="/admin/candidates" className="text-sm font-semibold text-[#5a4535] hover:text-[#3D3027]">Candidates</Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-[#9a7a63] sm:block">{admin.displayName}</span>
            <AdminLogoutButton />
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}
