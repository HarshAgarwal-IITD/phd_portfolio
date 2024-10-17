import React, { useState } from 'react';
import Modal from './Modal';
import Header from './Header';
import Footer from './Footer';
import { usePortfolio } from './PortfolioContext';

export default function Background() {
  const { background, setBackground } = usePortfolio();
  const [showModal, setShowModal] = useState(false);

  // Handle changes for education entries
  const handleEducationChange = (index, field, value) => {
    const newEducation = [...background.education];
    newEducation[index][field] = value;
    setBackground(prev => ({
      ...prev,
      education: newEducation
    }));
  };

  // Handle changes for work experience entries
  const handleWorkChange = (index, field, value) => {
    const newWork = [...background.workExperience];
    newWork[index][field] = value;
    setBackground(prev => ({
      ...prev,
      workExperience: newWork
    }));
  };

  // Handle changes for internship entries
  const handleInternshipChange = (index, field, value) => {
    const newInternships = [...background.internships];
    newInternships[index][field] = value;
    setBackground(prev => ({
      ...prev,
      internships: newInternships
    }));
  };

  // Add new entry for each section
  const addEntry = (section) => {
    const newEntries = {
      education: { degree: '', department: '', institution: '', year: '', details: '' },
      workExperience: { title: '', company: '', duration: '', location: '', description: '' },
      internships: { role: '', company: '', duration: '', location: '', description: '' }
    };
    
    setBackground(prev => ({
      ...prev,
      [section]: [...prev[section], newEntries[section]]
    }));
  };

  const handleSubmit = () => {
    setShowModal(true);
  };

  return (
    <>
      <div style={{ display: 'flex', gap: '1rem', width: '100%' }}>
        {/* Form Inputs */}
        <div style={{ width: '33%', padding: '1rem', maxHeight: '100vh', overflowY: 'auto', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }}>
          
          {/* Education Section */}
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem' }}>Education</h2>
            {background.education.map((edu, index) => (
              <div key={index} style={{ marginBottom: '1rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '4px' }}>
                <input
                  type="text"
                  placeholder="Degree (e.g., PhD, B.Tech)"
                  value={edu.degree}
                  onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                  style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
                />
                <input
                  type="text"
                  placeholder="Department"
                  value={edu.department}
                  onChange={(e) => handleEducationChange(index, 'department', e.target.value)}
                  style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
                />
                <input
                  type="text"
                  placeholder="Institution"
                  value={edu.institution}
                  onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                  style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
                />
                <input
                  type="text"
                  placeholder="Year (e.g., 2019-Present)"
                  value={edu.year}
                  onChange={(e) => handleEducationChange(index, 'year', e.target.value)}
                  style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
                />
                <textarea
                  placeholder="Additional details"
                  value={edu.details}
                  onChange={(e) => handleEducationChange(index, 'details', e.target.value)}
                  style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem', minHeight: '100px' }}
                />
              </div>
            ))}
            <button
              onClick={() => addEntry('education')}
              style={{
                width: '100%',
                padding: '0.5rem',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                marginBottom: '1rem',
              }}
            >
              Add Education Entry
            </button>
          </div>

          {/* Work Experience Section */}
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem' }}>Work Experience</h2>
            {background.workExperience.map((work, index) => (
              <div key={index} style={{ marginBottom: '1rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '4px' }}>
                <input
                  type="text"
                  placeholder="Job Title"
                  value={work.title}
                  onChange={(e) => handleWorkChange(index, 'title', e.target.value)}
                  style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
                />
                <input
                  type="text"
                  placeholder="Company"
                  value={work.company}
                  onChange={(e) => handleWorkChange(index, 'company', e.target.value)}
                  style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
                />
                <input
                  type="text"
                  placeholder="Duration (e.g., Jul 2016-Mar 2018)"
                  value={work.duration}
                  onChange={(e) => handleWorkChange(index, 'duration', e.target.value)}
                  style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={work.location}
                  onChange={(e) => handleWorkChange(index, 'location', e.target.value)}
                  style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
                />
                <textarea
                  placeholder="Job description"
                  value={work.description}
                  onChange={(e) => handleWorkChange(index, 'description', e.target.value)}
                  style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem', minHeight: '100px' }}
                />
              </div>
            ))}
            <button
              onClick={() => addEntry('workExperience')}
              style={{
                width: '100%',
                padding: '0.5rem',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                marginBottom: '1rem',
              }}
            >
              Add Work Experience Entry
            </button>
          </div>

          {/* Internships Section - Similar to Work Experience */}
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem' }}>Internships</h2>
            {background.internships.map((internship, index) => (
              <div key={index} style={{ marginBottom: '1rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '4px' }}>
                <input
                  type="text"
                  placeholder="Role"
                  value={internship.role}
                  onChange={(e) => handleInternshipChange(index, 'role', e.target.value)}
                  style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
                />
                <input
                  type="text"
                  placeholder="Company"
                  value={internship.company}
                  onChange={(e) => handleInternshipChange(index, 'company', e.target.value)}
                  style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
                />
                <input
                  type="text"
                  placeholder="Duration (e.g., May 2015-Jul 2015)"
                  value={internship.duration}
                  onChange={(e) => handleInternshipChange(index, 'duration', e.target.value)}
                  style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={internship.location}
                  onChange={(e) => handleInternshipChange(index, 'location', e.target.value)}
                  style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
                />
                <textarea
                  placeholder="Description"
                  value={internship.description}
                  onChange={(e) => handleInternshipChange(index, 'description', e.target.value)}
                  style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem', minHeight: '100px' }}
                />
              </div>
            ))}
            <button
              onClick={() => addEntry('internships')}
              style={{
                width: '100%',
                padding: '0.5rem',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                marginBottom: '1rem',
              }}
            >
              Add Internship Entry
            </button>
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
        <div style={{ width: '67%', padding: '1rem', boxSizing: 'border-box', maxHeight: '100vh', overflowY: 'auto' }}>
          <div style={{ border: '1px solid #ccc', borderRadius: '4px', overflow: 'hidden' }}>
            <Header />
            
            <div style={{ padding: '2rem' }}>
              {/* Education Preview */}
              <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Educational Background</h2>
                {background.education.map((edu, index) => (
                  <div key={index} style={{ marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{edu.degree}</h3>
                    <p>{edu.department}, {edu.institution} ({edu.year})</p>
                    {edu.details && <p style={{ marginTop: '0.5rem' }}>{edu.details}</p>}
                  </div>
                ))}
              </div>

              {/* Work Experience Preview */}
              <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Work Experience</h2>
                {background.workExperience.map((work, index) => (
                  <div key={index} style={{ marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{work.title}</h3>
                    <p>{work.company}, {work.location} ({work.duration})</p>
                    {work.description && <p style={{ marginTop: '0.5rem' }}>{work.description}</p>}
                  </div>
                ))}
              </div>

              {/* Internships Preview */}
              <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Internships</h2>
                {background.internships.map((internship, index) => (
                  <div key={index} style={{ marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{internship.role}</h3>
                    <p>{internship.company}, {internship.location} ({internship.duration})</p>
                    {internship.description && <p style={{ marginTop: '0.5rem' }}>{internship.description}</p>}
                  </div>
                ))}
              </div>
            </div>

            <Footer />
          </div>
        </div>

        {showModal && <Modal setShowModal={setShowModal} />}
      </div>
    </>
  );
}