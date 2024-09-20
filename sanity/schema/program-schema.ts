import { title } from "process";



const program = {
  name: "program",

  title: "Program",

  type: "document",

  fields: [
    {
      name: "name",

      title: "Name",

      type: "string",
    },
    {
      name: "fullname",

      title: "Fullname",

      type: "string",
    },
    {
      name: "slug",

      title: "Slug",

      type: "slug",

      options: { source: "name" },
    },
    {
      name: "description",

      title: "Description",

      type: "array",

      of: [{ type: "block" }],
    },
    {
      name: "topics",

      title: "Topics",

      type: "document",

      fields: [
        {
          name: "title",

          title: "Title",

          type: "string",
        },
        {
          name: "slug",

          title: "Slug",

          type: "slug",

          options: { source: "title" },
        },
        {
          name: "description",

          title: "Description",

          type: "string",
        },
        {
          name: "content",

          title: "Content",

          type: "array",

          of: [{ type: "block" }],
        },
        {
          name: "assignment",

          title: "Assignment",

          type: "document",

          fields: [
            {
              name: "title",

              title: "Title",

              type: "string",
            },
            {
              name: "description",

              title: "Description",

              type: "array",

              of: [{ type: "block" }],
            },
            {
              name: "image",

              title: "Image",

              type: "image",

              options: { hotspot: true },

              fields: [
                {
                  name: "alt",

                  title: "Alt",

                  type: "string",
                },
              ],
            },
            {
              name: "url",

              title: "URL",

              type: "url",
            },
          ],
        },
      ],
    },
  ],
};


export default program;