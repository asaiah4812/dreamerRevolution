"use client";
import { useEffect, useState, use } from "react";
import { supabase } from "@/utils/supabaseClient";
import Editor from "@/components/codeeditor/editor";
import { useRouter } from "next/navigation";

interface Project {
  id: string;
  name: string;
  language: string;
  code: string;
  user_id: string;
  created_at: string;
}

export default function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const resolvedParams = use(params);

  useEffect(() => {
    async function fetchProject() {
      const { data: session } = await supabase.auth.getSession();
      
      if (!session.session) {
        router.push('/');
        return;
      }

      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', resolvedParams.id)
        .single();

      if (error) {
        console.error('Error fetching project:', error);
        router.push('/projects');
        return;
      }

      setProject(data);
      setLoading(false);
    }

    fetchProject();
  }, [resolvedParams.id, router]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!project) {
    return <div className="flex justify-center items-center h-screen">Project not found</div>;
  }

  return (
    <div className="h-screen">
      <Editor
        initialValue={project.code}
        initialLanguage={project.language}
        projectId={project.id}
        projectName={project.name}
      />
    </div>
  );
} 