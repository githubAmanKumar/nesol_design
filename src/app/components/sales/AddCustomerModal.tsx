// src/components/sales/AddCustomerModal.tsx
import { useState } from 'react';
import { 
  Building2, Users, Phone, Mail, MapPin, CreditCard,
  Plus, Trash2, DollarSign, Calendar, FileText,
  Truck,
  Bell
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
import { Switch } from '../ui/switch';
import { cn } from '../ui/utils';

interface AddCustomerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

interface ShippingAddress {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

interface CustomerFormData {
  customerType: string;
  companyName: string;
  individualName: string;
  gstin: string;
  pan: string;
  billingAddress: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
  shippingAddresses: ShippingAddress[];
  primaryContact: {
    name: string;
    designation: string;
    phone: string;
    alternatePhone: string;
    email: string;
  };
  creditLimit: number;
  paymentTerms: string;
  enableCreditAlert: boolean;
  creditAlertThreshold: number;
  enableOverdueAlert: boolean;
  notes: string;
}

const initialShippingAddress: ShippingAddress = {
  id: crypto.randomUUID(),
  name: '',
  street: '',
  city: '',
  state: '',
  pincode: '',
  isDefault: true,
};

const initialFormData: CustomerFormData = {
  customerType: '',
  companyName: '',
  individualName: '',
  gstin: '',
  pan: '',
  billingAddress: {
    street: '',
    city: '',
    state: '',
    pincode: '',
  },
  shippingAddresses: [{ ...initialShippingAddress, id: crypto.randomUUID() }],
  primaryContact: {
    name: '',
    designation: '',
    phone: '',
    alternatePhone: '',
    email: '',
  },
  creditLimit: 0,
  paymentTerms: '30 Days',
  enableCreditAlert: true,
  creditAlertThreshold: 80,
  enableOverdueAlert: true,
  notes: '',
};

const customerTypes = ['Distributor', 'Dealer', 'OEM', 'End User', 'Retail'];
const paymentTermsOptions = ['Advance', '15 Days', '30 Days', '45 Days', '60 Days'];
const states = [
  'Delhi', 'Maharashtra', 'Tamil Nadu', 'Karnataka', 'Gujarat',
  'West Bengal', 'Uttar Pradesh', 'Rajasthan', 'Madhya Pradesh', 'Haryana',
  'Punjab', 'Kerala', 'Andhra Pradesh', 'Telangana', 'Odisha', 'Uttarakhand',
];

export function AddCustomerModal({ open, onOpenChange, onSuccess }: AddCustomerModalProps) {
  const [formData, setFormData] = useState<CustomerFormData>(initialFormData);
  const [activeTab, setActiveTab] = useState<'basic' | 'address' | 'credit'>('basic');
  const [sameAsBilling, setSameAsBilling] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<string, string>> = {};

    if (!formData.customerType) newErrors.customerType = 'Customer type is required';
    if (!formData.companyName && !formData.individualName) {
      newErrors.companyName = 'Either company name or individual name is required';
    }
    if (!formData.gstin && formData.customerType !== 'Retail') {
      newErrors.gstin = 'GSTIN is required for business customers';
    }
    if (!formData.primaryContact.name) newErrors['primaryContact.name'] = 'Contact name is required';
    if (!formData.primaryContact.phone) newErrors['primaryContact.phone'] = 'Phone number is required';
    if (!formData.primaryContact.email) {
      newErrors['primaryContact.email'] = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.primaryContact.email)) {
      newErrors['primaryContact.email'] = 'Invalid email format';
    }
    if (!formData.billingAddress.street) newErrors['billingAddress.street'] = 'Street is required';
    if (!formData.billingAddress.city) newErrors['billingAddress.city'] = 'City is required';
    if (!formData.billingAddress.state) newErrors['billingAddress.state'] = 'State is required';
    if (!formData.billingAddress.pincode) newErrors['billingAddress.pincode'] = 'PIN code is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Customer Created:', formData);
    setIsSubmitting(false);
    onOpenChange(false);
    onSuccess?.();
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      ...initialFormData,
      shippingAddresses: [{ ...initialShippingAddress, id: crypto.randomUUID() }],
    });
    setErrors({});
    setActiveTab('basic');
    setSameAsBilling(false);
  };

  const handleInputChange = (field: string, value: string | number | boolean) => {
    if (field.includes('.')) {
      const parts = field.split('.');
      if (parts.length === 2) {
        const [parent, child] = parts;
        setFormData(prev => ({
          ...prev,
          [parent]: {
            ...(prev[parent as keyof CustomerFormData] as object),
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

  const addShippingAddress = () => {
    setFormData(prev => ({
      ...prev,
      shippingAddresses: [
        ...prev.shippingAddresses,
        { ...initialShippingAddress, id: crypto.randomUUID(), isDefault: false },
      ],
    }));
  };

  const removeShippingAddress = (id: string) => {
    if (formData.shippingAddresses.length === 1) return;
    setFormData(prev => ({
      ...prev,
      shippingAddresses: prev.shippingAddresses.filter(addr => addr.id !== id),
    }));
  };

  const updateShippingAddress = (id: string, field: keyof ShippingAddress, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      shippingAddresses: prev.shippingAddresses.map(addr => {
        if (addr.id !== id) return addr;
        if (field === 'isDefault' && value === true) {
          return { ...addr, isDefault: true };
        }
        return { ...addr, [field]: value };
      }).map(addr => {
        if (field === 'isDefault' && value === true && addr.id !== id) {
          return { ...addr, isDefault: false };
        }
        return addr;
      }),
    }));
  };

  const copyBillingToShipping = () => {
    if (sameAsBilling) {
      setFormData(prev => ({
        ...prev,
        shippingAddresses: [{
          ...initialShippingAddress,
          id: crypto.randomUUID(),
          name: 'Default Shipping',
          street: prev.billingAddress.street,
          city: prev.billingAddress.city,
          state: prev.billingAddress.state,
          pincode: prev.billingAddress.pincode,
          isDefault: true,
        }],
      }));
    }
    setSameAsBilling(!sameAsBilling);
  };

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <Building2 className="size-5" />
            Add New Customer
          </DialogTitle>
          <DialogDescription>
            Create a new customer record. Customer ID will be auto-generated.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Basic Information</TabsTrigger>
              <TabsTrigger value="address">Address Details</TabsTrigger>
              <TabsTrigger value="credit">Credit & Alerts</TabsTrigger>
            </TabsList>

            {/* Basic Information Tab */}
            <TabsContent value="basic" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="customerType">
                    Customer Type <span className="text-red-500">*</span>
                  </Label>
                  <Select 
                    value={formData.customerType} 
                    onValueChange={(v) => handleInputChange('customerType', v)}
                  >
                    <SelectTrigger className={errors.customerType ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {customerTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.customerType && <p className="text-xs text-red-500">{errors.customerType}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    placeholder="e.g., ABC Motors Pvt Ltd"
                    className={errors.companyName ? 'border-red-500' : ''}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="individualName">Individual/Proprietor Name</Label>
                  <Input
                    id="individualName"
                    value={formData.individualName}
                    onChange={(e) => handleInputChange('individualName', e.target.value)}
                    placeholder="e.g., Rajiv Mehta"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gstin">
                    GSTIN {formData.customerType !== 'Retail' && <span className="text-red-500">*</span>}
                  </Label>
                  <Input
                    id="gstin"
                    value={formData.gstin}
                    onChange={(e) => handleInputChange('gstin', e.target.value.toUpperCase())}
                    placeholder="e.g., 07AABCD1234E1Z5"
                    className={cn("font-mono", errors.gstin ? 'border-red-500' : '')}
                    maxLength={15}
                  />
                  {errors.gstin && <p className="text-xs text-red-500">{errors.gstin}</p>}
                </div>

                <div className="space-y-2 col-span-2">
                  <Label htmlFor="pan">PAN</Label>
                  <Input
                    id="pan"
                    value={formData.pan}
                    onChange={(e) => handleInputChange('pan', e.target.value.toUpperCase())}
                    placeholder="e.g., AABCD1234E"
                    className="font-mono"
                    maxLength={10}
                  />
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                  <Users className="size-4 inline mr-2" />
                  Primary Contact
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="primaryContact.name">
                      Contact Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="primaryContact.name"
                      value={formData.primaryContact.name}
                      onChange={(e) => handleInputChange('primaryContact.name', e.target.value)}
                      placeholder="Full name"
                      className={errors['primaryContact.name'] ? 'border-red-500' : ''}
                    />
                    {errors['primaryContact.name'] && <p className="text-xs text-red-500">{errors['primaryContact.name']}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="primaryContact.designation">Designation</Label>
                    <Input
                      id="primaryContact.designation"
                      value={formData.primaryContact.designation}
                      onChange={(e) => handleInputChange('primaryContact.designation', e.target.value)}
                      placeholder="e.g., Proprietor, Manager"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="primaryContact.phone">
                      Phone Number <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="primaryContact.phone"
                      value={formData.primaryContact.phone}
                      onChange={(e) => handleInputChange('primaryContact.phone', e.target.value)}
                      placeholder="e.g., 98765 43210"
                      className={errors['primaryContact.phone'] ? 'border-red-500' : ''}
                    />
                    {errors['primaryContact.phone'] && <p className="text-xs text-red-500">{errors['primaryContact.phone']}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="primaryContact.alternatePhone">Alternate Phone</Label>
                    <Input
                      id="primaryContact.alternatePhone"
                      value={formData.primaryContact.alternatePhone}
                      onChange={(e) => handleInputChange('primaryContact.alternatePhone', e.target.value)}
                      placeholder="Optional"
                    />
                  </div>

                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="primaryContact.email">
                      Email Address <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="primaryContact.email"
                      type="email"
                      value={formData.primaryContact.email}
                      onChange={(e) => handleInputChange('primaryContact.email', e.target.value)}
                      placeholder="e.g., contact@company.com"
                      className={errors['primaryContact.email'] ? 'border-red-500' : ''}
                    />
                    {errors['primaryContact.email'] && <p className="text-xs text-red-500">{errors['primaryContact.email']}</p>}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Address Details Tab */}
            <TabsContent value="address" className="space-y-4">
              {/* Billing Address */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-900">
                  <MapPin className="size-4 inline mr-2" />
                  Billing Address
                </h3>
                
                <div className="space-y-2">
                  <Label htmlFor="billingAddress.street">
                    Street <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="billingAddress.street"
                    value={formData.billingAddress.street}
                    onChange={(e) => handleInputChange('billingAddress.street', e.target.value)}
                    placeholder="Street address"
                    className={errors['billingAddress.street'] ? 'border-red-500' : ''}
                  />
                  {errors['billingAddress.street'] && <p className="text-xs text-red-500">{errors['billingAddress.street']}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="billingAddress.city">
                      City <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="billingAddress.city"
                      value={formData.billingAddress.city}
                      onChange={(e) => handleInputChange('billingAddress.city', e.target.value)}
                      placeholder="City"
                      className={errors['billingAddress.city'] ? 'border-red-500' : ''}
                    />
                    {errors['billingAddress.city'] && <p className="text-xs text-red-500">{errors['billingAddress.city']}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="billingAddress.state">
                      State <span className="text-red-500">*</span>
                    </Label>
                    <Select 
                      value={formData.billingAddress.state} 
                      onValueChange={(v) => handleInputChange('billingAddress.state', v)}
                    >
                      <SelectTrigger className={errors['billingAddress.state'] ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        {states.map((state) => (
                          <SelectItem key={state} value={state}>{state}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors['billingAddress.state'] && <p className="text-xs text-red-500">{errors['billingAddress.state']}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="billingAddress.pincode">
                      PIN Code <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="billingAddress.pincode"
                      value={formData.billingAddress.pincode}
                      onChange={(e) => handleInputChange('billingAddress.pincode', e.target.value)}
                      placeholder="6-digit PIN"
                      maxLength={6}
                      className={errors['billingAddress.pincode'] ? 'border-red-500' : ''}
                    />
                    {errors['billingAddress.pincode'] && <p className="text-xs text-red-500">{errors['billingAddress.pincode']}</p>}
                  </div>
                </div>
              </div>

              {/* Shipping Addresses */}
              <div className="space-y-4 border-t pt-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-gray-900">
                    <Truck className="size-4 inline mr-2" />
                    Shipping Addresses
                  </h3>
                  <Button type="button" variant="outline" size="sm" onClick={addShippingAddress}>
                    <Plus className="size-4 mr-1" />
                    Add Address
                  </Button>
                </div>

                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                  <Switch checked={sameAsBilling} onCheckedChange={copyBillingToShipping} />
                  <Label className="cursor-pointer">Same as billing address</Label>
                </div>

                {formData.shippingAddresses.map((addr, idx) => (
                  <div key={addr.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-medium text-gray-900">Shipping Address {idx + 1}</h4>
                        {addr.isDefault && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">Default</span>
                        )}
                      </div>
                      {formData.shippingAddresses.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeShippingAddress(addr.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>Address Name</Label>
                      <Input
                        value={addr.name}
                        onChange={(e) => updateShippingAddress(addr.id, 'name', e.target.value)}
                        placeholder="e.g., Main Warehouse, Factory"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Street</Label>
                      <Input
                        value={addr.street}
                        onChange={(e) => updateShippingAddress(addr.id, 'street', e.target.value)}
                        placeholder="Street address"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <Label className="text-xs">City</Label>
                        <Input
                          value={addr.city}
                          onChange={(e) => updateShippingAddress(addr.id, 'city', e.target.value)}
                          placeholder="City"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">State</Label>
                        <Select 
                          value={addr.state} 
                          onValueChange={(v) => updateShippingAddress(addr.id, 'state', v)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="State" />
                          </SelectTrigger>
                          <SelectContent>
                            {states.map((state) => (
                              <SelectItem key={state} value={state}>{state}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">PIN Code</Label>
                        <Input
                          value={addr.pincode}
                          onChange={(e) => updateShippingAddress(addr.id, 'pincode', e.target.value)}
                          placeholder="PIN"
                          maxLength={6}
                        />
                      </div>
                    </div>

                    {!addr.isDefault && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => updateShippingAddress(addr.id, 'isDefault', true)}
                      >
                        Set as Default
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Credit & Alerts Tab */}
            <TabsContent value="credit" className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-900">
                  <CreditCard className="size-4 inline mr-2" />
                  Credit Information
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="creditLimit">Credit Limit (₹)</Label>
                    <Input
                      id="creditLimit"
                      type="number"
                      min="0"
                      value={formData.creditLimit}
                      onChange={(e) => handleInputChange('creditLimit', Number(e.target.value))}
                      placeholder="0"
                    />
                    {formData.creditLimit > 0 && (
                      <p className="text-xs text-gray-500">{formatCurrency(formData.creditLimit)}</p>
                    )}
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
              </div>

              <div className="border-t pt-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                  <Bell className="size-4 inline mr-2" />
                  Alert Settings
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Credit Limit Alert</p>
                      <p className="text-xs text-gray-500">Notify when customer approaches credit limit</p>
                    </div>
                    <Switch
                      checked={formData.enableCreditAlert}
                      onCheckedChange={(v) => handleInputChange('enableCreditAlert', v)}
                    />
                  </div>

                  {formData.enableCreditAlert && (
                    <div className="space-y-2 pl-4">
                      <Label htmlFor="creditAlertThreshold">Alert Threshold (%)</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="creditAlertThreshold"
                          type="number"
                          min="1"
                          max="100"
                          value={formData.creditAlertThreshold}
                          onChange={(e) => handleInputChange('creditAlertThreshold', Number(e.target.value))}
                          className="w-24"
                        />
                        <span className="text-sm text-gray-600">%</span>
                      </div>
                      <p className="text-xs text-gray-500">
                        Alert when outstanding reaches {formData.creditAlertThreshold}% of credit limit
                      </p>
                    </div>
                  )}

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Overdue Payment Alert</p>
                      <p className="text-xs text-gray-500">Notify when payments become overdue</p>
                    </div>
                    <Switch
                      checked={formData.enableOverdueAlert}
                      onCheckedChange={(v) => handleInputChange('enableOverdueAlert', v)}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  placeholder="Any additional information about the customer..."
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
                    if (activeTab === 'credit') setActiveTab('address');
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
            {activeTab !== 'credit' ? (
              <Button
                type="button"
                onClick={() => {
                  if (activeTab === 'basic') setActiveTab('address');
                  if (activeTab === 'address') setActiveTab('credit');
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
                    Create Customer
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