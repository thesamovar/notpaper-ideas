import react from 'react';
import Related from './components/Related.js';
import Figure from './components/Figure.js';
import Flow from './components/Flow.js';
import buildAllSections from './buildsections.js';

class App extends react.Component {
  
  constructor(props) {
    super(props);
    // Build sections and hide original HTML
    this.sections = buildAllSections();
    // State
    this.state = { related: [], section_view: [] };
    this.hasRelated = new Set(); // explanation in observeRelated below
    // create a component for the main text flow (so that we don't need to recreate it when it re-renders)
    this.flow_column = <Flow sections={this.sections} updateSections={this.updateSections.bind(this)}/>
  }

  updateSections(sections) {
    this.hasRelated.clear();
    this.setState({section_view: sections, related: []});
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
            <div dangerouslySetInnerHTML={{__html: targetItem.innerHTML}}/>
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
          notpaper | {this.sections['_title']}
        </div>
        {this.flow_column}
        <div id="RelatedColumn" className="Column">
          <Related key="related">
            {this.state.related}
          </Related>
        </div>
        <div className="Footer">
          Footer currently left blank.
        </div>
        </div>
      );
    }

  // The below is an awful, awful hack because I didn't really understand React while writing it. It can
  // be fixed when I do a rewrite.

  componentDidMount() {
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    if(!('_prev_section_view' in this) || this.state.section_view!==this._prev_section_view) {
      this._prev_section_view = this.state.section_view;
      // add show related to all a items with notpaper-related class
      // do this after mounting because we use document.querySelectorAll and they don't exist until now
      // if we unmount, get rid of the observer
      if('observer' in this) {
        this.observer.disconnect();
      }
      this.observer = new IntersectionObserver(entries => { this.observeRelated(entries, this.observer); });
      document.querySelectorAll('.notpaper-related').forEach(div => {
        this.observer.observe(div);
      });
    }
  }
      
  componentWillUnmount() {
      // if we unmount, get rid of the observer
      this.observer.disconnect();
  }

}
  
export default App;
