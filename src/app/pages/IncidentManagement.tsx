// src/app/pages/IncidentManagement.tsx
import { useState } from 'react';
import {
  AlertTriangle, Shield, Wrench, Users, Truck,
  Search, Filter, Plus, Eye, Clock, CheckCircle,
  XCircle, Calendar, MoreVertical, TrendingUp
} from 'lucide-react';
import { ReportIncidentModal } from '../components/incident/ReportIncidentModal';

export default function IncidentManagement() {
  const [activeTab, setActiveTab] = useState<'all' | 'investigation' | 'trends'>('all');
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const incidents = [
    {
      id: 'INC/2026/001',
      type: 'Safety',
      severity: 'Medium',
      location: 'Production Floor - Grid Casting',
      reportedBy: 'Rajesh Kumar',
      reportedDate: '2026-04-15 09:30',
      incidentDate: '2026-04-15 09:15',
      description: 'Lead spill near casting machine',
      immediateAction: 'Area cordoned off, cleanup initiated',
      injury: false,
      productionLoss: 2,
      status: 'Under Investigation',
      assignedTo: 'Safety Officer',
    },
    {
      id: 'INC/2026/002',
      type: 'Equipment',
      severity: 'High',
      location: 'Formation Area',
      reportedBy: 'Vikram Singh',
      reportedDate: '2026-04-14 14:00',
      incidentDate: '2026-04-14 13:30',
      description: 'Formation charger malfunction causing voltage fluctuation',
      immediateAction: 'Machine stopped, maintenance called',
      injury: false,
      productionLoss: 8,
      status: 'Resolved',
      assignedTo: 'Maintenance Team',
      resolution: 'Power module replaced',
    },
    {
      id: 'INC/2026/003',
      type: 'Quality',
      severity: 'Critical',
      location: 'Assembly Line 2',
      reportedBy: 'Priya Sharma',
      reportedDate: '2026-04-13 11:15',
      incidentDate: '2026-04-13 10:45',
      description: 'Multiple batteries failing short circuit test',
      immediateAction: 'Production stopped, batch quarantined',
      injury: false,
      productionLoss: 24,
      status: 'Resolved',
      assignedTo: 'Quality Team',
      resolution: 'Faulty separator batch identified and replaced',
    },
    {
      id: 'INC/2026/004',
      type: 'Environmental',
      severity: 'Low',
      location: 'Chemical Storage',
      reportedBy: 'Ramesh Chandra',
      reportedDate: '2026-04-12 16:20',
      incidentDate: '2026-04-12 16:00',
      description: 'Minor acid leak from storage container',
      immediateAction: 'Container isolated, spill kit used',
      injury: false,
      productionLoss: 0,
      status: 'Closed',
      assignedTo: 'EHS Team',
      resolution: 'Container replaced, area neutralized',
    },
    {
      id: 'INC/2026/005',
      type: 'HR',
      severity: 'Medium',
      location: 'HR Department',
      reportedBy: 'Sunita Devi',
      reportedDate: '2026-04-11 10:00',
      incidentDate: '2026-04-11 09:30',
      description: 'Employee grievance regarding overtime payment',
      immediateAction: 'Meeting scheduled with employee',
      injury: false,
      productionLoss: 0,
      status: 'Under Investigation',
      assignedTo: 'HR Manager',
    },
  ];

  const investigations = [
    {
      id: 'INV/2026/001',
      incidentId: 'INC/2026/001',
      team: ['Safety Officer', 'Production Supervisor'],
      rootCause: 'Improper handling during material transfer',
      report: 'Root cause analysis completed - operator training gap identified',
      correctiveAction: 'Refresher training on material handling SOP',
      targetDate: '2026-04-22',
      status: 'In Progress',
    },
    {
      id: 'INV/2026/002',
      incidentId: 'INC/2026/003',
      team: ['Quality Manager', 'Production Head', 'Procurement'],
      rootCause: 'Substandard separator material from vendor',
      report: 'Vendor supplied out-of-spec material, QC check missed',
      correctiveAction: 'Vendor put on probation, additional QC gate added',
      targetDate: '2026-04-18',
      status: 'Completed',
      verifiedBy: 'Plant Head',
    },
  ];

  const stats = {
    totalIncidents: incidents.length,
    openIncidents: incidents.filter(i => i.status === 'Under Investigation').length,
    criticalIncidents: incidents.filter(i => i.severity === 'Critical').length,
    avgResolutionTime: 48,
  };

  const typeIcons: Record<string, any> = {
    'Safety': Shield,
    'Equipment': Wrench,
    'Quality': AlertTriangle,
    'Environmental': Truck,
    'HR': Users,
  };

  const severityColors: Record<string, string> = {
    'Low': 'bg-blue-100 text-blue-700',
    'Medium': 'bg-yellow-100 text-yellow-700',
    'High': 'bg-orange-100 text-orange-700',
    'Critical': 'bg-red-100 text-red-700',
  };

  const statusColors: Record<string, string> = {
    'Under Investigation': 'bg-yellow-100 text-yellow-700',
    'Resolved': 'bg-green-100 text-green-700',
    'Closed': 'bg-gray-100 text-gray-700',
  };

  const handleIncidentReported = () => {
    console.log('Incident reported successfully!');
    // Refresh incident list or show toast
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-gray-900">Incident Management</h1>
          <p className="text-sm text-gray-600">Report and track safety, quality, and operational incidents</p>
        </div>
        <button
          onClick={() => setIsReportModalOpen(true)}
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
          <AlertTriangle className="size-4" />
          Report Incident
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="size-4 text-blue-500" />
            <p className="text-xs text-gray-600">Total Incidents</p>
          </div>
          <p className="text-xl font-bold text-gray-900">{stats.totalIncidents}</p>
          <p className="text-xs text-gray-500 mt-1">Last 30 days</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="size-4 text-yellow-500" />
            <p className="text-xs text-gray-600">Open Incidents</p>
          </div>
          <p className="text-xl font-bold text-gray-900">{stats.openIncidents}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="size-4 text-red-500" />
            <p className="text-xs text-gray-600">Critical Incidents</p>
          </div>
          <p className="text-xl font-bold text-gray-900">{stats.criticalIncidents}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="size-4 text-green-500" />
            <p className="text-xs text-gray-600">Avg Resolution Time</p>
          </div>
          <p className="text-xl font-bold text-gray-900">{stats.avgResolutionTime}h</p>
        </div>
      </div>

      {/* View Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex gap-6">
          {(['all', 'investigation', 'trends'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-medium border-b-2 transition-colors ${activeTab === tab
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
            >
              {tab === 'all' ? 'All Incidents' : tab === 'investigation' ? 'Investigations' : 'Trend Analysis'}
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
            placeholder="Search incidents..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select className="px-4 py-2 border border-gray-300 rounded-lg">
          <option>All Types</option>
          <option>Safety</option>
          <option>Equipment</option>
          <option>Quality</option>
          <option>Environmental</option>
          <option>HR</option>
        </select>
        <select className="px-4 py-2 border border-gray-300 rounded-lg">
          <option>All Severity</option>
          <option>Critical</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
          <Filter className="size-4" />
          More Filters
        </button>
      </div>

      {/* Content */}
      {activeTab === 'all' && (
        <div className="space-y-4">
          {incidents.map((incident) => {
            const TypeIcon = typeIcons[incident.type] || AlertTriangle;
            return (
              <div key={incident.id} className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded ${incident.severity === 'Critical' ? 'bg-red-50' :
                      incident.severity === 'High' ? 'bg-orange-50' :
                        incident.severity === 'Medium' ? 'bg-yellow-50' : 'bg-blue-50'
                      }`}>
                      <TypeIcon className={`size-5 ${incident.severity === 'Critical' ? 'text-red-500' :
                        incident.severity === 'High' ? 'text-orange-500' :
                          incident.severity === 'Medium' ? 'text-yellow-500' : 'text-blue-500'
                        }`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-medium text-gray-900">{incident.id}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded ${severityColors[incident.severity]}`}>
                          {incident.severity}
                        </span>
                        <span className="text-xs text-gray-400">|</span>
                        <span className="text-sm text-gray-600">{incident.type}</span>
                        <span className="text-xs text-gray-400">|</span>
                        <span className="text-sm text-gray-600">{incident.location}</span>
                      </div>
                      <p className="text-sm text-gray-800 mb-2">{incident.description}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
                        <span>Reported: {incident.reportedDate}</span>
                        <span>By: {incident.reportedBy}</span>
                        {incident.productionLoss > 0 && (
                          <span className="text-orange-600">Production Loss: {incident.productionLoss}h</span>
                        )}
                      </div>
                      <p className="text-xs text-gray-600">
                        <span className="font-medium">Immediate Action:</span> {incident.immediateAction}
                      </p>
                      {incident.resolution && (
                        <p className="text-xs text-green-600 mt-1">
                          <span className="font-medium">Resolution:</span> {incident.resolution}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded ${statusColors[incident.status]}`}>
                      {incident.status}
                    </span>
                    <button className="text-blue-600 hover:text-blue-700 p-1">
                      <Eye className="size-4" />
                    </button>
                    <button className="text-gray-400 hover:text-gray-600 p-1">
                      <MoreVertical className="size-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === 'investigation' && (
        <div className="space-y-4">
          {investigations.map((inv) => {
            const incident = incidents.find(i => i.id === inv.incidentId);
            return (
              <div key={inv.id} className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-purple-50 rounded">
                    <Search className="size-5 text-purple-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <h3 className="font-medium text-gray-900">{inv.id}</h3>
                        <span className="text-xs text-gray-400">|</span>
                        <span className="text-sm text-gray-600">Incident: {inv.incidentId}</span>
                        {incident && (
                          <span className={`text-xs px-2 py-0.5 rounded ${severityColors[incident.severity]}`}>
                            {incident.severity}
                          </span>
                        )}
                      </div>
                      <span className={`text-xs px-2 py-1 rounded ${inv.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                        {inv.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-3">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Investigation Team</p>
                        <p className="text-sm text-gray-800">{inv.team.join(', ')}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Root Cause</p>
                        <p className="text-sm text-gray-800">{inv.rootCause}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Corrective Action</p>
                        <p className="text-sm text-gray-800">{inv.correctiveAction}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Target Date</p>
                        <p className="text-sm text-gray-800">{new Date(inv.targetDate).toLocaleDateString('en-IN')}</p>
                      </div>
                    </div>
                    {inv.verifiedBy && (
                      <p className="text-xs text-green-600 mt-3">
                        Verified by: {inv.verifiedBy}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === 'trends' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="size-5 text-blue-500" />
            <h3 className="font-semibold text-gray-900">Incident Trends - Last 6 Months</h3>
          </div>

          {/* Trend Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">By Type</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Safety</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '35%' }} />
                    </div>
                    <span className="text-sm text-gray-900">8 incidents</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Equipment</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{ width: '25%' }} />
                    </div>
                    <span className="text-sm text-gray-900">6 incidents</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Quality</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '20%' }} />
                    </div>
                    <span className="text-sm text-gray-900">5 incidents</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Environmental</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: '10%' }} />
                    </div>
                    <span className="text-sm text-gray-900">2 incidents</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">HR</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-pink-500 h-2 rounded-full" style={{ width: '10%' }} />
                    </div>
                    <span className="text-sm text-gray-900">2 incidents</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">By Severity</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Critical</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: '10%' }} />
                    </div>
                    <span className="text-sm text-gray-900">2 incidents</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">High</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{ width: '20%' }} />
                    </div>
                    <span className="text-sm text-gray-900">5 incidents</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Medium</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '45%' }} />
                    </div>
                    <span className="text-sm text-gray-900">10 incidents</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Low</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '25%' }} />
                    </div>
                    <span className="text-sm text-gray-900">6 incidents</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Monthly Trend */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Monthly Incident Frequency</h4>
            <div className="flex items-end gap-4 h-40">
              {['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'].map((month, idx) => {
                const values = [4, 3, 5, 6, 4, 3];
                return (
                  <div key={month} className="flex flex-col items-center gap-1">
                    <div
                      className="w-12 bg-blue-500 rounded-t"
                      style={{ height: `${values[idx] * 20}px` }}
                    />
                    <span className="text-xs text-gray-600">{month}</span>
                    <span className="text-xs font-medium text-gray-900">{values[idx]}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}


      <ReportIncidentModal
        open={isReportModalOpen}
        onOpenChange={setIsReportModalOpen}
        onSuccess={handleIncidentReported}
      />
    </div>
  );
}