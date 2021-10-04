import react from "react";

class Flow extends react.Component {
    constructor(props) {
        super(props);
        this.state = {visible_sections: ['', 'primary', 'secondary']};
        this.sections = {'': <div dangerouslySetInnerHTML={{ __html: props.main.innerHTML }} />};
        document.querySelectorAll('section').forEach(elem => {
            this.buildSection(elem.id);
        });
    }
    buildSection(sec) {
        const sec_html = document.getElementById(sec).innerHTML;
        let tempdiv = document.createElement('div');
        tempdiv.innerHTML = sec_html;
        tempdiv.querySelectorAll('.notpaper-include').forEach(elem=>{
            const target = document.querySelector(elem.getAttribute('href'));
            elem.outerHTML = target.innerHTML;
        });
        this.sections[sec] = <div dangerouslySetInnerHTML={{__html: tempdiv.innerHTML}}/>;
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
}

export default Flow;