import Helper from "./Helper";

const properties = "/properties";

export default class Properties {
   insert({fileId, resource}) {
      const body = JSON.stringify(resource);
      
      return fetch(`${Helper._urlFiles}/${fileId}${properties}`, {
         method: "POST",
         headers: Helper._createHeaders(
            Helper._contentTypeJson,
            body.length
         ),
         body
      });
   }

}
