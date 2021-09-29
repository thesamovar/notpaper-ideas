import react from 'react';
import Related from './components/Related.js';
import Box from './components/Box.js';
import Figure from './components/Figure.js';
import Flow from './components/Flow.js';

class App extends react.Component {
  
  constructor(props) {
    super(props);
    // Hide the main section
    const sec_main = document.querySelector('#main');
    sec_main.style.display = "none";
    // Hide all figures
    sec_main.querySelectorAll('figure').forEach(elem => {
      elem.style.display = 'none';
    });
    // create a component for the main text flow (so that we don't need to recreate it when it re-renders)
    function toggleFC(e) {
      const c = document.getElementById('FlowableColumn');
      c.hidden = !c.hidden;
    }
    this.flow_column = (
      <div id="FlowColumn" className="Column">
        <div className="FlowableHeader">
          <button onClick={toggleFC}>Temporary clickable thing</button>
        </div>
        <Flow>
          <div dangerouslySetInnerHTML={{ __html: sec_main.innerHTML }} />
        </Flow>
      </div>
      );
      // state
      this.state = { related: [] };
      this.hasRelated = new Set(); // explanation in observeRelated below
    }
    
    // This function is called each time the IntersectionObserver realises that one of the targets it
    // is observing has changed in terms of visibility. So, in order to get a list of what is currently
    // visible on the screen, we keep a set this.hasRelated where we move the link source elements,
    // and move elements in and out depending on their visibility, and then compute a second array of
    // all the pointed to elements so we can construct a set of boxes for those.
    observeRelated(entries, observer) {
      // update the set of things that point to something that are currently visible
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          this.hasRelated.add(entry.target);
        } else {
          this.hasRelated.delete(entry.target);
        }
      });
      // now create a set of things pointed to from this (to avoid duplicates)
      // TODO: make this be in the order they appear in the document, not the order they're added to the set
      const pointedTo = new Set([...this.hasRelated].map(target => document.querySelector(target.getAttribute('href'))));
      // now create a box for each unique thing pointed to
      const newboxes = [...pointedTo].map(targetItem => {
        // if it matches the requirements for a Figure, we return that
        if(targetItem.nodeName.toLowerCase()==="figure") {
          const theimg = targetItem.querySelector('img');
          const thecaption = targetItem.querySelector('figcaption');
          if(theimg && thecaption) {
            const theimgsrc=theimg.src;
            return (
              <Figure key={targetItem.id} imgsrc={theimgsrc} caption={thecaption.innerHTML}/>
              )  
            }
          }
          // otherwise, generic Box
          return (
            <Box key={targetItem.id}>
            <div dangerouslySetInnerHTML={{__html: targetItem.innerHTML}}/>
            </Box>
            );
          });
          const newstate = { related: newboxes };
          this.setState(newstate);
        }
        
        render() {
          // Return the app layout
          return (
            <div className="App">
            <div className="Header">
            Header.
            </div>
            {this.flow_column}
            <div id="RelatedColumn" className="Column">
            <Related key="related">
            {this.state.related}
            </Related>
            </div>
            <div className="Footer">
            Footer.
            </div>
            </div>
            );
          }
          
          componentDidMount() {
            // add show related to all a items with notpaper-related class
            // do this after mounting because we use document.querySelectorAll and they don't exist until now
            this.observer = new IntersectionObserver(entries => { this.observeRelated(entries, this.observer); });
            document.querySelectorAll('.notpaper-related').forEach(div => {
              this.observer.observe(div);
            });
          }
          
          componentWillUnmount() {
            // if we unmount, get rid of the observer
            this.observer.disconnect();
          }
        }
        
        export default App;
        