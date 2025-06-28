import React, { useContext, useState } from 'react';
import { AppContext } from '../Context/AppContext';

const UploadImageHistory = () => {
  const { user, backendUrl, token } = useContext(AppContext);
  const [prompt, setPrompt] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile || !prompt) {
      alert('Please provide a prompt and select an image');
      return;
    }

    const formData = new FormData();
    formData.append('userId', user._id);
    formData.append('prompt', prompt);
    formData.append('image', imageFile);

    try {
      const response = await fetch(`${backendUrl}/api/image-history/add`, {
        method: 'POST',
        body: formData,
        headers: {
          token, // your auth token header if needed
          // **Do NOT set Content-Type here**
        },
        credentials: 'include',
      });

      const data = await response.json();
      if (data.success) {
        alert('Image history uploaded successfully!');
        setPrompt('');
        setImageFile(null);
      } else {
        alert('Upload failed: ' + data.message);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed, check console for details.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '20px' }}>
      <input
        type="text"
        placeholder="Enter prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        required
      />
      <br />
      <input type="file" accept="image/*" onChange={handleFileChange} required />
      <br />
      <button type="submit">Upload Image History</button>
    </form>
  );
};

export default UploadImageHistory;
