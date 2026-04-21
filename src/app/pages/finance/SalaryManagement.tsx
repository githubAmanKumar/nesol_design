// src/app/pages/finance/SalaryManagement.jsx
import { DollarSign, Download, Send, FileText } from 'lucide-react';

export default function SalaryManagement() {
  const payrollData = [
    {
      empId: 'NES/EMP/001',
      name: 'Rajesh Kumar',
      department: 'Production',
      basic: 25000,
      hra: 10000,
      allowances: 5000,
      gross: 40000,
      pf: 3000,
      esi: 750,
      tds: 2000,
      deductions: 5750,
      netPay: 34250,
      status: 'Processed'
    },
    {
      empId: 'NES/EMP/002',
      name: 'Priya Sharma',
      department: 'Quality',
      basic: 22000,
      hra: 8800,
      allowances: 4200,
      gross: 35000,
      pf: 2640,
      esi: 656,
      tds: 1500,
      deductions: 4796,
      netPay: 30204,
      status: 'Processed'
    },
    {
      empId: 'NES/EMP/003',
      name: 'Amit Singh',
      department: 'Sales',
      basic: 28000,
      hra: 11200,
      allowances: 5800,
      gross: 45000,
      pf: 3360,
      esi: 0,
      tds: 2500,
      deductions: 5860,
      netPay: 39140,
      status: 'Pending'
    },
  ];

  const summaryStats = {
    totalEmployees: 380,
    totalGross: 15200000,
    totalDeductions: 2850000,
    totalNetPay: 12350000,
    processed: 342,
    pending: 38
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-gray-900">Salary Management</h1>
          <p className="text-sm text-gray-600">Process payroll and manage employee salaries</p>
        </div>
        <div className="flex gap-3">
          <select className="px-4 py-2 border border-gray-300 rounded-lg">
            <option>April 2026</option>
            <option>March 2026</option>
            <option>February 2026</option>
          </select>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            <Send className="size-4" />
            Process Payroll
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Total Employees</p>
            <DollarSign className="size-5 text-gray-400" />
          </div>
          <p className="font-bold text-gray-900">{summaryStats.totalEmployees}</p>
          <p className="text-xs text-green-600 mt-1">✓ {summaryStats.processed} processed</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Total Gross</p>
            <DollarSign className="size-5 text-blue-500" />
          </div>
          <p className="font-bold text-gray-900">₹{(summaryStats.totalGross / 100000).toFixed(1)}L</p>
          <p className="text-xs text-gray-500 mt-1">This month</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Total Deductions</p>
            <DollarSign className="size-5 text-orange-500" />
          </div>
          <p className="font-bold text-gray-900">₹{(summaryStats.totalDeductions / 100000).toFixed(1)}L</p>
          <p className="text-xs text-gray-500 mt-1">PF + ESI + TDS</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Net Payable</p>
            <DollarSign className="size-5 text-green-500" />
          </div>
          <p className="font-bold text-gray-900">₹{(summaryStats.totalNetPay / 100000).toFixed(1)}L</p>
          <p className="text-xs text-gray-500 mt-1">After deductions</p>
        </div>
      </div>

      {/* Payroll Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900">Payroll Details - April 2026</h3>
              <p className="text-sm text-gray-600 mt-1">Employee salary breakdown</p>
            </div>
            <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
              <Download className="size-4" />
              Export All
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-3 px-4 text-xs text-gray-600">Emp ID</th>
                <th className="text-left py-3 px-4 text-xs text-gray-600">Name</th>
                <th className="text-left py-3 px-4 text-xs text-gray-600">Department</th>
                <th className="text-right py-3 px-4 text-xs text-gray-600">Basic</th>
                <th className="text-right py-3 px-4 text-xs text-gray-600">HRA</th>
                <th className="text-right py-3 px-4 text-xs text-gray-600">Allowances</th>
                <th className="text-right py-3 px-4 text-xs text-gray-600">Gross</th>
                <th className="text-right py-3 px-4 text-xs text-gray-600">PF</th>
                <th className="text-right py-3 px-4 text-xs text-gray-600">ESI</th>
                <th className="text-right py-3 px-4 text-xs text-gray-600">TDS</th>
                <th className="text-right py-3 px-4 text-xs text-gray-600">Deductions</th>
                <th className="text-right py-3 px-4 text-xs text-gray-600">Net Pay</th>
                <th className="text-left py-3 px-4 text-xs text-gray-600">Status</th>
                <th className="text-right py-3 px-4 text-xs text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {payrollData.map((emp) => (
                <tr key={emp.empId} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-800">{emp.empId}</td>
                  <td className="py-3 px-4 text-gray-800 font-medium">{emp.name}</td>
                  <td className="py-3 px-4 text-gray-600">{emp.department}</td>
                  <td className="py-3 px-4 text-right text-gray-600">₹{emp.basic.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right text-gray-600">₹{emp.hra.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right text-gray-600">₹{emp.allowances.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right text-gray-800 font-medium">₹{emp.gross.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right text-red-600">₹{emp.pf.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right text-red-600">₹{emp.esi.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right text-red-600">₹{emp.tds.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right text-red-600 font-medium">₹{emp.deductions.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right text-green-600 font-bold">₹{emp.netPay.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <span className={`text-xs px-2 py-1 rounded ${
                      emp.status === 'Processed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {emp.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button className="text-blue-600 hover:text-blue-700 p-1">
                      <FileText className="size-4" />
                    </button>
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
