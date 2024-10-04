import React, { useState } from 'react';

export default function PhDPortfolioTemplate() {
  const [portfolio, setPortfolio] = useState({
    header: {
      name: '',
      title: '',
      profilePicture: null,
      backgroundImage: null,
    },
    navigation: ['About', 'Research', 'Publications', 'Teaching', 'Projects'],
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

  const handleInputChange = (section, field, value) => {
    setPortfolio(prev => ({
      ...prev,
      [section]: field ? {
        ...prev[section],
        [field]: value
      } : value
    }));
  };  const handleSubmit = () => {
    setShowModal(true);
  };

  const handleModalSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3000/updatePortfolio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          kerberos,
          password,
          portfolio,
        }),
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
      setMessage('An error occurred. Please try again.');
    }
  };


  return (
    <div style={{ display: 'flex', gap: '1rem' }}>
      {/* Form Inputs */}
      <div style={{ width: '33%', padding: '1rem' }}>
        <div style={{ marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Header Information</h2>
          <input
            type="text"
            placeholder="Name"
            value={portfolio.header.name}
            onChange={(e) => handleInputChange('header', 'name', e.target.value)}
            style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
          />
          <input
            type="text"
            placeholder="Title"
            value={portfolio.header.title}
            onChange={(e) => handleInputChange('header', 'title', e.target.value)}
            style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
          />
          <input
            type="file"
            onChange={(e) => handleInputChange('header', 'profilePicture', e.target.files[0])}
            style={{ marginBottom: '0.5rem' }}
          />
          <input
            type="file"
            onChange={(e) => handleInputChange('header', 'backgroundImage', e.target.files[0])}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>About Me</h2>
          <textarea
            placeholder="Tell us about yourself"
            value={portfolio.aboutMe}
            onChange={(e) => handleInputChange('aboutMe', '', e.target.value)}
            style={{ width: '100%', height: '100px', padding: '0.5rem' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Research Advisor</h2>
          <input
            type="text"
            placeholder="Advisor Name"
            value={portfolio.researchAdvisor.name}
            onChange={(e) => handleInputChange('researchAdvisor', 'name', e.target.value)}
            style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
          />
          <input
            type="text"
            placeholder="Advisor Title"
            value={portfolio.researchAdvisor.title}
            onChange={(e) => handleInputChange('researchAdvisor', 'title', e.target.value)}
            style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
          />
          <input
            type="text"
            placeholder="Department"
            value={portfolio.researchAdvisor.department}
            onChange={(e) => handleInputChange('researchAdvisor', 'department', e.target.value)}
            style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
          />
          <input
            type="text"
            placeholder="Institution"
            value={portfolio.researchAdvisor.institution}
            onChange={(e) => handleInputChange('researchAdvisor', 'institution', e.target.value)}
            style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Research Lab</h2>
          <input
            type="text"
            placeholder="Lab Name"
            value={portfolio.researchLab.name}
            onChange={(e) => handleInputChange('researchLab', 'name', e.target.value)}
            style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
          />
          <input
            type="text"
            placeholder="Department"
            value={portfolio.researchLab.department}
            onChange={(e) => handleInputChange('researchLab', 'department', e.target.value)}
            style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
          />
          <input
            type="text"
            placeholder="Institution"
            value={portfolio.researchLab.institution}
            onChange={(e) => handleInputChange('researchLab', 'institution', e.target.value)}
            style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
          />
          <input
            type="text"
            placeholder="Address"
            value={portfolio.researchLab.address}
            onChange={(e) => handleInputChange('researchLab', 'address', e.target.value)}
            style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Social Media</h2>
          <input
            type="text"
            placeholder="GitHub URL"
            value={portfolio.socialMedia.github}
            onChange={(e) => handleInputChange('socialMedia', 'github', e.target.value)}
            style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
          />
          <input
            type="text"
            placeholder="Twitter URL"
            value={portfolio.socialMedia.twitter}
            onChange={(e) => handleInputChange('socialMedia', 'twitter', e.target.value)}
            style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
          />
          <input
            type="text"
            placeholder="LinkedIn URL"
            value={portfolio.socialMedia.linkedin}
            onChange={(e) => handleInputChange('socialMedia', 'linkedin', e.target.value)}
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
            cursor: 'pointer'
          }}
        >
          Save Portfolio
        </button>
      </div>


      {/* Template Preview */}
      <div style={{ width: '67%' }}>
        <div style={{ border: '1px solid #ccc', borderRadius: '4px', overflow: 'hidden' }}>
          <header style={{
            backgroundColor: '#f4f4f4',
            backgroundImage: portfolio.header.backgroundImage ? URL.createObjectURL(portfolio.header.backgroundImage) : '',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: '#333',
            textAlign: 'center',
            padding: '2rem'
          }}>
            {portfolio.header.profilePicture && (
              <img 
                src={URL.createObjectURL(portfolio.header.profilePicture)} 
                alt={portfolio.header.name}
                style={{
                  width: '150px',
                  height: '150px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  margin: '0 auto'
                }}
              />
            )}
            <h1 style={{ fontSize: '2rem', marginTop: '1rem' }}>{portfolio.header.name || 'Your Name'}</h1>
            <h2 style={{ fontSize: '1.5rem' }}>{portfolio.header.title || 'Your Title'}</h2>
          </header>
          
          <nav style={{
            backgroundColor: '#f4f4f4',
            padding: '1rem',
            textAlign: 'center'
          }}>
            {portfolio.navigation.map((item, index) => (
              <a 
                key={index}
                href={`#${item.toLowerCase()}`}
                style={{
                  color: '#333',
                  textDecoration: 'none',
                  padding: '0.5rem 1rem'
                }}
              >
                {item}
              </a>
            ))}
          </nav>
          
          <main style={{ padding: '2rem' }}>
            <section id="about">
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>About Me</h2>
              <p>{portfolio.aboutMe || 'Tell us about yourself...'}</p>
            </section>
          </main>
          
          <footer style={{
            backgroundColor: '#333',
            color: 'white',
            padding: '2rem'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '2rem'
            }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Research Advisor</h3>
                <p>{portfolio.researchAdvisor.name || 'Advisor Name'}</p>
                <p>{portfolio.researchAdvisor.title || 'Advisor Title'}</p>
                <p>{portfolio.researchAdvisor.department || 'Department'}</p>
                <p>{portfolio.researchAdvisor.institution || 'Institution'}</p>
              </div>
              
              <div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Research Lab</h3>
                <p>{portfolio.researchLab.name || 'Lab Name'}</p>
                <p>{portfolio.researchLab.department || 'Department'}</p>
                <p>{portfolio.researchLab.institution || 'Institution'}</p>
                <p>{portfolio.researchLab.address || 'Address'}</p>
              </div>
              
              <div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Follow Me</h3>
                <a href={portfolio.socialMedia.github} style={{ color: 'white', display: 'block', marginBottom: '0.5rem' }}>GitHub</a>
                <a href={portfolio.socialMedia.twitter} style={{ color: 'white', display: 'block', marginBottom: '0.5rem' }}>Twitter</a>
                <a href={portfolio.socialMedia.linkedin} style={{ color: 'white', display: 'block' }}>LinkedIn</a>
              </div>
              
              <div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Contact</h3>
                <p>{portfolio.email || 'your.email@example.com'}</p>
              </div>
            </div>
          </footer>
        </div>
      </div>

       {/* Authentication Modal */}
       {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '4px',
            width: '300px'
          }}>
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
                border: '1px solid #ccc'
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
                border: '1px solid #ccc'
              }}
            />
            <button
              onClick={handleModalSubmit}
              style={{
                width: '100%',
                padding: '0.5rem',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                marginBottom: '0.5rem'
              }}
            >
              Submit
            </button>
            <button
              onClick={() => setShowModal(false)}
              style={{
                width: '100%',
                padding: '0.5rem',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            {message && (
              <p style={{
                marginTop: '1rem',
                color: message.includes('success') ? 'green' : 'red',
                textAlign: 'center'
              }}>
                {message}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}