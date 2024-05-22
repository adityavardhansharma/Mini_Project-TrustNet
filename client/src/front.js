import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Typed from 'typed.js';

function Front() {
  const history = useHistory();
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const typed = new Typed('.typed-text', {
      strings: ['TrustNet', 'Security'],
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 1500,
      loop: true,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  const handleStart = () => {
    history.push('/home');
  };

  const handleMouseEnter = () => {
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
  };

  return (
    <div style={styles.container}>
      <video
        style={styles.video}
        src="/Digital_Grapes.mp4"
        type="video/mp4"
        autoPlay
        loop
        muted
      ></video>
      <div style={styles.overlay}>
        <nav style={styles.navbar}>
          <div style={styles.navbarBrand}>TrustNet</div>
        </nav>
        <div style={styles.contentContainer}>
          <div style={styles.content}>
            <div style={styles.headingContainer}>
              <h1 style={styles.heading}>
                Welcome to <span className="typed-text" style={styles.typedText}></span>
              </h1>
            </div>
            <button
              style={{
                ...styles.startButton,
                ...(hover ? styles.startButtonHover : {}),
              }}
              onClick={handleStart}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    overflow: 'hidden',
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    zIndex: -1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: 'rgba(0, 123, 255, 0.8)',
    color: '#fff',
    width: '100%',
  },
  navbarBrand: {
    fontSize: '24px',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  startButton: {
    backgroundColor: '#fff',
    color: '#007bff',
    border: '2px solid #007bff',
    padding: '15px 30px',
    cursor: 'pointer',
    fontSize: '20px',
    borderRadius: '5px',
    transition: 'background-color 0.3s, color 0.3s',
    marginTop: '20px',
  },
  startButtonHover: {
    backgroundColor: 'transparent',
    color: '#fff',
    border: '2px solid #fff',
  },
  contentContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: '20px',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  headingContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  heading: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  typedText: {
    color: 'red',
  },
};

export default Front;