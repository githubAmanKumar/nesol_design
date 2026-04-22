// src/components/procurement/NewMRFModal.tsx
import { useState } from 'react';
import { 
  Plus, Trash2, ClipboardList, Calendar, User, Package,
  FileText, Building2, AlertCircle
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

interface NewMRFModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

interface MRFItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
}

interface MRFFormData {
  requestedBy: string;
  department: string;
  requiredDate: string;
  items: MRFItem[];
  purpose: string;
  jobReference: string;
  priority: string;
  notes: string;
}

const initialItem: MRFItem = {
  id: crypto.randomUUID(),
  name: '',
  quantity: 1,
  unit: 'Kg',
};

const initialFormData: MRFFormData = {
  requestedBy: '',
  department: '',
  requiredDate: '',
  items: [{ ...initialItem, id: crypto.randomUUID() }],
  purpose: '',
  jobReference: '',
  priority: 'Medium',
  notes: '',
};

const departments = ['Production', 'Quality', 'R&D', 'Maintenance', 'Logistics', 'HR', 'Admin'];
const units = ['Kg', 'Litre', 'Pcs', 'Mtr', 'Box', 'Set', 'Roll', 'Packet'];
const priorities = ['Low', 'Medium', 'High', 'Urgent'];
const materialSuggestions = [
  'Lead Ingots', 'Lead Oxide', 'Sulfuric Acid', 'PP Granules', 'Separators',
  'Terminals', 'Container', 'Lid', 'Testing Probes', 'Calibration Fluid',
  'Safety Gloves', 'Face Masks', 'Lubricant Oil', 'Cleaning Solution',
];

// Mock employees
const employees = [
  { id: 'NES/EMP/001', name: 'Rajesh Kumar', department: 'Production' },
  { id: 'NES/EMP/002', name: 'Priya Sharma', department: 'Quality' },
  { id: 'NES/EMP/005', name: 'Vikram Singh', department: 'Production' },
  { id: 'NES/EMP/008', name: 'Meena Kumari', department: 'R&D' },
  { id: 'NES/EMP/012', name: 'Ramesh Chandra', department: 'Logistics' },
];

export function NewMRFModal({ open, onOpenChange, onSuccess }: NewMRFModalProps) {
  const [formData, setFormData] = useState<MRFFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<string, string>> = {};

    if (!formData.requestedBy) newErrors.requestedBy = 'Requested by is required';
    if (!formData.department) newErrors.department = 'Department is required';
    if (!formData.requiredDate) newErrors.requiredDate = 'Required date is required';
    if (!formData.purpose) newErrors.purpose = 'Purpose is required';
    
    formData.items.forEach((item, idx) => {
      if (!item.name) newErrors[`item_${idx}_name`] = 'Item name is required';
      if (item.quantity <= 0) newErrors[`item_${idx}_quantity`] = 'Quantity must be greater than 0';
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
    
    console.log('MRF Created:', formData);
    setIsSubmitting(false);
    onOpenChange(false);
    onSuccess?.();
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      ...initialFormData,
      items: [{ ...initialItem, id: crypto.randomUUID() }],
    });
    setErrors({});
  };

  const handleInputChange = (field: keyof MRFFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { ...initialItem, id: crypto.randomUUID() }],
    }));
  };

  const removeItem = (id: string) => {
    if (formData.items.length === 1) return;
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id),
    }));
  };

  const updateItem = (id: string, field: keyof MRFItem, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.map(item => {
        if (item.id !== id) return item;
        return { ...item, [field]: value };
      }),
    }));
    
    // Clear error for this item
    const itemIdx = formData.items.findIndex(item => item.id === id);
    if (errors[`item_${itemIdx}_${field}`]) {
      setErrors(prev => ({ ...prev, [`item_${itemIdx}_${field}`]: undefined }));
    }
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <ClipboardList className="size-5" />
            New Material Requisition (MRF)
          </DialogTitle>
          <DialogDescription>
            Create a new material requisition form. MRF ID will be auto-generated.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Requester Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 border-b pb-2">
              <User className="size-4 inline mr-2" />
              Requester Information
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="requestedBy">
                  Requested By <span className="text-red-500">*</span>
                </Label>
                <Select 
                  value={formData.requestedBy} 
                  onValueChange={(v) => handleInputChange('requestedBy', v)}
                >
                  <SelectTrigger className={errors.requestedBy ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select employee" />
                  </SelectTrigger>
                  <SelectContent>
                    {employees.map((emp) => (
                      <SelectItem key={emp.id} value={`${emp.name} (${emp.department})`}>
                        {emp.name} - {emp.department}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.requestedBy && <p className="text-xs text-red-500">{errors.requestedBy}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="department">
                  Department <span className="text-red-500">*</span>
                </Label>
                <Select 
                  value={formData.department} 
                  onValueChange={(v) => handleInputChange('department', v)}
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
            </div>
          </div>

          {/* Required Date & Priority */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="requiredDate">
                Required Date <span className="text-red-500">*</span>
              </Label>
              <Input
                id="requiredDate"
                type="date"
                value={formData.requiredDate}
                onChange={(e) => handleInputChange('requiredDate', e.target.value)}
                min={getTomorrowDate()}
                className={errors.requiredDate ? 'border-red-500' : ''}
              />
              {errors.requiredDate && <p className="text-xs text-red-500">{errors.requiredDate}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select 
                value={formData.priority} 
                onValueChange={(v) => handleInputChange('priority', v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  {priorities.map((p) => (
                    <SelectItem key={p} value={p}>{p}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Items Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-900">
                <Package className="size-4 inline mr-2" />
                Items Required
              </h3>
              <Button type="button" variant="outline" size="sm" onClick={addItem}>
                <Plus className="size-4 mr-1" />
                Add Item
              </Button>
            </div>

            {formData.items.map((item, idx) => (
              <div key={item.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-gray-900">Item {idx + 1}</h4>
                  {formData.items.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>
                    Item Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    value={item.name}
                    onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                    placeholder="e.g., Lead Ingots"
                    list="material-suggestions"
                    className={errors[`item_${idx}_name`] ? 'border-red-500' : ''}
                  />
                  <datalist id="material-suggestions">
                    {materialSuggestions.map((mat) => (
                      <option key={mat} value={mat} />
                    ))}
                  </datalist>
                  {errors[`item_${idx}_name`] && (
                    <p className="text-xs text-red-500">{errors[`item_${idx}_name`]}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label>
                      Quantity <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateItem(item.id, 'quantity', Number(e.target.value))}
                      className={errors[`item_${idx}_quantity`] ? 'border-red-500' : ''}
                    />
                    {errors[`item_${idx}_quantity`] && (
                      <p className="text-xs text-red-500">{errors[`item_${idx}_quantity`]}</p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <Label>Unit</Label>
                    <Select 
                      value={item.unit} 
                      onValueChange={(v) => updateItem(item.id, 'unit', v)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                      <SelectContent>
                        {units.map((unit) => (
                          <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Purpose & Reference */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 border-b pb-2">
              <FileText className="size-4 inline mr-2" />
              Purpose & Reference
            </h3>
            
            <div className="space-y-2">
              <Label htmlFor="purpose">
                Purpose <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="purpose"
                value={formData.purpose}
                onChange={(e) => handleInputChange('purpose', e.target.value)}
                placeholder="e.g., Production order PO/2026/156, Monthly stock replenishment"
                rows={2}
                className={errors.purpose ? 'border-red-500' : ''}
              />
              {errors.purpose && <p className="text-xs text-red-500">{errors.purpose}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="jobReference">Job Reference (Optional)</Label>
              <Input
                id="jobReference"
                value={formData.jobReference}
                onChange={(e) => handleInputChange('jobReference', e.target.value)}
                placeholder="e.g., Batch #B042, Project #P015"
              />
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

          {/* Summary */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-blue-800 mb-2">Requisition Summary</h4>
            <div className="space-y-1 text-sm">
              <p><span className="text-blue-700">Total Items:</span> {formData.items.length}</p>
              <p><span className="text-blue-700">Total Quantity:</span> {formData.items.reduce((sum, item) => sum + item.quantity, 0)}</p>
              <p><span className="text-blue-700">Department:</span> {formData.department || 'Not selected'}</p>
              <p><span className="text-blue-700">Required by:</span> {formData.requiredDate ? new Date(formData.requiredDate).toLocaleDateString('en-IN') : 'Not set'}</p>
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
                  <span className="mr-2">Creating...</span>
                  <div className="size-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                </>
              ) : (
                <>
                  <ClipboardList className="size-4 mr-2" />
                  Create MRF
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}