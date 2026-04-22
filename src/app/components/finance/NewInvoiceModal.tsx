// src/components/finance/NewInvoiceModal.tsx
import { useState } from 'react';
import { 
  Plus, Trash2, FileText, Calendar, Building2, MapPin,
  DollarSign, Percent, Calculator, QrCode, Upload
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
import { Switch } from '../ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { cn } from '../ui/utils';

interface NewInvoiceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
  customerId?: string;
  customerName?: string;
}

interface LineItem {
  id: string;
  description: string;
  hsn: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  taxableValue: number;
  gstRate: number;
}

interface InvoiceFormData {
  invoiceType: string;
  invoiceDate: string;
  customerId: string;
  customerGstin: string;
  placeOfSupply: string;
  dueDate: string;
  poReference: string;
  paymentTerms: string;
  lineItems: LineItem[];
  cgstRate: number;
  sgstRate: number;
  igstRate: number;
  cess: number;
  generateEinvoice: boolean;
  notes: string;
}

const initialLineItem: LineItem = {
  id: crypto.randomUUID(),
  description: '',
  hsn: '',
  quantity: 1,
  unitPrice: 0,
  discount: 0,
  taxableValue: 0,
  gstRate: 18,
};

const initialFormData: InvoiceFormData = {
  invoiceType: 'Tax Invoice',
  invoiceDate: new Date().toISOString().split('T')[0],
  customerId: '',
  customerGstin: '',
  placeOfSupply: '',
  dueDate: '',
  poReference: '',
  paymentTerms: '30 Days',
  lineItems: [{ ...initialLineItem, id: crypto.randomUUID() }],
  cgstRate: 9,
  sgstRate: 9,
  igstRate: 0,
  cess: 0,
  generateEinvoice: true,
  notes: '',
};

const invoiceTypes = ['Tax Invoice', 'Proforma Invoice', 'Debit Note', 'Credit Note'];
const paymentTermsOptions = ['Advance', '15 Days', '30 Days', '45 Days', '60 Days'];
const placesOfSupply = [
  'Delhi', 'Maharashtra', 'Tamil Nadu', 'Karnataka', 'Gujarat',
  'West Bengal', 'Uttar Pradesh', 'Rajasthan', 'Madhya Pradesh', 'Haryana',
];
const hsnCodes = [
  { code: '85071000', description: 'Lead-acid accumulators for starting piston engines' },
  { code: '85072000', description: 'Other lead-acid accumulators' },
  { code: '85073000', description: 'Nickel-cadmium accumulators' },
  { code: '85414000', description: 'Photosensitive semiconductor devices' },
];

// Mock customers
const customers = [
  { id: 'CUST/001', name: 'Delhi Batteries Pvt Ltd', gstin: '07AABCD1234E1Z5', state: 'Delhi' },
  { id: 'CUST/015', name: 'Mumbai Auto Electricals', gstin: '27BBBCD5678F2G6', state: 'Maharashtra' },
  { id: 'CUST/023', name: 'Chennai Battery House', gstin: '33CCCDD9012H3J7', state: 'Tamil Nadu' },
  { id: 'CUST/032', name: 'Jaipur Auto Parts', gstin: '08EEEFF4567L5M9', state: 'Rajasthan' },
  { id: 'CUST/045', name: 'Kolkata Power Solutions', gstin: '19DDDEE3456K4L8', state: 'West Bengal' },
];

export function NewInvoiceModal({ 
  open, 
  onOpenChange, 
  onSuccess,
  customerId,
  customerName 
}: NewInvoiceModalProps) {
  const [formData, setFormData] = useState<InvoiceFormData>({
    ...initialFormData,
    customerId: customerId || '',
  });
  const [activeTab, setActiveTab] = useState<'details' | 'items' | 'summary'>('details');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});

  // Auto-populate customer details when selected
  const selectedCustomer = customers.find(c => c.id === formData.customerId);

  const handleCustomerSelect = (customerId: string) => {
    const customer = customers.find(c => c.id === customerId);
    setFormData(prev => ({
      ...prev,
      customerId,
      customerGstin: customer?.gstin || '',
      placeOfSupply: customer?.state || '',
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<string, string>> = {};

    if (!formData.customerId) newErrors.customerId = 'Customer is required';
    if (!formData.customerGstin) newErrors.customerGstin = 'Customer GSTIN is required';
    if (!formData.placeOfSupply) newErrors.placeOfSupply = 'Place of supply is required';
    if (formData.lineItems.length === 0) newErrors.lineItems = 'At least one line item is required';
    
    formData.lineItems.forEach((item, idx) => {
      if (!item.description) newErrors[`item_${idx}_description`] = 'Description is required';
      if (!item.hsn) newErrors[`item_${idx}_hsn`] = 'HSN code is required';
      if (item.quantity <= 0) newErrors[`item_${idx}_quantity`] = 'Quantity must be greater than 0';
      if (item.unitPrice <= 0) newErrors[`item_${idx}_unitPrice`] = 'Unit price must be greater than 0';
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateTaxableValue = (item: LineItem): number => {
    const subtotal = item.quantity * item.unitPrice;
    const discountAmount = subtotal * (item.discount / 100);
    return subtotal - discountAmount;
  };

  const calculateGST = () => {
    const totalTaxable = totals.subtotal;
    const isInterstate = formData.placeOfSupply !== 'Uttarakhand';
    
    if (isInterstate) {
      return {
        cgst: 0,
        sgst: 0,
        igst: totalTaxable * (formData.igstRate / 100),
      };
    } else {
      return {
        cgst: totalTaxable * (formData.cgstRate / 100),
        sgst: totalTaxable * (formData.sgstRate / 100),
        igst: 0,
      };
    }
  };

  const updateLineItem = (id: string, field: keyof LineItem, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      lineItems: prev.lineItems.map(item => {
        if (item.id !== id) return item;
        const updated = { ...item, [field]: value };
        updated.taxableValue = calculateTaxableValue(updated);
        return updated;
      }),
    }));
  };

  const addLineItem = () => {
    setFormData(prev => ({
      ...prev,
      lineItems: [...prev.lineItems, { ...initialLineItem, id: crypto.randomUUID() }],
    }));
  };

  const removeLineItem = (id: string) => {
    setFormData(prev => ({
      ...prev,
      lineItems: prev.lineItems.filter(item => item.id !== id),
    }));
  };

  const totals = formData.lineItems.reduce((acc, item) => {
    const subtotal = item.quantity * item.unitPrice;
    const discountAmount = subtotal * (item.discount / 100);
    const taxable = subtotal - discountAmount;
    
    return {
      subtotal: acc.subtotal + subtotal,
      discount: acc.discount + discountAmount,
      taxable: acc.taxable + taxable,
    };
  }, { subtotal: 0, discount: 0, taxable: 0 });

  const gst = calculateGST();
  const totalAmount = totals.taxable + gst.cgst + gst.sgst + gst.igst + formData.cess;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Invoice Created:', formData);
    setIsSubmitting(false);
    onOpenChange(false);
    onSuccess?.();
  };

  const resetForm = () => {
    setFormData({
      ...initialFormData,
      customerId: customerId || '',
      lineItems: [{ ...initialLineItem, id: crypto.randomUUID() }],
    });
    setErrors({});
    setActiveTab('details');
  };

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const isInterstate = formData.placeOfSupply && formData.placeOfSupply !== 'Uttarakhand';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <FileText className="size-5" />
            New Invoice
          </DialogTitle>
          <DialogDescription>
            Create a GST-compliant invoice. Invoice ID will be auto-generated.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Invoice Details</TabsTrigger>
              <TabsTrigger value="items">Line Items</TabsTrigger>
              <TabsTrigger value="summary">Summary & GST</TabsTrigger>
            </TabsList>

            {/* Invoice Details Tab */}
            <TabsContent value="details" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="invoiceType">Invoice Type</Label>
                  <Select value={formData.invoiceType} onValueChange={(v) => setFormData(prev => ({ ...prev, invoiceType: v }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {invoiceTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="invoiceDate">Invoice Date</Label>
                  <Input
                    id="invoiceDate"
                    type="date"
                    value={formData.invoiceDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, invoiceDate: e.target.value }))}
                  />
                </div>

                <div className="space-y-2 col-span-2">
                  <Label htmlFor="customerId">
                    Customer <span className="text-red-500">*</span>
                  </Label>
                  {customerId ? (
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="text-sm font-medium text-gray-900">{customerName}</p>
                      <p className="text-xs text-gray-500">{customerId}</p>
                    </div>
                  ) : (
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
                  )}
                  {errors.customerId && <p className="text-xs text-red-500">{errors.customerId}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customerGstin">
                    Customer GSTIN <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="customerGstin"
                    value={formData.customerGstin}
                    onChange={(e) => setFormData(prev => ({ ...prev, customerGstin: e.target.value.toUpperCase() }))}
                    placeholder="e.g., 07AABCD1234E1Z5"
                    className={cn("font-mono", errors.customerGstin ? 'border-red-500' : '')}
                    maxLength={15}
                  />
                  {errors.customerGstin && <p className="text-xs text-red-500">{errors.customerGstin}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="placeOfSupply">
                    Place of Supply <span className="text-red-500">*</span>
                  </Label>
                  <Select 
                    value={formData.placeOfSupply} 
                    onValueChange={(v) => setFormData(prev => ({ ...prev, placeOfSupply: v }))}
                  >
                    <SelectTrigger className={errors.placeOfSupply ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      {placesOfSupply.map((state) => (
                        <SelectItem key={state} value={state}>{state}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.placeOfSupply && <p className="text-xs text-red-500">{errors.placeOfSupply}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                    min={formData.invoiceDate}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="paymentTerms">Payment Terms</Label>
                  <Select 
                    value={formData.paymentTerms} 
                    onValueChange={(v) => setFormData(prev => ({ ...prev, paymentTerms: v }))}
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

                <div className="space-y-2">
                  <Label htmlFor="poReference">PO Reference (Optional)</Label>
                  <Input
                    id="poReference"
                    value={formData.poReference}
                    onChange={(e) => setFormData(prev => ({ ...prev, poReference: e.target.value }))}
                    placeholder="Customer PO number"
                  />
                </div>

                <div className="col-span-2">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Generate E-Invoice</p>
                      <p className="text-xs text-gray-500">Auto-generate IRN and QR code</p>
                    </div>
                    <Switch
                      checked={formData.generateEinvoice}
                      onCheckedChange={(v) => setFormData(prev => ({ ...prev, generateEinvoice: v }))}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Line Items Tab */}
            <TabsContent value="items" className="space-y-4">
              <div className="space-y-3">
                {formData.lineItems.map((item, idx) => (
                  <div key={item.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-gray-900">Item {idx + 1}</h4>
                      {formData.lineItems.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeLineItem(item.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="col-span-2 space-y-1">
                        <Label>Description <span className="text-red-500">*</span></Label>
                        <Input
                          value={item.description}
                          onChange={(e) => updateLineItem(item.id, 'description', e.target.value)}
                          placeholder="Product/Service description"
                          className={errors[`item_${idx}_description`] ? 'border-red-500' : ''}
                        />
                      </div>

                      <div className="space-y-1">
                        <Label>HSN/SAC Code <span className="text-red-500">*</span></Label>
                        <Select 
                          value={item.hsn} 
                          onValueChange={(v) => updateLineItem(item.id, 'hsn', v)}
                        >
                          <SelectTrigger className={errors[`item_${idx}_hsn`] ? 'border-red-500' : ''}>
                            <SelectValue placeholder="Select HSN" />
                          </SelectTrigger>
                          <SelectContent>
                            {hsnCodes.map((hsn) => (
                              <SelectItem key={hsn.code} value={hsn.code}>
                                {hsn.code} - {hsn.description}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-1">
                        <Label>GST Rate (%)</Label>
                        <Select 
                          value={String(item.gstRate)} 
                          onValueChange={(v) => updateLineItem(item.id, 'gstRate', Number(v))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">0%</SelectItem>
                            <SelectItem value="5">5%</SelectItem>
                            <SelectItem value="12">12%</SelectItem>
                            <SelectItem value="18">18%</SelectItem>
                            <SelectItem value="28">28%</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-1">
                        <Label>Quantity <span className="text-red-500">*</span></Label>
                        <Input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateLineItem(item.id, 'quantity', Number(e.target.value))}
                          className={errors[`item_${idx}_quantity`] ? 'border-red-500' : ''}
                        />
                      </div>

                      <div className="space-y-1">
                        <Label>Unit Price (₹) <span className="text-red-500">*</span></Label>
                        <Input
                          type="number"
                          min="0"
                          step="0.01"
                          value={item.unitPrice}
                          onChange={(e) => updateLineItem(item.id, 'unitPrice', Number(e.target.value))}
                          className={errors[`item_${idx}_unitPrice`] ? 'border-red-500' : ''}
                        />
                      </div>

                      <div className="space-y-1">
                        <Label>Discount (%)</Label>
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          value={item.discount}
                          onChange={(e) => updateLineItem(item.id, 'discount', Number(e.target.value))}
                        />
                      </div>

                      <div className="space-y-1">
                        <Label>Taxable Value</Label>
                        <div className="p-2 bg-gray-50 rounded text-right font-medium">
                          {formatCurrency(item.taxableValue)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  onClick={addLineItem}
                  className="w-full"
                >
                  <Plus className="size-4 mr-2" />
                  Add Line Item
                </Button>
              </div>
            </TabsContent>

            {/* Summary & GST Tab */}
            <TabsContent value="summary" className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">Invoice Summary</h4>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal:</span>
                    <span>{formatCurrency(totals.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total Discount:</span>
                    <span className="text-red-600">- {formatCurrency(totals.discount)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium pt-2 border-t">
                    <span>Taxable Value:</span>
                    <span>{formatCurrency(totals.taxable)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">GST Calculation</h4>
                
                {isInterstate ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>IGST Rate (%)</Label>
                      <Input
                        type="number"
                        min="0"
                        max="28"
                        value={formData.igstRate}
                        onChange={(e) => setFormData(prev => ({ ...prev, igstRate: Number(e.target.value) }))}
                        className="w-24 text-right"
                      />
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">IGST Amount:</span>
                      <span>{formatCurrency(gst.igst)}</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>CGST Rate (%)</Label>
                      <Input
                        type="number"
                        min="0"
                        max="14"
                        value={formData.cgstRate}
                        onChange={(e) => setFormData(prev => ({ ...prev, cgstRate: Number(e.target.value) }))}
                        className="w-24 text-right"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>SGST Rate (%)</Label>
                      <Input
                        type="number"
                        min="0"
                        max="14"
                        value={formData.sgstRate}
                        onChange={(e) => setFormData(prev => ({ ...prev, sgstRate: Number(e.target.value) }))}
                        className="w-24 text-right"
                      />
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">CGST Amount:</span>
                      <span>{formatCurrency(gst.cgst)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">SGST Amount:</span>
                      <span>{formatCurrency(gst.sgst)}</span>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between mt-3 pt-3 border-t">
                  <Label>Cess (₹)</Label>
                  <Input
                    type="number"
                    min="0"
                    value={formData.cess}
                    onChange={(e) => setFormData(prev => ({ ...prev, cess: Number(e.target.value) }))}
                    className="w-32 text-right"
                  />
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900">Total Invoice Value:</span>
                  <span className="text-xl font-bold text-green-700">{formatCurrency(totalAmount)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes (Optional)</Label>
                <textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Additional notes or terms..."
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                />
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter className="gap-2 mt-6">
            <div className="flex-1 flex gap-2">
              {activeTab !== 'details' && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    if (activeTab === 'items') setActiveTab('details');
                    if (activeTab === 'summary') setActiveTab('items');
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
            {activeTab !== 'summary' ? (
              <Button
                type="button"
                onClick={() => {
                  if (activeTab === 'details') setActiveTab('items');
                  if (activeTab === 'items') setActiveTab('summary');
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
                    <FileText className="size-4 mr-2" />
                    Create Invoice
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