"use client"
import { useState } from 'react';

export default function Home() {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [generatedDescription, setGeneratedDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleProductNameChange = (event) => {
    setProductName(event.target.value);
  };

  const handleProductDescriptionChange = (event) => {
    setProductDescription(event.target.value);
  };

  const handleSubmit = async () => {
    setIsGenerating(true); // Show "Generating..." text on the button
    try {
      const API_ENDPOINT = 'https://api.worqhat.com/api/ai/content/v2';
      const API_KEY = 'U2FsdGVkX187FPQxzgbmIVjXh3O1+xyor30KWVrIBMuFEqGv8NfzXPjE53e3Ju+T';
      const ORG_KEY = 'U2FsdGVkX19lq3bhhF5TRouMiyL2HvEBD2V5j5nNl6dNL9JWPbsXW0rqlzssW8GieFki6oRVDKTb/z01Hc7m+Q==';

      const question = `Generate the description for product: ${productName}. Description: ${productDescription}`;

      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
          'x-org-key': ORG_KEY,
        },
        body: JSON.stringify({
          question: question,
        }),
      });

      if (!response.ok) {
        throw new Error('Error fetching data from API');
      }

      const data = await response.json();
      // Assuming the API response contains a 'content' field with the generated description
      setGeneratedDescription(data.content);
    } catch (error) {
      console.error('Error:', error);
      // Handle error state here
    } finally {
      setIsGenerating(false); // Reset the button text back to "Generate Description"
    }
  };

  return (
    <main className="flex flex-col h-full items-center justify-center p-5">
      <div className="container h-full my-1 bg-white rounded-sm text-white p-10">
        <h1 className="my-3 font-sans text-center text-4xl font-bold p-4 drop-shadow-lg bg-blue-600">
          Product Descriptor By Worqhat 🎓
        </h1>
        <div className="text-center container rounded-md text-white my-4 p-5 flex flex-col items-center justify-center">
          <div className="upload flex flex-col items-center">
           
            <div className='flex'>
            <h2 className='text-black mt-5 p-2 mr-2'>Enter Product Name: </h2>
              <input
                type="text"
                placeholder="Product Name"
                value={productName}
                onChange={handleProductNameChange}
                className="border-2 text-black rounded-md w-96 p-4 m-2 text-center drop-shadow-xl"
              />
            </div>
          </div>
          <div className="upload flex flex-col items-center">
            <div className='flex'>
            <h2 className='text-black mt-5 p-2 mr-2'>Describe  product :    </h2>
              <input
                type="text"
                placeholder="Describe your product"
                value={productDescription}
                onChange={handleProductDescriptionChange}
                className="border-2 text-black rounded-md w-96 p-4 m-2 text-center drop-shadow-xl"
              />
            </div>
          </div>
          <button
            className={`btn bg-blue-600 text-white p-3 mx-auto cursor-pointer rounded-md ${
              isGenerating ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={handleSubmit}
            disabled={isGenerating}
          >
            {isGenerating ? 'Generating...' : 'Generate Description'}
          </button>
        </div>
        <div className="cv bg-white h-64 rounded-md text-white p-5">
        <h2 className='text-black mt-5 p-2 mr-2'>Product Generated description: </h2>
          <textarea
            className="border-2 text-black rounded-md w-full h-64 p-4 text-center drop-shadow-xl"
            placeholder="Welcome to Product descriptor by Worqhat! Enter a product name to generate the description."
            value={generatedDescription}
            readOnly
          ></textarea>
        </div>
      </div>
    </main>
  );
}
