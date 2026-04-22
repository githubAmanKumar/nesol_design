// src/app/pages/AssetsManagement.tsx
import { useState } from 'react';
import { 
  Building2, Laptop, Truck, Wrench, Monitor, 
  Search, Filter, Plus, Download, Eye, QrCode,
  Calendar, AlertTriangle, MoreVertical, ArrowRightLeft,
  DollarSign,
  TrendingDown
} from 'lucide-react';
import { AddAssetModal } from '../components/assets/AddAssetModal';

export default function AssetsManagement() {
  const [activeTab, setActiveTab] = useState<'all' | 'amc' | 'movement'>('all');
  const [isAddAssetModalOpen, setIsAddAssetModalOpen] = useState(false);

  const assets = [
    {
      id: 'AST/2024/001',
      assetTag: 'MACH-001',
      name: 'Ball Mill Machine',
      category: 'Plant & Machinery',
      make: 'Elecon',
      model: 'BM-2000',
      serialNo: 'EL-BM-2022-045',
      purchaseDate: '2022-03-15',
      purchaseValue: 850000,
      location: 'Production Floor',
      assignedTo: 'Production Department',
      status: 'Operational',
      depreciation: {
        method: 'SLM',
        rate: 15,
        openingWdv: 722500,
        currentWdv: 614125,
      },
      amc: {
        active: true,
        vendor: 'Elecon Services',
        expiryDate: '2026-06-30',
      },
    },
    {
      id: 'AST/2024/002',
      assetTag: 'MACH-012',
      name: 'Paste Mixer',
      category: 'Plant & Machinery',
      make: 'MixTech',
      model: 'PM-500',
      serialNo: 'MT-PM-2023-112',
      purchaseDate: '2023-06-20',
      purchaseValue: 450000,
      location: 'Production Floor',
      assignedTo: 'Production Department',
      status: 'Operational',
      depreciation: {
        method: 'SLM',
        rate: 15,
        openingWdv: 382500,
        currentWdv: 325125,
      },
      amc: {
        active: true,
        vendor: 'MixTech Support',
        expiryDate: '2026-08-15',
      },
    },
    {
      id: 'AST/2024/003',
      assetTag: 'IT-023',
      name: 'Dell Laptop',
      category: 'Computer & IT',
      make: 'Dell',
      model: 'Latitude 5430',
      serialNo: 'DL-LAT-2024-089',
      purchaseDate: '2024-01-10',
      purchaseValue: 65000,
      location: 'Sales Office',
      assignedTo: 'Amit Singh',
      status: 'Assigned',
      depreciation: {
        method: 'WDV',
        rate: 40,
        openingWdv: 39000,
        currentWdv: 23400,
      },
      amc: {
        active: false,
        vendor: null,
        expiryDate: null,
      },
    },
    {
      id: 'AST/2024/004',
      assetTag: 'IT-045',
      name: 'HP Desktop',
      category: 'Computer & IT',
      make: 'HP',
      model: 'EliteDesk 800',
      serialNo: 'HP-ED-2023-234',
      purchaseDate: '2023-09-05',
      purchaseValue: 45000,
      location: 'HR Department',
      assignedTo: 'Sunita Devi',
      status: 'Assigned',
      depreciation: {
        method: 'WDV',
        rate: 40,
        openingWdv: 18000,
        currentWdv: 10800,
      },
      amc: {
        active: false,
        vendor: null,
        expiryDate: null,
      },
    },
    {
      id: 'AST/2024/005',
      assetTag: 'VEH-003',
      name: 'Tata Ace',
      category: 'Vehicle',
      make: 'Tata Motors',
      model: 'Ace Gold',
      serialNo: 'TATA-ACE-2023-567',
      purchaseDate: '2023-11-20',
      purchaseValue: 550000,
      location: 'Logistics',
      assignedTo: 'Logistics Department',
      status: 'Operational',
      depreciation: {
        method: 'WDV',
        rate: 30,
        openingWdv: 385000,
        currentWdv: 269500,
      },
      amc: {
        active: true,
        vendor: 'Tata Service Center',
        expiryDate: '2026-05-20',
      },
    },
    {
      id: 'AST/2024/006',
      assetTag: 'MACH-023',
      name: 'Formation Charger',
      category: 'Plant & Machinery',
      make: 'Statcon',
      model: 'FC-1000',
      serialNo: 'ST-FC-2021-078',
      purchaseDate: '2021-08-12',
      purchaseValue: 1200000,
      location: 'Formation Area',
      assignedTo: 'Production Department',
      status: 'Under Maintenance',
      depreciation: {
        method: 'SLM',
        rate: 15,
        openingWdv: 600000,
        currentWdv: 510000,
      },
      amc: {
        active: true,
        vendor: 'Statcon Services',
        expiryDate: '2026-04-30',
      },
    },
  ];

  const movements = [
    {
      id: 'MOV/2026/001',
      assetId: 'AST/2024/003',
      assetName: 'Dell Laptop',
      fromLocation: 'IT Store',
      toLocation: 'Sales Office',
      fromAssigned: 'IT Department',
      toAssigned: 'Amit Singh',
      transferDate: '2026-04-10',
      reason: 'New employee allocation',
    },
    {
      id: 'MOV/2026/002',
      assetId: 'AST/2024/001',
      assetName: 'Ball Mill Machine',
      fromLocation: 'Production Floor',
      toLocation: 'Maintenance Bay',
      fromAssigned: 'Production Department',
      toAssigned: 'Maintenance Team',
      transferDate: '2026-04-14',
      reason: 'Preventive maintenance',
    },
  ];

  const stats = {
    totalAssets: assets.length,
    totalValue: assets.reduce((sum, a) => sum + a.purchaseValue, 0),
    totalWdv: assets.reduce((sum, a) => sum + a.depreciation.currentWdv, 0),
    amcExpiring: assets.filter(a => a.amc.active && new Date(a.amc.expiryDate!) < new Date('2026-05-31')).length,
  };

  const statusColors: Record<string, string> = {
    'Operational': 'bg-green-100 text-green-700',
    'Assigned': 'bg-blue-100 text-blue-700',
    'Under Maintenance': 'bg-orange-100 text-orange-700',
    'Scrapped': 'bg-red-100 text-red-700',
    'Disposed': 'bg-gray-100 text-gray-700',
  };

  const categoryIcons: Record<string, any> = {
    'Plant & Machinery': Wrench,
    'Computer & IT': Monitor,
    'Vehicle': Truck,
    'Furniture & Fixture': Building2,
    'Electrical Equipment': Laptop,
  };

  const handleAssetAdded = () => {
    console.log('Asset added successfully!');
    // Refresh asset list or show toast
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-gray-900">Assets Management</h1>
          <p className="text-sm text-gray-600">Track and manage company assets with depreciation</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <QrCode className="size-4" />
            Scan QR
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download className="size-4" />
            Export
          </button>
          <button 
          onClick={() => setIsAddAssetModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            <Plus className="size-4" />
            Add Asset
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <Building2 className="size-4 text-blue-500" />
            <p className="text-xs text-gray-600">Total Assets</p>
          </div>
          <p className="text-xl font-bold text-gray-900">{stats.totalAssets}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="size-4 text-green-500" />
            <p className="text-xs text-gray-600">Purchase Value</p>
          </div>
          <p className="text-xl font-bold text-gray-900">₹{(stats.totalValue / 100000).toFixed(1)}L</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="size-4 text-purple-500" />
            <p className="text-xs text-gray-600">Current WDV</p>
          </div>
          <p className="text-xl font-bold text-gray-900">₹{(stats.totalWdv / 100000).toFixed(1)}L</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="size-4 text-orange-500" />
            <p className="text-xs text-gray-600">AMC Expiring Soon</p>
          </div>
          <p className="text-xl font-bold text-gray-900">{stats.amcExpiring}</p>
        </div>
      </div>

      {/* View Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex gap-6">
          {(['all', 'amc', 'movement'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab === 'all' ? 'All Assets' : tab === 'amc' ? 'AMC Tracking' : 'Movement Log'}
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
            placeholder="Search by asset tag, name, or assigned to..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select className="px-4 py-2 border border-gray-300 rounded-lg">
          <option>All Categories</option>
          <option>Plant & Machinery</option>
          <option>Computer & IT</option>
          <option>Vehicle</option>
          <option>Furniture & Fixture</option>
        </select>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
          <Filter className="size-4" />
          Filter
        </button>
      </div>

      {/* Content */}
      {activeTab === 'all' && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-3 px-4 text-xs text-gray-600">Asset Tag</th>
                  <th className="text-left py-3 px-4 text-xs text-gray-600">Name</th>
                  <th className="text-left py-3 px-4 text-xs text-gray-600">Category</th>
                  <th className="text-left py-3 px-4 text-xs text-gray-600">Make/Model</th>
                  <th className="text-left py-3 px-4 text-xs text-gray-600">Location</th>
                  <th className="text-left py-3 px-4 text-xs text-gray-600">Assigned To</th>
                  <th className="text-right py-3 px-4 text-xs text-gray-600">Purchase Value</th>
                  <th className="text-right py-3 px-4 text-xs text-gray-600">Current WDV</th>
                  <th className="text-left py-3 px-4 text-xs text-gray-600">Status</th>
                  <th className="text-right py-3 px-4 text-xs text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {assets.map((asset) => {
                  const CategoryIcon = categoryIcons[asset.category] || Building2;
                  return (
                    <tr key={asset.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <CategoryIcon className="size-4 text-gray-400" />
                          <span className="text-sm text-gray-800 font-mono">{asset.assetTag}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <p className="text-sm font-medium text-gray-900">{asset.name}</p>
                        <p className="text-xs text-gray-500">S/N: {asset.serialNo}</p>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">{asset.category}</td>
                      <td className="py-3 px-4">
                        <p className="text-sm text-gray-900">{asset.make}</p>
                        <p className="text-xs text-gray-500">{asset.model}</p>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">{asset.location}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{asset.assignedTo}</td>
                      <td className="py-3 px-4 text-right text-sm text-gray-900">
                        ₹{asset.purchaseValue.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-right text-sm text-gray-900">
                        ₹{asset.depreciation.currentWdv.toLocaleString()}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`text-xs px-2 py-1 rounded ${statusColors[asset.status]}`}>
                          {asset.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button className="text-blue-600 hover:text-blue-700 p-1">
                          <Eye className="size-4" />
                        </button>
                        <button className="text-gray-400 hover:text-gray-600 p-1">
                          <MoreVertical className="size-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'amc' && (
        <div className="space-y-4">
          {assets.filter(a => a.amc.active).map((asset) => (
            <div key={asset.id} className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded ${
                    new Date(asset.amc.expiryDate!) < new Date('2026-05-31') ? 'bg-orange-50' : 'bg-green-50'
                  }`}>
                    <Calendar className={`size-5 ${
                      new Date(asset.amc.expiryDate!) < new Date('2026-05-31') ? 'text-orange-500' : 'text-green-500'
                    }`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-medium text-gray-900">{asset.name}</h3>
                      <span className="text-xs text-gray-400">|</span>
                      <span className="text-sm text-gray-600">{asset.assetTag}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                      <span>Vendor: {asset.amc.vendor}</span>
                      <span>•</span>
                      <span>Contract Expiry: {new Date(asset.amc.expiryDate!).toLocaleDateString('en-IN')}</span>
                    </div>
                    {new Date(asset.amc.expiryDate!) < new Date('2026-05-31') && (
                      <p className="text-xs text-orange-600 flex items-center gap-1">
                        <AlertTriangle className="size-3" />
                        Renewal due in {Math.ceil((new Date(asset.amc.expiryDate!).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days
                      </p>
                    )}
                  </div>
                </div>
                <button className="text-sm text-blue-600 hover:text-blue-700">
                  Renew AMC
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'movement' && (
        <div className="space-y-4">
          {movements.map((move) => (
            <div key={move.id} className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-blue-50 rounded">
                  <ArrowRightLeft className="size-5 text-blue-500" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-medium text-gray-900">{move.assetName}</h3>
                    <span className="text-xs text-gray-400">|</span>
                    <span className="text-sm text-gray-600">{move.assetId}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                    <span>From: {move.fromLocation} ({move.fromAssigned})</span>
                    <span>→</span>
                    <span>To: {move.toLocation} ({move.toAssigned})</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>Date: {new Date(move.transferDate).toLocaleDateString('en-IN')}</span>
                    <span>Reason: {move.reason}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <AddAssetModal
        open={isAddAssetModalOpen}
        onOpenChange={setIsAddAssetModalOpen}
        onSuccess={handleAssetAdded}
      />
    </div>
  );
}