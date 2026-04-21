// src/app/pages/finance/BudgetingForecasting.tsx
import { useState } from 'react';
import { 
  TrendingUp, TrendingDown, DollarSign, Calendar, 
  Download, Filter, Plus, Eye, AlertCircle, CheckCircle,
  BarChart3, LineChart, PieChart as PieChartIcon, Target,
  ChevronDown, ChevronRight, Edit, MoreVertical, Bell,
  Mail, Clock, Building2
} from 'lucide-react';
import { 
  BarChart, Bar, LineChart as RechartsLineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

export default function BudgetingForecasting() {
  const [selectedYear, setSelectedYear] = useState('2026-2027');
  const [expandedDept, setExpandedDept] = useState<string | null>('Production');
  const [activeTab, setActiveTab] = useState<'budget' | 'variance' | 'forecast'>('budget');

  const annualBudgets = [
    {
      id: 'BUD/2026/001',
      financialYear: '2026-2027',
      department: 'Production',
      budgetHeads: [
        { head: 'Salary & Wages', planned: 4800000, actual: 1200000, monthly: [400000, 400000, 400000, 400000, 400000, 400000, 400000, 400000, 400000, 400000, 400000, 400000] },
        { head: 'Consumables', planned: 2500000, actual: 580000, monthly: [200000, 200000, 200000, 220000, 220000, 200000, 200000, 220000, 220000, 200000, 200000, 220000] },
        { head: 'Machinery Maintenance', planned: 1800000, actual: 420000, monthly: [150000, 150000, 150000, 150000, 150000, 150000, 150000, 150000, 150000, 150000, 150000, 150000] },
        { head: 'Power & Utilities', planned: 1200000, actual: 310000, monthly: [100000, 100000, 100000, 100000, 100000, 100000, 100000, 100000, 100000, 100000, 100000, 100000] },
      ],
      totalAnnual: 10300000,
      totalActual: 2510000,
      approvedBy: 'Plant Head',
      status: 'Active',
    },
    {
      id: 'BUD/2026/002',
      financialYear: '2026-2027',
      department: 'Sales',
      budgetHeads: [
        { head: 'Salary & Commission', planned: 5600000, actual: 1350000, monthly: [450000, 450000, 450000, 480000, 480000, 450000, 450000, 480000, 480000, 450000, 450000, 480000] },
        { head: 'Travel', planned: 1800000, actual: 520000, monthly: [150000, 150000, 150000, 150000, 150000, 150000, 150000, 150000, 150000, 150000, 150000, 150000] },
        { head: 'Marketing', planned: 3200000, actual: 850000, monthly: [250000, 250000, 250000, 300000, 300000, 250000, 250000, 300000, 300000, 250000, 250000, 250000] },
        { head: 'Client Entertainment', planned: 600000, actual: 145000, monthly: [50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000] },
      ],
      totalAnnual: 11200000,
      totalActual: 2865000,
      approvedBy: 'Sales Director',
      status: 'Active',
    },
    {
      id: 'BUD/2026/003',
      financialYear: '2026-2027',
      department: 'R&D',
      budgetHeads: [
        { head: 'Salary', planned: 3500000, actual: 875000, monthly: [290000, 290000, 290000, 290000, 290000, 290000, 290000, 290000, 290000, 290000, 290000, 290000] },
        { head: 'Testing Equipment', planned: 1500000, actual: 280000, monthly: [120000, 120000, 120000, 120000, 120000, 120000, 120000, 120000, 120000, 120000, 120000, 120000] },
        { head: 'Prototype Materials', planned: 800000, actual: 195000, monthly: [65000, 65000, 65000, 65000, 65000, 65000, 65000, 65000, 65000, 65000, 65000, 65000] },
      ],
      totalAnnual: 5800000,
      totalActual: 1350000,
      approvedBy: 'R&D Head',
      status: 'Active',
    },
    {
      id: 'BUD/2026/004',
      financialYear: '2026-2027',
      department: 'HR',
      budgetHeads: [
        { head: 'Salary', planned: 2400000, actual: 600000, monthly: [200000, 200000, 200000, 200000, 200000, 200000, 200000, 200000, 200000, 200000, 200000, 200000] },
        { head: 'Recruitment', planned: 500000, actual: 135000, monthly: [40000, 40000, 40000, 40000, 40000, 40000, 40000, 40000, 40000, 40000, 40000, 40000] },
        { head: 'Training & Development', planned: 600000, actual: 125000, monthly: [50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000] },
        { head: 'Employee Welfare', planned: 400000, actual: 95000, monthly: [33000, 33000, 33000, 33000, 33000, 33000, 33000, 33000, 33000, 33000, 33000, 33000] },
      ],
      totalAnnual: 3900000,
      totalActual: 955000,
      approvedBy: 'HR Head',
      status: 'Active',
    },
    {
      id: 'BUD/2026/005',
      financialYear: '2026-2027',
      department: 'Finance',
      budgetHeads: [
        { head: 'Salary', planned: 2000000, actual: 500000, monthly: [165000, 165000, 165000, 165000, 165000, 165000, 165000, 165000, 165000, 165000, 165000, 165000] },
        { head: 'Audit & Compliance', planned: 400000, actual: 85000, monthly: [33000, 33000, 33000, 33000, 33000, 33000, 33000, 33000, 33000, 33000, 33000, 33000] },
        { head: 'Software Subscriptions', planned: 300000, actual: 75000, monthly: [25000, 25000, 25000, 25000, 25000, 25000, 25000, 25000, 25000, 25000, 25000, 25000] },
      ],
      totalAnnual: 2700000,
      totalActual: 660000,
      approvedBy: 'CFO',
      status: 'Active',
    },
  ];

  const varianceAlerts = [
    {
      id: 'ALT/001',
      department: 'Sales',
      budgetHead: 'Travel',
      planned: 450000,
      actual: 520000,
      variance: 70000,
      variancePercent: 15.56,
      alertTrigger: 'Variance > 10%',
      alertSentTo: 'sales.head@nesol.in, finance@nesol.in',
      alertMessage: 'Sales Travel expenses exceeded budget by 15.56% for April',
      date: '2026-04-15',
      status: 'Active',
    },
    {
      id: 'ALT/002',
      department: 'Production',
      budgetHead: 'Consumables',
      planned: 200000,
      actual: 235000,
      variance: 35000,
      variancePercent: 17.5,
      alertTrigger: 'Variance > 10%',
      alertSentTo: 'production.head@nesol.in, finance@nesol.in',
      alertMessage: 'Production Consumables exceeded budget by 17.5% for April',
      date: '2026-04-18',
      status: 'Active',
    },
  ];

  const forecasts = [
    {
      year: '2026-2027',
      projectedRevenue: 185000000,
      projectedExpense: 142000000,
      projectedProfit: 43000000,
      assumptions: 'Market growth 12%, New product launch in Q3, Export expansion',
      notes: 'Conservative estimate based on current order book and pipeline',
    },
    {
      year: '2027-2028',
      projectedRevenue: 225000000,
      projectedExpense: 168000000,
      projectedProfit: 57000000,
      assumptions: 'Market growth 15%, Full year impact of new products, Automation benefits',
      notes: 'Includes expansion to new territories',
    },
    {
      year: '2028-2029',
      projectedRevenue: 280000000,
      projectedExpense: 205000000,
      projectedProfit: 75000000,
      assumptions: 'Market leadership in e-rickshaw segment, Export to 5 new countries',
      notes: 'Assumes successful implementation of capacity expansion',
    },
  ];

  // Department-wise data for charts
  const departmentChartData = annualBudgets.map(dept => ({
    name: dept.department,
    planned: dept.totalAnnual / 100000,
    actual: dept.totalActual / 100000,
  }));

  // Monthly trend data
  const monthlyTrendData = [
    { month: 'Apr', Production: 2.51, Sales: 2.86, Rnd: 1.35, HR: 0.95, Finance: 0.66 },
    { month: 'May', Production: 2.48, Sales: 2.75, Rnd: 1.32, HR: 0.94, Finance: 0.65 },
    { month: 'Jun', Production: 2.55, Sales: 2.92, Rnd: 1.38, HR: 0.96, Finance: 0.67 },
    { month: 'Jul', Production: 2.60, Sales: 2.98, Rnd: 1.40, HR: 0.97, Finance: 0.68 },
    { month: 'Aug', Production: 2.58, Sales: 3.05, Rnd: 1.42, HR: 0.98, Finance: 0.67 },
    { month: 'Sep', Production: 2.65, Sales: 3.10, Rnd: 1.45, HR: 0.99, Finance: 0.69 },
  ];

  // Expense category split
  const categorySplitData = [
    { name: 'Salary & Wages', value: 52 },
    { name: 'Consumables', value: 15 },
    { name: 'Marketing', value: 10 },
    { name: 'Travel', value: 8 },
    { name: 'Maintenance', value: 6 },
    { name: 'R&D Materials', value: 5 },
    { name: 'Others', value: 4 },
  ];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444', '#06b6d4', '#6b7280'];

  const stats = {
    totalAnnualBudget: annualBudgets.reduce((sum, d) => sum + d.totalAnnual, 0),
    totalActualYTD: annualBudgets.reduce((sum, d) => sum + d.totalActual, 0),
    budgetUtilization: 24.5,
    departmentsOverBudget: 1,
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)} L`;
    }
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-gray-900">Budgeting & Forecasting</h1>
          <p className="text-sm text-gray-600">Plan and track budgets vs actual expenditure</p>
        </div>
        <div className="flex gap-3">
          <select 
            className="px-4 py-2 border border-gray-300 rounded-lg"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option>2026-2027</option>
            <option>2025-2026</option>
            <option>2027-2028</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download className="size-4" />
            Export
          </button>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            <Plus className="size-4" />
            New Budget
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <Target className="size-4 text-blue-500" />
            <p className="text-xs text-gray-600">Annual Budget FY27</p>
          </div>
          <p className="text-xl font-bold text-gray-900">{formatCurrency(stats.totalAnnualBudget)}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="size-4 text-green-500" />
            <p className="text-xs text-gray-600">Actual YTD</p>
          </div>
          <p className="text-xl font-bold text-gray-900">{formatCurrency(stats.totalActualYTD)}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="size-4 text-purple-500" />
            <p className="text-xs text-gray-600">Budget Utilization</p>
          </div>
          <p className="text-xl font-bold text-gray-900">{stats.budgetUtilization}%</p>
          <div className="mt-1 bg-gray-200 rounded-full h-1.5">
            <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: `${stats.budgetUtilization}%` }} />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="size-4 text-orange-500" />
            <p className="text-xs text-gray-600">Departments Over Budget</p>
          </div>
          <p className="text-xl font-bold text-gray-900">{stats.departmentsOverBudget}</p>
        </div>
      </div>

      {/* Variance Alerts */}
      {varianceAlerts.length > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <Bell className="size-5 text-orange-500" />
            <h3 className="font-medium text-orange-800">Budget Variance Alerts</h3>
            <span className="text-xs bg-orange-200 text-orange-800 px-2 py-0.5 rounded-full">
              {varianceAlerts.length} active
            </span>
          </div>
          <div className="space-y-2">
            {varianceAlerts.map((alert) => (
              <div key={alert.id} className="flex items-center justify-between bg-white rounded p-3">
                <div className="flex items-center gap-3">
                  <AlertCircle className="size-4 text-orange-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {alert.department} - {alert.budgetHead}
                    </p>
                    <p className="text-xs text-gray-500">{alert.alertMessage}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Variance</p>
                    <p className="text-sm font-semibold text-red-600">
                      +{alert.variancePercent.toFixed(1)}% (₹{alert.variance.toLocaleString()})
                    </p>
                  </div>
                  <button className="text-sm text-blue-600 hover:text-blue-700">
                    Review
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* View Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex gap-6">
          {(['budget', 'variance', 'forecast'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab === 'budget' ? 'Annual Budget' : tab === 'variance' ? 'Budget vs Actual' : 'Forecasting'}
            </button>
          ))}
        </nav>
      </div>

      {/* Content - Annual Budget */}
      {activeTab === 'budget' && (
        <div className="space-y-4">
          {annualBudgets.map((dept) => (
            <div key={dept.id} className="bg-white rounded-lg border border-gray-200">
              <div 
                className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50"
                onClick={() => setExpandedDept(expandedDept === dept.department ? null : dept.department)}
              >
                <div className="flex items-center gap-4">
                  {expandedDept === dept.department ? (
                    <ChevronDown className="size-5 text-gray-400" />
                  ) : (
                    <ChevronRight className="size-5 text-gray-400" />
                  )}
                  <div>
                    <h3 className="font-semibold text-gray-900">{dept.department}</h3>
                    <p className="text-xs text-gray-500">Budget ID: {dept.id} • Approved by: {dept.approvedBy}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Annual Budget</p>
                    <p className="text-lg font-bold text-gray-900">{formatCurrency(dept.totalAnnual)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Actual YTD</p>
                    <p className="text-lg font-semibold text-blue-600">{formatCurrency(dept.totalActual)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Remaining</p>
                    <p className="text-lg font-semibold text-green-600">
                      {formatCurrency(dept.totalAnnual - dept.totalActual)}
                    </p>
                  </div>
                  <button className="p-2 hover:bg-gray-100 rounded">
                    <MoreVertical className="size-4 text-gray-400" />
                  </button>
                </div>
              </div>
              
              {expandedDept === dept.department && (
                <div className="border-t border-gray-200 p-4 bg-gray-50">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2 px-3 text-xs text-gray-600">Budget Head</th>
                        <th className="text-right py-2 px-3 text-xs text-gray-600">Annual Plan</th>
                        <th className="text-right py-2 px-3 text-xs text-gray-600">YTD Actual</th>
                        <th className="text-right py-2 px-3 text-xs text-gray-600">Variance</th>
                        <th className="text-right py-2 px-3 text-xs text-gray-600">Utilization</th>
                        <th className="text-center py-2 px-3 text-xs text-gray-600">Monthly Breakdown</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dept.budgetHeads.map((head, idx) => {
                        const variance = head.actual - (head.planned * 0.25); // Assuming 3 months YTD
                        const variancePercent = (variance / (head.planned * 0.25)) * 100;
                        const utilization = (head.actual / head.planned) * 100;
                        
                        return (
                          <tr key={idx} className="border-b border-gray-100">
                            <td className="py-2 px-3 text-sm font-medium text-gray-900">{head.head}</td>
                            <td className="py-2 px-3 text-right text-sm text-gray-600">{formatCurrency(head.planned)}</td>
                            <td className="py-2 px-3 text-right text-sm text-gray-900">{formatCurrency(head.actual)}</td>
                            <td className="py-2 px-3 text-right">
                              <span className={`text-sm ${variance > 0 ? 'text-red-600' : 'text-green-600'}`}>
                                {variance > 0 ? '+' : ''}{formatCurrency(variance)} ({variancePercent.toFixed(1)}%)
                              </span>
                            </td>
                            <td className="py-2 px-3">
                              <div className="flex items-center gap-2">
                                <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                                  <div 
                                    className={`h-1.5 rounded-full ${utilization > 100 ? 'bg-red-500' : 'bg-blue-500'}`}
                                    style={{ width: `${Math.min(utilization, 100)}%` }}
                                  />
                                </div>
                                <span className="text-xs text-gray-600">{utilization.toFixed(0)}%</span>
                              </div>
                            </td>
                            <td className="py-2 px-3 text-center">
                              <button className="text-xs text-blue-600 hover:text-blue-700">
                                View Monthly
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Content - Budget vs Actual */}
      {activeTab === 'variance' && (
        <div className="space-y-6">
          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Department-wise Bar Chart */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">Department-wise Budget vs Actual (₹ Lakhs)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={departmentChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
                  <YAxis stroke="#6b7280" fontSize={12} />
                  <Tooltip 
                    formatter={(value: number) => [`₹${value} L`, '']}
                    contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
                  />
                  <Legend />
                  <Bar dataKey="planned" fill="#94a3b8" name="Planned Budget" />
                  <Bar dataKey="actual" fill="#3b82f6" name="Actual YTD" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Expense Category Pie Chart */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">Expense Category Split (%)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categorySplitData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categorySplitData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => [`${value}%`, '']}
                    contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Monthly Trend Line Chart */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 lg:col-span-2">
              <h3 className="font-semibold text-gray-900 mb-4">Monthly Expense Trend by Department (₹ Lakhs)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsLineChart data={monthlyTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                  <YAxis stroke="#6b7280" fontSize={12} />
                  <Tooltip 
                    formatter={(value: number) => [`₹${value} L`, '']}
                    contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="Production" stroke="#3b82f6" strokeWidth={2} />
                  <Line type="monotone" dataKey="Sales" stroke="#10b981" strokeWidth={2} />
                  <Line type="monotone" dataKey="Rnd" stroke="#f59e0b" strokeWidth={2} />
                  <Line type="monotone" dataKey="HR" stroke="#8b5cf6" strokeWidth={2} />
                  <Line type="monotone" dataKey="Finance" stroke="#ef4444" strokeWidth={2} />
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Variance Details Table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">Variance Analysis by Department</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left py-3 px-4 text-xs text-gray-600">Department</th>
                    <th className="text-left py-3 px-4 text-xs text-gray-600">Budget Head</th>
                    <th className="text-right py-3 px-4 text-xs text-gray-600">Planned (YTD)</th>
                    <th className="text-right py-3 px-4 text-xs text-gray-600">Actual (YTD)</th>
                    <th className="text-right py-3 px-4 text-xs text-gray-600">Variance</th>
                    <th className="text-right py-3 px-4 text-xs text-gray-600">Variance %</th>
                    <th className="text-left py-3 px-4 text-xs text-gray-600">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {annualBudgets.flatMap(dept => 
                    dept.budgetHeads.map(head => {
                      const plannedYTD = head.planned * 0.25;
                      const variance = head.actual - plannedYTD;
                      const variancePercent = (variance / plannedYTD) * 100;
                      const isOverBudget = variance > 0;
                      
                      return (
                        <tr key={`${dept.department}-${head.head}`} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 text-sm text-gray-900">{dept.department}</td>
                          <td className="py-3 px-4 text-sm text-gray-600">{head.head}</td>
                          <td className="py-3 px-4 text-right text-sm text-gray-600">{formatCurrency(plannedYTD)}</td>
                          <td className="py-3 px-4 text-right text-sm text-gray-900">{formatCurrency(head.actual)}</td>
                          <td className="py-3 px-4 text-right">
                            <span className={`text-sm font-medium ${isOverBudget ? 'text-red-600' : 'text-green-600'}`}>
                              {isOverBudget ? '+' : ''}{formatCurrency(variance)}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <span className={`text-sm font-medium ${isOverBudget ? 'text-red-600' : 'text-green-600'}`}>
                              {isOverBudget ? '+' : ''}{variancePercent.toFixed(1)}%
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            {Math.abs(variancePercent) > 10 ? (
                              <span className="text-xs px-2 py-1 rounded bg-red-100 text-red-700 flex items-center gap-1 w-fit">
                                <AlertCircle className="size-3" />
                                Alert
                              </span>
                            ) : (
                              <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-700 flex items-center gap-1 w-fit">
                                <CheckCircle className="size-3" />
                                On Track
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Content - Forecasting */}
      {activeTab === 'forecast' && (
        <div className="space-y-6">
          {/* Forecast Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {forecasts.map((forecast, idx) => (
              <div key={forecast.year} className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">{forecast.year}</h3>
                  {idx === 0 && (
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Current</span>
                  )}
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500">Projected Revenue</p>
                    <p className="text-xl font-bold text-green-600">{formatCurrency(forecast.projectedRevenue)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Projected Expense</p>
                    <p className="text-xl font-bold text-orange-600">{formatCurrency(forecast.projectedExpense)}</p>
                  </div>
                  <div className="pt-3 border-t border-gray-100">
                    <p className="text-xs text-gray-500">Projected Profit</p>
                    <p className="text-lg font-bold text-blue-600">{formatCurrency(forecast.projectedProfit)}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Margin: {((forecast.projectedProfit / forecast.projectedRevenue) * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Forecast Details */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">Forecast Assumptions & Notes</h3>
            </div>
            <div className="p-4">
              {forecasts.map((forecast) => (
                <div key={forecast.year} className="mb-6 last:mb-0">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">{forecast.year}</h4>
                  <div className="bg-gray-50 rounded p-4">
                    <div className="mb-3">
                      <p className="text-xs text-gray-500 mb-1">Key Assumptions</p>
                      <p className="text-sm text-gray-700">{forecast.assumptions}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Additional Notes</p>
                      <p className="text-sm text-gray-700">{forecast.notes}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue vs Expense Projection Chart */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Revenue & Expense Projection (₹ Crores)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={forecasts.map(f => ({
                year: f.year.slice(2),
                Revenue: f.projectedRevenue / 10000000,
                Expense: f.projectedExpense / 10000000,
                Profit: f.projectedProfit / 10000000,
              }))}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="year" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip 
                  formatter={(value: number) => [`₹${value.toFixed(1)} Cr`, '']}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
                />
                <Legend />
                <Bar dataKey="Revenue" fill="#10b981" name="Revenue" />
                <Bar dataKey="Expense" fill="#f59e0b" name="Expense" />
                <Bar dataKey="Profit" fill="#3b82f6" name="Profit" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}