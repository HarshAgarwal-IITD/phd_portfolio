import React, { useState } from 'react';
import { usePortfolio } from './PortfolioContext';
import Modal from './Modal';
import Header from './Header';
import Footer from './Footer';

export default function About() {
  const { portfolio, setPortfolio } = usePortfolio();
  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (section, field, value) => {
    setPortfolio(prev => ({
      ...prev,
      [section]: field
        ? {
            ...prev[section],
            [field]: value,
          }
        : value,
    }));
  };

  const handleSubmit = () => {
    setShowModal(true);
  };

  return (
    <div style={{ display: 'flex', gap: '1rem', width: '100%' }}>
      {/* Form Inputs */}
      <div
        style={{
          width: '33%',
          padding: '1rem',
          maxHeight: '100vh', // Set max height for form section
          overflowY: 'auto', // Scroll when content overflows vertically
          boxSizing: 'border-box',
          border: '1px solid #ccc',
          borderRadius: '4px',
        }}
      >
        <div style={{ marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            Header Information
          </h2>
          <input
            type="text"
            placeholder="Name"
            value={portfolio.header.name}
            onChange={e => handleInputChange('header', 'name', e.target.value)}
            style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
          />
          <input
            type="text"
            placeholder="Title"
            value={portfolio.header.title}
            onChange={e => handleInputChange('header', 'title', e.target.value)}
            style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
          />
          <input
            type="file"
            onChange={e => handleInputChange('header', 'profilePicture', e.target.files[0])}
            style={{ marginBottom: '0.5rem' }}
          />
          <input
            type="file"
            onChange={e => handleInputChange('header', 'backgroundImage', e.target.files[0])}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            About Me
          </h2>
          <textarea
            placeholder="Tell us about yourself"
            value={portfolio.aboutMe}
            onChange={e => handleInputChange('aboutMe', '', e.target.value)}
            style={{ width: '100%', height: '100px', padding: '0.5rem' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            Research Advisor
          </h2>
          <input
            type="text"
            placeholder="Advisor Name"
            value={portfolio.researchAdvisor.name}
            onChange={e => handleInputChange('researchAdvisor', 'name', e.target.value)}
            style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
          />
          <input
            type="text"
            placeholder="Advisor Title"
            value={portfolio.researchAdvisor.title}
            onChange={e => handleInputChange('researchAdvisor', 'title', e.target.value)}
            style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
          />
          <input
            type="text"
            placeholder="Department"
            value={portfolio.researchAdvisor.department}
            onChange={e => handleInputChange('researchAdvisor', 'department', e.target.value)}
            style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
          />
          <input
            type="text"
            placeholder="Institution"
            value={portfolio.researchAdvisor.institution}
            onChange={e => handleInputChange('researchAdvisor', 'institution', e.target.value)}
            style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            Research Lab
          </h2>
          <input
            type="text"
            placeholder="Lab Name"
            value={portfolio.researchLab.name}
            onChange={e => handleInputChange('researchLab', 'name', e.target.value)}
            style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
          />
          <input
            type="text"
            placeholder="Department"
            value={portfolio.researchLab.department}
            onChange={e => handleInputChange('researchLab', 'department', e.target.value)}
            style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
          />
          <input
            type="text"
            placeholder="Institution"
            value={portfolio.researchLab.institution}
            onChange={e => handleInputChange('researchLab', 'institution', e.target.value)}
            style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
          />
          <input
            type="text"
            placeholder="Address"
            value={portfolio.researchLab.address}
            onChange={e => handleInputChange('researchLab', 'address', e.target.value)}
            style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Social Media</h2>
          <input
            type="text"
            placeholder="GitHub URL"
            value={portfolio.socialMedia.github}
            onChange={e => handleInputChange('socialMedia', 'github', e.target.value)}
            style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
          />
          <input
            type="text"
            placeholder="Twitter URL"
            value={portfolio.socialMedia.twitter}
            onChange={e => handleInputChange('socialMedia', 'twitter', e.target.value)}
            style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
          />
          <input
            type="text"
            placeholder="LinkedIn URL"
            value={portfolio.socialMedia.linkedin}
            onChange={e => handleInputChange('socialMedia', 'linkedin', e.target.value)}
            style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
          />
        </div>

        <button
          onClick={handleSubmit}
          style={{
            width: '100%',
            padding: '0.5rem',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Save Portfolio
        </button>
      </div>

      {/* Template Preview */}
      <div
        style={{
          width: '67%',
          maxHeight: '100vh', // Set max height for template section
          overflowY: 'auto', // Scroll when content overflows vertically
          padding: '1rem',
        }}
      >
        <div style={{ border: '1px solid #ccc', borderRadius: '4px', overflow: 'hidden' }}>
          <Header />
          <main style={{ padding: '2rem' }}>
            <section id="about">
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>About Me</h2>
              <p style={{ minHeight: '30vh' }}>{portfolio.aboutMe || 'Tell us about yourself...'}</p>
            </section>
          </main>
          <Footer />
        </div>
      </div>

      {/* Modal */}
      {showModal && <Modal setShowModal={setShowModal} portfolio={portfolio} />}
    </div>
  );
}
