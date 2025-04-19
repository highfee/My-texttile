import * as React from "react";

import { Filter, Plus, Search } from "lucide-react";
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
import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { cn } from "@/lib/utils";

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

const shapes = [
  { id: "square", path: "M0 0h100v100H0z", viewBox: "0 0 100 100" },
  {
    id: "circle",
    path: "M50 0A50 50 0 1 1 50 100A50 50 0 0 1 50 0z",
    viewBox: "0 0 100 100",
  },
  { id: "triangle", path: "M50 0L100 100H0z", viewBox: "0 0 100 100" },
  { id: "rectangle", path: "M0 0h120v80H0z", viewBox: "0 0 120 80" },
  {
    id: "hexagon",
    path: "M50 0L95 25L95 75L50 100L5 75L5 25Z",
    viewBox: "0 0 100 100",
  },
  { id: "diamond", path: "M50 0L100 50L50 100L0 50Z", viewBox: "0 0 100 100" },
  {
    id: "pentagon",
    path: "M50 0L100 38L81 100H19L0 38Z",
    viewBox: "0 0 100 100",
  },
  {
    id: "star",
    path: "M50 0L61 38H100L69 61L81 100L50 77L19 100L31 61L0 38H39Z",
    viewBox: "0 0 100 100",
  },
  {
    id: "oval",
    path: "M25 0C75 0 100 50 100 50C100 50 75 100 25 100C-25 100 0 50 0 50C0 50 -25 0 25 0Z",
    viewBox: "0 0 100 100",
  },
  { id: "trapezoid", path: "M20 0H80L100 100H0Z", viewBox: "0 0 100 100" },
  { id: "parallelogram", path: "M25 0H100L75 100H0Z", viewBox: "0 0 100 100" },
  {
    id: "crescent",
    path: "M50 0A50 50 0 1 1 50 100A35 35 0 1 1 50 0Z",
    viewBox: "0 0 100 100",
  },
  {
    id: "heart",
    path: "M50 90L10 50C-10 20 30 -10 50 20C70 -10 110 20 90 50L50 90Z",
    viewBox: "0 0 100 100",
  },
  {
    id: "arrow",
    path: "M50 0L100 50L75 50L75 100L25 100L25 50L0 50Z",
    viewBox: "0 0 100 100",
  },
  {
    id: "cross",
    path: "M40 0H60V40H100V60H60V100H40V60H0V40H40Z",
    viewBox: "0 0 100 100",
  },
];

const productColors = [
  { id: "red", color: "#FF0000" },
  { id: "blue", color: "#0000FF" },
  { id: "green", color: "#00FF00" },
  { id: "black", color: "#000000" },
  { id: "white", color: "#FFFFFF" },
  { id: "yellow", color: "#FFFF00" },
  { id: "purple", color: "#800080" },
  { id: "orange", color: "#FFA500" },
  { id: "pink", color: "#FFC0CB" },
  { id: "brown", color: "#A52A2A" },
  { id: "gray", color: "#808080" },
  { id: "cyan", color: "#00FFFF" },
  { id: "magenta", color: "#FF00FF" },
  { id: "lime", color: "#00FF00" },
  { id: "teal", color: "#008080" },
  { id: "navy", color: "#000080" },
  { id: "gold", color: "#FFD700" },
];

const brandKits = [
  {
    id: "ola",
    name: "Ola Brand Kit",
    logos: [
      {
        id: "main",
        src: "/design/images/ola-logo-main.png",
        alt: "Ola Main Logo",
      },
      {
        id: "alternative",
        src: "/design/images/ola-logo-alternative.png",
        alt: "Ola Alternative Logo",
      },
      {
        id: "transparent",
        src: "/design/images/ola-logo-transparent.png",
        alt: "Ola Transparent Logo",
      },
    ],
    colors: ["#007BFF", "#FF0000", "#000000", "#FFFFFF"],
  },
  {
    id: "vim",
    name: "Vim Brand Kit",
    logos: [
      {
        id: "main",
        src: "/design/images/ola-logo-main.png",
        alt: "Vim Main Logo",
      },
      {
        id: "alternative",
        src: "/design/images/ola-logo-alternative.png",
        alt: "Vim Alternative Logo",
      },
      {
        id: "transparent",
        src: "/design/images/ola-logo-transparent.png",
        alt: "Vim Transparent Logo",
      },
    ],
    colors: ["#00FF00", "#800080", "#FFFF00", "#0000FF"],
  },
];

const uploads = [
  { id: "upload 2", src: "/design/images/upload 2.png" },
  { id: "upload 1", src: "/design/images/uplaods1.png" },
  { id: "upload 4", src: "/design/images/upload 4.png" },
  { id: "upload 3", src: "/design/images/upload 3.png" },
  { id: "upload 6", src: "/design/images/upload 6.png" },
  { id: "upload 5", src: "/design/images/upload 5.png" },
  { id: "upload 2", src: "/design/images/upload 2.png" },
  { id: "upload 1", src: "/design/images/uplaods1.png" },
  { id: "upload 4", src: "/design/images/upload 4.png" },
  { id: "upload 3", src: "/design/images/upload 3.png" },
  { id: "upload 6", src: "/design/images/upload 6.png" },
  { id: "upload 5", src: "/design/images/upload 5.png" },
];

const Sidebar = () => {
  const [selectedColor, setSelectedColor] = React.useState(null);

  const handleColorChange = (colorId) => {
    setSelectedColor(colorId);
  };
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

        {/* styles */}
        <TabsContent value="styles">
          <header className="flex justify-between gap-5 items-center mt5">
            <Button variant="outline" className="h-12">
              <Image
                src={"/design/icons/image.svg"}
                alt=""
                height={26}
                width={26}
              />
              Add Image
            </Button>
            <Button variant="outline" className="h-12">
              <Image
                src={"/design/icons/text-creation.svg"}
                alt=""
                height={26}
                width={26}
              />
              Add Text
            </Button>

            <Popover>
              <PopoverTrigger>
                <Button variant="outline" className="h-12">
                  <Image
                    src={"/design/icons/shapes.svg"}
                    alt=""
                    height={26}
                    width={26}
                  />
                  Elements
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <div className="grid grid-cols-5">
                  {shapes.map((shape) => (
                    <Button
                      variant="ghost"
                      key={shape.id}
                      className="p-0 h-12 "
                    >
                      <svg
                        width="40"
                        height="40"
                        viewBox={shape.viewBox}
                        className="text-black w-full"
                      >
                        <path d={shape.path} fill="currentColor" />
                      </svg>
                    </Button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </header>

          {/* product colors */}

          <div className="mt-5">
            <p className="text-lg font-semibold">Choose a product color</p>

            <div className="flex gap-1.5 flex-wrap mt-2">
              {productColors.map((color) => (
                <div
                  key={color.id}
                  onClick={() => handleColorChange(color.id)}
                  className={cn(
                    "relative size-6 rounded-sm cursor-pointer border border-cyan-200",
                    { "border-black": selectedColor == color.id }
                  )}
                  style={{ backgroundColor: color.color }}
                >
                  {selectedColor === color.id && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "16px",
                        height: "16px",
                      }}
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* brands */}
          <div className="mt-12">
            <p className="text-lg font-semibold mb-3">Brand</p>

            <Accordion type="single" collapsible className="w-[300px] ml-4">
              {brandKits.map((brand) => (
                <AccordionItem
                  value={brand.id}
                  className="!border-none mb-5"
                  key={brand.id}
                >
                  <AccordionTrigger className="border-b py-2 text-lg text-gray-600">
                    {brand.name}
                  </AccordionTrigger>
                  <AccordionContent className="mt-2">
                    {/* logos */}
                    <div>
                      <p className="text-gray-500 text-lg ">Brand Logo</p>

                      <div className="flex items-center gap-4 mt-4">
                        {brand.logos.map((logo) => (
                          <div
                            key={logo.id}
                            className="cursor-pointer text-center"
                          >
                            <Image
                              src={logo.src}
                              alt={logo.alt}
                              width={70}
                              height={50}
                            />
                            <p className=" capitalize text-gray-600">
                              {logo.id}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* brand color */}
                    <div className="mt-3">
                      <p className="text-gray-500 text-lg ">Brand Color</p>
                      <div className="flex items-center gap-2 mt-2">
                        {brand.colors.map((color) => (
                          <div
                            className="size-6 rounded-sm border border-gray-200 cursor-pointer"
                            style={{ background: color }}
                          />
                        ))}

                        <div className="size-6 rounded-sm border border-gray-200 cursor-pointer grid place-items-center">
                          <Plus size={12} />
                        </div>
                      </div>
                    </div>

                    {/* uploads */}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* uploads */}

          <div className="mt-12">
            <p className="text-lg font-semibold mb-3">Uploads</p>

            <div className=" columns-3 gap-1 mb-4 border-2 border-gray-300 rounded-md p-2 bg-off-white">
              {uploads.map((upload) => (
                <Image
                  key={upload.id}
                  src={upload.src}
                  alt={upload.id}
                  width={300}
                  height={400}
                  className="mb-1"
                />
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </aside>
  );
};

export default Sidebar;
