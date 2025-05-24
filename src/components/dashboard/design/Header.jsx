import React, { useEffect, useState } from "react";
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
import useDesignStore from "@/store/DesignStore";
import { AVAILABLE_FONTS } from "@/constants";
import ApparelView from "./ApparelView";
import ElementRenderer from "./ElementRenderer";
import { usePublishDesign } from "@/store/usePublishDesign";
import { useMutation } from "@tanstack/react-query";
import { useCreatorStore } from "@/store/useCreatorShopFront";
import { httpClient } from "@/lib/httpClient";

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
  const {
    designs,
    selectedElementId,
    updateElement,
    currentDesignId,
    undo,
    redo,
  } = useDesignStore();

  const handleColorChange = (color) => {
    if (selectedElementId) {
      updateElement({ elementId: selectedElementId, updates: { color } });
    }
  };

  // const handleBoldToggle = () => {
  //   if (selectedElementId) {
  //     updateElement({
  //       elementId: selectedElementId,
  //       updates: { fontWeight: "bold" },
  //     });
  //   }
  // };

  // const handleItalicToggle = () => {
  //   if (selectedElementId) {
  //     updateElement({
  //       elementId: selectedElementId,
  //       updates: { fontStyle: "italic" },
  //     });
  //   }
  // };
  // const handleUnderlineToggle = () => {
  //   if (selectedElementId) {
  //     updateElement({
  //       elementId: selectedElementId,
  //       updates: { textDecoration: "underline" },
  //     });
  //   }
  // };

  const selectedElement = designs
    ?.find((design) => design.id === currentDesignId)
    ?.elements?.find((el) => el.id === selectedElementId);

  const toggleStyle = (styleKey, value) => {
    if (selectedElementId) {
      const currentValue = selectedElement?.[styleKey];
      console.log("currentValue", selectedElement);
      updateElement({
        elementId: selectedElementId,
        updates: { [styleKey]: currentValue === value ? null : value },
      });
    }
  };

  const handleFontFamilyChange = (fontFamily) => {
    if (selectedElementId) {
      updateElement({
        elementId: selectedElementId,
        updates: { fontFamily },
      });
    }
  };
  const toggleCase = () => {
    if (selectedElementId) {
      const currentTransform = selectedElement?.textTransform || "none";
      let newTransform;

      // Toggle between 'uppercase', 'lowercase', and 'none'
      if (currentTransform === "none") {
        newTransform = "uppercase";
      } else if (currentTransform === "uppercase") {
        newTransform = "lowercase";
      } else {
        newTransform = "none";
      }

      updateElement({
        elementId: selectedElementId,
        updates: { textTransform: newTransform },
      });
    }
  };
  return (
    <header className="bg-white sticky top-0 p-4 shadow-md flex justify-between gap-10 items-center">
      <section className="flex items-center  gap-10 ">
        <Select onValueChange={handleFontFamilyChange}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Helvica" />
          </SelectTrigger>
          <SelectContent>
            {AVAILABLE_FONTS.map((font) => (
              <SelectItem key={font} value={font}>
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
                className="opacity-0 absolute pointer-events-none bottom-0 left-0 hidde"
                onChange={(e) => handleColorChange(e.target.value)}
              />
            </Label>
          </div>

          <div
            className={cn(" cursor-pointer p-1 rounded-md", {
              "bg-gray-200": selectedElement?.fontWeight === "bold",
            })}
          >
            <Bold
              color={"rgba(18, 18, 18, 0.44)"}
              size={20}
              onClick={() => toggleStyle("fontWeight", "bold")}
            />
          </div>

          <div
            className={cn(" cursor-pointer p-1 rounded-md", {
              "bg-gray-200": selectedElement?.fontStyle === "italic",
            })}
          >
            <Italic
              color="rgba(18, 18, 18, 0.44)"
              size={20}
              className=" cursor-pointer"
              onClick={() => toggleStyle("fontStyle", "italic")}
            />
          </div>
          <div
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
          </div>

          <div
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
          </div>
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

export const PreviewOverlay = () => {
  const PREVIEW_CANVAS_WIDTH = 450;
  const PREVIEW_CANVAS_HEIGHT = 450;
  const { designs, currentDesignId } = useDesignStore();

  const currentDesign = designs.find((d) => d.id === currentDesignId);

  const [previewView, setPreviewView] = useState(
    currentDesign?.apparelView || "front"
  );
  const [previewZoomLevel, setPreviewZoomLevel] = useState(1);

  useEffect(() => {
    if (currentDesign) {
      setPreviewView(currentDesign.apparelView);
    }
  }, [currentDesign?.apparelView, currentDesign]);

  const visibleElements = (currentDesign.elements || []).filter(
    (el) => el.associatedView === previewView
  );

  let apparelDisplayWidth = PREVIEW_CANVAS_WIDTH;
  let apparelDisplayHeight = PREVIEW_CANVAS_HEIGHT;

  const previewContainerStyle = {
    width: `${PREVIEW_CANVAS_WIDTH}px`,
    height: `${PREVIEW_CANVAS_HEIGHT}px`, // Keep container fixed
    transform: `scale(${previewZoomLevel})`,
    transformOrigin: "center center",
    transition: "transform 0.1s ease-out",
  };

  const apparelContainerStyle = {
    width: `${apparelDisplayWidth}px`,
    height: `${apparelDisplayHeight}px`,
    position: "relative",
    overflow: "hidden", // This is crucial for clipping elements
    margin: "auto", // Center the apparel within the scaled container
    backgroundColor: currentDesign.apparelColor, // Fallback if no base image
  };

  return (
    <div>
      <DialogHeader className="flex items-center justify-between flex-row">
        <DialogTitle>
          <div>Preview </div>
        </DialogTitle>

        <Select
          defaultValue="front"
          value={previewView}
          onValueChange={setPreviewView}
        >
          <SelectTrigger className=" rounded-md cursor-pointer gap-2 border-primary/40 w-20">
            <SelectValue placeholder="View" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="front">Front</SelectItem>
            <SelectItem value="back">Back</SelectItem>
            <SelectItem value="left">Left</SelectItem>
            <SelectItem value="right">Right</SelectItem>
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
        <div className="borde border-primary/40  rounded-md p-5">
          <div style={previewContainerStyle}>
            {/* Inner container for apparel and elements, with overflow:hidden */}
            <div
              id="preview-apparel-container"
              style={apparelContainerStyle}
              className="border border-primary/40 rounded-md shadow-lg"
            >
              <ApparelView
                apparelType={currentDesign.apparelType}
                apparelColor={currentDesign.apparelColor} // ApparelView will use this if no base image
                apparelView={previewView}
                // We let ApparelView determine its own image source (custom or placeholder)
                // and its internal sizing. We just ensure its container clips.
              />
              {visibleElements.map((element) => (
                <ElementRenderer
                  key={element.id}
                  element={element}
                  isSelected={false} // Nothing is selected in preview
                  onElementContextMenu={() => {}} // No context menu in preview
                  zoomLevel={1} // Elements inside are rendered at 100% of their size relative to apparel
                  isPreview={true} // Key: Tells ElementRenderer it's in preview mode
                  // Pass the dimensions of the apparel display area so elements can scale correctly
                  // This is a conceptual change; ElementRenderer would need to use these if its % pos is relative to these
                  canvasWidthForElements={apparelDisplayWidth}
                  canvasHeightForElements={apparelDisplayHeight}
                />
              ))}
            </div>
          </div>
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
  const state = useDesignStore();
  const design = state.designs.find((d) => d.id === state.currentDesignId);

  const { storeLogoFile } = useCreatorStore();
  const {
    productName,
    productColor,
    productSize,

    productPrice,
    productType,
  } = usePublishDesign();

  const designMutation = useMutation({
    mutationFn: async (data) => {
      const response = await httpClient.post("/designs/create/", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
      return response.data;
    },
    onSuccess: (data) => {
      router.push("/creatorstore");
      if (data["response status"] === "success") {
        router.push("/creatorstore");
      } else {
        setError(data["response description"] || "Error creating store");
      }
    },
    onError: (error) => {
      setError(error.message || "Error creating store");
      console.log(error);
    },
  });

  const onSubmit = () => {
    const formData = new FormData();
    // const emptyFile = new File([""], "empty.png", { type: "image/png" });

    formData.append("design_description", productName);
    formData.append("product_category", productType);
    formData.append("shop_price", productPrice);
    // Create an empty file for front_view
    // formData.append("front_view", emptyFile);
    // formData.append("back_view", emptyFile);
    // formData.append("left_view", emptyFile);
    // formData.append("right_view", emptyFile);
    formData.append("desgin_view_data", JSON.stringify(design));

    // console.log(productType);
    // console.log(JSON.stringify(design));
    designMutation.mutate(formData);
  };

  const [openAccordion, setOpenAccordion] = React.useState(null);

  const { designs, currentDesignId } = useDesignStore();

  const currentDesign = designs.find((d) => d.id === currentDesignId);

  const [previewView, setPreviewView] = useState(
    currentDesign?.apparelView || "front"
  );
  const [previewZoomLevel, setPreviewZoomLevel] = useState(1);

  useEffect(() => {
    if (currentDesign) {
      setPreviewView(currentDesign.apparelView);
    }
  }, [currentDesign?.apparelView, currentDesign]);

  const visibleElements = (currentDesign.elements || []).filter(
    (el) => el.associatedView === previewView
  );

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

              <section
                className="relative scale-[0.6] -ml-[90px] -mt-20 p-5 rounded-2xl border border-primary/40"
                style={{ background: currentDesign.apparelColor }}
              >
                <div>
                  <ApparelView
                    apparelType={currentDesign.apparelType}
                    // apparelColor={currentDesign.apparelColor} // ApparelView will use this if no base image
                    apparelView={previewView}
                    // We let ApparelView determine its own image source (custom or placeholder)
                    // and its internal sizing. We just ensure its container clips.
                  />
                  {visibleElements.map((element) => (
                    <ElementRenderer
                      key={element.id}
                      element={element}
                      isSelected={false} // Nothing is selected in preview
                      onElementContextMenu={() => {}} // No context menu in preview
                      zoomLevel={1} // Elements inside are rendered at 100% of their size relative to apparel
                      isPreview={true} // Key: Tells ElementRenderer it's in preview mode
                      // canvasWidthForElements={apparelDisplayWidth}
                      // canvasHeightForElements={apparelDisplayHeight}
                    />
                  ))}
                </div>
              </section>

              <div className="-mt-20">
                <p className="font-semibold">{productName}</p>

                <div className="text-sm">
                  <p className="text-primary/40 mt-1">
                    Category:{" "}
                    <span className="text-primary/90">{productType}</span>
                  </p>

                  {/* colors */}
                  <div>
                    <p className="text-primary/40 mt-1">Colors: </p>
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

      <footer className="mt-10 flex justify-between">
        <div></div>
        <Button onClick={onSubmit} className="w-24">
          {designMutation.isPending ? (
            <Loader className=" animate-spin" />
          ) : (
            "Publish"
          )}
        </Button>
      </footer>
    </div>
  );
};

const ProductInfo = ({ openAccordion, toggleAccordion }) => {
  const {
    productName,
    productColor,
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
          <div>
            <Label className="mb-2">Select Color</Label>
            <Select defaultValue="" onValueChange={setProductType} disabled>
              <SelectTrigger className="w-full border-primary/40">
                <SelectValue placeholder="Color" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="T-Shirts">Store</SelectItem>
                <SelectItem value="Hoodies">Hoodies</SelectItem>
              </SelectContent>
            </Select>
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
