import RestAPIClient from 'services/RestAPIClient';
import { IUser } from './typings';

class UserService extends RestAPIClient {
  constructor() {
    super('');
  }

  getUserProfile = async (id?: string): Promise<IUser> => {
    return (await this.get(`user/${id}`, {})).data;
  };

  getMyProfile = async (): Promise<IUser> => {
    const res = await this.get('auth/validateToken');
    return res.data.profile;
  };

  update = async (req:Partial<IUser>): Promise<IUser> => {
    const id = req.id;
    delete req.id;
    delete req._id;
    delete req.created_at;
    delete req.email;
    const res = (await this.put(`user/${id}`, req)).data;
    delete res.password;
    delete res.confirmPassword;
    return res;
  };
}

export const userService = new UserService();
