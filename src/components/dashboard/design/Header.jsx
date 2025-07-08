import React, { useEffect, useRef, useState } from "react";
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

import Image from "next/image";
import {
  Bold,
  CaseSensitive,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Eye,
  Italic,
  Loader,
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

import { AVAILABLE_FONTS } from "@/constants";

import { usePublishDesign } from "@/store/usePublishDesign";
import { useMutation } from "@tanstack/react-query";
// import { useCreatorStore } from "@/store/useCreatorShopFront";
import { httpClient } from "@/lib/httpClient";

// import { useRouter } from "next/navigation";

import { useRouter } from "next/router";

const PreviewOverlay = dynamic(() => import("./PreviewOverlay"), {
  ssr: false,
  loading: () => (
    <div className="h-ful w-ful bg-muted animate-pulse rounded-lg" />
  ),
});
const DesignPIC = dynamic(() => import("./DesignPIC"), {
  ssr: false,
  loading: () => (
    <div className="h-ful w-ful bg-muted animate-pulse rounded-lg" />
  ),
});

import {
  useDesignStore,
  useUpdateObjectAndHistory,
  views,
} from "@/store/design-store";
import dynamic from "next/dynamic";
import { Switch } from "@/components/ui/switch";
import { get } from "react-hook-form";
import { toast } from "sonner";
import {
  useCreateDesign,
  useUpdateDesign,
} from "@/store/apiCalls/useDesignStore";

const fonts = [
  "Arial",
  "Helvetica",
  "Times New Roman",
  "Courier New",
  "Verdana",
  "Georgia",
  "Palatino",
  "Garamond",
  "Comic Sans MS",
  "Trebuchet MS",
  "Impact",
  "Tahoma",
  "Lucida Console",
  "Roboto",
  "Open Sans",
  "Lato",
  "Montserrat",
  "Oswald",
  "Raleway",
  "Poppins",
];

const Header = () => {
  const { selectedId, objects, activeView } = useDesignStore();

  const updateObject = useUpdateObjectAndHistory();
  const currentObjects = objects[activeView];
  const selectedObject = currentObjects.find((obj) => obj.id === selectedId);

  const handlePropertyChange = (prop, value) => {
    if (!selectedId) return;
    updateObject(selectedId, { [prop]: value });
  };

  const handleColorChange = (color) => {
    if (selectedElementId) {
      updateElement({ elementId: selectedElementId, updates: { color } });
    }
  };

  return (
    <header className="bg-white sticky top-0 p-4 shadow-md flex justify-between gap-10 items-center">
      <section className="flex items-center  gap-10 ">
        <Select
          value={
            selectedObject && selectedObject.type == "text"
              ? selectedObject.fontFamily
              : "PT Sans"
          }
          onValueChange={(v) => handlePropertyChange("fontFamily", v)}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {AVAILABLE_FONTS.map((font) => (
              <SelectItem key={font} value={font} style={{ fontFamily: font }}>
                {font}
              </SelectItem>
            ))}
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
                className="opacity-0 absolute pointer-events-none bottom-0 left-0  appearance-none"
                onChange={(e) => handlePropertyChange("fill", e.target.value)}
              />
            </Label>
          </div>

          {/* <div
            className={cn(" cursor-pointer p-1 rounded-md", {
              "bg-gray-200": selectedObject?.fontWeight === "bold",
            })}
          >
            <Bold
              color={"rgba(18, 18, 18, 0.44)"}
              size={20}
              onClick={() =>
                handlePropertyChange(
                  "fontWeight",
                  selectedObject.fontWeight === "bold" ? "normal" : "bold"
                )
              }
            />
          </div> */}

          <div
            className={cn(" cursor-pointer p-1 rounded-md", {
              "bg-gray-200": selectedObject?.fontStyle === "italic",
            })}
          >
            <Italic
              color="rgba(18, 18, 18, 0.44)"
              size={20}
              className=" cursor-pointer"
              onClick={() =>
                handlePropertyChange(
                  "fontStyle",
                  selectedObject.fontStyle === "italic" ? "normal" : "italic"
                )
              }
            />
          </div>

          {/* <div
            className={cn("cursor-pointer p-1 rounded-md", {
              "bg-gray-200":
                selectedElement?.textTransform === "uppercase" ||
                selectedElement?.textTransform === "lowercase",
            })}
          >
            <CaseSensitive
              color="rgba(18, 18, 18, 0.44)"
              size={20}
              onClick={toggleCase}
            />
          </div> */}

          {/* <div
            className={cn(" cursor-pointer p-1 rounded-md", {
              "bg-gray-200": selectedElement?.textDecoration === "underline",
            })}
          >
            <Underline
              color="rgba(18, 18, 18, 0.44)"
              size={20}
              className=" cursor-pointer"
              onClick={() => toggleStyle("textDecoration", "underline")}
            />
          </div> */}

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
          <DialogContent className="min-w-[calc(100vw-25rem)] max-h-[calc(100vh-5rem)] overflow-y-auto">
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

export const PublishOverlay = () => {
  const {
    mutate: createDesign,
    isPending: pendingDesign,
    error,
  } = useCreateDesign();

  const {
    mutate: updateDesign,
    isPending: pendingUpdate,
    error: updateError,
  } = useUpdateDesign();

  const router = useRouter();
  const {
    productName,
    productColors,
    productSize,
    productPrice,
    productType,
    visibility,
    visibilityPassword,
    reset,
  } = usePublishDesign();

  const { clearCanvasAndHistory } = useDesignStore();

  const designMutation = useMutation({
    mutationFn: async (data) => {
      const response = await httpClient.post("/designs/create/", data);

      return response.data;
    },
    onSuccess: (data) => {
      if (data["response status"] === "success") {
        toast("Design created successfully");
        clearCanvasAndHistory();
        reset();
        router.push("/dashboard/home");
      } else {
        setError(data["response description"] || "Error creating store");
        console.log(data["response description"]);
        toast(data["response description"] || "Error creating store");
      }
    },
    onError: (error) => {
      toast(error.message || "Error creating store");
    },
  });

  const editDesignMutation = useMutation({
    mutationFn: async (data) => {
      const response = await httpClient.put(
        `/designs/update/${router.query.id}/`,
        data
      );
      return response.data;
    },
    onSuccess: (data) => {
      if (data["response status"] === "success") {
        toast("Design updated successfully");
        clearCanvasAndHistory();
        reset();
        router.push("/dashboard/home");
      } else {
        setError(data["response description"] || "Error updating design");
        console.log(data["response description"]);
        toast(data["response description"] || "Error updating design");
      }
    },
    onError: (error) => {
      toast(error.message || "Error updating design");
    },
  });

  const isFormValid = () => {
    if (
      !productName ||
      !productType ||
      !productPrice ||
      !productSize.length ||
      !productColors.length ||
      (!visibility && !visibilityPassword) // If not public, password is required
    ) {
      return false;
    }
    return true;
  };

  const waitForImagesToLoad = (stage) => {
    return new Promise((resolve) => {
      const konvaImages = stage.find("Image");
      const imageElements = konvaImages
        .map((img) => img.image())
        .filter(Boolean);

      if (imageElements.length === 0) {
        resolve(true);
        return;
      }

      const promises = imageElements.map((imgEl) => {
        if (imgEl.complete) {
          return Promise.resolve();
        }
        return new Promise((resolveImg) => {
          const onLoad = () => {
            imgEl.removeEventListener("load", onLoad);
            imgEl.removeEventListener("error", onError);
            resolveImg();
          };
          const onError = () => {
            imgEl.removeEventListener("load", onLoad);
            imgEl.removeEventListener("error", onError);
            console.warn(`Could not load image: ${imgEl.src}`);
            resolveImg();
          };
          imgEl.addEventListener("load", onLoad);
          imgEl.addEventListener("error", onError);
        });
      });

      Promise.all(promises).then(() => {
        stage.batchDraw();
        setTimeout(() => resolve(true), 100);
      });
    });
  };

  const handlePublish = async () => {
    const stage = useDesignStore.getState().stageRef?.current;
    if (!stage) {
      console.error("Stage is not available.");
      alert("Error: Design canvas not ready for publishing.");
      return;
    }

    const {
      activeView: originalView,
      objects,
      garmentImages,
      setActiveView,
      setSelectedId,
    } = useDesignStore.getState();

    const templatePayload = {
      design_description: productName,
      product_category: productType,
      shop_price: productPrice,
      size: productSize,
      isPublic: visibility,
      password: visibility ? "" : visibilityPassword,
      design_view_data: {},
      color: productColors,
    };

    // console.log(garmentImages);

    setSelectedId(null);
    const marginLayer = stage.findOne(".margin-layer");
    if (marginLayer) {
      marginLayer.hide();
    }
    stage.batchDraw();

    for (const view of views) {
      // We only want to process views that actually have designs
      if (objects[view] && objects[view].length > 0) {
        setActiveView(view);

        // Wait for canvas to re-render with the new view's state
        await waitForImagesToLoad(stage);

        const imageDataUrl = stage.toDataURL({
          mimeType: "image/png",
          quality: 1,
          pixelRatio: 2,
        });

        templatePayload.design_view_data[view] = {
          imageDataUrl,
          designData: {
            objects: objects[view],
            garmentImage: garmentImages[view],
          },
        };
      }
    }

    // Restore the canvas to its original state
    if (marginLayer) {
      marginLayer.show();
    }
    setActiveView(originalView);
    stage.batchDraw();

    const payload = templatePayload;

    return payload;
  };

  const onSubmit = async () => {
    const designData = await handlePublish();
    console.log(designData);
    if (router.query.edit) {
      updateDesign(designData);
      return;
    }
    createDesign(designData);
  };

  const [openAccordion, setOpenAccordion] = React.useState(null);

  const [previewZoomLevel, setPreviewZoomLevel] = useState(1);

  const toggleAccordion = (key) => {
    setOpenAccordion((prev) => (prev === key ? null : key));
  };

  return (
    <div>
      <DialogHeader>
        <DialogTitle>
          <div>Publish </div>
          <DialogDescription className="text-base mt-2">
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

      <div className="flex mt-10">
        {/* Left side: Accordions */}
        <div className="flex-1 space-y-4 max-w-[800px]">
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
              <h3 className="font-semibold mb-2">Product Preview</h3>

              <section className="relative overflow-hidden  rounded-2xl border border-primary/40">
                <DesignPIC />
              </section>

              <div className="mt-10">
                <p className="font-semibold">{productName}</p>

                <div className="text-sm">
                  <p className="text-primary/40 mt-1">
                    Category:{" "}
                    <span className="text-primary/90">{productType}</span>
                  </p>

                  {/* colors */}
                  <div className="flex gap-1 items-center">
                    <p className="text-primary/40 mt-1">Colors: </p>

                    <div className="flex gap-0.5">
                      {productColors.map((color) => (
                        <div
                          key={color}
                          className="w-4 h-4 rounded-full border border-gray-300 cursor-pointer"
                          style={{ backgroundColor: color }}
                          // onClick={() => setProductColor(color)}
                        ></div>
                      ))}
                    </div>
                  </div>

                  <p className="text-primary/40 mt-1">
                    Starting:{" "}
                    <span className="text-primary/90">${productPrice}</span>
                  </p>

                  <div className="text-primary/40 mt-1 flex gap-1">
                    Sizes:{" "}
                    <div className="flex gap-1">
                      {productSize.map((size) => (
                        <span className="px-1 bg-primary text-white rounded-sm inline-block text-[10px]">
                          {size}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <footer className="my-10 ">
        <section className="flex justify-end gap-4">
          <DialogClose>
            <Button variant="outline">Back</Button>
          </DialogClose>

          <Button
            onClick={onSubmit}
            // onClick={() => clearCanvasAndHistory()}
            className="w-24"
            disabled={pendingDesign || !isFormValid() || pendingUpdate}
          >
            {designMutation.isPending || editDesignMutation.isPending ? (
              <Loader className=" animate-spin" />
            ) : (
              "Publish"
            )}
          </Button>
        </section>

        <div className="flex items-center gap-2">
          <p className="text-sm text-gray-600 font-medium">
            Unlimited Product listing
          </p>
          <Image src="/design/icons/subscription.svg" width="20" height="20" />
        </div>
      </footer>
    </div>
  );
};

const ProductInfo = ({ openAccordion, toggleAccordion }) => {
  const {
    productName,
    productColors,
    productSize,
    listing,
    productPrice,
    setProductName,
    setProductType,
    setProductColor,
    setProductSize,
    setListing,
    setProductPrice,
  } = usePublishDesign();
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
        <div className=" text-sm ml-12  grid grid-cols-2 gap-10 gap-y-5 mt-5 ">
          {/* name */}
          <div>
            <Label className="mb-2">Product Name</Label>
            <Input
              className="border-primary/40"
              value={productName}
              onInput={(e) => setProductName(e.target.value)}
            />
          </div>

          {/* category */}
          <div>
            <Label className="mb-2">Product Category</Label>
            <Select defaultValue="t_shirt" onValueChange={setProductType}>
              <SelectTrigger className="w-full border-primary/40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="t_shirt">T-Shirts</SelectItem>
                <SelectItem value="sweatshirt">Sweatshirt</SelectItem>
                <SelectItem value="hoodies">Hoodies</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* price */}
          <div>
            <Label className="mb-2">Product Price</Label>
            <Input
              className="border-primary/40"
              value={productPrice}
              onInput={(e) => setProductPrice(e.target.value)}
              type="number"
            />
          </div>

          {/* listing */}
          <div>
            <Label className="mb-2">Listing</Label>
            <Select
              defaultValue="T-Shirts"
              onValueChange={setProductType}
              disabled
            >
              <SelectTrigger className="w-full border-primary/40">
                <SelectValue placeholder="Listing" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="T-Shirts">Store</SelectItem>
                <SelectItem value="Hoodies">Hoodies</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sizes */}
          <div>
            <Label className="mb-2">Size</Label>
            <div className=" border border-primary/40 h-9 rounded-md w-full flex gap-1 items-center px-3">
              {productSize.map((size) => (
                <span className="p-1 bg-primary text-white rounded-sm inline-block text-xs">
                  {size}
                </span>
              ))}
            </div>
            <div className="mt-2 flex gap-1">
              <Button
                className="text-[10px] size-6"
                onClick={() => setProductSize("XS")}
              >
                XS
              </Button>
              <Button
                className="text-[10px] size-6"
                onClick={() => setProductSize("S")}
              >
                S
              </Button>
              <Button
                className="text-[10px] size-6"
                onClick={() => setProductSize("M")}
              >
                M
              </Button>
              <Button
                className="text-[10px] size-6"
                onClick={() => setProductSize("XL")}
              >
                XL
              </Button>
              <Button
                className="text-[10px] size-6"
                onClick={() => setProductSize("2XL")}
              >
                2XL
              </Button>
            </div>
          </div>

          {/* color */}
          <div className="">
            <Label className="mb-2">Select Color</Label>
            <div className="flex gap-2 items-center w-full">
              <div className="flex gap-2 items-center w-full">
                <Label className="cursor-pointer relative w-full">
                  <div className="border border-primary/40 h-9 rounded-md min-w-full flex gap-1 items-center px-3">
                    {productColors.map((color) => (
                      <div
                        key={color}
                        className="w-6 h-6 rounded-full border border-gray-300 cursor-pointer"
                        style={{ backgroundColor: color }}
                        onClick={() => setProductColor(color)}
                      ></div>
                    ))}
                  </div>
                  <Input
                    type="color"
                    className="opacity-0 absolute pointer-events-none bottom-0 left-0  appearance-none"
                    onChange={(e) => setProductColor(e.target.value)}
                  />
                </Label>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Visibility = ({ openAccordion, toggleAccordion }) => {
  const {
    setVisibilityPassword,
    setVisibility,
    visibility,
    visibilityPassword,
  } = usePublishDesign();
  return (
    <section>
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
      </div>

      {openAccordion === "two" && (
        <div className="mt-5 text-sm text-gray-600 ml-12 ">
          <header className="flex items-center justify-between mr-20">
            <p className="text-lg">Public</p>
            <Switch
              onCheckedChange={() => setVisibility(!visibility)}
              checked={visibility}
            />
          </header>

          <div className="mt-4 text-gray-700">
            <p className="text-lg mb-0.5">Password Protection</p>
            <p>Add an extra layer of privacy for exclusive products.</p>

            <Input
              type="password"
              className="w-80 mt-2 border-2 border-black/80"
              placeholder="Set Password"
              value={!visibility ? visibilityPassword : ""}
              disabled={visibility}
              onInput={(e) => setVisibilityPassword(e.target.value)}
            />
          </div>
        </div>
      )}
    </section>
  );
};

const Advanced = ({ openAccordion, toggleAccordion }) => {
  return (
    <>
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
      </div>
      {openAccordion === "three" && (
        <div className="mt-2 text-sm text-gray-600 ml-12">
          <header>
            <div className="text-lg text-black font-medium">
              <span className="text-red-400 font-semibold ">* </span> Content
              Vetting
            </div>

            <p className="text-gray-500 mt-2 line-clamp-2">
              Every design is scanned for potential copyright issues and
              reviewed for offensive <br /> content to maintain a professional
              and inclusive community.
            </p>
          </header>

          <section className="mt-6 ml-5 mr-20">
            <div className="flex items-center justify-between gap-20 mb-1">
              <div>
                <p className="text-lg font-medium text-gray-800">Copyright</p>
                <p>
                  A subscription plan that caters for every user’s category
                  needs
                </p>
              </div>
              <div className="size-12 border-4 border-bluebutton rounded-full grid place-items-center text-sm border-t-gray-200 rotate-45">
                <p className="-rotate-45">65%</p>
              </div>
            </div>

            <hr />

            <div className="flex items-center justify-between gap-20 mb-1 mt-5">
              <div>
                <p className="text-lg font-medium text-gray-800">
                  Offensive Content
                </p>
                <p>
                  A subscription plan that caters for every user’s category
                  needs
                </p>
              </div>
              <div className="size-12 border-4 border-gray-200 rounded-full grid place-items-center text-sm border-t-bluebutton rotate-45">
                <p className="-rotate-45">25%</p>
              </div>
            </div>

            <hr />
          </section>
        </div>
      )}
    </>
  );
};
