"use client";

import React from "react";
import { useDesignStore } from "@/store/design-store";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ArrowUpToLine,
  ArrowDownToLine,
  ChevronsUp,
  ChevronsDown,
  Trash2,
} from "lucide-react";

export default function ContextMenu() {
  const { contextMenu, moveLayer, deleteObject, selectedId, hideContextMenu } =
    useDesignStore();

  if (!contextMenu.visible) {
    return null;
  }

  const handleAction = (action) => {
    action();
    hideContextMenu();
  };

  return (
    <Card
      className="fixed z-50 w-48 p-2 shadow-xl"
      style={{
        top: contextMenu.y,
        left: contextMenu.x,
      }}
      onMouseLeave={hideContextMenu}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex flex-col gap-1">
        <Button
          variant="ghost"
          size="sm"
          className="justify-start"
          onClick={() => handleAction(() => moveLayer("front"))}
        >
          <ArrowUpToLine className="mr-2" /> Bring to Front
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="justify-start"
          onClick={() => handleAction(() => moveLayer("up"))}
        >
          <ChevronsUp className="mr-2" /> Bring Forward
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="justify-start"
          onClick={() => handleAction(() => moveLayer("down"))}
        >
          <ChevronsDown className="mr-2" /> Send Backward
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="justify-start"
          onClick={() => handleAction(() => moveLayer("back"))}
        >
          <ArrowDownToLine className="mr-2" /> Send to Back
        </Button>
        <Separator />
        <Button
          variant="destructive"
          size="sm"
          className="justify-start"
          onClick={() => handleAction(() => deleteObject(selectedId))}
        >
          <Trash2 className="mr-2" /> Delete
        </Button>
      </div>
    </Card>
  );
}
