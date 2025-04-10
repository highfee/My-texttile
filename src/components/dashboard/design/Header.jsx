import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Header = () => {
  return (
    <header className="bg-white sticky top-0 p-4 shadow-md">
      <section>
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
      </section>
      <section></section>
    </header>
  );
};

export default Header;
