import { FindOptionsWhere, Repository } from "typeorm";
import { User } from "../models/User";
import { appDataSource } from "./appDataSource";
import { Sale } from "../models/Sale";

export class UserService {

  private repository: Repository<User>;

  constructor(){
    this.repository = appDataSource.getRepository(User);
  }

  // Method to get all users
  async getAllUsers(filters: Record<string, any> = {}) {
    return await this.repository.find(filters);
  }


  // Method to get all users
  async getUsersWithSales() {
    return await appDataSource.manager.find(Sale, {
      relations: {
        user: true
      }
    })
  }

  // Method to get a user by ID
  async getUserById(id: string) {
    return await this.repository.findOneById(id);
  }

  // Method to get a user by where filter
  async getUserBy(where: FindOptionsWhere<User>) {
    return await this.repository.findOneBy(where);
  }

  // Method to get a user by with sales
  async getUserWithSales(where: FindOptionsWhere<User>) {
    return await this.repository.findOne({
      where,
      relations: {
        sales: true,
      }
    })
  }

  // Method to create a new user
  async createUser(data: { name: string; email: string; age: number; passwordHash: string }) {
    const user = new User();
    user.name = data.name;
    user.email = data.email;
    user.age = data.age;
    user.passwordHash = data.passwordHash;
    return await this.repository.save(user);
  }

  // Method to update a user
  async updateUser(id: number, data: { name?: string; email?: string; age: number; salary?: number }) {
    const user = await this.repository.findOneById(id);
    if (!user) {
      throw new Error(`User with id ${id} not found!`)
    }
    if (data.name) {
      user.name = data.name;
    }
    if (data.email) {
      user.email = data.email;
    }
    user.age = data.age;
    if (data.salary) {
      user.salary = data.salary;
    }
    await this.repository.save(user);
  }

  // Method to delete a user
  async deleteUser(id: string) {
    return await this.repository.delete(id);
  }
}

export const userService = new UserService();