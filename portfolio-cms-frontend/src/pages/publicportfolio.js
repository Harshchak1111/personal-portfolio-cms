import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API from '../services/api';

export default function PublicPortfolio() {
  const { username } = useParams();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchUserProjects = async () => {
      const res = await API.get(`/public/${username}`);
      setProjects(res.data);
    };
    fetchUserProjects();
  }, [username]);

  return (
    <div>
      <h2>{username}'s Portfolio</h2>
      {projects.map(p => (
        <div key={p._id}>
          <h3>{p.title}</h3>
          <p>{p.description}</p>
          <p>{p.techStack}</p>
          <img src={`http://localhost:5000/${p.imagePath}`} alt={p.title} width="200" />
        </div>
      ))}
    </div>
  );
}
