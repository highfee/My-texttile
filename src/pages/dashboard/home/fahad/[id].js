"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  Heart,
  Share2,
  Download,
  Edit3,
  ShoppingCart,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/router";
import { useGetAllDesigns } from "@/store/apiCalls/useDesignStore";
import { Input } from "@/components/ui/input";
import { useDesignStore } from "@/store/design-store";

export default function DesignView() {
  const router = useRouter();

  const [previewImages, setPreviewImages] = useState([]);
  const [mainImage, setMainImage] = useState(null);

  const [isProtected, setIsProtected] = useState(false);

  const [password, setPassword] = useState("");

  const {
    data: recentProjects,
    isLoading,
    error,
    refetch,
  } = useGetAllDesigns();

  const product = recentProjects?.find(
    (project) => project.id === router.query.id
  );

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
      setIsProtected(!product.isPublic || false);
    }
  }, [product]);

  const handleBackToDesigns = () => {
    router.push("/dashboard/home");
  };
  console.log(product);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={handleBackToDesigns}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Designs
              </Button>
            </div>
          </div>
        </div>
      </div>

      {isProtected ? (
        <div className="bg-red-100 text-red-800 p-4 text-center flex flex-col items-center justify-center space-y-4">
          <Input
            placeholder="Password"
            className=" h-12 w-80 border-gray-900"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autofocus
          />
          <Button
            onClick={() => {
              if (password === product?.password) {
                setIsProtected(false);
              } else {
                alert("Incorrect password. Please try again.");
              }
            }}
          >
            Show
          </Button>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Design Preview */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
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
                      width={500}
                      height={500}
                      className="w-full h-full object-cover"
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
                </CardContent>
              </Card>

              {/* Design Specifications */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Design Specifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Dimensions:</span>
                      <p className="text-gray-600">12" x 16"</p>
                    </div>
                    <div>
                      <span className="font-medium">Resolution:</span>
                      <p className="text-gray-600">300 DPI</p>
                    </div>
                    <div>
                      <span className="font-medium">Format:</span>
                      <p className="text-gray-600">PNG, SVG</p>
                    </div>
                    <div>
                      <span className="font-medium">Colors:</span>
                      <p className="text-gray-600">CMYK Ready</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                {/* <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary">Best Seller</Badge>
                  <Badge variant="outline">New</Badge>
                </div> */}
                <h1 className="text-3xl font-bold mb-2">
                  {product?.design_description}
                </h1>
                {/* <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    (4.8) • 1,234 reviews
                  </span>
                </div> */}
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-3xl font-bold">
                    ${product?.shop_price}
                  </span>
                  {/* <span className="text-lg text-gray-500 line-through">
                    $35.99
                  </span>
                  <Badge variant="destructive">28% OFF</Badge> */}
                </div>
              </div>

              <Separator />

              {/* Product Options */}
              <div className="space-y-6">
                {/* Color Selection */}
                <div>
                  <Label className="text-base font-medium mb-3 block">
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
                  <Label className="text-base font-medium mb-3 block">
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

                {/* Quantity */}
                {/* <div>
                  <Label className="text-base font-medium mb-3 block">
                    Quantity
                  </Label>
                  <Select value={quantity} onValueChange={setQuantity}>
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 10, 25, 50].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div> */}
              </div>

              <Separator />

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  // variant="outline"
                  size="lg"
                  className="w-full "
                  onClick={() => {
                    // loadTemplate(product.design_view_data);
                    router.push("/dashboard/design?edit=true&id=" + product.id);
                  }}
                >
                  <Edit3 className="w-4 h-4 mr-2" />
                  Customize Design
                </Button>
              </div>

              <Separator />

              {/* Additional Information */}
              <Tabs defaultValue="description" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="materials">Materials</TabsTrigger>
                  <TabsTrigger value="shipping">Shipping</TabsTrigger>
                </TabsList>
                <TabsContent value="description" className="space-y-4">
                  <p className="text-gray-600">
                    Premium quality unisex classic t-shirt featuring a unique
                    artistic design. Perfect for casual wear and making a
                    statement. Made with sustainable materials and eco-friendly
                    printing processes.
                  </p>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    <li>100% organic cotton</li>
                    <li>Pre-shrunk fabric</li>
                    <li>Reinforced seams</li>
                    <li>Machine washable</li>
                  </ul>
                </TabsContent>
                <TabsContent value="materials" className="space-y-4">
                  <div className="text-sm space-y-2">
                    <p>
                      <strong>Fabric:</strong> 100% Organic Cotton
                    </p>
                    <p>
                      <strong>Weight:</strong> 180 GSM
                    </p>
                    <p>
                      <strong>Print:</strong> Water-based eco-friendly ink
                    </p>
                    <p>
                      <strong>Care:</strong> Machine wash cold, tumble dry low
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="shipping" className="space-y-4">
                  <div className="text-sm space-y-2">
                    <p>
                      <strong>Processing Time:</strong> 2-3 business days
                    </p>
                    <p>
                      <strong>Shipping Time:</strong> 5-7 business days
                    </p>
                    <p>
                      <strong>Free Shipping:</strong> Orders over $50
                    </p>
                    <p>
                      <strong>Returns:</strong> 30-day return policy
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
