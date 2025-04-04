import React from "react";
import { usePortfolio } from "./PortfolioContext";

function Header(){
    const {portfolio , images , setImages ,imageUrls}=usePortfolio();
    return(
        <>
          
        <header style={{
            backgroundColor: '#f4f4f4',
            backgroundImage: imageUrls.backgroundImage ? `url(${imageUrls.backgroundImage})` : '',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: '#333',
            textAlign: 'center',
            padding: '2rem',
            minHeight:'200px',
            maxHeight:'250px',

          }}>
            
            {imageUrls.profilePictureUrl && (
              // <img 
              //   src={URL.createObjectURL(portfolio.header.profilePicture)} 
              //   alt={portfolio.header.name}
              //   style={{
              //     width: '150px',
              //     height: '150px',
              //     borderRadius: '50%',
              //     objectFit: 'cover',
              //     margin: '0 auto'
              //   }}
              // />
              
                <div>
                  <img src={imageUrls.profilePictureUrl} alt="Selected" style={{
                 width: '150px',
                 height: '150px',
                   borderRadius: '50%',
                  objectFit: 'cover',
                  margin: '0 '
                  }}/>
              
                </div>
              
            )}
            <h1 style={{ fontSize: '2rem', marginTop: '0.5rem',color:'white' }}>{portfolio.header.name || 'Your Name'}</h1>

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