import { doGet } from "./crud";

export async function getNews() {
  const {
    data: {
      data: { content },
    },
  } = await doGet("/news/list");
  return content
}
