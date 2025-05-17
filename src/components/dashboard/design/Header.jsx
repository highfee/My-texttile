import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import Image from "next/image";
import {
  Bold,
  CaseSensitive,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Eye,
  Italic,
  Plus,
  Underline,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { LuAlignEndHorizontal } from "react-icons/lu";
import { PiAlignCenterHorizontal } from "react-icons/pi";
import { CiAlignLeft, CiAlignRight, CiAlignTop } from "react-icons/ci";
import { Button } from "@/components/ui/button";
import { LiaSearchPlusSolid } from "react-icons/lia";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

const Header = () => {
  return (
    <header className="bg-white sticky top-0 p-4 shadow-md flex justify-between gap-10 items-center">
      <section className="flex items-center  gap-10 ">
        <Select>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Helvica" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex items-center gap-4">
          <div>
            <Label htmlFor="color" className="cursor-pointer relative">
              <Image
                src="/design/icons/colors.svg"
                alt=""
                width={25}
                height={28}
              />
              <Input
                type="color"
                id="color"
                className="opacity-0 absolute pointer-events-none bottom-0 left-0 hidde"
              />
            </Label>
          </div>
          <Bold
            color="rgba(18, 18, 18, 0.44)"
            size={20}
            className=" cursor-pointer"
          />
          <Italic
            color="rgba(18, 18, 18, 0.44)"
            size={20}
            className=" cursor-pointer"
          />
          <CaseSensitive
            color="rgba(18, 18, 18, 0.44)"
            size={20}
            className=" cursor-pointer"
          />
          <Underline
            color="rgba(18, 18, 18, 0.44)"
            size={20}
            className=" cursor-pointer"
          />
          <LuAlignEndHorizontal
            color="rgba(18, 18, 18, 0.44)"
            className=" cursor-pointer"
          />
          <PiAlignCenterHorizontal
            color="rgba(18, 18, 18, 0.44)"
            size="22"
            className=" cursor-pointer"
          />
          <CiAlignLeft
            color="rgba(18, 18, 18, 0.44)"
            size="22"
            className=" cursor-pointer"
          />
          <CiAlignRight
            color="rgba(18, 18, 18, 0.44)"
            size="22"
            className=" cursor-pointer"
          />
          <CiAlignTop
            color="rgba(18, 18, 18, 0.44)"
            size="22"
            className=" cursor-pointer"
          />
        </div>
      </section>

      {/* right */}
      <section className="flex gap-4 items-center">
        <div className="flex items-center -gap-4">
          <Popover>
            <PopoverTrigger>
              <span className="grid place-items-center size-10 bg-black rounded-full text-white cursor-pointer">
                <Plus color="white" size={20} />
              </span>
            </PopoverTrigger>
            <PopoverContent
              className="w-[520px]  p-5 max-h-[500px] overflow-y-auto"
              align="end"
            >
              <Access />
            </PopoverContent>
          </Popover>

          <Image
            src={"/design/images/avatar.png"}
            width={40}
            height={40}
            alt="avatar"
            className="rounded-full border-2 border-white shadow-md cursor-pointer -translate-x-3 size-10"
          />
        </div>

        <Dialog className="w-screen overflow-auto">
          <DialogTrigger>
            <Button
              variant="outline"
              className="bg-white border-gray-300 text-base text-gray-600 [&_svg]:size-5 h-10"
            >
              <Eye />
              Preview
            </Button>
          </DialogTrigger>
          <DialogContent className="min-w-[calc(100vw-10rem)] max-h-[calc(100vh-5rem)] overflow-y-auto">
            <PreviewOverlay />
          </DialogContent>
        </Dialog>

        <Dialog className="w-screen overflow-auto">
          <DialogTrigger>
            <Button
              variant="default"
              className=" border-gray-300 text-base  [&_svg]:size-5 h-10 "
            >
              Publish
            </Button>
          </DialogTrigger>
          <DialogContent className="min-w-[calc(100vw-10rem)] max-h-[calc(100vh-5rem)] overflow-y-auto">
            <PublishOverlay />
          </DialogContent>
        </Dialog>
      </section>
    </header>
  );
};

export default Header;

const peopleWithAccess = [
  {
    id: 1,
    name: "John Doe",
    email: "odediranifeoluwa7@gmail.com",
    role: "Owner",
    image: "/design/images/avatar.png",
  },
  {
    id: 2,
    name: "Lars",
    email: "lars@gmail.com",
    role: "Editor",
    image: "/design/images/avatar 2.png",
  },
  {
    id: 2,
    name: "Lars",
    email: "lars@gmail.com",
    role: "Editor",
    image: "/design/images/avatar 2.png",
  },
  {
    id: 2,
    name: "Lars",
    email: "lars@gmail.com",
    role: "Editor",
    image: "/design/images/avatar 2.png",
  },
  {
    id: 2,
    name: "Lars",
    email: "lars@gmail.com",
    role: "Editor",
    image: "/design/images/avatar 2.png",
  },
  {
    id: 2,
    name: "Lars",
    email: "lars@gmail.com",
    role: "Editor",
    image: "/design/images/avatar 2.png",
  },
  {
    id: 2,
    name: "Lars",
    email: "lars@gmail.com",
    role: "Editor",
    image: "/design/images/avatar 2.png",
  },
  {
    id: 2,
    name: "Lars",
    email: "lars@gmail.com",
    role: "Editor",
    image: "/design/images/avatar 2.png",
  },
  {
    id: 2,
    name: "Lars",
    email: "lars@gmail.com",
    role: "Editor",
    image: "/design/images/avatar 2.png",
  },
  {
    id: 2,
    name: "Lars",
    email: "lars@gmail.com",
    role: "Editor",
    image: "/design/images/avatar 2.png",
  },
  {
    id: 2,
    name: "Lars",
    email: "lars@gmail.com",
    role: "Editor",
    image: "/design/images/avatar 2.png",
  },
  {
    id: 2,
    name: "Lars",
    email: "lars@gmail.com",
    role: "Editor",
    image: "/design/images/avatar 2.png",
  },
  {
    id: 2,
    name: "Lars",
    email: "lars@gmail.com",
    role: "Editor",
    image: "/design/images/avatar 2.png",
  },
  {
    id: 2,
    name: "Lars",
    email: "lars@gmail.com",
    role: "Editor",
    image: "/design/images/avatar 2.png",
  },
  {
    id: 2,
    name: "Lars",
    email: "lars@gmail.com",
    role: "Editor",
    image: "/design/images/avatar 2.png",
  },
  {
    id: 2,
    name: "Lars",
    email: "lars@gmail.com",
    role: "Editor",
    image: "/design/images/avatar 2.png",
  },
  {
    id: 2,
    name: "Lars",
    email: "lars@gmail.com",
    role: "Editor",
    image: "/design/images/avatar 2.png",
  },
  {
    id: 2,
    name: "Lars",
    email: "lars@gmail.com",
    role: "Editor",
    image: "/design/images/avatar 2.png",
  },
];

export const Access = () => {
  return (
    <div>
      <header className="flex items-center gap-2 mb-4 cursor-pointer">
        <ChevronLeft size={24} color="rgba(20, 27, 52, 1)" strokeWidth={3} />
        <p className="text-xl font-medium text-[rgba(20,27,52)]">
          People with Access
        </p>
      </header>

      {/* search users */}
      <section className="flex gap-2 items-center mb-4">
        <div className="flex items-center ml-8 bg-gray-100 p-3 py-1 rounded-md flex-1">
          <Image
            src={"/design/icons/search-add.svg"}
            width={20}
            height={20}
            alt=""
          />
          <Input
            type="text"
            placeholder="Invite by name, email or username"
            className="border-none placeholder:text-gray-400 text-base placeholder:text-base h-10  ring-0 focus-visible:ring-0 focus-visible:border-none shadow-none "
          />
        </div>

        <Button className="h-12">Invite</Button>
      </section>

      {/* people with access and their roles */}

      <section className="grid grid-cols-1 gap-4 ml-8 mt-10 ">
        {peopleWithAccess.map((user, i) => (
          <div key={user.id} className="flex gap-3 items-center">
            <Image
              src={user.image}
              width={30}
              height={30}
              alt="avatar"
              className="rounded-full  shadow-md cursor-pointer  size-10"
            />
            <div>
              <p className="text-primary font-medium">{user.name}</p>
              <p className="text-primary/40">{user.email}</p>
            </div>
            <Button className="ml-auto bg-gray-100 rounded-none text-primary/40 shadow-none h-10">
              {user.role}
            </Button>
          </div>
        ))}
      </section>
    </div>
  );
};

export const PreviewOverlay = () => {
  return (
    <div>
      <DialogHeader className="flex items-center justify-between flex-row">
        <DialogTitle>
          <div>Preview </div>
        </DialogTitle>

        <Select defaultValue="front">
          <SelectTrigger className=" rounded-md cursor-pointer gap-2 border-primary/40 w-20">
            <SelectValue placeholder="View" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="front">Front</SelectItem>
            <SelectItem value="back">Back</SelectItem>
            <SelectItem value="arm">Arm</SelectItem>
            {/* <SelectItem value="system">System</SelectItem> */}
          </SelectContent>
        </Select>

        <div className="flex items-center gap-1">
          <Button
            variant="default"
            className=" border-gray-300 text-sm  [&_svg]:size-5 h-9 "
          >
            Publish
          </Button>

          <DialogClose className="bg-gray-100 rounded-md h-9 w-9 grid place-items-center  cursor-pointer ">
            <X size={18} />
          </DialogClose>
        </div>
      </DialogHeader>

      <section className="flex flex-col items-center justify-center h-[calc(100vh-4rem) mt-20">
        <div className="border border-primary/40  rounded-md p-5">
          <Image
            src={"/design/images/black-mockup.png"}
            width={450}
            height={450}
            alt="preview"
          />
        </div>
      </section>

      <section className="flex items-center justify-center gap-2 mt-40">
        <ZoomOut className="text-primary/40" />
        <Slider defaultValue={[33]} max={100} step={1} className="w-40" />

        <ZoomIn className="text-primary/40" />
      </section>
    </div>
  );
};

export const PublishOverlay = () => {
  const [openAccordion, setOpenAccordion] = React.useState(null);

  const toggleAccordion = (key) => {
    setOpenAccordion((prev) => (prev === key ? null : key));
  };

  return (
    <div>
      <DialogHeader>
        <DialogTitle>
          <div>Publish </div>
          <DialogDescription className="text-base font-ight mt-2">
            Optimize your product for visibility, sharing, and sales. Completing
            them ensures your product is well-presented, <br />
            easy to find, and ready to attract buyers.
          </DialogDescription>
        </DialogTitle>
        <DialogClose className="bg-gray-100 rounded-md h-9 w-9 grid place-items-center  cursor-pointer absolute top-2 right-2">
          <X size={18} />
        </DialogClose>
      </DialogHeader>

      {/* settings / details */}

      <div className="flex   mt-20">
        {/* Left side: Accordions */}
        <div className=" flex-1 space-y-4 max-w-[1000px]">
          {/* Accordion One */}
          <ProductInfo
            openAccordion={openAccordion}
            toggleAccordion={toggleAccordion}
          />

          {/* Accordion Two */}
          <Visibility
            openAccordion={openAccordion}
            toggleAccordion={toggleAccordion}
          />

          {/* Accordion Three */}
          <Advanced
            openAccordion={openAccordion}
            toggleAccordion={toggleAccordion}
          />
        </div>

        {/* Right side: Preview */}
        <div className=" pl-6">
          {openAccordion === "one" && (
            <div className="">
              <h3 className="font-semibold mb-2">Preview for Accordion One</h3>
              <p>This preview appears only when Accordion One is open.</p>
              {/* You can add images, charts, etc., here */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ProductInfo = ({ openAccordion, toggleAccordion }) => {
  return (
    <div
      className={` transition-all cursor-pointer ${
        openAccordion === "one" ? "opacity-100" : "opacity-50"
      }`}
    >
      <div
        className="flex gap-2 items-center p-4 border-b border-primary/40"
        onClick={() => toggleAccordion("one")}
      >
        <div
          className={cn(
            "size-9 bg-gray-200 grid place-items-center rounded-full",
            { "border border-blue": openAccordion === "one" }
          )}
        >
          1
        </div>

        <div>
          <p className="text-blue">Product Information</p>
          <p className="text-gray-500">
            A subscription plan that caters for every user’s category needs
          </p>
        </div>
        <div className="ml-auto">
          {openAccordion === "one" ? <ChevronUp /> : <ChevronRight />}
        </div>
      </div>

      {openAccordion === "one" && (
        <div className=" text-sm ml-12  grid grid-cols-2 gap-20 mt-5 gap-y-10">
          {/* name */}
          <div>
            <Label className="mb-2">Product Name</Label>
            <Input className="border-primary/40" />
          </div>

          {/* category */}
          <div>
            <Label className="mb-2">Product Category</Label>
            <Input className="border-primary/40" />
          </div>

          {/* price */}
          <div>
            <Label className="mb-2">Product Price</Label>
            <Input className="border-primary/40" />
          </div>

          {/* listing */}
          <div>
            <Label className="mb-2">Listing</Label>
            <Input className="border-primary/40" />
          </div>

          {/* Sizes */}
          <div>
            <Label className="mb-2">Size</Label>
            <Input className="border-primary/40" />
          </div>

          {/* color */}
          <div>
            <Label className="mb-2">Select Color</Label>
            <Input className="border-primary/40" />
          </div>
        </div>
      )}
    </div>
  );
};

const Visibility = ({ openAccordion, toggleAccordion }) => {
  return (
    <div
      className={`p-4 border-b border-primary/40 transition-all cursor-pointer ${
        openAccordion === "two" ? "opacity-100" : "opacity-50"
      }`}
      onClick={() => toggleAccordion("two")}
    >
      <div className="flex gap-2 items-center">
        <div
          className={cn(
            "size-9 bg-gray-200 grid place-items-center rounded-full",
            { "border border-blue": openAccordion === "two" }
          )}
        >
          2
        </div>

        <div>
          <p className="text-blue">Set Visibility Options</p>
          <p className="text-gray-500">
            A subscription plan that caters for every user’s category needs
          </p>
        </div>
        <div className="ml-auto">
          {openAccordion === "two" ? <ChevronUp /> : <ChevronRight />}
        </div>
      </div>

      {openAccordion === "two" && (
        <div className="mt-2 text-sm text-gray-600">
          This is the content of Accordion Two.
        </div>
      )}
    </div>
  );
};

const Advanced = ({ openAccordion, toggleAccordion }) => {
  return (
    <div
      className={`p-4 border-b border-primary/40 transition-all cursor-pointer ${
        openAccordion === "three" ? "opacity-100" : "opacity-50"
      }`}
      onClick={() => toggleAccordion("three")}
    >
      <div className="flex gap-2 items-center">
        <div
          className={cn(
            "size-9 bg-gray-200 grid place-items-center rounded-full",
            { "border border-blue": openAccordion === "three" }
          )}
        >
          3
        </div>

        <div>
          <p className="text-blue">Advanced Customization</p>
          <p className="text-gray-500">
            A subscription plan that caters for every user’s category needs
          </p>
        </div>
        <div className="ml-auto">
          {openAccordion === "three" ? <ChevronUp /> : <ChevronRight />}
        </div>
      </div>

      {openAccordion === "three" && (
        <div className="mt-2 text-sm text-gray-600">
          This is the content of Accordion Three.
        </div>
      )}
    </div>
  );
};
