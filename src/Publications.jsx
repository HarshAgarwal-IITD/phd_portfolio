import React, { useState } from 'react';
import Modal from './Modal';
import Header from './Header';
import Footer from './Footer';
import {  usePortfolio } from './PortfolioContext';

export default function Publications() {
  const { publications, setPublications} = usePortfolio();

  const [showModal, setShowModal] = useState(false);

  // Handle input change for journals
  const handleJournalChange = (index, field, value) => {
    const newJournals = [...publications.journals];
    newJournals[index][field] = value;
    setPublications(prev => ({
      ...prev,
      journals: newJournals
    }));
  };

  // Handle input change for conferences
  const handleConferenceChange = (index, field, value) => {
    const newConferences = [...publications.conferences];
    newConferences[index][field] = value;
    setPublications(prev => ({
      ...prev,
      conferences: newConferences
    }));
  };

  // Add new entry
  const addEntry = (section) => {
    const newEntry = section === 'journals' 
      ? { authors: '', year: '', title: '', journal: '', volume: '', pages: '', link: '' }
      : { authors: '', year: '', title: '', conference: '', location: '', link: '' };
    
    setPublications(prev => ({
      ...prev,
      [section]: [...prev[section], newEntry]
    }));
  };

  const handleSubmit = () => {
    setShowModal(true);
  };

  return (
    <>
      <div style={{ display: 'flex', gap: '1rem', width: '100%' }}>
        {/* Form Inputs */}
        <div style={{ width: '33%', 
            padding: '1rem', 
            maxHeight: '100vh',  // Set the max height for the form container
            overflowY: 'auto',   // Enable vertical scroll when content overflows
            boxSizing: 'border-box', 
            border: '1px solid #ccc',  // Optional border to highlight the section
            borderRadius: '4px'  }}>
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
              Journals
            </h2>
            {publications.journals.map((journal, index) => (
              <div key={index} style={{ marginBottom: '1rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}>
                <input
                  type="text"
                  placeholder="Authors (e.g., Ahuja, S., Kumar, J.)"
                  value={journal.authors}
                  onChange={(e) => handleJournalChange(index, 'authors', e.target.value)}
                  style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem', boxSizing: 'border-box' }}
                />
                <input
                  type="text"
                  placeholder="Year (e.g., 2022)"
                  value={journal.year}
                  onChange={(e) => handleJournalChange(index, 'year', e.target.value)}
                  style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem', boxSizing: 'border-box' }}
                />
                <input
                  type="text"
                  placeholder="Title"
                  value={journal.title}
                  onChange={(e) => handleJournalChange(index, 'title', e.target.value)}
                  style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem', boxSizing: 'border-box' }}
                />
                <input
                  type="text"
                  placeholder="Journal Name"
                  value={journal.journal}
                  onChange={(e) => handleJournalChange(index, 'journal', e.target.value)}
                  style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem', boxSizing: 'border-box' }}
                />
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    type="text"
                    placeholder="Volume"
                    value={journal.volume}
                    onChange={(e) => handleJournalChange(index, 'volume', e.target.value)}
                    style={{ width: '50%', marginBottom: '0.5rem', padding: '0.5rem', boxSizing: 'border-box' }}
                  />
                  <input
                    type="text"
                    placeholder="Pages"
                    value={journal.pages}
                    onChange={(e) => handleJournalChange(index, 'pages', e.target.value)}
                    style={{ width: '50%', marginBottom: '0.5rem', padding: '0.5rem', boxSizing: 'border-box' }}
                  />
                </div>
                <input
                  type="text"
                  placeholder="Link"
                  value={journal.link}
                  onChange={(e) => handleJournalChange(index, 'link', e.target.value)}
                  style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem', boxSizing: 'border-box' }}
                />
              </div>
            ))}
            <button
              onClick={() => addEntry('journals')}
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
              Add Journal Entry
            </button>
          </div>

          <div style={{ marginBottom: '2rem' , }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
              Conferences
            </h2>
            {publications.conferences.map((conference, index) => (
              <div key={index} style={{ marginBottom: '1rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}>
                <input
                  type="text"
                  placeholder="Authors (e.g., Ahuja, S., Kumar, J.)"
                  value={conference.authors}
                  onChange={(e) => handleConferenceChange(index, 'authors', e.target.value)}
                  style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem', boxSizing: 'border-box' }}
                />
                <input
                  type="text"
                  placeholder="Year (e.g., 2022)"
                  value={conference.year}
                  onChange={(e) => handleConferenceChange(index, 'year', e.target.value)}
                  style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem', boxSizing: 'border-box' }}
                />
                <input
                  type="text"
                  placeholder="Title"
                  value={conference.title}
                  onChange={(e) => handleConferenceChange(index, 'title', e.target.value)}
                  style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem', boxSizing: 'border-box' }}
                />
                <input
                  type="text"
                  placeholder="Conference Name"
                  value={conference.conference}
                  onChange={(e) => handleConferenceChange(index, 'conference', e.target.value)}
                  style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem', boxSizing: 'border-box' }}
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={conference.location}
                  onChange={(e) => handleConferenceChange(index, 'location', e.target.value)}
                  style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem', boxSizing: 'border-box' }}
                />
                <input
                  type="text"
                  placeholder="Link"
                  value={conference.link}
                  onChange={(e) => handleConferenceChange(index, 'link', e.target.value)}
                  style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem', boxSizing: 'border-box' }}
                />
              </div>
            ))}
            <button
              onClick={() => addEntry('conferences')}
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
              Add Conference Entry
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
        <div style={{ width: '67%', padding: '1rem', boxSizing: 'border-box',maxHeight: '100vh',  // Set the max height for the form container
            overflowY: 'auto',   
              }}>
          <div style={{ border: '1px solid #ccc', borderRadius: '4px', overflow: 'hidden' }}>
            <Header />
            
            <div style={{ padding: '2rem' }}>
  <div style={{ minHeight: '150px' }}> {/* Minimum height for Journals section */}
    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Journals</h2>
    {publications.journals.map((journal, index) => (
      <p key={index} style={{ marginBottom: '1rem' }}>
        {journal.authors} {journal.year && `(${journal.year})`}. {journal.title}. <i>{journal.journal}</i>
        {journal.volume && `, ${journal.volume}`}{journal.pages && `, ${journal.pages}`}.
        {journal.link && (
          <a href={journal.link} style={{ color: '#007bff', textDecoration: 'none' }}> Link</a>
        )}
      </p>
    ))}
  </div>

  <div style={{ minHeight: '150px', marginTop: '2rem' }}> {/* Minimum height for Conferences section */}
    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Conferences</h2>
    {publications.conferences.map((conference, index) => (
      <p key={index} style={{ marginBottom: '1rem' }}>
        {conference.authors} {conference.year && `(${conference.year})`}. {conference.title}. <i>{conference.conference}</i>
        {conference.location && `, ${conference.location}`}.
        {conference.link && (
          <a href={conference.link} style={{ color: '#007bff', textDecoration: 'none' }}> Link</a>
        )}
      </p>
    ))}
  </div>
</div>


            <Footer />
          </div>
        </div>

        {showModal && <Modal setShowModal={setShowModal}  />}
      </div>
    </>
  );
}
