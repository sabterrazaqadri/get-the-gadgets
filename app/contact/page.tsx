import { client } from '../../lib/client';

// Fetch contact page from Sanity
async function getContactPage() {
  const query = `*[_type == "page" && slug.current == "contact"][0]{
    _id,
    title,
    content,
    seo
  }`;

  const page = await client.fetch(query);
  return page;
}

export default async function ContactPage() {
  const page = await getContactPage();

  if (!page) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-8">Contact Us</h1>
        <div className="max-w-2xl mx-auto text-left">
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
            <p className="mb-4">Have questions about our products or need assistance with your order?</p>
            <p className="mb-6">Reach out to us through any of the channels below:</p>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Email</h3>
                <p>contact@getthegadgets.com</p>
              </div>

              <div>
                <h3 className="font-medium">Phone</h3>
                <p>+92 310 2722269</p>
              </div>

              <div>
                <h3 className="font-medium">WhatsApp</h3>
                <a
                  href="https://wa.me/923102722269"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Chat with us on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{page.title}</h1>
      <div className="prose max-w-none">
        {page.content && page.content.map((block: any, index: number) => (
          <p key={index}>{block.children?.[0]?.text || ''}</p>
        ))}
      </div>
    </div>
  );
}
