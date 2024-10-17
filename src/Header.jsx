import React from "react";
import { usePortfolio } from "./PortfolioContext";

function Header(){
    const {portfolio}=usePortfolio();
    return(
        <>
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
          </>

    )
}
export default Header;