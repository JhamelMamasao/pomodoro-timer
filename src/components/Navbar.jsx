import logo from '../assets/logo.svg';
import logoforWhite from '../assets/logoforWhite.svg';
import { ModeToggle } from '@/components/ModeToggle';

export default function Home() {
    return (
            <div className="max-w-7xl  mx-auto px-6">
                <div className="flex items-center justify-between h-24">
                    <div className="flex items-center gap-3">
                       <img src={logoforWhite} className="w-6 dark:hidden" />
                       <img src={logo} className="w-6 hidden dark:block" />
                    </div>

                    <div className='flex items-center gap-3 font-poppins'>
                        <ul className='flex flex-row gap-15 font-medium text-sm'>
                            <li>Timer</li>
                            <li>Tasks</li>
                            <li>Statistics</li>
                        </ul>
                    </div>

                    <div className='flex items-center gap-3'>
                        <ModeToggle />
                    </div>
                </div>
            </div>
    )
}
