import { ipcRenderer, contextBridge } from 'electron'

contextBridge.exposeInMainWorld("api", {
    CreateProjectFolder: (name: string) => ipcRenderer.invoke("create-project-folder", name),
    OpenProjectInEditor: (name: string) => ipcRenderer.invoke("open-project-in-editor", name),
})