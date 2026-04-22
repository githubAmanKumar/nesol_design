// src/components/logistics/AddTransporterModal.tsx
import { useState } from 'react';
import { 
  Truck, User, Phone, Mail, MapPin, FileText, CheckCircle,
  Plus, X, Building2
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
import { Checkbox } from '../ui/checkbox';
import { Textarea } from '../ui/textarea';
import { cn } from '../ui/utils';

interface AddTransporterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

interface TransporterFormData {
  companyName: string;
  contactPerson: string;
  designation: string;
  phone: string;
  alternatePhone: string;
  email: string;
  gstin: string;
  pan: string;
  coverage: string;
  vehicleTypes: string[];
  serviceRegions: string[];
  address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
  bankDetails: {
    accountName: string;
    accountNumber: string;
    bankName: string;
    ifsc: string;
  };
  paymentTerms: string;
  contractStartDate: string;
  contractEndDate: string;
  insuranceValid: boolean;
  insuranceExpiry: string;
  notes: string;
}

const initialFormData: TransporterFormData = {
  companyName: '',
  contactPerson: '',
  designation: '',
  phone: '',
  alternatePhone: '',
  email: '',
  gstin: '',
  pan: '',
  coverage: 'Pan India',
  vehicleTypes: [],
  serviceRegions: [],
  address: {
    street: '',
    city: '',
    state: '',
    pincode: '',
  },
  bankDetails: {
    accountName: '',
    accountNumber: '',
    bankName: '',
    ifsc: '',
  },
  paymentTerms: '30 Days',
  contractStartDate: new Date().toISOString().split('T')[0],
  contractEndDate: '',
  insuranceValid: false,
  insuranceExpiry: '',
  notes: '',
};

const vehicleTypeOptions = ['Truck', 'Container', 'Trailer', 'LCV', 'Tempo', 'Pickup', 'Mini Truck', 'Heavy Truck'];
const serviceRegionOptions = ['North', 'South', 'East', 'West', 'Central', 'North-East'];
const coverageOptions = ['Pan India', 'Regional', 'Local'];
const states = [
  'Delhi', 'Maharashtra', 'Tamil Nadu', 'Karnataka', 'Gujarat',
  'West Bengal', 'Uttar Pradesh', 'Rajasthan', 'Madhya Pradesh', 'Haryana',
  'Punjab', 'Kerala', 'Andhra Pradesh', 'Telangana', 'Odisha', 'Uttarakhand',
];
const paymentTermsOptions = ['Advance', '15 Days', '30 Days', '45 Days', '60 Days'];
const banks = ['SBI', 'HDFC', 'ICICI', 'Axis', 'PNB', 'Bank of Baroda', 'Canara Bank', 'Union Bank'];

export function AddTransporterModal({ open, onOpenChange, onSuccess }: AddTransporterModalProps) {
  const [formData, setFormData] = useState<TransporterFormData>(initialFormData);
  const [activeTab, setActiveTab] = useState<'basic' | 'coverage' | 'bank'>('basic');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<string, string>> = {};

    if (!formData.companyName) newErrors.companyName = 'Company name is required';
    if (!formData.contactPerson) newErrors.contactPerson = 'Contact person is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.gstin) newErrors.gstin = 'GSTIN is required';
    if (formData.vehicleTypes.length === 0) newErrors.vehicleTypes = 'Select at least one vehicle type';
    if (formData.serviceRegions.length === 0) newErrors.serviceRegions = 'Select at least one service region';
    if (!formData.address.street) newErrors['address.street'] = 'Street is required';
    if (!formData.address.city) newErrors['address.city'] = 'City is required';
    if (!formData.address.state) newErrors['address.state'] = 'State is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    const transporterData = {
      ...formData,
      id: `TRANS/${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
      status: 'Active',
      rating: 0,
      transporterSince: new Date().toISOString(),
    };
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Transporter Added:', transporterData);
    setIsSubmitting(false);
    onOpenChange(false);
    onSuccess?.();
    resetForm();
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setErrors({});
    setActiveTab('basic');
  };

  const handleInputChange = (field: string, value: string | boolean | string[]) => {
    if (field.includes('.')) {
      const parts = field.split('.');
      if (parts.length === 2) {
        const [parent, child] = parts;
        setFormData(prev => ({
          ...prev,
          [parent]: {
            ...(prev[parent as keyof TransporterFormData] as object),
            [child]: value,
          },
        }));
      }
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const toggleVehicleType = (type: string) => {
    const current = formData.vehicleTypes;
    if (current.includes(type)) {
      handleInputChange('vehicleTypes', current.filter(t => t !== type));
    } else {
      handleInputChange('vehicleTypes', [...current, type]);
    }
  };

  const toggleServiceRegion = (region: string) => {
    const current = formData.serviceRegions;
    if (current.includes(region)) {
      handleInputChange('serviceRegions', current.filter(r => r !== region));
    } else {
      handleInputChange('serviceRegions', [...current, region]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <Truck className="size-5" />
            Add New Transporter
          </DialogTitle>
          <DialogDescription>
            Register a new logistics partner. Transporter ID will be auto-generated.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Basic Information</TabsTrigger>
              <TabsTrigger value="coverage">Coverage & Vehicles</TabsTrigger>
              <TabsTrigger value="bank">Bank & Contract</TabsTrigger>
            </TabsList>

            {/* Basic Information Tab */}
            <TabsContent value="basic" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">
                  Company Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                  placeholder="e.g., VRL Logistics"
                  className={errors.companyName ? 'border-red-500' : ''}
                />
                {errors.companyName && <p className="text-xs text-red-500">{errors.companyName}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="gstin">
                    GSTIN <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="gstin"
                    value={formData.gstin}
                    onChange={(e) => handleInputChange('gstin', e.target.value.toUpperCase())}
                    placeholder="e.g., 07DDDEE4567L5M9"
                    className={cn("font-mono", errors.gstin ? 'border-red-500' : '')}
                    maxLength={15}
                  />
                  {errors.gstin && <p className="text-xs text-red-500">{errors.gstin}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pan">PAN</Label>
                  <Input
                    id="pan"
                    value={formData.pan}
                    onChange={(e) => handleInputChange('pan', e.target.value.toUpperCase())}
                    placeholder="e.g., DDDEE4567L"
                    className="font-mono"
                    maxLength={10}
                  />
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                  <User className="size-4 inline mr-2" />
                  Contact Person
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contactPerson">
                      Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="contactPerson"
                      value={formData.contactPerson}
                      onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                      placeholder="Full name"
                      className={errors.contactPerson ? 'border-red-500' : ''}
                    />
                    {errors.contactPerson && <p className="text-xs text-red-500">{errors.contactPerson}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="designation">Designation</Label>
                    <Input
                      id="designation"
                      value={formData.designation}
                      onChange={(e) => handleInputChange('designation', e.target.value)}
                      placeholder="e.g., Operations Manager"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      Phone Number <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="e.g., 98999 88877"
                      className={errors.phone ? 'border-red-500' : ''}
                    />
                    {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="alternatePhone">Alternate Phone</Label>
                    <Input
                      id="alternatePhone"
                      value={formData.alternatePhone}
                      onChange={(e) => handleInputChange('alternatePhone', e.target.value)}
                      placeholder="Optional"
                    />
                  </div>

                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="email">
                      Email Address <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="e.g., contact@transporter.com"
                      className={errors.email ? 'border-red-500' : ''}
                    />
                    {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                  <MapPin className="size-4 inline mr-2" />
                  Address
                </h3>
                
                <div className="space-y-2">
                  <Label htmlFor="address.street">
                    Street <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="address.street"
                    value={formData.address.street}
                    onChange={(e) => handleInputChange('address.street', e.target.value)}
                    placeholder="Street address"
                    className={errors['address.street'] ? 'border-red-500' : ''}
                  />
                  {errors['address.street'] && <p className="text-xs text-red-500">{errors['address.street']}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4 mt-3">
                  <div className="space-y-2">
                    <Label htmlFor="address.city">
                      City <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="address.city"
                      value={formData.address.city}
                      onChange={(e) => handleInputChange('address.city', e.target.value)}
                      placeholder="City"
                      className={errors['address.city'] ? 'border-red-500' : ''}
                    />
                    {errors['address.city'] && <p className="text-xs text-red-500">{errors['address.city']}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address.state">
                      State <span className="text-red-500">*</span>
                    </Label>
                    <Select 
                      value={formData.address.state} 
                      onValueChange={(v) => handleInputChange('address.state', v)}
                    >
                      <SelectTrigger className={errors['address.state'] ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        {states.map((state) => (
                          <SelectItem key={state} value={state}>{state}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors['address.state'] && <p className="text-xs text-red-500">{errors['address.state']}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address.pincode">PIN Code</Label>
                    <Input
                      id="address.pincode"
                      value={formData.address.pincode}
                      onChange={(e) => handleInputChange('address.pincode', e.target.value)}
                      placeholder="6-digit PIN"
                      maxLength={6}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Coverage & Vehicles Tab */}
            <TabsContent value="coverage" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="coverage">Coverage Type</Label>
                <Select 
                  value={formData.coverage} 
                  onValueChange={(v) => handleInputChange('coverage', v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select coverage" />
                  </SelectTrigger>
                  <SelectContent>
                    {coverageOptions.map((opt) => (
                      <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>
                  Vehicle Types Available <span className="text-red-500">*</span>
                </Label>
                <div className="grid grid-cols-2 gap-2 p-3 bg-gray-50 rounded-lg">
                  {vehicleTypeOptions.map((type) => (
                    <label key={type} className="flex items-center gap-2">
                      <Checkbox
                        checked={formData.vehicleTypes.includes(type)}
                        onCheckedChange={() => toggleVehicleType(type)}
                      />
                      <span className="text-sm text-gray-700">{type}</span>
                    </label>
                  ))}
                </div>
                {errors.vehicleTypes && <p className="text-xs text-red-500">{errors.vehicleTypes}</p>}
              </div>

              <div className="space-y-2">
                <Label>
                  Service Regions <span className="text-red-500">*</span>
                </Label>
                <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-lg">
                  {serviceRegionOptions.map((region) => (
                    <button
                      key={region}
                      type="button"
                      onClick={() => toggleServiceRegion(region)}
                      className={cn(
                        "px-3 py-1.5 rounded-lg text-sm transition-colors",
                        formData.serviceRegions.includes(region)
                          ? "bg-blue-600 text-white"
                          : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                      )}
                    >
                      {region}
                    </button>
                  ))}
                </div>
                {errors.serviceRegions && <p className="text-xs text-red-500">{errors.serviceRegions}</p>}
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-blue-800 mb-2">Coverage Summary</h4>
                <div className="space-y-1 text-sm">
                  <p><span className="text-blue-700">Coverage:</span> {formData.coverage}</p>
                  <p><span className="text-blue-700">Vehicle Types:</span> {formData.vehicleTypes.join(', ') || 'None selected'}</p>
                  <p><span className="text-blue-700">Service Regions:</span> {formData.serviceRegions.join(', ') || 'None selected'}</p>
                </div>
              </div>
            </TabsContent>

            {/* Bank & Contract Tab */}
            <TabsContent value="bank" className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-900">
                <Building2 className="size-4 inline mr-2" />
                Bank Details
              </h3>
              
              <div className="space-y-2">
                <Label htmlFor="bankDetails.accountName">Account Name</Label>
                <Input
                  id="bankDetails.accountName"
                  value={formData.bankDetails.accountName}
                  onChange={(e) => handleInputChange('bankDetails.accountName', e.target.value)}
                  placeholder="Name as per bank account"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bankDetails.accountNumber">Account Number</Label>
                <Input
                  id="bankDetails.accountNumber"
                  value={formData.bankDetails.accountNumber}
                  onChange={(e) => handleInputChange('bankDetails.accountNumber', e.target.value)}
                  placeholder="Bank account number"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bankDetails.bankName">Bank Name</Label>
                  <Select 
                    value={formData.bankDetails.bankName} 
                    onValueChange={(v) => handleInputChange('bankDetails.bankName', v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select bank" />
                    </SelectTrigger>
                    <SelectContent>
                      {banks.map((bank) => (
                        <SelectItem key={bank} value={bank}>{bank}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bankDetails.ifsc">IFSC Code</Label>
                  <Input
                    id="bankDetails.ifsc"
                    value={formData.bankDetails.ifsc}
                    onChange={(e) => handleInputChange('bankDetails.ifsc', e.target.value.toUpperCase())}
                    placeholder="e.g., SBIN0001234"
                    className="font-mono"
                  />
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                  <FileText className="size-4 inline mr-2" />
                  Contract & Insurance
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="paymentTerms">Payment Terms</Label>
                    <Select 
                      value={formData.paymentTerms} 
                      onValueChange={(v) => handleInputChange('paymentTerms', v)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select terms" />
                      </SelectTrigger>
                      <SelectContent>
                        {paymentTermsOptions.map((term) => (
                          <SelectItem key={term} value={term}>{term}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-3">
                  <div className="space-y-2">
                    <Label htmlFor="contractStartDate">Contract Start Date</Label>
                    <Input
                      id="contractStartDate"
                      type="date"
                      value={formData.contractStartDate}
                      onChange={(e) => handleInputChange('contractStartDate', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contractEndDate">Contract End Date</Label>
                    <Input
                      id="contractEndDate"
                      type="date"
                      value={formData.contractEndDate}
                      onChange={(e) => handleInputChange('contractEndDate', e.target.value)}
                      min={formData.contractStartDate}
                    />
                  </div>
                </div>

                <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Insurance Valid</p>
                      <p className="text-xs text-gray-500">Transporter has valid insurance coverage</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={formData.insuranceValid}
                      onChange={(e) => handleInputChange('insuranceValid', e.target.checked)}
                      className="rounded"
                    />
                  </div>
                  
                  {formData.insuranceValid && (
                    <div className="mt-3">
                      <Label htmlFor="insuranceExpiry">Insurance Expiry Date</Label>
                      <Input
                        id="insuranceExpiry"
                        type="date"
                        value={formData.insuranceExpiry}
                        onChange={(e) => handleInputChange('insuranceExpiry', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  placeholder="Any additional information..."
                  rows={2}
                />
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter className="gap-2 mt-6">
            <div className="flex-1 flex gap-2">
              {activeTab !== 'basic' && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    if (activeTab === 'coverage') setActiveTab('basic');
                    if (activeTab === 'bank') setActiveTab('coverage');
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
            {activeTab !== 'bank' ? (
              <Button
                type="button"
                onClick={() => {
                  if (activeTab === 'basic') setActiveTab('coverage');
                  if (activeTab === 'coverage') setActiveTab('bank');
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
                    <Truck className="size-4 mr-2" />
                    Add Transporter
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