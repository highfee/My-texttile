"use client";
import { useState, useRef, useEffect } from "react";
import AddProduct from "./AddProduct";
import { Button } from "@/components/ui/button";
import { useCreatorStore } from "@/store/useCreatorShopFront";

export default function Productspopup({
  onSave,
  onCancel,
  products: initialProducts,
}) {
  const { products, addProduct, setProducts } = useCreatorStore();

  // const [products, setProducts] = useState(initialProducts || []);
  const [showAddProductPopup, setShowAddProductPopup] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const popupRef = useRef(null);

  // Handle click outside to close popup
  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onCancel();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onCancel]);

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowAddProductPopup(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct({ ...product }); // Create a copy to avoid direct state modification
    setShowAddProductPopup(true);
  };

  const handleSaveProduct = (newProduct) => {
    if (editingProduct) {
      // Update existing product
      setProducts(
        products.map((p) => (p.id === editingProduct.id ? newProduct : p))
      );
      setEditingProduct(null);
    } else {
      // Add new product with a unique ID (basic implementation)
      setProducts([...products, { ...newProduct, id: Date.now() }]);
    }
    setShowAddProductPopup(false);
  };

  const handleRemoveProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        ref={popupRef}
        className="bg-white rounded-lg shadow-lg overflow-hidden max-w-md w-full"
      >
        <div className="flex items-center justify-between p-4 ">
          <h1 className="text-xl font-bold">Products</h1>
          <Button onClick={() => onSave(products)} className="bg-bluebutton">
            Done
          </Button>
        </div>
        <div className="p-4">
          {products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 px-8 text-center">
              <p className="text-gray-500 mb-4">
                Select the products to be displayed on your store.
              </p>
              <Button onClick={handleAddProduct} className="bg-bluebutton">
                Add Product
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="border border-gray-200 rounded-lg p-4 relative group"
                >
                  <div className="flex items-start space-x-4">
                    {product.image && (
                      <img
                        src={product.image}
                        alt={product.name || "Product"}
                        className="w-16 h-16 object-contain rounded"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="font-medium">
                        {product.name || "Untitled Product"}
                      </h3>
                      <p className="text-gray-600">
                        {product.price || "No price set"}
                      </p>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      onClick={() => handleEditProduct(product)}
                      className="text-bluebutton  mr-2"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => handleRemoveProduct(product.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
              <Button onClick={handleAddProduct} className="mt-4 bg-bluebutton">
                Add Product
              </Button>
            </div>
          )}
        </div>

        {/* Add/Edit Product Popup */}
        {showAddProductPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <AddProduct
              product={editingProduct}
              onSave={handleSaveProduct}
              onCancel={() => setShowAddProductPopup(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
