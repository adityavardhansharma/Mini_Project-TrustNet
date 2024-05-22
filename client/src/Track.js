import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import Web3 from "web3";
import SupplyChainABI from "./artifacts/SupplyChain.json"

function Track() {
    const history = useHistory()
    useEffect(() => {
        loadWeb3();
        loadBlockchaindata();
    }, [])

    const [currentaccount, setCurrentaccount] = useState("");
    const [loader, setloader] = useState(true);
    const [SupplyChain, setSupplyChain] = useState();
    const [MED, setMED] = useState();
    const [MedStage, setMedStage] = useState();
    const [ID, setID] = useState();
    const [RMS, setRMS] = useState();
    const [MAN, setMAN] = useState();
    const [DIS, setDIS] = useState();
    const [RET, setRET] = useState();
    const [TrackTillSold, showTrackTillSold] = useState(false);
    const [TrackTillRetail, showTrackTillRetail] = useState(false);
    const [TrackTillDistribution, showTrackTillDistribution] = useState(false);
    const [TrackTillManufacture, showTrackTillManufacture] = useState(false);
    const [TrackTillRMS, showTrackTillRMS] = useState(false);
    const [TrackTillOrdered, showTrackTillOrdered] = useState(false);

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
            var i;
            const medCtr = await supplychain.methods.medicineCtr().call();
            const med = {};
            const medStage = [];
            for (i = 0; i < medCtr; i++) {
                med[i + 1] = await supplychain.methods.MedicineStock(i + 1).call();
                medStage[i + 1] = await supplychain.methods.showStage(i + 1).call();
            }
            setMED(med);
            setMedStage(medStage);
            const rmsCtr = await supplychain.methods.rmsCtr().call();
            const rms = {};
            for (i = 0; i < rmsCtr; i++) {
                rms[i + 1] = await supplychain.methods.RMS(i + 1).call();
            }
            setRMS(rms);
            const manCtr = await supplychain.methods.manCtr().call();
            const man = {};
            for (i = 0; i < manCtr; i++) {
                man[i + 1] = await supplychain.methods.MAN(i + 1).call();
            }
            setMAN(man);
            const disCtr = await supplychain.methods.disCtr().call();
            const dis = {};
            for (i = 0; i < disCtr; i++) {
                dis[i + 1] = await supplychain.methods.DIS(i + 1).call();
            }
            setDIS(dis);
            const retCtr = await supplychain.methods.retCtr().call();
            const ret = {};
            for (i = 0; i < retCtr; i++) {
                ret[i + 1] = await supplychain.methods.RET(i + 1).call();
            }
            setRET(ret);
            setloader(false);
        }
        else {
            window.alert('The smart contract is not deployed to current network')
        }
    }
    if (loader) {
        return (
            <div>
                <h1 className="wait">Loading...</h1>
            </div>
        )
    }
    
    if (TrackTillSold) {
        return (
            
            <div className="container-xl" >
                
                <article className="col-4" style={styles.containerOne}>
                    <h3 style={styles.headingOne}><b>Medicine</b></h3>
                    <span><b>Medicine ID: </b>{MED[ID].id}</span>
                    <br />
                    <span><b>Name:</b> {MED[ID].name}</span>
                    <br />
                    <span><b>Description: </b>{MED[ID].description}</span>
                    <br />
                    <span><b>Current stage: </b>{MedStage[ID]}</span>
                </article>
                <hr style={styles.hr1} />
                <br />
                <section className="row" style={styles.stageContainer}>

                    <article className="col-3" style={{ ...styles.containerOne, ...styles.article }}>
                        <div style={styles.containerTwo}>
                        <h4><strong>Raw Materials Supplied by</strong></h4>
                        </div>
                        <br/>
                        <p><b>Supplier ID: </b>{RMS[MED[ID].RMSid].id}</p>
                        <p><b>Name:</b> {RMS[MED[ID].RMSid].name}</p>
                        <p><b>Place: </b>{RMS[MED[ID].RMSid].place}</p>
                    </article>
                    <span>&#10132;</span>
                    <article className="col-3" style={{ ...styles.containerOne, ...styles.article }}>
                    <div style={styles.containerTwo}>
                        <h4><strong>Manufactured by</strong></h4>
                      </div>
                      <br/>
                        <p><b>Manufacturer ID: </b>{MAN[MED[ID].MANid].id}</p>
                        <p><b>Name:</b> {MAN[MED[ID].MANid].name}</p>
                        <p><b>Place: </b>{MAN[MED[ID].MANid].place}</p>
                    </article>
                    <span>&#10132;</span>
                    <article className="col-3"  style={{ ...styles.containerOne, ...styles.article }}>
                    <div style={styles.containerTwo}>
                        <h4><strong>Distributed by</strong></h4>
                        </div>
                        <br/>
                        <p><b>Distributor ID: </b>{DIS[MED[ID].DISid].id}</p>
                        <p><b>Name:</b> {DIS[MED[ID].DISid].name}</p>
                        <p><b>Place: </b>{DIS[MED[ID].DISid].place}</p>
                    </article>
                    <span>&#10132;</span>
                    <br/>
                    <article className="col-3"  style={{ ...styles.containerOne, ...styles.article }}>
                    <div style={styles.containerTwo}>
                        <h4><strong>Retailed by</strong></h4>
                        </div>
                        <br/>
                        <p><b>Retailer ID: </b>{RET[MED[ID].RETid].id}</p>
                        <p><b>Name:</b> {RET[MED[ID].RETid].name}</p>
                        <p><b>Place: </b>{RET[MED[ID].RETid].place}</p>
                    </article>
                    <span>&#10132;</span>
                    <article className="col-3"  style={{ ...styles.containerOne, ...styles.article, ...styles.sold}}>
                        <h4><strong>Sold</strong></h4>
                    </article>
                </section>
                <hr style={styles.hr} />
                <br/>
                <div style={styles.buttonContainer}>
                <button onClick={() => {
                    showTrackTillSold(false);
                }} className="btn btn-outline-success btn-sm">Track Another Item</button>
                <span onClick={() => {
                    history.push('/')
                }} className="btn btn-outline-danger btn-sm"> HOME</span>
            </div >
            </div>
        )
    }
    if (TrackTillRetail) {
        return (
            <div className="container-xl">
                <article className="col-4" style={styles.containerOne}>
                    <h3  style={styles.headingOne}><strong>Medicine</strong></h3>
                    <span><b>Medicine ID: </b>{MED[ID].id}</span>
                    <br />
                    <span><b>Name:</b> {MED[ID].name}</span>
                    <br />
                    <span><b>Description: </b>{MED[ID].description}</span>
                    <br />
                    <span><b>Current stage: </b>{MedStage[ID]}</span>
                </article>
                <hr style={styles.hr1} />
                <br />
                <section className="row" style={styles.stageContainer}>

                    <article className="col-3" style={{ ...styles.containerOne, ...styles.article }}>
                    <div style={styles.containerTwo}>
                        <h4><strong>Raw Materials Supplied by</strong></h4>
                        </div>
                        <br/>
                        <p><b>Supplier ID: </b>{RMS[MED[ID].RMSid].id}</p>
                        <p><b>Name:</b> {RMS[MED[ID].RMSid].name}</p>
                        <p><b>Place: </b>{RMS[MED[ID].RMSid].place}</p>
                    </article>
                    <span>&#10132;</span>
                    <article className="col-3"style={{ ...styles.containerOne, ...styles.article }}>
                    <div style={styles.containerTwo}>
                        <h4><strong>Manufactured by</strong></h4>
                      </div>
                      <br/>
                        <p><b>Manufacturer ID: </b>{MAN[MED[ID].MANid].id}</p>
                        <p><b>Name:</b> {MAN[MED[ID].MANid].name}</p>
                        <p><b>Place: </b>{MAN[MED[ID].MANid].place}</p>
                    </article>
                    <span>&#10132;</span>
                    <article className="col-3"style={{ ...styles.containerOne, ...styles.article }}>
                    <div style={styles.containerTwo}>
                        <h4><strong>Distributed by</strong></h4>
                        </div>
                        <br/>
                        <p><b>Distributor ID: </b>{DIS[MED[ID].DISid].id}</p>
                        <p><b>Name:</b> {DIS[MED[ID].DISid].name}</p>
                        <p><b>Place: </b>{DIS[MED[ID].DISid].place}</p>
                    </article>
                    <span>&#10132;</span>
                    <article className="col-3"style={{ ...styles.containerOne, ...styles.article }}>
                    <div style={styles.containerTwo}>
                        <h4><strong>Retailed by</strong></h4>
                        </div>
                        <br/>
                        <p><b>Retailer ID: </b>{RET[MED[ID].RETid].id}</p>
                        <p><b>Name:</b> {RET[MED[ID].RETid].name}</p>
                        <p><b>Place: </b>{RET[MED[ID].RETid].place}</p>
                    </article>
                </section>
                <hr style={styles.hr} />
                <br/>
                <div style={styles.buttonContainer}>
                <button onClick={() => {
                    showTrackTillSold(false);
                }} className="btn btn-outline-success btn-sm">Track Another Item</button>
                <span onClick={() => {
                    history.push('/')
                }} className="btn btn-outline-danger btn-sm"> HOME</span>
            </div >
            </div >
        )
    }
    if (TrackTillDistribution) {
        return (
            <div className="container-xl">
                <article className="col-4" style={styles.containerOne}>
                <h3  style={styles.headingOne}><strong>Medicine</strong></h3>
                    <span><b>Medicine ID: </b>{MED[ID].id}</span>
                    <br />
                    <span><b>Name:</b> {MED[ID].name}</span>
                    <br />
                    <span><b>Description: </b>{MED[ID].description}</span>
                    <br />
                    <span><b>Current stage: </b>{MedStage[ID]}</span>
                </article>
                <hr style={styles.hr1} />
                <br />
                <section className="row" style={styles.stageContainer}>

                    <article className="col-3"style={{ ...styles.containerOne, ...styles.article }}>
                    <div style={styles.containerTwo}>
                        <h4><strong>Raw Materials Supplied by</strong></h4>
                        </div>
                        <br/>
                        <p><b>Supplier ID: </b>{RMS[MED[ID].RMSid].id}</p>
                        <p><b>Name:</b> {RMS[MED[ID].RMSid].name}</p>
                        <p><b>Place: </b>{RMS[MED[ID].RMSid].place}</p>
                    </article>
                    <span>&#10132;</span>
                    <article className="col-3"style={{ ...styles.containerOne, ...styles.article }}>
                    <div style={styles.containerTwo}>
                        <h4><strong>Manufactured by</strong></h4>
                      </div>
                      <br/>
                        <p><b>Manufacturer ID: </b>{MAN[MED[ID].MANid].id}</p>
                        <p><b>Name:</b> {MAN[MED[ID].MANid].name}</p>
                        <p><b>Place: </b>{MAN[MED[ID].MANid].place}</p>
                    </article>
                    <span>&#10132;</span>
                    <article className="col-3"style={{ ...styles.containerOne, ...styles.article }}>
                    <div style={styles.containerTwo}>
                        <h4><strong>Distributed by</strong></h4>
                        </div>
                        <br/>
                        <p><b>Distributor ID: </b>{DIS[MED[ID].DISid].id}</p>
                        <p><b>Name:</b> {DIS[MED[ID].DISid].name}</p>
                        <p><b>Place: </b>{DIS[MED[ID].DISid].place}</p>
                    </article>
                </section>
                <hr style={styles.hr} />
                <br/>
                <div style={styles.buttonContainer}>
                <button onClick={() => {
                    showTrackTillSold(false);
                }} className="btn btn-outline-success btn-sm">Track Another Item</button>
                <span onClick={() => {
                    history.push('/')
                }} className="btn btn-outline-danger btn-sm"> HOME</span>
            </div >
            </div >
        )
    }
    if (TrackTillManufacture) {
        return (
            <div className="container-xl">
                <article className="col-4" style={styles.containerOne}>
                <h3  style={styles.headingOne}><strong>Medicine</strong></h3>
                    <span><b>Medicine ID: </b>{MED[ID].id}</span>
                    <br />
                    <span><b>Name:</b> {MED[ID].name}</span>
                    <br />
                    <span><b>Description: </b>{MED[ID].description}</span>
                    <br />
                    <span><b>Current stage: </b>{MedStage[ID]}</span>
                </article>
                <hr style={styles.hr1} />
                <br />
                <section className="row" style={styles.stageContainer}>

                    <article className="col-3"style={{ ...styles.containerOne, ...styles.article }}>
                    <div style={styles.containerTwo}>
                        <h4><strong>Raw Materials Supplied by</strong></h4>
                        </div>
                        <br/>
                        <p><b>Supplier ID: </b>{RMS[MED[ID].RMSid].id}</p>
                        <p><b>Name:</b> {RMS[MED[ID].RMSid].name}</p>
                        <p><b>Place: </b>{RMS[MED[ID].RMSid].place}</p>
                    </article>
                    <span>&#10132;</span>
                    <article className="col-3"style={{ ...styles.containerOne, ...styles.article }}>
                    <div style={styles.containerTwo}>
                        <h4><strong>Manufactured by</strong></h4>
                      </div>
                      <br/>
                        <p><b>Manufacturer ID: </b>{MAN[MED[ID].MANid].id}</p>
                        <p><b>Name:</b> {MAN[MED[ID].MANid].name}</p>
                        <p><b>Place: </b>{MAN[MED[ID].MANid].place}</p>
                    </article>
                </section>
                <hr style={styles.hr} />
                <br/>
                <div style={styles.buttonContainer}>
                <button onClick={() => {
                    showTrackTillSold(false);
                }} className="btn btn-outline-success btn-sm">Track Another Item</button>
                <span onClick={() => {
                    history.push('/')
                }} className="btn btn-outline-danger btn-sm"> HOME</span>
            </div >
            </div >
        )
    }
    if (TrackTillRMS) {
        return (
            <div className="container-xl">
                <article className="col-4" style={styles.containerOne}>
                <h3  style={styles.headingOne}><strong>Medicine</strong></h3>
                    <span><b>Medicine ID: </b>{MED[ID].id}</span>
                    <br />
                    <span><b>Name:</b> {MED[ID].name}</span>
                    <br />
                    <span><b>Description: </b>{MED[ID].description}</span>
                    <br />
                    <span><b>Current stage: </b>{MedStage[ID]}</span>
                </article>
                <hr style={styles.hr1} />
                <br />
                <section className="row" style={styles.stageContainer}>

                    <article className="col-3"style={{ ...styles.containerOne, ...styles.article }}>
                    <div style={styles.containerTwo}>
                        <h4><strong>Raw Materials Supplied by</strong></h4>
                        </div>
                        <br/>
                        <p><b>Supplier ID: </b>{RMS[MED[ID].RMSid].id}</p>
                        <p><b>Name:</b> {RMS[MED[ID].RMSid].name}</p>
                        <p><b>Place: </b>{RMS[MED[ID].RMSid].place}</p>
                    </article>
                </section>
                <hr style={styles.hr} />
                <br/>
                <div style={styles.buttonContainer}>
                <button onClick={() => {
                    showTrackTillSold(false);
                }} className="btn btn-outline-success btn-sm">Track Another Item</button>
                <span onClick={() => {
                    history.push('/')
                }} className="btn btn-outline-danger btn-sm"> HOME</span>
            </div >
            </div >
        )
    }
    if (TrackTillOrdered) {
        return (
            <div className="container-xl">
                <article className="col-4" style={styles.containerOne}>
                <h3  style={styles.headingOne}><strong>Medicine</strong></h3>
                    <span><b>Medicine ID: </b>{MED[ID].id}</span>
                    <br />
                    <span><b>Name:</b> {MED[ID].name}</span>
                    <br />
                    <span><b>Description: </b>{MED[ID].description}</span>
                    <br />
                    <span><b>Current stage: </b>{MedStage[ID]}</span>
                    <hr />
                    <br />
                    <h5>Medicine Not Yet Processed...</h5>
                    <hr style={styles.hr} />
                    <br/>
                    <div style={styles.buttonContainer}>
                <button onClick={() => {
                    showTrackTillSold(false);
                }} className="btn btn-outline-success btn-sm">Track Another Item</button>
                <span onClick={() => {
                    history.push('/')
                }} className="btn btn-outline-danger btn-sm"> HOME</span>
            </div >
                </article>
                {/* <section className="row">
                    
                    <article className="col-3">
                        <h4><u>Raw Materials Supplied by:</u></h4>
                        <p><b>Supplier ID: </b>{RMS[MED[ID].RMSid].id}</p>
                        <p><b>Name:</b> {RMS[MED[ID].RMSid].name}</p>
                        <p><b>Place: </b>{RMS[MED[ID].RMSid].place}</p>
                    </article>
                </section> */}
            </div >
        )
    }
    const handlerChangeID = (event) => {
        setID(event.target.value);
    }
    const redirect_to_home = () => {
        history.push('/')
    }
    const handlerSubmit = async (event) => {
        event.preventDefault();
        var ctr = await SupplyChain.methods.medicineCtr().call();
        if (!((ID > 0) && (ID <= ctr)))
            alert("Invalid Medicine ID!!!");
        else {
            // eslint-disable-next-line
            if (MED[ID].stage == 5)
                showTrackTillSold(true);
            // eslint-disable-next-line
            else if (MED[ID].stage == 4)
                showTrackTillRetail(true);
            // eslint-disable-next-line
            else if (MED[ID].stage == 3)
                showTrackTillDistribution(true);
            // eslint-disable-next-line
            else if (MED[ID].stage == 2)
                showTrackTillManufacture(true);
            // eslint-disable-next-line
            else if (MED[ID].stage == 1)
                showTrackTillRMS(true);
            else
                showTrackTillOrdered(true);

        }
    }

    return (
        <div style={styles.container}>
            <nav style={styles.navbar}>
                <span style={styles.navbarText}>TrustNet</span>
                <span onClick={redirect_to_home} style={styles.homeButton}>HOME</span>
            </nav>
            <br/>
            <span><b>Current Account Address:</b> {currentaccount}</span>
            <br/>
            
            <table className="table table-sm table-bordered" style={styles.tableSize}>
                <thead style={{...styles.tableHead, backgroundColor: '#343a40', color: '#fff'}}>
                    <tr >
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
                                <td style={styles.tableCell}>{MED[key].id}</td>
                                <td style={styles.tableCell}>{MED[key].name}</td>
                                <td style={styles.tableCell}>{MED[key].description}</td>
                                <td>
                                    {
                                        MedStage[key]
                                    }
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <br/>
            <div style={styles.section}>
            <h5>Enter Medicine ID to Track it</h5>

            <form onSubmit={handlerSubmit}>
                <input className="form-control-sm" type="text"  style={styles.input} onChange={handlerChangeID} placeholder="Enter Medicine ID" required />
                <button className="btn btn-outline-success btn-sm" style={styles.button} onSubmit={handlerSubmit}>Track</button>
            </form>
            </div>
        </div>
    )
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
        

    },
    tableHead: {
        backgroundColor: '#f8f9fa',
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
            transform: 'scale(2.05)',
        }
    },
    containerOne:{
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
    headingOne:{
        color: 'red',
    },
    stageContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '10px',
    },
    article: {
        flex: '1 1 calc(25% - 20px)',
        minWidth: '200px',
    },
    hr: {
        borderTop: '2px solid #333',
        margin: '20px 0 0 0',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '20px',
    },
    containerTwo:{
        backgroundColor: '#404040',
        color: 'white',
        border: '2px solid #404040',
        borderRadius: '10px',
        textAlign: 'center',
        

    },
    sold:{
      backgroundColor:'#80ff80',
      color:'black',  
      border: '3px dotted black'
    },
    hr1: {
        borderTop: '2px solid #333',
        margin: '20px 0 ',
    },
};

export default Track
