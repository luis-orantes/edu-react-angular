
import { Rental } from 'src/app/rentals/shared/rental.model';

export class Booking {
  _id: string;
  startAt: string;
  endAt: string;
  price: number;
  guests: number;
  nights: number;
  rental: Rental;
  user: string;
}
