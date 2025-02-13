import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../users/users.schema';
import { Types } from 'mongoose';

@Injectable()
export class AuthService {
    // constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    // async findByEmail(email: string) {
    //     return this.userModel.findOne({ email });
    // }

    // async findById(_id: Types.ObjectId): Promise<User> {
    //     return this.userModel.findOne({ _id });
    // }

    // async updateToken(_id: Types.ObjectId, token: string | null) {
    //     await this.userModel.findOneAndUpdate({ _id }, { token });
    // }
}

