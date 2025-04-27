"use client";
import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AddProduct({
  product: initialProduct,
  onSave,
  onCancel,
}) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (initialProduct) {
      setName(initialProduct.name || "");
      setPrice(initialProduct.price || "");
      setImage(initialProduct.image || null);
    } else {
      setName("");
      setPrice("");
      setImage(null);
    }
  }, [initialProduct]);

  const handleSave = () => {
    if (name.trim()) {
      const productData = {
        id: initialProduct?.id, // Keep existing ID for editing
        name,
        price,
        image,
      };
      onSave(productData);
    } else {
      // Optionally show an error message if the name is empty
      alert("Product name is required");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Basic image preview (you might want to handle uploads differently)
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={onCancel}
          >
            <ArrowLeft className="w-5 h-5 text-gray-500" />
            <h2 className="text-lg font-semibold">
              {initialProduct ? "Edit Product" : "Add Product"}
            </h2>
          </div>
          <Button
            onClick={handleSave}
            className="bg-bluebutton "
          >
            {initialProduct ? "Save" : "Add"}
          </Button>
        </div>

        <div className="flex flex-col items-center justify-center flex-grow text-center py-24 px-8">
          {/* Placeholder Image */}
          <div className="w-16 h-16 mb-4">
            <img
              src="/canvas.svg"
              alt="No Product"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Text */}
          <p className="text-gray-500 mb-4">
            It seems you don’t have a product yet
          </p>

          {/* Create Product Button */}
          <Button className="bg-bluebutton ">
            Create Product
          </Button>
        </div>
      </div>
    </div>
  );
}
