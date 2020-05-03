import GDrive from "./GDrive";

const permissions = "/permissions";

export default class Permissions {
   create(fileId, params) {
      const body = JSON.stringify(params);
      
      return fetch(`${GDrive._urlFiles}/${fileId}${permissions}`, {
         method: "POST",
         headers: GDrive._createHeaders(
            GDrive._contentTypeJson,
            body.length
         ),
         body
      });
   }

   list(fileId) {
      return fetch(`${GDrive._urlFiles}/${fileId}${permissions}`, {
         headers: GDrive._createHeaders()
      });
   }

   update(fileId, params) {
      const body = JSON.stringify(params);

      return fetch(`${GDrive._urlFiles}/${fileId}${permissions}`, {
         method: "PUT",
         headers: GDrive._createHeaders(
            GDrive._contentTypeJson,
            body.length
         ),
         body
      }); 
   }
}
