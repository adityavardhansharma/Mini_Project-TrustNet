import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Web3 from "web3";
import SupplyChainABI from "./artifacts/SupplyChain.json";

function AddMed() {
    const history = useHistory();
    useEffect(() => {
        loadWeb3();
        loadBlockchaindata();
    }, []);

    const [currentaccount, setCurrentaccount] = useState("");
    const [loader, setloader] = useState(true);
    const [SupplyChain, setSupplyChain] = useState();
    const [MED, setMED] = useState({});
    const [MedName, setMedName] = useState("");
    const [MedDes, setMedDes] = useState("");
    const [MedStage, setMedStage] = useState([]);

    const loadWeb3 = async () => {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
        } else {
            window.alert(
                "Non-Ethereum browser detected. You should consider trying MetaMask!"
            );
        }
    };

    const loadBlockchaindata = async () => {
        setloader(true);
        const web3 = window.web3;
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];
        setCurrentaccount(account);
        const networkId = await web3.eth.net.getId();
        const networkData = SupplyChainABI.networks[networkId];
        if (networkData) {
            const supplychain = new web3.eth.Contract(SupplyChainABI.abi, networkData.address);
            setSupplyChain(supplychain);
            const medCtr = await supplychain.methods.medicineCtr().call();
            const med = {};
            const medStage = [];
            for (let i = 0; i < medCtr; i++) {
                med[i] = await supplychain.methods.MedicineStock(i + 1).call();
                medStage[i] = await supplychain.methods.showStage(i + 1).call();
            }
            setMED(med);
            setMedStage(medStage);
            setloader(false);
        } else {
            window.alert('The smart contract is not deployed to current network');
        }
    };

    if (loader) {
        return (
            <div>
                <h1 className="wait">Loading...</h1>
            </div>
        );
    }

    const redirect_to_home = () => {
        history.push('/');
    };

    const handlerChangeNameMED = (event) => {
        setMedName(event.target.value);
    };

    const handlerChangeDesMED = (event) => {
        setMedDes(event.target.value);
    };

    const handlerSubmitMED = async (event) => {
        event.preventDefault();
        try {
            const reciept = await SupplyChain.methods.addMedicine(MedName, MedDes).send({ from: currentaccount });
            if (reciept) {
                loadBlockchaindata();
            }
        } catch (err) {
            alert("An error occurred!!!");
        }
    };

    return (
        <div style={styles.container}>
            <nav style={styles.navbar}>
                <span style={styles.navbarText}>TrustNet</span>
                <span onClick={redirect_to_home} style={styles.homeButton}>HOME</span>
            </nav>
            <br />
            <span style={styles.account}><b>Current Account Address:</b> {currentaccount}</span>
            <div style={styles.section}>
                <h4><strong>Add Medicine Order:</strong></h4>
                <form onSubmit={handlerSubmitMED} style={styles.form}>
                    <input style={styles.input} type="text" onChange={handlerChangeNameMED} placeholder="Medicine Name" required />
                    <input style={styles.input} type="text" onChange={handlerChangeDesMED} placeholder="Medicine Description" required />
                    <button style={styles.button}>Order</button>
                </form>
                <h5 style={{ marginTop: '20px' }}>Ordered Medicines:</h5>
                <table style={styles.table}>
                    <thead style={{ ...styles.tableHead, backgroundColor: '#343a40', color: '#fff' }}>
                        <tr>
                            <th style={{ ...styles.tableCell, backgroundColor: '#495057', color: '#fff' }}>ID</th>
                            <th style={{ ...styles.tableCell, backgroundColor: '#495057', color: '#fff' }}>Name</th>
                            <th style={{ ...styles.tableCell, backgroundColor: '#495057', color: '#fff' }}>Description</th>
                            <th style={{ ...styles.tableCell, backgroundColor: '#495057', color: '#fff' }}>Current Stage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(MED).map(function (key) {
                            return (
                                <tr key={key} style={styles.tableRow}>
                                    <td style={styles.tableCell}>{MED[key].id}</td>
                                    <td style={styles.tableCell}>{MED[key].name}</td>
                                    <td style={styles.tableCell}>{MED[key].description}</td>
                                    <td style={styles.tableCell}>{MedStage[key]}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

const styles = {
    container: {
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
    },
    navbar: {
        backgroundColor: '#343a40',
        color: '#fff',
        padding: '10px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    navbarText: {
        fontSize: '24px',
    },
    homeButton: {
        cursor: 'pointer',
        backgroundColor: '#007bff',
        color: '#fff',
        padding: '10px 20px',
        borderRadius: '5px',
    },
    account: {
        display: 'block',
        marginBottom: '20px',
        fontSize: '16px',
    },
    section: {
        marginTop: '20px',
        textAlign: 'center',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#d9d9d9',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '400px',
        margin: '0 auto',
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        backgroundColor: '#f9f9f9',
    },
    input: {
        marginBottom: '10px',
        padding: '10px',
        width: '100%',
        border: '1px solid #ccc',
        borderRadius: '5px',
    },
    button: {
        padding: '10px',
        width: '100%',
        border: 'none',
        borderRadius: '5px',
        backgroundColor: '#28a745',
        color: '#fff',
        cursor: 'pointer',
        transition: 'background-color 0.3s, color 0.3s, transform 0.3s',
        '&:hover': {
            backgroundColor: '#fff',
            color: '#28a745',
            transform: 'scale(1.05)',
        },
    },
    table: {
        width: '80%',
        margin: '20px auto',
        borderCollapse: 'collapse',
    },
    tableHead: {
        backgroundColor: '#f8f9fa',
    },
    tableRow: {
        borderBottom: '1px solid #ddd',
        backgroundColor: 'white',
    },
    tableCell: {
        padding: '10px',
        textAlign: 'center',
    },
};

export default AddMed;
