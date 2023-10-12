import config from "../config/config";
import { Client, Account, ID } from "appwrite";

class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);

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
      const currentUser = await this.account.get();
      if (currentUser) return currentUser;
    } catch (error) {
      // throw new Error(error);
      console.log(error);
      return false;
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
}

const authService = new AuthService();

//

export default authService;
