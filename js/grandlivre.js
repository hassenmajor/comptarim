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
        for (const operation of props.operations) {
            for (const compte of operation.state.debit) {
                if (compte.compte==props.compte)
                    debit.push({
                        date: operation.state.date,
                        montant: compte.montant
                    });
            }
            for (const compte of operation.state.credit) {
                if (compte.compte==props.compte)
                    credit.push({
                        date: operation.state.date,
                        montant: compte.montant
                    });
            }
        }
        this.state = {
            compte: props.compte,
            debit: debit,
            credit: credit
        };
    }

    render() {
        let debits = this.state.debit.map( function({date, montant}) {
            return (
            <div>{date.toLocaleString(
                        "fr-FR", 
                        {year:'numeric',month:'numeric',day:'numeric'}
                        )+" "+montant}
            </div> );
        } );
        
        let credits = this.state.credit.map( function({date, montant}) {
            return (
            <div>{montant+" "+date.toLocaleString(
                        "fr-FR", 
                        {year:'numeric',month:'numeric',day:'numeric'}
                        )}
            </div> );
        } );

        return (
            <table border="1">
                <tr>
                    <td>{plan[this.state.compte]}</td>
                </tr>
                <tr>
                    <th></th>
                    <th>Débit</th>
                    <th>{this.state.compte}</th>
                    <th>Crédit</th>
                    <th></th>
                </tr>
                <tr>
                    <td>{debits}</td>
                    <td>{credits}</td>
                </tr>
            </table>
        );
    }

}

function glClicked() {

    ReactDOM.render(<GrandLivre journal={journal} />, document.getElementById("grandlivre"));
}
