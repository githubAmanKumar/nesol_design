// src/app/pages/procurement/VendorManagement.tsx
import { useState } from 'react';
import {
  Building2, Users, Phone, Mail, MapPin, CreditCard,
  Star, TrendingUp, TrendingDown, Search, Filter,
  Download, Plus, Eye, FileText, DollarSign, AlertCircle,
  MoreVertical, CheckCircle, XCircle, Clock, Calendar,
  ChevronDown, BarChart3, Truck, Wrench, Package
} from 'lucide-react';
import { AddVendorModal } from '../../components/procurement/AddVendorModal';

export default function VendorManagement() {
  const [activeTab, setActiveTab] = useState<'master' | 'rating' | 'payment'>('master');
  const [selectedVendor, setSelectedVendor] = useState<string | null>(null);
  const [isAddVendorModalOpen, setIsAddVendorModalOpen] = useState(false);

  const vendors = [
    {
      id: 'VEND/012',
      companyName: 'Metal Suppliers Ltd',
      contactPerson: 'Anil Kumar',
      mobile: '98765 43210',
      phone: '01332 234567',
      email: 'anil@metalsuppliers.com',
      gstin: '05AABCM1234E1Z5',
      pan: 'AABCM1234E',
      bankDetails: {
        accountName: 'Metal Suppliers Ltd',
        accountNumber: '12345678901',
        bankName: 'SBI',
        ifsc: 'SBIN0001234',
      },
      paymentTerms: '30 Days',
      category: 'Raw Material Lead',
      status: 'Active',
      vendorSince: '2023-01-15',
      address: {
        street: '45, Industrial Estate',
        city: 'Haridwar',
        state: 'Uttarakhand',
        pincode: '249403',
      },
    },
    {
      id: 'VEND/008',
      companyName: 'PlastChem Industries',
      contactPerson: 'Rajesh Gupta',
      mobile: '99876 54321',
      phone: '0120 4567890',
      email: 'rajesh@plastchem.com',
      gstin: '09BBBCD5678F2G6',
      pan: 'BBBCD5678F',
      bankDetails: {
        accountName: 'PlastChem Industries',
        accountNumber: '98765432109',
        bankName: 'HDFC',
        ifsc: 'HDFC0005678',
      },
      paymentTerms: '15 Days',
      category: 'PP Containers',
      status: 'Active',
      vendorSince: '2023-06-20',
      address: {
        street: '78, Sector 63',
        city: 'Noida',
        state: 'Uttar Pradesh',
        pincode: '201301',
      },
    },
    {
      id: 'VEND/005',
      companyName: 'Acid Suppliers Co',
      contactPerson: 'Sunil Verma',
      mobile: '97654 32109',
      phone: '0135 2678901',
      email: 'sunil@acidsuppliers.com',
      gstin: '05CCCDD9012H3J7',
      pan: 'CCCDD9012H',
      bankDetails: {
        accountName: 'Acid Suppliers Co',
        accountNumber: '45678912345',
        bankName: 'PNB',
        ifsc: 'PNB0009012',
      },
      paymentTerms: 'Advance',
      category: 'Acid',
      status: 'Active',
      vendorSince: '2024-03-10',
      address: {
        street: '12, Chemical Zone',
        city: 'Dehradun',
        state: 'Uttarakhand',
        pincode: '248001',
      },
    },
    {
      id: 'VEND/015',
      companyName: 'VRL Logistics',
      contactPerson: 'Manoj Singh',
      mobile: '98999 88877',
      phone: '011 45678901',
      email: 'manoj@vrllogistics.com',
      gstin: '07DDDEE4567L5M9',
      pan: 'DDDEE4567L',
      bankDetails: {
        accountName: 'VRL Logistics',
        accountNumber: '34567890123',
        bankName: 'ICICI',
        ifsc: 'ICIC0004567',
      },
      paymentTerms: '15 Days',
      category: 'Logistics',
      status: 'Active',
      vendorSince: '2023-09-05',
      address: {
        street: '34, Transport Nagar',
        city: 'Delhi',
        state: 'Delhi',
        pincode: '110001',
      },
    },
    {
      id: 'VEND/020',
      companyName: 'Precision Tools',
      contactPerson: 'Amit Sharma',
      mobile: '98777 66655',
      phone: '01332 345678',
      email: 'amit@precisiontools.com',
      gstin: '05EEFFF5678M6N0',
      pan: 'EEFFF5678M',
      bankDetails: {
        accountName: 'Precision Tools',
        accountNumber: '23456789012',
        bankName: 'Axis',
        ifsc: 'UTIB0005678',
      },
      paymentTerms: '30 Days',
      category: 'Spare Parts',
      status: 'Blacklisted',
      vendorSince: '2023-11-12',
      address: {
        street: '56, Industrial Area',
        city: 'Roorkee',
        state: 'Uttarakhand',
        pincode: '247667',
      },
    },
  ];

  const vendorRatings = [
    {
      vendorId: 'VEND/012',
      period: 'Q1 2026',
      qualityRating: 4.5,
      deliveryRating: 4.2,
      pricingRating: 4.0,
      responsivenessRating: 4.3,
      overallScore: 4.25,
      status: 'Preferred',
      evaluatedBy: 'Procurement Head',
      evaluationDate: '2026-04-05',
      remarks: 'Consistent quality, reliable delivery',
    },
    {
      vendorId: 'VEND/008',
      period: 'Q1 2026',
      qualityRating: 4.2,
      deliveryRating: 4.5,
      pricingRating: 4.3,
      responsivenessRating: 4.0,
      overallScore: 4.25,
      status: 'Preferred',
      evaluatedBy: 'Procurement Head',
      evaluationDate: '2026-04-05',
      remarks: 'Good pricing, excellent delivery time',
    },
    {
      vendorId: 'VEND/005',
      period: 'Q1 2026',
      qualityRating: 3.8,
      deliveryRating: 3.5,
      pricingRating: 3.5,
      responsivenessRating: 3.0,
      overallScore: 3.45,
      status: 'Approved',
      evaluatedBy: 'Procurement Head',
      evaluationDate: '2026-04-05',
      remarks: 'Quality issues reported, delivery delays',
    },
    {
      vendorId: 'VEND/015',
      period: 'Q1 2026',
      qualityRating: 4.0,
      deliveryRating: 4.2,
      pricingRating: 3.8,
      responsivenessRating: 4.0,
      overallScore: 4.0,
      status: 'Approved',
      evaluatedBy: 'Procurement Head',
      evaluationDate: '2026-04-05',
      remarks: 'Reliable logistics partner',
    },
  ];

  const vendorPayments = [
    {
      vendorId: 'VEND/012',
      vendorName: 'Metal Suppliers Ltd',
      outstandingAmount: 1150500,
      pendingInvoices: ['PO/2026/234'],
      nextPaymentDue: '2026-05-21',
      paymentSchedule: 'Monthly',
      lastPaymentDate: '2026-04-10',
      lastPaymentAmount: 850000,
    },
    {
      vendorId: 'VEND/008',
      vendorName: 'PlastChem Industries',
      outstandingAmount: 212400,
      pendingInvoices: ['PO/2026/233'],
      nextPaymentDue: '2026-05-03',
      paymentSchedule: 'Bi-Weekly',
      lastPaymentDate: '2026-04-01',
      lastPaymentAmount: 156000,
    },
    {
      vendorId: 'VEND/005',
      vendorName: 'Acid Suppliers Co',
      outstandingAmount: 106200,
      pendingInvoices: ['PO/2026/230'],
      nextPaymentDue: '2026-04-25',
      paymentSchedule: 'Advance',
      lastPaymentDate: '2026-04-05',
      lastPaymentAmount: 106200,
    },
    {
      vendorId: 'VEND/015',
      vendorName: 'VRL Logistics',
      outstandingAmount: 45000,
      pendingInvoices: ['INV/2026/345'],
      nextPaymentDue: '2026-04-28',
      paymentSchedule: '15 Days',
      lastPaymentDate: '2026-04-10',
      lastPaymentAmount: 32000,
    },
  ];

  const stats = {
    totalVendors: vendors.filter(v => v.status === 'Active').length,
    preferredVendors: vendorRatings.filter(r => r.status === 'Preferred').length,
    totalOutstanding: vendorPayments.reduce((sum, p) => sum + p.outstandingAmount, 0),
    paymentsDueThisWeek: 2,
  };

  const categoryIcons: Record<string, any> = {
    'Raw Material Lead': Package,
    'PP Containers': Package,
    'Acid': Package,
    'Logistics': Truck,
    'Spare Parts': Wrench,
  };

  const statusColors: Record<string, string> = {
    'Active': 'bg-green-100 text-green-700',
    'Inactive': 'bg-gray-100 text-gray-700',
    'Blacklisted': 'bg-red-100 text-red-700',
  };

  const ratingStatusColors: Record<string, string> = {
    'Preferred': 'bg-green-100 text-green-700',
    'Approved': 'bg-blue-100 text-blue-700',
    'Blacklisted': 'bg-red-100 text-red-700',
  };

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const handleVendorAdded = () => {
    console.log('Vendor added successfully!');
    // Refresh vendor list or show toast
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`size-3 ${star <= rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
          />
        ))}
        <span className="ml-1 text-xs text-gray-600">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-gray-900">Vendor Management</h1>
          <p className="text-sm text-gray-600">Manage vendor data, ratings, and contracts</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download className="size-4" />
            Export
          </button>
          <button
            onClick={() => setIsAddVendorModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            <Plus className="size-4" />
            Add Vendor
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <Building2 className="size-4 text-blue-500" />
            <p className="text-xs text-gray-600">Active Vendors</p>
          </div>
          <p className="text-xl font-bold text-gray-900">{stats.totalVendors}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <Star className="size-4 text-yellow-500" />
            <p className="text-xs text-gray-600">Preferred Vendors</p>
          </div>
          <p className="text-xl font-bold text-gray-900">{stats.preferredVendors}</p>
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
            <AlertCircle className="size-4 text-purple-500" />
            <p className="text-xs text-gray-600">Payments Due This Week</p>
          </div>
          <p className="text-xl font-bold text-gray-900">{stats.paymentsDueThisWeek}</p>
        </div>
      </div>

      {/* View Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex gap-6">
          {(['master', 'rating', 'payment'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-medium border-b-2 transition-colors ${activeTab === tab
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
            >
              {tab === 'master' ? 'Vendor Master' :
                tab === 'rating' ? 'Vendor Rating' : 'Vendor Payments'}
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
            placeholder="Search vendors..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select className="px-4 py-2 border border-gray-300 rounded-lg">
          <option>All Categories</option>
          <option>Raw Material Lead</option>
          <option>Acid</option>
          <option>PP Containers</option>
          <option>Spare Parts</option>
          <option>Logistics</option>
        </select>
        <select className="px-4 py-2 border border-gray-300 rounded-lg">
          <option>All Status</option>
          <option>Active</option>
          <option>Inactive</option>
          <option>Blacklisted</option>
        </select>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
          <Filter className="size-4" />
          Filter
        </button>
      </div>

      {/* Content - Vendor Master */}
      {activeTab === 'master' && (
        <div className="space-y-4">
          {vendors.map((vendor) => {
            const CategoryIcon = categoryIcons[vendor.category] || Building2;
            return (
              <div key={vendor.id} className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-blue-50 rounded">
                      <CategoryIcon className="size-5 text-blue-500" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-semibold text-gray-900">{vendor.companyName}</h3>
                        <span className="text-xs text-gray-400">|</span>
                        <span className="text-sm text-gray-600">{vendor.id}</span>
                        <span className={`text-xs px-2 py-0.5 rounded ${statusColors[vendor.status]}`}>
                          {vendor.status}
                        </span>
                        <span className="text-xs text-gray-400">|</span>
                        <span className="text-sm text-gray-600">{vendor.category}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mt-3">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Contact Information</p>
                          <div className="space-y-1">
                            <p className="text-sm text-gray-800 flex items-center gap-1">
                              <Users className="size-3" />
                              {vendor.contactPerson}
                            </p>
                            <p className="text-sm text-gray-600 flex items-center gap-1">
                              <Phone className="size-3" />
                              {vendor.mobile} / {vendor.phone}
                            </p>
                            <p className="text-sm text-gray-600 flex items-center gap-1">
                              <Mail className="size-3" />
                              {vendor.email}
                            </p>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Tax Information</p>
                          <p className="text-sm text-gray-800 font-mono">GSTIN: {vendor.gstin}</p>
                          <p className="text-sm text-gray-800 font-mono">PAN: {vendor.pan}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Bank Details</p>
                          <p className="text-sm text-gray-800">{vendor.bankDetails.accountName}</p>
                          <p className="text-sm text-gray-600 font-mono">
                            A/C: {vendor.bankDetails.accountNumber}
                          </p>
                          <p className="text-sm text-gray-600">
                            {vendor.bankDetails.bankName} | IFSC: {vendor.bankDetails.ifsc}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Address</p>
                          <p className="text-sm text-gray-600">
                            {vendor.address.street}, {vendor.address.city},<br />
                            {vendor.address.state} - {vendor.address.pincode}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 mt-3 pt-3 border-t border-gray-100">
                        <div>
                          <span className="text-xs text-gray-500">Payment Terms:</span>
                          <span className="ml-2 text-sm font-medium text-gray-900">{vendor.paymentTerms}</span>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500">Vendor Since:</span>
                          <span className="ml-2 text-sm text-gray-600">
                            {new Date(vendor.vendorSince).toLocaleDateString('en-IN')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded" title="View Details">
                      <Eye className="size-4" />
                    </button>
                    <button className="p-2 text-green-600 hover:bg-green-50 rounded" title="Rate Vendor">
                      <Star className="size-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 rounded hover:bg-gray-50">
                      <MoreVertical className="size-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Content - Vendor Rating */}
      {activeTab === 'rating' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <select className="px-4 py-2 border border-gray-300 rounded-lg">
              <option>Q1 2026</option>
              <option>Q4 2025</option>
              <option>Q3 2025</option>
            </select>
          </div>

          {vendorRatings.map((rating) => {
            const vendor = vendors.find(v => v.id === rating.vendorId);
            return (
              <div key={`${rating.vendorId}-${rating.period}`} className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-yellow-50 rounded">
                    <Star className="size-5 text-yellow-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-medium text-gray-900">{vendor?.companyName}</h3>
                      <span className="text-xs text-gray-400">|</span>
                      <span className="text-sm text-gray-600">{rating.vendorId}</span>
                      <span className="text-xs text-gray-400">|</span>
                      <span className="text-sm text-gray-600">{rating.period}</span>
                      <span className={`text-xs px-2 py-0.5 rounded ${ratingStatusColors[rating.status]}`}>
                        {rating.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Quality Rating</p>
                        {renderStars(rating.qualityRating)}
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Delivery Time</p>
                        {renderStars(rating.deliveryRating)}
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Pricing</p>
                        {renderStars(rating.pricingRating)}
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Responsiveness</p>
                        {renderStars(rating.responsivenessRating)}
                      </div>
                    </div>

                    <div className="flex items-center gap-6 p-3 bg-gray-50 rounded">
                      <div>
                        <span className="text-xs text-gray-500">Overall Score:</span>
                        <span className="ml-2 text-lg font-bold text-blue-600">{rating.overallScore.toFixed(2)}</span>
                        <span className="text-xs text-gray-400">/5.00</span>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500">Evaluated By:</span>
                        <span className="ml-2 text-sm text-gray-600">{rating.evaluatedBy}</span>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500">Date:</span>
                        <span className="ml-2 text-sm text-gray-600">
                          {new Date(rating.evaluationDate).toLocaleDateString('en-IN')}
                        </span>
                      </div>
                    </div>

                    {rating.remarks && (
                      <p className="text-sm text-gray-600 mt-2">
                        <span className="font-medium">Remarks:</span> {rating.remarks}
                      </p>
                    )}
                  </div>
                  <button className="px-3 py-1.5 border border-gray-300 text-gray-700 text-xs rounded hover:bg-gray-50">
                    View History
                  </button>
                </div>
              </div>
            );
          })}

          {/* Rating Summary Chart */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Vendor Rating Distribution</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600 w-24">4.5 - 5.0 ★</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '25%' }} />
                </div>
                <span className="text-sm text-gray-600">2 vendors</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600 w-24">4.0 - 4.4 ★</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '50%' }} />
                </div>
                <span className="text-sm text-gray-600">3 vendors</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600 w-24">3.5 - 3.9 ★</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '15%' }} />
                </div>
                <span className="text-sm text-gray-600">1 vendor</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600 w-24">Below 3.5 ★</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: '10%' }} />
                </div>
                <span className="text-sm text-gray-600">0 vendors</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content - Vendor Payments */}
      {activeTab === 'payment' && (
        <div className="space-y-4">
          {vendorPayments.map((payment) => (
            <div key={payment.vendorId} className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-green-50 rounded">
                  <DollarSign className="size-5 text-green-500" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-medium text-gray-900">{payment.vendorName}</h3>
                    <span className="text-xs text-gray-400">|</span>
                    <span className="text-sm text-gray-600">{payment.vendorId}</span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                    <div>
                      <p className="text-xs text-gray-500">Outstanding Amount</p>
                      <p className="text-lg font-bold text-orange-600">{formatCurrency(payment.outstandingAmount)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Pending Invoices</p>
                      <p className="text-sm text-gray-900">{payment.pendingInvoices.join(', ')}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Next Payment Due</p>
                      <p className="text-sm font-medium text-gray-900 flex items-center gap-1">
                        <Calendar className="size-3" />
                        {new Date(payment.nextPaymentDue).toLocaleDateString('en-IN')}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Payment Schedule</p>
                      <p className="text-sm text-gray-900">{payment.paymentSchedule}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 p-3 bg-gray-50 rounded">
                    <div>
                      <span className="text-xs text-gray-500">Last Payment:</span>
                      <span className="ml-2 text-sm text-gray-600">
                        {formatCurrency(payment.lastPaymentAmount)} on {new Date(payment.lastPaymentDate).toLocaleDateString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1.5 bg-blue-600 text-white text-xs rounded hover:bg-blue-700">
                    Record Payment
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded hover:bg-gray-50">
                    <Eye className="size-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Payment Summary */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Payment Summary by Vendor</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left py-3 px-4 text-xs text-gray-600">Vendor</th>
                    <th className="text-right py-3 px-4 text-xs text-gray-600">Outstanding</th>
                    <th className="text-left py-3 px-4 text-xs text-gray-600">Due Date</th>
                    <th className="text-left py-3 px-4 text-xs text-gray-600">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {vendorPayments.map((payment) => {
                    const dueDate = new Date(payment.nextPaymentDue);
                    const today = new Date('2026-04-20');
                    const daysUntilDue = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

                    return (
                      <tr key={payment.vendorId} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm text-gray-900">{payment.vendorName}</td>
                        <td className="py-3 px-4 text-right text-sm font-medium text-gray-900">
                          {formatCurrency(payment.outstandingAmount)}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {new Date(payment.nextPaymentDue).toLocaleDateString('en-IN')}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`text-xs px-2 py-1 rounded ${daysUntilDue < 0 ? 'bg-red-100 text-red-700' :
                              daysUntilDue <= 7 ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                            }`}>
                            {daysUntilDue < 0 ? `${Math.abs(daysUntilDue)} days overdue` :
                              daysUntilDue === 0 ? 'Due today' :
                                `Due in ${daysUntilDue} days`}
                          </span>
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

      <AddVendorModal
        open={isAddVendorModalOpen}
        onOpenChange={setIsAddVendorModalOpen}
        onSuccess={handleVendorAdded}
      />
    </div>
  );
}