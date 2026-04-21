import { createBrowserRouter } from "react-router";
import Root from "./Root";
import Dashboard from "./pages/Dashboard";
import HRRecruitment from "./pages/hr/Recruitment";
import HRAttendance from "./pages/hr/Attendance";
import HRDocumentation from "./pages/hr/Documentation";
import SalaryManagement from "./pages/finance/SalaryManagement";
import ExpensesManagement from "./pages/finance/ExpensesManagement";
import InvoiceManagement from "./pages/finance/InvoiceManagement";
import BudgetingForecasting from "./pages/finance/BudgetingForecasting";
import SalesManagement from "./pages/sales/SalesManagement";
import CustomerManagement from "./pages/sales/CustomerManagement";
import PurchaseManagement from "./pages/procurement/PurchaseManagement";
import VendorManagement from "./pages/procurement/VendorManagement";
import InventoryManagement from "./pages/production/InventoryManagement";
import ProductionManagement from "./pages/production/ProductionManagement";
import QualityManagement from "./pages/production/QualityManagement";
import OrderManagement from "./pages/logistics/OrderManagement";
import LogisticsManagement from "./pages/logistics/LogisticsManagement";
import AfterSalesSupport from "./pages/support/AfterSalesSupport";
import WarrantyManagement from "./pages/support/WarrantyManagement";
import Reports from "./pages/Reports";
import AssetsManagement from "./pages/AssetsManagement";
import IncidentManagement from "./pages/IncidentManagement";
import NotFound from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Dashboard },
      
      // HR Module
      { path: "hr/recruitment", Component: HRRecruitment },
      { path: "hr/attendance", Component: HRAttendance },
      { path: "hr/documentation", Component: HRDocumentation },
      
      // Finance Module
      { path: "finance/salary", Component: SalaryManagement },
      { path: "finance/expenses", Component: ExpensesManagement },
      { path: "finance/invoices", Component: InvoiceManagement },
      { path: "finance/budgeting", Component: BudgetingForecasting },
      
      // Sales Module
      { path: "sales/management", Component: SalesManagement },
      { path: "sales/customers", Component: CustomerManagement },
      
      // Procurement Module
      { path: "procurement/purchase", Component: PurchaseManagement },
      { path: "procurement/vendors", Component: VendorManagement },
      
      // Production Module
      { path: "production/inventory", Component: InventoryManagement },
      { path: "production/management", Component: ProductionManagement },
      { path: "production/quality", Component: QualityManagement },
      
      // Logistics Module
      { path: "logistics/orders", Component: OrderManagement },
      { path: "logistics/management", Component: LogisticsManagement },
      
      // Support Module
      { path: "support/aftersales", Component: AfterSalesSupport },
      { path: "support/warranty", Component: WarrantyManagement },
      
      // Others
      { path: "reports", Component: Reports },
      { path: "assets", Component: AssetsManagement },
      { path: "incident", Component: IncidentManagement },

      
      { path: "*", Component: NotFound },
    ],
  },
]);
