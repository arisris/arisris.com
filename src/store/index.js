import { createStoreon } from "storeon";
import counter from "./counter";
export const store = createStoreon([counter]);
export default store;
