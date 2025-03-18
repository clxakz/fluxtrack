import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Option } from "@/components/ui/multipleselector";


const LANGUAGES: Option[] = [
    { label: 'Python', value: 'python' },
    { label: 'JavaScript', value: 'javascript' },
    { label: 'TypeScript', value: 'typescript' },
    { label: 'Java', value: 'java' },
    { label: 'C++', value: 'cpp' },
    { label: 'C#', value: 'csharp' },
    { label: 'Ruby', value: 'ruby' },
    { label: 'PHP', value: 'php' },
    { label: 'Swift', value: 'swift' },
    { label: 'Go', value: 'go' },
    { label: 'Rust', value: 'rust' },
    { label: 'Kotlin', value: 'kotlin' },
    { label: 'R', value: 'r' },
    { label: 'MATLAB', value: 'matlab' },
    { label: 'Scala', value: 'scala' },
    { label: 'Dart', value: 'dart' },
    { label: 'Lua', value: 'lua' },
    { label: 'Perl', value: 'perl' },
    { label: 'Haskell', value: 'haskell' },
    { label: 'Julia', value: 'julia' },
    { label: 'Assembly', value: 'assembly' },
    { label: 'COBOL', value: 'cobol' },
    { label: 'Fortran', value: 'fortran' },
    { label: 'Groovy', value: 'groovy' },
    { label: 'Objective-C', value: 'objective-c' },
    { label: 'Pascal', value: 'pascal' },
    { label: 'SQL', value: 'sql' },
    { label: 'Shell Script', value: 'shell' },
    { label: 'Visual Basic', value: 'vb' },
    { label: 'WebAssembly', value: 'wasm' }
];

export type ProjectType = {
    id: number;
    name: string;
    description: string;
    languages: Option[];
    pinned?: boolean;
};

type GlobalContextType = {
    LANGUAGES: Option[];
    projects: ProjectType[];
    AddProject: (name: string, description: string, languages: Option[]) => void;
    DeleteProject: (id: number) => void;
    PinProject: (id: number) => void;
};

const DUMMYPROJECTS: ProjectType[] = [
    {
        id: 0,
        name: "React Portfolio",
        description: "A personal portfolio website built with React and TypeScript",
        languages: [
            { label: 'TypeScript', value: 'typescript' },
            { label: 'JavaScript', value: 'javascript' }
        ]
    },
    {
        id: 1,
        name: "Python Data Analysis",
        description: "Data analysis project using pandas and matplotlib",
        languages: [
            { label: 'Python', value: 'python' }
        ]
    },
    {
        id: 2,
        name: "Game Engine",
        description: "A 2D game engine built from scratch",
        languages: [
            { label: 'C++', value: 'cpp' },
            { label: 'Lua', value: 'lua' }
        ]
    },
    {
        id: 3,
        name: "React Portfolio",
        description: "A personal portfolio website built with React and TypeScript",
        languages: [
            { label: 'TypeScript', value: 'typescript' },
            { label: 'JavaScript', value: 'javascript' }
        ]
    },
    {
        id: 4,
        name: "Python Data Analysis",
        description: "Data analysis project using pandas and matplotlib",
        languages: [
            { label: 'Python', value: 'python' }
        ]
    },
    {
        id: 5,
        name: "Game Engine",
        description: "A 2D game engine built from scratch",
        languages: [
            { label: 'C++', value: 'cpp' },
            { label: 'Lua', value: 'lua' }
        ]
    }
]


const GlobalContext = createContext<GlobalContextType | null>(null);

export default function GlobalProvider({ children }: { children: ReactNode; }) {
    const [projects, setProjects] = useState<ProjectType[]>([...DUMMYPROJECTS]);

    const AddProject = (name: string, description: string, languages: Option[]) => {
        setProjects((prev) => {
            // Get the next available ID
            const nextId =
                prev.length > 0
                    ? Math.max(...prev.map((project) => project.id)) + 1
                    : 0;

            return [...prev, { id: nextId, name, description, languages, pinned: false }];
        });
    };

    const DeleteProject = (id: number) => {
        setProjects((prev) => prev.filter((project) => project.id !== id));
    };

    const PinProject = (id: number) => {
        setProjects(prev => prev.map(project =>
            project.id === id ? { ...project, pinned: !project.pinned } : project
        ));
    };

    useEffect(() => {
        console.log(projects)
    }, [projects])
    

    return (
        <GlobalContext.Provider value={{ LANGUAGES, projects, AddProject, DeleteProject, PinProject }}>
            {children}
        </GlobalContext.Provider>
    );
}

export function useGlobal() {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error('useGlobal must be used within a GlobalProvider');
    }
    return context;
}
