

export class Rental {

  static readonly RENTAL_CATEGORIES = [
    'apartment',
    'house',
    'condo',
  ];

  _id: string;
  title: string;
  city: string;
  street: string;
  category: string;
  image: string;
  numOfRooms: number;
  description: string;
  dailyPrice: number;
  shared: boolean;
  createdAt: string;
}
