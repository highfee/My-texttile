import { ArrowUpFromLine, Eye, Menu, PencilLine } from "lucide-react";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const MobileHeader = () => {
  return (
    <header className="bg-bluebutton text-white p-4 pt-6 flex justify-between items-center ">
      <div className="flex items-center gap-4">
        <Menu className=" cursor-pointer" />

        <div className="flex items-center gap-2 text-lg font-semibold">
          Vivo
          <PencilLine size="14" />
        </div>
      </div>
      <div className="flex items-center gap-4 ">
        <Select
        //   value={currentDesign.apparelView}
        //   onValueChange={(value) => updateApparelView({ view: value })}
        >
          <SelectTrigger className=" data-[placeholder]:text-white rounded-md cursor-pointer border- gap-1 text-white">
            <SelectValue
              //   placeholder={currentDesign.apparelView}
              placeholder="Front"
              className="text-white capitalize"
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="front">Front</SelectItem>
            <SelectItem value="back">Back</SelectItem>
            <SelectItem value="left">Left Side</SelectItem>
            <SelectItem value="right">Right Side</SelectItem>
          </SelectContent>
        </Select>

        <div>
          <Eye size={20} />
        </div>
        <div>
          <ArrowUpFromLine size={20} />
        </div>
      </div>
    </header>
  );
};

export default MobileHeader;
