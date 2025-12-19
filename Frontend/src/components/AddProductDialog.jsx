import { useState } from "react";
import { createProduct } from "../../api/product";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AddProductDialog = ({ open, setOpen, onSuccess }) => {
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await createProduct({
        ...form,
        quantity: Number(form.quantity),
        costPrice: Number(form.costPrice),
        sellingPrice: Number(form.sellingPrice),
        lowStockThreshold: form.lowStockThreshold
          ? Number(form.lowStockThreshold)
          : undefined,
      });

      setOpen(false);
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Product</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input name="name" placeholder="Product Name" onChange={handleChange} required />
          <Input name="sku" placeholder="SKU" onChange={handleChange} required />
          <Input name="description" placeholder="Description" onChange={handleChange} />

          <div className="grid grid-cols-2 gap-4">
            <Input name="quantity" type="number" placeholder="Quantity" onChange={handleChange} required />
            <Input name="lowStockThreshold" type="number" placeholder="Low Stock Threshold" onChange={handleChange} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input name="costPrice" type="number" placeholder="Cost Price" onChange={handleChange} required />
            <Input name="sellingPrice" type="number" placeholder="Selling Price" onChange={handleChange} required />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Saving..." : "Create Product"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductDialog;
