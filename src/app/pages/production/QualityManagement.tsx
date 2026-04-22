// src/app/pages/production/QualityManagement.tsx
import { useState } from 'react';
import {
  Shield, CheckCircle, XCircle, AlertTriangle, ClipboardCheck,
  Search, Filter, Download, Plus, Eye, MoreVertical,
  Calendar, Clock, Users, Package, TrendingUp, ChevronDown,
  BarChart3, Target, FileText, Wrench, RotateCcw
} from 'lucide-react';
import { NewQCCheckModal } from '../../components/production/NewQCCheckModal';

export default function QualityManagement() {
  const [activeTab, setActiveTab] = useState<'inprocess' | 'finished' | 'defects' | 'report' | 'capa'>('inprocess');
  const [isNewQCCheckModalOpen, setIsNewQCCheckModalOpen] = useState(false);

  const inProcessQC = [
    {
      id: 'QC/IP/2026/156',
      stage: 'Paste Mixing',
      batchNumber: 'BATCH/2026/042',
      specification: 'Density: 4.2-4.5 g/cm³',
      standardValue: '4.2-4.5',
      measuredValue: '4.38',
      unit: 'g/cm³',
      result: 'Pass',
      checkedBy: 'Priya Sharma',
      timestamp: '2026-04-15 08:30',
    },
    {
      id: 'QC/IP/2026/157',
      stage: 'Plate Weight Check',
      batchNumber: 'BATCH/2026/042',
      specification: 'Weight: 125-130g',
      standardValue: '125-130',
      measuredValue: '128',
      unit: 'g',
      result: 'Pass',
      checkedBy: 'Priya Sharma',
      timestamp: '2026-04-15 11:45',
    },
    {
      id: 'QC/IP/2026/158',
      stage: 'Assembly Check',
      batchNumber: 'BATCH/2026/042',
      specification: 'Torque: 8-10 Nm',
      standardValue: '8-10',
      measuredValue: '7.5',
      unit: 'Nm',
      result: 'Fail',
      checkedBy: 'Rahul Verma',
      timestamp: '2026-04-15 14:20',
    },
    {
      id: 'QC/IP/2026/155',
      stage: 'Paste Density Check',
      batchNumber: 'BATCH/2026/041',
      specification: 'Density: 4.2-4.5 g/cm³',
      standardValue: '4.2-4.5',
      measuredValue: '4.41',
      unit: 'g/cm³',
      result: 'Pass',
      checkedBy: 'Priya Sharma',
      timestamp: '2026-04-14 09:15',
    },
  ];

  const finishedGoodsQC = [
    {
      id: 'QC/FG/2026/089',
      batchNumber: 'BATCH/2026/041',
      testType: 'Capacity Test',
      specification: '≥ 150AH',
      measuredValue: '152AH',
      result: 'Pass',
      remarks: 'Within specification',
      complianceStandard: 'IS 14257',
      testedBy: 'Amit Kumar',
      testDate: '2026-04-16',
    },
    {
      id: 'QC/FG/2026/090',
      batchNumber: 'BATCH/2026/041',
      testType: 'HRD Test',
      specification: '≥ 12.6V',
      measuredValue: '12.72V',
      result: 'Pass',
      remarks: 'Good performance',
      complianceStandard: 'IS 14257',
      testedBy: 'Amit Kumar',
      testDate: '2026-04-16',
    },
    {
      id: 'QC/FG/2026/091',
      batchNumber: 'BATCH/2026/041',
      testType: 'Visual Inspection',
      specification: 'No visible defects',
      measuredValue: 'Pass',
      result: 'Pass',
      remarks: 'No issues found',
      complianceStandard: 'Customer Spec',
      testedBy: 'Sneha Gupta',
      testDate: '2026-04-16',
    },
    {
      id: 'QC/FG/2026/092',
      batchNumber: 'BATCH/2026/041',
      testType: 'Short Circuit Test',
      specification: 'No leakage/spark',
      measuredValue: 'Pass',
      result: 'Pass',
      remarks: 'Test passed',
      complianceStandard: 'IS 1651',
      testedBy: 'Amit Kumar',
      testDate: '2026-04-16',
    },
    {
      id: 'QC/FG/2026/085',
      batchNumber: 'BATCH/2026/040',
      testType: 'Capacity Test',
      specification: '≥ 200AH',
      measuredValue: '195AH',
      result: 'Fail',
      remarks: 'Below rated capacity',
      complianceStandard: 'IS 14257',
      testedBy: 'Amit Kumar',
      testDate: '2026-04-12',
    },
  ];

  const defectLog = [
    {
      id: 'REJ/2026/045',
      date: '2026-04-15',
      batchNumber: 'BATCH/2026/042',
      defectType: 'Welding Defect',
      severity: 'Major',
      quantityRejected: 12,
      actionTaken: 'Rework',
      reportedBy: 'Priya Sharma',
      status: 'Reworked',
    },
    {
      id: 'REJ/2026/044',
      date: '2026-04-14',
      batchNumber: 'BATCH/2026/041',
      defectType: 'Low Voltage',
      severity: 'Critical',
      quantityRejected: 3,
      actionTaken: 'Scrap',
      reportedBy: 'Amit Kumar',
      status: 'Scrapped',
    },
    {
      id: 'REJ/2026/043',
      date: '2026-04-13',
      batchNumber: 'BATCH/2026/040',
      defectType: 'Container Defect',
      severity: 'Minor',
      quantityRejected: 5,
      actionTaken: 'Rework',
      reportedBy: 'Sneha Gupta',
      status: 'Reworked',
    },
    {
      id: 'REJ/2026/042',
      date: '2026-04-12',
      batchNumber: 'BATCH/2026/039',
      defectType: 'Physical Damage',
      severity: 'Major',
      quantityRejected: 8,
      actionTaken: 'Scrap',
      reportedBy: 'Rahul Verma',
      status: 'Scrapped',
    },
  ];

  const qualityReports = [
    {
      batchNumber: 'BATCH/2026/042',
      totalProduced: 500,
      totalPassed: 480,
      totalRejected: 20,
      passRate: 96.0,
      reportDate: '2026-04-16',
    },
    {
      batchNumber: 'BATCH/2026/041',
      totalProduced: 200,
      totalPassed: 197,
      totalRejected: 3,
      passRate: 98.5,
      reportDate: '2026-04-15',
    },
    {
      batchNumber: 'BATCH/2026/040',
      totalProduced: 300,
      totalPassed: 285,
      totalRejected: 15,
      passRate: 95.0,
      reportDate: '2026-04-13',
    },
    {
      batchNumber: 'BATCH/2026/039',
      totalProduced: 400,
      totalPassed: 388,
      totalRejected: 12,
      passRate: 97.0,
      reportDate: '2026-04-10',
    },
  ];

  const capaRecords = [
    {
      id: 'CAPA/2026/008',
      complaintId: 'COMP/2026/023',
      customerName: 'Delhi Batteries Pvt Ltd',
      batterySerial: 'NES150AH-2026-04567',
      batchNumber: 'BATCH/2026/038',
      complaintDescription: 'Battery not holding charge, fails within 4 hours',
      rca: 'Improper formation charging - plates not fully formed',
      correctiveAction: 'Re-calibrated formation charger, increased charging time by 2 hours',
      preventiveAction: 'Added formation charging duration check in QC checklist, weekly charger calibration',
      reportedDate: '2026-04-05',
      targetClosureDate: '2026-04-15',
      closureStatus: 'Closed',
      verifiedBy: 'Quality Head',
      verifiedDate: '2026-04-14',
    },
    {
      id: 'CAPA/2026/007',
      complaintId: 'COMP/2026/021',
      customerName: 'Mumbai Auto Electricals',
      batterySerial: 'NES200AH-2026-01234',
      batchNumber: 'BATCH/2026/037',
      complaintDescription: 'Terminal corrosion within 1 month of purchase',
      rca: 'Improper sealing of terminal post area allowing acid leakage',
      correctiveAction: 'Replaced battery under warranty, improved sealing process',
      preventiveAction: 'Added terminal seal integrity test in final QC, upgraded sealing compound',
      reportedDate: '2026-03-28',
      targetClosureDate: '2026-04-20',
      closureStatus: 'Open',
      verifiedBy: null,
      verifiedDate: null,
    },
    {
      id: 'CAPA/2026/006',
      complaintId: 'COMP/2026/019',
      customerName: 'Chennai Battery House',
      batterySerial: 'NES120AH-2026-00890',
      batchNumber: 'BATCH/2026/035',
      complaintDescription: 'Container crack near handle area',
      rca: 'Weak point in mold design causing stress concentration',
      correctiveAction: 'Modified mold design, strengthened handle area',
      preventiveAction: 'Added drop test for container quality, updated mold maintenance schedule',
      reportedDate: '2026-03-20',
      targetClosureDate: '2026-04-10',
      closureStatus: 'Closed',
      verifiedBy: 'Quality Head',
      verifiedDate: '2026-04-08',
    },
  ];

  const stats = {
    todayPassRate: 96.8,
    openCAPA: capaRecords.filter(c => c.closureStatus === 'Open').length,
    totalDefectsMTD: defectLog.filter(d => d.date.startsWith('2026-04')).length,
    avgPassRate: 96.6,
  };

  const resultColors: Record<string, string> = {
    'Pass': 'bg-green-100 text-green-700',
    'Fail': 'bg-red-100 text-red-700',
  };

  const severityColors: Record<string, string> = {
    'Critical': 'bg-red-100 text-red-700',
    'Major': 'bg-orange-100 text-orange-700',
    'Minor': 'bg-yellow-100 text-yellow-700',
  };

  const actionColors: Record<string, string> = {
    'Rework': 'bg-blue-100 text-blue-700',
    'Scrap': 'bg-red-100 text-red-700',
    'Reworked': 'bg-green-100 text-green-700',
    'Scrapped': 'bg-gray-100 text-gray-700',
  };

  const closureStatusColors: Record<string, string> = {
    'Open': 'bg-yellow-100 text-yellow-700',
    'Closed': 'bg-green-100 text-green-700',
  };

  const handleQCCheckRecorded = () => {
    console.log('QC Check recorded successfully!');
    // Refresh QC data or show toast
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-gray-900">Quality Management</h1>
          <p className="text-sm text-gray-600">Track QC checks, defects, and compliance</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download className="size-4" />
            Export Report
          </button>
          <button 
          onClick={() => setIsNewQCCheckModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            <Plus className="size-4" />
            New QC Check
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <Target className="size-4 text-blue-500" />
            <p className="text-xs text-gray-600">Today's Pass Rate</p>
          </div>
          <p className="text-xl font-bold text-gray-900">{stats.todayPassRate}%</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="size-4 text-orange-500" />
            <p className="text-xs text-gray-600">Open CAPA</p>
          </div>
          <p className="text-xl font-bold text-gray-900">{stats.openCAPA}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <XCircle className="size-4 text-red-500" />
            <p className="text-xs text-gray-600">Defects (MTD)</p>
          </div>
          <p className="text-xl font-bold text-gray-900">{stats.totalDefectsMTD}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="size-4 text-green-500" />
            <p className="text-xs text-gray-600">Avg Pass Rate</p>
          </div>
          <p className="text-xl font-bold text-gray-900">{stats.avgPassRate}%</p>
        </div>
      </div>

      {/* View Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex gap-6 overflow-x-auto">
          {(['inprocess', 'finished', 'defects', 'report', 'capa'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === tab
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
            >
              {tab === 'inprocess' ? 'In-Process QC' :
                tab === 'finished' ? 'Finished Goods QC' :
                  tab === 'defects' ? 'Defect/Rejection Log' :
                    tab === 'report' ? 'Quality Reports' : 'Customer CAPA'}
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
            placeholder="Search by batch number..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select className="px-4 py-2 border border-gray-300 rounded-lg">
          <option>All Batches</option>
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
        </select>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
          <Filter className="size-4" />
          Filter
        </button>
      </div>

      {/* Content - In-Process QC */}
      {activeTab === 'inprocess' && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-3 px-4 text-xs text-gray-600">Checkpoint ID</th>
                  <th className="text-left py-3 px-4 text-xs text-gray-600">Stage</th>
                  <th className="text-left py-3 px-4 text-xs text-gray-600">Batch</th>
                  <th className="text-left py-3 px-4 text-xs text-gray-600">Specification</th>
                  <th className="text-right py-3 px-4 text-xs text-gray-600">Measured Value</th>
                  <th className="text-left py-3 px-4 text-xs text-gray-600">Result</th>
                  <th className="text-left py-3 px-4 text-xs text-gray-600">Checked By</th>
                  <th className="text-left py-3 px-4 text-xs text-gray-600">Timestamp</th>
                  <th className="text-right py-3 px-4 text-xs text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {inProcessQC.map((qc) => (
                  <tr key={qc.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm font-mono text-gray-800">{qc.id}</td>
                    <td className="py-3 px-4 text-sm text-gray-900">{qc.stage}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{qc.batchNumber}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{qc.specification}</td>
                    <td className="py-3 px-4 text-right">
                      <span className="text-sm font-medium">
                        {qc.measuredValue} {qc.unit}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`text-xs px-2 py-1 rounded ${resultColors[qc.result]}`}>
                        {qc.result}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{qc.checkedBy}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {new Date(qc.timestamp).toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4 text-right">
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

      {/* Content - Finished Goods QC */}
      {activeTab === 'finished' && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-3 px-4 text-xs text-gray-600">Test ID</th>
                  <th className="text-left py-3 px-4 text-xs text-gray-600">Batch</th>
                  <th className="text-left py-3 px-4 text-xs text-gray-600">Test Type</th>
                  <th className="text-left py-3 px-4 text-xs text-gray-600">Specification</th>
                  <th className="text-right py-3 px-4 text-xs text-gray-600">Measured</th>
                  <th className="text-left py-3 px-4 text-xs text-gray-600">Result</th>
                  <th className="text-left py-3 px-4 text-xs text-gray-600">Compliance</th>
                  <th className="text-left py-3 px-4 text-xs text-gray-600">Remarks</th>
                  <th className="text-right py-3 px-4 text-xs text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {finishedGoodsQC.map((qc) => (
                  <tr key={qc.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm font-mono text-gray-800">{qc.id}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{qc.batchNumber}</td>
                    <td className="py-3 px-4 text-sm text-gray-900">{qc.testType}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{qc.specification}</td>
                    <td className="py-3 px-4 text-right">
                      <span className={`text-sm font-medium ${qc.result === 'Fail' ? 'text-red-600' : 'text-gray-900'}`}>
                        {qc.measuredValue}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`text-xs px-2 py-1 rounded ${resultColors[qc.result]}`}>
                        {qc.result}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{qc.complianceStandard}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{qc.remarks}</td>
                    <td className="py-3 px-4 text-right">
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

      {/* Content - Defect/Rejection Log */}
      {activeTab === 'defects' && (
        <div className="space-y-6">
          {/* Defect Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <p className="text-xs text-red-600 mb-1">Critical Defects</p>
              <p className="text-xl font-bold text-red-700">
                {defectLog.filter(d => d.severity === 'Critical').reduce((sum, d) => sum + d.quantityRejected, 0)}
              </p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <p className="text-xs text-orange-600 mb-1">Major Defects</p>
              <p className="text-xl font-bold text-orange-700">
                {defectLog.filter(d => d.severity === 'Major').reduce((sum, d) => sum + d.quantityRejected, 0)}
              </p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <p className="text-xs text-yellow-600 mb-1">Minor Defects</p>
              <p className="text-xl font-bold text-yellow-700">
                {defectLog.filter(d => d.severity === 'Minor').reduce((sum, d) => sum + d.quantityRejected, 0)}
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <p className="text-xs text-blue-600 mb-1">Reworked</p>
              <p className="text-xl font-bold text-blue-700">
                {defectLog.filter(d => d.status === 'Reworked').reduce((sum, d) => sum + d.quantityRejected, 0)}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <p className="text-xs text-gray-600 mb-1">Scrapped</p>
              <p className="text-xl font-bold text-gray-700">
                {defectLog.filter(d => d.status === 'Scrapped').reduce((sum, d) => sum + d.quantityRejected, 0)}
              </p>
            </div>
          </div>

          {/* Defect Table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left py-3 px-4 text-xs text-gray-600">Rejection ID</th>
                    <th className="text-left py-3 px-4 text-xs text-gray-600">Date</th>
                    <th className="text-left py-3 px-4 text-xs text-gray-600">Batch</th>
                    <th className="text-left py-3 px-4 text-xs text-gray-600">Defect Type</th>
                    <th className="text-left py-3 px-4 text-xs text-gray-600">Severity</th>
                    <th className="text-right py-3 px-4 text-xs text-gray-600">Quantity</th>
                    <th className="text-left py-3 px-4 text-xs text-gray-600">Action Taken</th>
                    <th className="text-left py-3 px-4 text-xs text-gray-600">Status</th>
                    <th className="text-right py-3 px-4 text-xs text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {defectLog.map((defect) => (
                    <tr key={defect.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm font-mono text-gray-800">{defect.id}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {new Date(defect.date).toLocaleDateString('en-IN')}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">{defect.batchNumber}</td>
                      <td className="py-3 px-4 text-sm text-gray-900">{defect.defectType}</td>
                      <td className="py-3 px-4">
                        <span className={`text-xs px-2 py-1 rounded ${severityColors[defect.severity]}`}>
                          {defect.severity}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right text-sm font-medium text-gray-900">
                        {defect.quantityRejected}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`text-xs px-2 py-1 rounded ${actionColors[defect.actionTaken]}`}>
                          {defect.actionTaken}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`text-xs px-2 py-1 rounded ${actionColors[defect.status]}`}>
                          {defect.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
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
        </div>
      )}

      {/* Content - Quality Reports */}
      {activeTab === 'report' && (
        <div className="space-y-6">
          {/* Summary Chart */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Pass Rate Trend by Batch</h3>
            <div className="flex items-end gap-6 h-48">
              {qualityReports.slice(0, 5).reverse().map((report) => (
                <div key={report.batchNumber} className="flex flex-col items-center gap-2 flex-1">
                  <div className="relative w-full flex justify-center">
                    <div
                      className={`w-12 rounded-t ${report.passRate >= 98 ? 'bg-green-500' :
                        report.passRate >= 95 ? 'bg-blue-500' : 'bg-orange-500'
                        }`}
                      style={{ height: `${report.passRate * 1.5}px` }}
                    />
                  </div>
                  <span className="text-xs text-gray-600">{report.batchNumber.slice(-3)}</span>
                  <span className="text-xs font-medium">{report.passRate}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Reports Table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left py-3 px-4 text-xs text-gray-600">Batch Number</th>
                    <th className="text-right py-3 px-4 text-xs text-gray-600">Total Produced</th>
                    <th className="text-right py-3 px-4 text-xs text-gray-600">Passed</th>
                    <th className="text-right py-3 px-4 text-xs text-gray-600">Rejected</th>
                    <th className="text-right py-3 px-4 text-xs text-gray-600">Pass Rate</th>
                    <th className="text-left py-3 px-4 text-xs text-gray-600">Report Date</th>
                    <th className="text-left py-3 px-4 text-xs text-gray-600">Status</th>
                    <th className="text-right py-3 px-4 text-xs text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {qualityReports.map((report) => (
                    <tr key={report.batchNumber} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm font-mono text-gray-800">{report.batchNumber}</td>
                      <td className="py-3 px-4 text-right text-sm text-gray-600">{report.totalProduced}</td>
                      <td className="py-3 px-4 text-right text-sm text-green-600">{report.totalPassed}</td>
                      <td className="py-3 px-4 text-right text-sm text-red-600">{report.totalRejected}</td>
                      <td className="py-3 px-4 text-right">
                        <span className={`text-sm font-medium ${report.passRate >= 98 ? 'text-green-600' :
                          report.passRate >= 95 ? 'text-blue-600' : 'text-orange-600'
                          }`}>
                          {report.passRate}%
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {new Date(report.reportDate).toLocaleDateString('en-IN')}
                      </td>
                      <td className="py-3 px-4">
                        {report.passRate >= 98 ? (
                          <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-700">Excellent</span>
                        ) : report.passRate >= 95 ? (
                          <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-700">Good</span>
                        ) : (
                          <span className="text-xs px-2 py-1 rounded bg-orange-100 text-orange-700">Needs Review</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button className="p-1 text-gray-400 hover:text-blue-600 rounded">
                          <Download className="size-4" />
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

      {/* Content - Customer CAPA */}
      {activeTab === 'capa' && (
        <div className="space-y-4">
          {capaRecords.map((capa) => (
            <div key={capa.id} className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded ${capa.closureStatus === 'Open' ? 'bg-yellow-50' : 'bg-green-50'
                  }`}>
                  <Shield className={`size-5 ${capa.closureStatus === 'Open' ? 'text-yellow-500' : 'text-green-500'
                    }`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-medium text-gray-900">{capa.id}</h3>
                    <span className="text-xs text-gray-400">|</span>
                    <span className="text-sm text-gray-600">Complaint: {capa.complaintId}</span>
                    <span className="text-xs text-gray-400">|</span>
                    <span className="text-sm text-gray-600">{capa.customerName}</span>
                    <span className={`text-xs px-2 py-0.5 rounded ${closureStatusColors[capa.closureStatus]}`}>
                      {capa.closureStatus}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-xs text-gray-500">Battery Serial / Batch</p>
                      <p className="text-sm">{capa.batterySerial} / {capa.batchNumber}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Complaint Description</p>
                      <p className="text-sm text-gray-800">{capa.complaintDescription}</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded p-3 mb-3">
                    <p className="text-xs text-gray-500 mb-1">Root Cause Analysis (RCA)</p>
                    <p className="text-sm text-gray-800">{capa.rca}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">
                        <Wrench className="size-3 inline mr-1" />
                        Corrective Action
                      </p>
                      <p className="text-sm text-gray-800">{capa.correctiveAction}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">
                        <Shield className="size-3 inline mr-1" />
                        Preventive Action
                      </p>
                      <p className="text-sm text-gray-800">{capa.preventiveAction}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 mt-3 text-xs text-gray-500">
                    <span>Reported: {new Date(capa.reportedDate).toLocaleDateString('en-IN')}</span>
                    <span>Target Closure: {new Date(capa.targetClosureDate).toLocaleDateString('en-IN')}</span>
                    {capa.verifiedBy && (
                      <span className="text-green-600">
                        Verified by: {capa.verifiedBy} on {new Date(capa.verifiedDate!).toLocaleDateString('en-IN')}
                      </span>
                    )}
                  </div>
                </div>
                {capa.closureStatus === 'Open' && (
                  <button className="px-3 py-1.5 bg-green-600 text-white text-xs rounded hover:bg-green-700">
                    Close CAPA
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <NewQCCheckModal
        open={isNewQCCheckModalOpen}
        onOpenChange={setIsNewQCCheckModalOpen}
        onSuccess={handleQCCheckRecorded}
      />
    </div>
  );
}