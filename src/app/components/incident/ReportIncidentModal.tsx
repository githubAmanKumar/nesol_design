// src/components/incident/ReportIncidentModal.tsx
import { useState } from 'react';
import { 
  AlertTriangle, Shield, Wrench, Users, Truck, 
  Calendar, Clock, MapPin, User, FileText, CheckCircle,
  XCircle, Upload, Building2
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
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Switch } from '../ui/switch';
import { cn } from '../ui/utils';

interface ReportIncidentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

interface IncidentFormData {
  incidentType: string;
  severity: string;
  location: string;
  department: string;
  incidentDate: string;
  incidentTime: string;
  reportedBy: string;
  description: string;
  immediateAction: string;
  injuryInvolved: boolean;
  injuryDetails: string;
  damageInvolved: boolean;
  damageDetails: string;
  productionLoss: number;
  witnesses: string[];
  attachments: File[];
  notifyManagement: boolean;
  priority: string;
}

const initialFormData: IncidentFormData = {
  incidentType: '',
  severity: 'Medium',
  location: '',
  department: '',
  incidentDate: new Date().toISOString().split('T')[0],
  incidentTime: new Date().toTimeString().slice(0, 5),
  reportedBy: '',
  description: '',
  immediateAction: '',
  injuryInvolved: false,
  injuryDetails: '',
  damageInvolved: false,
  damageDetails: '',
  productionLoss: 0,
  witnesses: [],
  attachments: [],
  notifyManagement: true,
  priority: 'Medium',
};

const incidentTypes = [
  { value: 'Safety', icon: Shield, color: 'text-blue-600' },
  { value: 'Environmental', icon: Truck, color: 'text-green-600' },
  { value: 'Equipment', icon: Wrench, color: 'text-orange-600' },
  { value: 'Quality', icon: AlertTriangle, color: 'text-red-600' },
  { value: 'HR', icon: Users, color: 'text-purple-600' },
  { value: 'Security', icon: Building2, color: 'text-gray-600' },
];

const severityLevels = ['Low', 'Medium', 'High', 'Critical'];
const priorities = ['Low', 'Medium', 'High', 'Urgent'];

const locations = [
  'Production Floor - Grid Casting',
  'Production Floor - Paste Mixing',
  'Production Floor - Assembly Line 1',
  'Production Floor - Assembly Line 2',
  'Formation Area',
  'Chemical Storage',
  'QC Lab',
  'R&D Lab',
  'Warehouse A',
  'Plant Store',
  'Maintenance Bay',
  'HR Department',
  'Admin Office',
  'Logistics',
  'Dispatch Bay',
];

const departments = ['Production', 'Quality', 'R&D', 'Maintenance', 'Logistics', 'HR', 'Admin', 'Security'];

const employees = [
  'Rajesh Kumar',
  'Priya Sharma',
  'Vikram Singh',
  'Amit Singh',
  'Ramesh Chandra',
  'Dinesh Rawat',
  'Suresh Patel',
];

export function ReportIncidentModal({ open, onOpenChange, onSuccess }: ReportIncidentModalProps) {
  const [formData, setFormData] = useState<IncidentFormData>(initialFormData);
  const [newWitness, setNewWitness] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof IncidentFormData, string>>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof IncidentFormData, string>> = {};

    if (!formData.incidentType) newErrors.incidentType = 'Incident type is required';
    if (!formData.location) newErrors.location = 'Location is required';
    if (!formData.department) newErrors.department = 'Department is required';
    if (!formData.reportedBy) newErrors.reportedBy = 'Reporter name is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.immediateAction) newErrors.immediateAction = 'Immediate action is required';
    if (formData.injuryInvolved && !formData.injuryDetails) {
      newErrors.injuryDetails = 'Injury details are required';
    }
    if (formData.damageInvolved && !formData.damageDetails) {
      newErrors.damageDetails = 'Damage details are required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    const incidentData = {
      ...formData,
      id: `INC/${new Date().getFullYear()}/${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
      reportedDate: new Date().toISOString(),
      status: 'Under Investigation',
      assignedTo: getDefaultAssignee(formData.incidentType, formData.department),
      createdAt: new Date().toISOString(),
    };
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Incident Reported:', incidentData);
    setIsSubmitting(false);
    onOpenChange(false);
    onSuccess?.();
    resetForm();
  };

  const getDefaultAssignee = (type: string, department: string): string => {
    const assigneeMap: Record<string, string> = {
      'Safety': 'Safety Officer',
      'Environmental': 'EHS Team',
      'Equipment': 'Maintenance Team',
      'Quality': 'Quality Team',
      'HR': 'HR Manager',
      'Security': 'Security Head',
    };
    return assigneeMap[type] || `${department} Head`;
  };

  const resetForm = () => {
    setFormData({
      ...initialFormData,
      incidentDate: new Date().toISOString().split('T')[0],
      incidentTime: new Date().toTimeString().slice(0, 5),
    });
    setNewWitness('');
    setErrors({});
  };

  const handleInputChange = (field: keyof IncidentFormData, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const addWitness = () => {
    if (newWitness.trim() && !formData.witnesses.includes(newWitness.trim())) {
      handleInputChange('witnesses', [...formData.witnesses, newWitness.trim()]);
      setNewWitness('');
    }
  };

  const removeWitness = (witness: string) => {
    handleInputChange('witnesses', formData.witnesses.filter(w => w !== witness));
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleInputChange('attachments', [...formData.attachments, ...Array.from(e.target.files)]);
    }
  };

  const removeFile = (index: number) => {
    handleInputChange('attachments', formData.attachments.filter((_, i) => i !== index));
  };

  const selectedType = incidentTypes.find(t => t.value === formData.incidentType);
  const TypeIcon = selectedType?.icon || AlertTriangle;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <AlertTriangle className="size-5 text-red-500" />
            Report New Incident
          </DialogTitle>
          <DialogDescription>
            Report a safety, quality, or operational incident. Incident ID will be auto-generated.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Incident Type & Severity */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="incidentType">
                Incident Type <span className="text-red-500">*</span>
              </Label>
              <Select 
                value={formData.incidentType} 
                onValueChange={(v) => handleInputChange('incidentType', v)}
              >
                <SelectTrigger className={errors.incidentType ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {incidentTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center gap-2">
                          <Icon className={cn("size-4", type.color)} />
                          {type.value}
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              {errors.incidentType && <p className="text-xs text-red-500">{errors.incidentType}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="severity">Severity Level</Label>
              <Select 
                value={formData.severity} 
                onValueChange={(v) => handleInputChange('severity', v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select severity" />
                </SelectTrigger>
                <SelectContent>
                  {severityLevels.map((level) => (
                    <SelectItem key={level} value={level}>{level}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Location & Department */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">
                Location <span className="text-red-500">*</span>
              </Label>
              <Select 
                value={formData.location} 
                onValueChange={(v) => handleInputChange('location', v)}
              >
                <SelectTrigger className={errors.location ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((loc) => (
                    <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.location && <p className="text-xs text-red-500">{errors.location}</p>}
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

          {/* Date, Time & Reporter */}
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="incidentDate">Incident Date</Label>
              <Input
                id="incidentDate"
                type="date"
                value={formData.incidentDate}
                onChange={(e) => handleInputChange('incidentDate', e.target.value)}
                max={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="incidentTime">Incident Time</Label>
              <Input
                id="incidentTime"
                type="time"
                value={formData.incidentTime}
                onChange={(e) => handleInputChange('incidentTime', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reportedBy">
                Reported By <span className="text-red-500">*</span>
              </Label>
              <Select 
                value={formData.reportedBy} 
                onValueChange={(v) => handleInputChange('reportedBy', v)}
              >
                <SelectTrigger className={errors.reportedBy ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select employee" />
                </SelectTrigger>
                <SelectContent>
                  {employees.map((emp) => (
                    <SelectItem key={emp} value={emp}>{emp}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.reportedBy && <p className="text-xs text-red-500">{errors.reportedBy}</p>}
            </div>
          </div>

          {/* Priority */}
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

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">
              Incident Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe what happened in detail..."
              rows={4}
              className={errors.description ? 'border-red-500' : ''}
            />
            {errors.description && <p className="text-xs text-red-500">{errors.description}</p>}
          </div>

          {/* Immediate Action */}
          <div className="space-y-2">
            <Label htmlFor="immediateAction">
              Immediate Action Taken <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="immediateAction"
              value={formData.immediateAction}
              onChange={(e) => handleInputChange('immediateAction', e.target.value)}
              placeholder="What immediate actions were taken?"
              rows={2}
              className={errors.immediateAction ? 'border-red-500' : ''}
            />
            {errors.immediateAction && <p className="text-xs text-red-500">{errors.immediateAction}</p>}
          </div>

          {/* Injury & Damage */}
          <div className="space-y-4 border-t pt-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900">Injury Involved</p>
                <p className="text-xs text-gray-500">Was anyone injured during the incident?</p>
              </div>
              <Switch
                checked={formData.injuryInvolved}
                onCheckedChange={(v) => handleInputChange('injuryInvolved', v)}
              />
            </div>

            {formData.injuryInvolved && (
              <div className="space-y-2 pl-4 border-l-2 border-red-200">
                <Label htmlFor="injuryDetails">
                  Injury Details <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="injuryDetails"
                  value={formData.injuryDetails}
                  onChange={(e) => handleInputChange('injuryDetails', e.target.value)}
                  placeholder="Describe injuries and affected persons..."
                  rows={2}
                  className={errors.injuryDetails ? 'border-red-500' : ''}
                />
                {errors.injuryDetails && <p className="text-xs text-red-500">{errors.injuryDetails}</p>}
              </div>
            )}

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900">Property Damage Involved</p>
                <p className="text-xs text-gray-500">Was there any damage to equipment or property?</p>
              </div>
              <Switch
                checked={formData.damageInvolved}
                onCheckedChange={(v) => handleInputChange('damageInvolved', v)}
              />
            </div>

            {formData.damageInvolved && (
              <div className="space-y-2 pl-4 border-l-2 border-orange-200">
                <Label htmlFor="damageDetails">
                  Damage Details <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="damageDetails"
                  value={formData.damageDetails}
                  onChange={(e) => handleInputChange('damageDetails', e.target.value)}
                  placeholder="Describe damaged equipment/property..."
                  rows={2}
                  className={errors.damageDetails ? 'border-red-500' : ''}
                />
                {errors.damageDetails && <p className="text-xs text-red-500">{errors.damageDetails}</p>}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="productionLoss">Production Loss (Hours)</Label>
              <Input
                id="productionLoss"
                type="number"
                min="0"
                step="0.5"
                value={formData.productionLoss}
                onChange={(e) => handleInputChange('productionLoss', Number(e.target.value))}
              />
            </div>
          </div>

          {/* Witnesses */}
          <div className="space-y-2">
            <Label>Witnesses (Optional)</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.witnesses.map((witness) => (
                <span key={witness} className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-700 flex items-center gap-1">
                  {witness}
                  <button
                    type="button"
                    onClick={() => removeWitness(witness)}
                    className="ml-1 hover:text-red-500"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newWitness}
                onChange={(e) => setNewWitness(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addWitness())}
                placeholder="Enter witness name"
              />
              <Button type="button" variant="outline" onClick={addWitness}>
                Add
              </Button>
            </div>
          </div>

          {/* Attachments */}
          <div className="space-y-2">
            <Label>Attachments (Optional)</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
              <input
                type="file"
                multiple
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <div className="text-center">
                  <Upload className="size-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">
                    Click to upload photos or documents
                  </p>
                  <p className="text-xs text-gray-500">
                    PDF, JPG, PNG (Max 10MB each)
                  </p>
                </div>
              </label>
            </div>
            {formData.attachments.length > 0 && (
              <div className="space-y-1">
                {formData.attachments.map((file, idx) => (
                  <div key={idx} className="flex items-center justify-between text-sm">
                    <span>{file.name}</span>
                    <button
                      type="button"
                      onClick={() => removeFile(idx)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <XCircle className="size-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Notification */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-gray-900">Notify Management</p>
              <p className="text-xs text-gray-500">Send immediate notification to relevant managers</p>
            </div>
            <Switch
              checked={formData.notifyManagement}
              onCheckedChange={(v) => handleInputChange('notifyManagement', v)}
            />
          </div>

          {/* Summary */}
          <div className="bg-red-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-red-800 mb-2">Incident Summary</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-red-600">Type</p>
                <p className="font-medium">{formData.incidentType || 'Not selected'}</p>
              </div>
              <div>
                <p className="text-red-600">Severity</p>
                <p className="font-medium">{formData.severity}</p>
              </div>
              <div>
                <p className="text-red-600">Location</p>
                <p className="font-medium">{formData.location || 'Not selected'}</p>
              </div>
              <div>
                <p className="text-red-600">Reported By</p>
                <p className="font-medium">{formData.reportedBy || 'Not selected'}</p>
              </div>
              <div>
                <p className="text-red-600">Initial Status</p>
                <p className="font-medium text-yellow-700">Under Investigation</p>
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
            <Button type="submit" disabled={isSubmitting} className="bg-red-600 hover:bg-red-700">
              {isSubmitting ? (
                <>
                  <span className="mr-2">Reporting...</span>
                  <div className="size-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                </>
              ) : (
                <>
                  <AlertTriangle className="size-4 mr-2" />
                  Report Incident
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}