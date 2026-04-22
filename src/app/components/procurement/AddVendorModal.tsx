// src/components/procurement/AddVendorModal.tsx
import { useState } from 'react';
import { 
  Building2, Users, Phone, Mail, MapPin, CreditCard,
  FileText, DollarSign, Calendar, Truck, Package, Wrench
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
import { cn } from '../ui/utils';

interface AddVendorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

interface VendorFormData {
  companyName: string;
  contactPerson: string;
  designation: string;
  mobile: string;
  phone: string;
  email: string;
  gstin: string;
  pan: string;
  category: string;
  paymentTerms: string;
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
    branch: string;
  };
  notes: string;
}

const initialFormData: VendorFormData = {
  companyName: '',
  contactPerson: '',
  designation: '',
  mobile: '',
  phone: '',
  email: '',
  gstin: '',
  pan: '',
  category: '',
  paymentTerms: '30 Days',
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
    branch: '',
  },
  notes: '',
};

const vendorCategories = [
  'Raw Material Lead',
  'Acid',
  'PP Containers',
  'Spare Parts',
  'Logistics',
  'Packaging Materials',
  'Office Supplies',
  'IT Equipment',
];
const paymentTermsOptions = ['Advance', '15 Days', '30 Days', '45 Days', '60 Days'];
const states = [
  'Delhi', 'Maharashtra', 'Tamil Nadu', 'Karnataka', 'Gujarat',
  'West Bengal', 'Uttar Pradesh', 'Rajasthan', 'Madhya Pradesh', 'Haryana',
  'Punjab', 'Kerala', 'Andhra Pradesh', 'Telangana', 'Odisha', 'Uttarakhand',
];
const banks = ['SBI', 'HDFC', 'ICICI', 'Axis', 'PNB', 'Bank of Baroda', 'Canara Bank', 'Union Bank'];

export function AddVendorModal({ open, onOpenChange, onSuccess }: AddVendorModalProps) {
  const [formData, setFormData] = useState<VendorFormData>(initialFormData);
  const [activeTab, setActiveTab] = useState<'basic' | 'address' | 'bank'>('basic');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<string, string>> = {};

    if (!formData.companyName) newErrors.companyName = 'Company name is required';
    if (!formData.contactPerson) newErrors.contactPerson = 'Contact person is required';
    if (!formData.mobile && !formData.phone) {
      newErrors.mobile = 'At least one contact number is required';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.gstin) newErrors.gstin = 'GSTIN is required';
    else if (formData.gstin.length !== 15) newErrors.gstin = 'GSTIN must be 15 characters';
    if (!formData.pan) newErrors.pan = 'PAN is required';
    else if (formData.pan.length !== 10) newErrors.pan = 'PAN must be 10 characters';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.address.street) newErrors['address.street'] = 'Street is required';
    if (!formData.address.city) newErrors['address.city'] = 'City is required';
    if (!formData.address.state) newErrors['address.state'] = 'State is required';
    if (!formData.address.pincode) newErrors['address.pincode'] = 'PIN code is required';
    if (!formData.bankDetails.accountName) newErrors['bankDetails.accountName'] = 'Account name is required';
    if (!formData.bankDetails.accountNumber) newErrors['bankDetails.accountNumber'] = 'Account number is required';
    if (!formData.bankDetails.bankName) newErrors['bankDetails.bankName'] = 'Bank name is required';
    if (!formData.bankDetails.ifsc) newErrors['bankDetails.ifsc'] = 'IFSC code is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Vendor Created:', formData);
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

  const handleInputChange = (field: string, value: string) => {
    if (field.includes('.')) {
      const parts = field.split('.');
      if (parts.length === 2) {
        const [parent, child] = parts;
        setFormData(prev => ({
          ...prev,
          [parent]: {
            ...(prev[parent as keyof VendorFormData] as object),
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

  const getCategoryIcon = (category: string) => {
    if (category.includes('Logistics')) return Truck;
    if (category.includes('Spare Parts')) return Wrench;
    return Package;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <Building2 className="size-5" />
            Add New Vendor
          </DialogTitle>
          <DialogDescription>
            Register a new vendor. Vendor ID will be auto-generated.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Basic Information</TabsTrigger>
              <TabsTrigger value="address">Address</TabsTrigger>
              <TabsTrigger value="bank">Bank Details</TabsTrigger>
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
                  placeholder="e.g., Metal Suppliers Ltd"
                  className={errors.companyName ? 'border-red-500' : ''}
                />
                {errors.companyName && <p className="text-xs text-red-500">{errors.companyName}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">
                    Category <span className="text-red-500">*</span>
                  </Label>
                  <Select 
                    value={formData.category} 
                    onValueChange={(v) => handleInputChange('category', v)}
                  >
                    <SelectTrigger className={errors.category ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {vendorCategories.map((cat) => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.category && <p className="text-xs text-red-500">{errors.category}</p>}
                </div>

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

              <div className="border-t pt-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                  <Users className="size-4 inline mr-2" />
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
                      placeholder="e.g., Sales Manager"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mobile">
                      Mobile Number <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="mobile"
                      value={formData.mobile}
                      onChange={(e) => handleInputChange('mobile', e.target.value)}
                      placeholder="e.g., 98765 43210"
                      className={errors.mobile ? 'border-red-500' : ''}
                    />
                    {errors.mobile && <p className="text-xs text-red-500">{errors.mobile}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Landline (Optional)</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="e.g., 01332 234567"
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
                      placeholder="e.g., contact@vendor.com"
                      className={errors.email ? 'border-red-500' : ''}
                    />
                    {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                  <FileText className="size-4 inline mr-2" />
                  Tax Information
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="gstin">
                      GSTIN <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="gstin"
                      value={formData.gstin}
                      onChange={(e) => handleInputChange('gstin', e.target.value.toUpperCase())}
                      placeholder="e.g., 05AABCM1234E1Z5"
                      className={cn("font-mono", errors.gstin ? 'border-red-500' : '')}
                      maxLength={15}
                    />
                    {errors.gstin && <p className="text-xs text-red-500">{errors.gstin}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pan">
                      PAN <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="pan"
                      value={formData.pan}
                      onChange={(e) => handleInputChange('pan', e.target.value.toUpperCase())}
                      placeholder="e.g., AABCM1234E"
                      className={cn("font-mono", errors.pan ? 'border-red-500' : '')}
                      maxLength={10}
                    />
                    {errors.pan && <p className="text-xs text-red-500">{errors.pan}</p>}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Address Tab */}
            <TabsContent value="address" className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-900">
                <MapPin className="size-4 inline mr-2" />
                Business Address
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

              <div className="grid grid-cols-2 gap-4">
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
                  <Label htmlFor="address.pincode">
                    PIN Code <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="address.pincode"
                    value={formData.address.pincode}
                    onChange={(e) => handleInputChange('address.pincode', e.target.value)}
                    placeholder="6-digit PIN"
                    maxLength={6}
                    className={errors['address.pincode'] ? 'border-red-500' : ''}
                  />
                  {errors['address.pincode'] && <p className="text-xs text-red-500">{errors['address.pincode']}</p>}
                </div>
              </div>
            </TabsContent>

            {/* Bank Details Tab */}
            <TabsContent value="bank" className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-900">
                <CreditCard className="size-4 inline mr-2" />
                Bank Account Details
              </h3>
              
              <div className="space-y-2">
                <Label htmlFor="bankDetails.accountName">
                  Account Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="bankDetails.accountName"
                  value={formData.bankDetails.accountName}
                  onChange={(e) => handleInputChange('bankDetails.accountName', e.target.value)}
                  placeholder="Name as per bank account"
                  className={errors['bankDetails.accountName'] ? 'border-red-500' : ''}
                />
                {errors['bankDetails.accountName'] && <p className="text-xs text-red-500">{errors['bankDetails.accountName']}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="bankDetails.accountNumber">
                  Account Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="bankDetails.accountNumber"
                  value={formData.bankDetails.accountNumber}
                  onChange={(e) => handleInputChange('bankDetails.accountNumber', e.target.value)}
                  placeholder="Bank account number"
                  className={errors['bankDetails.accountNumber'] ? 'border-red-500' : ''}
                />
                {errors['bankDetails.accountNumber'] && <p className="text-xs text-red-500">{errors['bankDetails.accountNumber']}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bankDetails.bankName">
                    Bank Name <span className="text-red-500">*</span>
                  </Label>
                  <Select 
                    value={formData.bankDetails.bankName} 
                    onValueChange={(v) => handleInputChange('bankDetails.bankName', v)}
                  >
                    <SelectTrigger className={errors['bankDetails.bankName'] ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select bank" />
                    </SelectTrigger>
                    <SelectContent>
                      {banks.map((bank) => (
                        <SelectItem key={bank} value={bank}>{bank}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors['bankDetails.bankName'] && <p className="text-xs text-red-500">{errors['bankDetails.bankName']}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bankDetails.branch">Branch</Label>
                  <Input
                    id="bankDetails.branch"
                    value={formData.bankDetails.branch}
                    onChange={(e) => handleInputChange('bankDetails.branch', e.target.value)}
                    placeholder="Branch name/location"
                  />
                </div>

                <div className="space-y-2 col-span-2">
                  <Label htmlFor="bankDetails.ifsc">
                    IFSC Code <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="bankDetails.ifsc"
                    value={formData.bankDetails.ifsc}
                    onChange={(e) => handleInputChange('bankDetails.ifsc', e.target.value.toUpperCase())}
                    placeholder="e.g., SBIN0001234"
                    className={cn("font-mono", errors['bankDetails.ifsc'] ? 'border-red-500' : '')}
                    maxLength={11}
                  />
                  {errors['bankDetails.ifsc'] && <p className="text-xs text-red-500">{errors['bankDetails.ifsc']}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes (Optional)</Label>
                <textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  placeholder="Any additional information about the vendor..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
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
                    if (activeTab === 'address') setActiveTab('basic');
                    if (activeTab === 'bank') setActiveTab('address');
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
                  if (activeTab === 'basic') setActiveTab('address');
                  if (activeTab === 'address') setActiveTab('bank');
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
                    Add Vendor
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