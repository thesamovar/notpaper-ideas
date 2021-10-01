import react from "react";

class Flow extends react.Component {
    constructor(props) {
        super(props);
        this.state = {visible_sections: ['', 'primary']};
        this.sections = {'': <div dangerouslySetInnerHTML={{ __html: props.main.innerHTML }} />,
                        'primary': this.buildSection('primary')};
    }
    buildSection(sec) {
        const sec_html = document.getElementById(sec).innerHTML;
        let tempdiv = document.createElement('div');
        tempdiv.innerHTML = sec_html;
        tempdiv.querySelectorAll('.notpaper-include').forEach(elem=>{
            console.log(elem.getAttribute('href'));
            const target = document.querySelector(elem.getAttribute('href'));
            console.log(target);
            elem.outerHTML = target.innerHTML;
        });
        return <div dangerouslySetInnerHTML={{__html: tempdiv.innerHTML}}/>;
    }
    render() {
        const headers = [];
        this.state.visible_sections.forEach(sec => {
            headers.push(<button key={'flowbutton-'+sec}>{sec}</button>);
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