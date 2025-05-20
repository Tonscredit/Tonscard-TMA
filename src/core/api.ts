import config from "./config";

import { getAuth } from "./storage";

async function requester(url: string, requestOptions: any) {
    try {
      return (await fetch(url, requestOptions)).json();
    } catch (e) {
      console.log("🐞 req error", e);
    }
  
    return false;
  }
  
  function request_method_get(headers: any) {
    var requestOptions = {
      method: "GET",
      headers: headers,
      redirect: "follow",
    };
    return requestOptions;
  }
  
  function request_method_post(bodys: any, headers: any) {
    var requestOptions = {
      method: "POST",
      headers: headers,
      body: bodys,
      redirect: "follow",
    };
  
    return requestOptions;
  }
  
  function request_get_unauth() {
    return request_method_get({});
  }

  function request_get_auth() {
    return request_method_get(
      {
        token:getAuth()
      }
    );
  }
  
  function request_post_unauth(data: any) {
    var h = new Headers();
  
    h.append("Content-Type", "application/json");
  
    return request_method_post(JSON.stringify(data), h);
  }

  function request_post_auth(data: any) {
    var h = new Headers();
  
    h.append("Content-Type", "application/json");
  
    h.append("token", getAuth());

    return request_method_post(JSON.stringify(data), h);
  }
  
  
  async function api_user_data() {
    try {
      return await requester(
        `${config.api.baseUrl+config.api.router.login}`,
        request_get_auth(),
      );
    } catch (e) {
      console.error(e);
  
      return 0;
    }
  }

    async function api_user_info() {
    try {
      return await requester(
        `${config.api.baseUrl+config.api.router.info}`,
        request_get_auth(),
      );
    } catch (e) {
      console.error(e);
  
      return 0;
    }
  }
  async function api_user_info_update(data:any) {
    try {
      return await requester(
        `${config.api.baseUrl+config.api.router.info}`,
        request_post_auth(
          data
        ),
      );
    } catch (e) {
      console.error(e);
      return 0;
    }
  }
  export {
    api_user_data,
    api_user_info,
    api_user_info_update
  }