import { client } from '../../lib/client';

// Fetch about page from Sanity
async function getAboutPage() {
  const query = `*[_type == "page" && slug.current == "about"][0]{
    _id,
    title,
    content,
    seo
  }`;

  const page = await client.fetch(query);
  return page;
}

export default async function AboutPage() {
  const page = await getAboutPage();

  // Default content if no data found in Sanity
const defaultContent = {
  title: "About Get the Gadgets",
  content: [
    {
      _type: 'block',
      children: [
        {
          _type: 'span',
          text: "Get the Gadgets is a modern gadget store dedicated to bringing you the latest and most reliable tech products. From everyday essentials to cutting-edge electronics, our goal is to make technology accessible, useful, and exciting for everyone."
        }
      ]
    },
    {
      _type: 'block',
      children: [
        {
          _type: 'span',
          text: "Our journey started with a simple idea: to create a one-stop destination where customers can find high-quality gadgets that genuinely add value to their daily lives. We carefully select products that combine innovation, performance, and affordability."
        }
      ]
    },
    {
      _type: 'block',
      children: [
        {
          _type: 'span',
          text: "At Get the Gadgets, we believe technology should simplify life, not complicate it. That’s why we focus on trusted brands, practical features, and clear product information to help you make confident buying decisions."
        }
      ]
    },
    {
      _type: 'block',
      children: [
        {
          _type: 'span',
          text: "Our collection includes gadgets for work, home, entertainment, and everyday convenience. Whether you're a tech enthusiast or just looking for smart solutions, we aim to offer products that fit different needs and lifestyles."
        }
      ]
    },
    {
      _type: 'block',
      children: [
        {
          _type: 'span',
          text: "Thank you for choosing Get the Gadgets. We’re excited to be part of your tech journey and look forward to bringing you gadgets that truly make a difference."
        }
      ]
    }
  ]
};


  const displayPage = page || defaultContent;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">{displayPage.title}</h1>
      <div className="prose max-w-none mx-auto">
        {displayPage.content && displayPage.content.map((block: any, index: number) => (
          <p key={index} className="mb-4 text-gray-700 leading-relaxed">
            {block.children?.[0]?.text || ''}
          </p>
        ))}
      </div>
    </div>
  );
}