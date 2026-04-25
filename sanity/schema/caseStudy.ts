import { defineField, defineType } from "sanity";

export const caseStudy = defineType({
  name: "caseStudy",
  title: "Case Study",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Project Title",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Branding", value: "Branding" },
          { title: "Identity", value: "Identity" },
          { title: "Strategy", value: "Strategy" },
          { title: "Campaign", value: "Campaign" }
        ],
        layout: "radio"
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "number",
      validation: (Rule) => Rule.required().min(2000).max(2100)
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image (full-bleed hero)",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "thumbnailImage",
      title: "Thumbnail Image (grid cards)",
      type: "image",
      options: { hotspot: true }
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      description: "2 sentences max — shown on cards and meta description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().max(300)
    }),
    defineField({
      name: "client",
      title: "Client Name",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "industry",
      title: "Industry",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "scope",
      title: "Scope",
      description: "e.g. Identity, Strategy, Launch Assets",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.required().min(1)
    }),
    defineField({
      name: "problemStatement",
      title: "Problem Statement",
      description: "Display headline — Degular Display 40px. Keep it punchy.",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "problemBody",
      title: "Problem Detail",
      description: "Supporting copy below the problem statement. 2–3 sentences.",
      type: "array",
      of: [{ type: "block" }]
    }),
    defineField({
      name: "strategyItems",
      title: "Strategy / Approach",
      description: "3 items max. Each has a number, title, and short description.",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "number", title: "Number (e.g. 01)", type: "string" }),
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "description", title: "Description", type: "text", rows: 2 })
          ]
        }
      ],
      validation: (Rule) => Rule.max(3)
    }),
    defineField({
      name: "identityImages",
      title: "Identity System Images",
      description: "Full-bleed images showcasing the logo, type, and color system.",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }]
    }),
    defineField({
      name: "applicationImages",
      title: "Application / Mockup Images",
      description: "Real-world mockups — packaging, print, digital, etc.",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }]
    }),
    defineField({
      name: "results",
      title: "Results",
      description: "→ bullet outcomes. Keep each to one sharp line.",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.required().min(1)
    }),
    defineField({
      name: "featured",
      title: "Featured on Home?",
      type: "boolean",
      initialValue: false
    }),
    defineField({
      name: "featuredOrder",
      title: "Featured Order",
      description: "1 = large card, 2–3 = small cards. Only used if Featured is checked.",
      type: "number"
    }),
    defineField({
      name: "order",
      title: "Grid Order",
      description: "Controls display order on /work page. Lower = first.",
      type: "number",
      initialValue: 99
    })
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "thumbnailImage"
    }
  },
  orderings: [
    {
      title: "Grid Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }]
    }
  ]
});
