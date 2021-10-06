import react from "react";

class Flow extends react.Component {
    constructor(props) {
        super(props);
        this.state = {visible_sections: ['', 'primary', 'secondary']};
        this.sections = this.props.sections;
    }
    
    clickHeader(sec) {
        let visible = this.state.visible_sections;
        if(sec===visible[visible.length-1] && visible.length>1) {
            visible.pop();
            this.setState({visible_sections: visible});
        } else {
            const i = visible.findIndex((elem)=>elem===sec);
            visible = visible.slice(0, i+1);
            this.setState({visible_sections: visible});
        }
        this.props.updateSections(visible);
    }
    
    render() {
        const headers = [];
        this.state.visible_sections.forEach(sec => {
            const label = sec==="" ? "Main article" : "Section: "+sec;
            headers.push(<button key={'flowbutton-'+sec} onClick={(e)=>{this.clickHeader(sec)}}>{label}</button>);
        });
        return (
        <div id="FlowColumn" className="Column">
            <div className="FlowableHeader">
                {headers}
            </div>
            <div id="FlowableColumn">
                {this.sections[this.state.visible_sections[this.state.visible_sections.length-1]]}
            </div>
        </div>
        );
    }

    componentDidUpdate() {
        document.querySelectorAll('.notpaper-link').forEach(elem=>{
            elem.onclick = (e) => {
                const newsec = elem.getAttribute('href').substring(1);
                let visible = this.state.visible_sections;
                visible.push(newsec);
                this.setState({visible_sections: visible});
                this.props.updateSections(visible);
                // TODO: this doesn't call the recreation of the observers, which should probably be moved into this class with a callback
            };
        });
    }
    
}

export default Flow;