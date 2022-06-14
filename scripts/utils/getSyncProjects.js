export default async function getSyncUrls(projects, setProjects, haveProjects) {
    const { projects } = await browser.storage.sync.get('projects');
    const storedProjects = projects;
    if (storedProjects && !haveProjects) {
        setProjects([...projects, ...storedProjects]);
    }
};