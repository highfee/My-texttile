import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  useGetSingleDesign,
  useUpdateDesignStatus,
} from "@/store/apiCalls/useAdminStore";
import { Loader } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";

const DesignDetails = ({ onBack }) => {
  const router = useRouter();

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useGetSingleDesign(router.query.id);

  const {
    mutate: updateDesign,
    isPending: isUpdatingDesign,
    isError: isUpdateDesignError,
    error: updateDesignError,
  } = useUpdateDesignStatus();

  const [previewImages, setPreviewImages] = useState([]);
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    if (product?.design_view_data) {
      const images = [];
      if (product.design_view_data.front?.imageDataUrl) {
        images.push(product.design_view_data.front.imageDataUrl);
      }
      if (product.design_view_data.back?.imageDataUrl) {
        images.push(product.design_view_data.back.imageDataUrl);
      }
      if (product.design_view_data.left?.imageDataUrl) {
        images.push(product.design_view_data.back.imageDataUrl);
      }
      if (product.design_view_data.right?.imageDataUrl) {
        images.push(product.design_view_data.back.imageDataUrl);
      }
      setPreviewImages(images);
      setMainImage(images[0]);
    }
  }, [product]);

  return (
    <div>
      <header className="bg-bluebutton p-5 py-10 flex justify-between items-end rounded-md">
        <div
          onClick={onBack}
          className="flex items-center gap-1 cursor-pointer text-white"
        >
          <BiArrowBack /> Back
        </div>

        <div className="flex gap-5">
          <Button
            className="bg-[#FF5789]"
            onClick={() =>
              updateDesign({
                design_id: product.id,
                approval_status: "approved",
              })
            }
          >
            {isUpdatingDesign ? (
              <Loader className=" animate-spin" />
            ) : (
              <span>Approve</span>
            )}
          </Button>
          <Button
            variant="outline"
            className="bg-transparent text-white"
            onClick={() =>
              updateDesign({
                design_id: product.id,
                approval_status: "declined",
              })
            }
          >
            {isUpdatingDesign ? (
              <Loader className=" animate-spin" />
            ) : (
              <span>Reject Design</span>
            )}
          </Button>
        </div>
      </header>

      <section className="flex flex-col justify-center items-center mt-10">
        {isLoading ? (
          <Loader className="animate-spin" />
        ) : (
          <Card className="w-full py-5">
            <CardContent className="flex grid-cols-5 gap-10">
              <section className="col-span-2">
                <p>Design</p>
                <div className="mt-5">
                  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
                    <Image
                      src={
                        mainImage
                          ? mainImage.startsWith("data:")
                            ? mainImage
                            : process.env.NEXT_PUBLIC_BASE_URL + mainImage
                          : "/placeholder.svg"
                      }
                      alt="Design Preview"
                      width={380}
                      height={380}
                      className="w-ful h-ful object-cover"
                    />
                  </div>
                  <div className="flex gap-2 overflow-x-auto">
                    {previewImages.map((img, i) => (
                      <div key={i} className="flex-shrink-0">
                        <Image
                          src={
                            img.startsWith("data:")
                              ? img
                              : process.env.NEXT_PUBLIC_BASE_URL + img
                          }
                          alt={`Preview ${i + 1}`}
                          width={80}
                          height={80}
                          className={`w-20 h-20 object-cover rounded-lg border-2 cursor-pointer ${
                            mainImage === img
                              ? "border-blue-500"
                              : "border-transparent hover:border-blue-500"
                          }`}
                          onClick={() => setMainImage(img)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* right */}
              <section className="col-span-3 flex-1">
                <header className="flex justify-between gap-10">
                  <div className="flex flex-col items-center gap-5">
                    <p>Name/Category</p>
                    <p className="font-semibold">
                      {product.design_description}
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-5">
                    <p>Price</p>
                    <p className="font-semibold">${product.shop_price}</p>
                  </div>
                  <div className="flex flex-col items-center gap-5">
                    <p>Status</p>
                    <p className="font-medium text-lime-600">
                      {product.approval_status}
                    </p>
                  </div>
                </header>

                <p className="text-sm text-gray-500 mt-2">
                  {product.product_category.toUpperCase().replace("_", "-")}
                </p>

                <div className="mt-5">
                  <p className="text-gray-500">Product Description</p>
                  <p className="text-sm mt-1">{product.design_description}</p>
                </div>

                <div className="space-y-6 mt-4">
                  {/* Color Selection */}
                  <div>
                    <Label className="text-base font-medium mb-1 block">
                      Colors:{" "}
                      {/* {colorOptions.find((c) => c.value === selectedColor)?.name} */}
                    </Label>

                    <div className="flex items-center">
                      {product.color.map((color) => (
                        <div
                          key={color}
                          className="w-6 h-6 rounded-full border-2"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Size Selection */}
                  <div>
                    <Label className="text-base font-medium mb-1 block">
                      Sizes
                    </Label>

                    <div className="flex items-center gap-2">
                      {product.size.map((size) => (
                        <div
                          key={size}
                          className="px-4 py-2 border rounded-md cursor-pointer text-sm font-medium"
                        >
                          {size}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            </CardContent>
          </Card>
        )}
      </section>
    </div>
  );
};

export default DesignDetails;
