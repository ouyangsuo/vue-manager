import axios from "axios";
import { doGet } from "./crud";

/* 获取正在热映列表 */
export async function getPlayings(page) {
  const {
    data: { films },
  } = await doGet(`/movie/playings${page%2?1:2}`, { page });
  return films;
}

/* 获取即将上映列表 */
export async function getComings() {
  const {
    data: { films },
  } = await doGet("/movie/comings");
  return films;
}

/* 获取电影详情 */
// https://m.maizuo.com/gateway?filmId=6119
export async function getDetail(filmId) {
  const {data:{data:{film}}} = await doGet(
    "https://m.maizuo.com/gateway",
    { filmId },
    {
      headers: {
        // "X-Client-Info": `{"a":"3000","ch":"1002","v":"5.2.1","e":"16659985993992258000977921","bc":"440100"}`,
        "X-Host": "mall.film-ticket.film.info",
      },
    },
    axios.create({})
  );

  return film;
}
