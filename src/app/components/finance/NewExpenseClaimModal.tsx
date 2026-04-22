// src/components/finance/NewExpenseClaimModal.tsx
import { useState } from 'react';
import { 
  X, Upload, FileText, Calendar, DollarSign, 
  Receipt, Building2, User, AlertCircle 
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
import { Textarea } from '../ui/textarea';
import { cn } from '../ui/utils';

interface NewExpenseClaimModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
  employeeId?: string;
  employeeName?: string;
}

interface ExpenseClaimFormData {
  employeeId: string;
  claimDate: string;
  expenseCategory: string;
  expenseDate: string;
  description: string;
  claimAmount: string;
  supportingDoc: File | null;
  notes: string;
}

const initialFormData: ExpenseClaimFormData = {
  employeeId: '',
  claimDate: new Date().toISOString().split('T')[0],
  expenseCategory: '',
  expenseDate: '',
  description: '',
  claimAmount: '',
  supportingDoc: null,
  notes: '',
};

const expenseCategories = [
  'Travel',
  'Accommodation',
  'Local Conveyance',
  'Office Supplies',
  'R&D',
  'Client Meeting',
  'Fuel',
];

// Mock employee list
const employees = [
  { id: 'NES/EMP/001', name: 'Rajesh Kumar', department: 'Production' },
  { id: 'NES/EMP/002', name: 'Priya Sharma', department: 'Quality' },
  { id: 'NES/EMP/003', name: 'Amit Singh', department: 'Sales' },
  { id: 'NES/EMP/005', name: 'Vikram Singh', department: 'Production' },
  { id: 'NES/EMP/008', name: 'Meena Kumari', department: 'R&D' },
  { id: 'NES/EMP/012', name: 'Ramesh Chandra', department: 'Logistics' },
  { id: 'NES/EMP/018', name: 'Suresh Patel', department: 'Sales' },
];

export function NewExpenseClaimModal({ 
  open, 
  onOpenChange, 
  onSuccess,
  employeeId,
  employeeName 
}: NewExpenseClaimModalProps) {
  const [formData, setFormData] = useState<ExpenseClaimFormData>({
    ...initialFormData,
    employeeId: employeeId || '',
  });
  const [dragActive, setDragActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof ExpenseClaimFormData, string>>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ExpenseClaimFormData, string>> = {};

    if (!formData.employeeId) newErrors.employeeId = 'Employee is required';
    if (!formData.expenseCategory) newErrors.expenseCategory = 'Expense category is required';
    if (!formData.expenseDate) newErrors.expenseDate = 'Expense date is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.claimAmount) newErrors.claimAmount = 'Claim amount is required';
    if (formData.claimAmount && isNaN(Number(formData.claimAmount))) {
      newErrors.claimAmount = 'Amount must be a valid number';
    }
    if (formData.claimAmount && Number(formData.claimAmount) <= 0) {
      newErrors.claimAmount = 'Amount must be greater than 0';
    }
    if (!formData.supportingDoc) newErrors.supportingDoc = 'Supporting document is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Expense Claim Submitted:', formData);
    setIsSubmitting(false);
    onOpenChange(false);
    onSuccess?.();
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      ...initialFormData,
      employeeId: employeeId || '',
    });
    setErrors({});
  };

  const handleInputChange = (field: keyof ExpenseClaimFormData, value: string | File | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleInputChange('supportingDoc', e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleInputChange('supportingDoc', e.target.files[0]);
    }
  };

  const formatCurrency = (value: string) => {
    const num = Number(value);
    if (isNaN(num)) return value;
    return num.toLocaleString('en-IN');
  };

  const selectedEmployee = employees.find(emp => emp.id === formData.employeeId);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <Receipt className="size-5" />
            New Expense Claim
          </DialogTitle>
          <DialogDescription>
            Submit an expense claim for reimbursement. Claim ID will be auto-generated.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Employee Selection */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 border-b pb-2">
              Claimant Information
            </h3>
            
            <div className="space-y-2">
              <Label htmlFor="employeeId">
                Employee <span className="text-red-500">*</span>
              </Label>
              {employeeId ? (
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-sm font-medium text-gray-900">{employeeName}</p>
                  <p className="text-xs text-gray-500">{employeeId}</p>
                </div>
              ) : (
                <Select 
                  value={formData.employeeId} 
                  onValueChange={(v) => handleInputChange('employeeId', v)}
                >
                  <SelectTrigger className={errors.employeeId ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select employee" />
                  </SelectTrigger>
                  <SelectContent>
                    {employees.map((emp) => (
                      <SelectItem key={emp.id} value={emp.id}>
                        <div className="flex items-center gap-2">
                          <span>{emp.name}</span>
                          <span className="text-xs text-gray-500">({emp.id})</span>
                          <span className="text-xs text-gray-400">- {emp.department}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              {errors.employeeId && <p className="text-xs text-red-500">{errors.employeeId}</p>}
            </div>

            {selectedEmployee && (
              <div className="grid grid-cols-2 gap-4 p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="text-xs text-gray-500">Department</p>
                  <p className="text-sm font-medium">{selectedEmployee.department}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Claim Date</p>
                  <p className="text-sm font-medium">
                    {new Date(formData.claimDate).toLocaleDateString('en-IN')}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Expense Details */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 border-b pb-2">
              Expense Details
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expenseCategory">
                  Expense Category <span className="text-red-500">*</span>
                </Label>
                <Select 
                  value={formData.expenseCategory} 
                  onValueChange={(v) => handleInputChange('expenseCategory', v)}
                >
                  <SelectTrigger className={errors.expenseCategory ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {expenseCategories.map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.expenseCategory && <p className="text-xs text-red-500">{errors.expenseCategory}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="expenseDate">
                  Expense Date <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="expenseDate"
                  type="date"
                  value={formData.expenseDate}
                  onChange={(e) => handleInputChange('expenseDate', e.target.value)}
                  max={new Date().toISOString().split('T')[0]}
                  className={errors.expenseDate ? 'border-red-500' : ''}
                />
                {errors.expenseDate && <p className="text-xs text-red-500">{errors.expenseDate}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">
                Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe the expense in detail..."
                rows={3}
                className={errors.description ? 'border-red-500' : ''}
              />
              {errors.description && <p className="text-xs text-red-500">{errors.description}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="claimAmount">
                Claim Amount (₹) <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                <Input
                  id="claimAmount"
                  type="text"
                  value={formData.claimAmount}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, '');
                    handleInputChange('claimAmount', value);
                  }}
                  placeholder="0"
                  className={cn("pl-9", errors.claimAmount ? 'border-red-500' : '')}
                />
              </div>
              {formData.claimAmount && !errors.claimAmount && (
                <p className="text-xs text-gray-500">
                  ₹{Number(formData.claimAmount).toLocaleString('en-IN')}
                </p>
              )}
              {errors.claimAmount && <p className="text-xs text-red-500">{errors.claimAmount}</p>}
            </div>
          </div>

          {/* Supporting Document */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 border-b pb-2">
              Supporting Document
            </h3>
            
            <div className="space-y-2">
              <Label>
                Receipt / Invoice <span className="text-red-500">*</span>
              </Label>
              <div
                className={cn(
                  "relative border-2 border-dashed rounded-lg p-6 transition-colors",
                  dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400",
                  errors.supportingDoc ? "border-red-500" : ""
                )}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  onChange={handleFileSelect}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                />
                <div className="text-center">
                  <Upload className="size-10 text-gray-400 mx-auto mb-2" />
                  {formData.supportingDoc ? (
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {formData.supportingDoc.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {(formData.supportingDoc.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                      <p className="text-xs text-blue-600 mt-1">Click or drag to replace</p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm text-gray-600">
                        Drag & drop your receipt here, or <span className="text-blue-600">browse</span>
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Supported formats: PDF, JPG, PNG, DOC (Max 5MB)
                      </p>
                    </div>
                  )}
                </div>
              </div>
              {errors.supportingDoc && <p className="text-xs text-red-500">{errors.supportingDoc}</p>}
            </div>
          </div>

          {/* Additional Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes (Optional)</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              placeholder="Any additional information..."
              rows={2}
            />
          </div>

          {/* Approval Workflow Info */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-blue-800 mb-2">Approval Workflow</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-3">
                <div className="size-6 rounded-full bg-blue-200 flex items-center justify-center text-xs font-medium text-blue-700">
                  1
                </div>
                <span className="text-blue-700">L1: Manager Approval</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="size-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600">
                  2
                </div>
                <span className="text-gray-600">L2: Finance Approval</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="size-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600">
                  3
                </div>
                <span className="text-gray-600">Payment Processing</span>
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2">
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
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <span className="mr-2">Submitting...</span>
                  <div className="size-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                </>
              ) : (
                <>
                  <Receipt className="size-4 mr-2" />
                  Submit Claim
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}