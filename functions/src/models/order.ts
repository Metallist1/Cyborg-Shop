export interface Order {
  uId?:string;
  estimatedShippingTime: number;
  shippingID: string;
  status: string;
  totalCost: number;
  userID: string;
}
