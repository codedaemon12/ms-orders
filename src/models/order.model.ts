export interface Order {
    id: string;
    customer_id: string;
    item: string;
    quantity: number;
    price: number;
    createdAt: Date;
  }
