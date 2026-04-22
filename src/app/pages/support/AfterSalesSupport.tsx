// src/app/pages/support/AfterSalesSupport.tsx
import { useState } from 'react';
import { 
  HeadphonesIcon, Ticket, Clock, CheckCircle, XCircle, 
  AlertCircle, Search, Filter, Download, Plus, Eye, 
  MoreVertical, Calendar, User, Phone, Mail, MapPin,
  MessageCircle, Send, FileText, Wrench, DollarSign,
  Timer, TrendingUp, ChevronDown, BadgeCheck
} from 'lucide-react';
import { NewTicketModal } from '../../components/support/NewTicketModal';

export default function AfterSalesSupport() {
  const [activeTab, setActiveTab] = useState<'tickets' | 'sla' | 'reports'>('tickets');
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [isNewTicketModalOpen, setIsNewTicketModalOpen] = useState(false);

  const supportTickets = [
    {
      id: 'TKT/2026/089',
      customerId: 'CUST/001',
      customerName: 'Delhi Batteries Pvt Ltd',
      contactPerson: 'Rajiv Mehta',
      phone: '98765 43210',
      email: 'rajiv@delhibatteries.com',
      productSerial: 'NES150AH-2026-04567',
      batteryModel: 'Automotive Battery 150AH',
      purchaseDate: '2026-02-15',
      warrantyStatus: 'Under Warranty',
      complaintCategory: 'Not Charging',
      description: 'Battery not holding charge, voltage drops quickly',
      registrationChannel: 'Phone',
      registrationDate: '2026-04-15 10:30',
      assignedTo: 'Ramesh Kumar (Field Technician)',
      assignmentDate: '2026-04-15 11:00',
      status: 'In Progress',
      priority: 'High',
      responseSLADeadline: '2026-04-15 14:30',
      firstResponseTime: '2026-04-15 11:00',
      resolutionSLADeadline: '2026-04-17 10:30',
      slaBreached: false,
    },
    {
      id: 'TKT/2026/088',
      customerId: 'CUST/015',
      customerName: 'Mumbai Auto Electricals',
      contactPerson: 'Suresh Jain',
      phone: '98201 23456',
      email: 'suresh@mumbaiauto.com',
      productSerial: 'NES200AH-2026-01234',
      batteryModel: 'Inverter Battery 200AH',
      purchaseDate: '2026-01-20',
      warrantyStatus: 'Under Warranty',
      complaintCategory: 'Low Backup',
      description: 'Backup time reduced significantly',
      registrationChannel: 'Email',
      registrationDate: '2026-04-14 09:15',
      assignedTo: 'Dinesh Rawat (Service Center)',
      assignmentDate: '2026-04-14 10:00',
      status: 'Resolved',
      priority: 'Medium',
      responseSLADeadline: '2026-04-14 13:15',
      firstResponseTime: '2026-04-14 10:00',
      resolutionSLADeadline: '2026-04-16 09:15',
      resolutionTime: '2026-04-15 16:30',
      slaBreached: false,
    },
    {
      id: 'TKT/2026/087',
      customerId: 'CUST/023',
      customerName: 'Chennai Battery House',
      contactPerson: 'Karthik Subramanian',
      phone: '98400 12345',
      email: 'karthik@chennaibattery.com',
      productSerial: 'NES120AH-2025-0890',
      batteryModel: 'E-Rickshaw Battery 120AH',
      purchaseDate: '2025-11-10',
      warrantyStatus: 'Out of Warranty',
      complaintCategory: 'Terminal Issue',
      description: 'Terminal corrosion and loose connection',
      registrationChannel: 'Portal',
      registrationDate: '2026-04-12 14:20',
      assignedTo: 'Suresh Patel (Field Technician)',
      assignmentDate: '2026-04-12 15:00',
      status: 'Closed',
      priority: 'Low',
      responseSLADeadline: '2026-04-12 18:20',
      firstResponseTime: '2026-04-12 15:00',
      resolutionSLADeadline: '2026-04-14 14:20',
      resolutionTime: '2026-04-13 11:00',
      slaBreached: false,
    },
    {
      id: 'TKT/2026/086',
      customerId: 'CUST/045',
      customerName: 'Lucknow Battery World',
      contactPerson: 'Amit Verma',
      phone: '94150 67890',
      email: 'amit@lucknowbattery.com',
      productSerial: 'NES150AH-2025-1234',
      batteryModel: 'Automotive Battery 150AH',
      purchaseDate: '2025-08-05',
      warrantyStatus: 'Out of Warranty',
      complaintCategory: 'Physical Damage',
      description: 'Container crack near handle',
      registrationChannel: 'Dealer',
      registrationDate: '2026-04-10 11:00',
      assignedTo: null,
      assignmentDate: null,
      status: 'Open',
      priority: 'Medium',
      responseSLADeadline: '2026-04-10 15:00',
      firstResponseTime: null,
      resolutionSLADeadline: '2026-04-12 11:00',
      slaBreached: true,
    },
    {
      id: 'TKT/2026/085',
      customerId: 'CUST/008',
      customerName: 'Kolkata Power Solutions',
      contactPerson: 'Sneha Das',
      phone: '98300 11223',
      email: 'sneha@kpsolutions.com',
      productSerial: 'NES40AH-2026-0056',
      batteryModel: 'Solar Battery 40AH',
      purchaseDate: '2026-03-01',
      warrantyStatus: 'Under Warranty',
      complaintCategory: 'Not Charging',
      description: 'Battery not accepting charge from solar panel',
      registrationChannel: 'Phone',
      registrationDate: '2026-04-16 08:45',
      assignedTo: 'Priya Sharma (Technical Support)',
      assignmentDate: '2026-04-16 09:30',
      status: 'Assigned',
      priority: 'High',
      responseSLADeadline: '2026-04-16 12:45',
      firstResponseTime: '2026-04-16 09:30',
      resolutionSLADeadline: '2026-04-18 08:45',
      slaBreached: false,
    },
  ];

  const serviceReports = [
    {
      id: 'SR/2026/045',
      ticketId: 'TKT/2026/088',
      actionTaken: 'Checked battery voltage, performed capacity test, identified weak cells',
      partsReplaced: ['Cell Connectors', 'Terminal Bolts'],
      serviceCharge: 0,
      warrantyCovered: true,
      technicianSignoff: 'Dinesh Rawat',
      signoffDate: '2026-04-15 16:30',
      customerSignature: true,
    },
    {
      id: 'SR/2026/044',
      ticketId: 'TKT/2026/087',
      actionTaken: 'Cleaned terminals, replaced corroded connectors, applied anti-corrosion gel',
      partsReplaced: ['Terminal Connectors', 'Anti-Corrosion Gel'],
      serviceCharge: 450,
      warrantyCovered: false,
      technicianSignoff: 'Suresh Patel',
      signoffDate: '2026-04-13 11:00',
      customerSignature: true,
    },
  ];

  const slaMetrics = {
    averageResponseTime: 45, // minutes
    averageResolutionTime: 38, // hours
    slaCompliance: 92.5, // percentage
    ticketsWithinSLA: supportTickets.filter(t => !t.slaBreached).length,
    ticketsBreachedSLA: supportTickets.filter(t => t.slaBreached).length,
  };

  const stats = {
    openTickets: supportTickets.filter(t => t.status === 'Open' || t.status === 'Assigned').length,
    inProgressTickets: supportTickets.filter(t => t.status === 'In Progress').length,
    resolvedToday: 3,
    avgFirstResponse: '45 min',
  };

  const statusColors: Record<string, string> = {
    'Open': 'bg-red-100 text-red-700',
    'Assigned': 'bg-blue-100 text-blue-700',
    'In Progress': 'bg-yellow-100 text-yellow-700',
    'Resolved': 'bg-green-100 text-green-700',
    'Closed': 'bg-gray-100 text-gray-700',
  };

  const priorityColors: Record<string, string> = {
    'High': 'bg-red-100 text-red-700',
    'Medium': 'bg-orange-100 text-orange-700',
    'Low': 'bg-green-100 text-green-700',
  };

  const channelColors: Record<string, string> = {
    'Phone': 'bg-blue-100 text-blue-700',
    'Email': 'bg-purple-100 text-purple-700',
    'Portal': 'bg-cyan-100 text-cyan-700',
    'Dealer': 'bg-orange-100 text-orange-700',
  };

  const warrantyStatusColors: Record<string, string> = {
    'Under Warranty': 'bg-green-100 text-green-700',
    'Out of Warranty': 'bg-gray-100 text-gray-700',
  };

  const formatDateTime = (dateTime: string | null) => {
    if (!dateTime) return '—';
    return new Date(dateTime).toLocaleString('en-IN');
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-IN');
  };

  const handleTicketCreated = () => {
    console.log('Support ticket created successfully!');
    // Refresh ticket list or show toast
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-gray-900">After Sales Support</h1>
          <p className="text-sm text-gray-600">Manage customer complaints and service tickets</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download className="size-4" />
            Export
          </button>
          <button 
          onClick={() => setIsNewTicketModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            <Plus className="size-4" />
            New Ticket
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <Ticket className="size-4 text-red-500" />
            <p className="text-xs text-gray-600">Open Tickets</p>
          </div>
          <p className="text-xl font-bold text-gray-900">{stats.openTickets}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="size-4 text-yellow-500" />
            <p className="text-xs text-gray-600">In Progress</p>
          </div>
          <p className="text-xl font-bold text-gray-900">{stats.inProgressTickets}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="size-4 text-green-500" />
            <p className="text-xs text-gray-600">Resolved Today</p>
          </div>
          <p className="text-xl font-bold text-gray-900">{stats.resolvedToday}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <Timer className="size-4 text-purple-500" />
            <p className="text-xs text-gray-600">Avg First Response</p>
          </div>
          <p className="text-xl font-bold text-gray-900">{stats.avgFirstResponse}</p>
        </div>
      </div>

      {/* View Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex gap-6">
          {(['tickets', 'sla', 'reports'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab === 'tickets' ? 'Support Tickets' : 
               tab === 'sla' ? 'SLA Tracking' : 'Service Reports'}
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
            placeholder="Search by ticket ID, customer, or serial number..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select className="px-4 py-2 border border-gray-300 rounded-lg">
          <option>All Status</option>
          <option>Open</option>
          <option>Assigned</option>
          <option>In Progress</option>
          <option>Resolved</option>
          <option>Closed</option>
        </select>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
          <Filter className="size-4" />
          Filter
        </button>
      </div>

      {/* Content - Support Tickets */}
      {activeTab === 'tickets' && (
        <div className="space-y-4">
          {supportTickets.map((ticket) => (
            <div key={ticket.id} className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded ${
                    ticket.status === 'Open' ? 'bg-red-50' :
                    ticket.status === 'Assigned' ? 'bg-blue-50' :
                    ticket.status === 'In Progress' ? 'bg-yellow-50' : 'bg-green-50'
                  }`}>
                    <Ticket className={`size-5 ${
                      ticket.status === 'Open' ? 'text-red-500' :
                      ticket.status === 'Assigned' ? 'text-blue-500' :
                      ticket.status === 'In Progress' ? 'text-yellow-500' : 'text-green-500'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                      <h3 className="font-medium text-gray-900">{ticket.id}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded ${statusColors[ticket.status]}`}>
                        {ticket.status}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded ${priorityColors[ticket.priority]}`}>
                        {ticket.priority} Priority
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded ${channelColors[ticket.registrationChannel]}`}>
                        {ticket.registrationChannel}
                      </span>
                      {ticket.slaBreached && (
                        <span className="text-xs px-2 py-0.5 rounded bg-red-100 text-red-700 flex items-center gap-1">
                          <AlertCircle className="size-3" />
                          SLA Breached
                        </span>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 mt-2">
                      <div>
                        <p className="text-xs text-gray-500">Customer</p>
                        <p className="text-sm font-medium">{ticket.customerName}</p>
                        <p className="text-xs text-gray-500">{ticket.contactPerson} | {ticket.phone}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Product</p>
                        <p className="text-sm">{ticket.batteryModel}</p>
                        <p className="text-xs text-gray-500 font-mono">S/N: {ticket.productSerial}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-2">
                      <div>
                        <p className="text-xs text-gray-500">Complaint Category</p>
                        <p className="text-sm">{ticket.complaintCategory}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Purchase Date / Warranty</p>
                        <p className="text-sm">
                          {formatDate(ticket.purchaseDate)} • 
                          <span className={`ml-1 ${ticket.warrantyStatus === 'Under Warranty' ? 'text-green-600' : 'text-gray-600'}`}>
                            {ticket.warrantyStatus}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="mt-2">
                      <p className="text-xs text-gray-500">Description</p>
                      <p className="text-sm text-gray-800">{ticket.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-3 pt-3 border-t border-gray-100">
                      <div>
                        <p className="text-xs text-gray-500">Assigned To</p>
                        <p className="text-sm">{ticket.assignedTo || 'Not assigned'}</p>
                        {ticket.assignmentDate && (
                          <p className="text-xs text-gray-500">on {formatDateTime(ticket.assignmentDate)}</p>
                        )}
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Registration</p>
                        <p className="text-sm">{formatDateTime(ticket.registrationDate)}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {ticket.status === 'Open' && (
                    <button className="px-3 py-1.5 bg-blue-600 text-white text-xs rounded hover:bg-blue-700">
                      Assign
                    </button>
                  )}
                  {ticket.status === 'Assigned' && (
                    <button className="px-3 py-1.5 bg-yellow-600 text-white text-xs rounded hover:bg-yellow-700">
                      Start Work
                    </button>
                  )}
                  {ticket.status === 'In Progress' && (
                    <button className="px-3 py-1.5 bg-green-600 text-white text-xs rounded hover:bg-green-700">
                      Resolve
                    </button>
                  )}
                  <button className="p-2 text-gray-400 hover:text-blue-600 rounded">
                    <MessageCircle className="size-4" />
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

      {/* Content - SLA Tracking */}
      {activeTab === 'sla' && (
        <div className="space-y-6">
          {/* SLA Metrics Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
              <Timer className="size-8 text-blue-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{slaMetrics.averageResponseTime} min</p>
              <p className="text-xs text-gray-500">Avg Response Time</p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
              <Clock className="size-8 text-green-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{slaMetrics.averageResolutionTime} hrs</p>
              <p className="text-xs text-gray-500">Avg Resolution Time</p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
              <CheckCircle className="size-8 text-green-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{slaMetrics.ticketsWithinSLA}</p>
              <p className="text-xs text-gray-500">Tickets Within SLA</p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
              <AlertCircle className="size-8 text-red-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{slaMetrics.ticketsBreachedSLA}</p>
              <p className="text-xs text-gray-500">Tickets Breached SLA</p>
            </div>
          </div>

          {/* SLA Compliance Gauge */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">SLA Compliance Rate</h3>
            <div className="flex items-center justify-center">
              <div className="relative w-48 h-48">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    cx="50" cy="50" r="45"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50" cy="50" r="45"
                    fill="none"
                    stroke={slaMetrics.slaCompliance >= 90 ? '#10b981' : '#f59e0b'}
                    strokeWidth="8"
                    strokeDasharray={`${slaMetrics.slaCompliance * 2.83} 283`}
                    strokeDashoffset="0"
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                  />
                  <text x="50" y="55" textAnchor="middle" className="text-2xl font-bold" fill="#1f2937">
                    {slaMetrics.slaCompliance}%
                  </text>
                </svg>
              </div>
            </div>
          </div>

          {/* SLA Tracking Table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">SLA Tracking Details</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left py-3 px-4 text-xs text-gray-600">Ticket ID</th>
                    <th className="text-left py-3 px-4 text-xs text-gray-600">Response SLA</th>
                    <th className="text-left py-3 px-4 text-xs text-gray-600">First Response</th>
                    <th className="text-left py-3 px-4 text-xs text-gray-600">Response Status</th>
                    <th className="text-left py-3 px-4 text-xs text-gray-600">Resolution SLA</th>
                    <th className="text-left py-3 px-4 text-xs text-gray-600">Resolution Time</th>
                    <th className="text-left py-3 px-4 text-xs text-gray-600">Resolution Status</th>
                  </tr>
                </thead>
                <tbody>
                  {supportTickets.map((ticket) => {
                    const responseSLA = new Date(ticket.responseSLADeadline);
                    const firstResponse = ticket.firstResponseTime ? new Date(ticket.firstResponseTime) : null;
                    const responseMet = firstResponse && firstResponse <= responseSLA;
                    
                    const resolutionSLA = new Date(ticket.resolutionSLADeadline);
                    const resolutionTime = ticket.resolutionTime ? new Date(ticket.resolutionTime) : null;
                    const resolutionMet = resolutionTime && resolutionTime <= resolutionSLA;

                    return (
                      <tr key={ticket.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm font-mono text-gray-800">{ticket.id}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">{formatDateTime(ticket.responseSLADeadline)}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">{formatDateTime(ticket.firstResponseTime)}</td>
                        <td className="py-3 px-4">
                          {ticket.firstResponseTime ? (
                            responseMet ? (
                              <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-700 flex items-center gap-1 w-fit">
                                <CheckCircle className="size-3" />
                                Met
                              </span>
                            ) : (
                              <span className="text-xs px-2 py-1 rounded bg-red-100 text-red-700 flex items-center gap-1 w-fit">
                                <XCircle className="size-3" />
                                Breached
                              </span>
                            )
                          ) : (
                            <span className="text-xs px-2 py-1 rounded bg-yellow-100 text-yellow-700">Pending</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">{formatDateTime(ticket.resolutionSLADeadline)}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">{formatDateTime(ticket.resolutionTime)}</td>
                        <td className="py-3 px-4">
                          {ticket.resolutionTime ? (
                            resolutionMet ? (
                              <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-700 flex items-center gap-1 w-fit">
                                <CheckCircle className="size-3" />
                                Met
                              </span>
                            ) : (
                              <span className="text-xs px-2 py-1 rounded bg-red-100 text-red-700 flex items-center gap-1 w-fit">
                                <XCircle className="size-3" />
                                Breached
                              </span>
                            )
                          ) : ticket.status === 'Resolved' || ticket.status === 'Closed' ? (
                            <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-700">—</span>
                          ) : (
                            <span className="text-xs px-2 py-1 rounded bg-yellow-100 text-yellow-700">Pending</span>
                          )}
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

      {/* Content - Service Reports */}
      {activeTab === 'reports' && (
        <div className="space-y-4">
          {serviceReports.map((report) => {
            const ticket = supportTickets.find(t => t.id === report.ticketId);
            return (
              <div key={report.id} className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-green-50 rounded">
                    <FileText className="size-5 text-green-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-medium text-gray-900">{report.id}</h3>
                      <span className="text-xs text-gray-400">|</span>
                      <span className="text-sm text-gray-600">Ticket: {report.ticketId}</span>
                      <span className="text-xs text-gray-400">|</span>
                      <span className="text-sm text-gray-600">{ticket?.customerName}</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Action Taken</p>
                        <p className="text-sm text-gray-800">{report.actionTaken}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Parts Replaced</p>
                        <div className="flex flex-wrap gap-1">
                          {report.partsReplaced.map((part, idx) => (
                            <span key={idx} className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-700">
                              {part}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 p-3 bg-gray-50 rounded">
                      <div>
                        <span className="text-xs text-gray-500">Service Charge:</span>
                        <span className="ml-2 text-sm font-medium">
                          {report.warrantyCovered ? (
                            <span className="text-green-600">Waived (Under Warranty)</span>
                          ) : (
                            <span>₹{report.serviceCharge}</span>
                          )}
                        </span>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500">Technician:</span>
                        <span className="ml-2 text-sm">{report.technicianSignoff}</span>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500">Signoff Date:</span>
                        <span className="ml-2 text-sm">{formatDateTime(report.signoffDate)}</span>
                      </div>
                      <div className="flex items-center gap-2 ml-auto">
                        {report.customerSignature ? (
                          <BadgeCheck className="size-4 text-green-500" />
                        ) : (
                          <AlertCircle className="size-4 text-yellow-500" />
                        )}
                        <span className="text-xs text-gray-500">
                          {report.customerSignature ? 'Customer Signed' : 'Signature Pending'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button className="p-2 text-gray-400 hover:text-blue-600 rounded">
                    <Download className="size-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <NewTicketModal
        open={isNewTicketModalOpen}
        onOpenChange={setIsNewTicketModalOpen}
        onSuccess={handleTicketCreated}
      />
    </div>
  );
}