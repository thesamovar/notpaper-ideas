import react from "react";
import Box from './Box.js';

class Figure extends react.Component {
    render() {
        return (
            <Box key={this.key+"-box"}>
                <div className="notpaperFigure">
                    <div className="notpaperFigureImage" style={{
                        backgroundImage: "url('"+this.props.imgsrc+"')",
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center center",
                        height: "100%"
                        }}>
                            Yo
                    </div>
                    {/* <div className="notpaperFigureCaption" dangerouslySetInnerHTML={{__html: this.props.caption}}/> */}
                    <div className="notpaperFigureCaption">Hello</div>
                </div>
            </Box>
        );

    }
}

export default Figure;