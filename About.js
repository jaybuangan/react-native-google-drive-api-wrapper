import GDrive from "./GDrive";

const about = "/about";

export default class About {
   get(fileId, params) {
      const body = JSON.stringify(params);
      
      return fetch(`${GDrive._urlFiles}/${fileId}${about}`, {
        headers: GDrive._createHeaders()
      });
   }
}
