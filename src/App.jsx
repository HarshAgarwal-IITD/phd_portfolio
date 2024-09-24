import React, { useState } from 'react';

const App = () => {
  const [portfolio, setPortfolio] = useState({
    header: {
      name: '',
      title: '',
      profilePicture: '',
      backgroundImage: '',
    },
    navigation: ['HOME', 'BACKGROUND', 'RESEARCH', 'PUBLICATIONS', 'TEACHING', 'PROJECTS'],
    aboutMe: '',
    researchAdvisor: {
      name: '',
      title: '',
      department: '',
      institution: '',
    },
    researchLab: {
      name: '',
      department: '',
      institution: '',
      address: '',
    },
    socialMedia: {
      github: '',
      twitter: '',
      linkedin: '',
    },
    email: '',
  });

  const [showModal, setShowModal] = useState(false);
  const [kerberos, setKerberos] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const updateHeader = (field, value) => {
    setPortfolio(prev => ({
      ...prev,
      header: { ...prev.header, [field]: value },
    }));
  };

  const updateNavigation = (index, value) => {
    setPortfolio(prev => ({
      ...prev,
      navigation: prev.navigation.map((item, i) => (i === index ? value : item)),
    }));
  };

  const updateResearchAdvisor = (field, value) => {
    setPortfolio(prev => ({
      ...prev,
      researchAdvisor: { ...prev.researchAdvisor, [field]: value },
    }));
  };

  const updateResearchLab = (field, value) => {
    setPortfolio(prev => ({
      ...prev,
      researchLab: { ...prev.researchLab, [field]: value },
    }));
  };

  const updateSocialMedia = (platform, value) => {
    setPortfolio(prev => ({
      ...prev,
      socialMedia: { ...prev.socialMedia, [platform]: value },
    }));
  };

  const handleSubmit = () => {
    setShowModal(true); // Show modal when "Update Portfolio" is clicked
  };

  const handleModalSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/updatePortfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...portfolio, kerberos, password }),
      });
      if (response.ok) {
        setMessage('Portfolio updated successfully!');
        setTimeout(() => setShowModal(false), 2000); // Hide modal after 2 seconds
      } else {
        setMessage('Failed to update portfolio.');
      }
    } catch (error) {
      console.error('Error updating portfolio:', error);
      setMessage('An error occurred while updating the portfolio.');
    }
  };

  return (
    <div style={{ padding: '1rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>PhD Portfolio Creator</h1>

      {/* Header Information */}
      <div>
        <h2>Header Information</h2>
        <input
          type="text"
          placeholder="Name"
          value={portfolio.header.name}
          onChange={(e) => updateHeader('name', e.target.value)}
        />
        <input
          type="text"
          placeholder="Title"
          value={portfolio.header.title}
          onChange={(e) => updateHeader('title', e.target.value)}
        />
        <input
          type="text"
          placeholder="Profile Picture URL"
          value={portfolio.header.profilePicture}
          onChange={(e) => updateHeader('profilePicture', e.target.value)}
        />
        <input
          type="text"
          placeholder="Background Image URL"
          value={portfolio.header.backgroundImage}
          onChange={(e) => updateHeader('backgroundImage', e.target.value)}
        />
      </div>

      {/* Navigation Menu */}
      <div>
        <h2>Navigation Menu</h2>
        {portfolio.navigation.map((item, index) => (
          <input
            key={index}
            type="text"
            value={item}
            onChange={(e) => updateNavigation(index, e.target.value)}
          />
        ))}
      </div>

      {/* About Me */}
      <div>
        <h2>About Me</h2>
        <textarea
          placeholder="Tell us about yourself"
          value={portfolio.aboutMe}
          onChange={(e) => setPortfolio(prev => ({ ...prev, aboutMe: e.target.value }))}
        />
      </div>

      {/* Research Advisor */}
      <div>
        <h2>Research Advisor</h2>
        <input
          type="text"
          placeholder="Advisor Name"
          value={portfolio.researchAdvisor.name}
          onChange={(e) => updateResearchAdvisor('name', e.target.value)}
        />
        <input
          type="text"
          placeholder="Advisor Title"
          value={portfolio.researchAdvisor.title}
          onChange={(e) => updateResearchAdvisor('title', e.target.value)}
        />
        <input
          type="text"
          placeholder="Department"
          value={portfolio.researchAdvisor.department}
          onChange={(e) => updateResearchAdvisor('department', e.target.value)}
        />
        <input
          type="text"
          placeholder="Institution"
          value={portfolio.researchAdvisor.institution}
          onChange={(e) => updateResearchAdvisor('institution', e.target.value)}
        />
      </div>

      {/* Research Lab */}
      <div>
        <h2>Research Lab</h2>
        <input
          type="text"
          placeholder="Lab Name"
          value={portfolio.researchLab.name}
          onChange={(e) => updateResearchLab('name', e.target.value)}
        />
        <input
          type="text"
          placeholder="Department"
          value={portfolio.researchLab.department}
          onChange={(e) => updateResearchLab('department', e.target.value)}
        />
        <input
          type="text"
          placeholder="Institution"
          value={portfolio.researchLab.institution}
          onChange={(e) => updateResearchLab('institution', e.target.value)}
        />
        <input
          type="text"
          placeholder="Address"
          value={portfolio.researchLab.address}
          onChange={(e) => updateResearchLab('address', e.target.value)}
        />
      </div>

      {/* Social Media */}
      <div>
        <h2>Social Media</h2>
        <input
          type="text"
          placeholder="GitHub URL"
          value={portfolio.socialMedia.github}
          onChange={(e) => updateSocialMedia('github', e.target.value)}
        />
        <input
          type="text"
          placeholder="Twitter URL"
          value={portfolio.socialMedia.twitter}
          onChange={(e) => updateSocialMedia('twitter', e.target.value)}
        />
        <input
          type="text"
          placeholder="LinkedIn URL"
          value={portfolio.socialMedia.linkedin}
          onChange={(e) => updateSocialMedia('linkedin', e.target.value)}
        />
      </div>

      {/* Contact */}
      <div>
        <h2>Contact</h2>
        <input
          type="email"
          placeholder="Email"
          value={portfolio.email}
          onChange={(e) => setPortfolio(prev => ({ ...prev, email: e.target.value }))}
        />
      </div>

      <button onClick={handleSubmit} style={{ marginTop: '1rem' }}>
        Update Portfolio
      </button>

      {/* Modal for Kerberos ID and Password */}
      {showModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              backgroundColor: '#fff',
              padding: '2rem',
              borderRadius: '8px',
              textAlign: 'center',
            }}
          >
            <h2>Authentication Required</h2>
            <input
              type="text"
              placeholder="Kerberos ID"
              value={kerberos}
              onChange={(e) => setKerberos(e.target.value)}
              style={{ display: 'block', margin: '1rem 0', width: '100%' }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ display: 'block', margin: '1rem 0', width: '100%' }}
            />
            <button onClick={handleModalSubmit}>Submit</button>

            {/* Display success message */}
            {message && <p style={{ marginTop: '1rem', color: 'green' }}>{message}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
