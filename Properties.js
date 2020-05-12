import GDrive from "./GDrive";
import {_stringifyQueryParams } from "./Helper";

const properties = "/properties";

export default class Properties {
   insert({fileId, resource}) {
      const body = JSON.stringify(resource);
      
      return fetch(`${GDrive._urlFiles}/${fileId}${properties}`, {
         method: "POST",
         headers: GDrive._createHeaders(
            GDrive._contentTypeJson,
            body.length
         ),
         body
      });
   }

}
