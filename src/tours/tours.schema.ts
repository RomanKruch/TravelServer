import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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

  @Prop({ type: Object })
  cords: { lat: number; lng: number };
}

export const TourSchema = SchemaFactory.createForClass(Tour);