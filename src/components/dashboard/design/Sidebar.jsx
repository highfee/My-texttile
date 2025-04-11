import { Filter, Search } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

const recentlyUsed = [
  { id: 1, name: "Template 1", image: "/design/images/template 1.png" },
  { id: 2, name: "Template 2", image: "/design/images/template 2.png" },
  { id: 4, name: "Template 3", image: "/design/images/template 3.png" },
  { id: 5, name: "Template 3", image: "/design/images/template 4.png" },
  { id: 6, name: "Template 3", image: "/design/images/template 2.png" },
];
const premiumTemplates = [
  { id: 1, name: "Template 1", image: "/design/images/template 6.png" },
  { id: 2, name: "Template 2", image: "/design/images/template 7.png" },
  { id: 3, name: "Template 3", image: "/design/images/template 3.png" },
  { id: 3, name: "Template 3", image: "/design/images/template 4.png" },
  { id: 3, name: "Template 3", image: "/design/images/template 5.png" },
  { id: 3, name: "Template 3", image: "/design/images/template 8.png" },
];
const freeTemplates = [
  { id: 1, name: "Template 1", image: "/design/images/template 9.png" },
  { id: 3, name: "Template 3", image: "/design/images/template 8.png" },
  { id: 2, name: "Template 2", image: "/design/images/template 7.png" },
  { id: 4, name: "Template 4", image: "/design/images/template 3.png" },
  { id: 7, name: "Template 3", image: "/design/images/template 5.png" },
];

const Sidebar = () => {
  return (
    <aside className="w-[410px] bg-white sticky top-0 self-start h-screen shadow-md p-4 overflow-y-auto scrollbar py-6 ">
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

      <section className="flex items-center gap-5 mt-6 mb-2">
        <p className="text-xl font-semibold text-gray-900">
          Design your product
        </p>

        {/* WIP */}
      </section>

      <Tabs defaultValue="templates" className="w-full">
        <TabsList className="grid w-full grid-cols-2 p-0 text-gray-300 bg-[rgb(18,18,18)] h-[45px]">
          <TabsTrigger
            value="templates"
            className="h-full data-[state=active]:bg-[rgb(62,62,63)] text-lg font-light data-[state=active]:text-white "
          >
            Templates
          </TabsTrigger>
          <TabsTrigger
            value="styles"
            className="h-full data-[state=active]:bg-[rgb(62,62,63)] text-lg font-light data-[state=active]:text-white "
          >
            Styles
          </TabsTrigger>
        </TabsList>

        <TabsContent value="templates">
          <section>
            <div className="flex items-center gap-2 mb-4 border-2 border-gray-300 rounded-md p-2 px-4">
              <Search color="rgba(18, 18, 18, 0.44)" />
              <input
                type="search"
                className="flex-1 outline-none border-none bg-transparent placeholder:text-gray-500"
                placeholder="Search templates"
              />
              <Filter color="rgba(18, 18, 18, 0.44)" />
            </div>

            <section className="rounded-md p-4 border-[0.5px] border-[rgba(18,18,18,0.44)] bg-[rgb(244,244,244)]">
              {/* recently used template */}
              <div>
                <header className="flex items-center justify-between mb-2">
                  <p className=" font-semibold">Recently used</p>
                  <button className="text-sm text-gray-600"> View more</button>
                </header>
                <Carousel>
                  <CarouselContent>
                    {recentlyUsed.map((template) => (
                      <CarouselItem
                        key={template.id}
                        className="basis-1/2 cursor-pointer"
                      >
                        <div className="flex flex-col items-center justify-center gap-2">
                          <Image
                            src={template.image}
                            alt={template.name}
                            width={200}
                            height={240}
                            className="w-full  rounded-md"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="-left-4 bg-gray-900" />
                  <CarouselNext className="-right-4 bg-gray-900" />
                </Carousel>
              </div>

              {/* Premium Template  */}
              <div className="mt-8">
                <header className="flex items-center justify-between mb-2">
                  <p className=" font-semibold">Premium Template</p>
                  <button className="text-sm text-gray-600"> View more</button>
                </header>

                <div className="grid grid-cols-2 gap-2">
                  {premiumTemplates.map((template) => (
                    <div
                      key={template.id}
                      className="flex flex-col items-center justify-center gap-2 cursor-pointer relative"
                    >
                      <Image
                        src={template.image}
                        alt={template.name}
                        width={200}
                        height={240}
                        className="w-full  rounded-md h-[200px] object-cover object-top"
                      />

                      <Image
                        src="/design/icons/star-square.svg"
                        alt=""
                        height={20}
                        width={20}
                        className="absolute bottom-2 right-2"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Free Template  */}
              <div className="mt-6">
                <header className="flex items-center justify-between mb-2">
                  <p className=" font-semibold">Free Template</p>
                  <button className="text-sm text-gray-600"> View more</button>
                </header>

                <div className="grid grid-cols-2 gap-2">
                  {freeTemplates.map((template) => (
                    <div
                      key={template.id}
                      className="flex flex-col items-center justify-center gap-2 cursor-pointer relative"
                    >
                      <Image
                        src={template.image}
                        alt={template.name}
                        width={200}
                        height={240}
                        className="w-full  rounded-md h-[200px] object-cover object-top"
                      />

                      {/* <Image
                        src="/design/icons/star-square.svg"
                        alt=""
                        height={20}
                        width={20}
                        className="absolute bottom-2 right-2"
                      /> */}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </section>
        </TabsContent>
        <TabsContent value="styles">Change your password here.</TabsContent>
      </Tabs>
    </aside>
  );
};

export default Sidebar;
