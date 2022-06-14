import { html, render } from '../deps/htm-preact.js';
import getSyncUrls from './utils/getSyncProjects.js';

function AddProject() {
  function clicked(e) {
    e.preventDefault();
    console.log('clicked')
  }

  return html`
    <form>
      <button onClick=${clicked}>Add Project</button>
    </form>
  `;
}

function ProjectList() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    let haveProjects = false;
    getSyncProjects(projects, setProjects, haveProjects);
    return () => haveProjects = true;
  }, []);

  // const { projects } = await browser.storage.sync.get('projects');
  // const items = projects.map((project, index) =>
  //   html` <div>${project.name}</div>`
  // );

  return html`<div>hello</div>`;
}

function Options() {
  return html`
    <${AddProject} />
    <${ProjectList} />
  `;
}

const app = html`<${Options} />`;
render(app, document.body);