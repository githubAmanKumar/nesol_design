// src/app/pages/production/ProductionManagement.tsx
import { useState } from 'react';
import {
  Factory, Package, Timer, CheckCircle, XCircle,
  AlertCircle, Search, Filter, Download, Plus, Eye,
  MoreVertical, Play, Pause, Calendar, Clock, Users,
  Wrench, TrendingUp, ChevronDown, BarChart3, ClipboardList,
  Target
} from 'lucide-react';
import { NewProductionOrderModal } from '../../components/production/NewProductionOrderModal';

export default function ProductionManagement() {
  const [activeTab, setActiveTab] = useState<'orders' | 'bom' | 'wip' | 'dashboard'>('orders');
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [isNewOrderModalOpen, setIsNewOrderModalOpen] = useState(false);

  const billOfMaterials = [
    {
      id: 'BOM/001',
      sku: 'NES-AUTO-150AH',
      model: 'Automotive Battery 150AH',
      version: 'v2.1',
      components: [
        { name: 'Lead', quantity: 12.5, unit: 'Kg' },
        { name: 'Acid', quantity: 4.5, unit: 'Litre' },
        { name: 'Container', quantity: 1, unit: 'Pcs' },
        { name: 'Lid', quantity: 1, unit: 'Pcs' },
        { name: 'Separator', quantity: 15, unit: 'Pcs' },
        { name: 'Terminals', quantity: 2, unit: 'Pcs' },
      ],
      createdDate: '2024-06-15',
      lastModified: '2025-03-20',
      status: 'Active',
    },
    {
      id: 'BOM/002',
      sku: 'NES-INV-200AH',
      model: 'Inverter Battery 200AH',
      version: 'v1.8',
      components: [
        { name: 'Lead', quantity: 18.5, unit: 'Kg' },
        { name: 'Acid', quantity: 6.0, unit: 'Litre' },
        { name: 'Container', quantity: 1, unit: 'Pcs' },
        { name: 'Lid', quantity: 1, unit: 'Pcs' },
        { name: 'Separator', quantity: 20, unit: 'Pcs' },
        { name: 'Terminals', quantity: 2, unit: 'Pcs' },
      ],
      createdDate: '2024-08-10',
      lastModified: '2025-02-15',
      status: 'Active',
    },
    {
      id: 'BOM/003',
      sku: 'NES-ERIK-120AH',
      model: 'E-Rickshaw Battery 120AH',
      version: 'v2.0',
      components: [
        { name: 'Lead', quantity: 10.5, unit: 'Kg' },
        { name: 'Acid', quantity: 3.8, unit: 'Litre' },
        { name: 'Container', quantity: 1, unit: 'Pcs' },
        { name: 'Lid', quantity: 1, unit: 'Pcs' },
        { name: 'Separator', quantity: 12, unit: 'Pcs' },
        { name: 'Terminals', quantity: 2, unit: 'Pcs' },
      ],
      createdDate: '2024-09-05',
      lastModified: '2025-04-01',
      status: 'Active',
    },
    {
      id: 'BOM/004',
      sku: 'NES-AUTO-100AH',
      model: 'Automotive Battery 100AH',
      version: 'v2.0',
      components: [
        { name: 'Lead', quantity: 8.5, unit: 'Kg' },
        { name: 'Acid', quantity: 3.2, unit: 'Litre' },
        { name: 'Container', quantity: 1, unit: 'Pcs' },
        { name: 'Lid', quantity: 1, unit: 'Pcs' },
        { name: 'Separator', quantity: 10, unit: 'Pcs' },
        { name: 'Terminals', quantity: 2, unit: 'Pcs' },
      ],
      createdDate: '2024-05-20',
      lastModified: '2025-01-10',
      status: 'Active',
    },
  ];

  const productionOrders = [
    {
      id: 'PO/2026/156',
      sku: 'NES-AUTO-150AH',
      model: 'Automotive Battery 150AH',
      quantity: 500,
      produced: 320,
      rejected: 8,
      plannedStart: '2026-04-15',
      plannedEnd: '2026-04-22',
      salesOrderId: 'SO/2026/089',
      status: 'In Progress',
      priority: 'High',
      bomId: 'BOM/001',
    },
    {
      id: 'PO/2026/155',
      sku: 'NES-INV-200AH',
      model: 'Inverter Battery 200AH',
      quantity: 200,
      produced: 200,
      rejected: 3,
      plannedStart: '2026-04-10',
      plannedEnd: '2026-04-17',
      salesOrderId: 'SO/2026/088',
      status: 'Completed',
      priority: 'Medium',
      bomId: 'BOM/002',
    },
    {
      id: 'PO/2026/157',
      sku: 'NES-ERIK-120AH',
      model: 'E-Rickshaw Battery 120AH',
      quantity: 300,
      produced: 0,
      rejected: 0,
      plannedStart: '2026-04-20',
      plannedEnd: '2026-04-28',
      salesOrderId: 'SO/2026/087',
      status: 'Planned',
      priority: 'High',
      bomId: 'BOM/003',
    },
    {
      id: 'PO/2026/154',
      sku: 'NES-AUTO-100AH',
      model: 'Automotive Battery 100AH',
      quantity: 400,
      produced: 150,
      rejected: 5,
      plannedStart: '2026-04-08',
      plannedEnd: '2026-04-18',
      salesOrderId: null,
      status: 'On Hold',
      priority: 'Low',
      bomId: 'BOM/004',
    },
  ];

  const wipStages = [
    { id: 1, name: 'Paste Mixing', machine: 'Ball Mill', operator: 'Rajesh Kumar', startTime: '06:00', endTime: '08:30', status: 'Completed' },
    { id: 2, name: 'Grid Casting', machine: 'Spine Casting Machine', operator: 'Suresh Yadav', startTime: '08:00', endTime: '11:00', status: 'Completed' },
    { id: 3, name: 'Pasting', machine: 'Pasting Machine', operator: 'Dinesh Rawat', startTime: '10:00', endTime: '13:30', status: 'Completed' },
    { id: 4, name: 'Curing', machine: 'Curing Chamber #2', operator: 'Vikram Singh', startTime: '12:00', endTime: null, status: 'In Progress' },
    { id: 5, name: 'Assembly', machine: 'Assembly Line 1', operator: null, startTime: null, endTime: null, status: 'Pending' },
    { id: 6, name: 'Formation Charging', machine: 'Formation Charger', operator: null, startTime: null, endTime: null, status: 'Pending' },
    { id: 7, name: 'Final Testing', machine: 'Testing Station', operator: null, startTime: null, endTime: null, status: 'Pending' },
    { id: 8, name: 'Packing', machine: 'Packing Area', operator: null, startTime: null, endTime: null, status: 'Pending' },
  ];

  const materialConsumption = [
    {
      poId: 'PO/2026/156',
      material: 'Lead',
      theoretical: 6250,
      actual: 6380,
      variance: 130,
      variancePercent: 2.08,
      unit: 'Kg',
    },
    {
      poId: 'PO/2026/156',
      material: 'Acid',
      theoretical: 2250,
      actual: 2210,
      variance: -40,
      variancePercent: -1.78,
      unit: 'Litre',
    },
    {
      poId: 'PO/2026/156',
      material: 'Separator',
      theoretical: 7500,
      actual: 7620,
      variance: 120,
      variancePercent: 1.6,
      unit: 'Pcs',
    },
  ];

  const batchTraceability = [
    {
      batchNumber: 'BATCH/2026/042',
      poId: 'PO/2026/156',
      productionDate: '2026-04-15',
      expiryDate: '2027-04-15',
      quantity: 500,
      rawMaterialLots: ['LEAD/LOT/045', 'ACID/LOT/023', 'SEP/LOT/012'],
      qcResult: 'Passed',
      qcReference: 'QC/2026/089',
    },
    {
      batchNumber: 'BATCH/2026/041',
      poId: 'PO/2026/155',
      productionDate: '2026-04-10',
      expiryDate: '2027-04-10',
      quantity: 200,
      rawMaterialLots: ['LEAD/LOT/042', 'ACID/LOT/021', 'SEP/LOT/010'],
      qcResult: 'Passed',
      qcReference: 'QC/2026/085',
    },
  ];

  const dailyDashboard = [
    { date: '2026-04-15', target: 450, actual: 442, rejected: 8, efficiency: 98.2 },
    { date: '2026-04-14', target: 450, actual: 455, rejected: 5, efficiency: 101.1 },
    { date: '2026-04-13', target: 400, actual: 398, rejected: 7, efficiency: 99.5 },
    { date: '2026-04-12', target: 350, actual: 342, rejected: 6, efficiency: 97.7 },
    { date: '2026-04-11', target: 450, actual: 448, rejected: 4, efficiency: 99.6 },
  ];

  const stats = {
    activeOrders: productionOrders.filter(o => o.status === 'In Progress').length,
    todayTarget: 450,
    todayActual: 442,
    todayEfficiency: 98.2,
    wipBatches: 3,
  };

  const statusColors: Record<string, string> = {
    'Planned': 'bg-blue-100 text-blue-700',
    'In Progress': 'bg-yellow-100 text-yellow-700',
    'Completed': 'bg-green-100 text-green-700',
    'On Hold': 'bg-orange-100 text-orange-700',
  };

  const stageStatusColors: Record<string, string> = {
    'Completed': 'bg-green-100 text-green-700',
    'In Progress': 'bg-blue-100 text-blue-700',
    'Pending': 'bg-gray-100 text-gray-700',
  };

  const priorityColors: Record<string, string> = {
    'High': 'bg-red-100 text-red-700',
    'Medium': 'bg-yellow-100 text-yellow-700',
    'Low': 'bg-green-100 text-green-700',
  };

  const handleOrderCreated = () => {
    console.log('Production order created successfully!');
    // Refresh order list or show toast
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-gray-900">Production Management</h1>
          <p className="text-sm text-gray-600">Manage production orders, BOM, and WIP tracking</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download className="size-4" />
            Export
          </button>
          <button
            onClick={() => setIsNewOrderModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            <Plus className="size-4" />
            New Production Order
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <Factory className="size-4 text-blue-500" />
            <p className="text-xs text-gray-600">Active Orders</p>
          </div>
          <p className="text-xl font-bold text-gray-900">{stats.activeOrders}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <Target className="size-4 text-green-500" />
            <p className="text-xs text-gray-600">Today's Target</p>
          </div>
          <p className="text-xl font-bold text-gray-900">{stats.todayTarget} units</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <Package className="size-4 text-purple-500" />
            <p className="text-xs text-gray-600">Today's Production</p>
          </div>
          <p className="text-xl font-bold text-gray-900">{stats.todayActual} units</p>
          <p className="text-xs text-green-600">{stats.todayEfficiency}% efficiency</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <Timer className="size-4 text-orange-500" />
            <p className="text-xs text-gray-600">WIP Batches</p>
          </div>
          <p className="text-xl font-bold text-gray-900">{stats.wipBatches}</p>
        </div>
      </div>

      {/* View Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex gap-6 overflow-x-auto">
          {(['orders', 'bom', 'wip', 'dashboard'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === tab
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
            >
              {tab === 'orders' ? 'Production Orders' :
                tab === 'bom' ? 'Bill of Materials' :
                  tab === 'wip' ? 'WIP Tracking' : 'Daily Dashboard'}
            </button>
          ))}
        </nav>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search production orders..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select className="px-4 py-2 border border-gray-300 rounded-lg">
          <option>All Status</option>
          <option>Planned</option>
          <option>In Progress</option>
          <option>Completed</option>
          <option>On Hold</option>
        </select>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
          <Filter className="size-4" />
          Filter
        </button>
      </div>

      {/* Content - Production Orders */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {productionOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-blue-50 rounded">
                    <Factory className="size-5 text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-medium text-gray-900">{order.id}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded ${priorityColors[order.priority]}`}>
                        {order.priority} Priority
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded ${statusColors[order.status]}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                      <span>{order.model} ({order.sku})</span>
                      <span>•</span>
                      <span>BOM: {order.bomId}</span>
                      {order.salesOrderId && (
                        <>
                          <span>•</span>
                          <span>Sales Order: {order.salesOrderId}</span>
                        </>
                      )}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                      <div>
                        <p className="text-xs text-gray-500">Quantity</p>
                        <p className="text-sm font-medium">
                          {order.produced} / {order.quantity} units
                          {order.rejected > 0 && (
                            <span className="text-red-600 ml-2">({order.rejected} rejected)</span>
                          )}
                        </p>
                        <div className="mt-1 bg-gray-200 rounded-full h-1.5 w-32">
                          <div
                            className="bg-blue-500 h-1.5 rounded-full"
                            style={{ width: `${(order.produced / order.quantity) * 100}%` }}
                          />
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Planned Start</p>
                        <p className="text-sm">{new Date(order.plannedStart).toLocaleDateString('en-IN')}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Planned End</p>
                        <p className="text-sm">{new Date(order.plannedEnd).toLocaleDateString('en-IN')}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Progress</p>
                        <p className="text-sm font-medium text-blue-600">
                          {Math.round((order.produced / order.quantity) * 100)}%
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {order.status === 'Planned' && (
                    <button className="px-3 py-1.5 bg-green-600 text-white text-xs rounded hover:bg-green-700 flex items-center gap-1">
                      <Play className="size-3" />
                      Start
                    </button>
                  )}
                  {order.status === 'In Progress' && (
                    <button className="px-3 py-1.5 bg-orange-600 text-white text-xs rounded hover:bg-orange-700 flex items-center gap-1">
                      <Pause className="size-3" />
                      Hold
                    </button>
                  )}
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded hover:bg-gray-50">
                    <Eye className="size-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded hover:bg-gray-50">
                    <MoreVertical className="size-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Content - Bill of Materials */}
      {activeTab === 'bom' && (
        <div className="space-y-4">
          {billOfMaterials.map((bom) => (
            <div key={bom.id} className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-purple-50 rounded">
                    <ClipboardList className="size-5 text-purple-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-medium text-gray-900">{bom.id}</h3>
                      <span className="text-sm text-gray-600">{bom.model}</span>
                      <span className="text-xs text-gray-400">|</span>
                      <span className="text-sm text-gray-600">SKU: {bom.sku}</span>
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                        v{bom.version}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3">
                      {bom.components.map((comp, idx) => (
                        <div key={idx} className="bg-gray-50 rounded p-2">
                          <p className="text-xs text-gray-500">{comp.name}</p>
                          <p className="text-sm font-medium">
                            {comp.quantity} {comp.unit}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                      <span>Created: {new Date(bom.createdDate).toLocaleDateString('en-IN')}</span>
                      <span>Last Modified: {new Date(bom.lastModified).toLocaleDateString('en-IN')}</span>
                      <span className={`px-2 py-0.5 rounded ${bom.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                        {bom.status}
                      </span>
                    </div>
                  </div>
                </div>
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded hover:bg-gray-50">
                  <Eye className="size-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Content - WIP Tracking */}
      {activeTab === 'wip' && (
        <div className="space-y-6">
          {/* WIP Stages for Selected Order */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">WIP Tracking - PO/2026/156 (Automotive Battery 150AH)</h3>
              <span className="text-sm text-gray-600">Current Stage: Curing</span>
            </div>

            <div className="relative">
              {/* Timeline */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200" />

              {wipStages.map((stage, idx) => (
                <div key={stage.id} className="relative flex items-start gap-6 pb-6 last:pb-0">
                  <div className={`relative z-10 size-8 rounded-full flex items-center justify-center ${stage.status === 'Completed' ? 'bg-green-500' :
                    stage.status === 'In Progress' ? 'bg-blue-500' : 'bg-gray-300'
                    }`}>
                    {stage.status === 'Completed' ? (
                      <CheckCircle className="size-5 text-white" />
                    ) : stage.status === 'In Progress' ? (
                      <Clock className="size-5 text-white" />
                    ) : (
                      <span className="text-white text-sm">{idx + 1}</span>
                    )}
                  </div>

                  <div className="flex-1 bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{stage.name}</h4>
                      <span className={`text-xs px-2 py-0.5 rounded ${stageStatusColors[stage.status]}`}>
                        {stage.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                      <div>
                        <p className="text-xs text-gray-500">Machine</p>
                        <p className="flex items-center gap-1">
                          <Wrench className="size-3" />
                          {stage.machine || 'Not assigned'}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Operator</p>
                        <p className="flex items-center gap-1">
                          <Users className="size-3" />
                          {stage.operator || 'Not assigned'}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Start Time</p>
                        <p>{stage.startTime || '--:--'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">End Time</p>
                        <p>{stage.endTime || '--:--'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Material Consumption */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">Material Consumption - PO/2026/156</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left py-3 px-4 text-xs text-gray-600">Material</th>
                    <th className="text-right py-3 px-4 text-xs text-gray-600">Theoretical</th>
                    <th className="text-right py-3 px-4 text-xs text-gray-600">Actual</th>
                    <th className="text-right py-3 px-4 text-xs text-gray-600">Variance</th>
                    <th className="text-right py-3 px-4 text-xs text-gray-600">Variance %</th>
                    <th className="text-left py-3 px-4 text-xs text-gray-600">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {materialConsumption.map((item, idx) => (
                    <tr key={idx} className="border-b border-gray-100">
                      <td className="py-3 px-4 text-sm text-gray-900">{item.material}</td>
                      <td className="py-3 px-4 text-right text-sm text-gray-600">
                        {item.theoretical.toLocaleString()} {item.unit}
                      </td>
                      <td className="py-3 px-4 text-right text-sm text-gray-900">
                        {item.actual.toLocaleString()} {item.unit}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className={`text-sm font-medium ${item.variance > 0 ? 'text-red-600' : 'text-green-600'}`}>
                          {item.variance > 0 ? '+' : ''}{item.variance.toLocaleString()} {item.unit}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className={`text-sm font-medium ${item.variancePercent > 0 ? 'text-red-600' : 'text-green-600'}`}>
                          {item.variancePercent > 0 ? '+' : ''}{item.variancePercent.toFixed(2)}%
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {Math.abs(item.variancePercent) > 5 ? (
                          <span className="text-xs px-2 py-1 rounded bg-red-100 text-red-700 flex items-center gap-1 w-fit">
                            <AlertCircle className="size-3" />
                            High Variance
                          </span>
                        ) : (
                          <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-700">Normal</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Batch Traceability */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">Batch Traceability</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left py-3 px-4 text-xs text-gray-600">Batch Number</th>
                    <th className="text-left py-3 px-4 text-xs text-gray-600">PO ID</th>
                    <th className="text-left py-3 px-4 text-xs text-gray-600">Production Date</th>
                    <th className="text-left py-3 px-4 text-xs text-gray-600">Expiry Date</th>
                    <th className="text-right py-3 px-4 text-xs text-gray-600">Quantity</th>
                    <th className="text-left py-3 px-4 text-xs text-gray-600">Raw Material Lots</th>
                    <th className="text-left py-3 px-4 text-xs text-gray-600">QC Result</th>
                  </tr>
                </thead>
                <tbody>
                  {batchTraceability.map((batch) => (
                    <tr key={batch.batchNumber} className="border-b border-gray-100">
                      <td className="py-3 px-4 text-sm font-mono text-gray-800">{batch.batchNumber}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{batch.poId}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {new Date(batch.productionDate).toLocaleDateString('en-IN')}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {new Date(batch.expiryDate).toLocaleDateString('en-IN')}
                      </td>
                      <td className="py-3 px-4 text-right text-sm text-gray-900">{batch.quantity}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{batch.rawMaterialLots.join(', ')}</td>
                      <td className="py-3 px-4">
                        <span className={`text-xs px-2 py-1 rounded ${batch.qcResult === 'Passed' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                          }`}>
                          {batch.qcResult}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Content - Daily Dashboard */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* Daily Production Table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">Daily Production Dashboard</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left py-3 px-4 text-xs text-gray-600">Date</th>
                    <th className="text-right py-3 px-4 text-xs text-gray-600">Target (Units)</th>
                    <th className="text-right py-3 px-4 text-xs text-gray-600">Actual Produced</th>
                    <th className="text-right py-3 px-4 text-xs text-gray-600">Rejected</th>
                    <th className="text-right py-3 px-4 text-xs text-gray-600">Efficiency</th>
                    <th className="text-left py-3 px-4 text-xs text-gray-600">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {dailyDashboard.map((day) => (
                    <tr key={day.date} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-900">
                        {new Date(day.date).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}
                      </td>
                      <td className="py-3 px-4 text-right text-sm text-gray-600">{day.target}</td>
                      <td className="py-3 px-4 text-right text-sm font-medium text-gray-900">{day.actual}</td>
                      <td className="py-3 px-4 text-right text-sm text-red-600">{day.rejected}</td>
                      <td className="py-3 px-4 text-right">
                        <span className={`text-sm font-medium ${day.efficiency >= 100 ? 'text-green-600' :
                          day.efficiency >= 95 ? 'text-blue-600' : 'text-orange-600'
                          }`}>
                          {day.efficiency}%
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {day.efficiency >= 100 ? (
                          <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-700">Exceeded</span>
                        ) : day.efficiency >= 95 ? (
                          <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-700">On Track</span>
                        ) : (
                          <span className="text-xs px-2 py-1 rounded bg-orange-100 text-orange-700">Below Target</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Efficiency Trend */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Production Efficiency Trend</h3>
            <div className="flex items-end gap-6 h-48">
              {dailyDashboard.map((day) => (
                <div key={day.date} className="flex flex-col items-center gap-2 flex-1">
                  <div className="relative w-full flex justify-center">
                    <div
                      className={`w-12 rounded-t ${day.efficiency >= 100 ? 'bg-green-500' :
                        day.efficiency >= 95 ? 'bg-blue-500' : 'bg-orange-500'
                        }`}
                      style={{ height: `${day.efficiency * 1.5}px` }}
                    />
                  </div>
                  <span className="text-xs text-gray-600">
                    {new Date(day.date).toLocaleDateString('en-IN', { day: 'numeric' })}
                  </span>
                  <span className="text-xs font-medium">{day.efficiency}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}


      <NewProductionOrderModal
        open={isNewOrderModalOpen}
        onOpenChange={setIsNewOrderModalOpen}
        onSuccess={handleOrderCreated}
      />
    </div>
  );
}