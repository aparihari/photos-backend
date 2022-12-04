import { AppUser } from '../interfaces/app-user.interface';
import User from '../models/user.model';

export class UserService {
  public async getUser(req: AppUser) {
    try {
      const user = await User.findOne({ _id: req.id });
      return user;
    } catch (error) {
      throw error;
    }
  }

  public async createUser(payload: any) {
    try {
      const user = await User.create(payload);
      return user;
    } catch (error) {
      throw error;
    }
  }
}

export default new UserService();
