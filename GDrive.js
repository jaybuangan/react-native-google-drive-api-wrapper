import Files from "./Files";
import Permissions from "./Permissions";
import About from "./About";
import {_stringifyQueryParams } from "./Helper";

export default class GDrive {
   static _urlFiles = "https://www.googleapis.com/drive/v2/files";
   static _contentTypeJson = "application/json; charset=UTF-8";
   
   static init(params = {}) {
      GDrive.files = new Files(params.files);
      GDrive.permissions = new Permissions();
      GDrive.about = new About();
   }
   
   static setAccessToken(accessToken) {
      GDrive.accessToken = accessToken;
   }
   
   static isInitialized() {
      return !!GDrive.accessToken;
   }
   
   static _createHeaders(contentType, contentLength, ... additionalPairs) {
      let pairs = [
         [ "Authorization", `Bearer ${GDrive.accessToken}` ]
      ];
      
      [
         [ "Content-Type", contentType] ,
         [ "Content-Length", contentLength ]
      ].forEach(data => data[1] ? pairs.push(data) : undefined);
      
      if (additionalPairs) {
         pairs = pairs.concat(additionalPairs);
      }
      
      const headers = new Headers();
      
      for (let pair of pairs) {
         headers.append(pair[0], pair[1]);
      }
      
      return headers;
   }
}
