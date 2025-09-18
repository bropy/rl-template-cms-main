import dynamic from 'next/dynamic'

export const ScanComponent = dynamic(() => import('./scan.component'))
