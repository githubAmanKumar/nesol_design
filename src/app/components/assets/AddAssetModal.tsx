// src/components/assets/AddAssetModal.tsx
import { useState } from 'react';
import { 
  Building2, Laptop, Truck, Wrench, Monitor, Package,
  Calendar, DollarSign, User, MapPin, QrCode, Barcode,
  Calculator, FileText
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
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Switch } from '../ui/switch';
import { cn } from '../ui/utils';

interface AddAssetModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

interface AssetFormData {
  assetName: string;
  assetCategory: string;
  make: string;
  model: string;
  serialNo: string;
  purchaseDate: string;
  purchaseValue: number;
  vendor: string;
  supplierInvoice: string;
  location: string;
  assignedToType: string;
  assignedTo: string;
  depreciationMethod: string;
  depreciationRate: number;
  generateQR: boolean;
  generateBarcode: boolean;
  hasAMC: boolean;
  amcVendor: string;
  amcStartDate: string;
  amcEndDate: string;
  notes: string;
}

const initialFormData: AssetFormData = {
  assetName: '',
  assetCategory: '',
  make: '',
  model: '',
  serialNo: '',
  purchaseDate: '',
  purchaseValue: 0,
  vendor: '',
  supplierInvoice: '',
  location: '',
  assignedToType: 'Department',
  assignedTo: '',
  depreciationMethod: 'WDV',
  depreciationRate: 15,
  generateQR: true,
  generateBarcode: true,
  hasAMC: false,
  amcVendor: '',
  amcStartDate: '',
  amcEndDate: '',
  notes: '',
};

const assetCategories = [
  'Plant & Machinery',
  'Vehicle',
  'Computer & IT',
  'Furniture & Fixture',
  'Electrical Equipment',
  'Office Equipment',
];

const locations = [
  'Production Floor',
  'Formation Area',
  'QC Lab',
  'R&D Lab',
  'Sales Office',
  'HR Department',
  'Finance Department',
  'IT Department',
  'Logistics',
  'Warehouse A',
  'Plant Store',
  'Maintenance Bay',
];

const vendors = [
  'Elecon',
  'MixTech',
  'Statcon',
  'Dell',
  'HP',
  'Tata Motors',
  'Precision Tools',
  'Other',
];

const employees = [
  'Amit Singh',
  'Rajesh Kumar',
  'Priya Sharma',
  'Vikram Singh',
  'Sunita Devi',
  'Ramesh Chandra',
];

const departments = [
  'Production Department',
  'Quality Department',
  'R&D Department',
  'Sales Department',
  'HR Department',
  'Finance Department',
  'IT Department',
  'Logistics Department',
];

const depreciationMethods = [
  { value: 'SLM', label: 'Straight Line Method (SLM)' },
  { value: 'WDV', label: 'Written Down Value (WDV)' },
];

const depreciationRates: Record<string, number[]> = {
  'Plant & Machinery': [15, 10, 20],
  'Vehicle': [30, 20, 15],
  'Computer & IT': [40, 60],
  'Furniture & Fixture': [10, 15],
  'Electrical Equipment': [15, 10],
  'Office Equipment': [15, 10],
};

export function AddAssetModal({ open, onOpenChange, onSuccess }: AddAssetModalProps) {
  const [formData, setFormData] = useState<AssetFormData>(initialFormData);
  const [activeTab, setActiveTab] = useState<'basic' | 'assignment' | 'depreciation' | 'amc'>('basic');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof AssetFormData, string>>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof AssetFormData, string>> = {};

    if (!formData.assetName) newErrors.assetName = 'Asset name is required';
    if (!formData.assetCategory) newErrors.assetCategory = 'Category is required';
    if (!formData.serialNo) newErrors.serialNo = 'Serial number is required';
    if (!formData.purchaseDate) newErrors.purchaseDate = 'Purchase date is required';
    if (!formData.purchaseValue || formData.purchaseValue <= 0) newErrors.purchaseValue = 'Valid purchase value is required';
    if (!formData.location) newErrors.location = 'Location is required';
    if (!formData.assignedTo) newErrors.assignedTo = 'Assignment is required';
    if (formData.hasAMC) {
      if (!formData.amcVendor) newErrors.amcVendor = 'AMC vendor is required';
      if (!formData.amcStartDate) newErrors.amcStartDate = 'AMC start date is required';
      if (!formData.amcEndDate) newErrors.amcEndDate = 'AMC end date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    const assetData = {
      ...formData,
      id: `AST/${new Date().getFullYear()}/${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
      assetTag: generateAssetTag(formData.assetCategory),
      qrCode: formData.generateQR ? generateQRCode() : null,
      barcode: formData.generateBarcode ? generateBarcode() : null,
      status: 'Operational',
      createdAt: new Date().toISOString(),
    };
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Asset Created:', assetData);
    setIsSubmitting(false);
    onOpenChange(false);
    onSuccess?.();
    resetForm();
  };

  const generateAssetTag = (category: string): string => {
    const prefix = category.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 4);
    const number = String(Math.floor(Math.random() * 1000)).padStart(3, '0');
    return `${prefix}-${number}`;
  };

  const generateQRCode = (): string => {
    return `QR${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
  };

  const generateBarcode = (): string => {
    return `${Math.floor(Math.random() * 1000000000).toString().padStart(12, '0')}`;
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setErrors({});
    setActiveTab('basic');
  };

  const handleInputChange = (field: keyof AssetFormData, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleCategoryChange = (category: string) => {
    const defaultRate = depreciationRates[category]?.[0] || 15;
    setFormData(prev => ({
      ...prev,
      assetCategory: category,
      depreciationRate: defaultRate,
    }));
  };

  const calculateDepreciation = (): { openingWdv: number; depreciation: number; closingWdv: number } => {
    const purchaseValue = formData.purchaseValue;
    const rate = formData.depreciationRate / 100;
    const purchaseDate = new Date(formData.purchaseDate);
    const today = new Date();
    const yearsOwned = (today.getTime() - purchaseDate.getTime()) / (1000 * 60 * 60 * 24 * 365);
    
    let currentWdv = purchaseValue;
    let accumulatedDepreciation = 0;
    
    if (formData.depreciationMethod === 'SLM') {
      const annualDepreciation = purchaseValue * rate;
      accumulatedDepreciation = annualDepreciation * Math.min(yearsOwned, 1);
      currentWdv = purchaseValue - accumulatedDepreciation;
    } else {
      for (let i = 0; i < Math.min(yearsOwned, 1); i++) {
        const yearlyDepreciation = currentWdv * rate;
        accumulatedDepreciation += yearlyDepreciation;
        currentWdv -= yearlyDepreciation;
      }
    }
    
    return {
      openingWdv: purchaseValue,
      depreciation: accumulatedDepreciation,
      closingWdv: currentWdv,
    };
  };

  const depreciationPreview = formData.purchaseValue > 0 ? calculateDepreciation() : null;

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Plant & Machinery': return Wrench;
      case 'Vehicle': return Truck;
      case 'Computer & IT': return Monitor;
      case 'Furniture & Fixture': return Building2;
      case 'Electrical Equipment': return Laptop;
      default: return Package;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <Building2 className="size-5" />
            Add New Asset
          </DialogTitle>
          <DialogDescription>
            Register a new company asset. Asset ID and Tag will be auto-generated.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="assignment">Assignment</TabsTrigger>
              <TabsTrigger value="depreciation">Depreciation</TabsTrigger>
              <TabsTrigger value="amc">AMC (Optional)</TabsTrigger>
            </TabsList>

            {/* Basic Information Tab */}
            <TabsContent value="basic" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="assetName">
                  Asset Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="assetName"
                  value={formData.assetName}
                  onChange={(e) => handleInputChange('assetName', e.target.value)}
                  placeholder="e.g., Ball Mill Machine"
                  className={errors.assetName ? 'border-red-500' : ''}
                />
                {errors.assetName && <p className="text-xs text-red-500">{errors.assetName}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="assetCategory">
                    Category <span className="text-red-500">*</span>
                  </Label>
                  <Select 
                    value={formData.assetCategory} 
                    onValueChange={handleCategoryChange}
                  >
                    <SelectTrigger className={errors.assetCategory ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {assetCategories.map((cat) => {
                        const Icon = getCategoryIcon(cat);
                        return (
                          <SelectItem key={cat} value={cat}>
                            <div className="flex items-center gap-2">
                              <Icon className="size-4" />
                              {cat}
                            </div>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  {errors.assetCategory && <p className="text-xs text-red-500">{errors.assetCategory}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="serialNo">
                    Serial Number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="serialNo"
                    value={formData.serialNo}
                    onChange={(e) => handleInputChange('serialNo', e.target.value)}
                    placeholder="e.g., EL-BM-2022-045"
                    className={cn("font-mono", errors.serialNo ? 'border-red-500' : '')}
                  />
                  {errors.serialNo && <p className="text-xs text-red-500">{errors.serialNo}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="make">Make</Label>
                  <Input
                    id="make"
                    value={formData.make}
                    onChange={(e) => handleInputChange('make', e.target.value)}
                    placeholder="e.g., Elecon"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="model">Model</Label>
                  <Input
                    id="model"
                    value={formData.model}
                    onChange={(e) => handleInputChange('model', e.target.value)}
                    placeholder="e.g., BM-2000"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="purchaseDate">
                    Purchase Date <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="purchaseDate"
                    type="date"
                    value={formData.purchaseDate}
                    onChange={(e) => handleInputChange('purchaseDate', e.target.value)}
                    max={new Date().toISOString().split('T')[0]}
                    className={errors.purchaseDate ? 'border-red-500' : ''}
                  />
                  {errors.purchaseDate && <p className="text-xs text-red-500">{errors.purchaseDate}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="purchaseValue">
                    Purchase Value (₹) <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="purchaseValue"
                    type="number"
                    min="0"
                    step="1000"
                    value={formData.purchaseValue}
                    onChange={(e) => handleInputChange('purchaseValue', Number(e.target.value))}
                    className={errors.purchaseValue ? 'border-red-500' : ''}
                  />
                  {formData.purchaseValue > 0 && (
                    <p className="text-xs text-gray-500">{formatCurrency(formData.purchaseValue)}</p>
                  )}
                  {errors.purchaseValue && <p className="text-xs text-red-500">{errors.purchaseValue}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="vendor">Vendor / Supplier</Label>
                  <Select 
                    value={formData.vendor} 
                    onValueChange={(v) => handleInputChange('vendor', v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select vendor" />
                    </SelectTrigger>
                    <SelectContent>
                      {vendors.map((v) => (
                        <SelectItem key={v} value={v}>{v}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="supplierInvoice">Supplier Invoice No.</Label>
                  <Input
                    id="supplierInvoice"
                    value={formData.supplierInvoice}
                    onChange={(e) => handleInputChange('supplierInvoice', e.target.value)}
                    placeholder="e.g., INV-2024-001"
                  />
                </div>
              </div>

              {/* Tagging Options */}
              <div className="border-t pt-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                  <QrCode className="size-4 inline mr-2" />
                  Tagging Options
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Generate QR Code</p>
                      <p className="text-xs text-gray-500">Create QR code for quick scanning</p>
                    </div>
                    <Switch
                      checked={formData.generateQR}
                      onCheckedChange={(v) => handleInputChange('generateQR', v)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Generate Barcode</p>
                      <p className="text-xs text-gray-500">Create barcode for inventory tracking</p>
                    </div>
                    <Switch
                      checked={formData.generateBarcode}
                      onCheckedChange={(v) => handleInputChange('generateBarcode', v)}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Assignment Tab */}
            <TabsContent value="assignment" className="space-y-4">
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
                <Label>Assign To</Label>
                <RadioGroup 
                  value={formData.assignedToType} 
                  onValueChange={(v) => {
                    handleInputChange('assignedToType', v);
                    handleInputChange('assignedTo', '');
                  }}
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Employee" id="employee" />
                    <Label htmlFor="employee" className="cursor-pointer">Employee</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Department" id="department" />
                    <Label htmlFor="department" className="cursor-pointer">Department</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="assignedTo">
                  {formData.assignedToType} <span className="text-red-500">*</span>
                </Label>
                <Select 
                  value={formData.assignedTo} 
                  onValueChange={(v) => handleInputChange('assignedTo', v)}
                >
                  <SelectTrigger className={errors.assignedTo ? 'border-red-500' : ''}>
                    <SelectValue placeholder={`Select ${formData.assignedToType.toLowerCase()}`} />
                  </SelectTrigger>
                  <SelectContent>
                    {formData.assignedToType === 'Employee' ? (
                      employees.map((emp) => (
                        <SelectItem key={emp} value={emp}>{emp}</SelectItem>
                      ))
                    ) : (
                      departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
                {errors.assignedTo && <p className="text-xs text-red-500">{errors.assignedTo}</p>}
              </div>

              {/* Assignment Preview */}
              {formData.location && formData.assignedTo && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-blue-800 mb-2">Assignment Summary</h4>
                  <div className="space-y-1 text-sm">
                    <p><span className="text-blue-600">Location:</span> {formData.location}</p>
                    <p><span className="text-blue-600">Assigned To:</span> {formData.assignedTo} ({formData.assignedToType})</p>
                  </div>
                </div>
              )}
            </TabsContent>

            {/* Depreciation Tab */}
            <TabsContent value="depreciation" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="depreciationMethod">Depreciation Method</Label>
                <RadioGroup 
                  value={formData.depreciationMethod} 
                  onValueChange={(v) => handleInputChange('depreciationMethod', v)}
                  className="space-y-2"
                >
                  {depreciationMethods.map((method) => (
                    <div key={method.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={method.value} id={method.value} />
                      <Label htmlFor={method.value} className="cursor-pointer">{method.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="depreciationRate">
                  Rate of Depreciation (%)
                </Label>
                <Select 
                  value={String(formData.depreciationRate)} 
                  onValueChange={(v) => handleInputChange('depreciationRate', Number(v))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select rate" />
                  </SelectTrigger>
                  <SelectContent>
                    {(depreciationRates[formData.assetCategory] || [15, 10, 20]).map((rate) => (
                      <SelectItem key={rate} value={String(rate)}>{rate}%</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Depreciation Preview */}
              {depreciationPreview && (
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-purple-800 mb-2 flex items-center gap-2">
                    <Calculator className="size-4" />
                    Depreciation Preview (First Year)
                  </h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-purple-600">Opening WDV</p>
                      <p className="font-medium">{formatCurrency(depreciationPreview.openingWdv)}</p>
                    </div>
                    <div>
                      <p className="text-purple-600">Depreciation</p>
                      <p className="font-medium text-orange-600">- {formatCurrency(depreciationPreview.depreciation)}</p>
                    </div>
                    <div className="col-span-2 pt-2 border-t border-purple-200">
                      <p className="text-purple-600">Closing WDV</p>
                      <p className="text-lg font-bold text-purple-900">{formatCurrency(depreciationPreview.closingWdv)}</p>
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>

            {/* AMC Tab */}
            <TabsContent value="amc" className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">Has AMC Contract</p>
                  <p className="text-xs text-gray-500">Annual Maintenance Contract coverage</p>
                </div>
                <Switch
                  checked={formData.hasAMC}
                  onCheckedChange={(v) => handleInputChange('hasAMC', v)}
                />
              </div>

              {formData.hasAMC && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="amcVendor">
                      AMC Vendor <span className="text-red-500">*</span>
                    </Label>
                    <Select 
                      value={formData.amcVendor} 
                      onValueChange={(v) => handleInputChange('amcVendor', v)}
                    >
                      <SelectTrigger className={errors.amcVendor ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Select vendor" />
                      </SelectTrigger>
                      <SelectContent>
                        {vendors.map((v) => (
                          <SelectItem key={v} value={v}>{v}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.amcVendor && <p className="text-xs text-red-500">{errors.amcVendor}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="amcStartDate">
                        Start Date <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="amcStartDate"
                        type="date"
                        value={formData.amcStartDate}
                        onChange={(e) => handleInputChange('amcStartDate', e.target.value)}
                        className={errors.amcStartDate ? 'border-red-500' : ''}
                      />
                      {errors.amcStartDate && <p className="text-xs text-red-500">{errors.amcStartDate}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="amcEndDate">
                        End Date <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="amcEndDate"
                        type="date"
                        value={formData.amcEndDate}
                        onChange={(e) => handleInputChange('amcEndDate', e.target.value)}
                        min={formData.amcStartDate}
                        className={errors.amcEndDate ? 'border-red-500' : ''}
                      />
                      {errors.amcEndDate && <p className="text-xs text-red-500">{errors.amcEndDate}</p>}
                    </div>
                  </div>

                  {formData.amcStartDate && formData.amcEndDate && (
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="text-sm text-green-800">
                        <span className="font-medium">Contract Duration:</span>{' '}
                        {Math.ceil((new Date(formData.amcEndDate).getTime() - new Date(formData.amcStartDate).getTime()) / (1000 * 60 * 60 * 24 * 30))} months
                      </p>
                    </div>
                  )}
                </div>
              )}
            </TabsContent>
          </Tabs>

          <DialogFooter className="gap-2 mt-6">
            <div className="flex-1 flex gap-2">
              {activeTab !== 'basic' && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    if (activeTab === 'assignment') setActiveTab('basic');
                    if (activeTab === 'depreciation') setActiveTab('assignment');
                    if (activeTab === 'amc') setActiveTab('depreciation');
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
            {activeTab !== 'amc' ? (
              <Button
                type="button"
                onClick={() => {
                  if (activeTab === 'basic') setActiveTab('assignment');
                  if (activeTab === 'assignment') setActiveTab('depreciation');
                  if (activeTab === 'depreciation') setActiveTab('amc');
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
                    <Building2 className="size-4 mr-2" />
                    Add Asset
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