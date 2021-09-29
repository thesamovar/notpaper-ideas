import react from "react";

class Flow extends react.Component {
    constructor(props) {
        super(props);
        this.state = {isVisible: true};
    }
    render() {
        return (
            <div id="FlowableColumn">
                { this.state.isVisible ? this.props.children : null }
            </div>
        );
    }
}

export default Flow;