// src/components/finance/NewBudgetModal.tsx
import { useState } from 'react';
import { 
  Plus, Trash2, Calculator, Calendar, Building2,
  DollarSign, Target, AlertCircle, ChevronDown
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
import { cn } from '../ui/utils';

interface NewBudgetModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

interface BudgetHead {
  id: string;
  name: string;
  planned: number;
  monthly: number[];
}

interface BudgetFormData {
  financialYear: string;
  department: string;
  budgetHeads: BudgetHead[];
  approvedBy: string;
  enableVarianceAlerts: boolean;
  alertThreshold: number;
  alertEmail: string;
  notes: string;
}

const initialBudgetHead: BudgetHead = {
  id: crypto.randomUUID(),
  name: '',
  planned: 0,
  monthly: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
};

const initialFormData: BudgetFormData = {
  financialYear: '2026-2027',
  department: '',
  budgetHeads: [{ ...initialBudgetHead, id: crypto.randomUUID() }],
  approvedBy: '',
  enableVarianceAlerts: true,
  alertThreshold: 10,
  alertEmail: 'finance@nesol.in',
  notes: '',
};

const departments = ['Production', 'Sales', 'R&D', 'HR', 'Finance', 'Admin', 'Quality', 'Logistics'];
const financialYears = ['2025-2026', '2026-2027', '2027-2028', '2028-2029'];
const budgetHeadOptions = [
  'Salary & Wages', 'Consumables', 'Travel', 'Machinery Maintenance',
  'Marketing', 'R&D Materials', 'Office Supplies', 'Utilities',
  'Training & Development', 'Recruitment', 'Software Subscriptions',
  'Client Entertainment', 'Employee Welfare', 'Audit & Compliance',
];
const monthNames = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];

export function NewBudgetModal({ open, onOpenChange, onSuccess }: NewBudgetModalProps) {
  const [formData, setFormData] = useState<BudgetFormData>(initialFormData);
  const [activeTab, setActiveTab] = useState<'details' | 'heads' | 'monthly'>('details');
  const [selectedHeadIndex, setSelectedHeadIndex] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<string, string>> = {};

    if (!formData.department) newErrors.department = 'Department is required';
    if (!formData.approvedBy) newErrors.approvedBy = 'Approver name is required';
    
    formData.budgetHeads.forEach((head, idx) => {
      if (!head.name) newErrors[`head_${idx}_name`] = 'Budget head name is required';
      if (head.planned <= 0) newErrors[`head_${idx}_planned`] = 'Planned amount must be greater than 0';
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Budget Created:', formData);
    setIsSubmitting(false);
    onOpenChange(false);
    onSuccess?.();
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      ...initialFormData,
      budgetHeads: [{ ...initialBudgetHead, id: crypto.randomUUID() }],
    });
    setErrors({});
    setActiveTab('details');
    setSelectedHeadIndex(0);
  };

  const addBudgetHead = () => {
    setFormData(prev => ({
      ...prev,
      budgetHeads: [...prev.budgetHeads, { ...initialBudgetHead, id: crypto.randomUUID() }],
    }));
    setSelectedHeadIndex(formData.budgetHeads.length);
  };

  const removeBudgetHead = (id: string) => {
    if (formData.budgetHeads.length === 1) return;
    setFormData(prev => ({
      ...prev,
      budgetHeads: prev.budgetHeads.filter(head => head.id !== id),
    }));
    setSelectedHeadIndex(0);
  };

  const updateBudgetHead = (id: string, field: keyof BudgetHead, value: string | number | number[]) => {
    setFormData(prev => ({
      ...prev,
      budgetHeads: prev.budgetHeads.map(head => {
        if (head.id !== id) return head;
        return { ...head, [field]: value };
      }),
    }));
  };

  const updateMonthlyValue = (headId: string, monthIndex: number, value: number) => {
    setFormData(prev => ({
      ...prev,
      budgetHeads: prev.budgetHeads.map(head => {
        if (head.id !== headId) return head;
        const newMonthly = [...head.monthly];
        newMonthly[monthIndex] = value;
        const totalPlanned = newMonthly.reduce((sum, v) => sum + v, 0);
        return { ...head, monthly: newMonthly, planned: totalPlanned };
      }),
    }));
  };

  const distributeEvenly = (headId: string, totalAmount: number) => {
    const monthlyAmount = Math.round(totalAmount / 12);
    setFormData(prev => ({
      ...prev,
      budgetHeads: prev.budgetHeads.map(head => {
        if (head.id !== headId) return head;
        return {
          ...head,
          planned: totalAmount,
          monthly: Array(12).fill(monthlyAmount),
        };
      }),
    }));
  };

  const totalAnnualBudget = formData.budgetHeads.reduce((sum, head) => sum + head.planned, 0);

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const selectedHead = formData.budgetHeads[selectedHeadIndex];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <Target className="size-5" />
            Create New Budget
          </DialogTitle>
          <DialogDescription>
            Create an annual budget with monthly breakdown. Budget ID will be auto-generated.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Budget Details</TabsTrigger>
              <TabsTrigger value="heads">Budget Heads</TabsTrigger>
              <TabsTrigger value="monthly">Monthly Breakdown</TabsTrigger>
            </TabsList>

            {/* Budget Details Tab */}
            <TabsContent value="details" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="financialYear">Financial Year</Label>
                  <Select 
                    value={formData.financialYear} 
                    onValueChange={(v) => setFormData(prev => ({ ...prev, financialYear: v }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      {financialYears.map((year) => (
                        <SelectItem key={year} value={year}>{year}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department">
                    Department <span className="text-red-500">*</span>
                  </Label>
                  <Select 
                    value={formData.department} 
                    onValueChange={(v) => setFormData(prev => ({ ...prev, department: v }))}
                  >
                    <SelectTrigger className={errors.department ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.department && <p className="text-xs text-red-500">{errors.department}</p>}
                </div>

                <div className="space-y-2 col-span-2">
                  <Label htmlFor="approvedBy">
                    Approved By <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="approvedBy"
                    value={formData.approvedBy}
                    onChange={(e) => setFormData(prev => ({ ...prev, approvedBy: e.target.value }))}
                    placeholder="e.g., Plant Head, CFO"
                    className={errors.approvedBy ? 'border-red-500' : ''}
                  />
                  {errors.approvedBy && <p className="text-xs text-red-500">{errors.approvedBy}</p>}
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Variance Alert Settings</h4>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Enable Variance Alerts</p>
                      <p className="text-xs text-gray-500">Get notified when actual exceeds planned budget</p>
                    </div>
                    <Switch
                      checked={formData.enableVarianceAlerts}
                      onCheckedChange={(v) => setFormData(prev => ({ ...prev, enableVarianceAlerts: v }))}
                    />
                  </div>

                  {formData.enableVarianceAlerts && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="alertThreshold">Alert Threshold (%)</Label>
                        <div className="flex items-center gap-2">
                          <Input
                            id="alertThreshold"
                            type="number"
                            min="1"
                            max="100"
                            value={formData.alertThreshold}
                            onChange={(e) => setFormData(prev => ({ ...prev, alertThreshold: Number(e.target.value) }))}
                            className="w-24"
                          />
                          <span className="text-sm text-gray-600">%</span>
                        </div>
                        <p className="text-xs text-gray-500">Alert when variance exceeds this percentage</p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="alertEmail">Alert Email Recipients</Label>
                        <Input
                          id="alertEmail"
                          value={formData.alertEmail}
                          onChange={(e) => setFormData(prev => ({ ...prev, alertEmail: e.target.value }))}
                          placeholder="finance@nesol.in, department.head@nesol.in"
                        />
                        <p className="text-xs text-gray-500">Separate multiple emails with commas</p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes (Optional)</Label>
                <textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Any additional information..."
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                />
              </div>
            </TabsContent>

            {/* Budget Heads Tab */}
            <TabsContent value="heads" className="space-y-4">
              <div className="space-y-3">
                {formData.budgetHeads.map((head, idx) => (
                  <div key={head.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-medium text-gray-900">Budget Head {idx + 1}</h4>
                      {formData.budgetHeads.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeBudgetHead(head.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label>Budget Head Name <span className="text-red-500">*</span></Label>
                        <Select 
                          value={head.name} 
                          onValueChange={(v) => updateBudgetHead(head.id, 'name', v)}
                        >
                          <SelectTrigger className={errors[`head_${idx}_name`] ? 'border-red-500' : ''}>
                            <SelectValue placeholder="Select or type" />
                          </SelectTrigger>
                          <SelectContent>
                            {budgetHeadOptions.map((option) => (
                              <SelectItem key={option} value={option}>{option}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-1">
                        <Label>Annual Planned Amount (₹) <span className="text-red-500">*</span></Label>
                        <Input
                          type="number"
                          min="0"
                          value={head.planned}
                          onChange={(e) => updateBudgetHead(head.id, 'planned', Number(e.target.value))}
                          className={errors[`head_${idx}_planned`] ? 'border-red-500' : ''}
                        />
                      </div>
                    </div>

                    <div className="mt-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => distributeEvenly(head.id, head.planned)}
                      >
                        <Calculator className="size-3 mr-1" />
                        Distribute Evenly Across Months
                      </Button>
                    </div>
                  </div>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  onClick={addBudgetHead}
                  className="w-full"
                >
                  <Plus className="size-4 mr-2" />
                  Add Budget Head
                </Button>
              </div>

              {/* Summary */}
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900">Total Annual Budget:</span>
                  <span className="text-xl font-bold text-blue-700">{formatCurrency(totalAnnualBudget)}</span>
                </div>
              </div>
            </TabsContent>

            {/* Monthly Breakdown Tab */}
            <TabsContent value="monthly" className="space-y-4">
              <div className="flex items-center gap-4">
                <Label>Select Budget Head:</Label>
                <Select 
                  value={selectedHeadIndex.toString()} 
                  onValueChange={(v) => setSelectedHeadIndex(Number(v))}
                >
                  <SelectTrigger className="w-64">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {formData.budgetHeads.map((head, idx) => (
                      <SelectItem key={head.id} value={idx.toString()}>
                        {head.name || `Budget Head ${idx + 1}`} - {formatCurrency(head.planned)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedHead && (
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">
                      {selectedHead.name || 'Budget Head'} - Monthly Distribution
                    </h4>
                    
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                      {monthNames.map((month, idx) => (
                        <div key={month} className="space-y-1">
                          <Label className="text-xs">{month}</Label>
                          <Input
                            type="number"
                            min="0"
                            value={selectedHead.monthly[idx]}
                            onChange={(e) => updateMonthlyValue(selectedHead.id, idx, Number(e.target.value))}
                            className="text-sm"
                          />
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 flex justify-between items-center pt-3 border-t">
                      <span className="text-sm text-gray-600">Total (Annual):</span>
                      <span className="font-medium">
                        {formatCurrency(selectedHead.monthly.reduce((sum, v) => sum + v, 0))}
                      </span>
                      <span className="text-sm text-gray-600">Target:</span>
                      <span className={`font-medium ${
                        selectedHead.monthly.reduce((sum, v) => sum + v, 0) !== selectedHead.planned
                          ? 'text-red-600'
                          : 'text-green-600'
                      }`}>
                        {formatCurrency(selectedHead.planned)}
                      </span>
                    </div>

                    {selectedHead.monthly.reduce((sum, v) => sum + v, 0) !== selectedHead.planned && (
                      <div className="mt-2 p-2 bg-yellow-50 rounded flex items-center gap-2">
                        <AlertCircle className="size-4 text-yellow-600" />
                        <p className="text-xs text-yellow-700">
                          Monthly total ({formatCurrency(selectedHead.monthly.reduce((sum, v) => sum + v, 0))}) 
                          does not match annual planned amount ({formatCurrency(selectedHead.planned)})
                        </p>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => distributeEvenly(selectedHead.id, selectedHead.planned)}
                          className="ml-auto text-xs"
                        >
                          Auto-Distribute
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Monthly Chart Preview */}
                  <div className="bg-white rounded-lg border p-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Monthly Distribution Preview</h4>
                    <div className="flex items-end gap-1 h-32">
                      {selectedHead.monthly.map((value, idx) => {
                        const maxValue = Math.max(...selectedHead.monthly, 1);
                        const height = (value / maxValue) * 100;
                        return (
                          <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                            <div 
                              className="w-full bg-blue-500 rounded-t"
                              style={{ height: `${Math.max(height, 4)}%`, minHeight: '4px' }}
                            />
                            <span className="text-xs text-gray-500">{monthNames[idx]}</span>
                            <span className="text-xs font-medium">{formatCurrency(value)}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>

          <DialogFooter className="gap-2 mt-6">
            <div className="flex-1 flex gap-2">
              {activeTab !== 'details' && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    if (activeTab === 'heads') setActiveTab('details');
                    if (activeTab === 'monthly') setActiveTab('heads');
                  }}
                >
                  Back
                </Button>
              )}
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                resetForm();
                onOpenChange(false);
              }}
            >
              Cancel
            </Button>
            {activeTab !== 'monthly' ? (
              <Button
                type="button"
                onClick={() => {
                  if (activeTab === 'details') setActiveTab('heads');
                  if (activeTab === 'heads') setActiveTab('monthly');
                }}
              >
                Next
              </Button>
            ) : (
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <span className="mr-2">Creating...</span>
                    <div className="size-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  </>
                ) : (
                  <>
                    <Target className="size-4 mr-2" />
                    Create Budget
                  </>
                )}
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}