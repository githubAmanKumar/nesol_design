// src/app/pages/sales/SalesManagement.tsx
import { useState } from 'react';
import { 
  TrendingUp, Users, FileText, ShoppingCart, Truck, 
  RotateCcw, Target, Search, Filter, Download, Plus, 
  Eye, Send, CheckCircle, XCircle, Clock, Calendar,
  DollarSign, MoreVertical, ChevronDown, Phone, Mail,
  MapPin, Building2, Printer, CreditCard, AlertCircle
} from 'lucide-react';
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';

export default function SalesManagement() {
  const [activeTab, setActiveTab] = useState<'leads' | 'quotations' | 'orders' | 'performance'>('leads');
  const [selectedLead, setSelectedLead] = useState<string | null>(null);

  const leads = [
    {
      id: 'LEAD/2026/042',
      source: 'Website',
      name: 'ABC Motors Pvt Ltd',
      contactPerson: 'Rajiv Mehta',
      phone: '98765 43210',
      email: 'rajiv@abcmotors.com',
      productInterest: 'Automotive Battery 150AH',
      status: 'New',
      owner: 'Amit Singh',
      createdDate: '2026-04-15',
      lastContact: '2026-04-15',
      notes: 'Interested in bulk order for dealership',
    },
    {
      id: 'LEAD/2026/041',
      source: 'Referral',
      name: 'Green Energy Solutions',
      contactPerson: 'Priyanka Das',
      phone: '99876 54321',
      email: 'priyanka@greenenergy.com',
      productInterest: 'Solar Battery 40AH',
      status: 'Contacted',
      owner: 'Suresh Patel',
      createdDate: '2026-04-14',
      lastContact: '2026-04-16',
      notes: 'Follow-up scheduled for next week',
    },
    {
      id: 'LEAD/2026/040',
      source: 'Exhibition',
      name: 'Delhi E-Rickshaw Union',
      contactPerson: 'Ramesh Yadav',
      phone: '98999 88877',
      email: 'ramesh@delhierickshaw.com',
      productInterest: 'E-Rickshaw Battery 120AH',
      status: 'Qualified',
      owner: 'Amit Singh',
      createdDate: '2026-04-12',
      lastContact: '2026-04-17',
      notes: 'Quotation sent, awaiting response',
    },
    {
      id: 'LEAD/2026/039',
      source: 'Email Campaign',
      name: 'Sunrise Batteries',
      contactPerson: 'Vikram Seth',
      phone: '98777 66655',
      email: 'vikram@sunrisebatteries.com',
      productInterest: 'Inverter Battery 200AH',
      status: 'Qualified',
      owner: 'Suresh Patel',
      createdDate: '2026-04-10',
      lastContact: '2026-04-14',
      notes: 'Sample requested',
    },
    {
      id: 'LEAD/2026/038',
      source: 'Cold Call',
      name: 'Metro Auto Parts',
      contactPerson: 'Sanjay Gupta',
      phone: '97654 32109',
      email: 'sanjay@metroauto.com',
      productInterest: 'Automotive Battery 100AH',
      status: 'Lost',
      owner: 'Amit Singh',
      createdDate: '2026-04-05',
      lastContact: '2026-04-10',
      notes: 'Went with competitor due to pricing',
    },
  ];

  const quotations = [
    {
      id: 'QUOT/2026/056',
      leadId: 'LEAD/2026/040',
      customerId: 'CUST/045',
      customerName: 'Delhi E-Rickshaw Union',
      quotationDate: '2026-04-13',
      validityDate: '2026-05-13',
      lineItems: [
        { product: 'E-Rickshaw Battery 120AH', sku: 'NES-ERIK-120AH', qty: 50, rate: 9200, amount: 460000 },
      ],
      subtotal: 460000,
      gst: 82800,
      totalAmount: 542800,
      status: 'Sent',
      pdfGenerated: true,
    },
    {
      id: 'QUOT/2026/055',
      leadId: 'LEAD/2026/039',
      customerId: null,
      customerName: 'Sunrise Batteries',
      quotationDate: '2026-04-11',
      validityDate: '2026-05-11',
      lineItems: [
        { product: 'Inverter Battery 200AH', sku: 'NES-INV-200AH', qty: 25, rate: 13500, amount: 337500 },
      ],
      subtotal: 337500,
      gst: 60750,
      totalAmount: 398250,
      status: 'Draft',
      pdfGenerated: false,
    },
    {
      id: 'QUOT/2026/054',
      leadId: null,
      customerId: 'CUST/001',
      customerName: 'Delhi Batteries Pvt Ltd',
      quotationDate: '2026-04-08',
      validityDate: '2026-05-08',
      lineItems: [
        { product: 'Automotive Battery 150AH', sku: 'NES-AUTO-150AH', qty: 100, rate: 4100, amount: 410000 },
        { product: 'Automotive Battery 100AH', sku: 'NES-AUTO-100AH', qty: 75, rate: 3000, amount: 225000 },
      ],
      subtotal: 635000,
      gst: 114300,
      totalAmount: 749300,
      status: 'Accepted',
      pdfGenerated: true,
    },
    {
      id: 'QUOT/2026/053',
      leadId: null,
      customerId: 'CUST/032',
      customerName: 'Jaipur Auto Parts',
      quotationDate: '2026-04-05',
      validityDate: '2026-04-20',
      lineItems: [
        { product: 'Automotive Battery 150AH', sku: 'NES-AUTO-150AH', qty: 20, rate: 4200, amount: 84000 },
      ],
      subtotal: 84000,
      gst: 15120,
      totalAmount: 99120,
      status: 'Rejected',
      pdfGenerated: true,
    },
  ];

  const salesOrders = [
    {
      id: 'SO/2026/089',
      customerId: 'CUST/001',
      customerName: 'Delhi Batteries Pvt Ltd',
      orderDate: '2026-04-15',
      poReference: 'DBPL/PO/2026/045',
      lineItems: [
        { product: 'Automotive Battery 150AH', sku: 'NES-AUTO-150AH', qty: 50, rate: 4100, amount: 205000 },
        { product: 'Automotive Battery 100AH', sku: 'NES-AUTO-100AH', qty: 30, rate: 3000, amount: 90000 },
      ],
      totalValue: 295000,
      paymentTerms: '30 Days',
      expectedDelivery: '2026-04-25',
      status: 'Confirmed',
    },
    {
      id: 'SO/2026/088',
      customerId: 'CUST/015',
      customerName: 'Mumbai Auto Electricals',
      orderDate: '2026-04-14',
      poReference: 'MAE/PO/2026/112',
      lineItems: [
        { product: 'Inverter Battery 200AH', sku: 'NES-INV-200AH', qty: 15, rate: 13500, amount: 202500 },
      ],
      totalValue: 202500,
      paymentTerms: 'Advance',
      expectedDelivery: '2026-04-22',
      status: 'In Production',
    },
    {
      id: 'SO/2026/087',
      customerId: 'CUST/023',
      customerName: 'Chennai Battery House',
      orderDate: '2026-04-12',
      poReference: 'CBH/PO/2026/078',
      lineItems: [
        { product: 'E-Rickshaw Battery 120AH', sku: 'NES-ERIK-120AH', qty: 25, rate: 9200, amount: 230000 },
      ],
      totalValue: 230000,
      paymentTerms: '15 Days',
      expectedDelivery: '2026-04-20',
      status: 'Ready to Dispatch',
    },
    {
      id: 'SO/2026/086',
      customerId: 'CUST/008',
      customerName: 'Kolkata Power Solutions',
      orderDate: '2026-04-10',
      poReference: 'KPS/PO/2026/034',
      lineItems: [
        { product: 'Solar Battery 40AH', sku: 'NES-SOLAR-40AH', qty: 100, rate: 4500, amount: 450000 },
      ],
      totalValue: 450000,
      paymentTerms: '30 Days',
      expectedDelivery: '2026-04-18',
      status: 'Dispatched',
    },
    {
      id: 'SO/2026/085',
      customerId: 'CUST/052',
      customerName: 'Bangalore Motors',
      orderDate: '2026-04-05',
      poReference: 'BM/PO/2026/156',
      lineItems: [
        { product: 'Automotive Battery 150AH', sku: 'NES-AUTO-150AH', qty: 30, rate: 4200, amount: 126000 },
      ],
      totalValue: 126000,
      paymentTerms: '15 Days',
      expectedDelivery: '2026-04-12',
      status: 'Completed',
    },
  ];

  const dispatchOrders = [
    {
      id: 'DO/2026/042',
      salesOrderId: 'SO/2026/086',
      dispatchDate: '2026-04-16',
      vehicleNumber: 'WB 11C 4567',
      transporterName: 'VRL Logistics',
      lrNumber: 'VRL/2026/04567',
      dispatchedQty: 100,
      status: 'In Transit',
    },
    {
      id: 'DO/2026/041',
      salesOrderId: 'SO/2026/085',
      dispatchDate: '2026-04-10',
      vehicleNumber: 'KA 05H 2345',
      transporterName: 'Gati Transport',
      lrNumber: 'GATI/2026/12345',
      dispatchedQty: 30,
      status: 'Delivered',
    },
  ];

  const salesReturns = [
    {
      id: 'SR/2026/008',
      originalInvoiceId: 'NES/24-25/089',
      customerId: 'CUST/001',
      customerName: 'Delhi Batteries Pvt Ltd',
      returnDate: '2026-04-14',
      returnReason: 'Damaged',
      returnedQty: 3,
      creditNoteGenerated: true,
      creditNoteAmount: 14868,
    },
  ];

  const salesPerformance = [
    {
      repId: 'NES/EMP/003',
      repName: 'Amit Singh',
      monthYear: 'April 2026',
      targetValue: 2500000,
      actualValue: 1850000,
      targetUnits: 600,
      actualUnits: 440,
      achievementPercent: 74,
    },
    {
      repId: 'NES/EMP/018',
      repName: 'Suresh Patel',
      monthYear: 'April 2026',
      targetValue: 2000000,
      actualValue: 1620000,
      targetUnits: 480,
      actualUnits: 390,
      achievementPercent: 81,
    },
  ];

  const stats = {
    totalLeads: leads.filter(l => l.status !== 'Lost').length,
    activeQuotations: quotations.filter(q => q.status === 'Sent').length,
    pendingOrders: salesOrders.filter(o => o.status === 'Confirmed' || o.status === 'In Production').length,
    monthlyRevenue: salesOrders
      .filter(o => o.status === 'Completed' || o.status === 'Dispatched')
      .reduce((sum, o) => sum + o.totalValue, 0),
  };

  const sourceColors: Record<string, string> = {
    'Website': 'bg-blue-100 text-blue-700',
    'Referral': 'bg-green-100 text-green-700',
    'Exhibition': 'bg-purple-100 text-purple-700',
    'Email Campaign': 'bg-orange-100 text-orange-700',
    'Cold Call': 'bg-gray-100 text-gray-700',
  };

  const leadStatusColors: Record<string, string> = {
    'New': 'bg-blue-100 text-blue-700',
    'Contacted': 'bg-yellow-100 text-yellow-700',
    'Qualified': 'bg-green-100 text-green-700',
    'Lost': 'bg-red-100 text-red-700',
  };

  const quotationStatusColors: Record<string, string> = {
    'Draft': 'bg-gray-100 text-gray-700',
    'Sent': 'bg-blue-100 text-blue-700',
    'Accepted': 'bg-green-100 text-green-700',
    'Rejected': 'bg-red-100 text-red-700',
  };

  const orderStatusColors: Record<string, string> = {
    'Confirmed': 'bg-blue-100 text-blue-700',
    'In Production': 'bg-yellow-100 text-yellow-700',
    'Ready to Dispatch': 'bg-purple-100 text-purple-700',
    'Dispatched': 'bg-orange-100 text-orange-700',
    'Completed': 'bg-green-100 text-green-700',
    'Cancelled': 'bg-red-100 text-red-700',
  };

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-gray-900">Sales Management</h1>
          <p className="text-sm text-gray-600">Manage leads, quotations, and sales orders</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download className="size-4" />
            Export
          </button>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            <Plus className="size-4" />
            New Lead
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <Users className="size-4 text-blue-500" />
            <p className="text-xs text-gray-600">Active Leads</p>
          </div>
          <p className="text-xl font-bold text-gray-900">{stats.totalLeads}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="size-4 text-purple-500" />
            <p className="text-xs text-gray-600">Active Quotations</p>
          </div>
          <p className="text-xl font-bold text-gray-900">{stats.activeQuotations}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <ShoppingCart className="size-4 text-orange-500" />
            <p className="text-xs text-gray-600">Pending Orders</p>
          </div>
          <p className="text-xl font-bold text-gray-900">{stats.pendingOrders}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="size-4 text-green-500" />
            <p className="text-xs text-gray-600">Revenue (MTD)</p>
          </div>
          <p className="text-xl font-bold text-gray-900">{formatCurrency(stats.monthlyRevenue)}</p>
        </div>
      </div>

      {/* View Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex gap-6 overflow-x-auto">
          {(['leads', 'quotations', 'orders', 'performance'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab === 'leads' ? 'Lead Management' : 
               tab === 'quotations' ? 'Quotations' : 
               tab === 'orders' ? 'Sales Orders' : 'Sales Performance'}
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
          <option>All Sources</option>
          <option>Website</option>
          <option>Referral</option>
          <option>Exhibition</option>
          <option>Email Campaign</option>
          <option>Cold Call</option>
        </select>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
          <Filter className="size-4" />
          Filter
        </button>
      </div>

      {/* Content - Leads */}
      {activeTab === 'leads' && (
        <div className="space-y-4">
          {leads.map((lead) => (
            <div key={lead.id} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-sm transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-blue-50 rounded">
                    <Users className="size-5 text-blue-500" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-medium text-gray-900">{lead.name}</h3>
                      <span className="text-xs text-gray-400">|</span>
                      <span className="text-sm text-gray-600">{lead.id}</span>
                      <span className={`text-xs px-2 py-0.5 rounded ${leadStatusColors[lead.status]}`}>
                        {lead.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                      <span className="flex items-center gap-1">
                        <Users className="size-3" />
                        {lead.contactPerson}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="size-3" />
                        {lead.phone}
                      </span>
                      <span className="flex items-center gap-1">
                        <Mail className="size-3" />
                        {lead.email}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm mb-2">
                      <span className={`text-xs px-2 py-0.5 rounded ${sourceColors[lead.source]}`}>
                        {lead.source}
                      </span>
                      <span className="text-gray-600">
                        Product Interest: <span className="font-medium">{lead.productInterest}</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>Owner: {lead.owner}</span>
                      <span>Created: {new Date(lead.createdDate).toLocaleDateString('en-IN')}</span>
                      <span>Last Contact: {new Date(lead.lastContact).toLocaleDateString('en-IN')}</span>
                    </div>
                    {lead.notes && (
                      <p className="text-sm text-gray-600 mt-2 p-2 bg-gray-50 rounded">
                        📝 {lead.notes}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {lead.status !== 'Lost' && (
                    <>
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded" title="Create Quotation">
                        <FileText className="size-4" />
                      </button>
                      <button className="p-2 text-green-600 hover:bg-green-50 rounded" title="Contact">
                        <Phone className="size-4" />
                      </button>
                    </>
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

      {/* Content - Quotations */}
      {activeTab === 'quotations' && (
        <div className="space-y-4">
          {quotations.map((quote) => (
            <div key={quote.id} className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-purple-50 rounded">
                    <FileText className="size-5 text-purple-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-medium text-gray-900">{quote.id}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded ${quotationStatusColors[quote.status]}`}>
                        {quote.status}
                      </span>
                      {quote.pdfGenerated && (
                        <span className="text-xs text-green-600 flex items-center gap-1">
                          <CheckCircle className="size-3" />
                          PDF Generated
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                      <span>Customer: {quote.customerName}</span>
                      <span>•</span>
                      <span>Date: {new Date(quote.quotationDate).toLocaleDateString('en-IN')}</span>
                      <span>•</span>
                      <span>Valid Until: {new Date(quote.validityDate).toLocaleDateString('en-IN')}</span>
                    </div>
                    
                    {/* Line Items */}
                    <div className="mt-2 bg-gray-50 rounded p-3">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-1 text-xs text-gray-500">Product</th>
                            <th className="text-left py-1 text-xs text-gray-500">SKU</th>
                            <th className="text-right py-1 text-xs text-gray-500">Qty</th>
                            <th className="text-right py-1 text-xs text-gray-500">Rate</th>
                            <th className="text-right py-1 text-xs text-gray-500">Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {quote.lineItems.map((item, idx) => (
                            <tr key={idx}>
                              <td className="py-1">{item.product}</td>
                              <td className="py-1 text-gray-600">{item.sku}</td>
                              <td className="py-1 text-right">{item.qty}</td>
                              <td className="py-1 text-right">{formatCurrency(item.rate)}</td>
                              <td className="py-1 text-right font-medium">{formatCurrency(item.amount)}</td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr className="border-t border-gray-200">
                            <td colSpan={4} className="pt-2 text-right text-xs text-gray-500">Subtotal:</td>
                            <td className="pt-2 text-right font-medium">{formatCurrency(quote.subtotal)}</td>
                          </tr>
                          <tr>
                            <td colSpan={4} className="text-right text-xs text-gray-500">GST (18%):</td>
                            <td className="text-right font-medium">{formatCurrency(quote.gst)}</td>
                          </tr>
                          <tr>
                            <td colSpan={4} className="text-right text-sm font-medium">Total:</td>
                            <td className="text-right font-bold text-blue-600">{formatCurrency(quote.totalAmount)}</td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {quote.status === 'Draft' && (
                    <button className="px-3 py-1.5 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 flex items-center gap-1">
                      <Send className="size-3" />
                      Send
                    </button>
                  )}
                  {quote.status === 'Sent' && (
                    <button className="px-3 py-1.5 bg-green-600 text-white text-xs rounded hover:bg-green-700">
                      Convert to Order
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

      {/* Content - Sales Orders */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          {/* Sales Orders List */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">Sales Orders</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left py-3 px-4 text-xs text-gray-600">Order ID</th>
                    <th className="text-left py-3 px-4 text-xs text-gray-600">Customer</th>
                    <th className="text-left py-3 px-4 text-xs text-gray-600">PO Reference</th>
                    <th className="text-left py-3 px-4 text-xs text-gray-600">Order Date</th>
                    <th className="text-right py-3 px-4 text-xs text-gray-600">Total Value</th>
                    <th className="text-left py-3 px-4 text-xs text-gray-600">Payment Terms</th>
                    <th className="text-left py-3 px-4 text-xs text-gray-600">Expected Delivery</th>
                    <th className="text-left py-3 px-4 text-xs text-gray-600">Status</th>
                    <th className="text-right py-3 px-4 text-xs text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {salesOrders.map((order) => (
                    <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <span className="text-sm font-mono text-gray-800">{order.id}</span>
                      </td>
                      <td className="py-3 px-4">
                        <p className="text-sm font-medium text-gray-900">{order.customerName}</p>
                        <p className="text-xs text-gray-500">{order.customerId}</p>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">{order.poReference}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {new Date(order.orderDate).toLocaleDateString('en-IN')}
                      </td>
                      <td className="py-3 px-4 text-right text-sm font-semibold text-gray-900">
                        {formatCurrency(order.totalValue)}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">{order.paymentTerms}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {new Date(order.expectedDelivery).toLocaleDateString('en-IN')}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`text-xs px-2 py-1 rounded ${orderStatusColors[order.status]}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded">
                            <Eye className="size-4" />
                          </button>
                          {order.status === 'Ready to Dispatch' && (
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
          </div>

          {/* Dispatch Orders */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">Recent Dispatches</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left py-3 px-4 text-xs text-gray-600">Dispatch ID</th>
                    <th className="text-left py-3 px-4 text-xs text-gray-600">Sales Order</th>
                    <th className="text-left py-3 px-4 text-xs text-gray-600">Dispatch Date</th>
                    <th className="text-left py-3 px-4 text-xs text-gray-600">Vehicle Number</th>
                    <th className="text-left py-3 px-4 text-xs text-gray-600">Transporter</th>
                    <th className="text-left py-3 px-4 text-xs text-gray-600">LR Number</th>
                    <th className="text-right py-3 px-4 text-xs text-gray-600">Quantity</th>
                    <th className="text-left py-3 px-4 text-xs text-gray-600">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {dispatchOrders.map((dispatch) => (
                    <tr key={dispatch.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm font-mono text-gray-800">{dispatch.id}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{dispatch.salesOrderId}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {new Date(dispatch.dispatchDate).toLocaleDateString('en-IN')}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">{dispatch.vehicleNumber}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{dispatch.transporterName}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{dispatch.lrNumber}</td>
                      <td className="py-3 px-4 text-right text-sm text-gray-900">{dispatch.dispatchedQty}</td>
                      <td className="py-3 px-4">
                        <span className={`text-xs px-2 py-1 rounded ${
                          dispatch.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {dispatch.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Sales Returns */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">Sales Returns</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left py-3 px-4 text-xs text-gray-600">Return ID</th>
                    <th className="text-left py-3 px-4 text-xs text-gray-600">Invoice ID</th>
                    <th className="text-left py-3 px-4 text-xs text-gray-600">Customer</th>
                    <th className="text-left py-3 px-4 text-xs text-gray-600">Return Date</th>
                    <th className="text-left py-3 px-4 text-xs text-gray-600">Reason</th>
                    <th className="text-right py-3 px-4 text-xs text-gray-600">Quantity</th>
                    <th className="text-left py-3 px-4 text-xs text-gray-600">Credit Note</th>
                    <th className="text-right py-3 px-4 text-xs text-gray-600">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {salesReturns.map((ret) => (
                    <tr key={ret.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm font-mono text-gray-800">{ret.id}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{ret.originalInvoiceId}</td>
                      <td className="py-3 px-4 text-sm text-gray-900">{ret.customerName}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {new Date(ret.returnDate).toLocaleDateString('en-IN')}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">{ret.returnReason}</td>
                      <td className="py-3 px-4 text-right text-sm text-gray-900">{ret.returnedQty}</td>
                      <td className="py-3 px-4">
                        {ret.creditNoteGenerated ? (
                          <CheckCircle className="size-4 text-green-600" />
                        ) : (
                          <XCircle className="size-4 text-gray-400" />
                        )}
                      </td>
                      <td className="py-3 px-4 text-right text-sm font-medium text-gray-900">
                        {formatCurrency(ret.creditNoteAmount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Content - Sales Performance */}
      {activeTab === 'performance' && (
        <div className="space-y-6">
          {/* Performance Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {salesPerformance.map((perf) => (
              <div key={perf.repId} className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">{perf.repName}</h3>
                    <p className="text-xs text-gray-500">{perf.repId} • {perf.monthYear}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Achievement</p>
                    <p className={`text-2xl font-bold ${
                      perf.achievementPercent >= 100 ? 'text-green-600' : 'text-orange-600'
                    }`}>
                      {perf.achievementPercent}%
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {/* Value Target */}
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Value Target</span>
                      <span className="font-medium">
                        {formatCurrency(perf.actualValue)} / {formatCurrency(perf.targetValue)}
                      </span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${Math.min((perf.actualValue / perf.targetValue) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                  
                  {/* Unit Target */}
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Unit Target</span>
                      <span className="font-medium">
                        {perf.actualUnits} / {perf.targetUnits} units
                      </span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${Math.min((perf.actualUnits / perf.targetUnits) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Performance Chart */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Monthly Sales Performance Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={[
                { month: 'Jan', 'Amit Singh': 82, 'Suresh Patel': 75 },
                { month: 'Feb', 'Amit Singh': 78, 'Suresh Patel': 80 },
                { month: 'Mar', 'Amit Singh': 85, 'Suresh Patel': 78 },
                { month: 'Apr', 'Amit Singh': 74, 'Suresh Patel': 81 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip formatter={(value: number) => [`${value}%`, 'Achievement']} />
                <Legend />
                <Line type="monotone" dataKey="Amit Singh" stroke="#3b82f6" strokeWidth={2} />
                <Line type="monotone" dataKey="Suresh Patel" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}