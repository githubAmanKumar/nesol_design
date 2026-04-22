// src/components/sales/NewLeadModal.tsx
import { useState } from 'react';
import { 
  Users, Phone, Mail, Building2, Tag, Calendar,
  FileText, MapPin, Globe, User, Briefcase
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

interface NewLeadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

interface LeadFormData {
  source: string;
  companyName: string;
  contactPerson: string;
  designation: string;
  phone: string;
  alternatePhone: string;
  email: string;
  address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
  productInterest: string;
  leadOwner: string;
  status: string;
  notes: string;
  nextFollowUp: string;
}

const initialFormData: LeadFormData = {
  source: '',
  companyName: '',
  contactPerson: '',
  designation: '',
  phone: '',
  alternatePhone: '',
  email: '',
  address: {
    street: '',
    city: '',
    state: '',
    pincode: '',
  },
  productInterest: '',
  leadOwner: '',
  status: 'New',
  notes: '',
  nextFollowUp: '',
};

const leadSources = ['Website', 'Referral', 'Exhibition', 'Cold Call', 'Email Campaign', 'Social Media', 'Trade Show'];
const leadStatuses = ['New', 'Contacted', 'Qualified', 'Lost'];
const productInterests = [
  'Automotive Battery 150AH',
  'Automotive Battery 100AH',
  'Inverter Battery 200AH',
  'Inverter Battery 150AH',
  'E-Rickshaw Battery 120AH',
  'Solar Battery 40AH',
  'Solar Battery 100AH',
];
const salesReps = ['Amit Singh', 'Suresh Patel', 'Ravi Kumar', 'Anil Sharma', 'Deepak Singh'];
const states = [
  'Delhi', 'Maharashtra', 'Tamil Nadu', 'Karnataka', 'Gujarat',
  'West Bengal', 'Uttar Pradesh', 'Rajasthan', 'Madhya Pradesh', 'Haryana',
  'Punjab', 'Kerala', 'Andhra Pradesh', 'Telangana', 'Odisha',
];

export function NewLeadModal({ open, onOpenChange, onSuccess }: NewLeadModalProps) {
  const [formData, setFormData] = useState<LeadFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<string, string>> = {};

    if (!formData.source) newErrors.source = 'Lead source is required';
    if (!formData.companyName) newErrors.companyName = 'Company name is required';
    if (!formData.contactPerson) newErrors.contactPerson = 'Contact person is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.productInterest) newErrors.productInterest = 'Product interest is required';
    if (!formData.leadOwner) newErrors.leadOwner = 'Lead owner is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Lead Created:', formData);
    setIsSubmitting(false);
    onOpenChange(false);
    onSuccess?.();
    resetForm();
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setErrors({});
  };

  const handleInputChange = (field: keyof LeadFormData | string, value: string) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof LeadFormData] as object),
          [child]: value,
        },
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <Users className="size-5" />
            New Lead
          </DialogTitle>
          <DialogDescription>
            Add a new sales lead. Lead ID will be auto-generated.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Lead Source & Status */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="source">
                Lead Source <span className="text-red-500">*</span>
              </Label>
              <Select 
                value={formData.source} 
                onValueChange={(v) => handleInputChange('source', v)}
              >
                <SelectTrigger className={errors.source ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select source" />
                </SelectTrigger>
                <SelectContent>
                  {leadSources.map((source) => (
                    <SelectItem key={source} value={source}>{source}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.source && <p className="text-xs text-red-500">{errors.source}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Lead Status</Label>
              <Select 
                value={formData.status} 
                onValueChange={(v) => handleInputChange('status', v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {leadStatuses.map((status) => (
                    <SelectItem key={status} value={status}>{status}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Company Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 border-b pb-2">
              <Building2 className="size-4 inline mr-2" />
              Company Information
            </h3>
            
            <div className="space-y-2">
              <Label htmlFor="companyName">
                Company Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="companyName"
                value={formData.companyName}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
                placeholder="e.g., ABC Motors Pvt Ltd"
                className={errors.companyName ? 'border-red-500' : ''}
              />
              {errors.companyName && <p className="text-xs text-red-500">{errors.companyName}</p>}
            </div>
          </div>

          {/* Contact Person Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 border-b pb-2">
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
                  placeholder="e.g., Rajiv Mehta"
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
                  placeholder="e.g., Proprietor, Purchase Manager"
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
                  placeholder="e.g., 98765 43210"
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
                  placeholder="e.g., contact@company.com"
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 border-b pb-2">
              <MapPin className="size-4 inline mr-2" />
              Address
            </h3>
            
            <div className="space-y-2">
              <Label htmlFor="address.street">Street</Label>
              <Input
                id="address.street"
                value={formData.address.street}
                onChange={(e) => handleInputChange('address.street', e.target.value)}
                placeholder="Street address"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="address.city">City</Label>
                <Input
                  id="address.city"
                  value={formData.address.city}
                  onChange={(e) => handleInputChange('address.city', e.target.value)}
                  placeholder="City"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address.state">State</Label>
                <Select 
                  value={formData.address.state} 
                  onValueChange={(v) => handleInputChange('address.state', v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map((state) => (
                      <SelectItem key={state} value={state}>{state}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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

          {/* Product Interest & Assignment */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 border-b pb-2">
              <Tag className="size-4 inline mr-2" />
              Product Interest & Assignment
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="productInterest">
                  Product Interest <span className="text-red-500">*</span>
                </Label>
                <Select 
                  value={formData.productInterest} 
                  onValueChange={(v) => handleInputChange('productInterest', v)}
                >
                  <SelectTrigger className={errors.productInterest ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select product" />
                  </SelectTrigger>
                  <SelectContent>
                    {productInterests.map((product) => (
                      <SelectItem key={product} value={product}>{product}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.productInterest && <p className="text-xs text-red-500">{errors.productInterest}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="leadOwner">
                  Lead Owner <span className="text-red-500">*</span>
                </Label>
                <Select 
                  value={formData.leadOwner} 
                  onValueChange={(v) => handleInputChange('leadOwner', v)}
                >
                  <SelectTrigger className={errors.leadOwner ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select sales rep" />
                  </SelectTrigger>
                  <SelectContent>
                    {salesReps.map((rep) => (
                      <SelectItem key={rep} value={rep}>{rep}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.leadOwner && <p className="text-xs text-red-500">{errors.leadOwner}</p>}
              </div>
            </div>
          </div>

          {/* Follow-up & Notes */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 border-b pb-2">
              <Calendar className="size-4 inline mr-2" />
              Follow-up & Notes
            </h3>
            
            <div className="space-y-2">
              <Label htmlFor="nextFollowUp">Next Follow-up Date</Label>
              <Input
                id="nextFollowUp"
                type="date"
                value={formData.nextFollowUp}
                onChange={(e) => handleInputChange('nextFollowUp', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes / Remarks</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="Add any additional notes about the lead..."
                rows={3}
              />
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
                  <Users className="size-4 mr-2" />
                  Create Lead
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}