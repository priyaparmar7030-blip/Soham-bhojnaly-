export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  unit?: string;
}

export interface PreOrderForm {
  name: string;
  phone: string;
  arrivalTime: string;
  specialInstructions: string;
}
