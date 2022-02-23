import { deta } from "lib/deta";
import {
  extendType,
  inputObjectType,
  list,
  nonNull,
  objectType
} from "nexus";
import { z } from "zod";

const ADMIN_USER = process.env.GITHUB_EMAIL;
const DB = deta.Base("guestbook");

const Guestbook = objectType({
  name: "Guestbook",
  definition(t) {
    t.nonNull.id("key");
    t.boolean("private");
    t.string("email", {
      authorize: (_, __, ctx, info) =>
        info.operation.operation === "query" &&
        ctx.req.session?.user?.email === ADMIN_USER
    });
    t.string("body");
    t.string("name");
    t.string("image");
    t.string("created_at");
  }
});
const GuestbookQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("listGuestbook", {
      type: list("Guestbook"),
      async resolve(root, arg, ctx) {
        const currentUser = ctx.req.session?.user;
        const query: Record<any, any> = {};
        if (currentUser?.email !== ADMIN_USER) {
          query.private = false;
        }
        const { items: data, last } = await DB.fetch(query, { limit: 100 });
        // remove last comment to ensure db not grow size
        if (last) await DB.delete(last);
        // display new comment frist by created_at
        let sortedData = data.sort(
          (a, b) =>
            new Date(b.created_at as any).valueOf() -
            new Date(a.created_at as any).valueOf()
        );
        return sortedData as any;
      }
    });
  }
});
const StoreGuestbookInput = inputObjectType({
  name: "StoreGuestbookInput",
  definition(t) {
    t.nonNull.boolean("private");
    t.nonNull.string("body");
  }
});
const GuestbookMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("storeGuestbook", {
      type: "Guestbook",
      args: { input: nonNull(StoreGuestbookInput) },
      async resolve(root, args, { req }) {
        const currentUser = req.session?.user;
        if (!currentUser) throw new Error("You are not loggedIn");
        const schema = z.object({
          private: z.boolean().default(false),
          body: z.string().min(3).max(100)
        });
        const value = await schema.parseAsync(args.input);
        const result = await DB.put({
          ...value,
          name: currentUser.name,
          email: currentUser?.email,
          image: currentUser?.image,
          created_at: Date.now()
        });
        return result as any;
      }
    });
    t.field("destroyGuestbook", {
      type: "Boolean",
      args: { key: nonNull("String") },
      async resolve(root, args, { req }) {
        const currentUser = req.session?.user;
        if (!currentUser || !args.key) throw Error;
        const comment = await DB.get(args.key);
        if (!comment?.key) return false;
        if (
          comment?.email === currentUser?.email ||
          currentUser?.email === ADMIN_USER
        ) {
          await DB.delete(args.key);
          return true;
        }
        return false;
      }
    });
  }
});

export default [
  Guestbook,
  GuestbookQuery,
  GuestbookMutation,
  StoreGuestbookInput
];
