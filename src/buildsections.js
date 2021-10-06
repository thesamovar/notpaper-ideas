function buildAllSections() {
    const sec_main = document.querySelector('#main');
    sec_main.style.display = "none";
    let sections = {'': <div dangerouslySetInnerHTML={{ __html: sec_main.innerHTML}}/>};
    document.querySelectorAll('section').forEach(elem => {
        sections[elem.id] = <div dangerouslySetInnerHTML={{ __html: buildSection(elem.innerHTML)}}/>;
    });
    return sections;
}

function buildSection(sec_html) {
    let tempdiv = document.createElement('div');
    tempdiv.innerHTML = sec_html;
    tempdiv.querySelectorAll('.notpaper-include').forEach(elem=>{
        const target = document.querySelector(elem.getAttribute('href'));
        elem.outerHTML = target.innerHTML;
    });
    const html_out = tempdiv.innerHTML;
    tempdiv.remove();
    return html_out;
}

export default buildAllSections;