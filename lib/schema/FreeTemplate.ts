import { extendType, intArg, objectType } from "nexus";
import { dump } from "nexus/dist/utils";

const endpoints = "https://freehtml5.co/wp-json/wp/v2";
const fetcher = (url: string) =>
  fetch(`${endpoints}${url}`, {
    headers: {
      "content-type": "application/json"
    }
  }).then(async (res) => ({
    headers: res.headers,
    data: await res.json()
  }));

export const FreeTemplate = objectType({
  name: "FreeTemplate",
  definition(t) {
    t.int("id");
    t.string("slug");
    t.string("title");
    t.string("image");
    t.string("source");
    t.string("description");
    t.string("created_at");
    t.string("updated_at");
  }
});

export const FreeTemplateQueryResponseType = objectType({
  name: "FreeTemplateQueryResponseType",
  definition(t) {
    t.int("total");
    t.int("totalPage");
    t.int("nextPage");
    t.list.field("data", {
      type: FreeTemplate
    });
  }
});
export const FreeTemplateQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("allFreeTemplate", {
      type: FreeTemplateQueryResponseType,
      args: { page: intArg({ default: 1 }) },
      // @ts-ignore
      async resolve(root, args, ctx) {
        const categories_exclude = [120].join(",");
        const { data, headers } = await fetcher(
          `/posts?categories_exclude=${categories_exclude}&page=${args.page}`
        );
        //dump({ data, headers });
        const allData: Record<string, any>[] = [];
        for (let i = 0; i < data?.length || 0; i++) {
          const item = data[i];
          const [image] = item?.yoast_head_json?.og_image;
          allData.push({
            id: item?.id,
            title: item.title?.rendered,
            slug: item?.slug,
            description: item?.content?.rendered,
            image: image?.url,
            created_at: item?.date,
            updated_at: item?.modified,
            source: item?.link
          });
        }

        return {
          total: headers.get("x-wp-total"),
          totalPage: headers.get("x-wp-totalpages"),
          nextPage: args.page + 1,
          data: allData
        };
      }
    });
  }
});
