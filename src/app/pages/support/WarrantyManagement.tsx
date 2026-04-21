// src/app/pages/support/WarrantyManagement.tsx
import { useState } from 'react';
import { 
  Shield, RotateCcw, Search, Filter, Download, Plus, Eye,
  MoreVertical, Calendar, Package, Truck, CheckCircle, XCircle,
  Clock, AlertCircle, FileText, Wrench, DollarSign, User,
  ChevronDown, ClipboardCheck, ArrowRightLeft, QrCode
} from 'lucide-react';

export default function WarrantyManagement() {
  const [activeTab, setActiveTab] = useState<'rma' | 'inspection' | 'repair' | 'claim' | 'dispatch'>('rma');
  const [selectedRMA, setSelectedRMA] = useState<string | null>(null);

  const rmaRecords = [
    {
      id: 'RMA/2026/045',
      ticketId: 'TKT/2026/088',
      salesOrderId: 'SO/2026/088',
      customerName: 'Mumbai Auto Electricals',
      productSerial: 'NES200AH-2026-01234',
      batteryModel: 'Inverter Battery 200AH',
      returnAuthDate: '2026-04-14',
      reasonForReturn: 'Low backup time, capacity degradation',
      expectedReceiptDate: '2026-04-18',
      actualReceiptDate: '2026-04-17',
      status: 'Under Inspection',
      priority: 'Medium',
    },
    {
      id: 'RMA/2026/044',
      ticketId: 'TKT/2026/087',
      salesOrderId: 'SO/2026/087',
      customerName: 'Chennai Battery House',
      productSerial: 'NES120AH-2025-0890',
      batteryModel: 'E-Rickshaw Battery 120AH',
      returnAuthDate: '2026-04-13',
      reasonForReturn: 'Terminal corrosion and loose connection',
      expectedReceiptDate: '2026-04-16',
      actualReceiptDate: '2026-04-15',
      status: 'Repaired',
      priority: 'Low',
    },
    {
      id: 'RMA/2026/043',
      ticketId: 'TKT/2026/085',
      salesOrderId: 'SO/2026/085',
      customerName: 'Kolkata Power Solutions',
      productSerial: 'NES40AH-2026-0056',
      batteryModel: 'Solar Battery 40AH',
      returnAuthDate: '2026-04-10',
      reasonForReturn: 'Not charging from solar panel',
      expectedReceiptDate: '2026-04-14',
      actualReceiptDate: '2026-04-13',
      status: 'Replaced',
      priority: 'High',
    },
    {
      id: 'RMA/2026/042',
      ticketId: 'TKT/2026/082',
      salesOrderId: 'SO/2026/080',
      customerName: 'Delhi Batteries Pvt Ltd',
      productSerial: 'NES150AH-2025-2345',
      batteryModel: 'Automotive Battery 150AH',
      returnAuthDate: '2026-04-05',
      reasonForReturn: 'Physical damage, container crack',
      expectedReceiptDate: '2026-04-09',
      actualReceiptDate: '2026-04-08',
      status: 'Scrapped',
      priority: 'Medium',
    },
    {
      id: 'RMA/2026/046',
      ticketId: 'TKT/2026/090',
      salesOrderId: 'SO/2026/091',
      customerName: 'Jaipur Auto Parts',
      productSerial: 'NES100AH-2026-0078',
      batteryModel: 'Automotive Battery 100AH',
      returnAuthDate: '2026-04-16',
      reasonForReturn: 'Not holding charge',
      expectedReceiptDate: '2026-04-20',
      actualReceiptDate: null,
      status: 'Authorized',
      priority: 'High',
    },
  ];

  const inspections = [
    {
      id: 'INS/2026/045',
      rmaId: 'RMA/2026/045',
      inspectionDate: '2026-04-17',
      visualFindings: 'No visible damage, terminals clean',
      voltageReading: '10.2V',
      capacityTestResult: '165AH (82.5% of rated)',
      verdict: 'Manufacturing Defect',
      inspectedBy: 'Priya Sharma',
      remarks: 'Capacity degradation due to weak cells',
    },
    {
      id: 'INS/2026/044',
      rmaId: 'RMA/2026/044',
      inspectionDate: '2026-04-15',
      visualFindings: 'Terminal corrosion, loose connectors',
      voltageReading: '12.1V',
      capacityTestResult: '115AH (95.8% of rated)',
      verdict: 'Normal Wear & Tear',
      inspectedBy: 'Amit Kumar',
      remarks: 'Terminal issue due to environmental factors',
    },
    {
      id: 'INS/2026/043',
      rmaId: 'RMA/2026/043',
      inspectionDate: '2026-04-13',
      visualFindings: 'No physical damage',
      voltageReading: '11.8V',
      capacityTestResult: '28AH (70% of rated)',
      verdict: 'Manufacturing Defect',
      inspectedBy: 'Priya Sharma',
      remarks: 'Internal cell failure',
    },
    {
      id: 'INS/2026/042',
      rmaId: 'RMA/2026/042',
      inspectionDate: '2026-04-08',
      visualFindings: 'Container crack near handle, impact marks',
      voltageReading: '0V',
      capacityTestResult: 'N/A',
      verdict: 'Customer Misuse',
      inspectedBy: 'Amit Kumar',
      remarks: 'Physical damage due to mishandling',
    },
  ];

  const repairJobCards = [
    {
      id: 'JOB/2026/045',
      rmaId: 'RMA/2026/045',
      batterySerial: 'NES200AH-2026-01234',
      technician: 'Dinesh Rawat',
      startTime: '2026-04-17 09:00',
      endTime: '2026-04-17 14:30',
      laborHours: 5.5,
      partsConsumed: [
        { name: 'Cell Connectors', qty: 6, cost: 180 },
        { name: 'Terminal Bolts', qty: 2, cost: 40 },
      ],
      totalRepairCost: 220,
      status: 'In Progress',
    },
    {
      id: 'JOB/2026/044',
      rmaId: 'RMA/2026/044',
      batterySerial: 'NES120AH-2025-0890',
      technician: 'Suresh Patel',
      startTime: '2026-04-15 10:00',
      endTime: '2026-04-15 12:30',
      laborHours: 2.5,
      partsConsumed: [
        { name: 'Terminal Connectors', qty: 2, cost: 120 },
        { name: 'Anti-Corrosion Gel', qty: 1, cost: 50 },
      ],
      totalRepairCost: 170,
      status: 'Completed',
    },
  ];

  const warrantyClaims = [
    {
      id: 'CLAIM/2026/045',
      rmaId: 'RMA/2026/045',
      warrantyStatus: 'Within Warranty',
      claimAmount: 0,
      approved: true,
      approvedBy: 'Quality Head',
      approvalDate: '2026-04-17',
      replacementSerial: null,
      claimType: 'Repair',
    },
    {
      id: 'CLAIM/2026/044',
      rmaId: 'RMA/2026/044',
      warrantyStatus: 'Out of Warranty',
      claimAmount: 620,
      approved: true,
      approvedBy: 'Service Manager',
      approvalDate: '2026-04-15',
      replacementSerial: null,
      claimType: 'Repair',
    },
    {
      id: 'CLAIM/2026/043',
      rmaId: 'RMA/2026/043',
      warrantyStatus: 'Within Warranty',
      claimAmount: 0,
      approved: true,
      approvedBy: 'Quality Head',
      approvalDate: '2026-04-14',
      replacementSerial: 'NES40AH-2026-0456',
      claimType: 'Replacement',
    },
    {
      id: 'CLAIM/2026/042',
      rmaId: 'RMA/2026/042',
      warrantyStatus: 'Within Warranty',
      claimAmount: 0,
      approved: false,
      approvedBy: null,
      approvalDate: null,
      replacementSerial: null,
      claimType: 'Rejected',
    },
  ];

  const dispatchTrackings = [
    {
      rmaId: 'RMA/2026/044',
      outwardDCNumber: 'DC/RMA/2026/012',
      courier: 'Blue Dart',
      transporterDetails: 'Surface Express',
      trackingNumber: 'BD123456789IN',
      dispatchDate: '2026-04-16',
      expectedDelivery: '2026-04-19',
      status: 'In Transit',
    },
    {
      rmaId: 'RMA/2026/043',
      outwardDCNumber: 'DC/RMA/2026/011',
      courier: 'DTDC',
      transporterDetails: 'Air Cargo',
      trackingNumber: 'DT987654321IN',
      dispatchDate: '2026-04-15',
      expectedDelivery: '2026-04-17',
      status: 'Delivered',
    },
  ];

  const stats = {
    totalRMA: rmaRecords.length,
    pendingInspection: rmaRecords.filter(r => r.status === 'Received' || r.status === 'Under Inspection').length,
    underRepair: rmaRecords.filter(r => r.status === 'Under Repair').length,
    approvedClaims: warrantyClaims.filter(c => c.approved).length,
    pendingDispatch: rmaRecords.filter(r => r.status === 'Repaired' || r.status === 'Replaced').length,
  };

  const rmaStatusColors: Record<string, string> = {
    'Authorized': 'bg-blue-100 text-blue-700',
    'Received': 'bg-cyan-100 text-cyan-700',
    'Under Inspection': 'bg-yellow-100 text-yellow-700',
    'Under Repair': 'bg-orange-100 text-orange-700',
    'Repaired': 'bg-green-100 text-green-700',
    'Replaced': 'bg-purple-100 text-purple-700',
    'Scrapped': 'bg-red-100 text-red-700',
    'Closed': 'bg-gray-100 text-gray-700',
  };

  const verdictColors: Record<string, string> = {
    'Manufacturing Defect': 'bg-red-100 text-red-700',
    'Customer Misuse': 'bg-orange-100 text-orange-700',
    'Normal Wear & Tear': 'bg-blue-100 text-blue-700',
  };

  const warrantyStatusColors: Record<string, string> = {
    'Within Warranty': 'bg-green-100 text-green-700',
    'Out of Warranty': 'bg-orange-100 text-orange-700',
    'Extended Warranty': 'bg-blue-100 text-blue-700',
  };

  const priorityColors: Record<string, string> = {
    'High': 'bg-red-100 text-red-700',
    'Medium': 'bg-orange-100 text-orange-700',
    'Low': 'bg-green-100 text-green-700',
  };

  const formatDate = (date: string | null) => {
    if (!date) return '—';
    return new Date(date).toLocaleDateString('en-IN');
  };

  const formatDateTime = (dateTime: string | null) => {
    if (!dateTime) return '—';
    return new Date(dateTime).toLocaleString('en-IN');
  };

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-gray-900">Warranty Management</h1>
          <p className="text-sm text-gray-600">Track RMA, repairs, and warranty claims</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download className="size-4" />
            Export
          </button>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            <Plus className="size-4" />
            New RMA
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <RotateCcw className="size-4 text-blue-500" />
            <p className="text-xs text-gray-600">Total RMA</p>
          </div>
          <p className="text-xl font-bold text-gray-900">{stats.totalRMA}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <Search className="size-4 text-yellow-500" />
            <p className="text-xs text-gray-600">Pending Inspection</p>
          </div>
          <p className="text-xl font-bold text-gray-900">{stats.pendingInspection}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <Wrench className="size-4 text-orange-500" />
            <p className="text-xs text-gray-600">Under Repair</p>
          </div>
          <p className="text-xl font-bold text-gray-900">{stats.underRepair}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="size-4 text-green-500" />
            <p className="text-xs text-gray-600">Approved Claims</p>
          </div>
          <p className="text-xl font-bold text-gray-900">{stats.approvedClaims}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <Truck className="size-4 text-purple-500" />
            <p className="text-xs text-gray-600">Pending Dispatch</p>
          </div>
          <p className="text-xl font-bold text-gray-900">{stats.pendingDispatch}</p>
        </div>
      </div>

      {/* View Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex gap-6 overflow-x-auto">
          {(['rma', 'inspection', 'repair', 'claim', 'dispatch'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab === 'rma' ? 'RMA Workflow' : 
               tab === 'inspection' ? 'Inspection' : 
               tab === 'repair' ? 'Repair Job Card' : 
               tab === 'claim' ? 'Warranty Claims' : 'Dispatch Tracking'}
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
            placeholder="Search by RMA ID, ticket ID, or serial number..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select className="px-4 py-2 border border-gray-300 rounded-lg">
          <option>All Status</option>
          <option>Authorized</option>
          <option>Received</option>
          <option>Under Inspection</option>
          <option>Under Repair</option>
          <option>Repaired</option>
          <option>Replaced</option>
        </select>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
          <Filter className="size-4" />
          Filter
        </button>
      </div>

      {/* Content - RMA Workflow */}
      {activeTab === 'rma' && (
        <div className="space-y-4">
          {rmaRecords.map((rma) => (
            <div key={rma.id} className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-blue-50 rounded">
                    <RotateCcw className="size-5 text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                      <h3 className="font-medium text-gray-900">{rma.id}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded ${rmaStatusColors[rma.status]}`}>
                        {rma.status}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded ${priorityColors[rma.priority]}`}>
                        {rma.priority} Priority
                      </span>
                      <span className="text-xs text-gray-400">|</span>
                      <span className="text-sm text-gray-600">Ticket: {rma.ticketId}</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 mt-2">
                      <div>
                        <p className="text-xs text-gray-500">Customer</p>
                        <p className="text-sm font-medium">{rma.customerName}</p>
                        <p className="text-xs text-gray-500">SO: {rma.salesOrderId}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Product</p>
                        <p className="text-sm">{rma.batteryModel}</p>
                        <p className="text-xs text-gray-500 font-mono">S/N: {rma.productSerial}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-2">
                      <div>
                        <p className="text-xs text-gray-500">Return Authorization Date</p>
                        <p className="text-sm">{formatDate(rma.returnAuthDate)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Reason for Return</p>
                        <p className="text-sm text-gray-800">{rma.reasonForReturn}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-2">
                      <div>
                        <p className="text-xs text-gray-500">Expected Receipt</p>
                        <p className="text-sm">{formatDate(rma.expectedReceiptDate)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Actual Receipt</p>
                        <p className="text-sm">{formatDate(rma.actualReceiptDate)}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {rma.status === 'Authorized' && (
                    <button className="px-3 py-1.5 bg-green-600 text-white text-xs rounded hover:bg-green-700">
                      Mark Received
                    </button>
                  )}
                  {rma.status === 'Received' && (
                    <button className="px-3 py-1.5 bg-yellow-600 text-white text-xs rounded hover:bg-yellow-700">
                      Start Inspection
                    </button>
                  )}
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

      {/* Content - Inspection */}
      {activeTab === 'inspection' && (
        <div className="space-y-4">
          {inspections.map((inspection) => {
            const rma = rmaRecords.find(r => r.id === inspection.rmaId);
            return (
              <div key={inspection.id} className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-purple-50 rounded">
                    <ClipboardCheck className="size-5 text-purple-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-medium text-gray-900">{inspection.id}</h3>
                      <span className="text-xs text-gray-400">|</span>
                      <span className="text-sm text-gray-600">RMA: {inspection.rmaId}</span>
                      <span className="text-xs text-gray-400">|</span>
                      <span className="text-sm text-gray-600">{rma?.customerName}</span>
                      <span className={`text-xs px-2 py-0.5 rounded ${verdictColors[inspection.verdict]}`}>
                        {inspection.verdict}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <p className="text-xs text-gray-500">Visual Inspection Findings</p>
                        <p className="text-sm text-gray-800">{inspection.visualFindings}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Test Results</p>
                        <p className="text-sm">Voltage: {inspection.voltageReading}</p>
                        <p className="text-sm">Capacity: {inspection.capacityTestResult}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <p className="text-xs text-gray-500">Inspected By</p>
                        <p className="text-sm">{inspection.inspectedBy}</p>
                        <p className="text-xs text-gray-500">{formatDate(inspection.inspectionDate)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Remarks</p>
                        <p className="text-sm text-gray-800">{inspection.remarks}</p>
                      </div>
                    </div>
                  </div>
                  {rma?.status === 'Under Inspection' && (
                    <button className="px-3 py-1.5 bg-blue-600 text-white text-xs rounded hover:bg-blue-700">
                      Create Job Card
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Content - Repair Job Card */}
      {activeTab === 'repair' && (
        <div className="space-y-4">
          {repairJobCards.map((job) => {
            const rma = rmaRecords.find(r => r.id === job.rmaId);
            return (
              <div key={job.id} className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-orange-50 rounded">
                    <Wrench className="size-5 text-orange-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-medium text-gray-900">{job.id}</h3>
                      <span className="text-xs text-gray-400">|</span>
                      <span className="text-sm text-gray-600">RMA: {job.rmaId}</span>
                      <span className="text-xs text-gray-400">|</span>
                      <span className="text-sm font-mono text-gray-600">S/N: {job.batterySerial}</span>
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        job.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {job.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <p className="text-xs text-gray-500">Technician</p>
                        <p className="text-sm font-medium">{job.technician}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Labor Hours</p>
                        <p className="text-sm">{job.laborHours} hours</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Start Time</p>
                        <p className="text-sm">{formatDateTime(job.startTime)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">End Time</p>
                        <p className="text-sm">{formatDateTime(job.endTime)}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500 mb-2">Spare Parts Consumed</p>
                      <div className="bg-gray-50 rounded p-3">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-gray-200">
                              <th className="text-left py-1 text-xs text-gray-500">Part Name</th>
                              <th className="text-right py-1 text-xs text-gray-500">Qty</th>
                              <th className="text-right py-1 text-xs text-gray-500">Cost</th>
                            </tr>
                          </thead>
                          <tbody>
                            {job.partsConsumed.map((part, idx) => (
                              <tr key={idx}>
                                <td className="py-1">{part.name}</td>
                                <td className="py-1 text-right">{part.qty}</td>
                                <td className="py-1 text-right">{formatCurrency(part.cost)}</td>
                              </tr>
                            ))}
                          </tbody>
                          <tfoot>
                            <tr className="border-t border-gray-200">
                              <td colSpan={2} className="pt-2 text-right text-xs text-gray-500">Total Repair Cost:</td>
                              <td className="pt-2 text-right font-medium">{formatCurrency(job.totalRepairCost)}</td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    </div>
                  </div>
                  {job.status === 'In Progress' && (
                    <button className="px-3 py-1.5 bg-green-600 text-white text-xs rounded hover:bg-green-700">
                      Complete Repair
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Content - Warranty Claims */}
      {activeTab === 'claim' && (
        <div className="space-y-4">
          {warrantyClaims.map((claim) => {
            const rma = rmaRecords.find(r => r.id === claim.rmaId);
            return (
              <div key={claim.id} className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-green-50 rounded">
                    <Shield className="size-5 text-green-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-medium text-gray-900">{claim.id}</h3>
                      <span className="text-xs text-gray-400">|</span>
                      <span className="text-sm text-gray-600">RMA: {claim.rmaId}</span>
                      <span className="text-xs text-gray-400">|</span>
                      <span className="text-sm text-gray-600">{rma?.customerName}</span>
                      <span className={`text-xs px-2 py-0.5 rounded ${warrantyStatusColors[claim.warrantyStatus]}`}>
                        {claim.warrantyStatus}
                      </span>
                      {claim.approved ? (
                        <span className="text-xs px-2 py-0.5 rounded bg-green-100 text-green-700 flex items-center gap-1">
                          <CheckCircle className="size-3" />
                          Approved
                        </span>
                      ) : (
                        claim.claimType === 'Rejected' ? (
                          <span className="text-xs px-2 py-0.5 rounded bg-red-100 text-red-700 flex items-center gap-1">
                            <XCircle className="size-3" />
                            Rejected
                          </span>
                        ) : (
                          <span className="text-xs px-2 py-0.5 rounded bg-yellow-100 text-yellow-700">Pending</span>
                        )
                      )}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <p className="text-xs text-gray-500">Claim Type</p>
                        <p className="text-sm font-medium">{claim.claimType}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Claim Amount</p>
                        <p className="text-sm font-medium">
                          {claim.claimAmount > 0 ? formatCurrency(claim.claimAmount) : 'Waived (Under Warranty)'}
                        </p>
                      </div>
                      {claim.approved && (
                        <>
                          <div>
                            <p className="text-xs text-gray-500">Approved By</p>
                            <p className="text-sm">{claim.approvedBy}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Approval Date</p>
                            <p className="text-sm">{formatDate(claim.approvalDate)}</p>
                          </div>
                        </>
                      )}
                    </div>

                    {claim.replacementSerial && (
                      <div className="p-3 bg-blue-50 rounded">
                        <p className="text-xs text-gray-500">Replacement Battery</p>
                        <p className="text-sm font-mono font-medium">{claim.replacementSerial}</p>
                      </div>
                    )}
                  </div>
                  {!claim.approved && claim.claimType !== 'Rejected' && (
                    <div className="flex gap-2">
                      <button className="px-3 py-1.5 bg-green-600 text-white text-xs rounded hover:bg-green-700">
                        Approve
                      </button>
                      <button className="px-3 py-1.5 bg-red-600 text-white text-xs rounded hover:bg-red-700">
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Content - Dispatch Tracking */}
      {activeTab === 'dispatch' && (
        <div className="space-y-4">
          {dispatchTrackings.map((dispatch) => {
            const rma = rmaRecords.find(r => r.id === dispatch.rmaId);
            return (
              <div key={dispatch.rmaId} className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-cyan-50 rounded">
                    <Truck className="size-5 text-cyan-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-medium text-gray-900">RMA: {dispatch.rmaId}</h3>
                      <span className="text-xs text-gray-400">|</span>
                      <span className="text-sm text-gray-600">{rma?.customerName}</span>
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        dispatch.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {dispatch.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <p className="text-xs text-gray-500">DC Number</p>
                        <p className="text-sm font-mono">{dispatch.outwardDCNumber}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Courier</p>
                        <p className="text-sm">{dispatch.courier}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Transporter Details</p>
                        <p className="text-sm">{dispatch.transporterDetails}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Tracking Number</p>
                        <p className="text-sm font-mono">{dispatch.trackingNumber}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Dispatch Date</p>
                        <p className="text-sm">{formatDate(dispatch.dispatchDate)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Expected Delivery</p>
                        <p className="text-sm">{formatDate(dispatch.expectedDelivery)}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <QrCode className="size-4 text-gray-400" />
                      <span className="text-sm text-blue-600 hover:underline cursor-pointer">
                        Track Shipment: {dispatch.trackingNumber}
                      </span>
                    </div>
                  </div>
                  <button className="p-2 text-gray-400 hover:text-blue-600 rounded">
                    <Eye className="size-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}