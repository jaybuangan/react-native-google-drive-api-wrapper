import Files from "./Files";
import Permissions from "./Permissions";
import About from "./About";
import Helper from "./Helper";
import Properties from "./Properties";

export default class GDrive {
   static init(params = {}) {
      GDrive.files = new Files(params.files);
      GDrive.permissions = new Permissions();
      GDrive.about = new About();
      GDrive.properties = new Properties();
   }
   
   static setAccessToken(accessToken) {
      Helper._accessToken = accessToken;
   }
   
   static isInitialized() {
      return !!Helper._accessToken;
   }
   
   
}
