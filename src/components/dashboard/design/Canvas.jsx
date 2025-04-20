import React from "react";
import Header from "./Header";
import { Redo, Trash2, Undo } from "lucide-react";
import { MdOutlineRotateRight } from "react-icons/md";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Canvas = () => {
  return (
    <main className="flex-1 bg-off-white h-scree h-[3000px] overflow-y-auto no-scrollbar ">
      <Header />

      <section className="flex flex-col items-center justify-center h-[calc(100vh-4rem) mt-20">
        <header className="p-2 bg-primary w-[450px] rounded-md mb-4 flex items-center gap-3 px-4">
          <div className="grid place-items-center size-[30px] bg-dark-gray rounded-md cursor-pointer">
            <Trash2 color="white" size={20} />
          </div>

          <div className=" cursor-pointer">
            <Undo color="rgb(255,255,255,0.44)" size={20} />
          </div>
          <div className="  cursor-pointer">
            <Redo color="rgb(255,255,255,0.44)" size={20} />
          </div>

          <div className="grid place-items-center size-[30px] bg-dark-gray rounded-md cursor-pointer">
            <MdOutlineRotateRight color="white" size={20} />
          </div>

          {/* right */}
          <div className="ml-auto">
            <Select>
              <SelectTrigger className="bg-dark-gray data-[placeholder]:text-white rounded-md cursor-pointer border-none gap-2">
                <SelectValue placeholder="View" className="text-white" />
              </SelectTrigger>
              <SelectContent className="">
                <SelectItem value="light">Front</SelectItem>
                <SelectItem value="dark">Back</SelectItem>
                <SelectItem value="system">Arm</SelectItem>
                {/* <SelectItem value="system">System</SelectItem> */}
              </SelectContent>
            </Select>
          </div>

          <div className="grid place-items-center size-[30px] bg-dark-gray rounded-md cursor-pointer relative">
            <Image src={"/design/icons/copy-02.svg"} width={22} height={22} />
            <span className="text-[8px] text-white absolute right-[10px] bottom-[2px]">
              2
            </span>
          </div>
        </header>

        {/* canvas */}
        <div className="w-[450px] h-[425px] bg-white border border-primary/40 rounded-md shadow-sm "></div>
      </section>
    </main>
  );
};

export default Canvas;
