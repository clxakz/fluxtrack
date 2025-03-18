import { app, BrowserWindow, ipcMain } from "electron";
import { fileURLToPath } from "node:url";
import path, { join } from "node:path";
import { promises as fs } from 'fs';
import { PathLike } from "node:fs";
import { exec } from "child_process";


const __dirname = path.dirname(fileURLToPath(import.meta.url));
process.env.APP_ROOT = path.join(__dirname, "..");

export const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
export const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
export const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
   ? path.join(process.env.APP_ROOT, "public")
   : RENDERER_DIST;

let win: BrowserWindow | null;

function createWindow() {
   win = new BrowserWindow({
      width: 900,
      height: 720,
      minWidth: 600,
      minHeight: 400,
      title: "Fluxtrack",
      titleBarStyle: "hidden",
      titleBarOverlay: {
         height: 24,
         color: "rgba(0,0,0,0)",
         symbolColor: "#525252",
      },
      center: true,
      hasShadow: true,

      webPreferences: {
         preload: path.join(__dirname, "preload.mjs"),
         nodeIntegration: false,
         contextIsolation: true,
         sandbox: true
      },
   });

   if (VITE_DEV_SERVER_URL) {
      win.loadURL(VITE_DEV_SERVER_URL);
      win.webContents.openDevTools({ mode: "detach" });
   } else {
      win.loadFile(path.join(RENDERER_DIST, "index.html"));
   }

   // Hide menu-bar
   win.setMenu(null);
}

app.on("window-all-closed", () => {
   if (process.platform !== "darwin") {
      app.quit();
      win = null;
   }
});

app.on("activate", () => {
   if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
   }
});

const Documents: PathLike = app.getPath("documents");

app.disableHardwareAcceleration();
app.whenReady().then(() => {
   createWindow();

   // Handle Ipc
   ipcMain.handle("create-project-folder", async (_event, name: string) => {
      try {
         await fs.mkdir(join(Documents, "fluxtrack-projects", name), { recursive: true });
         console.log(`Folder created: ${join(Documents, "fluxtrack-projects", name)}`);
       } catch (error) {
         console.error('Error creating folder:', error);
       }
   })

   ipcMain.handle("open-project-in-editor", async (_event, name: string) => {
      const resolvedPath = path.resolve(Documents, "fluxtrack-projects", name);
      const editorPrefix = `"trae"`;

      exec(`"${editorPrefix}" "${resolvedPath}"`, (error, stdout, stderr) => {
         if (error) {
            console.error(`Error opening folder in Editor: ${error}`);
            return;
         }
         console.log(`Editor opened folder: ${stdout}`);
         if (stderr) {
            console.error(`Editor stderr: ${stderr}`);
         }
      });
   });
});
