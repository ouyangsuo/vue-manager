import { doGet } from './crud'

/* 获取城市列表 */
export async function getCities(){
    const {data:{cities}} = await doGet("/location/cities")
    return cities
}

/* 获取影院列表 */
export async function getCinemas(){
    const {data:{cinemas}} = await doGet("/location/cinemas")
    return cinemas
}