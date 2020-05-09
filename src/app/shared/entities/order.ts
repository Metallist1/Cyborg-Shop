export interface Order {
  uid?: string;
  userID?: string;
  estimatedShippingTime: number;
  shippingID: number;
  totalCost: number;
  status: string;
}
