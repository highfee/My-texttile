import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const Sidebar = () => {
  return (
    <aside className="w-[390px] bg-white sticky top-0 self-start h-screen shadow-md p-4 overflow-y-auto no-scrollbar py-6 ">
      <header>
        <Breadcrumb className="">
          <BreadcrumbList className="text-base font-semibold !gap-1.5">
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className=" text-gray-900">
              /
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink href="/components" className="text-gray-900">
                New Design
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
    </aside>
  );
};

export default Sidebar;
