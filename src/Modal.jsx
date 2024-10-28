import React, { useState } from 'react';
import { usePortfolio } from './PortfolioContext';



function Modal({ setShowModal, handleFunction}) {
  const [kerberos, setKerberos] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const {portfolio ,publications , background , teaching , projects ,research ,images } =usePortfolio();

  const handleModalSubmit = async () => {
    if (handleFunction) {
      // Call handleFunction (i.e., handleLogin) with kerberos and password
      const result = await handleFunction(kerberos, password); // Await the login result
      setMessage(result); // Set the message returned by the login function
      if (result=='Portfolio fetched successfully!') {
        setTimeout(() => setShowModal(false), 1000); // Close the modal after success
      }
      return;

    }
    try {
      const formData = new FormData();

      if (images) {
        for (let [key, value] of images.entries()) {
          formData.append(key, value);
        }
      } 
  formData.append('kerberos', kerberos);
  formData.append('password', password);

  // Append other data as JSON strings
  formData.append('portfolio', JSON.stringify(portfolio));
  formData.append('publications', JSON.stringify(publications));
  formData.append('background', JSON.stringify(background));
  formData.append('teaching', JSON.stringify(teaching));
  formData.append('projects', JSON.stringify(projects));
  formData.append('research', JSON.stringify(research));
  console.log(formData)

  const response = await fetch('http://localhost:3000/updatePortfolio', {
    method: 'POST',
    body: formData,
  });

        console.log(response)
  
        const data = await response.json();
  
        if (response.ok) {
          setMessage('Portfolio updated successfully!');
          setTimeout(() => {
            setShowModal(false);
            setMessage('');
          }, 2000);
        } else {
          setMessage(data.error || 'Failed to update portfolio');
        }
      } catch (error) {
        console.log(error)
        setMessage('An error occurred. Please try again.');
      }

  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '4px',
          width: '300px',
        }}
      >
        <h2 style={{ marginBottom: '1rem' }}>Authentication Required</h2>
        <input
          type="text"
          placeholder="Kerberos ID"
          value={kerberos}
          onChange={(e) => setKerberos(e.target.value)}
          style={{
            width: '100%',
            marginBottom: '0.5rem',
            padding: '0.5rem',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: '100%',
            marginBottom: '1rem',
            padding: '0.5rem',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        />
        <button
          onClick={handleModalSubmit} // Call handleModalSubmit when clicking submit
          style={{
            width: '100%',
            padding: '0.5rem',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginBottom: '0.5rem',
          }}
        >
          Submit
        </button>
        <button
          onClick={() => setShowModal(false)} // Close modal on cancel
          style={{
            width: '100%',
            padding: '0.5rem',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Cancel
        </button>
        {message && (
          <p
            style={{
              marginTop: '1rem',
              color: message.includes('success') ? 'green' : 'red',
              textAlign: 'center',
            }}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default Modal;
