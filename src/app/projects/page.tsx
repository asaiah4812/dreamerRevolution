"use client";
import React, { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabaseClient';
import { useRouter } from 'next/navigation';

interface Project {
  id: string;
  name: string;
  language: string;
  created_at: string;
  code: string;
}

const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [user, setUser] = useState<{ id: string } | null>(null); // Fixed the type of user state
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserAndProjects = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push('/'); // Redirect to home if not logged in
        return;
      }

      setUser(session.user); // Removed the unused state update

      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching projects:', error);
      } else {
        setProjects(data);
      }
      setLoading(false);
    };

    fetchUserAndProjects();
  }, []);

  const loadProject = (project: Project) => {
    router.push(`/projects/${project.id}`);
  };

  const deleteProject = async (projectId: string) => {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', projectId);

    if (!error) {
      setProjects(projects.filter(p => p.id !== projectId));
    }
  };

  if (loading) return <div>Loading projects...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Projects</h1>
      {projects.length === 0 ? (
        <p>No projects found. Start coding!</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map(project => (
            <div 
              key={project.id} 
              className="border rounded-lg p-4 shadow-md hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold mb-2">{project.name}</h2>
              <p className="text-gray-600">Language: {project.language}</p>
              <p className="text-sm text-gray-500">
                Created: {new Date(project.created_at).toLocaleDateString()}
              </p>
              <div className="mt-4 flex space-x-2">
                <button 
                  onClick={() => loadProject(project)}
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Open
                </button>
                <button 
                  onClick={() => deleteProject(project.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;