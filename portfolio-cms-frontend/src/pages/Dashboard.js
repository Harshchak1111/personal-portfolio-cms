import { useEffect, useState } from 'react';
import API from '../services/api';

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', techStack: '', image: null });

  const fetchProjects = async () => {
    const res = await API.get('/projects');
    setProjects(res.data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleAddProject = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('description', form.description);
    formData.append('techStack', form.techStack);
    formData.append('image', form.image);

    await API.post('/projects', formData);
    fetchProjects(); // refresh list
  };

  const handleDelete = async (id) => {
    await API.delete(`/projects/${id}`);
    fetchProjects();
  };

  return (
    <div>
      <h2>Your Projects</h2>
      <form onSubmit={handleAddProject}>
        <input placeholder="Title" onChange={e => setForm({ ...form, title: e.target.value })} />
        <input placeholder="Description" onChange={e => setForm({ ...form, description: e.target.value })} />
        <input placeholder="Tech Stack" onChange={e => setForm({ ...form, techStack: e.target.value })} />
        <input type="file" onChange={e => setForm({ ...form, image: e.target.files[0] })} />
        <button type="submit">Add Project</button>
      </form>

      <ul>
        {projects.map(p => (
          <li key={p._id}>
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            <p>{p.techStack}</p>
            <button onClick={() => handleDelete(p._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
