import { AuthAPI, SigninData, SignupData } from '../api/AuthAPI';
import router from '../utils/Router';
import { Routes } from '../index';
import store from '../utils/Store';
import MessagesController from './MessagesController';

class AuthController {
  private readonly api: AuthAPI;

  constructor() {
    this.api = new AuthAPI();
  }

  public async signIn(data: SigninData) {
    try {
      await this.api.signin(data);
      if(store.getState().user){
        router.go(Routes.MESSENGER);
      }
    } catch (e: any) {
      alert(e);
      console.error(e);
    }
  }

  public async signUp(data: SignupData) {
    try {
      await this.api.signup(data);
      await this.fetchUser();
      if(store.getState().user){
        router.go(Routes.MESSENGER);
      }
    } catch (e: any) {
      console.error(e);
    }
  }

  public async fetchUser() {
    try {
      const user = await this.api.read();
      store.set('user', user);
    } catch (e) {
      console.error(e);
    }
  }

  public async logout() {
    try {
      await this.api.logout();
      MessagesController.closeAll();
      router.go(Routes.INDEX);
    } catch (e: any) {
      console.error(e.message);
    }
  }
}

export default new AuthController();
