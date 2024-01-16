import checkIcon from '@/public/checkIcon.png';
import Image from 'next/image';

interface CardProps {
    remissionNumber: string;
    icon?: string;
    title?: string;
    description?: string;
    button?: string;
    }

export const OrderCard = ({remissionNumber}: CardProps) => {
    
    return ( 
        <div style={{ 
            zIndex: 2, 
            width: '500px', 
            height: '275px', 
            borderRadius: '1rem', 
            backgroundColor: 'white', 
            display: 'flex', 
            flexDirection: 'column',
            maxWidth: '520px',   
            maxHeight: '275px',  
            background: 'white'  
          }}>
           <Image
            src={checkIcon}
            alt="Check Icon"
            className="w-55 h-45 mx-auto mt-12"
            />
            <p className="mx-auto mt-10">Se ha creado tu pedido con el Número de Orden</p>
            
            <div className="mt-10 mx-auto px-10 py-5 text-sm text-white bg-white-600 rounded-full border border-solid border-gray ">
            {remissionNumber}</div>
        </div>
    )
}