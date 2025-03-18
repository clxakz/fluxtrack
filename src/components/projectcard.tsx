import { ListCollapse, Loader, Play, Star, Trash2 } from "lucide-react";
import { ProjectType, useGlobal } from "./globalprovider";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { Suspense } from "react";
import { motion } from 'framer-motion';

export default function ProjectCard({ project }: { project: ProjectType }) {
    const { DeleteProject, PinProject } = useGlobal();

    return (
        <Suspense fallback={<div className="animate-spin z-50 flex items-center justify-center"><Loader /></div>}>
            <motion.div
                layout
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="flex h-48 justify-between flex-col border-border border-1 rounded-md bg-background overflow-hidden"
            >
                <div className="relative group grow">
                    <div className="relative p-2 group-hover:blur-xs transition-all grow ease-in-out duration-100">
                        <div className="flex items-center gap-1">
                            {project.languages.map((lang) => {
                                return <img className="w-5 aspect-square" src={`../../build/images/${lang.value}.png`} key={lang.value} onError={(e) => (e.currentTarget.style.display = 'none')} />
                            })}
                        </div>

                        <p>{project.name}</p>
                    </div>

                    <div className="p-2 absolute inset-0 opacity-0 invisible group-hover:visible group-hover:opacity-100 flex transition-opacity ease-in-out duration-300">
                        <p>{project.description.trim() || "No description"}</p>
                    </div>
                </div>

                <div className="flex border-t-1 overflow-hidden bg-card">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button size={"icon"} variant={"ghost"} className="rounded-none grow">
                                    <Play />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Open Project</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button size={"icon"} variant={"ghost"} className="rounded-none grow">
                                    <ListCollapse />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Detailed View</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button onClick={() => DeleteProject(project.id)} size={"icon"} variant={"ghost"} className="rounded-none grow">
                                    <Trash2 />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Delete Project</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button onClick={() => PinProject(project.id)} size={"icon"} variant={"ghost"} className="rounded-none grow">
                                    {project.pinned ? <Star fill="#e6c210" stroke="#e6c210" /> : <Star />}
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Pin Project</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </motion.div>
        </Suspense>
    );
}