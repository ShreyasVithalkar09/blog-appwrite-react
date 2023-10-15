import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (userAccount) {
        // call another method
        return this.login({ email, password });
      } else return userAccount;
    } catch (error) {
      throw new Error(error);
    }
  }

  async login({ email, password }) {
    try {
      const user = await this.account.createEmailSession(email, password);
      if (user) return user;
      else throw new Error("Invalid Email or Password");
    } catch (error) {
      throw new Error(error);
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      // throw new Error(error);
      console.log(error);
    }

    return null;
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAuthor(userId) {
    console.log("USERID---", userId);
    try {
      // return await ;
    } catch (error) {
      throw new Error(error);
    }
  }
}

const authService = new AuthService();

//

export default authService;
