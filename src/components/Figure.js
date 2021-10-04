import react from "react";

class Figure extends react.Component {
    render() {
        return (
            <div className="notpaperFigure">
                <div className="notpaperFigureImage" style={{
                    backgroundImage: "url('"+this.props.imgsrc+"')",
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center center",
                    height: "100%"
                    }}>
                </div>
                <div className="notpaperFigureCaption" dangerouslySetInnerHTML={{__html: this.props.caption}}/>
            </div>
        );

    }
}

export default Figure;