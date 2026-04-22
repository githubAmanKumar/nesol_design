// src/app/pages/procurement/PurchaseManagement.tsx
import { useState } from 'react';
import {
  Package, Truck, ClipboardList, RotateCcw, Search,
  Filter, Download, Plus, Eye, CheckCircle, XCircle,
  Clock, Calendar, DollarSign, MoreVertical, AlertCircle,
  TrendingUp, ChevronDown, FileText, Send, Building2,
  MapPin, Phone, Mail, Scale, Ban,
  Printer
} from 'lucide-react';
import { NewMRFModal } from '../../components/procurement/NewMRFModal';

export default function PurchaseManagement() {
  const [activeTab, setActiveTab] = useState<'mrf' | 'comparison' | 'po' | 'grn' | 'return'>('mrf');
  const [selectedPO, setSelectedPO] = useState<string | null>(null);
  const [isNewMRFModalOpen, setIsNewMRFModalOpen] = useState(false);

  const materialRequisitions = [
    {
      id: 'MRF/2026/042',
      requestedBy: 'Rajesh Kumar (Production)',
      requiredDate: '2026-04-22',
      items: [
        { name: 'Lead Ingots', quantity: 5000, unit: 'Kg' },
        { name: 'Separators', quantity: 10000, unit: 'Pcs' },
      ],
      purpose: 'Production order PO/2026/156',
      jobReference: 'Batch #B042',
      status: 'Pending',
      requestedDate: '2026-04-15',
    },
    {
      id: 'MRF/2026/041',
      requestedBy: 'Vikram Singh (Production)',
      requiredDate: '2026-04-18',
      items: [
        { name: 'PP Granules', quantity: 2000, unit: 'Kg' },
        { name: 'Terminals', quantity: 5000, unit: 'Pcs' },
      ],
      purpose: 'Monthly stock replenishment',
      jobReference: null,
      status: 'Approved',
      requestedDate: '2026-04-12',
      approvedBy: 'Plant Head',
      approvedDate: '2026-04-13',
    },
    {
      id: 'MRF/2026/040',
      requestedBy: 'Priya Sharma (Quality)',
      requiredDate: '2026-04-15',
      items: [
        { name: 'Testing Probes', quantity: 50, unit: 'Pcs' },
        { name: 'Calibration Fluid', quantity: 10, unit: 'Litre' },
      ],
      purpose: 'QC Lab consumables',
      jobReference: null,
      status: 'PO Created',
      requestedDate: '2026-04-08',
      approvedBy: 'Plant Head',
      approvedDate: '2026-04-09',
      poReference: 'PO/2026/234',
    },
  ];

  const supplierComparisons = [
    {
      id: 'COMP/2026/008',
      itemName: 'Lead Ingots',
      quantity: 5000,
      unit: 'Kg',
      vendors: [
        { name: 'Metal Suppliers Ltd', price: 195, deliveryTime: 3, rating: 4.5 },
        { name: 'LeadTech Industries', price: 188, deliveryTime: 5, rating: 4.2 },
        { name: 'Prime Metals', price: 200, deliveryTime: 2, rating: 4.8 },
      ],
      selectedVendor: 'Metal Suppliers Ltd',
      negotiationRemarks: 'Agreed for 3% discount on bulk order',
      status: 'Completed',
    },
    {
      id: 'COMP/2026/007',
      itemName: 'PP Granules',
      quantity: 2000,
      unit: 'Kg',
      vendors: [
        { name: 'Polymer World', price: 85, deliveryTime: 4, rating: 4.0 },
        { name: 'PlastChem Industries', price: 82, deliveryTime: 5, rating: 4.3 },
      ],
      selectedVendor: 'PlastChem Industries',
      negotiationRemarks: 'Best price with consistent quality',
      status: 'Completed',
    },
  ];

  const purchaseOrders = [
    {
      id: 'PO/2026/234',
      vendorId: 'VEND/012',
      vendorName: 'Metal Suppliers Ltd',
      poDate: '2026-04-14',
      expectedDelivery: '2026-04-21',
      shippingAddress: 'Nesol Energies, Plot 45, Industrial Area, Roorkee, Uttarakhand - 247667',
      items: [
        { material: 'Lead Ingots', quantity: 5000, unit: 'Kg', rate: 195, gst: 18, amount: 975000 },
      ],
      subtotal: 975000,
      gstAmount: 175500,
      totalAmount: 1150500,
      terms: 'Payment 30 days from delivery',
      approvalWorkflow: {
        l1: { approver: 'Production Head', status: 'Approved', date: '2026-04-14' },
        l2: { approver: 'Finance Head', status: 'Approved', date: '2026-04-14' },
      },
      status: 'Sent',
      receivedQty: 0,
      pendingQty: 5000,
    },
    {
      id: 'PO/2026/233',
      vendorId: 'VEND/008',
      vendorName: 'PlastChem Industries',
      poDate: '2026-04-13',
      expectedDelivery: '2026-04-18',
      shippingAddress: 'Nesol Energies, Plot 45, Industrial Area, Roorkee, Uttarakhand - 247667',
      items: [
        { material: 'PP Granules', quantity: 2000, unit: 'Kg', rate: 82, gst: 18, amount: 164000 },
        { material: 'Terminals', quantity: 5000, unit: 'Pcs', rate: 3.2, gst: 18, amount: 16000 },
      ],
      subtotal: 180000,
      gstAmount: 32400,
      totalAmount: 212400,
      terms: 'Payment 15 days from delivery',
      approvalWorkflow: {
        l1: { approver: 'Production Head', status: 'Approved', date: '2026-04-13' },
        l2: { approver: 'Finance Head', status: 'Pending', date: null },
      },
      status: 'Approved',
      receivedQty: 0,
      pendingQty: 7000,
    },
    {
      id: 'PO/2026/230',
      vendorId: 'VEND/005',
      vendorName: 'Acid Suppliers Co',
      poDate: '2026-04-05',
      expectedDelivery: '2026-04-12',
      shippingAddress: 'Nesol Energies, Plot 45, Industrial Area, Roorkee, Uttarakhand - 247667',
      items: [
        { material: 'Sulfuric Acid', quantity: 2000, unit: 'Litre', rate: 45, gst: 18, amount: 90000 },
      ],
      subtotal: 90000,
      gstAmount: 16200,
      totalAmount: 106200,
      terms: 'Payment 30 days from delivery',
      approvalWorkflow: {
        l1: { approver: 'Production Head', status: 'Approved', date: '2026-04-05' },
        l2: { approver: 'Finance Head', status: 'Approved', date: '2026-04-05' },
      },
      status: 'Partially Received',
      receivedQty: 1200,
      pendingQty: 800,
    },
  ];

  const grnEntries = [
    {
      id: 'GRN/2026/089',
      poId: 'PO/2026/230',
      vendorName: 'Acid Suppliers Co',
      receiptDate: '2026-04-12',
      items: [
        { material: 'Sulfuric Acid', orderedQty: 2000, receivedQty: 1200, acceptedQty: 1150, rejectedQty: 50, unit: 'Litre' },
      ],
      qcStatus: 'Passed',
      qcRemarks: '50 litres rejected due to contamination',
      inspectedBy: 'Priya Sharma',
    },
    {
      id: 'GRN/2026/088',
      poId: 'PO/2026/228',
      vendorName: 'Separator Tech',
      receiptDate: '2026-04-08',
      items: [
        { material: 'Separators', orderedQty: 20000, receivedQty: 20000, acceptedQty: 20000, rejectedQty: 0, unit: 'Pcs' },
      ],
      qcStatus: 'Passed',
      qcRemarks: 'All items within specification',
      inspectedBy: 'Priya Sharma',
    },
  ];

  const purchaseReturns = [
    {
      id: 'PR/2026/012',
      grnId: 'GRN/2026/089',
      vendorId: 'VEND/005',
      vendorName: 'Acid Suppliers Co',
      returnDate: '2026-04-13',
      items: [
        { material: 'Sulfuric Acid', quantity: 50, unit: 'Litre', reason: 'Contamination' },
      ],
      returnReason: 'Quality rejection - contamination',
      debitNoteIssued: true,
      debitNoteNumber: 'DN/2026/034',
      debitNoteAmount: 2655,
    },
  ];

  const poTracking = [
    {
      poNumber: 'PO/2026/234',
      vendorName: 'Metal Suppliers Ltd',
      orderQty: 5000,
      receivedQty: 0,
      pendingQty: 5000,
      expectedDelivery: '2026-04-21',
      status: 'On Time',
    },
    {
      poNumber: 'PO/2026/233',
      vendorName: 'PlastChem Industries',
      orderQty: 7000,
      receivedQty: 0,
      pendingQty: 7000,
      expectedDelivery: '2026-04-18',
      status: 'On Time',
    },
    {
      poNumber: 'PO/2026/230',
      vendorName: 'Acid Suppliers Co',
      orderQty: 2000,
      receivedQty: 1200,
      pendingQty: 800,
      expectedDelivery: '2026-04-12',
      status: 'Delayed',
    },
  ];

  const stats = {
    pendingMRF: materialRequisitions.filter(m => m.status === 'Pending').length,
    openPO: purchaseOrders.filter(p => p.status !== 'Completed' && p.status !== 'Closed').length,
    pendingGRN: 3,
    pendingReturns: purchaseReturns.filter(r => !r.debitNoteIssued).length,
  };

  const mrfStatusColors: Record<string, string> = {
    'Pending': 'bg-yellow-100 text-yellow-700',
    'Approved': 'bg-blue-100 text-blue-700',
    'PO Created': 'bg-green-100 text-green-700',
    'Rejected': 'bg-red-100 text-red-700',
  };

  const poStatusColors: Record<string, string> = {
    'Draft': 'bg-gray-100 text-gray-700',
    'Approved': 'bg-blue-100 text-blue-700',
    'Sent': 'bg-purple-100 text-purple-700',
    'Partially Received': 'bg-orange-100 text-orange-700',
    'Completed': 'bg-green-100 text-green-700',
    'Closed': 'bg-gray-100 text-gray-700',
  };

  const qcStatusColors: Record<string, string> = {
    'Pending': 'bg-yellow-100 text-yellow-700',
    'Passed': 'bg-green-100 text-green-700',
    'Failed': 'bg-red-100 text-red-700',
  };

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };


  const handleMRFCreated = () => {
    console.log('MRF created successfully!');
    // Refresh MRF list or show toast
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-gray-900">Purchase Management</h1>
          <p className="text-sm text-gray-600">Manage POs, GRNs, and purchase returns</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download className="size-4" />
            Export
          </button>
          <button
            onClick={() => setIsNewMRFModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            <Plus className="size-4" />
            New MRF
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <ClipboardList className="size-4 text-blue-500" />
            <p className="text-xs text-gray-600">Pending MRF</p>
          </div>
          <p className="text-xl font-bold text-gray-900">{stats.pendingMRF}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="size-4 text-purple-500" />
            <p className="text-xs text-gray-600">Open POs</p>
          </div>
          <p className="text-xl font-bold text-gray-900">{stats.openPO}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <Package className="size-4 text-orange-500" />
            <p className="text-xs text-gray-600">Pending GRN</p>
          </div>
          <p className="text-xl font-bold text-gray-900">{stats.pendingGRN}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <RotateCcw className="size-4 text-red-500" />
            <p className="text-xs text-gray-600">Pending Returns</p>
          </div>
          <p className="text-xl font-bold text-gray-900">{stats.pendingReturns}</p>
        </div>
      </div>

      {/* View Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex gap-6 overflow-x-auto">
          {(['mrf', 'comparison', 'po', 'grn', 'return'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === tab
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
            >
              {tab === 'mrf' ? 'Material Requisition' :
                tab === 'comparison' ? 'Supplier Comparison' :
                  tab === 'po' ? 'Purchase Orders' :
                    tab === 'grn' ? 'Goods Receipt (GRN)' : 'Purchase Return'}
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
            placeholder={`Search ${activeTab}...`}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select className="px-4 py-2 border border-gray-300 rounded-lg">
          <option>All Status</option>
          <option>Pending</option>
          <option>Approved</option>
          <option>Completed</option>
        </select>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
          <Filter className="size-4" />
          Filter
        </button>
      </div>

      {/* Content - Material Requisition */}
      {activeTab === 'mrf' && (
        <div className="space-y-4">
          {materialRequisitions.map((mrf) => (
            <div key={mrf.id} className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-blue-50 rounded">
                    <ClipboardList className="size-5 text-blue-500" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-medium text-gray-900">{mrf.id}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded ${mrfStatusColors[mrf.status]}`}>
                        {mrf.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                      <span>Requested by: {mrf.requestedBy}</span>
                      <span>•</span>
                      <span>Required: {new Date(mrf.requiredDate).toLocaleDateString('en-IN')}</span>
                      <span>•</span>
                      <span>Purpose: {mrf.purpose}</span>
                    </div>

                    <div className="bg-gray-50 rounded p-3">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-1 text-xs text-gray-500">Item</th>
                            <th className="text-right py-1 text-xs text-gray-500">Quantity</th>
                            <th className="text-left py-1 text-xs text-gray-500">Unit</th>
                          </tr>
                        </thead>
                        <tbody>
                          {mrf.items.map((item, idx) => (
                            <tr key={idx}>
                              <td className="py-1">{item.name}</td>
                              <td className="py-1 text-right">{item.quantity.toLocaleString()}</td>
                              <td className="py-1">{item.unit}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                      <span>Requested: {new Date(mrf.requestedDate).toLocaleDateString('en-IN')}</span>
                      {mrf.approvedBy && (
                        <span>Approved by: {mrf.approvedBy} on {new Date(mrf.approvedDate!).toLocaleDateString('en-IN')}</span>
                      )}
                      {mrf.poReference && (
                        <span>PO Reference: {mrf.poReference}</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {mrf.status === 'Pending' && (
                    <>
                      <button className="p-2 text-green-600 hover:bg-green-50 rounded">
                        <CheckCircle className="size-4" />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded">
                        <XCircle className="size-4" />
                      </button>
                    </>
                  )}
                  {mrf.status === 'Approved' && (
                    <button className="px-3 py-1.5 bg-blue-600 text-white text-xs rounded hover:bg-blue-700">
                      Create PO
                    </button>
                  )}
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded hover:bg-gray-50">
                    <Eye className="size-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Content - Supplier Comparison */}
      {activeTab === 'comparison' && (
        <div className="space-y-4">
          {supplierComparisons.map((comp) => (
            <div key={comp.id} className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-purple-50 rounded">
                  <Scale className="size-5 text-purple-500" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="font-medium text-gray-900">{comp.id}</h3>
                    <span className="text-sm text-gray-600">{comp.itemName}</span>
                    <span className="text-xs text-gray-400">|</span>
                    <span className="text-sm text-gray-600">Qty: {comp.quantity} {comp.unit}</span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200 bg-gray-50">
                          <th className="text-left py-2 px-3 text-xs text-gray-600">Vendor</th>
                          <th className="text-right py-2 px-3 text-xs text-gray-600">Price/Unit</th>
                          <th className="text-right py-2 px-3 text-xs text-gray-600">Total</th>
                          <th className="text-right py-2 px-3 text-xs text-gray-600">Delivery (Days)</th>
                          <th className="text-center py-2 px-3 text-xs text-gray-600">Rating</th>
                          <th className="text-center py-2 px-3 text-xs text-gray-600">Selection</th>
                        </tr>
                      </thead>
                      <tbody>
                        {comp.vendors.map((vendor, idx) => (
                          <tr key={idx} className="border-b border-gray-100">
                            <td className="py-2 px-3">{vendor.name}</td>
                            <td className="py-2 px-3 text-right">{formatCurrency(vendor.price)}</td>
                            <td className="py-2 px-3 text-right">{formatCurrency(vendor.price * comp.quantity)}</td>
                            <td className="py-2 px-3 text-right">{vendor.deliveryTime} days</td>
                            <td className="py-2 px-3 text-center">
                              <span className="text-yellow-500">{'★'.repeat(Math.floor(vendor.rating))}{'☆'.repeat(5 - Math.floor(vendor.rating))}</span>
                            </td>
                            <td className="py-2 px-3 text-center">
                              {vendor.name === comp.selectedVendor && (
                                <CheckCircle className="size-4 text-green-600 inline" />
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-3 p-3 bg-green-50 rounded">
                    <p className="text-sm">
                      <span className="font-medium">Selected Vendor:</span> {comp.selectedVendor}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      <span className="font-medium">Remarks:</span> {comp.negotiationRemarks}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Content - Purchase Orders */}
      {activeTab === 'po' && (
        <div className="space-y-6">
          {/* PO Tracking Summary */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">PO Tracking</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left py-3 px-4 text-xs text-gray-600">PO Number</th>
                    <th className="text-left py-3 px-4 text-xs text-gray-600">Vendor</th>
                    <th className="text-right py-3 px-4 text-xs text-gray-600">Order Qty</th>
                    <th className="text-right py-3 px-4 text-xs text-gray-600">Received</th>
                    <th className="text-right py-3 px-4 text-xs text-gray-600">Pending</th>
                    <th className="text-left py-3 px-4 text-xs text-gray-600">Expected Delivery</th>
                    <th className="text-left py-3 px-4 text-xs text-gray-600">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {poTracking.map((po) => (
                    <tr key={po.poNumber} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm font-mono text-gray-800">{po.poNumber}</td>
                      <td className="py-3 px-4 text-sm text-gray-900">{po.vendorName}</td>
                      <td className="py-3 px-4 text-right text-sm text-gray-600">{po.orderQty.toLocaleString()}</td>
                      <td className="py-3 px-4 text-right text-sm text-green-600">{po.receivedQty.toLocaleString()}</td>
                      <td className="py-3 px-4 text-right text-sm text-orange-600">{po.pendingQty.toLocaleString()}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {new Date(po.expectedDelivery).toLocaleDateString('en-IN')}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`text-xs px-2 py-1 rounded ${po.status === 'On Time' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                          }`}>
                          {po.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Purchase Orders List */}
          {purchaseOrders.map((po) => (
            <div key={po.id} className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-orange-50 rounded">
                    <FileText className="size-5 text-orange-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-medium text-gray-900">{po.id}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded ${poStatusColors[po.status]}`}>
                        {po.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                      <span>Vendor: {po.vendorName} ({po.vendorId})</span>
                      <span>•</span>
                      <span>PO Date: {new Date(po.poDate).toLocaleDateString('en-IN')}</span>
                      <span>•</span>
                      <span>Delivery: {new Date(po.expectedDelivery).toLocaleDateString('en-IN')}</span>
                    </div>

                    <div className="bg-gray-50 rounded p-3 mb-2">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-1 text-xs text-gray-500">Material</th>
                            <th className="text-right py-1 text-xs text-gray-500">Qty</th>
                            <th className="text-left py-1 text-xs text-gray-500">Unit</th>
                            <th className="text-right py-1 text-xs text-gray-500">Rate</th>
                            <th className="text-right py-1 text-xs text-gray-500">GST</th>
                            <th className="text-right py-1 text-xs text-gray-500">Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {po.items.map((item, idx) => (
                            <tr key={idx}>
                              <td className="py-1">{item.material}</td>
                              <td className="py-1 text-right">{item.quantity.toLocaleString()}</td>
                              <td className="py-1">{item.unit}</td>
                              <td className="py-1 text-right">{formatCurrency(item.rate)}</td>
                              <td className="py-1 text-right">{item.gst}%</td>
                              <td className="py-1 text-right">{formatCurrency(item.amount)}</td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr className="border-t border-gray-200">
                            <td colSpan={5} className="pt-2 text-right text-xs text-gray-500">Subtotal:</td>
                            <td className="pt-2 text-right font-medium">{formatCurrency(po.subtotal)}</td>
                          </tr>
                          <tr>
                            <td colSpan={5} className="text-right text-xs text-gray-500">GST (18%):</td>
                            <td className="text-right font-medium">{formatCurrency(po.gstAmount)}</td>
                          </tr>
                          <tr>
                            <td colSpan={5} className="text-right text-sm font-medium">Total:</td>
                            <td className="text-right font-bold text-blue-600">{formatCurrency(po.totalAmount)}</td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>

                    <div className="flex items-center gap-4 text-xs">
                      <div>
                        <span className="text-gray-500">L1 ({po.approvalWorkflow.l1.approver}):</span>
                        <span className={`ml-1 ${po.approvalWorkflow.l1.status === 'Approved' ? 'text-green-600' : 'text-yellow-600'}`}>
                          {po.approvalWorkflow.l1.status}
                          {po.approvalWorkflow.l1.date && ` on ${new Date(po.approvalWorkflow.l1.date).toLocaleDateString('en-IN')}`}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">L2 ({po.approvalWorkflow.l2.approver}):</span>
                        <span className={`ml-1 ${po.approvalWorkflow.l2.status === 'Approved' ? 'text-green-600' : 'text-yellow-600'}`}>
                          {po.approvalWorkflow.l2.status}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">Received:</span>
                        <span className="ml-1">{po.receivedQty} / {po.pendingQty + po.receivedQty}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {po.status === 'Approved' && (
                    <button className="px-3 py-1.5 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 flex items-center gap-1">
                      <Send className="size-3" />
                      Send to Vendor
                    </button>
                  )}
                  {po.status === 'Sent' && (
                    <button className="px-3 py-1.5 bg-green-600 text-white text-xs rounded hover:bg-green-700">
                      Create GRN
                    </button>
                  )}
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded hover:bg-gray-50">
                    <Printer className="size-4" />
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

      {/* Content - Goods Receipt (GRN) */}
      {activeTab === 'grn' && (
        <div className="space-y-4">
          {grnEntries.map((grn) => (
            <div key={grn.id} className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-green-50 rounded">
                  <Package className="size-5 text-green-500" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-medium text-gray-900">{grn.id}</h3>
                    <span className="text-sm text-gray-600">PO: {grn.poId}</span>
                    <span className="text-xs text-gray-400">|</span>
                    <span className="text-sm text-gray-600">Vendor: {grn.vendorName}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                    <span>Receipt Date: {new Date(grn.receiptDate).toLocaleDateString('en-IN')}</span>
                    <span>•</span>
                    <span>Inspected by: {grn.inspectedBy}</span>
                  </div>

                  <div className="bg-gray-50 rounded p-3 mb-2">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-1 text-xs text-gray-500">Material</th>
                          <th className="text-right py-1 text-xs text-gray-500">Ordered</th>
                          <th className="text-right py-1 text-xs text-gray-500">Received</th>
                          <th className="text-right py-1 text-xs text-gray-500">Accepted</th>
                          <th className="text-right py-1 text-xs text-gray-500">Rejected</th>
                          <th className="text-left py-1 text-xs text-gray-500">Unit</th>
                        </tr>
                      </thead>
                      <tbody>
                        {grn.items.map((item, idx) => (
                          <tr key={idx}>
                            <td className="py-1">{item.material}</td>
                            <td className="py-1 text-right">{item.orderedQty.toLocaleString()}</td>
                            <td className="py-1 text-right">{item.receivedQty.toLocaleString()}</td>
                            <td className="py-1 text-right text-green-600">{item.acceptedQty.toLocaleString()}</td>
                            <td className="py-1 text-right text-red-600">{item.rejectedQty.toLocaleString()}</td>
                            <td className="py-1">{item.unit}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="flex items-center gap-4">
                    <div>
                      <span className="text-xs text-gray-500">QC Status:</span>
                      <span className={`ml-2 text-xs px-2 py-0.5 rounded ${qcStatusColors[grn.qcStatus]}`}>
                        {grn.qcStatus}
                      </span>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500">Remarks:</span>
                      <span className="ml-2 text-sm text-gray-600">{grn.qcRemarks}</span>
                    </div>
                  </div>
                </div>
                {grn.items.some(i => i.rejectedQty > 0) && (
                  <button className="px-3 py-1.5 bg-orange-600 text-white text-xs rounded hover:bg-orange-700">
                    Create Return
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Content - Purchase Return */}
      {activeTab === 'return' && (
        <div className="space-y-4">
          {purchaseReturns.map((ret) => (
            <div key={ret.id} className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-red-50 rounded">
                  <RotateCcw className="size-5 text-red-500" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-medium text-gray-900">{ret.id}</h3>
                    <span className="text-sm text-gray-600">GRN: {ret.grnId}</span>
                    <span className="text-xs text-gray-400">|</span>
                    <span className="text-sm text-gray-600">Vendor: {ret.vendorName}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                    <span>Return Date: {new Date(ret.returnDate).toLocaleDateString('en-IN')}</span>
                    <span>•</span>
                    <span>Reason: {ret.returnReason}</span>
                  </div>

                  <div className="bg-gray-50 rounded p-3 mb-2">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-1 text-xs text-gray-500">Material</th>
                          <th className="text-right py-1 text-xs text-gray-500">Quantity</th>
                          <th className="text-left py-1 text-xs text-gray-500">Unit</th>
                          <th className="text-left py-1 text-xs text-gray-500">Reason</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ret.items.map((item, idx) => (
                          <tr key={idx}>
                            <td className="py-1">{item.material}</td>
                            <td className="py-1 text-right">{item.quantity}</td>
                            <td className="py-1">{item.unit}</td>
                            <td className="py-1 text-red-600">{item.reason}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="flex items-center gap-4">
                    <div>
                      <span className="text-xs text-gray-500">Debit Note:</span>
                      {ret.debitNoteIssued ? (
                        <span className="ml-2 text-sm text-green-600">
                          {ret.debitNoteNumber} - {formatCurrency(ret.debitNoteAmount)}
                        </span>
                      ) : (
                        <span className="ml-2 text-sm text-yellow-600">Pending</span>
                      )}
                    </div>
                  </div>
                </div>
                {!ret.debitNoteIssued && (
                  <button className="px-3 py-1.5 bg-blue-600 text-white text-xs rounded hover:bg-blue-700">
                    Issue Debit Note
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <NewMRFModal
        open={isNewMRFModalOpen}
        onOpenChange={setIsNewMRFModalOpen}
        onSuccess={handleMRFCreated}
      />
    </div>
  );
}