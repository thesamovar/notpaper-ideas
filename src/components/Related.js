import react from "react";

// function updateRelated(items) {
//     this.setState({items: items});
// }  

class Related extends react.Component {
    constructor(props) {
        super(props);
        this.state = {items: []};
        // updateRelated = updateRelated.bind(this);
    }
    render() {
        return (
            <div className="related">
                {this.state.items}
            </div>
        );

    }
}

export default Related;