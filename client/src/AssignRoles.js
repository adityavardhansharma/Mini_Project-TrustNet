import React, { useState, useEffect } from 'react';
import Web3 from "web3";
import SupplyChainABI from "./artifacts/SupplyChain.json";
import { useHistory } from "react-router-dom";

function AssignRoles() {
    const history = useHistory();
    useEffect(() => {
        loadWeb3();
        loadBlockchaindata();
    }, []);
    const [currentaccount, setCurrentaccount] = useState("");
    const [loader, setloader] = useState(true);
    const [SupplyChain, setSupplyChain] = useState();
    const [RMSname, setRMSname] = useState("");
    const [MANname, setMANname] = useState("");
    const [DISname, setDISname] = useState("");
    const [RETname, setRETname] = useState("");
    const [RMSplace, setRMSplace] = useState("");
    const [MANplace, setMANplace] = useState("");
    const [DISplace, setDISplace] = useState("");
    const [RETplace, setRETplace] = useState("");
    const [RMSaddress, setRMSaddress] = useState("");
    const [MANaddress, setMANaddress] = useState("");
    const [DISaddress, setDISaddress] = useState("");
    const [RETaddress, setRETaddress] = useState("");
    const [RMS, setRMS] = useState({});
    const [MAN, setMAN] = useState({});
    const [DIS, setDIS] = useState({});
    const [RET, setRET] = useState({});

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
            const rmsCtr = await supplychain.methods.rmsCtr().call();
            const rms = {};
            for (let i = 0; i < rmsCtr; i++) {
                rms[i] = await supplychain.methods.RMS(i + 1).call();
            }
            setRMS(rms);
            const manCtr = await supplychain.methods.manCtr().call();
            const man = {};
            for (let i = 0; i < manCtr; i++) {
                man[i] = await supplychain.methods.MAN(i + 1).call();
            }
            setMAN(man);
            const disCtr = await supplychain.methods.disCtr().call();
            const dis = {};
            for (let i = 0; i < disCtr; i++) {
                dis[i] = await supplychain.methods.DIS(i + 1).call();
            }
            setDIS(dis);
            const retCtr = await supplychain.methods.retCtr().call();
            const ret = {};
            for (let i = 0; i < retCtr; i++) {
                ret[i] = await supplychain.methods.RET(i + 1).call();
            }
            setRET(ret);
            setloader(false);
        } else {
            window.alert('The smart contract is not deployed to current network');
        }
    }

    if (loader) {
        return (
            <div>
                <h1 className="wait">Loading...</h1>
            </div>
        );
    }

    const redirect_to_home = () => {
        history.push('/');
    }

    const handlerChangeAddressRMS = (event) => {
        setRMSaddress(event.target.value);
    }
    const handlerChangePlaceRMS = (event) => {
        setRMSplace(event.target.value);
    }
    const handlerChangeNameRMS = (event) => {
        setRMSname(event.target.value);
    }
    const handlerChangeAddressMAN = (event) => {
        setMANaddress(event.target.value);
    }
    const handlerChangePlaceMAN = (event) => {
        setMANplace(event.target.value);
    }
    const handlerChangeNameMAN = (event) => {
        setMANname(event.target.value);
    }
    const handlerChangeAddressDIS = (event) => {
        setDISaddress(event.target.value);
    }
    const handlerChangePlaceDIS = (event) => {
        setDISplace(event.target.value);
    }
    const handlerChangeNameDIS = (event) => {
        setDISname(event.target.value);
    }
    const handlerChangeAddressRET = (event) => {
        setRETaddress(event.target.value);
    }
    const handlerChangePlaceRET = (event) => {
        setRETplace(event.target.value);
    }
    const handlerChangeNameRET = (event) => {
        setRETname(event.target.value);
    }

    const handlerSubmitRMS = async (event) => {
        event.preventDefault();
        try {
            const reciept = await SupplyChain.methods.addRMS(RMSaddress, RMSname, RMSplace).send({ from: currentaccount });
            if (reciept) {
                loadBlockchaindata();
            }
        } catch (err) {
            alert("An error occured!!!");
        }
    }

    const handlerSubmitMAN = async (event) => {
        event.preventDefault();
        try {
            const reciept = await SupplyChain.methods.addManufacturer(MANaddress, MANname, MANplace).send({ from: currentaccount });
            if (reciept) {
                loadBlockchaindata();
            }
        } catch (err) {
            alert("An error occured!!!");
        }
    }

    const handlerSubmitDIS = async (event) => {
        event.preventDefault();
        try {
            const reciept = await SupplyChain.methods.addDistributor(DISaddress, DISname, DISplace).send({ from: currentaccount });
            if (reciept) {
                loadBlockchaindata();
            }
        } catch (err) {
            alert("An error occured!!!");
        }
    }

    const handlerSubmitRET = async (event) => {
        event.preventDefault();
        try {
            const reciept = await SupplyChain.methods.addRetailer(RETaddress, RETname, RETplace).send({ from: currentaccount });
            if (reciept) {
                loadBlockchaindata();
            }
        } catch (err) {
            alert("An error occured!!!");
        }
    }

    return (
        <div style={styles.container}>
             <nav style={styles.navbar}>
                <span style={styles.navbarText}>TrustNet</span>
                <span onClick={redirect_to_home} style={styles.homeButton}>HOME</span>
            </nav>
            <br></br>
            <span style={styles.account}><b>Current Account Address</b> {currentaccount}</span>
            <div style={styles.section}>
                <h4><strong>Raw Material Suppliers</strong></h4>
                <form onSubmit={handlerSubmitRMS} style={styles.form}>
                    <input style={styles.input} type="text" onChange={handlerChangeAddressRMS} placeholder="Ethereum Address" required />
                    <input style={styles.input} type="text" onChange={handlerChangeNameRMS} placeholder="Raw Material Supplier Name" required />
                    <input style={styles.input} type="text" onChange={handlerChangePlaceRMS} placeholder="Based In" required />
                    <button style={styles.button}>Register</button>
                </form>
                <table style={styles.table}>
                    <thead style={{...styles.tableHead, backgroundColor: '#343a40', color: '#fff'}}>
                        <tr>
                            <th style={{...styles.tableCell, backgroundColor: '#495057', color: '#fff'}}>ID</th>
                            <th style={{...styles.tableCell, backgroundColor: '#495057', color: '#fff'}}>Name</th>
                            <th style={{...styles.tableCell, backgroundColor: '#495057', color: '#fff'}}>Place</th>
                            <th style={{...styles.tableCell, backgroundColor: '#495057', color: '#fff'}}>Ethereum Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(RMS).map(function (key) {
                            return (
                                <tr key={key} style={styles.tableRow}>
                                    <td style={styles.tableCell}>{RMS[key].id}</td>
                                    <td style={styles.tableCell}>{RMS[key].name}</td>
                                    <td style={styles.tableCell}>{RMS[key].place}</td>
                                    <td style={styles.tableCell}>{RMS[key].addr}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div style={styles.section}>
                <h4><strong>Manufacturers</strong></h4>
                <form onSubmit={handlerSubmitMAN} style={styles.form}>
                    <input style={styles.input} type="text" onChange={handlerChangeAddressMAN} placeholder="Ethereum Address" required />
                    <input style={styles.input} type="text" onChange={handlerChangeNameMAN} placeholder="Manufacturer Name" required />
                    <input style={styles.input} type="text" onChange={handlerChangePlaceMAN} placeholder="Based In" required />
                    <button style={styles.button}>Register</button>
                </form>
                <table style={styles.table}>
                    <thead style={{...styles.tableHead, backgroundColor: '#343a40', color: '#fff'}}>
                        <tr>
                            <th style={{...styles.tableCell, backgroundColor: '#495057', color: '#fff'}}>ID</th>
                            <th style={{...styles.tableCell, backgroundColor: '#495057', color: '#fff'}}>Name</th>
                            <th style={{...styles.tableCell, backgroundColor: '#495057', color: '#fff'}}>Place</th>
                            <th style={{...styles.tableCell, backgroundColor: '#495057', color: '#fff'}}>Ethereum Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(MAN).map(function (key) {
                            return (
                                <tr key={key} style={styles.tableRow}>
                                    <td style={styles.tableCell}>{MAN[key].id}</td>
                                    <td style={styles.tableCell}>{MAN[key].name}</td>
                                    <td style={styles.tableCell}>{MAN[key].place}</td>
                                    <td style={styles.tableCell}>{MAN[key].addr}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div style={styles.section}>
                <h4><strong>Distributors</strong></h4>
                <form onSubmit={handlerSubmitDIS} style={styles.form}>
                    <input style={styles.input} type="text" onChange={handlerChangeAddressDIS} placeholder="Ethereum Address" required />
                    <input style={styles.input} type="text" onChange={handlerChangeNameDIS} placeholder="Distributor Name" required />
                    <input style={styles.input} type="text" onChange={handlerChangePlaceDIS} placeholder="Based In" required />
                    <button style={styles.button}>Register</button>
                </form>
                <table style={styles.table}>
                    <thead style={{...styles.tableHead, backgroundColor: '#343a40', color: '#fff'}}>
                        <tr>
                            <th style={{...styles.tableCell, backgroundColor: '#495057', color: '#fff'}}>ID</th>
                            <th style={{...styles.tableCell, backgroundColor: '#495057', color: '#fff'}}>Name</th>
                            <th style={{...styles.tableCell, backgroundColor: '#495057', color: '#fff'}}>Place</th>
                            <th style={{...styles.tableCell, backgroundColor: '#495057', color: '#fff'}}>Ethereum Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(DIS).map(function (key) {
                            return (
                                <tr key={key} style={styles.tableRow}>
                                    <td style={styles.tableCell}>{DIS[key].id}</td>
                                    <td style={styles.tableCell}>{DIS[key].name}</td>
                                    <td style={styles.tableCell}>{DIS[key].place}</td>
                                    <td style={styles.tableCell}>{DIS[key].addr}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div style={styles.section}>
                <h4><strong>Retailers</strong></h4>
                <form onSubmit={handlerSubmitRET} style={styles.form}>
                    <input style={styles.input} type="text" onChange={handlerChangeAddressRET} placeholder="Ethereum Address" required />
                    <input style={styles.input} type="text" onChange={handlerChangeNameRET} placeholder="Retailer Name" required />
                    <input style={styles.input} type="text" onChange={handlerChangePlaceRET} placeholder="Based In" required />
                    <button style={styles.button}>Register</button>
                </form>
                <table style={styles.table}>
                    <thead style={{...styles.tableHead, backgroundColor: '#343a40', color: '#fff'}}>
                        <tr>
                            <th style={{...styles.tableCell, backgroundColor: '#495057', color: '#fff'}}>ID</th>
                            <th style={{...styles.tableCell, backgroundColor: '#495057', color: '#fff'}}>Name</th>
                            <th style={{...styles.tableCell, backgroundColor: '#495057', color: '#fff'}}>Place</th>
                            <th style={{...styles.tableCell, backgroundColor: '#495057', color: '#fff'}}>Ethereum Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(RET).map(function (key) {
                            return (
                                <tr key={key} style={styles.tableRow}>
                                    <td style={styles.tableCell}>{RET[key].id}</td>
                                    <td style={styles.tableCell}>{RET[key].name}</td>
                                    <td style={styles.tableCell}>{RET[key].place}</td>
                                    <td style={styles.tableCell}>{RET[key].addr}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>);
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

    account: {
        display: 'block',
        marginBottom: '20px',
        fontSize: '16px'
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
        backgroundColor: '#f9f9f9'
    },
    input: {
        marginBottom: '10px',
        padding: '10px',
        width: '100%',
        border: '1px solid #ccc',
        borderRadius: '5px'
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
        }
    },
    table: {
        width: '80%',
        margin: '20px auto',
        borderCollapse: 'collapse'
    },
    tableHead: {
        backgroundColor: '#f8f9fa'
    },
    tableRow: {
        borderBottom: '1px solid #ddd',
        backgroundColor: 'white',

    },
    tableCell: {
        padding: '10px',
        textAlign: 'center'
    }
};

export default AssignRoles;