import { DAYS_WEEK } from "@prisma/client";

export interface FindRestaurant {
  restaurant_id: number;
  name: string;
  image: string;
  address: string;
  opening_hours_id?: number;
  of?: string;
  to?: string;
  in?: DAYS_WEEK[];
}
