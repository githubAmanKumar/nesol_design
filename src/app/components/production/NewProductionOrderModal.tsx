// src/components/production/NewProductionOrderModal.tsx
import { useState, useEffect } from 'react';
import { 
  Factory, Package, Calendar, FileText, AlertCircle,
  Plus, Trash2, Calculator, Clock
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
import { Textarea } from '../ui/textarea';
import { cn } from '../ui/utils';

interface NewProductionOrderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

interface ProductionOrderFormData {
  productSku: string;
  productModel: string;
  bomId: string;
  quantity: number;
  plannedStartDate: string;
  plannedEndDate: string;
  linkedSalesOrderId: string;
  priority: string;
  shift: string;
  productionLine: string;
  supervisor: string;
  batchSize: number;
  numberOfBatches: number;
  notes: string;
  autoGenerateBatch: boolean;
}

const initialFormData: ProductionOrderFormData = {
  productSku: '',
  productModel: '',
  bomId: '',
  quantity: 100,
  plannedStartDate: new Date().toISOString().split('T')[0],
  plannedEndDate: '',
  linkedSalesOrderId: '',
  priority: 'Medium',
  shift: 'General',
  productionLine: '',
  supervisor: '',
  batchSize: 50,
  numberOfBatches: 2,
  notes: '',
  autoGenerateBatch: true,
};

const products = [
  { sku: 'NES-AUTO-150AH', model: 'Automotive Battery 150AH', bomId: 'BOM/001' },
  { sku: 'NES-AUTO-100AH', model: 'Automotive Battery 100AH', bomId: 'BOM/004' },
  { sku: 'NES-INV-200AH', model: 'Inverter Battery 200AH', bomId: 'BOM/002' },
  { sku: 'NES-INV-150AH', model: 'Inverter Battery 150AH', bomId: 'BOM/005' },
  { sku: 'NES-ERIK-120AH', model: 'E-Rickshaw Battery 120AH', bomId: 'BOM/003' },
  { sku: 'NES-SOLAR-40AH', model: 'Solar Battery 40AH', bomId: 'BOM/006' },
];

const priorities = ['Low', 'Medium', 'High', 'Urgent'];
const shifts = ['Morning (6AM - 2PM)', 'Evening (2PM - 10PM)', 'Night (10PM - 6AM)', 'General (9AM - 6PM)'];
const productionLines = ['Line 1', 'Line 2', 'Line 3', 'Line 4'];
const supervisors = ['Rajesh Kumar', 'Vikram Singh', 'Suresh Yadav', 'Dinesh Rawat'];

// Mock BOM components for preview
const bomComponents: Record<string, Array<{ name: string; quantity: number; unit: string }>> = {
  'BOM/001': [
    { name: 'Lead', quantity: 12.5, unit: 'Kg' },
    { name: 'Acid', quantity: 4.5, unit: 'Litre' },
    { name: 'Container', quantity: 1, unit: 'Pcs' },
    { name: 'Lid', quantity: 1, unit: 'Pcs' },
    { name: 'Separator', quantity: 15, unit: 'Pcs' },
    { name: 'Terminals', quantity: 2, unit: 'Pcs' },
  ],
  'BOM/002': [
    { name: 'Lead', quantity: 18.5, unit: 'Kg' },
    { name: 'Acid', quantity: 6.0, unit: 'Litre' },
    { name: 'Container', quantity: 1, unit: 'Pcs' },
    { name: 'Lid', quantity: 1, unit: 'Pcs' },
    { name: 'Separator', quantity: 20, unit: 'Pcs' },
    { name: 'Terminals', quantity: 2, unit: 'Pcs' },
  ],
  'BOM/003': [
    { name: 'Lead', quantity: 10.5, unit: 'Kg' },
    { name: 'Acid', quantity: 3.8, unit: 'Litre' },
    { name: 'Container', quantity: 1, unit: 'Pcs' },
    { name: 'Lid', quantity: 1, unit: 'Pcs' },
    { name: 'Separator', quantity: 12, unit: 'Pcs' },
    { name: 'Terminals', quantity: 2, unit: 'Pcs' },
  ],
  'BOM/004': [
    { name: 'Lead', quantity: 8.5, unit: 'Kg' },
    { name: 'Acid', quantity: 3.2, unit: 'Litre' },
    { name: 'Container', quantity: 1, unit: 'Pcs' },
    { name: 'Lid', quantity: 1, unit: 'Pcs' },
    { name: 'Separator', quantity: 10, unit: 'Pcs' },
    { name: 'Terminals', quantity: 2, unit: 'Pcs' },
  ],
};

export function NewProductionOrderModal({ open, onOpenChange, onSuccess }: NewProductionOrderModalProps) {
  const [formData, setFormData] = useState<ProductionOrderFormData>(initialFormData);
  const [activeTab, setActiveTab] = useState<'basic' | 'schedule' | 'batch'>('basic');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof ProductionOrderFormData, string>>>({});

  useEffect(() => {
    // Calculate number of batches when quantity or batch size changes
    const batches = Math.ceil(formData.quantity / formData.batchSize);
    setFormData(prev => ({ ...prev, numberOfBatches: batches }));
  }, [formData.quantity, formData.batchSize]);

  useEffect(() => {
    // Auto-calculate planned end date based on quantity and start date
    if (formData.plannedStartDate && formData.quantity) {
      const startDate = new Date(formData.plannedStartDate);
      const daysToAdd = Math.ceil(formData.quantity / 100) + 2;
      startDate.setDate(startDate.getDate() + daysToAdd);
      setFormData(prev => ({ 
        ...prev, 
        plannedEndDate: startDate.toISOString().split('T')[0] 
      }));
    }
  }, [formData.plannedStartDate, formData.quantity]);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ProductionOrderFormData, string>> = {};

    if (!formData.productSku) newErrors.productSku = 'Product is required';
    if (!formData.quantity || formData.quantity <= 0) newErrors.quantity = 'Quantity must be greater than 0';
    if (!formData.plannedStartDate) newErrors.plannedStartDate = 'Start date is required';
    if (!formData.productionLine) newErrors.productionLine = 'Production line is required';
    if (!formData.supervisor) newErrors.supervisor = 'Supervisor is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    const orderData = {
      ...formData,
      status: 'Planned',
      produced: 0,
      rejected: 0,
      orderDate: new Date().toISOString(),
      orderId: `PO/${new Date().getFullYear()}/${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
    };
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Production Order Created:', orderData);
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

  const handleInputChange = (field: keyof ProductionOrderFormData, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleProductSelect = (sku: string) => {
    const product = products.find(p => p.sku === sku);
    if (product) {
      setFormData(prev => ({
        ...prev,
        productSku: sku,
        productModel: product.model,
        bomId: product.bomId,
      }));
    }
  };

  const calculateMaterialRequirements = () => {
    const components = bomComponents[formData.bomId] || [];
    return components.map(comp => ({
      ...comp,
      totalRequired: comp.quantity * formData.quantity,
    }));
  };

  const materialRequirements = calculateMaterialRequirements();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <Factory className="size-5" />
            New Production Order
          </DialogTitle>
          <DialogDescription>
            Create a new production order. Order ID will be auto-generated.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Basic Information</TabsTrigger>
              <TabsTrigger value="schedule">Schedule & Resources</TabsTrigger>
              <TabsTrigger value="batch">Batch & BOM</TabsTrigger>
            </TabsList>

            {/* Basic Information Tab */}
            <TabsContent value="basic" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="productSku">
                  Product <span className="text-red-500">*</span>
                </Label>
                <Select 
                  value={formData.productSku} 
                  onValueChange={handleProductSelect}
                >
                  <SelectTrigger className={errors.productSku ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select product" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((product) => (
                      <SelectItem key={product.sku} value={product.sku}>
                        {product.model} ({product.sku})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.productSku && <p className="text-xs text-red-500">{errors.productSku}</p>}
              </div>

              {formData.productSku && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-blue-600">Product Model</p>
                      <p className="text-sm font-medium text-blue-900">{formData.productModel}</p>
                    </div>
                    <div>
                      <p className="text-xs text-blue-600">BOM ID</p>
                      <p className="text-sm font-medium text-blue-900">{formData.bomId}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quantity">
                    Quantity to Produce <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    value={formData.quantity}
                    onChange={(e) => handleInputChange('quantity', Number(e.target.value))}
                    className={errors.quantity ? 'border-red-500' : ''}
                  />
                  {errors.quantity && <p className="text-xs text-red-500">{errors.quantity}</p>}
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
                <Label htmlFor="linkedSalesOrderId">Linked Sales Order (Optional)</Label>
                <Input
                  id="linkedSalesOrderId"
                  value={formData.linkedSalesOrderId}
                  onChange={(e) => handleInputChange('linkedSalesOrderId', e.target.value)}
                  placeholder="e.g., SO/2026/089"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes / Special Instructions</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  placeholder="Any special instructions for production..."
                  rows={3}
                />
              </div>
            </TabsContent>

            {/* Schedule & Resources Tab */}
            <TabsContent value="schedule" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="plannedStartDate">
                    Planned Start Date <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="plannedStartDate"
                    type="date"
                    value={formData.plannedStartDate}
                    onChange={(e) => handleInputChange('plannedStartDate', e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className={errors.plannedStartDate ? 'border-red-500' : ''}
                  />
                  {errors.plannedStartDate && <p className="text-xs text-red-500">{errors.plannedStartDate}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="plannedEndDate">Planned End Date (Auto-calculated)</Label>
                  <Input
                    id="plannedEndDate"
                    type="date"
                    value={formData.plannedEndDate}
                    onChange={(e) => handleInputChange('plannedEndDate', e.target.value)}
                    min={formData.plannedStartDate}
                    className="bg-gray-50"
                  />
                  <p className="text-xs text-gray-500">Based on quantity and production rate</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="shift">Shift</Label>
                  <Select 
                    value={formData.shift} 
                    onValueChange={(v) => handleInputChange('shift', v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select shift" />
                    </SelectTrigger>
                    <SelectContent>
                      {shifts.map((s) => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="productionLine">
                    Production Line <span className="text-red-500">*</span>
                  </Label>
                  <Select 
                    value={formData.productionLine} 
                    onValueChange={(v) => handleInputChange('productionLine', v)}
                  >
                    <SelectTrigger className={errors.productionLine ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select line" />
                    </SelectTrigger>
                    <SelectContent>
                      {productionLines.map((line) => (
                        <SelectItem key={line} value={line}>{line}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.productionLine && <p className="text-xs text-red-500">{errors.productionLine}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="supervisor">
                  Supervisor <span className="text-red-500">*</span>
                </Label>
                <Select 
                  value={formData.supervisor} 
                  onValueChange={(v) => handleInputChange('supervisor', v)}
                >
                  <SelectTrigger className={errors.supervisor ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select supervisor" />
                  </SelectTrigger>
                  <SelectContent>
                    {supervisors.map((sup) => (
                      <SelectItem key={sup} value={sup}>{sup}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.supervisor && <p className="text-xs text-red-500">{errors.supervisor}</p>}
              </div>

              {/* Timeline Preview */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center gap-2">
                  <Clock className="size-4" />
                  Production Timeline Preview
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Estimated Duration:</span>
                    <span className="font-medium">
                      {formData.plannedStartDate && formData.plannedEndDate ? (
                        `${Math.ceil((new Date(formData.plannedEndDate).getTime() - new Date(formData.plannedStartDate).getTime()) / (1000 * 60 * 60 * 24))} days`
                      ) : '—'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Daily Production Target:</span>
                    <span className="font-medium">
                      {formData.plannedStartDate && formData.plannedEndDate ? (
                        `${Math.ceil(formData.quantity / Math.max(1, Math.ceil((new Date(formData.plannedEndDate).getTime() - new Date(formData.plannedStartDate).getTime()) / (1000 * 60 * 60 * 24))))} units/day`
                      ) : '—'}
                    </span>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Batch & BOM Tab */}
            <TabsContent value="batch" className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">Auto-generate Batch Numbers</p>
                  <p className="text-xs text-gray-500">Automatically create batch numbers for this production run</p>
                </div>
                <Switch
                  checked={formData.autoGenerateBatch}
                  onCheckedChange={(v) => handleInputChange('autoGenerateBatch', v)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="batchSize">Batch Size (Units per Batch)</Label>
                  <Input
                    id="batchSize"
                    type="number"
                    min="1"
                    max={formData.quantity}
                    value={formData.batchSize}
                    onChange={(e) => handleInputChange('batchSize', Number(e.target.value))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="numberOfBatches">Number of Batches</Label>
                  <Input
                    id="numberOfBatches"
                    type="number"
                    value={formData.numberOfBatches}
                    disabled
                    className="bg-gray-50"
                  />
                </div>
              </div>

              {/* BOM Components Preview */}
              <div className="space-y-2">
                <Label>Bill of Materials Components</Label>
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="p-2 text-left text-xs text-gray-600">Component</th>
                        <th className="p-2 text-right text-xs text-gray-600">Per Unit</th>
                        <th className="p-2 text-right text-xs text-gray-600">Total Required</th>
                        <th className="p-2 text-left text-xs text-gray-600">Unit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {materialRequirements.length > 0 ? (
                        materialRequirements.map((comp, idx) => (
                          <tr key={idx} className="border-t">
                            <td className="p-2">{comp.name}</td>
                            <td className="p-2 text-right">{comp.quantity.toLocaleString()}</td>
                            <td className="p-2 text-right font-medium">{comp.totalRequired.toLocaleString()}</td>
                            <td className="p-2 text-gray-600">{comp.unit}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="p-4 text-center text-gray-500">
                            Select a product to view BOM components
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Material Availability Check */}
              {materialRequirements.length > 0 && (
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="size-4 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-yellow-800">Material Availability Check</p>
                      <p className="text-xs text-yellow-700 mt-1">
                        Please verify that all required materials are available in stock before starting production.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Summary */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-blue-800 mb-2">Production Summary</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-blue-600">Product</p>
                    <p className="font-medium">{formData.productModel || 'Not selected'}</p>
                  </div>
                  <div>
                    <p className="text-blue-600">Quantity</p>
                    <p className="font-medium">{formData.quantity} units</p>
                  </div>
                  <div>
                    <p className="text-blue-600">Batches</p>
                    <p className="font-medium">{formData.numberOfBatches} batches</p>
                  </div>
                  <div>
                    <p className="text-blue-600">Production Line</p>
                    <p className="font-medium">{formData.productionLine || 'Not selected'}</p>
                  </div>
                </div>
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
                    if (activeTab === 'schedule') setActiveTab('basic');
                    if (activeTab === 'batch') setActiveTab('schedule');
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
            {activeTab !== 'batch' ? (
              <Button
                type="button"
                onClick={() => {
                  if (activeTab === 'basic') setActiveTab('schedule');
                  if (activeTab === 'schedule') setActiveTab('batch');
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
                    <Factory className="size-4 mr-2" />
                    Create Order
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