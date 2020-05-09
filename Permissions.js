import GDrive from "./GDrive";
import {_stringifyQueryParams } from "./Helper";

const permissions = "/permissions";

export default class Permissions {
   create({fileId, queryParams, requestBody}) {
      const query = _stringifyQueryParams(queryParams);
      const body = JSON.stringify(requestBody);
      
      return fetch(`${GDrive._urlFiles}/${fileId}${permissions}${query}`, {
         method: "POST",
         headers: GDrive._createHeaders(
            GDrive._contentTypeJson,
            body.length
         ),
         body
      });
   }

   list({fileId}) {
      console.log('permissions: ', `${GDrive._urlFiles}/${fileId}${permissions}`)
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
