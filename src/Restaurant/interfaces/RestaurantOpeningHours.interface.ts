import { DAYS_WEEK } from "@prisma/client";

export interface RestaurantOpeningHoursI {
    restaurant_id: number;
    name: string;
    image: string;
    address: string;
    opening_hours?: {
        of: string;
        to: string;
        in: DAYS_WEEK[];
    }
}