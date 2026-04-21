// src/app/pages/finance/ExpensesManagement.tsx
import { useState } from 'react';
import { 
  Receipt, Search, Filter, Download, Plus, Eye, CheckCircle, 
  XCircle, Clock, Calendar, DollarSign, FileText, MoreVertical,
  TrendingUp, AlertCircle, ChevronDown, Upload
} from 'lucide-react';

export default function ExpensesManagement() {
  const [activeTab, setActiveTab] = useState<'claims' | 'pettycash' | 'summary'>('claims');
  const [selectedClaim, setSelectedClaim] = useState<string | null>(null);
  const [showApprovalModal, setShowApprovalModal] = useState(false);

  const expenseClaims = [
    {
      id: 'EXP/2026/042',
      empId: 'NES/EMP/003',
      employee: 'Amit Singh',
      department: 'Sales',
      claimDate: '2026-04-15',
      category: 'Travel',
      description: 'Client meeting in Delhi - Train fare',
      expenseDate: '2026-04-14',
      amount: 2850,
      supportingDoc: 'train_ticket_amit.pdf',
      approvalLevel: 'L2: Finance',
      status: 'Approved by Manager',
      approvedByL1: 'Vikram Singh',
      approvedDateL1: '2026-04-16',
      approvedByL2: null,
      approvedDateL2: null,
      rejectionReason: null,
    },
    {
      id: 'EXP/2026/043',
      empId: 'NES/EMP/001',
      employee: 'Rajesh Kumar',
      department: 'Production',
      claimDate: '2026-04-14',
      category: 'Office Supplies',
      description: 'Safety gloves and masks for production line',
      expenseDate: '2026-04-13',
      amount: 4200,
      supportingDoc: 'invoice_safety.pdf',
      approvalLevel: 'L1: Manager',
      status: 'Pending',
      approvedByL1: null,
      approvedDateL1: null,
      approvedByL2: null,
      approvedDateL2: null,
      rejectionReason: null,
    },
    {
      id: 'EXP/2026/041',
      empId: 'NES/EMP/008',
      employee: 'Meena Kumari',
      department: 'R&D',
      claimDate: '2026-04-12',
      category: 'R&D',
      description: 'Testing equipment consumables',
      expenseDate: '2026-04-11',
      amount: 8750,
      supportingDoc: 'lab_supplies.pdf',
      approvalLevel: 'Completed',
      status: 'Paid',
      approvedByL1: 'Dr. Sharma',
      approvedDateL1: '2026-04-13',
      approvedByL2: 'Neha Gupta',
      approvedDateL2: '2026-04-14',
      rejectionReason: null,
      paidDate: '2026-04-15',
      paymentRef: 'NEFT/2026/1234',
    },
    {
      id: 'EXP/2026/040',
      empId: 'NES/EMP/012',
      employee: 'Ramesh Chandra',
      department: 'Logistics',
      claimDate: '2026-04-10',
      category: 'Fuel',
      description: 'Vehicle fuel for dispatch deliveries',
      expenseDate: '2026-04-09',
      amount: 3200,
      supportingDoc: 'fuel_receipt.pdf',
      approvalLevel: 'Completed',
      status: 'Paid',
      approvedByL1: 'Vikram Singh',
      approvedDateL1: '2026-04-11',
      approvedByL2: 'Neha Gupta',
      approvedDateL2: '2026-04-12',
      rejectionReason: null,
      paidDate: '2026-04-13',
      paymentRef: 'NEFT/2026/1189',
    },
    {
      id: 'EXP/2026/039',
      empId: 'NES/EMP/005',
      employee: 'Vikram Singh',
      department: 'Production',
      claimDate: '2026-04-08',
      category: 'Accommodation',
      description: 'Hotel stay for vendor visit',
      expenseDate: '2026-04-07',
      amount: 4500,
      supportingDoc: 'hotel_bill.pdf',
      approvalLevel: 'L2: Finance',
      status: 'Approved by Manager',
      approvedByL1: 'Plant Head',
      approvedDateL1: '2026-04-09',
      approvedByL2: null,
      approvedDateL2: null,
      rejectionReason: null,
    },
    {
      id: 'EXP/2026/038',
      empId: 'NES/EMP/018',
      employee: 'Suresh Patel',
      department: 'Sales',
      claimDate: '2026-04-05',
      category: 'Client Meeting',
      description: 'Lunch meeting with potential client',
      expenseDate: '2026-04-04',
      amount: 1800,
      supportingDoc: 'restaurant_bill.pdf',
      approvalLevel: 'Completed',
      status: 'Rejected',
      approvedByL1: null,
      approvedDateL1: null,
      approvedByL2: null,
      approvedDateL2: null,
      rejectionReason: 'Exceeds per-meal limit of ₹1000',
    },
  ];

  const pettyCashEntries = [
    {
      id: 'PC/2026/015',
      date: '2026-04-16',
      paidTo: 'Office Boy - Ramesh',
      purpose: 'Tea and refreshments for meeting',
      amount: 350,
      approvedBy: 'Sunita Devi',
      type: 'Payment',
    },
    {
      id: 'PC/2026/014',
      date: '2026-04-15',
      paidTo: 'Stationery Shop',
      purpose: 'Office stationery - pens, notepads',
      amount: 1200,
      approvedBy: 'Sunita Devi',
      type: 'Payment',
    },
    {
      id: 'PC/2026/013',
      date: '2026-04-14',
      paidTo: 'Courier Services',
      purpose: 'Document courier charges',
      amount: 450,
      approvedBy: 'Neha Gupta',
      type: 'Payment',
    },
    {
      id: 'PC/2026/012',
      date: '2026-04-10',
      paidTo: 'Petty Cash Replenishment',
      purpose: 'Monthly replenishment',
      amount: 5000,
      approvedBy: 'Finance Head',
      type: 'Receipt',
    },
  ];

  const monthlySummary = [
    { department: 'Sales', month: 'April 2026', submitted: 12, approved: 10, rejected: 2, totalAmount: 45600 },
    { department: 'Production', month: 'April 2026', submitted: 8, approved: 7, rejected: 1, totalAmount: 32450 },
    { department: 'R&D', month: 'April 2026', submitted: 5, approved: 5, rejected: 0, totalAmount: 28750 },
    { department: 'Logistics', month: 'April 2026', submitted: 6, approved: 6, rejected: 0, totalAmount: 18900 },
    { department: 'HR', month: 'April 2026', submitted: 3, approved: 3, rejected: 0, totalAmount: 5200 },
  ];

  const stats = {
    totalClaimsThisMonth: expenseClaims.filter(c => c.claimDate.startsWith('2026-04')).length,
    pendingApproval: expenseClaims.filter(c => c.status === 'Pending' || c.status === 'Approved by Manager').length,
    totalAmountThisMonth: expenseClaims
      .filter(c => c.claimDate.startsWith('2026-04') && c.status !== 'Rejected')
      .reduce((sum, c) => sum + c.amount, 0),
    pettyCashBalance: 8750,
  };

  const categoryColors: Record<string, string> = {
    'Travel': 'bg-blue-100 text-blue-700',
    'Accommodation': 'bg-purple-100 text-purple-700',
    'Local Conveyance': 'bg-cyan-100 text-cyan-700',
    'Office Supplies': 'bg-green-100 text-green-700',
    'R&D': 'bg-indigo-100 text-indigo-700',
    'Client Meeting': 'bg-orange-100 text-orange-700',
    'Fuel': 'bg-amber-100 text-amber-700',
  };

  const statusColors: Record<string, string> = {
    'Pending': 'bg-yellow-100 text-yellow-700',
    'Approved by Manager': 'bg-blue-100 text-blue-700',
    'Paid': 'bg-green-100 text-green-700',
    'Rejected': 'bg-red-100 text-red-700',
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Travel': return '🚗';
      case 'Accommodation': return '🏨';
      case 'Local Conveyance': return '🚕';
      case 'Office Supplies': return '📎';
      case 'R&D': return '🔬';
      case 'Client Meeting': return '🤝';
      case 'Fuel': return '⛽';
      default: return '📄';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-gray-900">Expenses Management</h1>
          <p className="text-sm text-gray-600">Track and approve employee expense claims</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download className="size-4" />
            Export
          </button>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            <Plus className="size-4" />
            New Expense Claim
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <Receipt className="size-4 text-blue-500" />
            <p className="text-xs text-gray-600">Claims This Month</p>
          </div>
          <p className="text-xl font-bold text-gray-900">{stats.totalClaimsThisMonth}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="size-4 text-yellow-500" />
            <p className="text-xs text-gray-600">Pending Approval</p>
          </div>
          <p className="text-xl font-bold text-gray-900">{stats.pendingApproval}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="size-4 text-green-500" />
            <p className="text-xs text-gray-600">Amount This Month</p>
          </div>
          <p className="text-xl font-bold text-gray-900">₹{stats.totalAmountThisMonth.toLocaleString()}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="size-4 text-purple-500" />
            <p className="text-xs text-gray-600">Petty Cash Balance</p>
          </div>
          <p className="text-xl font-bold text-gray-900">₹{stats.pettyCashBalance.toLocaleString()}</p>
        </div>
      </div>

      {/* View Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex gap-6">
          {(['claims', 'pettycash', 'summary'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab === 'claims' ? 'Expense Claims' : tab === 'pettycash' ? 'Petty Cash' : 'Monthly Summary'}
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
            placeholder="Search by employee, claim ID, or description..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select className="px-4 py-2 border border-gray-300 rounded-lg">
          <option>All Categories</option>
          <option>Travel</option>
          <option>Accommodation</option>
          <option>Office Supplies</option>
          <option>R&D</option>
          <option>Client Meeting</option>
          <option>Fuel</option>
        </select>
        <select className="px-4 py-2 border border-gray-300 rounded-lg">
          <option>All Status</option>
          <option>Pending</option>
          <option>Approved by Manager</option>
          <option>Paid</option>
          <option>Rejected</option>
        </select>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
          <Filter className="size-4" />
          More Filters
        </button>
      </div>

      {/* Content - Expense Claims */}
      {activeTab === 'claims' && (
        <div className="space-y-4">
          {expenseClaims.map((claim) => (
            <div key={claim.id} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-sm transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded ${
                    claim.status === 'Pending' ? 'bg-yellow-50' :
                    claim.status === 'Approved by Manager' ? 'bg-blue-50' :
                    claim.status === 'Paid' ? 'bg-green-50' : 'bg-red-50'
                  }`}>
                    <span className="text-xl">{getCategoryIcon(claim.category)}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-medium text-gray-900">{claim.id}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded ${categoryColors[claim.category]}`}>
                        {claim.category}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded ${statusColors[claim.status]}`}>
                        {claim.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                      <span>{claim.employee} ({claim.empId})</span>
                      <span>•</span>
                      <span>{claim.department}</span>
                      <span>•</span>
                      <span>Claim Date: {new Date(claim.claimDate).toLocaleDateString('en-IN')}</span>
                    </div>
                    <p className="text-sm text-gray-800 mb-2">
                      <span className="font-medium">{claim.description}</span>
                      <span className="text-gray-500 ml-2">(Expense Date: {new Date(claim.expenseDate).toLocaleDateString('en-IN')})</span>
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="font-semibold text-gray-900">₹{claim.amount.toLocaleString()}</span>
                      {claim.supportingDoc && (
                        <button className="text-blue-600 hover:text-blue-700 text-xs flex items-center gap-1">
                          <FileText className="size-3" />
                          {claim.supportingDoc}
                        </button>
                      )}
                    </div>
                    
                    {/* Approval Workflow Info */}
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">L1 (Manager):</span>
                          {claim.approvedByL1 ? (
                            <span className="text-xs text-green-600 flex items-center gap-1">
                              <CheckCircle className="size-3" />
                              {claim.approvedByL1} on {new Date(claim.approvedDateL1!).toLocaleDateString('en-IN')}
                            </span>
                          ) : (
                            <span className="text-xs text-gray-400 flex items-center gap-1">
                              <Clock className="size-3" />
                              Pending
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">L2 (Finance):</span>
                          {claim.approvedByL2 ? (
                            <span className="text-xs text-green-600 flex items-center gap-1">
                              <CheckCircle className="size-3" />
                              {claim.approvedByL2} on {new Date(claim.approvedDateL2!).toLocaleDateString('en-IN')}
                            </span>
                          ) : (
                            <span className="text-xs text-gray-400 flex items-center gap-1">
                              <Clock className="size-3" />
                              {claim.status === 'Rejected' ? 'N/A' : 'Pending'}
                            </span>
                          )}
                        </div>
                        {claim.paidDate && (
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500">Payment:</span>
                            <span className="text-xs text-green-600 flex items-center gap-1">
                              <CheckCircle className="size-3" />
                              {new Date(claim.paidDate).toLocaleDateString('en-IN')} (Ref: {claim.paymentRef})
                            </span>
                          </div>
                        )}
                      </div>
                      {claim.rejectionReason && (
                        <p className="text-xs text-red-600 mt-2 flex items-center gap-1">
                          <XCircle className="size-3" />
                          Rejection Reason: {claim.rejectionReason}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {claim.status === 'Pending' && (
                    <>
                      <button 
                        className="p-2 text-green-600 hover:bg-green-50 rounded"
                        onClick={() => setShowApprovalModal(true)}
                      >
                        <CheckCircle className="size-4" />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded">
                        <XCircle className="size-4" />
                      </button>
                    </>
                  )}
                  {claim.status === 'Approved by Manager' && (
                    <button className="px-3 py-1.5 bg-blue-600 text-white text-xs rounded hover:bg-blue-700">
                      Approve & Pay
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

      {/* Content - Petty Cash */}
      {activeTab === 'pettycash' && (
        <div>
          {/* Petty Cash Summary */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Petty Cash Summary - April 2026</h3>
              </div>
              <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm">
                <Plus className="size-4" />
                New Voucher
              </button>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="p-3 bg-gray-50 rounded">
                <p className="text-xs text-gray-500">Opening Balance</p>
                <p className="text-lg font-semibold text-gray-900">₹10,000</p>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <p className="text-xs text-gray-500">Total Receipts</p>
                <p className="text-lg font-semibold text-green-600">+₹5,000</p>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <p className="text-xs text-gray-500">Total Payments</p>
                <p className="text-lg font-semibold text-red-600">-₹6,250</p>
              </div>
            </div>
            <div className="mt-3 p-3 bg-blue-50 rounded">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Closing Balance</span>
                <span className="text-lg font-bold text-blue-700">₹8,750</span>
              </div>
            </div>
          </div>

          {/* Petty Cash Transactions */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left py-3 px-4 text-xs text-gray-600">Voucher ID</th>
                    <th className="text-left py-3 px-4 text-xs text-gray-600">Date</th>
                    <th className="text-left py-3 px-4 text-xs text-gray-600">Paid To / Received From</th>
                    <th className="text-left py-3 px-4 text-xs text-gray-600">Purpose</th>
                    <th className="text-left py-3 px-4 text-xs text-gray-600">Type</th>
                    <th className="text-right py-3 px-4 text-xs text-gray-600">Amount</th>
                    <th className="text-left py-3 px-4 text-xs text-gray-600">Approved By</th>
                    <th className="text-right py-3 px-4 text-xs text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pettyCashEntries.map((entry) => (
                    <tr key={entry.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-800 font-mono">{entry.id}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {new Date(entry.date).toLocaleDateString('en-IN')}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-900">{entry.paidTo}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{entry.purpose}</td>
                      <td className="py-3 px-4">
                        <span className={`text-xs px-2 py-1 rounded ${
                          entry.type === 'Receipt' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                        }`}>
                          {entry.type}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className={`text-sm font-medium ${
                          entry.type === 'Receipt' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {entry.type === 'Receipt' ? '+' : '-'}₹{entry.amount.toLocaleString()}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">{entry.approvedBy}</td>
                      <td className="py-3 px-4 text-right">
                        <button className="text-blue-600 hover:text-blue-700 p-1">
                          <Eye className="size-4" />
                        </button>
                        <button className="text-gray-400 hover:text-gray-600 p-1">
                          <MoreVertical className="size-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Content - Monthly Summary */}
      {activeTab === 'summary' && (
        <div className="space-y-6">
          {/* Month Selector */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded">
                <ChevronDown className="size-5 rotate-90" />
              </button>
              <h3 className="font-medium text-gray-900">April 2026</h3>
              <button className="p-2 hover:bg-gray-100 rounded">
                <ChevronDown className="size-5 -rotate-90" />
              </button>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Download className="size-4" />
              Export Summary
            </button>
          </div>

          {/* Department Summary */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left py-3 px-4 text-xs text-gray-600">Department</th>
                    <th className="text-left py-3 px-4 text-xs text-gray-600">Month</th>
                    <th className="text-right py-3 px-4 text-xs text-gray-600">Claims Submitted</th>
                    <th className="text-right py-3 px-4 text-xs text-gray-600">Claims Approved</th>
                    <th className="text-right py-3 px-4 text-xs text-gray-600">Claims Rejected</th>
                    <th className="text-right py-3 px-4 text-xs text-gray-600">Total Amount</th>
                    <th className="text-right py-3 px-4 text-xs text-gray-600">Approval Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {monthlySummary.map((dept) => (
                    <tr key={dept.department} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm font-medium text-gray-900">{dept.department}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{dept.month}</td>
                      <td className="py-3 px-4 text-right text-sm text-gray-900">{dept.submitted}</td>
                      <td className="py-3 px-4 text-right text-sm text-green-600">{dept.approved}</td>
                      <td className="py-3 px-4 text-right text-sm text-red-600">{dept.rejected}</td>
                      <td className="py-3 px-4 text-right text-sm font-medium text-gray-900">
                        ₹{dept.totalAmount.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <div className="w-16 bg-gray-200 rounded-full h-1.5">
                            <div 
                              className="bg-green-500 h-1.5 rounded-full" 
                              style={{ width: `${(dept.approved / dept.submitted) * 100}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-600">
                            {Math.round((dept.approved / dept.submitted) * 100)}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-50 border-t border-gray-200">
                    <td colSpan={2} className="py-3 px-4 text-sm font-medium text-gray-900">Total</td>
                    <td className="py-3 px-4 text-right text-sm font-medium text-gray-900">
                      {monthlySummary.reduce((sum, d) => sum + d.submitted, 0)}
                    </td>
                    <td className="py-3 px-4 text-right text-sm font-medium text-green-600">
                      {monthlySummary.reduce((sum, d) => sum + d.approved, 0)}
                    </td>
                    <td className="py-3 px-4 text-right text-sm font-medium text-red-600">
                      {monthlySummary.reduce((sum, d) => sum + d.rejected, 0)}
                    </td>
                    <td className="py-3 px-4 text-right text-sm font-bold text-gray-900">
                      ₹{monthlySummary.reduce((sum, d) => sum + d.totalAmount, 0).toLocaleString()}
                    </td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Category-wise Breakdown */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Category-wise Expense Breakdown - April 2026</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Travel</span>
                <div className="flex items-center gap-4">
                  <div className="w-64 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '35%' }} />
                  </div>
                  <span className="text-sm font-medium text-gray-900">₹42,500</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Office Supplies</span>
                <div className="flex items-center gap-4">
                  <div className="w-64 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '20%' }} />
                  </div>
                  <span className="text-sm font-medium text-gray-900">₹24,300</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">R&D</span>
                <div className="flex items-center gap-4">
                  <div className="w-64 bg-gray-200 rounded-full h-2">
                    <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '18%' }} />
                  </div>
                  <span className="text-sm font-medium text-gray-900">₹21,800</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Fuel</span>
                <div className="flex items-center gap-4">
                  <div className="w-64 bg-gray-200 rounded-full h-2">
                    <div className="bg-amber-500 h-2 rounded-full" style={{ width: '12%' }} />
                  </div>
                  <span className="text-sm font-medium text-gray-900">₹14,500</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Client Meeting</span>
                <div className="flex items-center gap-4">
                  <div className="w-64 bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full" style={{ width: '10%' }} />
                  </div>
                  <span className="text-sm font-medium text-gray-900">₹12,200</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Accommodation</span>
                <div className="flex items-center gap-4">
                  <div className="w-64 bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '5%' }} />
                  </div>
                  <span className="text-sm font-medium text-gray-900">₹6,100</span>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Total Expenses</span>
                <span className="text-lg font-bold text-gray-900">₹121,400</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}