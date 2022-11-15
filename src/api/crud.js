/* 通用的增删改查方法 */
import instance from "./instance";

/* 通用的POST */
export async function doPost(url, data, config) {
  try {
    const ret = await instance.post(url, data, config);
    return ret;
  } catch (err) {
    console.log("doPost:err=", err);
  }
}

/* 通用的GET: doGet("/films/5",{vip:false,free:1}) => /films/5?vip=false&freee=1*/
export async function doGet(url, data, config, reqInstance=instance) {
  try {
    /* 将GET要携带的数据做成查询参数拼接到URL中 */
    if (data) {
      const params = new URLSearchParams();
      for (let key in data) {
        params.append(key, data[key]);
      }
      url += `?${params.toString()}`;
    }

    const ret = await reqInstance.get(url, config);
    return ret;
  } catch (err) {
    console.log("doGet:err=", err);
  }
}

/* 通用的PUT */
export async function doPut(url, data, config) {
  try {
    const ret = await instance.put(url, data, config);
    return ret;
  } catch (err) {
    console.log("doPut:err=", err);
  }
}

/* 通用的DELETE */
export async function doDelete(url, config) {
  try {
    const ret = await instance.delete(url, config);
    return ret;
  } catch (err) {
    console.log("doGet:err=", err);
  }
}
