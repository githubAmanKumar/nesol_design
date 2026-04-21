// src/app/pages/Dashboard.tsx
import { 
  Users, DollarSign, Package, TrendingUp, AlertCircle, 
  Calendar, Battery, CheckCircle, Clock, XCircle
} from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const kpiData = [
    { label: "Today's Production", value: "2,450", target: "2,800", unit: "units", icon: Battery, color: "bg-blue-500", percentage: 87.5 },
    { label: "Monthly Revenue", value: "₹45.2L", target: "₹50L", unit: "", icon: DollarSign, color: "bg-green-500", percentage: 90.4 },
    { label: "Attendance Today", value: "342", target: "380", unit: "employees", icon: Users, color: "bg-purple-500", percentage: 90 },
    { label: "Pending Orders", value: "28", target: "0", unit: "orders", icon: Package, color: "bg-orange-500", percentage: 0 },
  ];

  const productionData = [
    { month: 'Jan', target: 75000, actual: 72000 },
    { month: 'Feb', target: 80000, actual: 78000 },
    { month: 'Mar', target: 85000, actual: 88000 },
    { month: 'Apr', target: 82000, actual: 79000 },
  ];

  const salesData = [
    { name: 'Automotive', value: 35 },
    { name: 'Inverter', value: 30 },
    { name: 'E-Rickshaw', value: 20 },
    { name: 'Solar', value: 15 },
  ];

  const revenueData = [
    { month: 'Jan', revenue: 4200000 },
    { month: 'Feb', revenue: 4500000 },
    { month: 'Mar', revenue: 4800000 },
    { month: 'Apr', revenue: 4520000 },
  ];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];

  const recentActivities = [
    { id: 1, type: 'success', message: 'Production batch #PB-2024-042 completed', time: '10 mins ago', icon: CheckCircle },
    { id: 2, type: 'warning', message: 'Machine PM-204 scheduled for maintenance', time: '25 mins ago', icon: AlertCircle },
    { id: 3, type: 'info', message: 'New sales order SO-2024-156 received', time: '1 hour ago', icon: Clock },
    { id: 4, type: 'success', message: 'Invoice INV-2024-890 sent to customer', time: '2 hours ago', icon: CheckCircle },
    { id: 5, type: 'error', message: 'Quality check failed for batch #PB-2024-041', time: '3 hours ago', icon: XCircle },
  ];

  const pendingTasks = [
    { id: 1, task: 'Approve 5 pending leave requests', department: 'HR', priority: 'High' },
    { id: 2, task: 'Review vendor quotations for lead supply', department: 'Procurement', priority: 'Medium' },
    { id: 3, task: 'Process payroll for March 2026', department: 'Finance', priority: 'High' },
    { id: 4, task: 'Schedule preventive maintenance', department: 'Production', priority: 'Low' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-sm text-gray-600">Welcome to Nesol Energies ERP System</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div key={kpi.label} className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`${kpi.color} p-3 rounded-lg`}>
                  <Icon className="size-6 text-white" />
                </div>
                <span className="text-xs px-2 py-1 bg-gray-100 rounded">
                  {kpi.percentage.toFixed(0)}%
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">{kpi.label}</p>
                <div className="flex items-baseline gap-2">
                  <span className="font-bold text-gray-900">{kpi.value}</span>
                  <span className="text-xs text-gray-500">/ {kpi.target}</span>
                </div>
                {kpi.unit && <p className="text-xs text-gray-500 mt-1">{kpi.unit}</p>}
              </div>
              <div className="mt-3 bg-gray-200 rounded-full h-2">
                <div 
                  className={`${kpi.color} h-2 rounded-full`} 
                  style={{ width: `${kpi.percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Production Chart */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">Production Trend (Units)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={productionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Legend />
              <Bar dataKey="target" fill="#94a3b8" name="Target" />
              <Bar dataKey="actual" fill="#3b82f6" name="Actual" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Sales Distribution */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">Sales by Category (%)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={salesData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {salesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Trend */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">Revenue Trend (₹)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip formatter={(value: number) => `₹${(value / 100000).toFixed(1)}L`} />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} name="Revenue" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Activities */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">Recent Activities</h3>
          <div className="space-y-3">
            {recentActivities.map((activity) => {
              const Icon = activity.icon;
              const colorMap: Record<string, string> = {
                success: 'text-green-500 bg-green-50',
                warning: 'text-orange-500 bg-orange-50',
                info: 'text-blue-500 bg-blue-50',
                error: 'text-red-500 bg-red-50',
              };
              
              return (
                <div key={activity.id} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded">
                  <div className={`p-2 rounded ${colorMap[activity.type]}`}>
                    <Icon className="size-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-800">{activity.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Pending Tasks */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">Pending Tasks</h3>
          <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
            {pendingTasks.length} pending
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm text-gray-600">Task</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Department</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Priority</th>
                <th className="text-right py-3 px-4 text-sm text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {pendingTasks.map((task) => (
                <tr key={task.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-800">{task.task}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{task.department}</td>
                  <td className="py-3 px-4">
                    <span className={`text-xs px-2 py-1 rounded ${
                      task.priority === 'High' ? 'bg-red-100 text-red-700' :
                      task.priority === 'Medium' ? 'bg-orange-100 text-orange-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {task.priority}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button className="text-xs bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                      View
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
