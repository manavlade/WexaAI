import React, { useEffect, useState } from "react";
import { getProducts } from "../../api/product";
import { Plus, Search } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import AddProductDialog from "./AddProductDialog";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await getProducts();
      setProducts(res.products || []);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="px-4 md:px-12 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Products</h1>

        <Button onClick={() => setOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Search by name or SKU"
          className="pl-10"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-6">
          {loading ? (
            <p className="text-gray-400">Loading products...</p>
          ) : filteredProducts.length === 0 ? (
            <p className="text-gray-500">No products found</p>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b text-left text-gray-600">
                  <th className="py-2">Name</th>
                  <th className="py-2">SKU</th>
                  <th className="py-2">Quantity</th>
                  <th className="py-2">Selling Price</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr
                    key={product._id}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="py-2">{product.name}</td>
                    <td className="py-2">{product.sku}</td>
                    <td className="py-2">{product.quantity}</td>
                    <td className="py-2 font-medium">
                      ₹{product.sellingPrice}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>

      {/* Add Product Dialog */}
      <AddProductDialog
        open={open}
        setOpen={setOpen}
        onSuccess={fetchProducts}
      />
    </div>
  );
};

export default Products;
