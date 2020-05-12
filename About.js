import GDrive from "./GDrive";

const about = "/about";

export default class About {
   get(fields) {
      return fetch(`${GDrive._urlFiles}${about}`, {
        headers: GDrive._createHeaders()
      });
   }
}
