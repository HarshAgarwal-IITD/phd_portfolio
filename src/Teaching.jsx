import React, { useState } from 'react';
import Modal from './Modal';
import Header from './Header';
import Footer from './Footer';
import { usePortfolio } from './PortfolioContext';

export default function Teaching() {
  const { teaching, setTeaching } = usePortfolio();
  const [showModal, setShowModal] = useState(false);
  const [showLectures, setShowLectures] = useState(true);
  const [showMentorships, setShowMentorships] = useState(false);

  const handleShowLectures = () => {
    setShowLectures(true);
    setShowMentorships(false);
  }

  const handleShowMentorships = () => {
    setShowLectures(false);
    setShowMentorships(true);
  }

  // Handle changes for lecture entries
  const handleLectureChange = (index, field, value) => {
    const newLectures = [...teaching.lectures];
    newLectures[index][field] = value;
    setTeaching(prev => ({
      ...prev,
      lectures: newLectures
    }));
  };

  // Handle changes for mentorship entries
  const handleMentorshipChange = (index, field, value) => {
    const newMentorships = [...teaching.mentorships];
    newMentorships[index][field] = value;
    setTeaching(prev => ({
      ...prev,
      mentorships: newMentorships
    }));
  };

  // Add new entry for each section
  const addEntry = (section) => {
    const newEntries = {
      lectures: [
        { title: '', date: '', description: '' }
      ],
      mentorships: [
        { title: '', date: '', description: '' }
      ]
    };
    
    setTeaching(prev => ({
      ...prev,
      [section]: [...prev[section], newEntries[section][0]]
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
          
          <div>
            <nav style={{ display: 'flex', flexDirection: 'row', backgroundColor: '#f4f4f4' }}>
              <button 
                onClick={handleShowLectures} 
                style={{ 
                  width: '100%', 
                  padding: '10px', 
                  border: '1px solid #ccc', 
                  backgroundColor: '#f4f4f4', 
                  cursor: 'pointer', 
                  fontSize: '16px',
                  textDecoration: showLectures ? 'underline' : 'none'
                }}
              >
                Lectures
              </button>
              <button 
                onClick={handleShowMentorships} 
                style={{ 
                  width: '100%', 
                  padding: '10px', 
                  border: '1px solid #ccc', 
                  backgroundColor: '#f4f4f4', 
                  cursor: 'pointer', 
                  fontSize: '16px',
                  textDecoration: showMentorships ? 'underline' : 'none'
                }}
              >
                Mentorships
              </button>
            </nav>
          </div>

          {/* Lectures Section */}
          {showLectures && (
            <div style={{ marginBottom: '5px' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem' }}>Lectures</h2>
              {teaching.lectures.map((lecture, index) => (
                <div key={index} style={{ marginBottom: '1rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '4px' }}>
                  <input
                    type="text"
                    placeholder="Lecture Title"
                    value={lecture.title}
                    onChange={(e) => handleLectureChange(index, 'title', e.target.value)}
                    style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
                  />
                  <input
                    type="text"
                    placeholder="Date (e.g., Spring 2024)"
                    value={lecture.date}
                    onChange={(e) => handleLectureChange(index, 'date', e.target.value)}
                    style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
                  />
                  <textarea
                    placeholder="Description"
                    value={lecture.description}
                    onChange={(e) => handleLectureChange(index, 'description', e.target.value)}
                    style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem', minHeight: '100px' }}
                  />
                </div>
              ))}
              <button
                onClick={() => addEntry('lectures')}
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
                Add Lecture Entry
              </button>
            </div>
          )}

          {/* Mentorships Section */}
          {showMentorships && (
            <div style={{ marginBottom: '5px' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem' }}>Mentorships</h2>
              {teaching.mentorships.map((mentorship, index) => (
                <div key={index} style={{ marginBottom: '1rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '4px' }}>
                  <input
                    type="text"
                    placeholder="Mentorship Title"
                    value={mentorship.title}
                    onChange={(e) => handleMentorshipChange(index, 'title', e.target.value)}
                    style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
                  />
                  <input
                    type="text"
                    placeholder="Date (e.g., 2023-2024)"
                    value={mentorship.date}
                    onChange={(e) => handleMentorshipChange(index, 'date', e.target.value)}
                    style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
                  />
                  <textarea
                    placeholder="Description"
                    value={mentorship.description}
                    onChange={(e) => handleMentorshipChange(index, 'description', e.target.value)}
                    style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem', minHeight: '100px' }}
                  />
                </div>
              ))}
              <button
                onClick={() => addEntry('mentorships')}
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
                Add Mentorship Entry
              </button>
            </div>
          )}

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
            <div style={{ display: 'flex' }}>
              {/* Sidebar */}
              <div className='sidebar' style={{ width: '20%', padding: '1rem', borderRight: '1px solid #ccc' }}>   
                <div 
                  className="nav-item" 
                  style={{
                    color: '#FF69B4',
                    cursor: 'pointer',
                    marginBottom: '20px',
                    fontSize: '25px',
                    textDecoration: showLectures ? 'underline' : 'none'
                  }}
                >
                  Lectures
                </div>
                <div 
                  className="nav-item" 
                  style={{
                    color: '#FF69B4',
                    cursor: 'pointer',
                    marginBottom: '20px',
                    fontSize: '25px',
                    textDecoration: showMentorships ? 'underline' : 'none'
                  }}
                >
                  Mentorships
                </div>
              </div>

              {/* Main Content */}
              <div style={{ width: '80%', minHeight: "30vh", padding: '2rem' }}>
                {/* Lectures Preview */}
                {showLectures && (
                  <div style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>Lectures</h2>
                    {teaching.lectures.map((lecture, index) => (
                      <div key={index} style={{ marginBottom: '1.5rem' }}>
                        <span style={{ fontWeight: 'bold', fontSize: "1.2rem", marginBottom: "5px" }}>
                          {lecture.title}
                        </span>
                        {lecture.date && (
                          <span style={{ fontWeight: 'bold', fontSize: "1.2rem", marginBottom: "5px" }}>
                            ({lecture.date})
                          </span>
                        )}
                        {lecture.description && (
                          <p style={{ marginTop: "10px", marginBottom: "5px" }}>
                            {lecture.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Mentorships Preview */}
                {showMentorships && (
                  <div style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>Mentorships</h2>
                    {teaching.mentorships.map((mentorship, index) => (
                      <div key={index} style={{ marginBottom: '1.5rem' }}>
                        <span style={{ fontWeight: 'bold', fontSize: "1.2rem", marginBottom: "5px" }}>
                          {mentorship.title}
                        </span>
                        {mentorship.date && (
                          <span style={{ fontWeight: 'bold', fontSize: "1.2rem", marginBottom: "5px" }}>
                            ({mentorship.date})
                          </span>
                        )}
                        {mentorship.description && (
                          <p style={{ marginTop: "10px", marginBottom: "5px" }}>
                            {mentorship.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
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