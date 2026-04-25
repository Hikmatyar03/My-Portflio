import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schema";

export default defineConfig({
  name: "hikmatyar-portfolio",
  title: "Hikmatyar — Portfolio CMS",

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "k27bz9z2",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",

  plugins: [
    structureTool({
      structure: (S: import("sanity/structure").StructureBuilder) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Case Studies")
              .child(
                S.documentList()
                  .title("Case Studies")
                  .filter('_type == "caseStudy"')
                  .defaultOrdering([{ field: "order", direction: "asc" }])
              )
          ])
    }),
    visionTool()
  ],

  schema: {
    types: schemaTypes
  },

  basePath: "/studio"
});
