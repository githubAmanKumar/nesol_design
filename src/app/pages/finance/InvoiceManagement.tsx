// src/app/pages/finance/InvoiceManagement.tsx
import { useState } from 'react';
import { 
  FileText, Search, Filter, Download, Plus, Eye, Send,
  CheckCircle, XCircle, Clock, Calendar, DollarSign,
  MoreVertical, Printer, Mail, QrCode, AlertCircle,
  ChevronDown, TrendingUp, CreditCard, Ban
} from 'lucide-react';

export default function InvoiceManagement() {
  const [activeTab, setActiveTab] = useState<'invoices' | 'aging' | 'einvoice'>('invoices');
  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([]);
  const [showEmailModal, setShowEmailModal] = useState(false);

  const invoices = [
    {
      id: 'NES/24-25/089',
      type: 'Tax Invoice',
      invoiceDate: '2026-04-15',
      customerId: 'CUST/001',
      customerName: 'Delhi Batteries Pvt Ltd',
      customerGstin: '07AABCD1234E1Z5',
      placeOfSupply: 'Delhi',
      lineItems: [
        { description: 'Automotive Battery 150AH', hsn: '85071000', qty: 50, unitPrice: 4200, discount: 5 },
        { description: 'Automotive Battery 100AH', hsn: '85071000', qty: 30, unitPrice: 3100, discount: 5 },
      ],
      taxableValue: 376350,
      cgstRate: 9,
      cgstAmount: 33871.5,
      sgstRate: 9,
      sgstAmount: 33871.5,
      igstRate: 0,
      igstAmount: 0,
      cess: 0,
      totalValue: 444093,
      status: 'Issued',
      dueDate: '2026-05-15',
      irnNumber: '7a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p',
      einvoiceGenerated: true,
      paymentStatus: 'Pending',
      outstandingAmount: 444093,
    },
    {
      id: 'NES/24-25/088',
      type: 'Tax Invoice',
      invoiceDate: '2026-04-14',
      customerId: 'CUST/015',
      customerName: 'Mumbai Auto Electricals',
      customerGstin: '27BBBCD5678F2G6',
      placeOfSupply: 'Maharashtra',
      lineItems: [
        { description: 'Inverter Battery 200AH', hsn: '85072000', qty: 15, unitPrice: 13500, discount: 10 },
      ],
      taxableValue: 182250,
      cgstRate: 0,
      cgstAmount: 0,
      sgstRate: 0,
      sgstAmount: 0,
      igstRate: 18,
      igstAmount: 32805,
      cess: 0,
      totalValue: 215055,
      status: 'Paid',
      dueDate: '2026-05-14',
      irnNumber: '8b2c3d4e5f6g7h8i9j0k1l2m3n4o5q6',
      einvoiceGenerated: true,
      paymentStatus: 'Paid',
      outstandingAmount: 0,
      paidDate: '2026-04-18',
      paymentRef: 'NEFT/HDFC/20260418/1234',
    },
    {
      id: 'NES/24-25/087',
      type: 'Tax Invoice',
      invoiceDate: '2026-04-12',
      customerId: 'CUST/023',
      customerName: 'Chennai Battery House',
      customerGstin: '33CCCDD9012H3J7',
      placeOfSupply: 'Tamil Nadu',
      lineItems: [
        { description: 'E-Rickshaw Battery 120AH', hsn: '85072000', qty: 25, unitPrice: 9200, discount: 8 },
      ],
      taxableValue: 211600,
      cgstRate: 0,
      cgstAmount: 0,
      sgstRate: 0,
      sgstAmount: 0,
      igstRate: 18,
      igstAmount: 38088,
      cess: 0,
      totalValue: 249688,
      status: 'Issued',
      dueDate: '2026-05-12',
      irnNumber: null,
      einvoiceGenerated: false,
      paymentStatus: 'Pending',
      outstandingAmount: 249688,
    },
    {
      id: 'NES/24-25/086',
      type: 'Credit Note',
      invoiceDate: '2026-04-10',
      customerId: 'CUST/001',
      customerName: 'Delhi Batteries Pvt Ltd',
      customerGstin: '07AABCD1234E1Z5',
      placeOfSupply: 'Delhi',
      lineItems: [
        { description: 'Return - Damaged Battery 150AH', hsn: '85071000', qty: 3, unitPrice: 4200, discount: 0 },
      ],
      taxableValue: 12600,
      cgstRate: 9,
      cgstAmount: 1134,
      sgstRate: 9,
      sgstAmount: 1134,
      igstRate: 0,
      igstAmount: 0,
      cess: 0,
      totalValue: 14868,
      status: 'Issued',
      dueDate: null,
      irnNumber: '9c3d4e5f6g7h8i9j0k1l2m3n4o5q6r7',
      einvoiceGenerated: true,
      paymentStatus: 'Adjusted',
      outstandingAmount: 0,
      adjustedAgainst: 'NES/24-25/089',
    },
    {
      id: 'NES/24-25/085',
      type: 'Proforma Invoice',
      invoiceDate: '2026-04-08',
      customerId: 'CUST/045',
      customerName: 'Kolkata Power Solutions',
      customerGstin: '19DDDEE3456K4L8',
      placeOfSupply: 'West Bengal',
      lineItems: [
        { description: 'Solar Battery 40AH', hsn: '85072000', qty: 100, unitPrice: 4500, discount: 12 },
      ],
      taxableValue: 396000,
      cgstRate: 0,
      cgstAmount: 0,
      sgstRate: 0,
      sgstAmount: 0,
      igstRate: 18,
      igstAmount: 71280,
      cess: 0,
      totalValue: 467280,
      status: 'Draft',
      dueDate: null,
      irnNumber: null,
      einvoiceGenerated: false,
      paymentStatus: 'Not Applicable',
      outstandingAmount: 467280,
    },
    {
      id: 'NES/24-25/084',
      type: 'Tax Invoice',
      invoiceDate: '2026-04-05',
      customerId: 'CUST/032',
      customerName: 'Jaipur Auto Parts',
      customerGstin: '08EEEFF4567L5M9',
      placeOfSupply: 'Rajasthan',
      lineItems: [
        { description: 'Automotive Battery 150AH', hsn: '85071000', qty: 20, unitPrice: 4200, discount: 5 },
      ],
      taxableValue: 79800,
      cgstRate: 0,
      cgstAmount: 0,
      sgstRate: 0,
      sgstAmount: 0,
      igstRate: 18,
      igstAmount: 14364,
      cess: 0,
      totalValue: 94164,
      status: 'Cancelled',
      dueDate: '2026-05-05',
      irnNumber: null,
      einvoiceGenerated: false,
      paymentStatus: 'Cancelled',
      outstandingAmount: 0,
      cancellationReason: 'Customer order cancelled',
    },
  ];

  const agingReport = [
    {
      customerName: 'Delhi Batteries Pvt Ltd',
      invoiceNumber: 'NES/24-25/089',
      invoiceDate: '2026-04-15',
      dueDate: '2026-05-15',
      outstandingAmount: 444093,
      agingBucket: '0-30 Days',
    },
    {
      customerName: 'Chennai Battery House',
      invoiceNumber: 'NES/24-25/087',
      invoiceDate: '2026-04-12',
      dueDate: '2026-05-12',
      outstandingAmount: 249688,
      agingBucket: '0-30 Days',
    },
    {
      customerName: 'Bangalore Motors',
      invoiceNumber: 'NES/24-25/078',
      invoiceDate: '2026-03-20',
      dueDate: '2026-04-19',
      outstandingAmount: 185000,
      agingBucket: '0-30 Days',
    },
    {
      customerName: 'Hyderabad Batteries',
      invoiceNumber: 'NES/24-25/072',
      invoiceDate: '2026-03-05',
      dueDate: '2026-04-04',
      outstandingAmount: 321500,
      agingBucket: '31-60 Days',
    },
    {
      customerName: 'Ahmedabad Auto Store',
      invoiceNumber: 'NES/24-25/065',
      invoiceDate: '2026-02-15',
      dueDate: '2026-03-17',
      outstandingAmount: 156800,
      agingBucket: '31-60 Days',
    },
    {
      customerName: 'Pune Electricals',
      invoiceNumber: 'NES/24-25/058',
      invoiceDate: '2026-01-25',
      dueDate: '2026-02-24',
      outstandingAmount: 89200,
      agingBucket: '61-90 Days',
    },
    {
      customerName: 'Lucknow Battery World',
      invoiceNumber: 'NES/24-25/045',
      invoiceDate: '2025-12-10',
      dueDate: '2026-01-09',
      outstandingAmount: 45000,
      agingBucket: '90+ Days',
    },
  ];

  const einvoices = [
    {
      id: 'NES/24-25/089',
      irnNumber: '7a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p',
      ackNo: '112345678901234',
      ackDate: '2026-04-15',
      qrCode: true,
      xmlGenerated: true,
      jsonAvailable: true,
      status: 'Active',
    },
    {
      id: 'NES/24-25/088',
      irnNumber: '8b2c3d4e5f6g7h8i9j0k1l2m3n4o5q6',
      ackNo: '112345678901235',
      ackDate: '2026-04-14',
      qrCode: true,
      xmlGenerated: true,
      jsonAvailable: true,
      status: 'Active',
    },
    {
      id: 'NES/24-25/086',
      irnNumber: '9c3d4e5f6g7h8i9j0k1l2m3n4o5q6r7',
      ackNo: '112345678901236',
      ackDate: '2026-04-10',
      qrCode: true,
      xmlGenerated: true,
      jsonAvailable: true,
      status: 'Active',
    },
  ];

  const stats = {
    totalInvoicesThisMonth: invoices.filter(i => i.invoiceDate.startsWith('2026-04') && i.type === 'Tax Invoice').length,
    totalValueThisMonth: invoices
      .filter(i => i.invoiceDate.startsWith('2026-04') && i.type === 'Tax Invoice' && i.status !== 'Cancelled')
      .reduce((sum, i) => sum + i.totalValue, 0),
    pendingPayments: invoices.filter(i => i.paymentStatus === 'Pending').length,
    totalOutstanding: invoices
      .filter(i => i.paymentStatus === 'Pending')
      .reduce((sum, i) => sum + i.outstandingAmount, 0),
    overdueInvoices: agingReport.filter(a => a.agingBucket !== '0-30 Days').length,
  };

  const statusColors: Record<string, string> = {
    'Draft': 'bg-gray-100 text-gray-700',
    'Issued': 'bg-blue-100 text-blue-700',
    'Paid': 'bg-green-100 text-green-700',
    'Cancelled': 'bg-red-100 text-red-700',
  };

  const paymentStatusColors: Record<string, string> = {
    'Pending': 'bg-yellow-100 text-yellow-700',
    'Paid': 'bg-green-100 text-green-700',
    'Adjusted': 'bg-purple-100 text-purple-700',
    'Cancelled': 'bg-red-100 text-red-700',
    'Not Applicable': 'bg-gray-100 text-gray-700',
  };

  const agingColors: Record<string, string> = {
    '0-30 Days': 'bg-green-100 text-green-700',
    '31-60 Days': 'bg-yellow-100 text-yellow-700',
    '61-90 Days': 'bg-orange-100 text-orange-700',
    '90+ Days': 'bg-red-100 text-red-700',
  };

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-gray-900">Invoice Management</h1>
          <p className="text-sm text-gray-600">Generate and manage GST-compliant invoices</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download className="size-4" />
            Export
          </button>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            <Plus className="size-4" />
            New Invoice
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="size-4 text-blue-500" />
            <p className="text-xs text-gray-600">Invoices (MTD)</p>
          </div>
          <p className="text-xl font-bold text-gray-900">{stats.totalInvoicesThisMonth}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="size-4 text-green-500" />
            <p className="text-xs text-gray-600">Invoice Value (MTD)</p>
          </div>
          <p className="text-xl font-bold text-gray-900">{formatCurrency(stats.totalValueThisMonth)}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="size-4 text-yellow-500" />
            <p className="text-xs text-gray-600">Pending Payments</p>
          </div>
          <p className="text-xl font-bold text-gray-900">{stats.pendingPayments}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <CreditCard className="size-4 text-purple-500" />
            <p className="text-xs text-gray-600">Outstanding Amount</p>
          </div>
          <p className="text-xl font-bold text-gray-900">{formatCurrency(stats.totalOutstanding)}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="size-4 text-red-500" />
            <p className="text-xs text-gray-600">Overdue Invoices</p>
          </div>
          <p className="text-xl font-bold text-gray-900">{stats.overdueInvoices}</p>
        </div>
      </div>

      {/* View Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex gap-6">
          {(['invoices', 'aging', 'einvoice'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab === 'invoices' ? 'All Invoices' : tab === 'aging' ? 'Aging Report' : 'E-Invoice Status'}
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
            placeholder="Search by invoice number, customer name, or GSTIN..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select className="px-4 py-2 border border-gray-300 rounded-lg">
          <option>All Types</option>
          <option>Tax Invoice</option>
          <option>Proforma Invoice</option>
          <option>Credit Note</option>
          <option>Debit Note</option>
        </select>
        <select className="px-4 py-2 border border-gray-300 rounded-lg">
          <option>All Status</option>
          <option>Draft</option>
          <option>Issued</option>
          <option>Paid</option>
          <option>Cancelled</option>
        </select>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
          <Filter className="size-4" />
          More Filters
        </button>
      </div>

      {/* Bulk Actions */}
      {activeTab === 'invoices' && selectedInvoices.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-center justify-between">
          <span className="text-sm text-blue-700">
            {selectedInvoices.length} invoice(s) selected
          </span>
          <div className="flex items-center gap-2">
            <button 
              className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
              onClick={() => setShowEmailModal(true)}
            >
              <Mail className="size-4" />
              Bulk Email
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 text-sm rounded hover:bg-gray-50">
              <Download className="size-4" />
              Export PDF
            </button>
          </div>
        </div>
      )}

      {/* Content - All Invoices */}
      {activeTab === 'invoices' && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-3 px-4 text-xs text-gray-600">
                    <input 
                      type="checkbox" 
                      className="rounded border-gray-300"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedInvoices(invoices.filter(i => i.type === 'Tax Invoice').map(i => i.id));
                        } else {
                          setSelectedInvoices([]);
                        }
                      }}
                    />
                  </th>
                  <th className="text-left py-3 px-4 text-xs text-gray-600">Invoice No.</th>
                  <th className="text-left py-3 px-4 text-xs text-gray-600">Type</th>
                  <th className="text-left py-3 px-4 text-xs text-gray-600">Date</th>
                  <th className="text-left py-3 px-4 text-xs text-gray-600">Customer</th>
                  <th className="text-left py-3 px-4 text-xs text-gray-600">GSTIN</th>
                  <th className="text-right py-3 px-4 text-xs text-gray-600">Taxable Value</th>
                  <th className="text-right py-3 px-4 text-xs text-gray-600">GST</th>
                  <th className="text-right py-3 px-4 text-xs text-gray-600">Total</th>
                  <th className="text-left py-3 px-4 text-xs text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 text-xs text-gray-600">Payment</th>
                  <th className="text-right py-3 px-4 text-xs text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => {
                  const gstAmount = invoice.cgstAmount + invoice.sgstAmount + invoice.igstAmount;
                  return (
                    <tr key={invoice.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <input 
                          type="checkbox" 
                          className="rounded border-gray-300"
                          checked={selectedInvoices.includes(invoice.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedInvoices([...selectedInvoices, invoice.id]);
                            } else {
                              setSelectedInvoices(selectedInvoices.filter(id => id !== invoice.id));
                            }
                          }}
                        />
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm font-mono text-gray-800">{invoice.id}</span>
                        {invoice.einvoiceGenerated && (
                          <QrCode className="size-3 text-green-600 inline ml-1" />
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`text-xs px-2 py-1 rounded ${
                          invoice.type === 'Tax Invoice' ? 'bg-blue-100 text-blue-700' :
                          invoice.type === 'Credit Note' ? 'bg-orange-100 text-orange-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {invoice.type}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {new Date(invoice.invoiceDate).toLocaleDateString('en-IN')}
                      </td>
                      <td className="py-3 px-4">
                        <p className="text-sm font-medium text-gray-900">{invoice.customerName}</p>
                        <p className="text-xs text-gray-500">{invoice.customerId}</p>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600 font-mono">{invoice.customerGstin}</td>
                      <td className="py-3 px-4 text-right text-sm text-gray-900">
                        {formatCurrency(invoice.taxableValue)}
                      </td>
                      <td className="py-3 px-4 text-right text-sm text-gray-600">
                        {formatCurrency(gstAmount)}
                      </td>
                      <td className="py-3 px-4 text-right text-sm font-semibold text-gray-900">
                        {formatCurrency(invoice.totalValue)}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`text-xs px-2 py-1 rounded ${statusColors[invoice.status]}`}>
                          {invoice.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`text-xs px-2 py-1 rounded ${paymentStatusColors[invoice.paymentStatus]}`}>
                          {invoice.paymentStatus}
                          {invoice.outstandingAmount > 0 && (
                            <span className="block text-xs text-gray-500 mt-0.5">
                              Due: {formatCurrency(invoice.outstandingAmount)}
                            </span>
                          )}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded" title="View">
                            <Eye className="size-4" />
                          </button>
                          <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded" title="Print">
                            <Printer className="size-4" />
                          </button>
                          {invoice.status === 'Issued' && (
                            <button className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded" title="Send Email">
                              <Mail className="size-4" />
                            </button>
                          )}
                          <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded">
                            <MoreVertical className="size-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Content - Aging Report */}
      {activeTab === 'aging' && (
        <div className="space-y-4">
          {/* Summary Cards */}
          <div className="grid grid-cols-4 gap-4">
            {[
              { bucket: '0-30 Days', color: 'green', amount: agingReport.filter(a => a.agingBucket === '0-30 Days').reduce((s, a) => s + a.outstandingAmount, 0) },
              { bucket: '31-60 Days', color: 'yellow', amount: agingReport.filter(a => a.agingBucket === '31-60 Days').reduce((s, a) => s + a.outstandingAmount, 0) },
              { bucket: '61-90 Days', color: 'orange', amount: agingReport.filter(a => a.agingBucket === '61-90 Days').reduce((s, a) => s + a.outstandingAmount, 0) },
              { bucket: '90+ Days', color: 'red', amount: agingReport.filter(a => a.agingBucket === '90+ Days').reduce((s, a) => s + a.outstandingAmount, 0) },
            ].map((item) => (
              <div key={item.bucket} className={`bg-${item.color}-50 border border-${item.color}-200 rounded-lg p-4`}>
                <p className={`text-sm text-${item.color}-700 mb-1`}>{item.bucket}</p>
                <p className={`text-xl font-bold text-${item.color}-800`}>{formatCurrency(item.amount)}</p>
                <p className={`text-xs text-${item.color}-600 mt-1`}>
                  {agingReport.filter(a => a.agingBucket === item.bucket).length} invoices
                </p>
              </div>
            ))}
          </div>

          {/* Aging Table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left py-3 px-4 text-xs text-gray-600">Customer</th>
                    <th className="text-left py-3 px-4 text-xs text-gray-600">Invoice No.</th>
                    <th className="text-left py-3 px-4 text-xs text-gray-600">Invoice Date</th>
                    <th className="text-left py-3 px-4 text-xs text-gray-600">Due Date</th>
                    <th className="text-right py-3 px-4 text-xs text-gray-600">Outstanding Amount</th>
                    <th className="text-left py-3 px-4 text-xs text-gray-600">Aging Bucket</th>
                    <th className="text-right py-3 px-4 text-xs text-gray-600">Days Overdue</th>
                    <th className="text-right py-3 px-4 text-xs text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {agingReport.map((item) => {
                    const dueDate = new Date(item.dueDate);
                    const today = new Date('2026-04-20');
                    const daysOverdue = Math.max(0, Math.floor((today.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24)));
                    
                    return (
                      <tr key={item.invoiceNumber} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm font-medium text-gray-900">{item.customerName}</td>
                        <td className="py-3 px-4 text-sm font-mono text-gray-800">{item.invoiceNumber}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {new Date(item.invoiceDate).toLocaleDateString('en-IN')}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {new Date(item.dueDate).toLocaleDateString('en-IN')}
                        </td>
                        <td className="py-3 px-4 text-right text-sm font-semibold text-gray-900">
                          {formatCurrency(item.outstandingAmount)}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`text-xs px-2 py-1 rounded ${agingColors[item.agingBucket]}`}>
                            {item.agingBucket}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <span className={`text-sm font-medium ${
                            daysOverdue > 60 ? 'text-red-600' : 
                            daysOverdue > 30 ? 'text-orange-600' : 'text-gray-600'
                          }`}>
                            {daysOverdue} days
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button className="text-blue-600 hover:text-blue-700 text-sm mr-2">
                            Send Reminder
                          </button>
                          <button className="text-gray-400 hover:text-gray-600">
                            <Eye className="size-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Content - E-Invoice Status */}
      {activeTab === 'einvoice' && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-3 px-4 text-xs text-gray-600">Invoice No.</th>
                  <th className="text-left py-3 px-4 text-xs text-gray-600">IRN Number</th>
                  <th className="text-left py-3 px-4 text-xs text-gray-600">Ack. No.</th>
                  <th className="text-left py-3 px-4 text-xs text-gray-600">Ack. Date</th>
                  <th className="text-center py-3 px-4 text-xs text-gray-600">QR Code</th>
                  <th className="text-center py-3 px-4 text-xs text-gray-600">XML</th>
                  <th className="text-center py-3 px-4 text-xs text-gray-600">JSON</th>
                  <th className="text-left py-3 px-4 text-xs text-gray-600">Status</th>
                  <th className="text-right py-3 px-4 text-xs text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {einvoices.map((einv) => (
                  <tr key={einv.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm font-mono text-gray-800">{einv.id}</td>
                    <td className="py-3 px-4">
                      <span className="text-xs font-mono text-gray-600">{einv.irnNumber}</span>
                    </td>
                    <td className="py-3 px-4 text-sm font-mono text-gray-600">{einv.ackNo}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {new Date(einv.ackDate).toLocaleDateString('en-IN')}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {einv.qrCode ? (
                        <QrCode className="size-4 text-green-600 inline" />
                      ) : (
                        <XCircle className="size-4 text-gray-400 inline" />
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {einv.xmlGenerated ? (
                        <CheckCircle className="size-4 text-green-600 inline" />
                      ) : (
                        <XCircle className="size-4 text-gray-400 inline" />
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {einv.jsonAvailable ? (
                        <CheckCircle className="size-4 text-green-600 inline" />
                      ) : (
                        <XCircle className="size-4 text-gray-400 inline" />
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-700">
                        {einv.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button className="text-blue-600 hover:text-blue-700 text-sm mr-2">
                        Download XML
                      </button>
                      <button className="text-blue-600 hover:text-blue-700 text-sm mr-2">
                        Download JSON
                      </button>
                      <button className="text-gray-400 hover:text-gray-600">
                        <QrCode className="size-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* E-Invoice Summary */}
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <CheckCircle className="size-4 text-green-500" />
                <span className="text-sm text-gray-600">Total E-Invoices Generated:</span>
                <span className="text-sm font-semibold text-gray-900">{einvoices.length}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="size-4 text-blue-500" />
                <span className="text-sm text-gray-600">Last Generated:</span>
                <span className="text-sm font-semibold text-gray-900">2026-04-15</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Email Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Bulk Email Invoices</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Selected Invoices ({selectedInvoices.length})
                </label>
                <div className="bg-gray-50 rounded p-3 max-h-32 overflow-y-auto">
                  {selectedInvoices.map(id => (
                    <div key={id} className="text-sm text-gray-700">{id}</div>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Subject
                </label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  defaultValue="Invoice from Nesol Energies Pvt Ltd"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Body
                </label>
                <textarea 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  rows={4}
                  defaultValue="Dear Customer,\n\nPlease find attached invoice(s) for your reference.\n\nThank you for your business.\n\nRegards,\nNesol Energies Pvt Ltd"
                />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                <span className="text-sm text-gray-600">Attach PDF copies</span>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button 
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                onClick={() => setShowEmailModal(false)}
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
                <Send className="size-4" />
                Send Emails
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}