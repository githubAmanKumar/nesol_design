// src/components/quality/NewQCCheckModal.tsx
import { useState } from 'react';
import { 
  Shield, CheckCircle, XCircle, ClipboardCheck, Calendar,
  User, Package, FileText, AlertCircle, Search
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Textarea } from '../ui/textarea';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { cn } from '../ui/utils';

interface NewQCCheckModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

interface QCFormData {
  qcType: 'inprocess' | 'finished';
  batchNumber: string;
  stage?: string;
  testType?: string;
  specification: string;
  standardValue: string;
  measuredValue: string;
  unit: string;
  result: 'Pass' | 'Fail';
  checkedBy: string;
  remarks: string;
  complianceStandard?: string;
}

const initialFormData: QCFormData = {
  qcType: 'inprocess',
  batchNumber: '',
  stage: '',
  testType: '',
  specification: '',
  standardValue: '',
  measuredValue: '',
  unit: '',
  result: 'Pass',
  checkedBy: '',
  remarks: '',
  complianceStandard: '',
};

const inProcessStages = [
  'Paste Mixing',
  'Grid Casting',
  'Pasting',
  'Curing',
  'Assembly',
  'Formation Charging',
  'Final Testing',
  'Packing',
];

const inProcessSpecs: Record<string, { spec: string; standard: string; unit: string }> = {
  'Paste Mixing': { spec: 'Paste Density', standard: '4.2-4.5', unit: 'g/cm³' },
  'Grid Casting': { spec: 'Grid Weight', standard: '125-130', unit: 'g' },
  'Pasting': { spec: 'Plate Thickness', standard: '2.5-3.0', unit: 'mm' },
  'Curing': { spec: 'Chamber Temperature', standard: '45-50', unit: '°C' },
  'Assembly': { spec: 'Torque', standard: '8-10', unit: 'Nm' },
  'Formation Charging': { spec: 'Charging Voltage', standard: '14.4-14.8', unit: 'V' },
  'Final Testing': { spec: 'Open Circuit Voltage', standard: '12.6-13.2', unit: 'V' },
  'Packing': { spec: 'Visual Inspection', standard: 'Pass', unit: '' },
};

const finishedTestTypes = [
  'Capacity Test',
  'HRD Test',
  'Visual Inspection',
  'Short Circuit Test',
  'CCA Test',
  'Charge Acceptance Test',
  'Water Loss Test',
  'Vibration Test',
];

const complianceStandards = ['IS 14257', 'IS 1651', 'IS 15549', 'Customer Spec', 'IEC 60896', 'JIS C 8702'];
const qcInspectors = ['Priya Sharma', 'Amit Kumar', 'Sneha Gupta', 'Rahul Verma', 'Deepak Singh'];
const units = ['g/cm³', 'g', 'mm', '°C', 'Nm', 'V', 'A', 'AH', 'mΩ', '%'];

// Mock batches
const activeBatches = [
  { number: 'BATCH/2026/042', product: 'Automotive Battery 150AH', stage: 'Assembly' },
  { number: 'BATCH/2026/043', product: 'Inverter Battery 200AH', stage: 'Formation Charging' },
  { number: 'BATCH/2026/044', product: 'E-Rickshaw Battery 120AH', stage: 'Pasting' },
  { number: 'BATCH/2026/045', product: 'Solar Battery 40AH', stage: 'Final Testing' },
  { number: 'BATCH/2026/041', product: 'Inverter Battery 200AH', stage: 'Completed' },
];

export function NewQCCheckModal({ open, onOpenChange, onSuccess }: NewQCCheckModalProps) {
  const [formData, setFormData] = useState<QCFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof QCFormData, string>>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof QCFormData, string>> = {};

    if (!formData.batchNumber) newErrors.batchNumber = 'Batch number is required';
    if (formData.qcType === 'inprocess' && !formData.stage) {
      newErrors.stage = 'Production stage is required';
    }
    if (formData.qcType === 'finished' && !formData.testType) {
      newErrors.testType = 'Test type is required';
    }
    if (!formData.measuredValue) newErrors.measuredValue = 'Measured value is required';
    if (!formData.checkedBy) newErrors.checkedBy = 'Inspector name is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    const qcData = {
      ...formData,
      id: `QC/${formData.qcType === 'inprocess' ? 'IP' : 'FG'}/${new Date().getFullYear()}/${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
      timestamp: new Date().toISOString(),
    };
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('QC Check Recorded:', qcData);
    setIsSubmitting(false);
    onOpenChange(false);
    onSuccess?.();
    resetForm();
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setErrors({});
  };

  const handleInputChange = (field: keyof QCFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleStageSelect = (stage: string) => {
    const spec = inProcessSpecs[stage];
    setFormData(prev => ({
      ...prev,
      stage,
      specification: spec?.spec || '',
      standardValue: spec?.standard || '',
      unit: spec?.unit || '',
    }));
  };

  const checkResult = (measured: string, standard: string): 'Pass' | 'Fail' => {
    if (!measured || !standard) return 'Fail';
    
    // Handle range specifications like "4.2-4.5"
    if (standard.includes('-')) {
      const [min, max] = standard.split('-').map(Number);
      const value = Number(measured);
      return value >= min && value <= max ? 'Pass' : 'Fail';
    }
    
    // Handle greater than or equal specifications like "≥ 150AH"
    if (standard.includes('≥')) {
      const min = Number(standard.replace(/[^0-9.]/g, ''));
      const value = Number(measured.replace(/[^0-9.]/g, ''));
      return value >= min ? 'Pass' : 'Fail';
    }
    
    // Handle exact match
    return measured === standard ? 'Pass' : 'Fail';
  };

  const handleMeasuredValueChange = (value: string) => {
    const result = checkResult(value, formData.standardValue);
    setFormData(prev => ({
      ...prev,
      measuredValue: value,
      result,
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <ClipboardCheck className="size-5" />
            New QC Check
          </DialogTitle>
          <DialogDescription>
            Record quality control check results. Checkpoint ID will be auto-generated.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* QC Type Selection */}
          <div className="space-y-3">
            <Label>QC Type</Label>
            <RadioGroup 
              value={formData.qcType} 
              onValueChange={(v) => handleInputChange('qcType', v as 'inprocess' | 'finished')}
              className="flex gap-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="inprocess" id="inprocess" />
                <Label htmlFor="inprocess" className="cursor-pointer">In-Process QC</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="finished" id="finished" />
                <Label htmlFor="finished" className="cursor-pointer">Finished Goods QC</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Batch Selection */}
          <div className="space-y-2">
            <Label htmlFor="batchNumber">
              Batch Number <span className="text-red-500">*</span>
            </Label>
            <Select 
              value={formData.batchNumber} 
              onValueChange={(v) => handleInputChange('batchNumber', v)}
            >
              <SelectTrigger className={errors.batchNumber ? 'border-red-500' : ''}>
                <SelectValue placeholder="Select batch" />
              </SelectTrigger>
              <SelectContent>
                {activeBatches.map((batch) => (
                  <SelectItem key={batch.number} value={batch.number}>
                    {batch.number} - {batch.product} ({batch.stage})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.batchNumber && <p className="text-xs text-red-500">{errors.batchNumber}</p>}
          </div>

          {/* In-Process QC Fields */}
          {formData.qcType === 'inprocess' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="stage">
                  Production Stage <span className="text-red-500">*</span>
                </Label>
                <Select 
                  value={formData.stage} 
                  onValueChange={handleStageSelect}
                >
                  <SelectTrigger className={errors.stage ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select stage" />
                  </SelectTrigger>
                  <SelectContent>
                    {inProcessStages.map((stage) => (
                      <SelectItem key={stage} value={stage}>{stage}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.stage && <p className="text-xs text-red-500">{errors.stage}</p>}
              </div>

              {formData.stage && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-blue-600">Specification</p>
                      <p className="text-sm font-medium text-blue-900">{formData.specification}</p>
                    </div>
                    <div>
                      <p className="text-xs text-blue-600">Standard Value</p>
                      <p className="text-sm font-medium text-blue-900">{formData.standardValue} {formData.unit}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Finished Goods QC Fields */}
          {formData.qcType === 'finished' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="testType">
                  Test Type <span className="text-red-500">*</span>
                </Label>
                <Select 
                  value={formData.testType} 
                  onValueChange={(v) => handleInputChange('testType', v)}
                >
                  <SelectTrigger className={errors.testType ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select test type" />
                  </SelectTrigger>
                  <SelectContent>
                    {finishedTestTypes.map((test) => (
                      <SelectItem key={test} value={test}>{test}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.testType && <p className="text-xs text-red-500">{errors.testType}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="complianceStandard">Compliance Standard</Label>
                <Select 
                  value={formData.complianceStandard} 
                  onValueChange={(v) => handleInputChange('complianceStandard', v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select standard" />
                  </SelectTrigger>
                  <SelectContent>
                    {complianceStandards.map((std) => (
                      <SelectItem key={std} value={std}>{std}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="specification">Specification</Label>
                  <Input
                    id="specification"
                    value={formData.specification}
                    onChange={(e) => handleInputChange('specification', e.target.value)}
                    placeholder="e.g., ≥ 150AH"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="standardValue">Standard Value</Label>
                  <Input
                    id="standardValue"
                    value={formData.standardValue}
                    onChange={(e) => handleInputChange('standardValue', e.target.value)}
                    placeholder="e.g., 150"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Measurement Section */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="measuredValue">
                  Measured Value <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="measuredValue"
                  value={formData.measuredValue}
                  onChange={(e) => handleMeasuredValueChange(e.target.value)}
                  placeholder="Enter measured value"
                  className={errors.measuredValue ? 'border-red-500' : ''}
                />
                {errors.measuredValue && <p className="text-xs text-red-500">{errors.measuredValue}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="unit">Unit</Label>
                <Select 
                  value={formData.unit} 
                  onValueChange={(v) => handleInputChange('unit', v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {units.map((unit) => (
                      <SelectItem key={unit} value={unit}>{unit || '(None)'}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Result Display */}
            {formData.measuredValue && (
              <div className={cn(
                "p-4 rounded-lg flex items-center gap-3",
                formData.result === 'Pass' ? 'bg-green-50' : 'bg-red-50'
              )}>
                {formData.result === 'Pass' ? (
                  <CheckCircle className="size-5 text-green-600" />
                ) : (
                  <XCircle className="size-5 text-red-600" />
                )}
                <div>
                  <p className={cn(
                    "font-medium",
                    formData.result === 'Pass' ? 'text-green-800' : 'text-red-800'
                  )}>
                    Result: {formData.result}
                  </p>
                  <p className="text-xs text-gray-600">
                    Standard: {formData.standardValue} {formData.unit} | Measured: {formData.measuredValue} {formData.unit}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Inspector & Remarks */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="checkedBy">
                Checked By <span className="text-red-500">*</span>
              </Label>
              <Select 
                value={formData.checkedBy} 
                onValueChange={(v) => handleInputChange('checkedBy', v)}
              >
                <SelectTrigger className={errors.checkedBy ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select inspector" />
                </SelectTrigger>
                <SelectContent>
                  {qcInspectors.map((inspector) => (
                    <SelectItem key={inspector} value={inspector}>{inspector}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.checkedBy && <p className="text-xs text-red-500">{errors.checkedBy}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="remarks">Remarks / Observations</Label>
              <Textarea
                id="remarks"
                value={formData.remarks}
                onChange={(e) => handleInputChange('remarks', e.target.value)}
                placeholder="Any observations or comments..."
                rows={3}
              />
            </div>
          </div>

          {/* Action for Failed QC */}
          {formData.result === 'Fail' && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="size-5 text-orange-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-orange-800">QC Check Failed</p>
                  <p className="text-xs text-orange-700 mt-1">
                    This will be recorded in the defect log. You can choose an action below.
                  </p>
                  <div className="mt-3">
                    <Select defaultValue="Rework">
                      <SelectTrigger className="w-40 bg-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Rework">Send for Rework</SelectItem>
                        <SelectItem value="Scrap">Mark as Scrap</SelectItem>
                        <SelectItem value="Hold">Put on Hold</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          )}

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
                  <span className="mr-2">Recording...</span>
                  <div className="size-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                </>
              ) : (
                <>
                  <ClipboardCheck className="size-4 mr-2" />
                  Record QC Check
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}