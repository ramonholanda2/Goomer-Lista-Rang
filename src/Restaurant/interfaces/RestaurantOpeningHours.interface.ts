
export interface RestaurantOpeningHoursI {
    restaurant_id: number;
    name: string;
    image: string;
    address: string;
    opening_hours?: {
        hour_open: string; 
        hour_close: string;
        days_week: string[];
    }
}