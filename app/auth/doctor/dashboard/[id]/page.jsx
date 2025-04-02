import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

import MoneySection from "@/components/doctorDashboard/moneySection"
import UserSection from "@/components/doctorDashboard/userSection"
import ProfileViews from "@/components/doctorDashboard/profileViews"
import TableSection from "@/components/doctorDashboard/tableSection"

export default async function Page({params}) {
  const resolvedParams = await params;
  const id = resolvedParams?.id;
  
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header
          className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid grid-cols-1 auto-rows-min gap-4 sm:grid-cols-2 md:grid-cols-3">
            <div className="w-full overflow-hidden">
              <MoneySection className="aspect-video rounded-xl bg-muted/50 max-w-full" />
            </div>
            <div className="w-full overflow-hidden">
              <UserSection className="aspect-video rounded-xl bg-muted/50 max-w-full"/>
            </div>
            <div className="w-full overflow-hidden">
              <ProfileViews className="aspect-video rounded-xl bg-muted/50 max-w-full" />
            </div>
          </div>
          <div className=" flex-1 rounded-xl bg-muted/50 md:min-h-min" />
          <TableSection />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}