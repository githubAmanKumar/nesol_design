// src/app/pages/logistics/OrderManagement.tsx
import { useState } from 'react';
import { 
  Package, Truck, CheckCircle, XCircle, Clock, AlertCircle,
  Search, Filter, Download, Eye, MoreVertical, Calendar,
  FileText, MapPin, Phone, Mail, ChevronDown, RefreshCw,
  Ban, Printer, QrCode, ArrowRight
} from 'lucide-react';

export default function OrderManagement() {
  const [activeTab, setActiveTab] = useState<'workflow' | 'shipment' | 'cancellation' | 'challan' | 'ewaybill'>('workflow');
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  const salesOrders = [
    {
      id: 'SO/2026/089',
      orderDate: '2026-04-15',
      customerName: 'Delhi Batteries Pvt Ltd',
      customerId: 'CUST/001',
      totalQty: 80,
      shippedQty: 0,
      backorderQty: 80,
      status: 'Approved',
      statusUpdated: '2026-04-16',
      expectedDelivery: '2026-04-25',
      items: [
        { product: 'Automotive Battery 150AH', qty: 50 },
        { product: 'Automotive Battery 100AH', qty: 30 },
      ],
    },
    {
      id: 'SO/2026/088',
      orderDate: '2026-04-14',
      customerName: 'Mumbai Auto Electricals',
      customerId: 'CUST/015',
      totalQty: 15,
      shippedQty: 15,
      backorderQty: 0,
      status: 'Dispatched',
      statusUpdated: '2026-04-16',
      expectedDelivery: '2026-04-22',
      items: [
        { product: 'Inverter Battery 200AH', qty: 15 },
      ],
    },
    {
      id: 'SO/2026/087',
      orderDate: '2026-04-12',
      customerName: 'Chennai Battery House',
      customerId: 'CUST/023',
      totalQty: 25,
      shippedQty: 25,
      backorderQty: 0,
      status: 'Completed',
      statusUpdated: '2026-04-18',
      expectedDelivery: '2026-04-20',
      items: [
        { product: 'E-Rickshaw Battery 120AH', qty: 25 },
      ],
    },
    {
      id: 'SO/2026/086',
      orderDate: '2026-04-10',
      customerName: 'Kolkata Power Solutions',
      customerId: 'CUST/008',
      totalQty: 100,
      shippedQty: 100,
      backorderQty: 0,
      status: 'Invoiced',
      statusUpdated: '2026-04-17',
      expectedDelivery: '2026-04-18',
      items: [
        { product: 'Solar Battery 40AH', qty: 100 },
      ],
    },
    {
      id: 'SO/2026/090',
      orderDate: '2026-04-16',
      customerName: 'Jaipur Auto Parts',
      customerId: 'CUST/032',
      totalQty: 20,
      shippedQty: 0,
      backorderQty: 20,
      status: 'Pending',
      statusUpdated: '2026-04-16',
      expectedDelivery: null,
      items: [
        { product: 'Automotive Battery 150AH', qty: 20 },
      ],
    },
    {
      id: 'SO/2026/084',
      orderDate: '2026-04-03',
      customerName: 'Hyderabad Batteries',
      customerId: 'CUST/018',
      totalQty: 40,
      shippedQty: 25,
      backorderQty: 15,
      status: 'Partially Dispatched',
      statusUpdated: '2026-04-10',
      expectedDelivery: '2026-04-25',
      items: [
        { product: 'Automotive Battery 100AH', qty: 40 },
      ],
    },
    {
      id: 'SO/2026/082',
      orderDate: '2026-04-01',
      customerName: 'Lucknow Battery World',
      customerId: 'CUST/045',
      totalQty: 10,
      shippedQty: 0,
      backorderQty: 0,
      status: 'Cancelled',
      statusUpdated: '2026-04-05',
      expectedDelivery: null,
      items: [
        { product: 'Solar Battery 40AH', qty: 10 },
      ],
    },
  ];

  const partialShipments = [
    {
      salesOrderId: 'SO/2026/084',
      totalQtyOrdered: 40,
      qtyShippedSoFar: 25,
      backorderQty: 15,
      backorderReleaseDate: '2026-04-22',
      shipments: [
        { date: '2026-04-08', qty: 15, dcId: 'DC/2026/045' },
        { date: '2026-04-10', qty: 10, dcId: 'DC/2026/048' },
      ],
    },
  ];

  const cancellations = [
    {
      id: 'CAN/2026/008',
      salesOrderId: 'SO/2026/082',
      cancellationDate: '2026-04-05',
      reason: 'Customer requested cancellation',
      stockReversalDone: true,
      cancellationCharges: 1250,
      approvedBy: 'Sales Head',
    },
  ];

  const deliveryChallans = [
    {
      id: 'DC/2026/052',
      salesOrderId: 'SO/2026/088',
      dcDate: '2026-04-16',
      vehicleNumber: 'MH 04 GH 7890',
      items: [
        { product: 'Inverter Battery 200AH', qty: 15 },
      ],
      transporter: 'VRL Logistics',
      lrNumber: 'VRL/2026/04568',
      status: 'In Transit',
    },
    {
      id: 'DC/2026/051',
      salesOrderId: 'SO/2026/087',
      dcDate: '2026-04-14',
      vehicleNumber: 'TN 09 JK 1234',
      items: [
        { product: 'E-Rickshaw Battery 120AH', qty: 25 },
      ],
      transporter: 'Gati Transport',
      lrNumber: 'GATI/2026/12346',
      status: 'Delivered',
    },
    {
      id: 'DC/2026/050',
      salesOrderId: 'SO/2026/086',
      dcDate: '2026-04-12',
      vehicleNumber: 'WB 11C 4567',
      items: [
        { product: 'Solar Battery 40AH', qty: 100 },
      ],
      transporter: 'VRL Logistics',
      lrNumber: 'VRL/2026/04567',
      status: 'Delivered',
    },
    {
      id: 'DC/2026/048',
      salesOrderId: 'SO/2026/084',
      dcDate: '2026-04-10',
      vehicleNumber: 'TS 08 AB 5678',
      items: [
        { product: 'Automotive Battery 100AH', qty: 10 },
      ],
      transporter: 'TCI Freight',
      lrNumber: 'TCI/2026/07890',
      status: 'Delivered',
    },
    {
      id: 'DC/2026/045',
      salesOrderId: 'SO/2026/084',
      dcDate: '2026-04-08',
      vehicleNumber: 'TS 08 AB 3456',
      items: [
        { product: 'Automotive Battery 100AH', qty: 15 },
      ],
      transporter: 'TCI Freight',
      lrNumber: 'TCI/2026/07845',
      status: 'Delivered',
    },
  ];

  const ewayBills = [
    {
      ewayBillNumber: 'EWB/2026/04567',
      salesOrderId: 'SO/2026/088',
      dcId: 'DC/2026/052',
      generatedDate: '2026-04-16 10:30',
      validUntil: '2026-04-23 23:59',
      vehicleNumber: 'MH 04 GH 7890',
      distance: 1450,
      status: 'Active',
      transporterId: 'VRL/TRANS/001',
    },
    {
      ewayBillNumber: 'EWB/2026/04566',
      salesOrderId: 'SO/2026/087',
      dcId: 'DC/2026/051',
      generatedDate: '2026-04-14 09:15',
      validUntil: '2026-04-21 23:59',
      vehicleNumber: 'TN 09 JK 1234',
      distance: 2150,
      status: 'Expired',
      transporterId: 'GATI/TRANS/003',
    },
    {
      ewayBillNumber: 'EWB/2026/04565',
      salesOrderId: 'SO/2026/086',
      dcId: 'DC/2026/050',
      generatedDate: '2026-04-12 14:20',
      validUntil: '2026-04-19 23:59',
      vehicleNumber: 'WB 11C 4567',
      distance: 1350,
      status: 'Expired',
      transporterId: 'VRL/TRANS/001',
    },
  ];

  const stats = {
    pendingOrders: salesOrders.filter(o => o.status === 'Pending' || o.status === 'Approved').length,
    readyToDispatch: salesOrders.filter(o => o.status === 'Ready for Dispatch').length,
    inTransit: deliveryChallans.filter(d => d.status === 'In Transit').length,
    backorderQty: salesOrders.reduce((sum, o) => sum + o.backorderQty, 0),
  };

  const statusColors: Record<string, string> = {
    'Pending': 'bg-yellow-100 text-yellow-700',
    'Approved': 'bg-blue-100 text-blue-700',
    'Ready for Dispatch': 'bg-purple-100 text-purple-700',
    'Partially Dispatched': 'bg-orange-100 text-orange-700',
    'Dispatched': 'bg-cyan-100 text-cyan-700',
    'Invoiced': 'bg-indigo-100 text-indigo-700',
    'Completed': 'bg-green-100 text-green-700',
    'Cancelled': 'bg-red-100 text-red-700',
  };

  const ewayBillStatusColors: Record<string, string> = {
    'Generated': 'bg-blue-100 text-blue-700',
    'Active': 'bg-green-100 text-green-700',
    'Expired': 'bg-red-100 text-red-700',
  };

  const formatDate = (date: string | null) => {
    if (!date) return '—';
    return new Date(date).toLocaleDateString('en-IN');
  };

  const formatDateTime = (dateTime: string) => {
    return new Date(dateTime).toLocaleString('en-IN');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-gray-900">Order Management</h1>
          <p className="text-sm text-gray-600">Track sales orders and dispatch status</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download className="size-4" />
            Export
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="size-4 text-yellow-500" />
            <p className="text-xs text-gray-600">Pending Orders</p>
          </div>
          <p className="text-xl font-bold text-gray-900">{stats.pendingOrders}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <Package className="size-4 text-purple-500" />
            <p className="text-xs text-gray-600">Ready to Dispatch</p>
          </div>
          <p className="text-xl font-bold text-gray-900">{stats.readyToDispatch}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <Truck className="size-4 text-blue-500" />
            <p className="text-xs text-gray-600">In Transit</p>
          </div>
          <p className="text-xl font-bold text-gray-900">{stats.inTransit}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="size-4 text-orange-500" />
            <p className="text-xs text-gray-600">Backorder Quantity</p>
          </div>
          <p className="text-xl font-bold text-gray-900">{stats.backorderQty} units</p>
        </div>
      </div>

      {/* View Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex gap-6 overflow-x-auto">
          {(['workflow', 'shipment', 'cancellation', 'challan', 'ewaybill'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab === 'workflow' ? 'Order Workflow' : 
               tab === 'shipment' ? 'Partial Shipments' : 
               tab === 'cancellation' ? 'Order Cancellation' : 
               tab === 'challan' ? 'Delivery Challan' : 'E-Way Bill'}
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
            placeholder="Search by order ID or customer..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select className="px-4 py-2 border border-gray-300 rounded-lg">
          <option>All Status</option>
          <option>Pending</option>
          <option>Approved</option>
          <option>Ready for Dispatch</option>
          <option>Dispatched</option>
          <option>Completed</option>
          <option>Cancelled</option>
        </select>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
          <Filter className="size-4" />
          Filter
        </button>
      </div>

      {/* Content - Order Workflow */}
      {activeTab === 'workflow' && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-3 px-4 text-xs text-gray-600">Order ID</th>
                  <th className="text-left py-3 px-4 text-xs text-gray-600">Order Date</th>
                  <th className="text-left py-3 px-4 text-xs text-gray-600">Customer</th>
                  <th className="text-right py-3 px-4 text-xs text-gray-600">Total Qty</th>
                  <th className="text-right py-3 px-4 text-xs text-gray-600">Shipped</th>
                  <th className="text-right py-3 px-4 text-xs text-gray-600">Backorder</th>
                  <th className="text-left py-3 px-4 text-xs text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 text-xs text-gray-600">Status Updated</th>
                  <th className="text-left py-3 px-4 text-xs text-gray-600">Expected Delivery</th>
                  <th className="text-right py-3 px-4 text-xs text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {salesOrders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <span className="text-sm font-mono text-gray-800">{order.id}</span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{formatDate(order.orderDate)}</td>
                    <td className="py-3 px-4">
                      <p className="text-sm font-medium text-gray-900">{order.customerName}</p>
                      <p className="text-xs text-gray-500">{order.customerId}</p>
                    </td>
                    <td className="py-3 px-4 text-right text-sm text-gray-900">{order.totalQty}</td>
                    <td className="py-3 px-4 text-right text-sm text-green-600">{order.shippedQty}</td>
                    <td className="py-3 px-4 text-right">
                      <span className={`text-sm font-medium ${order.backorderQty > 0 ? 'text-orange-600' : 'text-gray-600'}`}>
                        {order.backorderQty}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`text-xs px-2 py-1 rounded ${statusColors[order.status]}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{formatDate(order.statusUpdated)}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{formatDate(order.expectedDelivery)}</td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded">
                          <Eye className="size-4" />
                        </button>
                        {order.status === 'Approved' && (
                          <button className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded">
                            <Truck className="size-4" />
                          </button>
                        )}
                        <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded">
                          <MoreVertical className="size-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Order Timeline Visualization */}
          <div className="p-6 border-t border-gray-200 bg-gray-50">
            <h3 className="font-semibold text-gray-900 mb-4">Order Status Distribution</h3>
            <div className="flex items-center gap-2">
              {Object.entries(statusColors).map(([status, colorClass]) => {
                const count = salesOrders.filter(o => o.status === status).length;
                if (count === 0) return null;
                return (
                  <div key={status} className="flex items-center gap-2">
                    <div className={`h-8 rounded-lg flex items-center px-3 ${colorClass}`}>
                      <span className="text-xs font-medium">{status}</span>
                      <span className="ml-2 text-sm font-bold">{count}</span>
                    </div>
                    <ChevronDown className="size-4 text-gray-400 last:hidden" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Content - Partial Shipments */}
      {activeTab === 'shipment' && (
        <div className="space-y-4">
          {partialShipments.map((shipment) => {
            const order = salesOrders.find(o => o.id === shipment.salesOrderId);
            return (
              <div key={shipment.salesOrderId} className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-orange-50 rounded">
                    <Package className="size-5 text-orange-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-medium text-gray-900">{shipment.salesOrderId}</h3>
                      <span className="text-xs text-gray-400">|</span>
                      <span className="text-sm text-gray-600">{order?.customerName}</span>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mb-3">
                      <div className="bg-gray-50 rounded p-3">
                        <p className="text-xs text-gray-500">Total Ordered</p>
                        <p className="text-lg font-bold text-gray-900">{shipment.totalQtyOrdered} units</p>
                      </div>
                      <div className="bg-green-50 rounded p-3">
                        <p className="text-xs text-gray-500">Shipped So Far</p>
                        <p className="text-lg font-bold text-green-600">{shipment.qtyShippedSoFar} units</p>
                      </div>
                      <div className="bg-orange-50 rounded p-3">
                        <p className="text-xs text-gray-500">Backorder Quantity</p>
                        <p className="text-lg font-bold text-orange-600">{shipment.backorderQty} units</p>
                      </div>
                    </div>

                    <div className="mb-3">
                      <p className="text-xs text-gray-500 mb-1">Backorder Release Date</p>
                      <p className="text-sm font-medium text-gray-900 flex items-center gap-1">
                        <Calendar className="size-3" />
                        {formatDate(shipment.backorderReleaseDate)}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500 mb-2">Shipment History</p>
                      <div className="space-y-2">
                        {shipment.shipments.map((s, idx) => (
                          <div key={idx} className="flex items-center gap-4 p-2 bg-gray-50 rounded">
                            <span className="text-sm text-gray-600">{formatDate(s.date)}</span>
                            <span className="text-sm font-medium">{s.qty} units</span>
                            <span className="text-sm text-gray-500">DC: {s.dcId}</span>
                            <CheckCircle className="size-4 text-green-500 ml-auto" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  {shipment.backorderQty > 0 && (
                    <button className="px-3 py-1.5 bg-blue-600 text-white text-xs rounded hover:bg-blue-700">
                      Schedule Shipment
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Content - Order Cancellation */}
      {activeTab === 'cancellation' && (
        <div className="space-y-4">
          {cancellations.map((cancellation) => {
            const order = salesOrders.find(o => o.id === cancellation.salesOrderId);
            return (
              <div key={cancellation.id} className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-red-50 rounded">
                    <Ban className="size-5 text-red-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-medium text-gray-900">{cancellation.id}</h3>
                      <span className="text-xs text-gray-400">|</span>
                      <span className="text-sm text-gray-600">Order: {cancellation.salesOrderId}</span>
                      <span className="text-xs text-gray-400">|</span>
                      <span className="text-sm text-gray-600">{order?.customerName}</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <p className="text-xs text-gray-500">Cancellation Date</p>
                        <p className="text-sm font-medium">{formatDate(cancellation.cancellationDate)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Approved By</p>
                        <p className="text-sm font-medium">{cancellation.approvedBy}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-xs text-gray-500">Reason</p>
                        <p className="text-sm text-gray-800">{cancellation.reason}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 p-3 bg-gray-50 rounded">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">Stock Reversal:</span>
                        {cancellation.stockReversalDone ? (
                          <CheckCircle className="size-4 text-green-500" />
                        ) : (
                          <XCircle className="size-4 text-red-500" />
                        )}
                        <span className="text-sm">{cancellation.stockReversalDone ? 'Done' : 'Pending'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">Cancellation Charges:</span>
                        <span className="text-sm font-medium">₹{cancellation.cancellationCharges.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Content - Delivery Challan */}
      {activeTab === 'challan' && (
        <div className="space-y-4">
          {deliveryChallans.map((dc) => (
            <div key={dc.id} className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-blue-50 rounded">
                    <FileText className="size-5 text-blue-500" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-medium text-gray-900">{dc.id}</h3>
                      <span className="text-xs text-gray-400">|</span>
                      <span className="text-sm text-gray-600">Order: {dc.salesOrderId}</span>
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        dc.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {dc.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <p className="text-xs text-gray-500">DC Date</p>
                        <p className="text-sm">{formatDate(dc.dcDate)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Vehicle Number</p>
                        <p className="text-sm font-mono">{dc.vehicleNumber}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Transporter</p>
                        <p className="text-sm">{dc.transporter}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">LR Number</p>
                        <p className="text-sm font-mono">{dc.lrNumber}</p>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded p-3">
                      <p className="text-xs text-gray-500 mb-2">Items Dispatched</p>
                      <div className="space-y-1">
                        {dc.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between text-sm">
                            <span>{item.product}</span>
                            <span className="font-medium">{item.qty} units</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-gray-400 hover:text-blue-600 rounded">
                    <Printer className="size-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-green-600 rounded">
                    <Download className="size-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Content - E-Way Bill */}
      {activeTab === 'ewaybill' && (
        <div className="space-y-4">
          {ewayBills.map((ewb) => (
            <div key={ewb.ewayBillNumber} className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-purple-50 rounded">
                    <QrCode className="size-5 text-purple-500" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-medium text-gray-900 font-mono">{ewb.ewayBillNumber}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded ${ewayBillStatusColors[ewb.status]}`}>
                        {ewb.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mb-3">
                      <div>
                        <p className="text-xs text-gray-500">Sales Order / DC</p>
                        <p className="text-sm">{ewb.salesOrderId} / {ewb.dcId}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Vehicle Number</p>
                        <p className="text-sm font-mono">{ewb.vehicleNumber}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Distance</p>
                        <p className="text-sm">{ewb.distance} KM</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Generated Date</p>
                        <p className="text-sm">{formatDateTime(ewb.generatedDate)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Valid Until</p>
                        <p className="text-sm">{formatDateTime(ewb.validUntil)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Transporter ID</p>
                        <p className="text-sm">{ewb.transporterId}</p>
                      </div>
                    </div>

                    {ewb.status === 'Expired' && (
                      <div className="p-2 bg-yellow-50 rounded flex items-center gap-2">
                        <AlertCircle className="size-4 text-yellow-500" />
                        <span className="text-sm text-yellow-700">E-Way Bill has expired. Please generate a new one if required.</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-gray-400 hover:text-blue-600 rounded">
                    <QrCode className="size-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-green-600 rounded">
                    <Download className="size-4" />
                  </button>
                  {ewb.status === 'Active' && (
                    <button className="px-3 py-1.5 border border-red-300 text-red-600 text-xs rounded hover:bg-red-50">
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}