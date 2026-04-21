// src/app/pages/production/InventoryManagement.jsx
import { Package, TrendingDown, TrendingUp, AlertTriangle } from 'lucide-react';

export default function InventoryManagement() {
  const inventoryStats = {
    rawMaterial: 245,
    finishedGoods: 12450,
    lowStock: 8,
    totalValue: 18500000
  };

  const rawMaterials = [
    { id: 'RM-001', name: 'Lead Ingots', currentStock: 15000, unit: 'Kg', minStock: 10000, status: 'Normal', value: 2250000 },
    { id: 'RM-002', name: 'Sulfuric Acid', currentStock: 8000, unit: 'Litre', minStock: 5000, status: 'Normal', value: 400000 },
    { id: 'RM-003', name: 'PP Granules', currentStock: 2500, unit: 'Kg', minStock: 3000, status: 'Low Stock', value: 375000 },
    { id: 'RM-004', name: 'Separators', currentStock: 45000, unit: 'Pcs', minStock: 30000, status: 'Normal', value: 225000 },
  ];

  const finishedGoods = [
    { sku: 'NES-150AH', name: 'Inverter Battery 150AH', stock: 1250, reserved: 200, available: 1050, value: 6250000, category: 'Inverter' },
    { sku: 'NES-40AH', name: 'Bike Battery 40AH', stock: 3450, reserved: 450, available: 3000, value: 3450000, category: 'Automotive' },
    { sku: 'NES-100AH', name: 'E-Rickshaw Battery 100AH', stock: 2100, reserved: 300, available: 1800, value: 5250000, category: 'E-Rickshaw' },
    { sku: 'NES-200AH', name: 'Solar Battery 200AH', stock: 850, reserved: 150, available: 700, value: 3400000, category: 'Solar' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-gray-900">Inventory Management</h1>
          <p className="text-sm text-gray-600">Track raw materials and finished goods inventory</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Stock Adjustment
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Raw Materials</p>
            <Package className="size-5 text-blue-500" />
          </div>
          <p className="font-bold text-gray-900">{inventoryStats.rawMaterial}</p>
          <p className="text-xs text-gray-500 mt-1">SKU items</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Finished Goods</p>
            <Package className="size-5 text-green-500" />
          </div>
          <p className="font-bold text-gray-900">{inventoryStats.finishedGoods.toLocaleString()}</p>
          <p className="text-xs text-gray-500 mt-1">Units</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Low Stock Alerts</p>
            <AlertTriangle className="size-5 text-orange-500" />
          </div>
          <p className="font-bold text-gray-900">{inventoryStats.lowStock}</p>
          <p className="text-xs text-gray-500 mt-1">Items below min</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Total Value</p>
            <TrendingUp className="size-5 text-purple-500" />
          </div>
          <p className="font-bold text-gray-900">₹{(inventoryStats.totalValue / 10000000).toFixed(1)}Cr</p>
          <p className="text-xs text-gray-500 mt-1">Inventory worth</p>
        </div>
      </div>

      {/* Raw Materials */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900">Raw Material Stock</h3>
          <p className="text-sm text-gray-600 mt-1">Current inventory levels</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-3 px-4 text-sm text-gray-600">Material ID</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Material Name</th>
                <th className="text-right py-3 px-4 text-sm text-gray-600">Current Stock</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Unit</th>
                <th className="text-right py-3 px-4 text-sm text-gray-600">Min Stock</th>
                <th className="text-right py-3 px-4 text-sm text-gray-600">Value (₹)</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {rawMaterials.map((material) => (
                <tr key={material.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-800">{material.id}</td>
                  <td className="py-3 px-4 text-sm text-gray-800 font-medium">{material.name}</td>
                  <td className="py-3 px-4 text-sm text-right text-gray-800">{material.currentStock.toLocaleString()}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{material.unit}</td>
                  <td className="py-3 px-4 text-sm text-right text-gray-600">{material.minStock.toLocaleString()}</td>
                  <td className="py-3 px-4 text-sm text-right text-gray-600">{material.value.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <span className={`text-xs px-2 py-1 rounded ${
                      material.status === 'Low Stock' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'
                    }`}>
                      {material.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Finished Goods */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900">Finished Goods Inventory</h3>
          <p className="text-sm text-gray-600 mt-1">Battery models and stock levels</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-3 px-4 text-sm text-gray-600">SKU</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Product Name</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Category</th>
                <th className="text-right py-3 px-4 text-sm text-gray-600">Stock</th>
                <th className="text-right py-3 px-4 text-sm text-gray-600">Reserved</th>
                <th className="text-right py-3 px-4 text-sm text-gray-600">Available</th>
                <th className="text-right py-3 px-4 text-sm text-gray-600">Value (₹)</th>
              </tr>
            </thead>
            <tbody>
              {finishedGoods.map((product) => (
                <tr key={product.sku} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-800 font-mono">{product.sku}</td>
                  <td className="py-3 px-4 text-sm text-gray-800 font-medium">{product.name}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{product.category}</td>
                  <td className="py-3 px-4 text-sm text-right text-gray-800">{product.stock.toLocaleString()}</td>
                  <td className="py-3 px-4 text-sm text-right text-orange-600">{product.reserved.toLocaleString()}</td>
                  <td className="py-3 px-4 text-sm text-right text-green-600 font-medium">{product.available.toLocaleString()}</td>
                  <td className="py-3 px-4 text-sm text-right text-gray-600">{product.value.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
