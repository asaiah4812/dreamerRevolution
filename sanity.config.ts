import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import schemas from "./sanity/schema";

const config = defineConfig({
  projectId: "l6falefk",

  dataset: "production",

  title: "Dreamer Code Academy",

  apiVersion: "2024-03-07",

  basePath: "/admin",

  plugins: [deskTool(), visionTool()],
  schema: { types: schemas },
});

export default config;
