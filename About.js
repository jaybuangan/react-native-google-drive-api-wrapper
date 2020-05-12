import Helper from "./Helper";

export default class About {
   get(fields) {
    const parameters = Helper._stringifyQueryParams(fields);

      return fetch(`${Helper._urlAbout}${parameters}`, {
        headers: Helper._createHeaders()
      });
   }
}
