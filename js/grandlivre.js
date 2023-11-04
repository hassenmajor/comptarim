class GrandLivre extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            operations: props.operations
        };

        this.getListeComptes = this.getListeComptes.bind(this);
    }

    getListeComptes() {
        let liste = [];
        for (const operation of this.state.operations) {
            for (const compte of operation.state.debit) {
                if (liste.indexOf(compte.compte)<0)
                    liste.push(compte.compte);
            }
            for (const compte of operation.state.credit) {
                if (liste.indexOf(compte.compte)<0)
                    liste.push(compte.compte);
            }
        }
        return liste;
    }

    render() {
        let comptes = this.getListeComptes().map( (compte) => (new Compte({
            compte: compte,
            operations: this.state.operations
        }).render()) );

        return (
            <section>
                <h2>Grand Livre</h2>
                {comptes}
            </section>
        );
    }

}

class Compte extends React.Component {

    constructor(props) {
        super(props);
        let debit = [];
        let credit = [];
        let solde = 0;
        for (const operation of props.operations) {
            for (const compte of operation.state.debit)
                if (compte.compte==props.compte) {
                    solde += compte.montant;
                    debit.push({
                        date: operation.state.date,
                        montant: compte.montant
                    });
                }
            for (const compte of operation.state.credit)
                if (compte.compte==props.compte) {
                    solde -= compte.montant;
                    credit.push({
                        date: operation.state.date,
                        montant: compte.montant
                    });
                }
        }
        this.state = {
            compte: props.compte,
            debit: debit,
            credit: credit,
            solde, solde
        };
    }

    render() {
        let dateDebits = this.state.debit.map( function({date, montant}) {
            return (
            <div>
                {date.toLocaleString(
                        "fr-FR", 
                        {year:'numeric',month:'numeric',day:'numeric'}
                        )}
            </div> );
        } );
        let debits = this.state.debit.map( function({date, montant}) {
            return (
            <div>
                {montant}
            </div> );
        } );
        
        let dateCredits = this.state.credit.map( function({date, montant}) {
            return (
            <div>
                {date.toLocaleString(
                        "fr-FR", 
                        {year:'numeric',month:'numeric',day:'numeric'}
                        )}
            </div> );
        } );
        let credits = this.state.credit.map( function({date, montant}) {
            return (
            <div>
                {montant}
            </div> );
        } );

        return (
            <section className="compte">
                <div className="titreCompte">{plan[this.state.compte]}</div>
                <table>
                    <tr>
                        <td></td>
                        <td>Débit</td>
                        <td>{this.state.compte}</td>
                        <td>Crédit</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>{dateDebits}</td>
                        <td>{debits}</td>
                        <td></td>
                        <td>{credits}</td>
                        <td>{dateCredits}</td>
                    </tr>
                    <tr>
                        <td>{this.state.solde<=0?"Solde":""}</td>
                        <td>{this.state.solde<=0?-this.state.solde:""}</td>
                        <td></td>
                        <td>{this.state.solde<=0?"":this.state.solde}</td>
                        <td>{this.state.solde<=0?"":"Solde"}</td>
                    </tr>
                </table>
            </section>
        );
    }

}
