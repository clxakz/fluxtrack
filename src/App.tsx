import { Button } from "@/components/ui/button";
import { CirclePlus, Cog } from "lucide-react";
import NewProjectDialog from "./dialogs/newproject-dialog";
import { useGlobal } from "./components/globalprovider";
import ProjectCard from "./components/projectcard";
import { motion, AnimatePresence } from 'framer-motion';

function App() {
   const { projects } = useGlobal();

   return (
      <div className="flex flex-col gap-1 h-full overflow-hidden">
         <div className="flex gap-1 p-1 rounded-md border-1 border-dashed">
            <NewProjectDialog>
               <Button variant={"ghost"}>
                  <CirclePlus /> New Project
               </Button>
            </NewProjectDialog>

            <Button size={"icon"} variant={"ghost"} className="ml-auto">
               <Cog />
            </Button>
         </div>



         {projects.length > 0 ?
         <div className="flex flex-col gap-1 overflow-auto overflow-x-hidden">
            {/* Pinned Projects */}
            {projects.some(project => project.pinned === true) &&
               <>
                  <p className="font-semibold text-muted-foreground">Pinned</p>
                  <motion.div layout className="grid grid-cols-4 gap-1">
                     <AnimatePresence>
                        {projects
                           .filter(project => project.pinned)
                           .map((project) => (
                              <ProjectCard key={project.id} project={project} />
                           ))}
                     </AnimatePresence>
                  </motion.div>
               </>
            }

            {/* All Projects */}
            <p className="font-semibold text-muted-foreground">All Projects</p>
            <motion.div layout className="grid grid-cols-4 gap-1">
               <AnimatePresence>
                  {projects
                     .filter(project => !project.pinned)
                     .map((project) => (
                        <ProjectCard key={project.id} project={project} />
                     ))}
               </AnimatePresence>
            </motion.div>
         </div> : 

         // No projects screen
         <div className="flex grow items-center justify-center">
            <p className="text-xl font-semibold text-muted-foreground">No projects</p>
         </div>   
         }
      </div>
   );
}

export default App;
