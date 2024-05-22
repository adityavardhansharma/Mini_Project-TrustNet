import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Home() {
    const history = useHistory();
    const [hoveredButton, setHoveredButton] = useState(null);

    const redirect_to_roles = () => {
        history.push('/roles');
    };
    const redirect_to_addmed = () => {
        history.push('/addmed');
    };
    const redirect_to_supply = () => {
        history.push('/supply');
    };
    const redirect_to_track = () => {
        history.push('/track');
    };

    const handleMouseEnter = (button) => {
        setHoveredButton(button);
    };

    const handleMouseLeave = () => {
        setHoveredButton(null);
    };

    return (
        <div>
             <nav style={styles.navbar}>
                <span style={styles.navbarText}>TrustNet</span>
            </nav>
            <div style={styles.container}>
                <h3 style={styles.title}>Medicine Supply Chain Flow</h3>
                <div style={styles.step}>
                    <h5>Step 1: Owner Should Register Raw material suppliers, Manufacturers, Distributors and Retailers</h5>
                    <button
                        onClick={redirect_to_roles}
                        style={{
                            ...styles.button,
                            ...(hoveredButton === 'roles' ? styles.buttonHover : {}),
                        }}
                        onMouseEnter={() => handleMouseEnter('roles')}
                        onMouseLeave={handleMouseLeave}
                    >
                        Register
                    </button>
                </div>
                <div style={styles.step}>
                    <h5>Step 2: Owner should order medicines</h5>
                    <button
                        onClick={redirect_to_addmed}
                        style={{
                            ...styles.button,
                            ...(hoveredButton === 'addmed' ? styles.buttonHover : {}),
                        }}
                        onMouseEnter={() => handleMouseEnter('addmed')}
                        onMouseLeave={handleMouseLeave}
                    >
                        Order Medicines
                    </button>
                </div>
                <div style={styles.step}>
                    <h5>Step 3: Control Supply Chain</h5>
                    <button
                        onClick={redirect_to_supply}
                        style={{
                            ...styles.button,
                            ...(hoveredButton === 'supply' ? styles.buttonHover : {}),
                        }}
                        onMouseEnter={() => handleMouseEnter('supply')}
                        onMouseLeave={handleMouseLeave}
                    >
                        Control Supply Chain
                    </button>
                </div>
            </div>
            <div style={styles.trackContainer}>
                <div style={styles.trackSection}>
                    <h5><b>Track</b> the medicines:</h5>
                    <button
                        onClick={redirect_to_track}
                        style={{
                            ...styles.button,
                            ...(hoveredButton === 'track' ? styles.buttonHover : {}),
                        }}
                        onMouseEnter={() => handleMouseEnter('track')}
                        onMouseLeave={handleMouseLeave}
                    >
                        Track Medicines
                    </button>
                </div>
            </div>
        </div>
    );
}

const styles = {
    navbar: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '60px',
        backgroundColor: '#343a40',
        color: '#fff',
        marginBottom: '20px',
    },
    navbarText: {
        fontSize: '24px',
        fontWeight: 'bold',
    },
    container: {
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f5f5f5',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '800px',
        margin: '40px auto',
        textAlign: 'center',
    },
    trackContainer: {
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f5f5f5',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '800px',
        margin: '40px auto',
        marginTop: '20px', // Added space between the two containers
        textAlign: 'center',
    },
    title: {
        color: '#007bff',
        marginBottom: '20px',
        fontWeight: 'bold',
    },
    note: {
        color: '#6c757d',
        fontStyle: 'italic',
    },
    step: {
        marginBottom: '20px',
        fontWeight: 'bold',
    },
    button: {
        display: 'block',
        width: '200px',
        margin: '10px auto',
        padding: '15px 30px',
        fontSize: '16px',
        color: '#fff',
        backgroundColor: '#28a745',
        border: '2px solid #28a745',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s, color 0.3s, transform 0.3s',
    },
    buttonHover: {
        backgroundColor: '#fff',
        color: '#007bff',
        transform: 'scale(1.05)',
    },
    separator: {
        margin: '20px 0',
    },
    trackSection: {
        textAlign: 'center',
    },
};

export default Home;
