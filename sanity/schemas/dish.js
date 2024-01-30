import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'dish',
  title: 'Dish',
  type: 'document',
  fields: [
    {
      name: "name",
      type: "string",
      title: "Name of dish",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "dishes",
      type: "array",
      title: "Dishes",
      of: [{ type: "reference", to: [{ type: "dish"}] }],
    },
    {
      name: "price",
      type: "number",
      title: "Price of the dish in GBP",
    },
    {
      name: "image",
      type: "image",
      title: "Image of the dish",
    },
  ],
})
