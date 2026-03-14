import React, { use, useEffect, useState } from 'react'
import type { Project } from '../types';
import { Loader2Icon, PlusIcon, TrashIcon } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { dummyProjects } from '../assets/assets';
import Footer from '../components/Footer';

const Community = () => {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([])
  const navigate = useNavigate();

  const fetchProjects = async () => {
    setProjects(dummyProjects)
    // Simulate loading state
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  useEffect(() => {
    fetchProjects();
  }, [])

  return (
    <>
   
      <div className="flex flex-col min-h-screen px-4 md:px-16 lg:px-24 xl:px-32">
        {loading ? (
          <div className="flex items-center justify-center h-[80vh]">
            <Loader2Icon className="size-7 animate-spin text-indigo-200" />
          </div>
        ) : projects.length > 0 ? (
          <div className="py-10 min-h-[80vh]">
            <div className="flex items-center justify-between mb-10">
              <h1 className="text-3xl font-bold text-white">Published Projects</h1>
            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
              {projects.map((project) => (
                <Link to={`/view/project.id`}
                  key={project.id}
                  target='_blank'
                  className="w-72 max-sm:mx-auto cursor-pointer bg-gray-900/60 border border-gray-700 rounded-lg overflow-hidden group  hover:border-indigo-800/80 transition-all duration-300"
                >
                 
                  <div className="relative overflow-hidden h-40">
                    {project.current_code ? (
                      <iframe
                        srcDoc={project.current_code}
                        className="absolute top-0 left-0 w-[1200px] h-[800px] origin-top-left pointer-events-none"
                        sandbox="allow-scripts allow-same-origin"
                        style={{ transform: "scale(0.25)" }}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-500 bg-gray-900">
                        <span>No Preview Available</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div className="flex items-start justify-between mb-2">
                      <h2 className="text-lg font-bold text-white line-clamp-2">{project.name}</h2>
                      <button className="px-3 py-1 text-xs bg-gray-900/80 text-white border border-gray-700 rounded-full font-semibold shadow hover:bg-indigo-600 hover:text-white transition-all ml-2 mt-0.5">
                        Website
                      </button>
                    </div>
                    <p className="text-gray-400 text-sm line-clamp-2 flex-1">{project.initial_prompt}</p>

                     <div className='flex justify-between items-center mt-6'>
                      <span className='text-xs text-gray-500'>{new Date(project.createdAt).toLocaleDateString()}</span>
                      <div className='flex gap-3 text-white text-sm'>
                        <button className="px-3 py-1.5 bg-white/10 hover:bg-white/15 rounded-md transition-all transition-colors flex items-center gap-2">
                          <span className='bg-gray-200 size-4.5 rounded-full text-black font-semibold flex items-center justify-center'> {project.user?.name?.slice(0, 1)}</span>{project.user?.name}
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* ...existing code... */}
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[80vh]">
            <h1 className="text-2xl font-medium text-gray-300">You have no projects yet</h1>
            <button
              onClick={() => navigate("/")}
              className="text-white px-5 py-2 mt-5 rounded-lg bg-indigo-600 hover:bg-indigo-700 font-semibold shadow-lg transition-all"
            >
              Create New
            </button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}


export default Community