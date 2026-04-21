// src/app/pages/finance/Attendance.jsx
import { useState } from 'react';
import { Calendar, Users, Clock, CheckCircle, XCircle, AlertCircle, Download } from 'lucide-react';

export default function HRAttendance() {
  const [selectedDate, setSelectedDate] = useState('2026-04-19');

  const stats = {
    present: 342,
    absent: 28,
    onLeave: 10,
    late: 15,
    total: 380
  };

  const attendanceRecords = [
    {
      id: 'NES/EMP/001',
      name: 'Rajesh Kumar',
      department: 'Production',
      shift: 'Morning',
      checkIn: '08:45 AM',
      checkOut: '05:30 PM',
      hours: '8.75',
      status: 'Present',
      overtime: '0.75'
    },
    {
      id: 'NES/EMP/002',
      name: 'Priya Sharma',
      department: 'Quality',
      shift: 'Morning',
      checkIn: '09:15 AM',
      checkOut: '06:00 PM',
      hours: '8.75',
      status: 'Late',
      overtime: '1.0'
    },
    {
      id: 'NES/EMP/003',
      name: 'Amit Singh',
      department: 'Sales',
      shift: 'General',
      checkIn: '09:00 AM',
      checkOut: '06:00 PM',
      hours: '9.0',
      status: 'Present',
      overtime: '0'
    },
    {
      id: 'NES/EMP/004',
      name: 'Neha Gupta',
      department: 'HR',
      shift: 'General',
      checkIn: '-',
      checkOut: '-',
      hours: '0',
      status: 'On Leave',
      overtime: '0'
    },
    {
      id: 'NES/EMP/005',
      name: 'Sunil Verma',
      department: 'Production',
      shift: 'Morning',
      checkIn: '-',
      checkOut: '-',
      hours: '0',
      status: 'Absent',
      overtime: '0'
    },
    {
      id: 'NES/EMP/006',
      name: 'Kavita Mehta',
      department: 'Finance',
      shift: 'General',
      checkIn: '09:00 AM',
      checkOut: '06:15 PM',
      hours: '9.25',
      status: 'Present',
      overtime: '0.25'
    },
  ];

  const leaveRequests = [
    {
      id: 'LV-001',
      employee: 'Ravi Kumar (NES/EMP/045)',
      type: 'Casual Leave',
      from: '2026-04-22',
      to: '2026-04-23',
      days: 2,
      reason: 'Family function',
      status: 'Pending'
    },
    {
      id: 'LV-002',
      employee: 'Sonia Mishra (NES/EMP/067)',
      type: 'Sick Leave',
      from: '2026-04-20',
      to: '2026-04-20',
      days: 1,
      reason: 'Medical checkup',
      status: 'Approved'
    },
    {
      id: 'LV-003',
      employee: 'Vikram Joshi (NES/EMP/089)',
      type: 'Earned Leave',
      from: '2026-04-25',
      to: '2026-04-27',
      days: 3,
      reason: 'Personal work',
      status: 'Pending'
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'present': return 'bg-green-100 text-green-700';
      case 'absent': return 'bg-red-100 text-red-700';
      case 'on leave': return 'bg-blue-100 text-blue-700';
      case 'late': return 'bg-orange-100 text-orange-700';
      case 'approved': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'present': return <CheckCircle className="size-4" />;
      case 'absent': return <XCircle className="size-4" />;
      case 'on leave': return <AlertCircle className="size-4" />;
      case 'late': return <Clock className="size-4" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-gray-900">Attendance Management</h1>
          <p className="text-sm text-gray-600">Track employee attendance, shifts, and leave requests</p>
        </div>
        <div className="flex gap-3">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          />
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            <Download className="size-4" />
            Export
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Total</p>
            <Users className="size-5 text-gray-400" />
          </div>
          <p className="font-bold text-gray-900">{stats.total}</p>
          <p className="text-xs text-gray-500 mt-1">Employees</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 border-l-4 border-l-green-500">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Present</p>
            <CheckCircle className="size-5 text-green-500" />
          </div>
          <p className="font-bold text-gray-900">{stats.present}</p>
          <p className="text-xs text-gray-500 mt-1">{((stats.present / stats.total) * 100).toFixed(1)}%</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 border-l-4 border-l-red-500">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Absent</p>
            <XCircle className="size-5 text-red-500" />
          </div>
          <p className="font-bold text-gray-900">{stats.absent}</p>
          <p className="text-xs text-gray-500 mt-1">{((stats.absent / stats.total) * 100).toFixed(1)}%</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 border-l-4 border-l-blue-500">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">On Leave</p>
            <Calendar className="size-5 text-blue-500" />
          </div>
          <p className="font-bold text-gray-900">{stats.onLeave}</p>
          <p className="text-xs text-gray-500 mt-1">{((stats.onLeave / stats.total) * 100).toFixed(1)}%</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 border-l-4 border-l-orange-500">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Late Arrivals</p>
            <Clock className="size-5 text-orange-500" />
          </div>
          <p className="font-bold text-gray-900">{stats.late}</p>
          <p className="text-xs text-gray-500 mt-1">{((stats.late / stats.total) * 100).toFixed(1)}%</p>
        </div>
      </div>

      {/* Attendance Records */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900">Today's Attendance</h3>
          <p className="text-sm text-gray-600 mt-1">Showing records for {selectedDate}</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-3 px-4 text-sm text-gray-600">Employee ID</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Name</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Department</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Shift</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Check In</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Check Out</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Hours</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">OT Hours</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {attendanceRecords.map((record) => (
                <tr key={record.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-800">{record.id}</td>
                  <td className="py-3 px-4 text-sm text-gray-800 font-medium">{record.name}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{record.department}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{record.shift}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{record.checkIn}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{record.checkOut}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{record.hours}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{record.overtime}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded ${getStatusColor(record.status)}`}>
                      {getStatusIcon(record.status)}
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Leave Requests */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900">Leave Requests</h3>
              <p className="text-sm text-gray-600 mt-1">Pending approval requests</p>
            </div>
            <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">
              {leaveRequests.filter(l => l.status === 'Pending').length} pending
            </span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-3 px-4 text-sm text-gray-600">Request ID</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Employee</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Leave Type</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">From Date</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">To Date</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Days</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Reason</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Status</th>
                <th className="text-right py-3 px-4 text-sm text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leaveRequests.map((request) => (
                <tr key={request.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-800">{request.id}</td>
                  <td className="py-3 px-4 text-sm text-gray-800 font-medium">{request.employee}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{request.type}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{request.from}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{request.to}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{request.days}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{request.reason}</td>
                  <td className="py-3 px-4">
                    <span className={`text-xs px-2 py-1 rounded ${getStatusColor(request.status)}`}>
                      {request.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    {request.status === 'Pending' && (
                      <div className="flex gap-2 justify-end">
                        <button className="text-xs bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                          Approve
                        </button>
                        <button className="text-xs bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                          Reject
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
