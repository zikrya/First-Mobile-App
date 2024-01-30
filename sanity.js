import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const client = createClient({
    projectId: "tr9bmo3i", // replace with your project ID
    dataset: "production",
    useCdn: true,
    apiVersion: "2022-03-07" // use today's date for the latest version
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);

export default client;

