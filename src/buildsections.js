function buildAllSections() {
    const sec_main = document.querySelector('#main');
    // hide original html
    sec_main.style.display = "none";
    // hide figures
    sec_main.querySelectorAll('figure').forEach(elem => {
        elem.style.display = "none";
    });
    // build sections
    let sections = {'': <div dangerouslySetInnerHTML={{ __html: sec_main.innerHTML}}/>};
    document.querySelectorAll('section').forEach(elem => {
        sections[elem.id] = <div dangerouslySetInnerHTML={{ __html: buildSection(elem.innerHTML)}}/>;
    });
    // get title
    const title_elem = sec_main.querySelector('h1, h2, h3, h4, h5, h6');
    title_elem.style.display = "none";
    sections['_title'] = title_elem.innerHTML;
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