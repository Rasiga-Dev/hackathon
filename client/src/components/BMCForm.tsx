

import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface BMCFormProps {
  onNext: (data: any) => void;
  initialData?: any; // Optional prop for pre-filled values
}

const BMCForm: React.FC<BMCFormProps> = ({ onNext, initialData }) => {
  const [formData, setFormData] = useState({
    customerSegments: initialData?.customerSegments || '',
    valuePropositions: initialData?.valuePropositions || '',
    channels: initialData?.channels || '',
    customerRelationships: initialData?.customerRelationships || '',
    revenueStreams: initialData?.revenueStreams || '',
    keyResources: initialData?.keyResources || '',
    keyActivities: initialData?.keyActivities || '',
    keyPartners: initialData?.keyPartners || '',
    costStructure: initialData?.costStructure || ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if any field is empty
    const isFormValid = Object.values(formData).every(value => value.trim() !== '');

    if (!isFormValid) {
      toast.error('Please fill out all fields.');
      return;
    }

    toast.success('BMC details saved successfully!');
    setTimeout(() => {
      onNext(formData);
    }, 1000); // little delay to allow user to see success toast
  };

  return (
    <>
      <div className="mb-6 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 font-semibold rounded-md shadow-sm animate-pulse">
        📢 First, watch the video. Then, fill out the form.
      </div>

      <h2 className="text-xl font-semibold mb-4 text-white px-4 py-2 rounded bg-red-600 blink shadow-lg">
        🔔 Watch: How to Fill the BMC Form
      </h2>

      <div className="mb-8">
        <iframe
          width="100%"
          height="400"
          src="https://www.youtube.com/embed/-T_qWzFjnMI?si=aSjy7x1A5dtgdNTp"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="rounded shadow-md"
        ></iframe>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { name: 'customerSegments', label: 'Customer Segments', placeholder: 'Who are your target customers?' },
            { name: 'valuePropositions', label: 'Value Propositions', placeholder: 'What value do you deliver to customers?' },
            { name: 'channels', label: 'Channels', placeholder: 'How do you reach your customers?' },
            { name: 'customerRelationships', label: 'Customer Relationships', placeholder: 'How do you interact with customers?' },
            { name: 'revenueStreams', label: 'Revenue Streams', placeholder: 'How does your business earn money?' },
            { name: 'keyResources', label: 'Key Resources', placeholder: 'What resources do you need?' },
            { name: 'keyActivities', label: 'Key Activities', placeholder: 'What activities are crucial?' },
            { name: 'keyPartners', label: 'Key Partners', placeholder: 'Who are your key partners?' },
            { name: 'costStructure', label: 'Cost Structure', placeholder: 'What are the main costs?' },
          ].map((field) => (
            <div key={field.name} className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                {field.label}
              </label>
              <textarea
                name={field.name}
                value={formData[field.name as keyof typeof formData]}
                onChange={handleChange}
                placeholder={field.placeholder}
                className="w-full h-32 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                required
              />
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-red-800 text-white rounded-md hover:bg-red-900 transition-colors duration-300"
          >
            Save & Continue
          </button>
        </div>

        {/* ToastContainer */}
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      </form>
    </>
  );
};

export default BMCForm;
