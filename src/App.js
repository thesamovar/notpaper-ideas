import Related, { updateRelated } from './components/Related.js';
import Box from './components/Box.js';

function observeRelated(entries, observer) {
  const visible = entries.filter(entry => entry.isIntersecting);
  const visible_hrefs = visible.map(entry => entry.target.href);
  console.log(visible_hrefs);
  //updateRelated(<Box>{visible_hrefs}</Box>);
}

function App() {
  // Hide the main section
  const sec_main = document.querySelector('#main');
  sec_main.style.display = "none";
  // Hide all figures
  sec_main.querySelectorAll('figure').forEach(elem => {
    elem.style.display = 'none';
  });
  const test_box_1 = (<Box key="testbox1">Test box 1.</Box>);
  const test_box_2 = (<Box key="testbox2">Test box 2.</Box>);
  const related = <Related key="related"/>;
  console.log(related);
  //related.setState({items: [test_box_1, test_box_2]});
  // add show related to all a items with notpaper-related class
  const observer = new IntersectionObserver(observeRelated);
  document.querySelectorAll('.notpaper-related').forEach(div => {
    observer.observe(div);
  });
  console.log(observer); // TODO: if you don't log this it doesn't work, so presumably we need to keep the observer alive somehow
  // Return the app layout
  return (
    <div className="App">
      <div className="Header">
        Header.
      </div>
      <div className="MainPanel">
        <div id="FlowColumn" className="Column" style={{width: "40%"}}>
          <div dangerouslySetInnerHTML={{__html: sec_main.innerHTML}}/>
        </div>
        <div id="RelatedColumn" className="Column" style={{width: "60%"}}>
          { related }
        </div>
      </div>
      <div className="Footer">
        Footer.
      </div>
    </div>
  );
}

export default App;
