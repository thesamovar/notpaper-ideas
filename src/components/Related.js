import react from "react";


class Related extends react.Component {
    render() {
        return (
            <div className="related">
                {this.props.children}
            </div>
        );

    }
}

export default Related;