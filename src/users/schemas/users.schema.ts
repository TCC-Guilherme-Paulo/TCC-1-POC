import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { cpf } from 'cpf-cnpj-validator';
import { RiskGroupsEnum } from 'src/utils/enums/riskGroupsEnum';

export class Address {
  @Prop()
  cep?: string;

  @Prop()
  number?: number;

  @Prop()
  city?: string;

  @Prop()
  state?: string;

  @Prop()
  complement?: string;
}

export class Location {
  @Prop({ type: String, enum: ['Point'], default: 'Point' })
  type: string;

  @Prop({ type: [Number], index: '2dsphere' })
  coordinates: number[];
}

@Schema({ collection: 'user', timestamps: { createdAt: 'registerDate' } })
export class Users extends Document {
  @Prop({ required: true, index: true })
  name: string;

  @Prop()
  deviceId?: string;

  @Prop({ required: true, unique: true, index: true })
  email: string;

  @Prop({ required: true })
  birthday: Date;

  @Prop({
    required: true,
    unique: true,
    index: true,
    validate: {
      validator: (v: string) => cpf.isValid(v),
      message: (props) => `${props.value} não é um CPF válido`,
    },
  })
  cpf: string;

  @Prop({ type: [String], enum: Object.values(RiskGroupsEnum) })
  riskGroup?: RiskGroupsEnum[];

  @Prop()
  photo?: string;

  @Prop()
  notificationToken?: string;

  @Prop({ type: Address })
  address?: Address;

  @Prop({ default: false })
  isMentalHealthProfessional: boolean;

  @Prop({ type: Location, index: '2dsphere' })
  location?: Location;

  @Prop()
  phone?: string;

  @Prop({ default: true })
  active: boolean;

  @Prop({ default: '-' })
  biography: string;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
