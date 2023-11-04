class Journal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            operations: [],
            emploi: 0,
            ressource: 0
        };
        this.addOperation = this.addOperation.bind(this);
        this.addCompteDebitPlus = this.addCompteDebitPlus.bind(this);
        this.addCompteDebitMoins = this.addCompteDebitMoins.bind(this);
        this.addCompteCreditPlus = this.addCompteCreditPlus.bind(this);
        this.addCompteCreditMoins = this.addCompteCreditMoins.bind(this);
        this.getGrandLivre = this.getGrandLivre.bind(this);
    }

    getGrandLivre() {
        
        ReactDOM.render(<GrandLivre operations={this.state.operations} />, document.getElementById("grandlivre"));
    }

    addOperation() {
        let date = document.getElementById("date").value;
        let balance = 0;
        if (!date) {
            console.log(date);
            return;
        }
        let debit = [];
        let compte, montant;
        for (let i = 0; i <= this.state.emploi; i++) {
            compte = parseInt(document.getElementById("emploi"+i).value.split(" ")[0]);
            montant = parseFloat(document.getElementById("debit"+i).value);
            balance += montant;
            debit.push({
                compte: compte,
                montant: montant
            });
            if (!compte || !plan[compte] || !montant || montant<=0) {
                console.log(debit);
                return;
            }
        }
        let credit = [];
        for (let i = 0; i <= this.state.ressource; i++) {
            compte = parseInt(document.getElementById("ressource"+i).value.split(" ")[0]);
            montant = parseFloat(document.getElementById("credit"+i).value);
            balance -= montant;
            credit.push({
                compte: compte,
                montant: montant
            });
            if (!compte || !plan[compte] || !montant || montant<=0) {
                console.log(credit);
                return;
            }
        }
        const operation = new Operation({
            date: date,
            debit: debit,
            credit: credit,
        });
        if (balance != 0) {
            alert("Les débits et les crédits sont inégaux.")
            return;
        }
        this.setState({
            operations: [...this.state.operations, operation]
        })
    }

    addCompteDebitPlus(event) {
        if (this.state.emploi<9)
        this.setState({
            emploi: this.state.emploi+1
        })
    }
    addCompteDebitMoins() {
        if (this.state.emploi>0)
        this.setState({
            emploi: this.state.emploi-1
        })
    }
    addCompteCreditPlus() {
        if (this.state.ressource<9)
        this.setState({
            ressource: this.state.ressource+1
        })
    }
    addCompteCreditMoins() {
        if (this.state.ressource>0)
        this.setState({
            ressource: this.state.ressource-1
        })
    }

    render() {
        let operations = this.state.operations.map( (operation) => (operation.render()) );
        // if (this.state.operations.length===0)
        //     operations = [initialOperation()].map( (operation) => (operation.render()) );
        return (
            <section>
                <div className="form">
                    <datalist id="listComptes">
                        {listComptes}
                    </datalist>
                    <label htmlFor="date" className="label">Date de l'opération</label>
                    <input type="date" id="date" name="date" className="input"/>
                    <br/>
                    <div style={{display: "flex"}}>
                        <div style={{flex: 3}}>
                        <label htmlFor="emploi0" className="label">Compte débité</label>
                        <input type="text" list="listComptes" id="emploi0" name="emploi0" className="input"/>
                        </div>
                        <div style={{flex: 1}}>
                        <label htmlFor="debit0" className="label">Montant du débit</label>
                        <input type="number" id="debit0" name="debit0" className="input"/>
                        </div>
                    </div>
                    <div>
                        { autreComptes(this.state.emploi, true) }
                        <button onClick={this.addCompteDebitMoins} className="secondary button">-</button>
                        <button onClick={this.addCompteDebitPlus} className="secondary button">+</button>
                    </div>
                    <br/>
                    <div style={{display: "flex"}}>
                        <div style={{flex: 3}}>
                        <label htmlFor="ressource0" className="label">Compte crédité</label>
                        <input type="text" list="listComptes" id="ressource0" name="ressource0" className="input"/>
                        </div>
                        <div style={{flex: 1}}>
                        <label htmlFor="credit0" className="label">Montant du crédit</label>
                        <input type="number" id="credit0" name="credit0" className="input"/>
                        </div>
                    </div>
                    <div>
                        { autreComptes(this.state.ressource, false) }
                        <button onClick={this.addCompteCreditMoins} className="secondary button">-</button>
                        <button onClick={this.addCompteCreditPlus} className="secondary button">+</button>
                    </div>
                    <br/>
                    <div className="text-align-end">
				    <button onClick={this.addOperation} className="success button">Ajouter</button>
                    </div>
                </div>
                <h2>Journal</h2>
                <table className="table">
                    <tr style={{
                        border: "solid 1px black"
                    }}>
                        <th style={{ padding: "5px", minWidth: "15%", textAlign: "center" }}>
                            Comptes
                        </th>
                        <th style={{ padding: "5px",
                            minWidth: "50%",
                            display: "flex",
                            justifyContent: "space-between"
                        }}>
                            <div>Débit</div>
                            <div>Crédit</div>
                        </th>
                        <th style={{ padding: "5px", minWidth: "15%", textAlign: "center" }}>
                            Montants
                        </th>
                    </tr>
                    {operations}
                </table>
                <button className="button" 
                        style={{
                            margin: "10px"
                        }} 
                        onClick={this.getGrandLivre}>
                    Afficher le Grand Livre
                </button>
            </section>
        );
    }

}

let listComptes = Object.entries(plan).map( (compte) => (<option key={compte[0]}>{compte[0]+" "+compte[1]}</option>) );

function initialOperation() {
    return new Operation({
        date: "01/01/2023",
        emploi: [],
        ressource: []
    });
}

function autreComptes(key, is) {
    let t=[];
    for (let i = 1; i <= key; i++)
        t.push(i);
    return t.map( (k) => (autreCompte(k, is)) );
}
function autreCompte(key, is) {
    return (<div style={{display: "flex"}} key={key}>
        <div style={{flex: 3}}>
        <input type="text" list="listComptes" id={(is?"emploi":"ressource")+key} name={(is?"emploi":"ressource")+key} className="input"/>
        </div>
        <div style={{flex: 1}}>
        <input type="number" id={(is?"debit":"credit")+key} name={(is?"debit":"credit")+key} className="input"/>
        </div>
    </div>);
}

let nombreOperation=0;
class Operation extends React.Component {

    constructor(props) {
        super(props);
        nombreOperation++;
        this.state = ({
            key: nombreOperation,
            date: new Date(props.date),
            debit: props.debit,
            credit: props.credit
        });
    }

    render() {
        return (
            <div key={this.state.key} style={{
                border: "solid 1px black"
            }}>
                <tr>
                    <td style={{ minWidth: "15%" }}>
                        
                    </td>
                    <td style={{ minWidth: "20%", textAlign: "center" }}>
                        {
                            this.state.date.toLocaleString(
                                "fr-FR", 
                                {year:'numeric',month:'numeric',day:'numeric'}
                            )
                        }
                    </td>
                    <td style={{ minWidth: "15%" }}>
                        
                    </td>
                </tr>
                <tr>
                    <td style={{ minWidth: "15%", textAlign: "left" }}>
                        {this.state.debit.map( ({compte, montant}) => (<div>{compte}</div>))}
                    </td>
                    <td style={{ minWidth: "50%", textAlign: "left" }}>
                        {this.state.debit.map( ({compte, montant}) => (<div>{plan[compte]}</div>))}
                    </td>
                    <td style={{ minWidth: "15%", textAlign: "left" }}>
                        {this.state.debit.map( ({compte, montant}) => (<div>{montant}</div>))}
                    </td>
                </tr>
                <tr>
                    <td style={{ minWidth: "15%", textAlign: "right" }}>
                        {this.state.credit.map( ({compte, montant}) => (<div>{compte}</div>))}
                    </td>
                    <td style={{ minWidth: "50%", textAlign: "right" }}>
                        {this.state.credit.map( ({compte, montant}) => (<div>{plan[compte]}</div>))}
                    </td>
                    <td style={{ minWidth: "15%", textAlign: "right" }}>
                        {this.state.credit.map( ({compte, montant}) => (<div>{montant}</div>))}
                    </td>
                </tr>
            </div>
        );
    }
}

var journal = <Journal />;
ReactDOM.render(journal, document.getElementById("journal"));
