// src/components/production/StockAdjustmentModal.tsx
import { useState } from 'react';
import { 
  Package, Plus, Minus, ClipboardList, Calendar, User,
  FileText, AlertCircle, Search, Barcode, QrCode,
  ArrowRightLeft, RotateCcw
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

interface StockAdjustmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

interface AdjustmentItem {
  id: string;
  type: 'raw' | 'finished';
  itemId: string;
  itemName: string;
  sku?: string;
  unit: string;
  currentStock: number;
  adjustmentType: 'add' | 'subtract' | 'set';
  adjustmentQty: number;
  newStock: number;
  reason: string;
  location: string;
}

interface StockTransfer {
  id: string;
  fromLocation: string;
  toLocation: string;
  itemType: 'raw' | 'finished';
  itemId: string;
  itemName: string;
  quantity: number;
  unit: string;
  transferDate: string;
  remarks: string;
}

const adjustmentReasons = [
  'Physical Count Variance',
  'Damaged Goods',
  'Quality Rejection',
  'Expired Stock',
  'Return to Vendor',
  'Customer Return',
  'Production Consumption',
  'Production Output',
  'Sample Issue',
  'Other',
];

const locations = [
  'Warehouse A',
  'Plant Store',
  'Chemical Store',
  'FG Warehouse',
  'Production Line 1',
  'Production Line 2',
  'QC Lab',
  'Dispatch Bay',
];

const rawMaterials = [
  { id: 'RM-001', name: 'Lead Ingots', unit: 'Kg', currentStock: 15000, location: 'Warehouse A' },
  { id: 'RM-002', name: 'Lead Oxide', unit: 'Kg', currentStock: 3500, location: 'Plant Store' },
  { id: 'RM-003', name: 'Sulfuric Acid', unit: 'Litre', currentStock: 8000, location: 'Chemical Store' },
  { id: 'RM-004', name: 'PP Granules', unit: 'Kg', currentStock: 2500, location: 'Warehouse A' },
  { id: 'RM-005', name: 'Separators', unit: 'Pcs', currentStock: 45000, location: 'Plant Store' },
  { id: 'RM-006', name: 'Terminals', unit: 'Pcs', currentStock: 18000, location: 'Plant Store' },
  { id: 'RM-007', name: 'Grids', unit: 'Pcs', currentStock: 12000, location: 'Warehouse A' },
];

const finishedGoods = [
  { id: 'NES-150AH', name: 'Inverter Battery 150AH', sku: 'NES-150AH', unit: 'Units', currentStock: 1250, location: 'FG Warehouse' },
  { id: 'NES-40AH', name: 'Bike Battery 40AH', sku: 'NES-40AH', unit: 'Units', currentStock: 3450, location: 'FG Warehouse' },
  { id: 'NES-100AH', name: 'E-Rickshaw Battery 100AH', sku: 'NES-100AH', unit: 'Units', currentStock: 2100, location: 'FG Warehouse' },
  { id: 'NES-200AH', name: 'Solar Battery 200AH', sku: 'NES-200AH', unit: 'Units', currentStock: 850, location: 'FG Warehouse' },
  { id: 'NES-AUTO-150AH', name: 'Automotive Battery 150AH', sku: 'NES-AUTO-150AH', unit: 'Units', currentStock: 620, location: 'FG Warehouse' },
];

export function StockAdjustmentModal({ open, onOpenChange, onSuccess }: StockAdjustmentModalProps) {
  const [activeTab, setActiveTab] = useState<'adjustment' | 'transfer' | 'audit'>('adjustment');
  const [itemType, setItemType] = useState<'raw' | 'finished'>('raw');
  const [selectedItem, setSelectedItem] = useState<string>('');
  const [adjustmentType, setAdjustmentType] = useState<'add' | 'subtract' | 'set'>('add');
  const [adjustmentQty, setAdjustmentQty] = useState<number>(0);
  const [reason, setReason] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [remarks, setRemarks] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});

  // Transfer state
  const [transfer, setTransfer] = useState<Partial<StockTransfer>>({
    fromLocation: '',
    toLocation: '',
    itemType: 'raw',
    quantity: 0,
    transferDate: new Date().toISOString().split('T')[0],
  });

  const getCurrentItem = () => {
    if (itemType === 'raw') {
      return rawMaterials.find(m => m.id === selectedItem);
    }
    return finishedGoods.find(g => g.id === selectedItem);
  };

  const calculateNewStock = (): number => {
    const item = getCurrentItem();
    if (!item) return 0;

    switch (adjustmentType) {
      case 'add':
        return item.currentStock + adjustmentQty;
      case 'subtract':
        return Math.max(0, item.currentStock - adjustmentQty);
      case 'set':
        return adjustmentQty;
      default:
        return item.currentStock;
    }
  };

  const validateAdjustment = (): boolean => {
    const newErrors: Partial<Record<string, string>> = {};

    if (!selectedItem) newErrors.selectedItem = 'Please select an item';
    if (!adjustmentQty || adjustmentQty <= 0) newErrors.adjustmentQty = 'Quantity must be greater than 0';
    if (!reason) newErrors.reason = 'Reason is required';
    if (!location) newErrors.location = 'Location is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateTransfer = (): boolean => {
    const newErrors: Partial<Record<string, string>> = {};

    if (!transfer.fromLocation) newErrors.fromLocation = 'From location is required';
    if (!transfer.toLocation) newErrors.toLocation = 'To location is required';
    if (transfer.fromLocation === transfer.toLocation) {
      newErrors.toLocation = 'From and To locations must be different';
    }
    if (!transfer.itemId) newErrors.itemId = 'Please select an item';
    if (!transfer.quantity || transfer.quantity <= 0) newErrors.quantity = 'Quantity must be greater than 0';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAdjustmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateAdjustment()) return;

    setIsSubmitting(true);
    
    const item = getCurrentItem();
    const adjustmentData = {
      type: 'adjustment',
      itemType,
      itemId: selectedItem,
      itemName: item?.name,
      adjustmentType,
      adjustmentQty,
      previousStock: item?.currentStock,
      newStock: calculateNewStock(),
      reason,
      location,
      remarks,
      adjustedBy: 'Current User',
      adjustmentDate: new Date().toISOString(),
    };
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Stock Adjustment:', adjustmentData);
    setIsSubmitting(false);
    onOpenChange(false);
    onSuccess?.();
    resetForm();
  };

  const handleTransferSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateTransfer()) return;

    setIsSubmitting(true);
    
    const item = transfer.itemType === 'raw' 
      ? rawMaterials.find(m => m.id === transfer.itemId)
      : finishedGoods.find(g => g.id === transfer.itemId);
    
    const transferData = {
      ...transfer,
      itemName: item?.name,
      unit: item?.unit,
      transferId: `TRF/${new Date().getFullYear()}/${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
      status: 'In Transit',
      initiatedBy: 'Current User',
    };
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Stock Transfer:', transferData);
    setIsSubmitting(false);
    onOpenChange(false);
    onSuccess?.();
    resetForm();
  };

  const resetForm = () => {
    setSelectedItem('');
    setAdjustmentType('add');
    setAdjustmentQty(0);
    setReason('');
    setLocation('');
    setRemarks('');
    setTransfer({
      fromLocation: '',
      toLocation: '',
      itemType: 'raw',
      quantity: 0,
      transferDate: new Date().toISOString().split('T')[0],
    });
    setErrors({});
    setActiveTab('adjustment');
  };

  const filteredItems = itemType === 'raw'
    ? rawMaterials.filter(m => 
        m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.id.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : finishedGoods.filter(g => 
        g.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        g.id.toLowerCase().includes(searchTerm.toLowerCase())
      );

  const currentItem = getCurrentItem();
  const newStock = calculateNewStock();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <Package className="size-5" />
            Stock Adjustment
          </DialogTitle>
          <DialogDescription>
            Adjust stock levels, transfer between locations, or record stock audit.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="adjustment">Quantity Adjustment</TabsTrigger>
            <TabsTrigger value="transfer">Stock Transfer</TabsTrigger>
            <TabsTrigger value="audit">Stock Audit</TabsTrigger>
          </TabsList>

          {/* Quantity Adjustment Tab */}
          <TabsContent value="adjustment" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Label className="w-24">Item Type</Label>
                <RadioGroup 
                  value={itemType} 
                  onValueChange={(v) => {
                    setItemType(v as 'raw' | 'finished');
                    setSelectedItem('');
                  }}
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="raw" id="raw" />
                    <Label htmlFor="raw" className="cursor-pointer">Raw Material</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="finished" id="finished" />
                    <Label htmlFor="finished" className="cursor-pointer">Finished Goods</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>
                  Search & Select Item <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                  <Input
                    placeholder="Search by name or ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                {searchTerm && (
                  <div className="border rounded-lg max-h-48 overflow-y-auto">
                    {filteredItems.map((item) => (
                      <div
                        key={item.id}
                        className={cn(
                          "p-3 cursor-pointer hover:bg-gray-50 flex justify-between items-center",
                          selectedItem === item.id && "bg-blue-50 border-l-4 border-blue-500"
                        )}
                        onClick={() => {
                          setSelectedItem(item.id);
                          setLocation(item.location);
                          setSearchTerm('');
                        }}
                      >
                        <div>
                          <p className="text-sm font-medium text-gray-900">{item.name}</p>
                          <p className="text-xs text-gray-500">{item.id} • {item.unit}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-900">{item.currentStock.toLocaleString()} {item.unit}</p>
                          <p className="text-xs text-gray-500">Current Stock</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {errors.selectedItem && <p className="text-xs text-red-500">{errors.selectedItem}</p>}
              </div>

              {currentItem && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{currentItem.name}</p>
                      <p className="text-xs text-gray-600">{currentItem.id}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">{currentItem.currentStock.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">Current Stock ({currentItem.unit})</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label>Adjustment Type</Label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant={adjustmentType === 'add' ? 'default' : 'outline'}
                    onClick={() => setAdjustmentType('add')}
                    className="flex-1"
                  >
                    <Plus className="size-4 mr-1" />
                    Add Stock
                  </Button>
                  <Button
                    type="button"
                    variant={adjustmentType === 'subtract' ? 'default' : 'outline'}
                    onClick={() => setAdjustmentType('subtract')}
                    className="flex-1"
                  >
                    <Minus className="size-4 mr-1" />
                    Subtract Stock
                  </Button>
                  <Button
                    type="button"
                    variant={adjustmentType === 'set' ? 'default' : 'outline'}
                    onClick={() => setAdjustmentType('set')}
                    className="flex-1"
                  >
                    <RotateCcw className="size-4 mr-1" />
                    Set Exact
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="adjustmentQty">
                  Adjustment Quantity <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="adjustmentQty"
                  type="number"
                  min="0"
                  step={currentItem?.unit === 'Pcs' ? '1' : '0.1'}
                  value={adjustmentQty}
                  onChange={(e) => setAdjustmentQty(Number(e.target.value))}
                  className={errors.adjustmentQty ? 'border-red-500' : ''}
                />
                {errors.adjustmentQty && <p className="text-xs text-red-500">{errors.adjustmentQty}</p>}
              </div>

              {currentItem && adjustmentQty > 0 && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Previous Stock:</span>
                    <span className="text-sm">{currentItem.currentStock.toLocaleString()} {currentItem.unit}</span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-sm text-gray-600">Adjustment:</span>
                    <span className={cn(
                      "text-sm font-medium",
                      adjustmentType === 'add' ? 'text-green-600' : 'text-red-600'
                    )}>
                      {adjustmentType === 'add' ? '+' : adjustmentType === 'subtract' ? '-' : '→'} {adjustmentQty.toLocaleString()} {currentItem.unit}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-2 pt-2 border-t">
                    <span className="text-sm font-medium text-gray-900">New Stock:</span>
                    <span className="text-lg font-bold text-blue-600">{newStock.toLocaleString()} {currentItem.unit}</span>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="location">
                  Location <span className="text-red-500">*</span>
                </Label>
                <Select value={location} onValueChange={setLocation}>
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
                <Label htmlFor="reason">
                  Reason for Adjustment <span className="text-red-500">*</span>
                </Label>
                <Select value={reason} onValueChange={setReason}>
                  <SelectTrigger className={errors.reason ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select reason" />
                  </SelectTrigger>
                  <SelectContent>
                    {adjustmentReasons.map((r) => (
                      <SelectItem key={r} value={r}>{r}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.reason && <p className="text-xs text-red-500">{errors.reason}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="remarks">Remarks (Optional)</Label>
                <Textarea
                  id="remarks"
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  placeholder="Additional notes..."
                  rows={2}
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
              <Button onClick={handleAdjustmentSubmit} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <span className="mr-2">Processing...</span>
                    <div className="size-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  </>
                ) : (
                  <>
                    <Package className="size-4 mr-2" />
                    Save Adjustment
                  </>
                )}
              </Button>
            </DialogFooter>
          </TabsContent>

          {/* Stock Transfer Tab */}
          <TabsContent value="transfer" className="space-y-4">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fromLocation">
                    From Location <span className="text-red-500">*</span>
                  </Label>
                  <Select 
                    value={transfer.fromLocation} 
                    onValueChange={(v) => setTransfer(prev => ({ ...prev, fromLocation: v }))}
                  >
                    <SelectTrigger className={errors.fromLocation ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select source" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((loc) => (
                        <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.fromLocation && <p className="text-xs text-red-500">{errors.fromLocation}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="toLocation">
                    To Location <span className="text-red-500">*</span>
                  </Label>
                  <Select 
                    value={transfer.toLocation} 
                    onValueChange={(v) => setTransfer(prev => ({ ...prev, toLocation: v }))}
                  >
                    <SelectTrigger className={errors.toLocation ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select destination" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.filter(loc => loc !== transfer.fromLocation).map((loc) => (
                        <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.toLocation && <p className="text-xs text-red-500">{errors.toLocation}</p>}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Label className="w-24">Item Type</Label>
                <RadioGroup 
                  value={transfer.itemType} 
                  onValueChange={(v) => {
                    setTransfer(prev => ({ ...prev, itemType: v as 'raw' | 'finished', itemId: '' }));
                  }}
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="raw" id="transfer-raw" />
                    <Label htmlFor="transfer-raw" className="cursor-pointer">Raw Material</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="finished" id="transfer-finished" />
                    <Label htmlFor="transfer-finished" className="cursor-pointer">Finished Goods</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>
                  Select Item <span className="text-red-500">*</span>
                </Label>
                <Select 
                  value={transfer.itemId} 
                  onValueChange={(v) => setTransfer(prev => ({ ...prev, itemId: v }))}
                >
                  <SelectTrigger className={errors.itemId ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select item" />
                  </SelectTrigger>
                  <SelectContent>
                    {(transfer.itemType === 'raw' ? rawMaterials : finishedGoods).map((item) => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.name} ({item.currentStock.toLocaleString()} {item.unit})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.itemId && <p className="text-xs text-red-500">{errors.itemId}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quantity">
                    Quantity <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    value={transfer.quantity}
                    onChange={(e) => setTransfer(prev => ({ ...prev, quantity: Number(e.target.value) }))}
                    className={errors.quantity ? 'border-red-500' : ''}
                  />
                  {errors.quantity && <p className="text-xs text-red-500">{errors.quantity}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="transferDate">Transfer Date</Label>
                  <Input
                    id="transferDate"
                    type="date"
                    value={transfer.transferDate}
                    onChange={(e) => setTransfer(prev => ({ ...prev, transferDate: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="transferRemarks">Remarks (Optional)</Label>
                <Textarea
                  id="transferRemarks"
                  value={transfer.remarks}
                  onChange={(e) => setTransfer(prev => ({ ...prev, remarks: e.target.value }))}
                  placeholder="Additional notes..."
                  rows={2}
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
              <Button onClick={handleTransferSubmit} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <span className="mr-2">Processing...</span>
                    <div className="size-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  </>
                ) : (
                  <>
                    <ArrowRightLeft className="size-4 mr-2" />
                    Create Transfer
                  </>
                )}
              </Button>
            </DialogFooter>
          </TabsContent>

          {/* Stock Audit Tab */}
          <TabsContent value="audit" className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <ClipboardList className="size-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-800">Stock Audit Information</p>
                  <p className="text-xs text-blue-600 mt-1">
                    Use this section to record physical stock counts and compare with system stock.
                    An audit ID will be auto-generated.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="auditLocation">Audit Location</Label>
                  <Select defaultValue={locations[0]}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((loc) => (
                        <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="auditDate">Audit Date</Label>
                  <Input
                    id="auditDate"
                    type="date"
                    defaultValue={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="auditorName">Auditor Name</Label>
                <Input
                  id="auditorName"
                  placeholder="Enter auditor name"
                  defaultValue="Current User"
                />
              </div>

              <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="p-2 text-left text-xs text-gray-600">Item</th>
                      <th className="p-2 text-right text-xs text-gray-600">System Stock</th>
                      <th className="p-2 text-right text-xs text-gray-600">Physical Count</th>
                      <th className="p-2 text-right text-xs text-gray-600">Variance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rawMaterials.slice(0, 3).map((item) => (
                      <tr key={item.id} className="border-t">
                        <td className="p-2">{item.name}</td>
                        <td className="p-2 text-right">{item.currentStock.toLocaleString()}</td>
                        <td className="p-2">
                          <Input
                            type="number"
                            defaultValue={item.currentStock}
                            className="w-24 text-right ml-auto"
                          />
                        </td>
                        <td className="p-2 text-right">0</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="space-y-2">
                <Label htmlFor="auditRemarks">Audit Remarks</Label>
                <Textarea
                  id="auditRemarks"
                  placeholder="Enter audit findings..."
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
              <Button onClick={() => {
                console.log('Audit recorded');
                onOpenChange(false);
                onSuccess?.();
              }}>
                <ClipboardList className="size-4 mr-2" />
                Complete Audit
              </Button>
            </DialogFooter>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}