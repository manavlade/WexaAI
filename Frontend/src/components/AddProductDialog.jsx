import { useEffect, useState } from "react";
import { createProduct, updateProduct } from "../../api/product";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const AddProductDialog = ({ open, setOpen, onSuccess, product, clearProduct }) => {
  const [form, setForm] = useState({
    name: "",
    sku: "",
    description: "",
    quantity: "",
    costPrice: "",
    sellingPrice: "",
    lowStockThreshold: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Populate form when editing
  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        sku: product.sku,
        description: product.description || "",
        quantity: product.quantity,
        costPrice: product.costPrice,
        sellingPrice: product.sellingPrice,
        lowStockThreshold: product.lowStockThreshold || "",
      });
    }
  }, [product]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    setOpen(false);
    clearProduct();
    setForm({
      name: "",
      sku: "",
      description: "",
      quantity: "",
      costPrice: "",
      sellingPrice: "",
      lowStockThreshold: "",
    });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload = {
      ...form,
      quantity: Number(form.quantity),
      costPrice: Number(form.costPrice),
      sellingPrice: Number(form.sellingPrice),
      lowStockThreshold: form.lowStockThreshold
        ? Number(form.lowStockThreshold)
        : undefined,
    };

    try {
      if (product) {
        await updateProduct(product._id, payload);
      } else {
        await createProduct(payload);
      }

      handleClose();
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {product ? "Edit Product" : "Add Product"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input name="name" placeholder="Product Name" value={form.name} onChange={handleChange} required />
          <Input name="sku" placeholder="SKU" value={form.sku} onChange={handleChange} required />
          <Input name="description" placeholder="Description" value={form.description} onChange={handleChange} />

          <div className="grid grid-cols-2 gap-4">
            <Input name="quantity" type="number" placeholder="Quantity" value={form.quantity} onChange={handleChange} required />
            <Input name="lowStockThreshold" type="number" placeholder="Low Stock Threshold" value={form.lowStockThreshold} onChange={handleChange} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input name="costPrice" type="number" placeholder="Cost Price" value={form.costPrice} onChange={handleChange} required />
            <Input name="sellingPrice" type="number" placeholder="Selling Price" value={form.sellingPrice} onChange={handleChange} required />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <Button type="submit" disabled={loading} className="w-full">
            {loading
              ? "Saving..."
              : product
              ? "Update Product"
              : "Create Product"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductDialog;
