import util from "util";
import path from "path";
import jetpack from "fs-jetpack";
import grayMatter from "gray-matter";
import marked from "marked";

const postDir = "posts";
const cached_getAllPost = [];
export async function getAllPost(force = false) {
  if (force) cached_getAllPost = [];
  if (cached_getAllPost.length) return cached_getAllPost;
  const files = await jetpack.findAsync(postDir, { matching: "*.md" });
  grayMatter.clearCache();
  for (let file of files) {
    let { data, content, excerpt } = grayMatter(await jetpack.readAsync(file));
    if (data && content) {
      let date = data.date || new Date("1990-04-04");
      let title = data.title;
      let author = data.author || "Admin";
      let [basePath, category, slug] = file.split("/");
      slug = slug.replace(".md", "");
      if (date.toISOString) {
        date = date.toISOString();
      }
      if (excerpt.length < 1) {
        excerpt = content.substring(0, 20);
      }
      content = marked(content);
      cached_getAllPost.push({
        title,
        date,
        author,
        category,
        slug,
        content,
        excerpt,
      });
    }
  }
  return cached_getAllPost;
}
export async function getSinglePost(category, slug) {
  const filename = path.join(postDir, category, slug + ".md");
  let output = null;
  try {
    const rawData = await jetpack.readAsync(filename);
    if (rawData) {
      grayMatter.clearCache();
      let { content, data, excerpt } = grayMatter(rawData);
      if (content && data) {
        let date = data.date || new Date("1990-04-04");
        let title = data.title;
        let author = data.author || "Admin";
        if (date.toISOString) {
          date = date.toISOString();
        }
        if (excerpt.length < 1) {
          excerpt = content.substring(0, 20);
        }
        content = marked(content);
        output = {
          title,
          date,
          author,
          category,
          slug,
          content,
          excerpt,
        };
      }
    }
  } catch (e) {
    return output;
  } finally {
    return output;
  }
}