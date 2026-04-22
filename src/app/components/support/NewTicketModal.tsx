// src/components/support/NewTicketModal.tsx
import { useState, useEffect } from 'react';
import { 
  Ticket, User, Phone, Mail, Package, Calendar,
  FileText, AlertCircle, Clock, MapPin, Search
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
import { cn } from '../ui/utils';

interface NewTicketModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

interface TicketFormData {
  customerId: string;
  productSerial: string;
  batteryModel: string;
  purchaseDate: string;
  complaintCategory: string;
  description: string;
  registrationChannel: string;
  priority: string;
  assignedTo: string;
  notifyCustomer: boolean;
  customerEmail: string;
  customerPhone: string;
}

const initialFormData: TicketFormData = {
  customerId: '',
  productSerial: '',
  batteryModel: '',
  purchaseDate: '',
  complaintCategory: '',
  description: '',
  registrationChannel: 'Phone',
  priority: 'Medium',
  assignedTo: '',
  notifyCustomer: true,
  customerEmail: '',
  customerPhone: '',
};

const complaintCategories = [
  'Not Charging',
  'Low Backup',
  'Physical Damage',
  'Terminal Issue',
  'Leakage',
  'Swelling',
  'Overheating',
  'Noise/Vibration',
  'Other',
];

const registrationChannels = ['Phone', 'Email', 'Portal', 'Dealer', 'Walk-in'];
const priorities = ['Low', 'Medium', 'High', 'Critical'];
const technicians = [
  'Ramesh Kumar (Field Technician)',
  'Dinesh Rawat (Service Center)',
  'Suresh Patel (Field Technician)',
  'Priya Sharma (Technical Support)',
  'Amit Kumar (Service Center)',
];
const batteryModels = [
  'Automotive Battery 150AH',
  'Automotive Battery 100AH',
  'Inverter Battery 200AH',
  'Inverter Battery 150AH',
  'E-Rickshaw Battery 120AH',
  'Solar Battery 40AH',
  'Solar Battery 100AH',
];

// Mock customers
const customers = [
  { id: 'CUST/001', name: 'Delhi Batteries Pvt Ltd', contactPerson: 'Rajiv Mehta', phone: '98765 43210', email: 'rajiv@delhibatteries.com' },
  { id: 'CUST/015', name: 'Mumbai Auto Electricals', contactPerson: 'Suresh Jain', phone: '98201 23456', email: 'suresh@mumbaiauto.com' },
  { id: 'CUST/023', name: 'Chennai Battery House', contactPerson: 'Karthik Subramanian', phone: '98400 12345', email: 'karthik@chennaibattery.com' },
  { id: 'CUST/045', name: 'Lucknow Battery World', contactPerson: 'Amit Verma', phone: '94150 67890', email: 'amit@lucknowbattery.com' },
  { id: 'CUST/008', name: 'Kolkata Power Solutions', contactPerson: 'Sneha Das', phone: '98300 11223', email: 'sneha@kpsolutions.com' },
];

export function NewTicketModal({ open, onOpenChange, onSuccess }: NewTicketModalProps) {
  const [formData, setFormData] = useState<TicketFormData>(initialFormData);
  const [warrantyStatus, setWarrantyStatus] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof TicketFormData, string>>>({});

  useEffect(() => {
    // Auto-calculate warranty status based on purchase date
    if (formData.purchaseDate) {
      const purchaseDate = new Date(formData.purchaseDate);
      const today = new Date();
      const warrantyEndDate = new Date(purchaseDate);
      warrantyEndDate.setFullYear(purchaseDate.getFullYear() + 1);
      
      if (warrantyEndDate >= today) {
        setWarrantyStatus('Under Warranty');
      } else {
        setWarrantyStatus('Out of Warranty');
      }
    } else {
      setWarrantyStatus('');
    }
  }, [formData.purchaseDate]);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof TicketFormData, string>> = {};

    if (!formData.customerId) newErrors.customerId = 'Customer is required';
    if (!formData.productSerial) newErrors.productSerial = 'Product serial number is required';
    if (!formData.batteryModel) newErrors.batteryModel = 'Battery model is required';
    if (!formData.complaintCategory) newErrors.complaintCategory = 'Complaint category is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (formData.notifyCustomer && !formData.customerEmail && !formData.customerPhone) {
      newErrors.customerEmail = 'Email or phone is required for notification';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    const selectedCustomer = customers.find(c => c.id === formData.customerId);
    
    const ticketData = {
      ...formData,
      id: `TKT/${new Date().getFullYear()}/${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
      customerName: selectedCustomer?.name,
      contactPerson: selectedCustomer?.contactPerson,
      warrantyStatus,
      status: formData.assignedTo ? 'Assigned' : 'Open',
      registrationDate: new Date().toISOString(),
      assignmentDate: formData.assignedTo ? new Date().toISOString() : null,
      responseSLADeadline: calculateSLADeadline(formData.priority, 'response'),
      resolutionSLADeadline: calculateSLADeadline(formData.priority, 'resolution'),
      firstResponseTime: null,
      resolutionTime: null,
      slaBreached: false,
    };
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Ticket Created:', ticketData);
    setIsSubmitting(false);
    onOpenChange(false);
    onSuccess?.();
    resetForm();
  };

  const calculateSLADeadline = (priority: string, type: 'response' | 'resolution'): string => {
    const now = new Date();
    
    if (type === 'response') {
      switch (priority) {
        case 'Critical': now.setHours(now.getHours() + 1); break;
        case 'High': now.setHours(now.getHours() + 4); break;
        case 'Medium': now.setHours(now.getHours() + 8); break;
        default: now.setHours(now.getHours() + 24); break;
      }
    } else {
      switch (priority) {
        case 'Critical': now.setHours(now.getHours() + 24); break;
        case 'High': now.setDate(now.getDate() + 2); break;
        case 'Medium': now.setDate(now.getDate() + 5); break;
        default: now.setDate(now.getDate() + 7); break;
      }
    }
    
    return now.toISOString();
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setWarrantyStatus('');
    setErrors({});
  };

  const handleInputChange = (field: keyof TicketFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleCustomerSelect = (customerId: string) => {
    const customer = customers.find(c => c.id === customerId);
    setFormData(prev => ({
      ...prev,
      customerId,
      customerEmail: customer?.email || '',
      customerPhone: customer?.phone || '',
    }));
  };

  const selectedCustomer = customers.find(c => c.id === formData.customerId);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <Ticket className="size-5" />
            New Support Ticket
          </DialogTitle>
          <DialogDescription>
            Register a new customer complaint. Ticket ID will be auto-generated.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Customer Selection */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 border-b pb-2">
              <User className="size-4 inline mr-2" />
              Customer Information
            </h3>
            
            <div className="space-y-2">
              <Label htmlFor="customerId">
                Customer <span className="text-red-500">*</span>
              </Label>
              <Select 
                value={formData.customerId} 
                onValueChange={handleCustomerSelect}
              >
                <SelectTrigger className={errors.customerId ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select customer" />
                </SelectTrigger>
                <SelectContent>
                  {customers.map((cust) => (
                    <SelectItem key={cust.id} value={cust.id}>
                      {cust.name} ({cust.id})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.customerId && <p className="text-xs text-red-500">{errors.customerId}</p>}
            </div>

            {selectedCustomer && (
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-xs text-gray-500">Contact Person</p>
                    <p className="font-medium">{selectedCustomer.contactPerson}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Phone</p>
                    <p className="font-medium">{selectedCustomer.phone}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="font-medium">{selectedCustomer.email}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 border-b pb-2">
              <Package className="size-4 inline mr-2" />
              Product Information
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="productSerial">
                  Product Serial Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="productSerial"
                  value={formData.productSerial}
                  onChange={(e) => handleInputChange('productSerial', e.target.value)}
                  placeholder="e.g., NES150AH-2026-04567"
                  className={errors.productSerial ? 'border-red-500' : ''}
                />
                {errors.productSerial && <p className="text-xs text-red-500">{errors.productSerial}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="batteryModel">
                  Battery Model <span className="text-red-500">*</span>
                </Label>
                <Select 
                  value={formData.batteryModel} 
                  onValueChange={(v) => handleInputChange('batteryModel', v)}
                >
                  <SelectTrigger className={errors.batteryModel ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select model" />
                  </SelectTrigger>
                  <SelectContent>
                    {batteryModels.map((model) => (
                      <SelectItem key={model} value={model}>{model}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.batteryModel && <p className="text-xs text-red-500">{errors.batteryModel}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="purchaseDate">Purchase Date</Label>
                <Input
                  id="purchaseDate"
                  type="date"
                  value={formData.purchaseDate}
                  onChange={(e) => handleInputChange('purchaseDate', e.target.value)}
                  max={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className="space-y-2">
                <Label>Warranty Status</Label>
                <div className={cn(
                  "p-2 rounded-lg text-center",
                  warrantyStatus === 'Under Warranty' ? 'bg-green-100 text-green-700' :
                  warrantyStatus === 'Out of Warranty' ? 'bg-gray-100 text-gray-700' :
                  'bg-gray-50 text-gray-500'
                )}>
                  {warrantyStatus || 'Enter purchase date'}
                </div>
              </div>
            </div>
          </div>

          {/* Complaint Details */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 border-b pb-2">
              <AlertCircle className="size-4 inline mr-2" />
              Complaint Details
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="complaintCategory">
                  Complaint Category <span className="text-red-500">*</span>
                </Label>
                <Select 
                  value={formData.complaintCategory} 
                  onValueChange={(v) => handleInputChange('complaintCategory', v)}
                >
                  <SelectTrigger className={errors.complaintCategory ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {complaintCategories.map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.complaintCategory && <p className="text-xs text-red-500">{errors.complaintCategory}</p>}
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

            <div className="space-y-2">
              <Label htmlFor="description">
                Complaint Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe the issue in detail..."
                rows={4}
                className={errors.description ? 'border-red-500' : ''}
              />
              {errors.description && <p className="text-xs text-red-500">{errors.description}</p>}
            </div>
          </div>

          {/* Registration & Assignment */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 border-b pb-2">
              <FileText className="size-4 inline mr-2" />
              Registration & Assignment
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="registrationChannel">Registration Channel</Label>
                <Select 
                  value={formData.registrationChannel} 
                  onValueChange={(v) => handleInputChange('registrationChannel', v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select channel" />
                  </SelectTrigger>
                  <SelectContent>
                    {registrationChannels.map((channel) => (
                      <SelectItem key={channel} value={channel}>{channel}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="assignedTo">Assign To</Label>
                <Select 
                  value={formData.assignedTo} 
                  onValueChange={(v) => handleInputChange('assignedTo', v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select technician" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="__unassigned__">(Leave Unassigned)</SelectItem>
                    {technicians.map((tech) => (
                      <SelectItem key={tech} value={tech}>{tech}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900">Notify Customer</p>
                <p className="text-xs text-gray-500">Send ticket confirmation via SMS/Email</p>
              </div>
              <input
                type="checkbox"
                checked={formData.notifyCustomer}
                onChange={(e) => handleInputChange('notifyCustomer', e.target.checked)}
                className="rounded"
              />
            </div>

            {formData.priority && (
              <div className="bg-blue-50 p-3 rounded-lg">
                <h4 className="text-sm font-medium text-blue-800 mb-2">SLA Deadlines</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-xs text-blue-600">Response SLA</p>
                    <p className="font-medium">
                      {formData.priority === 'Critical' ? '1 hour' :
                       formData.priority === 'High' ? '4 hours' :
                       formData.priority === 'Medium' ? '8 hours' : '24 hours'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-blue-600">Resolution SLA</p>
                    <p className="font-medium">
                      {formData.priority === 'Critical' ? '24 hours' :
                       formData.priority === 'High' ? '2 days' :
                       formData.priority === 'Medium' ? '5 days' : '7 days'}
                    </p>
                  </div>
                </div>
              </div>
            )}
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
                  <Ticket className="size-4 mr-2" />
                  Create Ticket
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}