import Helper from "./Helper";

const permissions = "/permissions";

export default class Permissions {
   create({fileId, queryParams, requestBody}) {
      const query = Helper._stringifyQueryParams(queryParams);
      const body = JSON.stringify(requestBody);
      
      return fetch(`${Helper._urlFiles}/${fileId}${permissions}${query}`, {
         method: "POST",
         headers: Helper._createHeaders(
            Helper._contentTypeJson,
            body.length
         ),
         body
      });
   }

   list({fileId}) {
      return fetch(`${Helper._urlFiles}/${fileId}${permissions}`, {
         headers: Helper._createHeaders()
      });
   }

   update(fileId, params) {
      
      return fetch(`${Helper._urlFiles}/${fileId}${permissions}`, {
         method: "PUT",
         headers: Helper._createHeaders(
            Helper._contentTypeJson,
            body.length
         ),
         body
      }); 
   }
}
