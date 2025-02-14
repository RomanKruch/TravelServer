import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

class Cords {
  @Prop({ required: true })
  lat: number;
  @Prop({ required: true })
  lng: number;
}

@Schema()
export class Tour extends Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop()
  photo: string;

  @Prop()
  location: string;

  @Prop()
  price: number;

  @Prop()
  id: string;

  @Prop({ type: Cords })
  cords: Cords;
}

export const TourSchema = SchemaFactory.createForClass(Tour);
