// src/app/pages/logistics/LogisticsManagement.tsx
import { useState } from 'react';
import { 
  Truck, Package, MapPin, Phone, Mail, FileText, CheckCircle,
  XCircle, Clock, AlertCircle, Search, Filter, Download,
  Plus, Eye, MoreVertical, Calendar, DollarSign, CreditCard,
  ChevronDown, Upload, Printer, Building2, User, Hash
} from 'lucide-react';

export default function LogisticsManagement() {
  const [activeTab, setActiveTab] = useState<'transporter' | 'freight' | 'dispatch' | 'delivery' | 'cost'>('transporter');

  const transporters = [
    {
      id: 'TRANS/001',
      companyName: 'VRL Logistics',
      contactPerson: 'Manoj Singh',
      phone: '98999 88877',
      alternatePhone: '011 45678901',
      email: 'manoj@vrllogistics.com',
      gstin: '07DDDEE4567L5M9',
      vehicleTypes: ['Truck', 'Container', 'Trailer'],
      coverage: 'Pan India',
      serviceRegions: ['North', 'South', 'East', 'West'],
      status: 'Active',
      rating: 4.5,
    },
    {
      id: 'TRANS/002',
      companyName: 'Gati Transport',
      contactPerson: 'Rajesh Sharma',
      phone: '98765 43210',
      alternatePhone: '0120 4567890',
      email: 'rajesh@gatitransport.com',
      gstin: '09AAAGG5678F2G6',
      vehicleTypes: ['Truck', 'LCV', 'Tempo'],
      coverage: 'Regional',
      serviceRegions: ['North', 'West'],
      status: 'Active',
      rating: 4.2,
    },
    {
      id: 'TRANS/003',
      companyName: 'TCI Freight',
      contactPerson: 'Anil Kumar',
      phone: '97654 32109',
      alternatePhone: '022 34567890',
      email: 'anil@tcifreight.com',
      gstin: '27BBBCD9012H3J7',
      vehicleTypes: ['Container', 'Trailer', 'Truck'],
      coverage: 'Pan India',
      serviceRegions: ['North', 'South', 'East', 'West'],
      status: 'Active',
      rating: 4.8,
    },
    {
      id: 'TRANS/004',
      companyName: 'Uttarakhand Roadways',
      contactPerson: 'Deepak Rawat',
      phone: '98900 12345',
      alternatePhone: '0135 2678901',
      email: 'deepak@ukroadways.com',
      gstin: '05EEFFF5678M6N0',
      vehicleTypes: ['Truck', 'Tempo', 'Pickup'],
      coverage: 'Regional',
      serviceRegions: ['North'],
      status: 'Active',
      rating: 4.0,
    },
  ];

  const freightManagement = [
    {
      shipmentId: 'SHIP/2026/052',
      transporterId: 'TRANS/001',
      transporterName: 'VRL Logistics',
      freightCharges: 12500,
      paidStatus: 'Paid',
      paymentReference: 'PAY/2026/0456',
      paymentDate: '2026-04-16',
      invoiceNumber: 'INV/TR/2026/089',
    },
    {
      shipmentId: 'SHIP/2026/051',
      transporterId: 'TRANS/002',
      transporterName: 'Gati Transport',
      freightCharges: 8500,
      paidStatus: 'To Pay',
      paymentReference: null,
      paymentDate: null,
      invoiceNumber: 'INV/TR/2026/088',
    },
    {
      shipmentId: 'SHIP/2026/050',
      transporterId: 'TRANS/003',
      transporterName: 'TCI Freight',
      freightCharges: 15800,
      paidStatus: 'To Be Billed',
      paymentReference: null,
      paymentDate: null,
      invoiceNumber: null,
    },
    {
      shipmentId: 'SHIP/2026/048',
      transporterId: 'TRANS/001',
      transporterName: 'VRL Logistics',
      freightCharges: 9500,
      paidStatus: 'Paid',
      paymentReference: 'PAY/2026/0432',
      paymentDate: '2026-04-12',
      invoiceNumber: 'INV/TR/2026/085',
    },
  ];

  const dispatchSchedules = [
    {
      id: 'DISP/2026/018',
      date: '2026-04-18',
      orders: ['SO/2026/089', 'SO/2026/090'],
      orderDetails: [
        { orderId: 'SO/2026/089', customer: 'Delhi Batteries', qty: 80, destination: 'Delhi' },
        { orderId: 'SO/2026/090', customer: 'Jaipur Auto Parts', qty: 20, destination: 'Jaipur' },
      ],
      transporterAllocated: 'VRL Logistics',
      transporterId: 'TRANS/001',
      etd: '08:00 AM',
      status: 'Scheduled',
      vehicleNumber: 'HR 55 T 2345',
      driverName: 'Suresh Kumar',
      driverPhone: '98765 12345',
    },
    {
      id: 'DISP/2026/017',
      date: '2026-04-17',
      orders: ['SO/2026/088'],
      orderDetails: [
        { orderId: 'SO/2026/088', customer: 'Mumbai Auto Electricals', qty: 15, destination: 'Mumbai' },
      ],
      transporterAllocated: 'Gati Transport',
      transporterId: 'TRANS/002',
      etd: '06:30 AM',
      status: 'Dispatched',
      vehicleNumber: 'MH 04 GH 7890',
      driverName: 'Ramesh Yadav',
      driverPhone: '98900 67890',
    },
    {
      id: 'DISP/2026/016',
      date: '2026-04-16',
      orders: ['SO/2026/086', 'SO/2026/084'],
      orderDetails: [
        { orderId: 'SO/2026/086', customer: 'Kolkata Power Solutions', qty: 100, destination: 'Kolkata' },
        { orderId: 'SO/2026/084', customer: 'Hyderabad Batteries', qty: 15, destination: 'Hyderabad' },
      ],
      transporterAllocated: 'TCI Freight',
      transporterId: 'TRANS/003',
      etd: '10:00 AM',
      status: 'Completed',
      vehicleNumber: 'TS 08 AB 5678',
      driverName: 'Mahesh Babu',
      driverPhone: '98400 12345',
    },
  ];

  const deliveryConfirmations = [
    {
      shipmentId: 'SHIP/2026/051',
      deliveryDate: '2026-04-18',
      receivedBy: 'Suresh Jain',
      receivedByDesignation: 'Store Manager',
      podDocument: 'POD_SHIP_051.pdf',
      podUploaded: true,
      deliveryStatus: 'Delivered',
      remarks: 'All items received in good condition',
      deliveryTime: '14:30',
    },
    {
      shipmentId: 'SHIP/2026/050',
      deliveryDate: '2026-04-14',
      receivedBy: 'Karthik Subramanian',
      receivedByDesignation: 'Owner',
      podDocument: 'POD_SHIP_050.pdf',
      podUploaded: true,
      deliveryStatus: 'Delivered',
      remarks: 'Received complete order',
      deliveryTime: '11:15',
    },
    {
      shipmentId: 'SHIP/2026/049',
      deliveryDate: '2026-04-12',
      receivedBy: 'Mohan Lal',
      receivedByDesignation: 'Proprietor',
      podDocument: null,
      podUploaded: false,
      deliveryStatus: 'Damaged',
      remarks: '2 batteries damaged in transit, claim filed',
      deliveryTime: '16:45',
    },
    {
      shipmentId: 'SHIP/2026/048',
      deliveryDate: '2026-04-10',
      receivedBy: 'Rajiv Mehta',
      receivedByDesignation: 'Proprietor',
      podDocument: 'POD_SHIP_048.pdf',
      podUploaded: true,
      deliveryStatus: 'Partial',
      remarks: 'Partial delivery - 15 units received, 10 pending',
      deliveryTime: '09:30',
    },
  ];

  const freightCosts = [
    {
      orderId: 'SO/2026/089',
      freightAmount: 6500,
      allocationType: 'Billed to Customer',
      customerName: 'Delhi Batteries Pvt Ltd',
      invoiceIncluded: true,
    },
    {
      orderId: 'SO/2026/088',
      freightAmount: 8500,
      allocationType: 'Absorbed by Company',
      customerName: 'Mumbai Auto Electricals',
      invoiceIncluded: false,
    },
    {
      orderId: 'SO/2026/087',
      freightAmount: 12000,
      allocationType: 'Billed to Customer',
      customerName: 'Chennai Battery House',
      invoiceIncluded: true,
    },
    {
      orderId: 'SO/2026/086',
      freightAmount: 15800,
      allocationType: 'Billed to Customer',
      customerName: 'Kolkata Power Solutions',
      invoiceIncluded: true,
    },
    {
      orderId: 'SO/2026/085',
      freightAmount: 4500,
      allocationType: 'Absorbed by Company',
      customerName: 'Bangalore Motors',
      invoiceIncluded: false,
    },
  ];

  const stats = {
    activeTransporters: transporters.filter(t => t.status === 'Active').length,
    scheduledDispatches: dispatchSchedules.filter(d => d.status === 'Scheduled').length,
    pendingDeliveries: deliveryConfirmations.filter(d => d.deliveryStatus !== 'Delivered').length,
    totalFreightMTD: freightCosts.reduce((sum, f) => sum + f.freightAmount, 0),
  };

  const paidStatusColors: Record<string, string> = {
    'Paid': 'bg-green-100 text-green-700',
    'To Pay': 'bg-yellow-100 text-yellow-700',
    'To Be Billed': 'bg-blue-100 text-blue-700',
  };

  const deliveryStatusColors: Record<string, string> = {
    'Delivered': 'bg-green-100 text-green-700',
    'Partial': 'bg-orange-100 text-orange-700',
    'Damaged': 'bg-red-100 text-red-700',
    'Returned': 'bg-gray-100 text-gray-700',
    'In Transit': 'bg-blue-100 text-blue-700',
  };

  const dispatchStatusColors: Record<string, string> = {
    'Scheduled': 'bg-blue-100 text-blue-700',
    'Dispatched': 'bg-purple-100 text-purple-700',
    'Completed': 'bg-green-100 text-green-700',
  };

  const allocationTypeColors: Record<string, string> = {
    'Billed to Customer': 'bg-blue-100 text-blue-700',
    'Absorbed by Company': 'bg-orange-100 text-orange-700',
  };

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-IN');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-gray-900">Logistics Management</h1>
          <p className="text-sm text-gray-600">Manage transporters, freight, and deliveries</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download className="size-4" />
            Export
          </button>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            <Plus className="size-4" />
            Add Transporter
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <Truck className="size-4 text-blue-500" />
            <p className="text-xs text-gray-600">Active Transporters</p>
          </div>
          <p className="text-xl font-bold text-gray-900">{stats.activeTransporters}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="size-4 text-purple-500" />
            <p className="text-xs text-gray-600">Scheduled Dispatches</p>
          </div>
          <p className="text-xl font-bold text-gray-900">{stats.scheduledDispatches}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="size-4 text-orange-500" />
            <p className="text-xs text-gray-600">Pending Deliveries</p>
          </div>
          <p className="text-xl font-bold text-gray-900">{stats.pendingDeliveries}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="size-4 text-green-500" />
            <p className="text-xs text-gray-600">Freight Cost (MTD)</p>
          </div>
          <p className="text-xl font-bold text-gray-900">{formatCurrency(stats.totalFreightMTD)}</p>
        </div>
      </div>

      {/* View Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex gap-6 overflow-x-auto">
          {(['transporter', 'freight', 'dispatch', 'delivery', 'cost'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab === 'transporter' ? 'Transporter Master' : 
               tab === 'freight' ? 'Freight Management' : 
               tab === 'dispatch' ? 'Dispatch Schedule' : 
               tab === 'delivery' ? 'Delivery Confirmation' : 'Freight Cost'}
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
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
          <Filter className="size-4" />
          Filter
        </button>
      </div>

      {/* Content - Transporter Master */}
      {activeTab === 'transporter' && (
        <div className="space-y-4">
          {transporters.map((transporter) => (
            <div key={transporter.id} className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-blue-50 rounded">
                    <Truck className="size-5 text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-semibold text-gray-900">{transporter.companyName}</h3>
                      <span className="text-xs text-gray-400">|</span>
                      <span className="text-sm text-gray-600">{transporter.id}</span>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                        {transporter.status}
                      </span>
                      <div className="flex items-center ml-auto">
                        <span className="text-yellow-500">
                          {'★'.repeat(Math.floor(transporter.rating))}
                          {'☆'.repeat(5 - Math.floor(transporter.rating))}
                        </span>
                        <span className="text-xs text-gray-600 ml-1">{transporter.rating}</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mt-3">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Contact Information</p>
                        <div className="space-y-1">
                          <p className="text-sm text-gray-800 flex items-center gap-1">
                            <User className="size-3" />
                            {transporter.contactPerson}
                          </p>
                          <p className="text-sm text-gray-600 flex items-center gap-1">
                            <Phone className="size-3" />
                            {transporter.phone} / {transporter.alternatePhone}
                          </p>
                          <p className="text-sm text-gray-600 flex items-center gap-1">
                            <Mail className="size-3" />
                            {transporter.email}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Business Information</p>
                        <p className="text-sm text-gray-800 font-mono">GSTIN: {transporter.gstin}</p>
                        <p className="text-sm text-gray-600 mt-1">
                          <span className="font-medium">Coverage:</span> {transporter.coverage}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3">
                      <p className="text-xs text-gray-500 mb-1">Vehicle Types</p>
                      <div className="flex flex-wrap gap-2">
                        {transporter.vehicleTypes.map((type) => (
                          <span key={type} className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-700">
                            {type}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-2">
                      <p className="text-xs text-gray-500 mb-1">Service Regions</p>
                      <div className="flex flex-wrap gap-2">
                        {transporter.serviceRegions.map((region) => (
                          <span key={region} className="text-xs px-2 py-1 rounded bg-blue-50 text-blue-700 flex items-center gap-1">
                            <MapPin className="size-3" />
                            {region}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-gray-400 hover:text-blue-600 rounded">
                    <Eye className="size-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded">
                    <MoreVertical className="size-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Content - Freight Management */}
      {activeTab === 'freight' && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-3 px-4 text-xs text-gray-600">Shipment ID</th>
                  <th className="text-left py-3 px-4 text-xs text-gray-600">Transporter</th>
                  <th className="text-right py-3 px-4 text-xs text-gray-600">Freight Charges</th>
                  <th className="text-left py-3 px-4 text-xs text-gray-600">Paid Status</th>
                  <th className="text-left py-3 px-4 text-xs text-gray-600">Payment Reference</th>
                  <th className="text-left py-3 px-4 text-xs text-gray-600">Payment Date</th>
                  <th className="text-left py-3 px-4 text-xs text-gray-600">Invoice Number</th>
                  <th className="text-right py-3 px-4 text-xs text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {freightManagement.map((freight) => (
                  <tr key={freight.shipmentId} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm font-mono text-gray-800">{freight.shipmentId}</td>
                    <td className="py-3 px-4">
                      <p className="text-sm font-medium text-gray-900">{freight.transporterName}</p>
                      <p className="text-xs text-gray-500">{freight.transporterId}</p>
                    </td>
                    <td className="py-3 px-4 text-right text-sm font-semibold text-gray-900">
                      {formatCurrency(freight.freightCharges)}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`text-xs px-2 py-1 rounded ${paidStatusColors[freight.paidStatus]}`}>
                        {freight.paidStatus}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{freight.paymentReference || '—'}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {freight.paymentDate ? formatDate(freight.paymentDate) : '—'}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{freight.invoiceNumber || '—'}</td>
                    <td className="py-3 px-4 text-right">
                      {freight.paidStatus === 'To Pay' && (
                        <button className="px-3 py-1.5 bg-green-600 text-white text-xs rounded hover:bg-green-700 mr-2">
                          Record Payment
                        </button>
                      )}
                      <button className="p-1 text-gray-400 hover:text-blue-600 rounded">
                        <Eye className="size-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Content - Dispatch Schedule */}
      {activeTab === 'dispatch' && (
        <div className="space-y-4">
          {dispatchSchedules.map((dispatch) => (
            <div key={dispatch.id} className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-purple-50 rounded">
                    <Calendar className="size-5 text-purple-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-medium text-gray-900">{dispatch.id}</h3>
                      <span className="text-xs text-gray-400">|</span>
                      <span className="text-sm text-gray-600">{formatDate(dispatch.date)}</span>
                      <span className={`text-xs px-2 py-0.5 rounded ${dispatchStatusColors[dispatch.status]}`}>
                        {dispatch.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <p className="text-xs text-gray-500">Transporter</p>
                        <p className="text-sm font-medium">{dispatch.transporterAllocated}</p>
                        <p className="text-xs text-gray-500">{dispatch.transporterId}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">ETD</p>
                        <p className="text-sm font-medium">{dispatch.etd}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Vehicle Number</p>
                        <p className="text-sm font-mono">{dispatch.vehicleNumber}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Driver</p>
                        <p className="text-sm">{dispatch.driverName}</p>
                        <p className="text-xs text-gray-500">{dispatch.driverPhone}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500 mb-2">Orders to Dispatch</p>
                      <div className="bg-gray-50 rounded p-3">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-gray-200">
                              <th className="text-left py-1 text-xs text-gray-500">Order ID</th>
                              <th className="text-left py-1 text-xs text-gray-500">Customer</th>
                              <th className="text-right py-1 text-xs text-gray-500">Qty</th>
                              <th className="text-left py-1 text-xs text-gray-500">Destination</th>
                            </tr>
                          </thead>
                          <tbody>
                            {dispatch.orderDetails.map((order, idx) => (
                              <tr key={idx}>
                                <td className="py-1 font-mono">{order.orderId}</td>
                                <td className="py-1">{order.customer}</td>
                                <td className="py-1 text-right">{order.qty}</td>
                                <td className="py-1">{order.destination}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {dispatch.status === 'Scheduled' && (
                    <button className="px-3 py-1.5 bg-blue-600 text-white text-xs rounded hover:bg-blue-700">
                      Mark Dispatched
                    </button>
                  )}
                  <button className="p-2 text-gray-400 hover:text-blue-600 rounded">
                    <Printer className="size-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Content - Delivery Confirmation */}
      {activeTab === 'delivery' && (
        <div className="space-y-4">
          {deliveryConfirmations.map((delivery) => (
            <div key={delivery.shipmentId} className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded ${
                  delivery.deliveryStatus === 'Delivered' ? 'bg-green-50' :
                  delivery.deliveryStatus === 'Damaged' ? 'bg-red-50' : 'bg-orange-50'
                }`}>
                  <Package className={`size-5 ${
                    delivery.deliveryStatus === 'Delivered' ? 'text-green-500' :
                    delivery.deliveryStatus === 'Damaged' ? 'text-red-500' : 'text-orange-500'
                  }`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-medium text-gray-900">{delivery.shipmentId}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded ${deliveryStatusColors[delivery.deliveryStatus]}`}>
                      {delivery.deliveryStatus}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-xs text-gray-500">Delivery Date & Time</p>
                      <p className="text-sm">{formatDate(delivery.deliveryDate)} at {delivery.deliveryTime}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Received By</p>
                      <p className="text-sm">{delivery.receivedBy}</p>
                      <p className="text-xs text-gray-500">{delivery.receivedByDesignation}</p>
                    </div>
                  </div>

                  <div className="mb-3">
                    <p className="text-xs text-gray-500">Remarks</p>
                    <p className="text-sm text-gray-800">{delivery.remarks}</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">POD Document:</span>
                      {delivery.podUploaded ? (
                        <span className="text-sm text-green-600 flex items-center gap-1">
                          <CheckCircle className="size-3" />
                          {delivery.podDocument}
                        </span>
                      ) : (
                        <span className="text-sm text-yellow-600 flex items-center gap-1">
                          <AlertCircle className="size-3" />
                          Not uploaded
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {!delivery.podUploaded && (
                    <button className="px-3 py-1.5 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 flex items-center gap-1">
                      <Upload className="size-3" />
                      Upload POD
                    </button>
                  )}
                  <button className="p-2 text-gray-400 hover:text-blue-600 rounded">
                    <Eye className="size-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Content - Freight Cost */}
      {activeTab === 'cost' && (
        <div className="space-y-6">
          {/* Summary */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <p className="text-xs text-blue-600 mb-1">Billed to Customers</p>
              <p className="text-xl font-bold text-blue-700">
                {formatCurrency(freightCosts.filter(f => f.allocationType === 'Billed to Customer').reduce((sum, f) => sum + f.freightAmount, 0))}
              </p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <p className="text-xs text-orange-600 mb-1">Absorbed by Company</p>
              <p className="text-xl font-bold text-orange-700">
                {formatCurrency(freightCosts.filter(f => f.allocationType === 'Absorbed by Company').reduce((sum, f) => sum + f.freightAmount, 0))}
              </p>
            </div>
          </div>

          {/* Freight Cost Table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left py-3 px-4 text-xs text-gray-600">Order ID</th>
                    <th className="text-left py-3 px-4 text-xs text-gray-600">Customer</th>
                    <th className="text-right py-3 px-4 text-xs text-gray-600">Freight Amount</th>
                    <th className="text-left py-3 px-4 text-xs text-gray-600">Allocation Type</th>
                    <th className="text-left py-3 px-4 text-xs text-gray-600">Invoice Included</th>
                  </tr>
                </thead>
                <tbody>
                  {freightCosts.map((freight) => (
                    <tr key={freight.orderId} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm font-mono text-gray-800">{freight.orderId}</td>
                      <td className="py-3 px-4 text-sm text-gray-900">{freight.customerName}</td>
                      <td className="py-3 px-4 text-right text-sm font-semibold text-gray-900">
                        {formatCurrency(freight.freightAmount)}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`text-xs px-2 py-1 rounded ${allocationTypeColors[freight.allocationType]}`}>
                          {freight.allocationType}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {freight.invoiceIncluded ? (
                          <CheckCircle className="size-4 text-green-500" />
                        ) : (
                          <XCircle className="size-4 text-gray-400" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}