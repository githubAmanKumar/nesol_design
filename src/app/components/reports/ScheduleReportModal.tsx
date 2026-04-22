// src/components/reports/ScheduleReportModal.tsx
import { useState } from 'react';
import { 
  Calendar, Clock, Mail, FileText, Download, Settings,
  Users, Package, ShoppingCart, DollarSign, Truck, Building2
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
import { Checkbox } from '../ui/checkbox';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Switch } from '../ui/switch';
import { Badge } from '../ui/badge';
import { cn } from '../ui/utils';

interface ScheduleReportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

interface ScheduleFormData {
  reportName: string;
  reportType: string;
  recipients: string[];
  frequency: string;
  dayOfWeek: string;
  dayOfMonth: string;
  timeOfDay: string;
  format: string;
  includeLetterhead: boolean;
  includeCharts: boolean;
  filters: {
    departments: string[];
    regions: string[];
    productCategories: string[];
  };
  isActive: boolean;
  notes: string;
}

const initialFormData: ScheduleFormData = {
  reportName: '',
  reportType: '',
  recipients: [],
  frequency: 'Daily',
  dayOfWeek: 'Monday',
  dayOfMonth: '1',
  timeOfDay: '09:00',
  format: 'PDF',
  includeLetterhead: true,
  includeCharts: true,
  filters: {
    departments: [],
    regions: [],
    productCategories: [],
  },
  isActive: true,
  notes: '',
};

const reportTypes = [
  { value: 'production', label: 'Production Summary', icon: Package },
  { value: 'sales', label: 'Sales Summary', icon: ShoppingCart },
  { value: 'finance', label: 'Finance Summary', icon: DollarSign },
  { value: 'hr', label: 'HR Summary', icon: Users },
  { value: 'procurement', label: 'Procurement Summary', icon: Truck },
  { value: 'inventory', label: 'Inventory Summary', icon: Building2 },
];

const frequencies = ['Daily', 'Weekly', 'Monthly'];
const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const daysOfMonth = Array.from({ length: 31 }, (_, i) => String(i + 1));
const formats = ['PDF', 'Excel', 'CSV'];
const timeOptions = [
  '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
  '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00',
];

const departmentOptions = ['Production', 'Sales', 'R&D', 'HR', 'Finance', 'Quality', 'Logistics', 'Admin'];
const regionOptions = ['North', 'South', 'East', 'West', 'Central', 'North-East'];
const productCategoryOptions = ['Automotive', 'Inverter', 'E-Rickshaw', 'Solar'];

export function ScheduleReportModal({ open, onOpenChange, onSuccess }: ScheduleReportModalProps) {
  const [formData, setFormData] = useState<ScheduleFormData>(initialFormData);
  const [newRecipient, setNewRecipient] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<string, string>> = {};

    if (!formData.reportName) newErrors.reportName = 'Report name is required';
    if (!formData.reportType) newErrors.reportType = 'Report type is required';
    if (formData.recipients.length === 0) newErrors.recipients = 'At least one recipient is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    const scheduleData = {
      ...formData,
      id: `SCH/${new Date().getFullYear()}/${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
      createdAt: new Date().toISOString(),
      lastSent: null,
      status: formData.isActive ? 'Active' : 'Inactive',
    };
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Report Schedule Created:', scheduleData);
    setIsSubmitting(false);
    onOpenChange(false);
    onSuccess?.();
    resetForm();
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setNewRecipient('');
    setErrors({});
  };

  const handleInputChange = (field: keyof ScheduleFormData, value: string | boolean | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleFilterChange = (filterType: keyof ScheduleFormData['filters'], value: string) => {
    setFormData(prev => ({
      ...prev,
      filters: {
        ...prev.filters,
        [filterType]: prev.filters[filterType].includes(value)
          ? prev.filters[filterType].filter(v => v !== value)
          : [...prev.filters[filterType], value],
      },
    }));
  };

  const addRecipient = () => {
    if (newRecipient.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newRecipient.trim())) {
      if (!formData.recipients.includes(newRecipient.trim())) {
        handleInputChange('recipients', [...formData.recipients, newRecipient.trim()]);
      }
      setNewRecipient('');
      if (errors.recipients) {
        setErrors(prev => ({ ...prev, recipients: undefined }));
      }
    }
  };

  const removeRecipient = (email: string) => {
    handleInputChange('recipients', formData.recipients.filter(r => r !== email));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addRecipient();
    }
  };

  const selectedReportType = reportTypes.find(r => r.value === formData.reportType);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <Calendar className="size-5" />
            Schedule Report
          </DialogTitle>
          <DialogDescription>
            Configure automated report delivery via email.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 border-b pb-2">
              <FileText className="size-4 inline mr-2" />
              Report Details
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="reportName">
                  Report Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="reportName"
                  value={formData.reportName}
                  onChange={(e) => handleInputChange('reportName', e.target.value)}
                  placeholder="e.g., Daily Production Report"
                  className={errors.reportName ? 'border-red-500' : ''}
                />
                {errors.reportName && <p className="text-xs text-red-500">{errors.reportName}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="reportType">
                  Report Type <span className="text-red-500">*</span>
                </Label>
                <Select 
                  value={formData.reportType} 
                  onValueChange={(v) => handleInputChange('reportType', v)}
                >
                  <SelectTrigger className={errors.reportType ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    {reportTypes.map((type) => {
                      const Icon = type.icon;
                      return (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex items-center gap-2">
                            <Icon className="size-4" />
                            {type.label}
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                {errors.reportType && <p className="text-xs text-red-500">{errors.reportType}</p>}
              </div>
            </div>
          </div>

          {/* Recipients */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 border-b pb-2">
              <Mail className="size-4 inline mr-2" />
              Recipients
            </h3>
            
            <div className="space-y-2">
              <Label>
                Email Recipients <span className="text-red-500">*</span>
              </Label>
              
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.recipients.map((email) => (
                  <Badge key={email} variant="secondary" className="gap-1">
                    {email}
                    <button
                      type="button"
                      onClick={() => removeRecipient(email)}
                      className="ml-1 hover:text-red-500"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
              
              <div className="flex gap-2">
                <Input
                  type="email"
                  value={newRecipient}
                  onChange={(e) => setNewRecipient(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter email address"
                  className={errors.recipients ? 'border-red-500' : ''}
                />
                <Button type="button" variant="outline" onClick={addRecipient}>
                  Add
                </Button>
              </div>
              {errors.recipients && <p className="text-xs text-red-500">{errors.recipients}</p>}
              <p className="text-xs text-gray-500">Separate multiple emails with Enter or click Add</p>
            </div>
          </div>

          {/* Schedule */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 border-b pb-2">
              <Clock className="size-4 inline mr-2" />
              Schedule
            </h3>
            
            <div className="space-y-2">
              <Label>Frequency</Label>
              <RadioGroup 
                value={formData.frequency} 
                onValueChange={(v) => handleInputChange('frequency', v)}
                className="flex gap-6"
              >
                {frequencies.map((freq) => (
                  <div key={freq} className="flex items-center space-x-2">
                    <RadioGroupItem value={freq} id={freq} />
                    <Label htmlFor={freq} className="cursor-pointer">{freq}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {formData.frequency === 'Weekly' && (
                <div className="space-y-2">
                  <Label htmlFor="dayOfWeek">Day of Week</Label>
                  <Select 
                    value={formData.dayOfWeek} 
                    onValueChange={(v) => handleInputChange('dayOfWeek', v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select day" />
                    </SelectTrigger>
                    <SelectContent>
                      {daysOfWeek.map((day) => (
                        <SelectItem key={day} value={day}>{day}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {formData.frequency === 'Monthly' && (
                <div className="space-y-2">
                  <Label htmlFor="dayOfMonth">Day of Month</Label>
                  <Select 
                    value={formData.dayOfMonth} 
                    onValueChange={(v) => handleInputChange('dayOfMonth', v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select day" />
                    </SelectTrigger>
                    <SelectContent>
                      {daysOfMonth.map((day) => (
                        <SelectItem key={day} value={day}>{day}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="timeOfDay">Time of Day</Label>
                <Select 
                  value={formData.timeOfDay} 
                  onValueChange={(v) => handleInputChange('timeOfDay', v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeOptions.map((time) => (
                      <SelectItem key={time} value={time}>{time}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Schedule Preview */}
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm text-blue-800">
                <span className="font-medium">Delivery Schedule:</span>{' '}
                {formData.frequency === 'Daily' && 'Every day'}
                {formData.frequency === 'Weekly' && `Every ${formData.dayOfWeek}`}
                {formData.frequency === 'Monthly' && `Every month on day ${formData.dayOfMonth}`}
                {' at '}{formData.timeOfDay}
              </p>
            </div>
          </div>

          {/* Format & Options */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 border-b pb-2">
              <Download className="size-4 inline mr-2" />
              Format & Options
            </h3>
            
            <div className="space-y-2">
              <Label>Report Format</Label>
              <RadioGroup 
                value={formData.format} 
                onValueChange={(v) => handleInputChange('format', v)}
                className="flex gap-6"
              >
                {formats.map((fmt) => (
                  <div key={fmt} className="flex items-center space-x-2">
                    <RadioGroupItem value={fmt} id={fmt} />
                    <Label htmlFor={fmt} className="cursor-pointer">{fmt}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="space-y-3">
              {formData.format === 'PDF' && (
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Include Letterhead</p>
                    <p className="text-xs text-gray-500">Add Nesol Energies logo and address</p>
                  </div>
                  <Switch
                    checked={formData.includeLetterhead}
                    onCheckedChange={(v) => handleInputChange('includeLetterhead', v)}
                  />
                </div>
              )}

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">Include Charts</p>
                  <p className="text-xs text-gray-500">Embed visual charts in the report</p>
                </div>
                <Switch
                  checked={formData.includeCharts}
                  onCheckedChange={(v) => handleInputChange('includeCharts', v)}
                />
              </div>
            </div>
          </div>

          {/* Filters (Optional) */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 border-b pb-2">
              <Settings className="size-4 inline mr-2" />
              Filters (Optional)
            </h3>
            
            <div className="space-y-3">
              <div>
                <Label className="mb-2 block">Departments</Label>
                <div className="flex flex-wrap gap-2">
                  {departmentOptions.map((dept) => (
                    <label key={dept} className="flex items-center gap-2">
                      <Checkbox
                        checked={formData.filters.departments.includes(dept)}
                        onCheckedChange={() => handleFilterChange('departments', dept)}
                      />
                      <span className="text-sm text-gray-700">{dept}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <Label className="mb-2 block">Regions</Label>
                <div className="flex flex-wrap gap-2">
                  {regionOptions.map((region) => (
                    <label key={region} className="flex items-center gap-2">
                      <Checkbox
                        checked={formData.filters.regions.includes(region)}
                        onCheckedChange={() => handleFilterChange('regions', region)}
                      />
                      <span className="text-sm text-gray-700">{region}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <Label className="mb-2 block">Product Categories</Label>
                <div className="flex flex-wrap gap-2">
                  {productCategoryOptions.map((cat) => (
                    <label key={cat} className="flex items-center gap-2">
                      <Checkbox
                        checked={formData.filters.productCategories.includes(cat)}
                        onCheckedChange={() => handleFilterChange('productCategories', cat)}
                      />
                      <span className="text-sm text-gray-700">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Active Status & Notes */}
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900">Active Schedule</p>
                <p className="text-xs text-gray-500">Enable or disable this scheduled report</p>
              </div>
              <Switch
                checked={formData.isActive}
                onCheckedChange={(v) => handleInputChange('isActive', v)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes (Optional)</Label>
              <textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="Any additional information..."
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              />
            </div>
          </div>

          {/* Summary */}
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-green-800 mb-2">Schedule Summary</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-green-600">Report</p>
                <p className="font-medium">{formData.reportName || 'Not set'}</p>
              </div>
              <div>
                <p className="text-green-600">Type</p>
                <p className="font-medium">{selectedReportType?.label || 'Not selected'}</p>
              </div>
              <div>
                <p className="text-green-600">Frequency</p>
                <p className="font-medium">{formData.frequency}</p>
              </div>
              <div>
                <p className="text-green-600">Format</p>
                <p className="font-medium">{formData.format}</p>
              </div>
              <div className="col-span-2">
                <p className="text-green-600">Recipients ({formData.recipients.length})</p>
                <p className="font-medium text-xs truncate">{formData.recipients.join(', ') || 'None'}</p>
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
                  <span className="mr-2">Creating...</span>
                  <div className="size-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                </>
              ) : (
                <>
                  <Calendar className="size-4 mr-2" />
                  Schedule Report
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}