import React, { useEffect, useState } from "react";
import { getDashboardSummary } from "../../api/dashboard";
import { Package, Boxes, AlertTriangle } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await getDashboardSummary();
        setSummary(res.data);
      } catch (err) {
        setError("Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <p className="text-center mt-10 text-gray-400">
        Loading dashboard...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-center mt-10 text-red-500">
        {error}
      </p>
    );
  }

  const { totalProducts, totalQuantity, lowStockProducts } = summary;

  return (
    <div className="px-4 md:px-12 py-10">
      <h1 className="text-3xl font-bold mb-10">Dashboard</h1>

      {/* 🔹 Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Total Products */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 rounded-full bg-gray-100 text-gray-700">
              <Package />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Products</p>
              <p className="text-2xl font-bold">{totalProducts}</p>
            </div>
          </CardContent>
        </Card>

        {/* Total Quantity */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 rounded-full bg-gray-100 text-gray-700">
              <Boxes />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Quantity</p>
              <p className="text-2xl font-bold">{totalQuantity}</p>
            </div>
          </CardContent>
        </Card>

        {/* Low Stock */}
        <Card className="hover:shadow-lg transition-shadow border-red-500/30">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 rounded-full bg-red-100 text-red-600">
              <AlertTriangle />
            </div>
            <div>
              <p className="text-sm text-gray-500">Low Stock Items</p>
              <p className="text-2xl font-bold">
                {lowStockProducts.length}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 🔻 Low Stock Products Table */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">
            Low Stock Products
          </h2>

          {lowStockProducts.length === 0 ? (
            <p className="text-gray-500">
              No low stock products 🎉
            </p>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b text-left text-gray-600">
                  <th className="py-2">Name</th>
                  <th className="py-2">SKU</th>
                  <th className="py-2">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {lowStockProducts.map((product) => (
                  <tr
                    key={product._id}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="py-2">{product.name}</td>
                    <td className="py-2">{product.sku}</td>
                    <td className="py-2 text-red-600 font-semibold">
                      {product.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
