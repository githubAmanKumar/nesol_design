// src/components/finance/ProcessPayrollModal.tsx
import { useState, useEffect } from 'react';
import { 
  X, Calculator, Download, Mail, Eye, CheckCircle, 
  AlertCircle, Building2, Users, DollarSign, Calendar, 
  FileText
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Switch } from '../ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { cn } from '../ui/utils';

interface ProcessPayrollModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

interface PayrollSummary {
  totalEmployees: number;
  totalGross: number;
  totalDeductions: number;
  totalNetPay: number;
  processedCount: number;
  pendingCount: number;
}

interface EmployeePayroll {
  empId: string;
  name: string;
  department: string;
  basic: number;
  hra: number;
  conveyance: number;
  da: number;
  medical: number;
  special: number;
  otherAllowances: number;
  gross: number;
  pfEmployee: number;
  esiEmployee: number;
  professionalTax: number;
  tds: number;
  loanDeduction: number;
  lopDeduction: number;
  totalDeductions: number;
  netPay: number;
  employerPF: number;
  employerESI: number;
  daysPayable: number;
  status: 'Pending' | 'Processed';
}

const initialSummary: PayrollSummary = {
  totalEmployees: 380,
  totalGross: 15200000,
  totalDeductions: 2850000,
  totalNetPay: 12350000,
  processedCount: 342,
  pendingCount: 38,
};

const mockEmployees: EmployeePayroll[] = [
  {
    empId: 'NES/EMP/001',
    name: 'Rajesh Kumar',
    department: 'Production',
    basic: 25000,
    hra: 10000,
    conveyance: 1600,
    da: 2000,
    medical: 1250,
    special: 150,
    otherAllowances: 0,
    gross: 40000,
    pfEmployee: 3000,
    esiEmployee: 750,
    professionalTax: 200,
    tds: 1800,
    loanDeduction: 0,
    lopDeduction: 0,
    totalDeductions: 5750,
    netPay: 34250,
    employerPF: 3000,
    employerESI: 750,
    daysPayable: 30,
    status: 'Processed',
  },
  {
    empId: 'NES/EMP/003',
    name: 'Amit Singh',
    department: 'Sales',
    basic: 28000,
    hra: 11200,
    conveyance: 2000,
    da: 2200,
    medical: 1250,
    special: 350,
    otherAllowances: 0,
    gross: 45000,
    pfEmployee: 3360,
    esiEmployee: 0,
    professionalTax: 200,
    tds: 2300,
    loanDeduction: 0,
    lopDeduction: 0,
    totalDeductions: 5860,
    netPay: 39140,
    employerPF: 3360,
    employerESI: 0,
    daysPayable: 30,
    status: 'Pending',
  },
];

export function ProcessPayrollModal({ open, onOpenChange, onSuccess }: ProcessPayrollModalProps) {
  const [activeTab, setActiveTab] = useState<'process' | 'summary' | 'payslip'>('process');
  const [selectedMonth, setSelectedMonth] = useState('April 2026');
  const [paymentMode, setPaymentMode] = useState('Bank Transfer');
  const [paymentReference, setPaymentReference] = useState('');
  const [generatePayslip, setGeneratePayslip] = useState(true);
  const [emailPayslip, setEmailPayslip] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processStep, setProcessStep] = useState<'calculate' | 'review' | 'complete'>('calculate');
  const [summary, setSummary] = useState<PayrollSummary>(initialSummary);
  const [employees, setEmployees] = useState<EmployeePayroll[]>(mockEmployees);
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [processAll, setProcessAll] = useState(true);

  const months = [
    'April 2026',
    'March 2026',
    'February 2026',
    'January 2026',
    'December 2025',
  ];

  const paymentModes = ['Bank Transfer', 'Cheque'];

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const calculateTotals = () => {
    const totals = employees.reduce((acc, emp) => {
      acc.gross += emp.gross;
      acc.deductions += emp.totalDeductions;
      acc.netPay += emp.netPay;
      acc.employerPF += emp.employerPF;
      acc.employerESI += emp.employerESI;
      return acc;
    }, { gross: 0, deductions: 0, netPay: 0, employerPF: 0, employerESI: 0 });

    return totals;
  };

  const handleCalculate = () => {
    setIsProcessing(true);
    // Simulate calculation
    setTimeout(() => {
      setIsProcessing(false);
      setProcessStep('review');
    }, 1500);
  };

  const handleProcessPayroll = async () => {
    setIsProcessing(true);
    
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Update employee statuses
    setEmployees(prev => prev.map(emp => 
      processAll || selectedEmployees.includes(emp.empId)
        ? { ...emp, status: 'Processed' as const }
        : emp
    ));
    
    setIsProcessing(false);
    setProcessStep('complete');
  };

  const handleFinish = () => {
    onOpenChange(false);
    onSuccess?.();
    resetState();
  };

  const resetState = () => {
    setActiveTab('process');
    setProcessStep('calculate');
    setPaymentMode('Bank Transfer');
    setPaymentReference('');
    setGeneratePayslip(true);
    setEmailPayslip(true);
    setProcessAll(true);
    setSelectedEmployees([]);
  };

  const toggleEmployeeSelection = (empId: string) => {
    if (selectedEmployees.includes(empId)) {
      setSelectedEmployees(prev => prev.filter(id => id !== empId));
    } else {
      setSelectedEmployees(prev => [...prev, empId]);
    }
  };

  const totals = calculateTotals();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <Calculator className="size-5" />
            Process Payroll
          </DialogTitle>
          <DialogDescription>
            Calculate and process monthly payroll for employees
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="process">Process Payroll</TabsTrigger>
            <TabsTrigger value="summary">Payroll Summary</TabsTrigger>
            <TabsTrigger value="payslip">Generate Payslips</TabsTrigger>
          </TabsList>

          {/* Process Payroll Tab */}
          <TabsContent value="process" className="space-y-6">
            {/* Step Indicator */}
            <div className="flex items-center justify-center gap-2 py-2">
              {['calculate', 'review', 'complete'].map((step, idx) => (
                <div key={step} className="flex items-center">
                  <div className={cn(
                    "flex items-center justify-center size-8 rounded-full text-sm font-medium",
                    processStep === step ? "bg-blue-600 text-white" :
                    idx < ['calculate', 'review', 'complete'].indexOf(processStep) ? "bg-green-500 text-white" :
                    "bg-gray-200 text-gray-600"
                  )}>
                    {idx < ['calculate', 'review', 'complete'].indexOf(processStep) ? (
                      <CheckCircle className="size-4" />
                    ) : (
                      idx + 1
                    )}
                  </div>
                  {idx < 2 && (
                    <div className={cn(
                      "w-16 h-0.5 mx-2",
                      idx < ['calculate', 'review', 'complete'].indexOf(processStep) ? "bg-green-500" : "bg-gray-200"
                    )} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-8 text-xs text-gray-500">
              <span>Calculate</span>
              <span>Review</span>
              <span>Complete</span>
            </div>

            {processStep === 'calculate' && (
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-800">
                    Payroll will be calculated for {summary.totalEmployees} employees based on attendance and salary structure.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Payroll Month</Label>
                    <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select month" />
                      </SelectTrigger>
                      <SelectContent>
                        {months.map((month) => (
                          <SelectItem key={month} value={month}>{month}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Payment Mode</Label>
                    <Select value={paymentMode} onValueChange={setPaymentMode}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment mode" />
                      </SelectTrigger>
                      <SelectContent>
                        {paymentModes.map((mode) => (
                          <SelectItem key={mode} value={mode}>{mode}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Payment Reference (Optional)</Label>
                  <Input
                    value={paymentReference}
                    onChange={(e) => setPaymentReference(e.target.value)}
                    placeholder="e.g., NEFT/2026/1234"
                  />
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Process All Employees</p>
                    <p className="text-xs text-gray-500">Process payroll for all {summary.totalEmployees} employees</p>
                  </div>
                  <Switch
                    checked={processAll}
                    onCheckedChange={setProcessAll}
                  />
                </div>

                {!processAll && (
                  <div className="border rounded-lg overflow-hidden">
                    <div className="max-h-64 overflow-y-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-gray-50 sticky top-0">
                          <tr>
                            <th className="p-2 text-left">
                              <input
                                type="checkbox"
                                checked={selectedEmployees.length === employees.length}
                                onChange={() => {
                                  if (selectedEmployees.length === employees.length) {
                                    setSelectedEmployees([]);
                                  } else {
                                    setSelectedEmployees(employees.map(e => e.empId));
                                  }
                                }}
                                className="rounded"
                              />
                            </th>
                            <th className="p-2 text-left text-xs text-gray-600">Emp ID</th>
                            <th className="p-2 text-left text-xs text-gray-600">Name</th>
                            <th className="p-2 text-left text-xs text-gray-600">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {employees.filter(e => e.status === 'Pending').map((emp) => (
                            <tr key={emp.empId} className="border-t">
                              <td className="p-2">
                                <input
                                  type="checkbox"
                                  checked={selectedEmployees.includes(emp.empId)}
                                  onChange={() => toggleEmployeeSelection(emp.empId)}
                                  className="rounded"
                                />
                              </td>
                              <td className="p-2 text-gray-800">{emp.empId}</td>
                              <td className="p-2 text-gray-800">{emp.name}</td>
                              <td className="p-2">
                                <Badge variant="outline" className="bg-yellow-100 text-yellow-700">
                                  Pending
                                </Badge>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                <Button 
                  onClick={handleCalculate} 
                  disabled={isProcessing}
                  className="w-full"
                >
                  {isProcessing ? (
                    <>
                      <span className="mr-2">Calculating...</span>
                      <div className="size-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    </>
                  ) : (
                    <>
                      <Calculator className="size-4 mr-2" />
                      Calculate Payroll
                    </>
                  )}
                </Button>
              </div>
            )}

            {processStep === 'review' && (
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-green-800 flex items-center gap-2">
                    <CheckCircle className="size-4" />
                    Payroll calculation completed. Please review the summary before processing.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-xs text-gray-500">Total Gross Salary</p>
                    <p className="text-xl font-bold text-gray-900">{formatCurrency(totals.gross)}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-xs text-gray-500">Total Deductions</p>
                    <p className="text-xl font-bold text-orange-600">{formatCurrency(totals.deductions)}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-xs text-gray-500">Net Payable</p>
                    <p className="text-xl font-bold text-green-600">{formatCurrency(totals.netPay)}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-xs text-gray-500">Employer Contribution</p>
                    <p className="text-xl font-bold text-blue-600">{formatCurrency(totals.employerPF + totals.employerESI)}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Processing Progress</span>
                    <span className="font-medium">{summary.processedCount} / {summary.totalEmployees}</span>
                  </div>
                  <Progress value={(summary.processedCount / summary.totalEmployees) * 100} />
                </div>

                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    onClick={() => setProcessStep('calculate')}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button 
                    onClick={handleProcessPayroll} 
                    disabled={isProcessing}
                    className="flex-1"
                  >
                    {isProcessing ? (
                      <>
                        <span className="mr-2">Processing...</span>
                        <div className="size-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      </>
                    ) : (
                      <>
                        <Send className="size-4 mr-2" />
                        Process & Generate
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}

            {processStep === 'complete' && (
              <div className="space-y-4 text-center">
                <div className="flex justify-center">
                  <div className="size-16 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="size-8 text-green-600" />
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Payroll Processed Successfully!</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Payroll for {selectedMonth} has been processed successfully.
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-left">
                      <p className="text-gray-500">Payment Mode</p>
                      <p className="font-medium">{paymentMode}</p>
                    </div>
                    <div className="text-left">
                      <p className="text-gray-500">Reference</p>
                      <p className="font-medium">{paymentReference || 'N/A'}</p>
                    </div>
                    <div className="text-left">
                      <p className="text-gray-500">Payslips Generated</p>
                      <p className="font-medium">{generatePayslip ? 'Yes' : 'No'}</p>
                    </div>
                    <div className="text-left">
                      <p className="text-gray-500">Emails Sent</p>
                      <p className="font-medium">{emailPayslip ? 'Yes' : 'No'}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    onClick={() => setActiveTab('payslip')}
                    className="flex-1"
                  >
                    <Eye className="size-4 mr-2" />
                    View Payslips
                  </Button>
                  <Button 
                    onClick={handleFinish}
                    className="flex-1"
                  >
                    Done
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>

          {/* Payroll Summary Tab */}
          <TabsContent value="summary" className="space-y-4">
            <div className="flex items-center justify-between">
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select month" />
                </SelectTrigger>
                <SelectContent>
                  {months.map((month) => (
                    <SelectItem key={month} value={month}>{month}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Download className="size-4 mr-2" />
                Export Summary
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-xs text-blue-600">Total Gross</p>
                <p className="text-xl font-bold text-blue-700">{formatCurrency(summary.totalGross)}</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <p className="text-xs text-orange-600">Total Deductions</p>
                <p className="text-xl font-bold text-orange-700">{formatCurrency(summary.totalDeductions)}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-xs text-green-600">Net Payable</p>
                <p className="text-xl font-bold text-green-700">{formatCurrency(summary.totalNetPay)}</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-xs text-purple-600">Employees</p>
                <p className="text-xl font-bold text-purple-700">{summary.processedCount}/{summary.totalEmployees}</p>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <div className="max-h-80 overflow-y-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="p-3 text-left text-xs text-gray-600">Department</th>
                      <th className="p-3 text-right text-xs text-gray-600">Employees</th>
                      <th className="p-3 text-right text-xs text-gray-600">Gross</th>
                      <th className="p-3 text-right text-xs text-gray-600">Deductions</th>
                      <th className="p-3 text-right text-xs text-gray-600">Net Pay</th>
                    </tr>
                  </thead>
                  <tbody>
                    {['Production', 'Sales', 'Quality', 'R&D', 'HR', 'Finance'].map((dept) => {
                      const deptEmps = employees.filter(e => e.department === dept);
                      const deptGross = deptEmps.reduce((s, e) => s + e.gross, 0);
                      const deptDed = deptEmps.reduce((s, e) => s + e.totalDeductions, 0);
                      const deptNet = deptEmps.reduce((s, e) => s + e.netPay, 0);
                      
                      return (
                        <tr key={dept} className="border-t">
                          <td className="p-3 text-gray-800">{dept}</td>
                          <td className="p-3 text-right text-gray-600">{deptEmps.length}</td>
                          <td className="p-3 text-right text-gray-800">{formatCurrency(deptGross)}</td>
                          <td className="p-3 text-right text-orange-600">{formatCurrency(deptDed)}</td>
                          <td className="p-3 text-right font-medium text-green-600">{formatCurrency(deptNet)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          {/* Generate Payslips Tab */}
          <TabsContent value="payslip" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Generate Payslips</h3>
                <p className="text-xs text-gray-500">Generate and email payslips to employees</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">Generate PDF Payslips</p>
                  <p className="text-xs text-gray-500">Create PDF payslips for all processed employees</p>
                </div>
                <Switch
                  checked={generatePayslip}
                  onCheckedChange={setGeneratePayslip}
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">Email Payslips</p>
                  <p className="text-xs text-gray-500">Send payslips to employee email addresses</p>
                </div>
                <Switch
                  checked={emailPayslip}
                  onCheckedChange={setEmailPayslip}
                />
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <div className="max-h-64 overflow-y-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="p-3 text-left text-xs text-gray-600">Emp ID</th>
                      <th className="p-3 text-left text-xs text-gray-600">Name</th>
                      <th className="p-3 text-left text-xs text-gray-600">Status</th>
                      <th className="p-3 text-center text-xs text-gray-600">Payslip</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.map((emp) => (
                      <tr key={emp.empId} className="border-t">
                        <td className="p-3 text-gray-800">{emp.empId}</td>
                        <td className="p-3 text-gray-800">{emp.name}</td>
                        <td className="p-3">
                          <Badge variant="outline" className={
                            emp.status === 'Processed' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-yellow-100 text-yellow-700'
                          }>
                            {emp.status}
                          </Badge>
                        </td>
                        <td className="p-3 text-center">
                          {emp.status === 'Processed' ? (
                            <div className="flex justify-center gap-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="size-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Download className="size-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Mail className="size-4" />
                              </Button>
                            </div>
                          ) : (
                            <span className="text-xs text-gray-400">—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <Button className="w-full" disabled={!generatePayslip}>
              <FileText className="size-4 mr-2" />
              Generate All Payslips
            </Button>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}