import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [projects, setProjects] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    const fetchProject = async () => {
      const res = await fetch("http://localhost:4000/api/projects");
      const projectData = await res.json();
      console.log(projectData);
      setProjects(projectData.projects);
    };
    fetchProject();
  }, []);

  const handleChange = (e) =>{
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    
    try {
      e.preventDefault()
      const res = await fetch('http://localhost:4000/api/projects', {
        headers: {
          "Content-Type": "application/json"
        },
        method: 'POST',
        body: JSON.stringify(formData)
      })
      //parse data to JSON 
      const data = await res.json()

      console.log(data.project);
      setProjects([data.project, ...projects])
      
    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <>
      <h1>Project manager</h1>

      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">
            Project Name
            <input
              type="text"
              value={formData.name}
              name="name"
              onChange={handleChange}
            />
          </label>
          <label htmlFor="description">
            Project Description
            <input
              type="text"
              value={formData.description}
              name="description"
              onChange={handleChange}
            />
          </label>
          <input type="submit" value="create project" />
        </form>
      </div>
      <div>
        {projects &&
          projects.map((project) => (
            <div key={project._id}>
              <h2>{project.name}</h2>
              <p>{project.description}</p>
            </div>
          ))}
      </div>
    </>
  );
}

export default App;
