import { IsNumber, IsNotEmpty, IsUrl, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class Cords {
  @IsNotEmpty({ message: 'Lat is required!' })
  @IsNumber({}, { message: 'Lat must be a number!' })
  lat: number;

  @IsNotEmpty({ message: 'Lng is required!' })
  @IsNumber({}, { message: 'Lng must be a number!' })
  lng: number;
}

export class TourDto {
  @IsNotEmpty({ message: 'Title is required!' })
  title: string;

  @IsNotEmpty({ message: 'Description is required!' })
  description: string;

  @IsNotEmpty({ message: 'Photo is required!' })
  @IsUrl({}, { message: 'Photo must be a valid url!' })
  photo: string;

  @IsNotEmpty({ message: 'Location is required!' })
  location: string;

  @IsNotEmpty({ message: 'Price is required!' })
  @IsNumber({}, { message: 'Price must be a number!' })
  price: number;

  @ValidateNested()
  @Type(() => Cords)
  cords: Cords;
}
