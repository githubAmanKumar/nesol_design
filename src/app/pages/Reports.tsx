// src/app/pages/Reports.tsx
import { useState } from 'react';
import { 
  FileText, Download, Calendar, Filter, TrendingUp, TrendingDown,
  Package, ShoppingCart, DollarSign, Users, Truck, BarChart3,
  PieChart, LineChart, Clock, CheckCircle, AlertCircle,
  Mail, Settings, ChevronDown, Printer, Eye, RefreshCw,
  Target, Activity, Wrench, Shield
} from 'lucide-react';
import {
  BarChart, Bar, LineChart as RechartsLineChart, Line, PieChart as RechartsPieChart, Pie,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts';

export default function Reports() {
  const [activeTab, setActiveTab] = useState<'production' | 'sales' | 'finance' | 'hr' | 'procurement' | 'inventory'>('production');
  const [dateRange, setDateRange] = useState('April 2026');

  // Production Summary Data
  const productionData = [
    { sku: 'NES-AUTO-150AH', target: 12000, actual: 11850, rejected: 150, efficiency: 98.8, downtime: 12 },
    { sku: 'NES-AUTO-100AH', target: 10000, actual: 9850, rejected: 120, efficiency: 98.5, downtime: 8 },
    { sku: 'NES-INV-200AH', target: 5000, actual: 5100, rejected: 75, efficiency: 102.0, downtime: 6 },
    { sku: 'NES-INV-150AH', target: 4000, actual: 3950, rejected: 50, efficiency: 98.8, downtime: 4 },
    { sku: 'NES-ERIK-120AH', target: 6000, actual: 5850, rejected: 90, efficiency: 97.5, downtime: 10 },
    { sku: 'NES-SOLAR-40AH', target: 3000, actual: 3050, rejected: 30, efficiency: 101.7, downtime: 3 },
  ];

  // Sales Summary Data
  const salesData = [
    { region: 'North', rep: 'Amit Singh', orders: 45, invoiced: 2850000, outstanding: 850000, target: 2500000, achieved: 114 },
    { region: 'West', rep: 'Suresh Patel', orders: 38, invoiced: 2250000, outstanding: 450000, target: 2000000, achieved: 112.5 },
    { region: 'South', rep: 'Ravi Kumar', orders: 32, invoiced: 1950000, outstanding: 380000, target: 1800000, achieved: 108.3 },
    { region: 'East', rep: 'Anil Sharma', orders: 28, invoiced: 1680000, outstanding: 320000, target: 1600000, achieved: 105 },
    { region: 'Central', rep: 'Deepak Singh', orders: 22, invoiced: 1250000, outstanding: 280000, target: 1200000, achieved: 104.2 },
  ];

  // Finance Summary Data
  const financeData = [
    { department: 'Production', revenue: 12500000, directExpenses: 8500000, indirectExpenses: 1200000, grossProfit: 4000000, netProfit: 2800000 },
    { department: 'Sales', revenue: 8980000, directExpenses: 5200000, indirectExpenses: 800000, grossProfit: 3780000, netProfit: 2980000 },
    { department: 'R&D', revenue: 0, directExpenses: 1500000, indirectExpenses: 300000, grossProfit: -1500000, netProfit: -1800000 },
    { department: 'HR', revenue: 0, directExpenses: 2400000, indirectExpenses: 200000, grossProfit: -2400000, netProfit: -2600000 },
    { department: 'Admin', revenue: 0, directExpenses: 1800000, indirectExpenses: 400000, grossProfit: -1800000, netProfit: -2200000 },
  ];

  // HR Summary Data
  const hrData = [
    { department: 'Production', headcountStart: 185, headcountEnd: 188, attrition: 3, attritionPercent: 1.6, payrollCost: 4850000, overtimeCost: 125000 },
    { department: 'Sales', headcountStart: 42, headcountEnd: 45, attrition: 2, attritionPercent: 4.8, payrollCost: 1650000, overtimeCost: 45000 },
    { department: 'Quality', headcountStart: 28, headcountEnd: 27, attrition: 1, attritionPercent: 3.6, payrollCost: 980000, overtimeCost: 18000 },
    { department: 'R&D', headcountStart: 18, headcountEnd: 18, attrition: 0, attritionPercent: 0, payrollCost: 875000, overtimeCost: 12000 },
    { department: 'HR', headcountStart: 8, headcountEnd: 8, attrition: 0, attritionPercent: 0, payrollCost: 320000, overtimeCost: 5000 },
    { department: 'Finance', headcountStart: 12, headcountEnd: 12, attrition: 0, attritionPercent: 0, payrollCost: 500000, overtimeCost: 8000 },
    { department: 'Logistics', headcountStart: 15, headcountEnd: 16, attrition: 1, attritionPercent: 6.7, payrollCost: 420000, overtimeCost: 22000 },
  ];

  // Procurement Summary Data
  const procurementData = [
    { vendor: 'Metal Suppliers Ltd', posIssued: 8, grnsCompleted: 7, pendingDeliveries: 2, purchaseValue: 2850000 },
    { vendor: 'PlastChem Industries', posIssued: 6, grnsCompleted: 5, pendingDeliveries: 1, purchaseValue: 1250000 },
    { vendor: 'Acid Suppliers Co', posIssued: 4, grnsCompleted: 3, pendingDeliveries: 1, purchaseValue: 850000 },
    { vendor: 'Separator Tech', posIssued: 5, grnsCompleted: 5, pendingDeliveries: 0, purchaseValue: 450000 },
    { vendor: 'VRL Logistics', posIssued: 12, grnsCompleted: 12, pendingDeliveries: 0, purchaseValue: 185000 },
  ];

  // Inventory Summary Data
  const inventoryData = [
    { sku: 'NES-AUTO-150AH', opening: 450, inward: 1200, outward: 1150, closing: 500, value: 1925000, daysCover: 13, slowMoving: false },
    { sku: 'NES-AUTO-100AH', opening: 320, inward: 1000, outward: 980, closing: 340, value: 969000, daysCover: 10, slowMoving: false },
    { sku: 'NES-INV-200AH', opening: 150, inward: 500, outward: 480, closing: 170, value: 2125000, daysCover: 11, slowMoving: false },
    { sku: 'NES-INV-150AH', opening: 200, inward: 400, outward: 390, closing: 210, value: 1995000, daysCover: 16, slowMoving: true },
    { sku: 'NES-ERIK-120AH', opening: 80, inward: 600, outward: 580, closing: 100, value: 850000, daysCover: 5, slowMoving: false },
    { sku: 'NES-SOLAR-40AH', opening: 60, inward: 300, outward: 310, closing: 50, value: 210000, daysCover: 5, slowMoving: false },
  ];

  const scheduledReports = [
    { name: 'Daily Production Report', recipients: 'production@nesol.in, planthead@nesol.in', frequency: 'Daily', time: '06:00 PM', lastSent: '2026-04-16 18:05', status: 'Sent' },
    { name: 'Weekly Sales Summary', recipients: 'sales@nesol.in, director@nesol.in', frequency: 'Weekly', time: 'Monday 09:00 AM', lastSent: '2026-04-15 09:00', status: 'Sent' },
    { name: 'Monthly Financial Report', recipients: 'finance@nesol.in, accounts@nesol.in', frequency: 'Monthly', time: '1st, 09:00 AM', lastSent: '2026-04-01 09:15', status: 'Sent' },
    { name: 'HR Monthly Dashboard', recipients: 'hr@nesol.in, hrhead@nesol.in', frequency: 'Monthly', time: '1st, 10:00 AM', lastSent: '2026-04-01 10:05', status: 'Sent' },
  ];

  const kpiWidgets = [
    { name: "Today's Production vs Target", value: 442, target: 450, unit: 'units', percentage: 98.2, icon: Package, color: 'blue' },
    { name: 'Monthly Revenue vs Budget', value: 89.8, target: 100, unit: 'L', percentage: 89.8, icon: DollarSign, color: 'green' },
    { name: "Today's Attendance %", value: 90, target: 95, unit: '%', percentage: 90, icon: Users, color: 'purple' },
    { name: 'Pending Customer Complaints', value: 12, target: 5, unit: 'tickets', percentage: 240, icon: AlertCircle, color: 'red' },
  ];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444', '#06b6d4', '#ec4899'];

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)} L`;
    }
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString('en-IN');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-sm text-gray-600">Generate management reports and insights</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Mail className="size-4" />
            Schedule Report
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download className="size-4" />
            Export All
          </button>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            <FileText className="size-4" />
            Generate Report
          </button>
        </div>
      </div>

      {/* KPI Dashboard Widgets */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {kpiWidgets.map((kpi) => {
          const Icon = kpi.icon;
          const isOverTarget = kpi.name.includes('Complaints') ? kpi.value <= kpi.target : kpi.value >= kpi.target;
          return (
            <div key={kpi.name} className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded bg-${kpi.color}-50`}>
                  <Icon className={`size-5 text-${kpi.color}-500`} />
                </div>
                {isOverTarget ? (
                  <TrendingUp className="size-4 text-green-500" />
                ) : (
                  <TrendingDown className="size-4 text-red-500" />
                )}
              </div>
              <p className="text-xs text-gray-600 mb-1">{kpi.name}</p>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-gray-900">
                  {kpi.value}{kpi.unit !== 'L' && kpi.unit !== '%' ? ` ${kpi.unit}` : kpi.unit === 'L' ? 'L' : '%'}
                </span>
                <span className="text-xs text-gray-500">/ {kpi.target}{kpi.unit === 'L' ? 'L' : ''}</span>
              </div>
              <div className="mt-2 bg-gray-200 rounded-full h-1.5">
                <div 
                  className={`h-1.5 rounded-full ${isOverTarget ? 'bg-green-500' : 'bg-orange-500'}`}
                  style={{ width: `${Math.min(kpi.percentage, 100)}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Click to drill down</p>
            </div>
          );
        })}
      </div>

      {/* Report Type Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex gap-6 overflow-x-auto">
          {(['production', 'sales', 'finance', 'hr', 'procurement', 'inventory'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)} Summary
            </button>
          ))}
        </nav>
      </div>

      {/* Date Range Selector */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <select 
            className="px-4 py-2 border border-gray-300 rounded-lg"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option>April 2026</option>
            <option>March 2026</option>
            <option>February 2026</option>
            <option>Q1 2026</option>
            <option>2025-2026</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Calendar className="size-4" />
            Custom Range
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="size-4" />
            More Filters
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded" title="Print">
            <Printer className="size-4 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded" title="Export PDF">
            <FileText className="size-4 text-red-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded" title="Export Excel">
            <Download className="size-4 text-green-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded" title="Refresh">
            <RefreshCw className="size-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Production Summary */}
      {activeTab === 'production' && (
        <div className="space-y-6">
          {/* Production Chart */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Production Trend (Units)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={productionData.slice(0, 5)}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="sku" stroke="#6b7280" fontSize={11} />
                <YAxis stroke="#6b7280" fontSize={11} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
                />
                <Legend />
                <Bar dataKey="target" fill="#94a3b8" name="Target" />
                <Bar dataKey="actual" fill="#3b82f6" name="Actual" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Production Table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left py-3 px-4 text-xs text-gray-600">SKU</th>
                    <th className="text-right py-3 px-4 text-xs text-gray-600">Target Qty</th>
                    <th className="text-right py-3 px-4 text-xs text-gray-600">Actual Qty</th>
                    <th className="text-right py-3 px-4 text-xs text-gray-600">Rejection Qty</th>
                    <th className="text-right py-3 px-4 text-xs text-gray-600">Efficiency %</th>
                    <th className="text-right py-3 px-4 text-xs text-gray-600">Downtime Hours</th>
                  </tr>
                </thead>
                <tbody>
                  {productionData.map((item) => (
                    <tr key={item.sku} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm font-mono text-gray-800">{item.sku}</td>
                      <td className="py-3 px-4 text-right text-sm text-gray-600">{formatNumber(item.target)}</td>
                      <td className="py-3 px-4 text-right text-sm text-gray-900">{formatNumber(item.actual)}</td>
                      <td className="py-3 px-4 text-right text-sm text-red-600">{item.rejected}</td>
                      <td className="py-3 px-4 text-right">
                        <span className={`text-sm font-medium ${item.efficiency >= 100 ? 'text-green-600' : 'text-orange-600'}`}>
                          {item.efficiency}%
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right text-sm text-gray-600">{item.downtime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Sales Summary */}
      {activeTab === 'sales' && (
        <div className="space-y-6">
          {/* Sales Chart */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Sales Performance by Region</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="region" stroke="#6b7280" fontSize={11} />
                <YAxis stroke="#6b7280" fontSize={11} />
                <Tooltip 
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
                />
                <Legend />
                <Bar dataKey="invoiced" fill="#10b981" name="Invoiced Amount" />
                <Bar dataKey="outstanding" fill="#f59e0b" name="Outstanding" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Sales Table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left py-3 px-4 text-xs text-gray-600">Region</th>
                    <th className="text-left py-3 px-4 text-xs text-gray-600">Sales Rep</th>
                    <th className="text-right py-3 px-4 text-xs text-gray-600">Total Orders</th>
                    <th className="text-right py-3 px-4 text-xs text-gray-600">Invoiced Amount</th>
                    <th className="text-right py-3 px-4 text-xs text-gray-600">Outstanding</th>
                    <th className="text-right py-3 px-4 text-xs text-gray-600">Target</th>
                    <th className="text-right py-3 px-4 text-xs text-gray-600">Achieved %</th>
                  </tr>
                </thead>
                <tbody>
                  {salesData.map((item) => (
                    <tr key={item.region} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm font-medium text-gray-900">{item.region}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{item.rep}</td>
                      <td className="py-3 px-4 text-right text-sm text-gray-900">{item.orders}</td>
                      <td className="py-3 px-4 text-right text-sm text-green-600">{formatCurrency(item.invoiced)}</td>
                      <td className="py-3 px-4 text-right text-sm text-orange-600">{formatCurrency(item.outstanding)}</td>
                      <td className="py-3 px-4 text-right text-sm text-gray-600">{formatCurrency(item.target)}</td>
                      <td className="py-3 px-4 text-right">
                        <span className={`text-sm font-medium ${item.achieved >= 100 ? 'text-green-600' : 'text-orange-600'}`}>
                          {item.achieved}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Finance Summary */}
      {activeTab === 'finance' && (
        <div className="space-y-6">
          {/* Finance Chart */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Department-wise P&L (₹ Lakhs)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={financeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="department" stroke="#6b7280" fontSize={11} />
                <YAxis stroke="#6b7280" fontSize={11} />
                <Tooltip 
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
                />
                <Legend />
                <Bar dataKey="revenue" fill="#10b981" name="Revenue" />
                <Bar dataKey="grossProfit" fill="#3b82f6" name="Gross Profit" />
                <Bar dataKey="netProfit" fill="#8b5cf6" name="Net Profit" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Finance Table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left py-3 px-4 text-xs text-gray-600">Department</th>
                    <th className="text-right py-3 px-4 text-xs text-gray-600">Revenue</th>
                    <th className="text-right py-3 px-4 text-xs text-gray-600">Direct Expenses</th>
                    <th className="text-right py-3 px-4 text-xs text-gray-600">Indirect Expenses</th>
                    <th className="text-right py-3 px-4 text-xs text-gray-600">Gross Profit</th>
                    <th className="text-right py-3 px-4 text-xs text-gray-600">Net Profit</th>
                  </tr>
                </thead>
                <tbody>
                  {financeData.map((item) => (
                    <tr key={item.department} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm font-medium text-gray-900">{item.department}</td>
                      <td className="py-3 px-4 text-right text-sm text-gray-600">
                        {item.revenue > 0 ? formatCurrency(item.revenue) : '—'}
                      </td>
                      <td className="py-3 px-4 text-right text-sm text-orange-600">{formatCurrency(item.directExpenses)}</td>
                      <td className="py-3 px-4 text-right text-sm text-gray-600">{formatCurrency(item.indirectExpenses)}</td>
                      <td className="py-3 px-4 text-right">
                        <span className={`text-sm font-medium ${item.grossProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {formatCurrency(item.grossProfit)}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className={`text-sm font-medium ${item.netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {formatCurrency(item.netProfit)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* HR Summary */}
      {activeTab === 'hr' && (
        <div className="space-y-6">
          {/* HR Chart - Headcount */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Department Headcount</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={hrData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ department, headcountEnd }) => `${department}: ${headcountEnd}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="headcountEnd"
                  nameKey="department"
                >
                  {hrData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => [`${value} employees`, '']}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
                />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>

          {/* HR Table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left py-3 px-4 text-xs text-gray-600">Department</th>
                    <th className="text-right py-3 px-4 text-xs text-gray-600">Headcount (Start)</th>
                    <th className="text-right py-3 px-4 text-xs text-gray-600">Headcount (End)</th>
                    <th className="text-right py-3 px-4 text-xs text-gray-600">Attrition</th>
                    <th className="text-right py-3 px-4 text-xs text-gray-600">Attrition %</th>
                    <th className="text-right py-3 px-4 text-xs text-gray-600">Payroll Cost</th>
                    <th className="text-right py-3 px-4 text-xs text-gray-600">Overtime Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {hrData.map((item) => (
                    <tr key={item.department} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm font-medium text-gray-900">{item.department}</td>
                      <td className="py-3 px-4 text-right text-sm text-gray-600">{item.headcountStart}</td>
                      <td className="py-3 px-4 text-right text-sm text-gray-900">{item.headcountEnd}</td>
                      <td className="py-3 px-4 text-right text-sm text-gray-600">{item.attrition}</td>
                      <td className="py-3 px-4 text-right">
                        <span className={`text-sm ${item.attritionPercent > 5 ? 'text-red-600' : 'text-green-600'}`}>
                          {item.attritionPercent}%
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right text-sm text-gray-600">{formatCurrency(item.payrollCost)}</td>
                      <td className="py-3 px-4 text-right text-sm text-orange-600">{formatCurrency(item.overtimeCost)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Procurement Summary */}
      {activeTab === 'procurement' && (
        <div className="space-y-6">
          {/* Procurement Table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left py-3 px-4 text-xs text-gray-600">Vendor</th>
                    <th className="text-right py-3 px-4 text-xs text-gray-600">POs Issued</th>
                    <th className="text-right py-3 px-4 text-xs text-gray-600">GRNs Completed</th>
                    <th className="text-right py-3 px-4 text-xs text-gray-600">Pending Deliveries</th>
                    <th className="text-right py-3 px-4 text-xs text-gray-600">Total Purchase Value</th>
                  </tr>
                </thead>
                <tbody>
                  {procurementData.map((item) => (
                    <tr key={item.vendor} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm font-medium text-gray-900">{item.vendor}</td>
                      <td className="py-3 px-4 text-right text-sm text-gray-600">{item.posIssued}</td>
                      <td className="py-3 px-4 text-right text-sm text-green-600">{item.grnsCompleted}</td>
                      <td className="py-3 px-4 text-right">
                        <span className={`text-sm font-medium ${item.pendingDeliveries > 0 ? 'text-orange-600' : 'text-gray-600'}`}>
                          {item.pendingDeliveries}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right text-sm font-medium text-gray-900">{formatCurrency(item.purchaseValue)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Inventory Summary */}
      {activeTab === 'inventory' && (
        <div className="space-y-6">
          {/* Inventory Table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left py-3 px-4 text-xs text-gray-600">SKU</th>
                    <th className="text-right py-3 px-4 text-xs text-gray-600">Opening Stock</th>
                    <th className="text-right py-3 px-4 text-xs text-gray-600">Inward</th>
                    <th className="text-right py-3 px-4 text-xs text-gray-600">Outward</th>
                    <th className="text-right py-3 px-4 text-xs text-gray-600">Closing Stock</th>
                    <th className="text-right py-3 px-4 text-xs text-gray-600">Value</th>
                    <th className="text-right py-3 px-4 text-xs text-gray-600">Days of Cover</th>
                    <th className="text-left py-3 px-4 text-xs text-gray-600">Slow Moving</th>
                  </tr>
                </thead>
                <tbody>
                  {inventoryData.map((item) => (
                    <tr key={item.sku} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm font-mono text-gray-800">{item.sku}</td>
                      <td className="py-3 px-4 text-right text-sm text-gray-600">{item.opening}</td>
                      <td className="py-3 px-4 text-right text-sm text-green-600">{item.inward}</td>
                      <td className="py-3 px-4 text-right text-sm text-orange-600">{item.outward}</td>
                      <td className="py-3 px-4 text-right text-sm font-medium text-gray-900">{item.closing}</td>
                      <td className="py-3 px-4 text-right text-sm text-gray-600">{formatCurrency(item.value)}</td>
                      <td className="py-3 px-4 text-right text-sm text-gray-600">{item.daysCover}</td>
                      <td className="py-3 px-4">
                        {item.slowMoving ? (
                          <span className="text-xs px-2 py-1 rounded bg-yellow-100 text-yellow-700">Yes</span>
                        ) : (
                          <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-700">No</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Scheduled Reports Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">Scheduled Reports</h3>
          <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm">
            <Settings className="size-4" />
            Manage Schedules
          </button>
        </div>
        <div className="space-y-3">
          {scheduledReports.map((report) => (
            <div key={report.name} className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{report.name}</p>
                <p className="text-xs text-gray-500">{report.recipients}</p>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-xs text-gray-500">Frequency</p>
                  <p className="text-sm text-gray-700">{report.frequency}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500">Time</p>
                  <p className="text-sm text-gray-700">{report.time}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500">Last Sent</p>
                  <p className="text-sm text-gray-700">{new Date(report.lastSent).toLocaleString('en-IN')}</p>
                </div>
                <div>
                  <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-700">
                    {report.status}
                  </span>
                </div>
                <button className="p-2 text-gray-400 hover:text-blue-600 rounded">
                  <Mail className="size-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Export Options Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <Download className="size-5 text-blue-500" />
          <div>
            <h4 className="font-medium text-blue-800">Export Options</h4>
            <p className="text-sm text-blue-600">
              Reports can be exported as PDF (with Nesol Energies letterhead), Excel (.xlsx), or CSV format.
              Use the export buttons above each report to download in your preferred format.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}