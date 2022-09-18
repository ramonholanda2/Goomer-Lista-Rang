export interface FindRestaurant {
  restaurant_id: number;
  name: string;
  image: string;
  address: string;
  opening_hours_id?: number;
  hour_open?: string;
  hour_close?: string;
  days_week?: string[];
}
