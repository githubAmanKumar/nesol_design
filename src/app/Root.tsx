import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router';
import { 
  LayoutDashboard, Users, DollarSign, ShoppingCart, Package, 
  Wrench, TruckIcon, HeadphonesIcon, FileText, Menu, X,
  ChevronDown, Building2, User
} from 'lucide-react';

export default function Root() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['hr', 'finance']);
  const location = useLocation();

  const toggleMenu = (menu: string) => {
    setExpandedMenus(prev => 
      prev.includes(menu) 
        ? prev.filter(m => m !== menu)
        : [...prev, menu]
    );
  };

  const isActive = (path: string) => location.pathname === path;
  const isParentActive = (paths: string[]) => paths.some(p => location.pathname.startsWith(p));

  const menuItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { 
      label: 'HR Module', 
      icon: Users, 
      key: 'hr',
      children: [
        { path: '/hr/recruitment', label: 'Recruitment' },
        { path: '/hr/attendance', label: 'Attendance' },
        { path: '/hr/documentation', label: 'Documentation' },
      ]
    },
    { 
      label: 'Finance', 
      icon: DollarSign, 
      key: 'finance',
      children: [
        { path: '/finance/salary', label: 'Salary Management' },
        { path: '/finance/expenses', label: 'Expenses' },
        { path: '/finance/invoices', label: 'Invoices' },
        { path: '/finance/budgeting', label: 'Budgeting' },
      ]
    },
    { 
      label: 'Sales', 
      icon: ShoppingCart, 
      key: 'sales',
      children: [
        { path: '/sales/management', label: 'Sales Management' },
        { path: '/sales/customers', label: 'Customer Management' },
      ]
    },
    { 
      label: 'Procurement', 
      icon: Package, 
      key: 'procurement',
      children: [
        { path: '/procurement/purchase', label: 'Purchase Management' },
        { path: '/procurement/vendors', label: 'Vendor Management' },
      ]
    },
    { 
      label: 'Production', 
      icon: Wrench, 
      key: 'production',
      children: [
        { path: '/production/inventory', label: 'Inventory' },
        { path: '/production/management', label: 'Production' },
        { path: '/production/quality', label: 'Quality' },
      ]
    },
    { 
      label: 'Logistics', 
      icon: TruckIcon, 
      key: 'logistics',
      children: [
        { path: '/logistics/orders', label: 'Order Management' },
        { path: '/logistics/management', label: 'Logistics' },
      ]
    },
    { 
      label: 'Support', 
      icon: HeadphonesIcon, 
      key: 'support',
      children: [
        { path: '/support/aftersales', label: 'After Sales' },
        { path: '/support/warranty', label: 'Warranty' },
      ]
    },
    { path: '/reports', label: 'Reports', icon: FileText },
    { path: '/assets', label: 'Assets', icon: Building2 },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-0'} bg-slate-900 text-white transition-all duration-300 overflow-hidden flex flex-col`}>
        <div className="p-4 border-b border-slate-700">
          <div className="flex items-center gap-2">
            <Building2 className="size-8 text-blue-400" />
            <div>
              <h1 className="font-bold">Nesol Energies</h1>
              <p className="text-xs text-gray-400">ERP System</p>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {menuItems.map((item) => {
            if ('children' in item) {
              const Icon = item.icon;
              const isExpanded = expandedMenus.includes(item.key);
              const isParent = isParentActive(item.children.map(c => c.path));
              
              return (
                <div key={item.key}>
                  <button
                    onClick={() => toggleMenu(item.key)}
                    className={`w-full flex items-center justify-between p-2 rounded hover:bg-slate-800 transition-colors ${isParent ? 'bg-slate-800' : ''}`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="size-5" />
                      <span className="text-sm">{item.label}</span>
                    </div>
                    <ChevronDown className={`size-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                  </button>
                  {isExpanded && (
                    <div className="ml-7 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          className={`block p-2 text-sm rounded hover:bg-slate-800 transition-colors ${isActive(child.path) ? 'bg-blue-600 text-white' : ''}`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            } else {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 p-2 rounded hover:bg-slate-800 transition-colors ${isActive(item.path) ? 'bg-blue-600 text-white' : ''}`}
                >
                  <Icon className="size-5" />
                  <span className="text-sm">{item.label}</span>
                </Link>
              );
            }
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-gray-100 rounded"
              >
                {sidebarOpen ? <X className="size-5" /> : <Menu className="size-5" />}
              </button>
              <h2 className="font-semibold text-gray-800">
                {location.pathname === '/' ? 'Dashboard' : location.pathname.split('/').pop()?.replace('-', ' ')}
              </h2>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-sm text-right">
                <p className="text-gray-600">Admin User</p>
                <p className="text-xs text-gray-400">admin@nesol.in</p>
              </div>
              <div className="size-10 bg-blue-500 rounded-full flex items-center justify-center">
                <User className="size-5 text-white" />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
