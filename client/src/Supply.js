import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Web3 from "web3";
import SupplyChainABI from "./artifacts/SupplyChain.json";

function Supply() {
    const history = useHistory();
    useEffect(() => {
        loadWeb3();
        loadBlockchaindata();
    }, []);

    const [currentaccount, setCurrentaccount] = useState("");
    const [loader, setloader] = useState(true);
    const [SupplyChain, setSupplyChain] = useState();
    const [MED, setMED] = useState();
    const [MedStage, setMedStage] = useState();
    const [ID, setID] = useState();

    const loadWeb3 = async () => {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
        } else {
            window.alert("Non-Ethereum browser detected. You should consider trying MetaMask!");
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
            var i;
            const medCtr = await supplychain.methods.medicineCtr().call();
            const med = {};
            const medStage = [];
            for (i = 0; i < medCtr; i++) {
                med[i] = await supplychain.methods.MedicineStock(i + 1).call();
                medStage[i] = await supplychain.methods.showStage(i + 1).call();
            }
            setMED(med);
            setMedStage(medStage);
            setloader(false);
        } else {
            window.alert('The smart contract is not deployed to the current network');
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

    const handlerChangeID = (event) => {
        setID(event.target.value);
    };

    const handlerSubmitRMSsupply = async (event) => {
        event.preventDefault();
        try {
            var reciept = await SupplyChain.methods.RMSsupply(ID).send({ from: currentaccount });
            if (reciept) {
                loadBlockchaindata();
            }
        } catch (err) {
            alert("An error occurred!!!");
        }
    };

    const handlerSubmitManufacturing = async (event) => {
        event.preventDefault();
        try {
            var reciept = await SupplyChain.methods.Manufacturing(ID).send({ from: currentaccount });
            if (reciept) {
                loadBlockchaindata();
            }
        } catch (err) {
            alert("An error occurred!!!");
        }
    };

    const handlerSubmitDistribute = async (event) => {
        event.preventDefault();
        try {
            var reciept = await SupplyChain.methods.Distribute(ID).send({ from: currentaccount });
            if (reciept) {
                loadBlockchaindata();
            }
        } catch (err) {
            alert("An error occurred!!!");
        }
    };

    const handlerSubmitRetail = async (event) => {
        event.preventDefault();
        try {
            var reciept = await SupplyChain.methods.Retail(ID).send({ from: currentaccount });
            if (reciept) {
                loadBlockchaindata();
            }
        } catch (err) {
            alert("An error occurred!!!");
        }
    };

    const handlerSubmitSold = async (event) => {
        event.preventDefault();
        try {
            var reciept = await SupplyChain.methods.sold(ID).send({ from: currentaccount });
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
            <br/>
            <span><b>Current Account Address:</b> {currentaccount}</span>
            
            
            {/* <h6><b>Supply Chain Flow:</b></h6> */}
            {/* <p>Medicine Order -&gt; Raw Material Supplier -&gt; Manufacturer -&gt; Distributor -&gt; Retailer -&gt; Consumer</p> */}
           
     
            <table className="table table-sm table-dark" style={styles.tableSize} >
                <thead>
                    <tr>
                        <th scope="col">Medicine ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Current Processing Stage</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(MED).map(function (key) {
                        return (
                            <tr key={key} style={styles.tableRow}>
                                <td style={styles.tableCell}>{MED[key].id }</td>
                                <td style={styles.tableCell}>{MED[key].name}</td>
                                <td style={styles.tableCell}>{MED[key].description}</td>
                                <td style={styles.tableCell}>
                                    {
                                        MedStage[key]
                                    }
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <br/>
            <br/>
            <div style={styles.section}>
                <h5><strong>Step 1: Supply Raw Materials</strong>-</h5>
                <form onSubmit={handlerSubmitRMSsupply}>
                    <input className="form-control-sm" style={styles.input} type="text" onChange={handlerChangeID} placeholder="Enter Medicine ID" required />
                    <button className="btn btn-outline-success btn-sm" style={styles.button} onSubmit={handlerSubmitRMSsupply}>Supply</button>
                </form>
                <br />
            </div>
            <br/>
            <div style={styles.section}>
                <h5><strong>Step 2: Manufacture</strong></h5>
                <form onSubmit={handlerSubmitManufacturing}>
                    <input className="form-control-sm" style={styles.input} type="text" onChange={handlerChangeID} placeholder="Enter Medicine ID" required />
                    <button className="btn btn-outline-success btn-sm" style={styles.button} onSubmit={handlerSubmitManufacturing}>Manufacture</button>
                </form>
                <br />
            </div>
            <br/>
            <div style={styles.section}>
                <h5><strong>Step 3: Distribute</strong></h5>
                <form onSubmit={handlerSubmitDistribute}>
                    <input className="form-control-sm" style={styles.input} type="text" onChange={handlerChangeID} placeholder="Enter Medicine ID" required />
                    <button className="btn btn-outline-success btn-sm" style={styles.button} onSubmit={handlerSubmitDistribute}>Distribute</button>
                </form>
                <br />
            </div>
            <br/>
            <div style={styles.section}>
                <h5><strong>Step 4: Retail</strong></h5>
                <form onSubmit={handlerSubmitRetail}>
                    <input className="form-control-sm" style={styles.input} type="text" onChange={handlerChangeID} placeholder="Enter Medicine ID" required />
                    <button className="btn btn-outline-success btn-sm" style={styles.button} onSubmit={handlerSubmitRetail}>Retail</button>
                </form>
                <br />
            </div>
            <br/>
            <div style={styles.section}>
                <h5><strong>Step 5: Mark as sold</strong></h5>
                <form onSubmit={handlerSubmitSold}>
                    <input className="form-control-sm" style={styles.input} type="text" onChange={handlerChangeID} placeholder="Enter Medicine ID" required />
                    <button className="btn btn-outline-success btn-sm" style={styles.button} onSubmit={handlerSubmitSold}>Sold</button>
                </form>
            </div>
            <br/>
        </div>
    );
}

const styles = {
    container: {
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
    },
    section: {
        marginTop: '20px',
        textAlign: 'center',
        padding: '10px',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#d9d9d9',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        width: '600px',
        margin: '0 auto',
    },
    input: {
        marginBottom: '10px',
        padding: '5px',
        width: '100%',
        border: '1px solid #ccc',
        borderRadius: '5px'
    },
    button: {
        padding: '5px',
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
        }
    },
    navbar: {
        backgroundColor: '#343a40',
        color: '#fff',
        padding: '10px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    navbarText: {
        fontSize: '24px'
    },
    homeButton: {
        cursor: 'pointer',
        backgroundColor: '#007bff',
        color: '#fff',
        padding: '10px 20px',
        borderRadius: '5px'
    },
    tableRow: {
        borderBottom: '1px solid #ddd',
        backgroundColor: 'white',

    },
    tableCell: {
        padding: '10px',
        textAlign: 'center',
        color: 'black',
    },
    tableSize: {
        marginTop: '20px',
        textAlign: 'center',
        padding: '10px',
        fontFamily: 'Arial, sans-serif',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        width: '1300px',
        margin: '0 auto',
        

    }
};

export default Supply;
