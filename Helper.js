import {
    StaticUtils,
    ArrayStringifier
 } from "simple-common-utils";

 export default class Helper {
    static _urlFiles = "https://www.googleapis.com/drive/v2/files";
    static _urlAbout = "https://www.googleapis.com/drive/v2/about";
    static  _contentTypeJson = "application/json; charset=UTF-8";
    static _accessToken = "";

    static _stringifyQueryParams = (queryParams, prefix = "?", separator = "&", quoteIfString) => {
        const array = [];
        
        Object.keys(queryParams).forEach(key => array.push(
           `${key}=${StaticUtils.safeQuoteIfString(queryParams[key], quoteIfString)}`));
        
        return new ArrayStringifier(array)
           .setPrefix(prefix)
           .setSeparator(separator)
           .process();
     }

     
    static _createHeaders = (contentType, contentLength, ... additionalPairs) => {
        let pairs = [
        [ "Authorization", `Bearer ${this._accessToken}` ]
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

    