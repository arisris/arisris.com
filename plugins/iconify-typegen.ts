import type { AstroIntegration } from "astro";
import { existsSync } from "node:fs";
import { mkdir, unlink, writeFile, readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { cwd } from "node:process";

export default (): AstroIntegration => {
  const pathName = join(cwd(), ".astro");
  const fileName = join(pathName, "iconify.d.ts");
  const ensureIconsFile = async () => {
    if (!existsSync) {
      await mkdir(pathName);
    }
    if (existsSync(fileName)) {
      await unlink(fileName);
    }
  };
  return {
    name: "iconify-typegen",
    hooks: {
      "astro:config:setup": async () => {
        const modulesPath = join(cwd(), "node_modules/@iconify-json");
        if (!existsSync) return;
        let exported = `/// <reference types="astro/astro-jsx" />
type AstroIconifyComponent = (props: astroHTML.JSX.SVGAttributes) => astroHTML.JSX.Element;

declare module "virtual:icons" {
  export {AstroIconifyComponent}
}

`;
        for await (let mod of await readdir(modulesPath)) {
          const iconJsonFileName = join(modulesPath, mod, "icons.json");
          if (existsSync(iconJsonFileName)) {
            const icons = JSON.parse(await readFile(iconJsonFileName, "utf-8"));
            exported += declaredModuleTemplate(
              icons.prefix,
              Object.entries(icons.icons).map((i) => i[0])
            );
            exported += "\n\n";
          }
        }
        await ensureIconsFile();
        await writeFile(fileName, exported);
        console.log("Generated: Iconify Icons types\n");
      }
    }
  };
};

function declaredModuleTemplate(prefix: string, names: string[]) {
  let template = ``;

  for (let name of names) {
    const exportedName = capitalizeString(prefix + "-" + name);
    template += `declare module "virtual:icons/${prefix}/${name}" {
  const ${exportedName}: AstroIconifyComponent
  export default ${exportedName}
}
`;
  }

  return template;
}

function capitalizeString(input: string): string {
  const words = input.split(/[-_ ]+/);
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );
  return capitalizedWords.join("");
}
