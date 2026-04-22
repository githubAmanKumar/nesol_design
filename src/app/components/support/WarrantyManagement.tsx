// src/components/support/NewRMAModal.tsx
import { useState, useEffect } from 'react';
import { 
  RotateCcw, Ticket, Package, Calendar, FileText,
  User, Phone, AlertCircle, Truck
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

interface NewRMAModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

interface RMAFormData {
  ticketId: string;
  salesOrderId: string;
  customerId: string;
  productSerial: string;
  batteryModel: string;
  reasonForReturn: string;
  expectedReceiptDate: string;
  priority: string;
  returnMethod: string;
  courier: string;
  trackingNumber: string;
  notes: string;
}

const initialFormData: RMAFormData = {
  ticketId: '',
  salesOrderId: '',
  customerId: '',
  productSerial: '',
  batteryModel: '',
  reasonForReturn: '',
  expectedReceiptDate: '',
  priority: 'Medium',
  returnMethod: 'Courier',
  courier: '',
  trackingNumber: '',
  notes: '',
};

const returnReasons = [
  'Low backup time, capacity degradation',
  'Not charging',
  'Physical damage, container crack',
  'Terminal corrosion and loose connection',
  'Not holding charge',
  'Leakage',
  'Swelling',
  'Manufacturing defect',
  'Dead on arrival',
  'Other',
];

const priorities = ['Low', 'Medium', 'High', 'Critical'];
const returnMethods = ['Courier', 'Customer Drop-off', 'Field Technician Pickup', 'Dealer Return'];
const couriers = ['Blue Dart', 'DTDC', 'Delhivery', 'FedEx', 'Gati', 'VRL Logistics', 'Other'];

// Mock data
const openTickets = [
  { id: 'TKT/2026/089', customerId: 'CUST/001', customerName: 'Delhi Batteries Pvt Ltd', productSerial: 'NES150AH-2026-04567', batteryModel: 'Automotive Battery 150AH', salesOrderId: 'SO/2026/089' },
  { id: 'TKT/2026/088', customerId: 'CUST/015', customerName: 'Mumbai Auto Electricals', productSerial: 'NES200AH-2026-01234', batteryModel: 'Inverter Battery 200AH', salesOrderId: 'SO/2026/088' },
  { id: 'TKT/2026/087', customerId: 'CUST/023', customerName: 'Chennai Battery House', productSerial: 'NES120AH-2025-0890', batteryModel: 'E-Rickshaw Battery 120AH', salesOrderId: 'SO/2026/087' },
  { id: 'TKT/2026/085', customerId: 'CUST/008', customerName: 'Kolkata Power Solutions', productSerial: 'NES40AH-2026-0056', batteryModel: 'Solar Battery 40AH', salesOrderId: 'SO/2026/085' },
  { id: 'TKT/2026/090', customerId: 'CUST/032', customerName: 'Jaipur Auto Parts', productSerial: 'NES100AH-2026-0078', batteryModel: 'Automotive Battery 100AH', salesOrderId: 'SO/2026/091' },
];

export function NewRMAModal({ open, onOpenChange, onSuccess }: NewRMAModalProps) {
  const [formData, setFormData] = useState<RMAFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof RMAFormData, string>>>({});

  useEffect(() => {
    // Auto-calculate expected receipt date (5 days from today)
    if (open) {
      const today = new Date();
      today.setDate(today.getDate() + 5);
      setFormData(prev => ({ 
        ...prev, 
        expectedReceiptDate: today.toISOString().split('T')[0] 
      }));
    }
  }, [open]);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof RMAFormData, string>> = {};

    if (!formData.ticketId) newErrors.ticketId = 'Support ticket is required';
    if (!formData.reasonForReturn) newErrors.reasonForReturn = 'Reason for return is required';
    if (formData.returnMethod === 'Courier' && !formData.courier) {
      newErrors.courier = 'Courier is required for courier returns';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    const selectedTicket = openTickets.find(t => t.id === formData.ticketId);
    
    const rmaData = {
      ...formData,
      id: `RMA/${new Date().getFullYear()}/${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
      customerName: selectedTicket?.customerName,
      returnAuthDate: new Date().toISOString(),
      status: 'Authorized',
      actualReceiptDate: null,
    };
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('RMA Created:', rmaData);
    setIsSubmitting(false);
    onOpenChange(false);
    onSuccess?.();
    resetForm();
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setErrors({});
  };

  const handleInputChange = (field: keyof RMAFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleTicketSelect = (ticketId: string) => {
    const ticket = openTickets.find(t => t.id === ticketId);
    if (ticket) {
      setFormData(prev => ({
        ...prev,
        ticketId,
        customerId: ticket.customerId,
        productSerial: ticket.productSerial,
        batteryModel: ticket.batteryModel,
        salesOrderId: ticket.salesOrderId,
      }));
    }
  };

  const selectedTicket = openTickets.find(t => t.id === formData.ticketId);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <RotateCcw className="size-5" />
            New RMA (Return Merchandise Authorization)
          </DialogTitle>
          <DialogDescription>
            Create a new return authorization. RMA ID will be auto-generated.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Ticket Selection */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 border-b pb-2">
              <Ticket className="size-4 inline mr-2" />
              Link Support Ticket
            </h3>
            
            <div className="space-y-2">
              <Label htmlFor="ticketId">
                Support Ticket <span className="text-red-500">*</span>
              </Label>
              <Select 
                value={formData.ticketId} 
                onValueChange={handleTicketSelect}
              >
                <SelectTrigger className={errors.ticketId ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select support ticket" />
                </SelectTrigger>
                <SelectContent>
                  {openTickets.map((ticket) => (
                    <SelectItem key={ticket.id} value={ticket.id}>
                      {ticket.id} - {ticket.customerName} ({ticket.batteryModel})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.ticketId && <p className="text-xs text-red-500">{errors.ticketId}</p>}
            </div>

            {selectedTicket && (
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-xs text-gray-500">Customer</p>
                    <p className="font-medium">{selectedTicket.customerName}</p>
                    <p className="text-xs text-gray-500">{selectedTicket.customerId}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Sales Order</p>
                    <p className="font-medium">{selectedTicket.salesOrderId}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Product Serial</p>
                    <p className="font-mono">{selectedTicket.productSerial}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Battery Model</p>
                    <p>{selectedTicket.batteryModel}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Return Details */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 border-b pb-2">
              <Package className="size-4 inline mr-2" />
              Return Details
            </h3>
            
            <div className="space-y-2">
              <Label htmlFor="reasonForReturn">
                Reason for Return <span className="text-red-500">*</span>
              </Label>
              <Select 
                value={formData.reasonForReturn} 
                onValueChange={(v) => handleInputChange('reasonForReturn', v)}
              >
                <SelectTrigger className={errors.reasonForReturn ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select reason" />
                </SelectTrigger>
                <SelectContent>
                  {returnReasons.map((reason) => (
                    <SelectItem key={reason} value={reason}>{reason}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.reasonForReturn && <p className="text-xs text-red-500">{errors.reasonForReturn}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
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

              <div className="space-y-2">
                <Label htmlFor="expectedReceiptDate">Expected Receipt Date</Label>
                <Input
                  id="expectedReceiptDate"
                  type="date"
                  value={formData.expectedReceiptDate}
                  onChange={(e) => handleInputChange('expectedReceiptDate', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>
          </div>

          {/* Return Logistics */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 border-b pb-2">
              <Truck className="size-4 inline mr-2" />
              Return Logistics
            </h3>
            
            <div className="space-y-2">
              <Label htmlFor="returnMethod">Return Method</Label>
              <Select 
                value={formData.returnMethod} 
                onValueChange={(v) => handleInputChange('returnMethod', v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  {returnMethods.map((method) => (
                    <SelectItem key={method} value={method}>{method}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {formData.returnMethod === 'Courier' && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="courier">
                    Courier <span className="text-red-500">*</span>
                  </Label>
                  <Select 
                    value={formData.courier} 
                    onValueChange={(v) => handleInputChange('courier', v)}
                  >
                    <SelectTrigger className={errors.courier ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select courier" />
                    </SelectTrigger>
                    <SelectContent>
                      {couriers.map((c) => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.courier && <p className="text-xs text-red-500">{errors.courier}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="trackingNumber">Tracking Number (Optional)</Label>
                  <Input
                    id="trackingNumber"
                    value={formData.trackingNumber}
                    onChange={(e) => handleInputChange('trackingNumber', e.target.value)}
                    placeholder="e.g., BD123456789IN"
                  />
                </div>
              </div>
            )}

            {formData.returnMethod === 'Customer Drop-off' && (
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-blue-800">
                  <span className="font-medium">Drop-off Location:</span> Nesol Energies Service Center, 
                  Plot 45, Industrial Area, Roorkee, Uttarakhand - 247667
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  Customer will be notified with drop-off instructions.
                </p>
              </div>
            )}

            {formData.returnMethod === 'Field Technician Pickup' && (
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-sm text-green-800">
                  A field technician will be scheduled to pick up the product from the customer's location.
                </p>
                <p className="text-xs text-green-600 mt-1">
                  Pickup will be coordinated with the customer within 48 hours.
                </p>
              </div>
            )}
          </div>

          {/* Additional Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes (Optional)</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              placeholder="Any additional information about the return..."
              rows={3}
            />
          </div>

          {/* RMA Summary */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-blue-800 mb-2">RMA Summary</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-blue-600">Customer</p>
                <p className="font-medium">{selectedTicket?.customerName || 'Not selected'}</p>
              </div>
              <div>
                <p className="text-blue-600">Product</p>
                <p className="font-medium">{selectedTicket?.batteryModel || 'Not selected'}</p>
              </div>
              <div>
                <p className="text-blue-600">Authorization Date</p>
                <p className="font-medium">{new Date().toLocaleDateString('en-IN')}</p>
              </div>
              <div>
                <p className="text-blue-600">Initial Status</p>
                <p className="font-medium text-blue-700">Authorized</p>
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
                  <RotateCcw className="size-4 mr-2" />
                  Create RMA
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}