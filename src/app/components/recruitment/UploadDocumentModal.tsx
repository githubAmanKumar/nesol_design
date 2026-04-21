// src/components/recruitment/UploadDocumentModal.tsx
import { useState } from 'react';
import { X, Upload, FileText, Calendar, Users, Shield, Eye, Edit, Download } from 'lucide-react';
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
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Checkbox } from '../ui/checkbox';
import { cn } from '../ui/utils';

interface UploadDocumentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
  employeeId?: string;
  employeeName?: string;
}

interface DocumentFormData {
  employeeId: string;
  documentCategory: string;
  documentName: string;
  documentFile: File | null;
  hasExpiry: boolean;
  expiryDate: string;
  alertBeforeDays: string[];
  isAgreement: boolean;
  requiresSignature: boolean;
  viewAccess: string[];
  editAccess: string;
  downloadPermission: boolean;
  notes: string;
}

const initialFormData: DocumentFormData = {
  employeeId: '',
  documentCategory: '',
  documentName: '',
  documentFile: null,
  hasExpiry: false,
  expiryDate: '',
  alertBeforeDays: ['30'],
  isAgreement: false,
  requiresSignature: false,
  viewAccess: ['HR Admin'],
  editAccess: 'HR Admin',
  downloadPermission: true,
  notes: '',
};

const documentCategories = [
  'ID Proof',
  'Certificates',
  'Agreements',
  'Appraisal Letters',
  'Disciplinary',
  'Medical',
];

const alertBeforeOptions = [
  { value: '30', label: '30 days before' },
  { value: '15', label: '15 days before' },
  { value: '7', label: '7 days before' },
  { value: '1', label: '1 day before' },
];

const viewAccessOptions = [
  { value: 'HR Admin', label: 'HR Admin' },
  { value: 'Manager', label: 'Manager' },
  { value: 'Employee Self', label: 'Employee Self' },
];

const editAccessOptions = [
  { value: 'HR Admin Only', label: 'HR Admin Only' },
  { value: 'Manager', label: 'Manager & HR Admin' },
];

// Mock employee list for dropdown
const employees = [
  { id: 'NES/EMP/001', name: 'Rajesh Kumar' },
  { id: 'NES/EMP/002', name: 'Priya Sharma' },
  { id: 'NES/EMP/003', name: 'Amit Singh' },
  { id: 'NES/EMP/004', name: 'Sunita Devi' },
  { id: 'NES/EMP/005', name: 'Vikram Singh' },
];

export function UploadDocumentModal({ 
  open, 
  onOpenChange, 
  onSuccess,
  employeeId,
  employeeName 
}: UploadDocumentModalProps) {
  const [formData, setFormData] = useState<DocumentFormData>({
    ...initialFormData,
    employeeId: employeeId || '',
  });
  const [dragActive, setDragActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof DocumentFormData, string>>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof DocumentFormData, string>> = {};

    if (!formData.employeeId) newErrors.employeeId = 'Employee is required';
    if (!formData.documentCategory) newErrors.documentCategory = 'Document category is required';
    if (!formData.documentName) newErrors.documentName = 'Document name is required';
    if (!formData.documentFile) newErrors.documentFile = 'Document file is required';
    if (formData.hasExpiry && !formData.expiryDate) {
      newErrors.expiryDate = 'Expiry date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Document Uploaded:', formData);
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

  const handleInputChange = (field: keyof DocumentFormData, value: any) => {
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
      handleInputChange('documentFile', e.dataTransfer.files[0]);
      // Auto-set document name from file
      const fileName = e.dataTransfer.files[0].name.split('.').slice(0, -1).join('.');
      if (!formData.documentName) {
        handleInputChange('documentName', fileName);
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleInputChange('documentFile', e.target.files[0]);
      // Auto-set document name from file
      const fileName = e.target.files[0].name.split('.').slice(0, -1).join('.');
      if (!formData.documentName) {
        handleInputChange('documentName', fileName);
      }
    }
  };

  const toggleViewAccess = (access: string) => {
    const current = formData.viewAccess;
    if (current.includes(access)) {
      handleInputChange('viewAccess', current.filter(a => a !== access));
    } else {
      handleInputChange('viewAccess', [...current, access]);
    }
  };

  const toggleAlertDay = (day: string) => {
    const current = formData.alertBeforeDays;
    if (current.includes(day)) {
      handleInputChange('alertBeforeDays', current.filter(d => d !== day));
    } else {
      handleInputChange('alertBeforeDays', [...current, day]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Upload Document</DialogTitle>
          <DialogDescription>
            Upload employee documents with expiry tracking and access control.
            Document ID will be auto-generated.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Employee Selection */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 border-b pb-2">Employee Information</h3>
            
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
                        {emp.name} ({emp.id})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              {errors.employeeId && <p className="text-xs text-red-500">{errors.employeeId}</p>}
            </div>
          </div>

          {/* Document Details */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 border-b pb-2">Document Details</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="documentCategory">
                  Document Category <span className="text-red-500">*</span>
                </Label>
                <Select 
                  value={formData.documentCategory} 
                  onValueChange={(v) => handleInputChange('documentCategory', v)}
                >
                  <SelectTrigger className={errors.documentCategory ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {documentCategories.map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.documentCategory && <p className="text-xs text-red-500">{errors.documentCategory}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="documentName">
                  Document Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="documentName"
                  value={formData.documentName}
                  onChange={(e) => handleInputChange('documentName', e.target.value)}
                  placeholder="e.g., Aadhaar Card"
                  className={errors.documentName ? 'border-red-500' : ''}
                />
                {errors.documentName && <p className="text-xs text-red-500">{errors.documentName}</p>}
              </div>
            </div>

            {/* File Upload */}
            <div className="space-y-2">
              <Label>
                Document File <span className="text-red-500">*</span>
              </Label>
              <div
                className={cn(
                  "relative border-2 border-dashed rounded-lg p-6 transition-colors",
                  dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400",
                  errors.documentFile ? "border-red-500" : ""
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
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
                <div className="text-center">
                  <Upload className="size-10 text-gray-400 mx-auto mb-2" />
                  {formData.documentFile ? (
                    <div>
                      <p className="text-sm font-medium text-gray-900">{formData.documentFile.name}</p>
                      <p className="text-xs text-gray-500">
                        {(formData.documentFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                      <p className="text-xs text-blue-600 mt-1">Click or drag to replace</p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm text-gray-600">
                        Drag & drop your file here, or <span className="text-blue-600">browse</span>
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Supported formats: PDF, DOC, DOCX, JPG, PNG (Max 10MB)
                      </p>
                    </div>
                  )}
                </div>
              </div>
              {errors.documentFile && <p className="text-xs text-red-500">{errors.documentFile}</p>}
            </div>
          </div>

          {/* Expiry Alerts */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 border-b pb-2">Expiry Alerts</h3>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900">Document Has Expiry</p>
                <p className="text-xs text-gray-500">Enable if this document expires</p>
              </div>
              <Switch
                checked={formData.hasExpiry}
                onCheckedChange={(v) => handleInputChange('hasExpiry', v)}
              />
            </div>

            {formData.hasExpiry && (
              <div className="space-y-4 pl-4 border-l-2 border-blue-200">
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">
                    Expiry Date <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="expiryDate"
                    type="date"
                    value={formData.expiryDate}
                    onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                    className={errors.expiryDate ? 'border-red-500' : ''}
                    min={new Date().toISOString().split('T')[0]}
                  />
                  {errors.expiryDate && <p className="text-xs text-red-500">{errors.expiryDate}</p>}
                </div>

                <div className="space-y-2">
                  <Label>Alert Before Days</Label>
                  <div className="flex flex-wrap gap-3">
                    {alertBeforeOptions.map((option) => (
                      <label key={option.value} className="flex items-center gap-2">
                        <Checkbox
                          checked={formData.alertBeforeDays.includes(option.value)}
                          onCheckedChange={() => toggleAlertDay(option.value)}
                        />
                        <span className="text-sm text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Digital Signature (for Agreements) */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 border-b pb-2">Digital Signature</h3>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900">This is an Agreement Document</p>
                <p className="text-xs text-gray-500">Enable for agreements requiring e-signature</p>
              </div>
              <Switch
                checked={formData.isAgreement}
                onCheckedChange={(v) => handleInputChange('isAgreement', v)}
              />
            </div>

            {formData.isAgreement && (
              <div className="space-y-4 pl-4 border-l-2 border-purple-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Requires Employee E-Signature</p>
                    <p className="text-xs text-gray-500">Employee must digitally sign this document</p>
                  </div>
                  <Switch
                    checked={formData.requiresSignature}
                    onCheckedChange={(v) => handleInputChange('requiresSignature', v)}
                  />
                </div>

                {formData.requiresSignature && (
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm text-blue-800">
                      An email will be sent to the employee requesting their e-signature after upload.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Access Control */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 border-b pb-2">Access Control</h3>
            
            <div className="space-y-3">
              <div>
                <Label className="mb-2 block">View Access</Label>
                <div className="flex flex-wrap gap-3">
                  {viewAccessOptions.map((option) => (
                    <label key={option.value} className="flex items-center gap-2">
                      <Checkbox
                        checked={formData.viewAccess.includes(option.value)}
                        onCheckedChange={() => toggleViewAccess(option.value)}
                      />
                      <span className="text-sm text-gray-700">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Edit Access</Label>
                <RadioGroup 
                  value={formData.editAccess} 
                  onValueChange={(v) => handleInputChange('editAccess', v)}
                >
                  {editAccessOptions.map((option) => (
                    <label key={option.value} className="flex items-center gap-2">
                      <RadioGroupItem value={option.value} />
                      <span className="text-sm text-gray-700">{option.label}</span>
                    </label>
                  ))}
                </RadioGroup>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">Allow Download</p>
                  <p className="text-xs text-gray-500">Users with view access can download this document</p>
                </div>
                <Switch
                  checked={formData.downloadPermission}
                  onCheckedChange={(v) => handleInputChange('downloadPermission', v)}
                />
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              placeholder="Any additional information..."
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            />
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
                  <span className="mr-2">Uploading...</span>
                  <div className="size-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                </>
              ) : (
                <>
                  <Upload className="size-4 mr-2" />
                  Upload Document
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}