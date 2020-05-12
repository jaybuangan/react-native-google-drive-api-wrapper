//import RNFS from "react-native-fs";
import utf8 from "utf8";
import {
   StaticUtils,
   ArrayStringifier
} from "simple-common-utils";
import {_stringifyQueryParams, _createHeaders, _urlFiles, _contentTypeJson } from "./Helper";


const uploadUrl = "https://www.googleapis.com/upload/drive/v2/files";
export default class Files {
   static mimeFolder = "application/vnd.google-apps.folder";
   
   constructor(params = {}) {
      this.params = params;
      
      [
         [ "boundary", "foo_bar_baz" ]
      ].forEach(nameValue => this.params[nameValue[0]] =
         this.params[nameValue[0]] || nameValue[1]);
   }
   
   createFileMultipart(media, mediaType, metadata, isBase64) {
      const ddb = `--${this.params.boundary}`;
      const ending = `\n${ddb}--`;
      
      let body = `\n${ddb}\n` +
         `Content-Type: ${_contentTypeJson}\n\n` +
         `${JSON.stringify(metadata)}\n\n${ddb}\n` +
         (isBase64 ? "Content-Transfer-Encoding: base64\n" : '') +
         `Content-Type: ${mediaType}\n\n`;
      
      if (media.constructor == String) {
         body += `${media}${ending}`;
      } else {
         body = new Uint8Array(
            StaticUtils.encodedUtf8ToByteArray(utf8.encode(body))
            .concat(media)
            .concat(StaticUtils.encodedUtf8ToByteArray(utf8.encode(ending))));
      }
      
      return fetch(
         `${uploadUrl}?uploadType=multipart`, {
            method: "POST",
            headers: _createHeaders(
               `multipart/related; boundary=${this.params.boundary}`,
               body.length
            ),
            body
         });
   }
   
   copy ({fileId, title, parents}) {
      let metadata = {'title' : title, 'parents': parents};
      const body = JSON.stringify(metadata);
      return fetch(`${_urlFiles}/${fileId}/copy`, {
         method: "POST",
         headers: _createHeaders(
               _contentTypeJson,
               body.length),
         body
      })
   }
   delete(fileId) {
      return fetch(`${_urlFiles}/${fileId}`, {
         method: "DELETE",
         headers: _createHeaders()
      });
   }
   
   async safeCreateFolder(metadata) {
      let id = await this.getId(metadata.title, metadata.parents, Files.mimeFolder);
      
      if (!id) {
         metadata.mimeType = Files.mimeFolder;
         metadata.parents = (metadata.parents != null) ? metadata.parents : 'root';

         const body = JSON.stringify(metadata);
         
         result = await fetch(_urlFiles, {
            method: "POST",
            headers: _createHeaders(
               _contentTypeJson,
               body.length),
            body
         });
         
         if (!result.ok) {
            throw result;
         }
         
         id = (await result.json()).id;
      }
      
      return id;
   }
   
   async getId(title, parents, mimeType, trashed = false) {
      const queryParams = {title, trashed};
      
      if (mimeType) {
         queryParams.mimeType = mimeType;
      }

      const parentsParam = (parents == null) ? 'root' : parents[0].id;
      
      let result = await this.list({
         q: _stringifyQueryParams(queryParams, "",
            " and ", true) + ` and '${parentsParam}' in parents`
      });
      
      if (!result.ok) {
         throw result;
      }

      const listResult = await result.json();
      const file = listResult.items[0];
      
      return file ? file.id : file;
   }
   
   get(fileId, queryParams) {
      const parameters = _stringifyQueryParams(queryParams);
      
      return fetch(`${_urlFiles}/${fileId}${parameters}`, {
         headers: _createHeaders()
      });
   }
   
   download(fileId, downloadFileOptions, queryParams = {}) {
      queryParams.alt = "media";
      
      const parameters = _stringifyQueryParams(queryParams);
      
      downloadFileOptions.fromUrl = `${_urlFiles}/${fileId}${parameters}`;
      
      downloadFileOptions.headers = Object.assign({
         "Authorization": `Bearer ${Helper.accessToken}`
      }, downloadFileOptions.headers);
      
     // return RNFS.downloadFile(downloadFileOptions);
   }
   
   list(queryParams) {
      return fetch(`${Helper._urlFiles}${_stringifyQueryParams(queryParams)}`, {
         headers: _createHeaders()
      });
   }
   
   export(fileId, mimeType) {
      return fetch(`${Helper._urlFiles}/${fileId}/export?mimeType=${mimeType}`, {
         headers: _createHeaders()
      });
   }
}
