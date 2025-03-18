import { ReactNode, useState, useEffect } from "react";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import MultipleSelector, { Option } from "@/components/ui/multipleselector";
import { useGlobal } from "@/components/globalprovider";

export default function NewProjectDialog({ children }: { children: ReactNode; }) {
   const { LANGUAGES, AddProject } = useGlobal();
   const [isOpen, setIsOpen] = useState<boolean>(false);

   const [name, setName] = useState<string>('');
   const [description, setDescription] = useState<string>('');
   const [languages, setLanguages] = useState<Option[]>([]);
   const [err, setErr] = useState<string>('');

   function onCreate() {
      if (name.trim() === '') setErr("A name is required");
      else if (languages.length === 0) setErr("You must select at least one language");
      else {
         AddProject(name, description, languages);
         setIsOpen(false);
      }
   };

   useEffect(() => {
      // Handle pressing the Enter key
      const handleKeyPress = (e: KeyboardEvent) => {
         if (e.key === 'Enter' && isOpen) {
            e.preventDefault();
            onCreate();
         }
      };

      // Reset err state when fields are changed
      if (name || languages) setErr('');

      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
   }, [isOpen, name, description, languages]);

   useEffect(() => {
      // Reset the form when the dialog is closed
      if (!isOpen) {
         setName('');
         setDescription('');
         setLanguages([]);
         setErr('');
      }
   }, [isOpen])

   return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
         <DialogTrigger asChild>{children}</DialogTrigger>

         <DialogContent>
            <DialogHeader>
               <DialogTitle>Create a new project</DialogTitle>
               <DialogDescription className="sr-only">
                  Dialog for creating a new project
               </DialogDescription>

               {err && <p className="text-sm text-destructive">{err}</p>}
            </DialogHeader>

            <main className="flex flex-col gap-3">
               <div className="flex flex-col gap-1">
                  <Label htmlFor="projectName" className="text-xs">Name*</Label>
                  <Input id="projectName" placeholder="project name" onChange={(e) => setName(e.target.value)}/>
               </div>

               <div className="flex flex-col gap-1">
                  <Label htmlFor="projectDescription" className="text-xs">Description</Label>
                  <Input id="projectDescription" placeholder="a brief description of your project" onChange={(e) => setDescription(e.target.value)} />
               </div>

               <div className="flex flex-col gap-1">
                  <Label htmlFor="projectLanguages" className="text-xs">Languages*</Label>
                  <div id="projectLanguages" className="flex w-full flex-col">
                     <MultipleSelector
                        className="placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30"
                        defaultOptions={LANGUAGES}
                        onChange={(options) => setLanguages(options)}
                        hidePlaceholderWhenSelected
                        creatable
                        placeholder="Select languages you will use..."
                     />
                  </div>
               </div>
            </main>

            <DialogFooter>
               <Button onClick={onCreate}>create</Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
}
