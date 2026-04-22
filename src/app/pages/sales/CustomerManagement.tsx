// src/app/pages/sales/CustomerManagement.tsx
import { useState } from 'react';
import {
  Building2, Users, Phone, Mail, MapPin, CreditCard,
  Calendar, Search, Filter, Download, Plus, Eye,
  FileText, DollarSign, MessageCircle, AlertCircle,
  MoreVertical, ChevronDown, TrendingUp, Clock,
  CheckCircle, XCircle, Send, History, Star, Bell
} from 'lucide-react';
import { AddCustomerModal } from '../../components/sales/AddCustomerModal';

export default function CustomerManagement() {
  const [activeTab, setActiveTab] = useState<'master' | 'ledger' | 'communication' | 'preferences'>('master');
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);
  const [isAddCustomerModalOpen, setIsAddCustomerModalOpen] = useState(false);

  const customers = [
    {
      id: 'CUST/001',
      type: 'Distributor',
      companyName: 'Delhi Batteries Pvt Ltd',
      individualName: null,
      gstin: '07AABCD1234E1Z5',
      pan: 'AABCD1234E',
      billingAddress: {
        street: '123, Industrial Area, Phase 1',
        city: 'Delhi',
        state: 'Delhi',
        pincode: '110001',
      },
      shippingAddresses: [
        { id: 1, name: 'Main Warehouse', street: '123, Industrial Area, Phase 1', city: 'Delhi', state: 'Delhi', pincode: '110001' },
        { id: 2, name: 'East Delhi Store', street: '45, Patparganj Industrial Area', city: 'Delhi', state: 'Delhi', pincode: '110092' },
      ],
      primaryContact: {
        name: 'Rajiv Mehta',
        phone: '98765 43210',
        email: 'rajiv@delhibatteries.com',
        designation: 'Proprietor',
      },
      creditLimit: 1000000,
      paymentTerms: '30 Days',
      outstandingAmount: 444093,
      availableCredit: 555907,
      status: 'Active',
      customerSince: '2023-06-15',
    },
    {
      id: 'CUST/015',
      type: 'Dealer',
      companyName: 'Mumbai Auto Electricals',
      individualName: null,
      gstin: '27BBBCD5678F2G6',
      pan: 'BBBCD5678F',
      billingAddress: {
        street: '67, Lamington Road, Grant Road',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400007',
      },
      shippingAddresses: [
        { id: 1, name: 'Main Store', street: '67, Lamington Road, Grant Road', city: 'Mumbai', state: 'Maharashtra', pincode: '400007' },
      ],
      primaryContact: {
        name: 'Suresh Jain',
        phone: '98201 23456',
        email: 'suresh@mumbaiauto.com',
        designation: 'Owner',
      },
      creditLimit: 500000,
      paymentTerms: '15 Days',
      outstandingAmount: 0,
      availableCredit: 500000,
      status: 'Active',
      customerSince: '2024-01-10',
    },
    {
      id: 'CUST/023',
      type: 'Dealer',
      companyName: 'Chennai Battery House',
      individualName: null,
      gstin: '33CCCDD9012H3J7',
      pan: 'CCCDD9012H',
      billingAddress: {
        street: '89, GP Road',
        city: 'Chennai',
        state: 'Tamil Nadu',
        pincode: '600002',
      },
      shippingAddresses: [
        { id: 1, name: 'Main Store', street: '89, GP Road', city: 'Chennai', state: 'Tamil Nadu', pincode: '600002' },
      ],
      primaryContact: {
        name: 'Karthik Subramanian',
        phone: '98400 12345',
        email: 'karthik@chennaibattery.com',
        designation: 'Manager',
      },
      creditLimit: 350000,
      paymentTerms: '30 Days',
      outstandingAmount: 249688,
      availableCredit: 100312,
      status: 'Active',
      customerSince: '2024-03-20',
    },
    {
      id: 'CUST/032',
      type: 'Retail',
      companyName: 'Jaipur Auto Parts',
      individualName: 'Mohan Lal Sharma',
      gstin: '08EEEFF4567L5M9',
      pan: 'EEEFF4567L',
      billingAddress: {
        street: '12, Johari Bazaar',
        city: 'Jaipur',
        state: 'Rajasthan',
        pincode: '302003',
      },
      shippingAddresses: [
        { id: 1, name: 'Shop', street: '12, Johari Bazaar', city: 'Jaipur', state: 'Rajasthan', pincode: '302003' },
      ],
      primaryContact: {
        name: 'Mohan Lal Sharma',
        phone: '94140 67890',
        email: 'mohan@jaipurauto.com',
        designation: 'Owner',
      },
      creditLimit: 100000,
      paymentTerms: 'Advance',
      outstandingAmount: 0,
      availableCredit: 100000,
      status: 'Active',
      customerSince: '2024-08-05',
    },
    {
      id: 'CUST/045',
      type: 'OEM',
      companyName: 'Green Energy Solutions',
      individualName: null,
      gstin: '09FFFGG5678M6N0',
      pan: 'FFFGG5678M',
      billingAddress: {
        street: '234, Electronic City, Phase 2',
        city: 'Bengaluru',
        state: 'Karnataka',
        pincode: '560100',
      },
      shippingAddresses: [
        { id: 1, name: 'Factory', street: '234, Electronic City, Phase 2', city: 'Bengaluru', state: 'Karnataka', pincode: '560100' },
      ],
      primaryContact: {
        name: 'Priyanka Das',
        phone: '99001 23456',
        email: 'priyanka@greenenergy.com',
        designation: 'Procurement Head',
      },
      creditLimit: 2000000,
      paymentTerms: '45 Days',
      outstandingAmount: 0,
      availableCredit: 2000000,
      status: 'Active',
      customerSince: '2023-09-12',
    },
  ];

  const ledgerEntries = [
    {
      id: 'LED/001',
      customerId: 'CUST/001',
      date: '2026-04-15',
      transactionType: 'Sales Invoice',
      referenceNumber: 'NES/24-25/089',
      debitAmount: 444093,
      creditAmount: 0,
      balance: 444093,
      description: 'Invoice for Automotive Batteries',
    },
    {
      id: 'LED/002',
      customerId: 'CUST/001',
      date: '2026-04-14',
      transactionType: 'Credit Note',
      referenceNumber: 'NES/24-25/086',
      debitAmount: 0,
      creditAmount: 14868,
      balance: 429225,
      description: 'Return - Damaged Battery',
    },
    {
      id: 'LED/003',
      customerId: 'CUST/001',
      date: '2026-04-10',
      transactionType: 'Payment Receipt',
      referenceNumber: 'RCPT/2026/045',
      debitAmount: 0,
      creditAmount: 200000,
      balance: 229225,
      description: 'NEFT Payment',
    },
    {
      id: 'LED/004',
      customerId: 'CUST/023',
      date: '2026-04-12',
      transactionType: 'Sales Invoice',
      referenceNumber: 'NES/24-25/087',
      debitAmount: 249688,
      creditAmount: 0,
      balance: 249688,
      description: 'Invoice for E-Rickshaw Batteries',
    },
  ];

  const paymentReceipts = [
    {
      id: 'RCPT/2026/045',
      customerId: 'CUST/001',
      customerName: 'Delhi Batteries Pvt Ltd',
      receiptDate: '2026-04-10',
      paymentMode: 'NEFT',
      reference: 'NEFT/HDFC/20260410/5678',
      chequeNumber: null,
      amountReceived: 200000,
      adjustedInvoices: ['NES/24-25/089'],
      status: 'Reconciled',
    },
    {
      id: 'RCPT/2026/044',
      customerId: 'CUST/015',
      customerName: 'Mumbai Auto Electricals',
      receiptDate: '2026-04-08',
      paymentMode: 'RTGS',
      reference: 'RTGS/ICICI/20260408/1234',
      chequeNumber: null,
      amountReceived: 215055,
      adjustedInvoices: ['NES/24-25/088'],
      status: 'Reconciled',
    },
    {
      id: 'RCPT/2026/043',
      customerId: 'CUST/052',
      customerName: 'Bangalore Motors',
      receiptDate: '2026-04-05',
      paymentMode: 'Cheque',
      reference: null,
      chequeNumber: 'SBI/2026/456789',
      amountReceived: 126000,
      adjustedInvoices: ['NES/24-25/085'],
      status: 'Cleared',
    },
  ];

  const communicationLogs = [
    {
      id: 'COMM/001',
      customerId: 'CUST/001',
      date: '2026-04-16',
      type: 'Call',
      contactPerson: 'Rajiv Mehta',
      summary: 'Discussed pending payment for invoice NES/24-25/089',
      notes: 'Customer promised to release payment by 20th April',
      followupRequired: true,
      nextFollowupDate: '2026-04-20',
      initiatedBy: 'Amit Singh',
    },
    {
      id: 'COMM/002',
      customerId: 'CUST/045',
      date: '2026-04-15',
      type: 'Email',
      contactPerson: 'Priyanka Das',
      summary: 'Sent quotation for Solar Battery order',
      notes: 'Quotation QUOT/2026/056 sent via email',
      followupRequired: true,
      nextFollowupDate: '2026-04-18',
      initiatedBy: 'Suresh Patel',
    },
    {
      id: 'COMM/003',
      customerId: 'CUST/023',
      date: '2026-04-14',
      type: 'Meeting',
      contactPerson: 'Karthik Subramanian',
      summary: 'Quarterly business review meeting',
      notes: 'Discussed sales performance and new product launch',
      followupRequired: false,
      nextFollowupDate: null,
      initiatedBy: 'Amit Singh',
    },
    {
      id: 'COMM/004',
      customerId: 'CUST/015',
      date: '2026-04-12',
      type: 'WhatsApp',
      contactPerson: 'Suresh Jain',
      summary: 'Order confirmation and delivery update',
      notes: 'Confirmed receipt of order SO/2026/088',
      followupRequired: false,
      nextFollowupDate: null,
      initiatedBy: 'Suresh Patel',
    },
  ];

  const productPreferences = [
    {
      customerId: 'CUST/001',
      preferredCategories: ['Automotive', 'Inverter'],
      frequentlyPurchased: ['NES-AUTO-150AH', 'NES-AUTO-100AH'],
      lastPurchaseDate: '2026-04-15',
      averageOrderValue: 350000,
      purchaseFrequency: 'Monthly',
    },
    {
      customerId: 'CUST/015',
      preferredCategories: ['Inverter', 'Solar'],
      frequentlyPurchased: ['NES-INV-200AH', 'NES-SOLAR-40AH'],
      lastPurchaseDate: '2026-04-14',
      averageOrderValue: 200000,
      purchaseFrequency: 'Bi-Weekly',
    },
    {
      customerId: 'CUST/023',
      preferredCategories: ['E-Rickshaw', 'Automotive'],
      frequentlyPurchased: ['NES-ERIK-120AH'],
      lastPurchaseDate: '2026-04-12',
      averageOrderValue: 230000,
      purchaseFrequency: 'Monthly',
    },
  ];

  const alerts = [
    {
      id: 'ALT/001',
      customerId: 'CUST/001',
      type: 'Credit Limit',
      message: 'Customer has utilized 44.4% of credit limit',
      severity: 'Medium',
      date: '2026-04-15',
    },
    {
      id: 'ALT/002',
      customerId: 'CUST/023',
      type: 'Credit Limit',
      message: 'Customer approaching credit limit (71.3% utilized)',
      severity: 'High',
      date: '2026-04-12',
    },
    {
      id: 'ALT/003',
      customerId: 'CUST/001',
      type: 'Overdue Payment',
      message: 'Invoice NES/24-25/078 is 2 days overdue',
      severity: 'Medium',
      date: '2026-04-16',
    },
  ];

  const stats = {
    totalCustomers: customers.length,
    activeCustomers: customers.filter(c => c.status === 'Active').length,
    totalOutstanding: customers.reduce((sum, c) => sum + c.outstandingAmount, 0),
    followupsToday: communicationLogs.filter(l =>
      l.followupRequired && l.nextFollowupDate === '2026-04-20'
    ).length,
  };

  const typeColors: Record<string, string> = {
    'Distributor': 'bg-purple-100 text-purple-700',
    'Dealer': 'bg-blue-100 text-blue-700',
    'OEM': 'bg-green-100 text-green-700',
    'End User': 'bg-orange-100 text-orange-700',
    'Retail': 'bg-gray-100 text-gray-700',
  };

  const communicationTypeIcons: Record<string, any> = {
    'Call': Phone,
    'Email': Mail,
    'Meeting': Users,
    'WhatsApp': MessageCircle,
  };

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };


  const handleCustomerAdded = () => {
    console.log("Customer created successfully");
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-gray-900">Customer Management</h1>
          <p className="text-sm text-gray-600">Manage customer data, ledgers, and communication</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download className="size-4" />
            Export
          </button>
          <button
            onClick={() => setIsAddCustomerModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            <Plus className="size-4" />
            Add Customer
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <Building2 className="size-4 text-blue-500" />
            <p className="text-xs text-gray-600">Total Customers</p>
          </div>
          <p className="text-xl font-bold text-gray-900">{stats.totalCustomers}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="size-4 text-green-500" />
            <p className="text-xs text-gray-600">Active Customers</p>
          </div>
          <p className="text-xl font-bold text-gray-900">{stats.activeCustomers}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="size-4 text-orange-500" />
            <p className="text-xs text-gray-600">Total Outstanding</p>
          </div>
          <p className="text-xl font-bold text-gray-900">{formatCurrency(stats.totalOutstanding)}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <Bell className="size-4 text-purple-500" />
            <p className="text-xs text-gray-600">Follow-ups Today</p>
          </div>
          <p className="text-xl font-bold text-gray-900">{stats.followupsToday}</p>
        </div>
      </div>

      {/* Alerts Section */}
      {alerts.length > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="size-5 text-orange-500" />
            <h3 className="font-medium text-orange-800">Customer Alerts</h3>
            <span className="text-xs bg-orange-200 text-orange-800 px-2 py-0.5 rounded-full">
              {alerts.length} active
            </span>
          </div>
          <div className="space-y-2">
            {alerts.map((alert) => {
              const customer = customers.find(c => c.id === alert.customerId);
              return (
                <div key={alert.id} className="flex items-center justify-between bg-white rounded p-3">
                  <div className="flex items-center gap-3">
                    <AlertCircle className={`size-4 ${alert.severity === 'High' ? 'text-red-500' : 'text-orange-500'
                      }`} />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{customer?.companyName}</p>
                      <p className="text-xs text-gray-500">{alert.message}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs px-2 py-0.5 rounded ${alert.severity === 'High' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                      }`}>
                      {alert.type}
                    </span>
                    <button className="text-sm text-blue-600 hover:text-blue-700">
                      View
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* View Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex gap-6 overflow-x-auto">
          {(['master', 'ledger', 'communication', 'preferences'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === tab
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
            >
              {tab === 'master' ? 'Customer Master' :
                tab === 'ledger' ? 'Customer Ledger' :
                  tab === 'communication' ? 'Communication Log' : 'Product Preferences'}
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
            placeholder="Search customers..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select className="px-4 py-2 border border-gray-300 rounded-lg">
          <option>All Types</option>
          <option>Distributor</option>
          <option>Dealer</option>
          <option>OEM</option>
          <option>End User</option>
          <option>Retail</option>
        </select>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
          <Filter className="size-4" />
          Filter
        </button>
      </div>

      {/* Content - Customer Master */}
      {activeTab === 'master' && (
        <div className="space-y-4">
          {customers.map((customer) => (
            <div key={customer.id} className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-blue-50 rounded">
                    <Building2 className="size-5 text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-semibold text-gray-900">{customer.companyName}</h3>
                      <span className="text-xs text-gray-400">|</span>
                      <span className="text-sm text-gray-600">{customer.id}</span>
                      <span className={`text-xs px-2 py-0.5 rounded ${typeColors[customer.type]}`}>
                        {customer.type}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded ${customer.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                        {customer.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-3">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">GSTIN / PAN</p>
                        <p className="text-sm text-gray-800 font-mono">{customer.gstin} / {customer.pan}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Primary Contact</p>
                        <div className="space-y-1">
                          <p className="text-sm text-gray-800 flex items-center gap-1">
                            <Users className="size-3" />
                            {customer.primaryContact.name} ({customer.primaryContact.designation})
                          </p>
                          <p className="text-sm text-gray-600 flex items-center gap-1">
                            <Phone className="size-3" />
                            {customer.primaryContact.phone}
                          </p>
                          <p className="text-sm text-gray-600 flex items-center gap-1">
                            <Mail className="size-3" />
                            {customer.primaryContact.email}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Billing Address</p>
                        <p className="text-sm text-gray-600">
                          {customer.billingAddress.street}, {customer.billingAddress.city},<br />
                          {customer.billingAddress.state} - {customer.billingAddress.pincode}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Shipping Addresses</p>
                        {customer.shippingAddresses.map((addr) => (
                          <p key={addr.id} className="text-sm text-gray-600">
                            <span className="font-medium">{addr.name}:</span> {addr.street}, {addr.city}
                          </p>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4 mt-3 pt-3 border-t border-gray-100">
                      <div>
                        <p className="text-xs text-gray-500">Credit Limit</p>
                        <p className="text-sm font-semibold text-gray-900">{formatCurrency(customer.creditLimit)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Outstanding</p>
                        <p className="text-sm font-semibold text-orange-600">{formatCurrency(customer.outstandingAmount)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Available Credit</p>
                        <p className="text-sm font-semibold text-green-600">{formatCurrency(customer.availableCredit)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Payment Terms</p>
                        <p className="text-sm text-gray-900">{customer.paymentTerms}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded" title="View Ledger">
                    <FileText className="size-4" />
                  </button>
                  <button className="p-2 text-green-600 hover:bg-green-50 rounded" title="Record Payment">
                    <DollarSign className="size-4" />
                  </button>
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

      {/* Content - Customer Ledger */}
      {activeTab === 'ledger' && (
        <div className="space-y-6">
          {/* Payment Receipts */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Recent Payment Receipts</h3>
              <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm">
                <Plus className="size-4" />
                Record Payment
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left py-3 px-4 text-xs text-gray-600">Receipt ID</th>
                    <th className="text-left py-3 px-4 text-xs text-gray-600">Customer</th>
                    <th className="text-left py-3 px-4 text-xs text-gray-600">Date</th>
                    <th className="text-left py-3 px-4 text-xs text-gray-600">Payment Mode</th>
                    <th className="text-left py-3 px-4 text-xs text-gray-600">Reference</th>
                    <th className="text-right py-3 px-4 text-xs text-gray-600">Amount</th>
                    <th className="text-left py-3 px-4 text-xs text-gray-600">Adjusted Against</th>
                    <th className="text-left py-3 px-4 text-xs text-gray-600">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentReceipts.map((receipt) => (
                    <tr key={receipt.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm font-mono text-gray-800">{receipt.id}</td>
                      <td className="py-3 px-4">
                        <p className="text-sm font-medium text-gray-900">{receipt.customerName}</p>
                        <p className="text-xs text-gray-500">{receipt.customerId}</p>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {new Date(receipt.receiptDate).toLocaleDateString('en-IN')}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">{receipt.paymentMode}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {receipt.reference || receipt.chequeNumber}
                      </td>
                      <td className="py-3 px-4 text-right text-sm font-semibold text-green-600">
                        {formatCurrency(receipt.amountReceived)}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {receipt.adjustedInvoices.join(', ')}
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-700">
                          {receipt.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Ledger Entries */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">Customer Ledger - Delhi Batteries Pvt Ltd</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left py-3 px-4 text-xs text-gray-600">Date</th>
                    <th className="text-left py-3 px-4 text-xs text-gray-600">Transaction Type</th>
                    <th className="text-left py-3 px-4 text-xs text-gray-600">Reference</th>
                    <th className="text-left py-3 px-4 text-xs text-gray-600">Description</th>
                    <th className="text-right py-3 px-4 text-xs text-gray-600">Debit</th>
                    <th className="text-right py-3 px-4 text-xs text-gray-600">Credit</th>
                    <th className="text-right py-3 px-4 text-xs text-gray-600">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {ledgerEntries.filter(e => e.customerId === 'CUST/001').map((entry) => (
                    <tr key={entry.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {new Date(entry.date).toLocaleDateString('en-IN')}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-800">{entry.transactionType}</td>
                      <td className="py-3 px-4 text-sm font-mono text-gray-600">{entry.referenceNumber}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{entry.description}</td>
                      <td className="py-3 px-4 text-right text-sm text-red-600">
                        {entry.debitAmount > 0 ? formatCurrency(entry.debitAmount) : '-'}
                      </td>
                      <td className="py-3 px-4 text-right text-sm text-green-600">
                        {entry.creditAmount > 0 ? formatCurrency(entry.creditAmount) : '-'}
                      </td>
                      <td className="py-3 px-4 text-right text-sm font-semibold text-gray-900">
                        {formatCurrency(entry.balance)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Content - Communication Log */}
      {activeTab === 'communication' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              <Plus className="size-4" />
              Log Communication
            </button>
          </div>

          {communicationLogs.map((log) => {
            const customer = customers.find(c => c.id === log.customerId);
            const TypeIcon = communicationTypeIcons[log.type] || MessageCircle;

            return (
              <div key={log.id} className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded ${log.type === 'Call' ? 'bg-green-50' :
                    log.type === 'Email' ? 'bg-blue-50' :
                      log.type === 'Meeting' ? 'bg-purple-50' : 'bg-gray-50'
                    }`}>
                    <TypeIcon className={`size-5 ${log.type === 'Call' ? 'text-green-500' :
                      log.type === 'Email' ? 'text-blue-500' :
                        log.type === 'Meeting' ? 'text-purple-500' : 'text-gray-500'
                      }`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-medium text-gray-900">{customer?.companyName}</h3>
                      <span className="text-xs text-gray-400">|</span>
                      <span className="text-sm text-gray-600">{log.contactPerson}</span>
                      <span className="text-xs text-gray-400">|</span>
                      <span className="text-sm text-gray-600">{log.type}</span>
                    </div>
                    <p className="text-sm text-gray-800 mb-2">{log.summary}</p>
                    <p className="text-sm text-gray-600 mb-2">{log.notes}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>Date: {new Date(log.date).toLocaleDateString('en-IN')}</span>
                      <span>Initiated by: {log.initiatedBy}</span>
                      {log.followupRequired && (
                        <span className="text-orange-600 flex items-center gap-1">
                          <Bell className="size-3" />
                          Follow-up: {new Date(log.nextFollowupDate!).toLocaleDateString('en-IN')}
                        </span>
                      )}
                    </div>
                  </div>
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded hover:bg-gray-50">
                    <MoreVertical className="size-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Content - Product Preferences */}
      {activeTab === 'preferences' && (
        <div className="space-y-4">
          {productPreferences.map((pref) => {
            const customer = customers.find(c => c.id === pref.customerId);
            return (
              <div key={pref.customerId} className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-purple-50 rounded">
                    <Star className="size-5 text-purple-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="font-medium text-gray-900">{customer?.companyName}</h3>
                      <span className="text-xs text-gray-400">|</span>
                      <span className="text-sm text-gray-600">{pref.customerId}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-500 mb-2">Preferred Categories</p>
                        <div className="flex flex-wrap gap-2">
                          {pref.preferredCategories.map((cat) => (
                            <span key={cat} className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-700">
                              {cat}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-2">Frequently Purchased SKUs</p>
                        <div className="flex flex-wrap gap-2">
                          {pref.frequentlyPurchased.map((sku) => (
                            <span key={sku} className="text-xs px-2 py-1 rounded bg-green-100 text-green-700 font-mono">
                              {sku}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Last Purchase Date</p>
                        <p className="text-sm font-medium text-gray-900">
                          {new Date(pref.lastPurchaseDate).toLocaleDateString('en-IN')}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Average Order Value</p>
                        <p className="text-sm font-medium text-gray-900">{formatCurrency(pref.averageOrderValue)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Purchase Frequency</p>
                        <p className="text-sm font-medium text-gray-900">{pref.purchaseFrequency}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <AddCustomerModal
        open={isAddCustomerModalOpen}
        onOpenChange={setIsAddCustomerModalOpen}
        onSuccess={handleCustomerAdded}
      />
    </div>
  );
}