import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

export default function Settings({ setTab }: { setTab: (tab: string) => void }) {
    return (
        <motion.div
            initial={{ x: 25, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -25, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}>
            <div className="flex gap-1 p-1 rounded-md border-1 border-dashed">
                <Button onClick={() => setTab("projects")} variant={"ghost"}>
                    <ChevronLeft /> Settings
                </Button>
            </div>
        </motion.div>
    );
}