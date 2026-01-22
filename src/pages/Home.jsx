import { ThemeProvider } from '@/components/ThemeProvider';
import Navbar from '@/components/Navbar'
import Timer from '@/components/Timer'

export default function Home() {
    return (
         <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <Navbar />
            <Timer/>
        </ThemeProvider>
    )
}