import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import schemas from "./sanity/schema";

const config = defineConfig({
  projectId: "l6falefk",

  dataset: "production",

  title: "Dreamer Code Academy",

  apiVersion: "2024-09-18",

  basePath: "/admin",

  plugins: [deskTool()],
  schema: { types: schemas },
});

export default config;
