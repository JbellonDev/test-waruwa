
interface CardProps {
  remissionNumber?: string;
  icon?: string;
  title?: string;
  description?: string;
  button?: string;
}
   
export const Card = ({remissionNumber, icon, title, description, button}: CardProps) => {
    
    return (
      <div className="h-[80px]">
        <div className="absolute bottom-0 right-[50%] z-10 w-112 h-68 rounded-xl bg-white flex flex-col max-w-112 max-h-68 py-12 px-20"
             style={{transform: 'translate(50%,50%)'}}>
          <img
            src={icon}
            alt="Icon"
            className="w-55 h-55 mx-auto"
          />
          {!!title && <h3 className="">{title}</h3>}

          {!!description && <div className="text-neutral-700 text-base font-normal mx-auto mt-9">{description}</div>}

          {!!remissionNumber && (
            <div
              className="mt-9 mx-auto w-[119px] h-[38px] px-7 py-2.5 rounded-[46px] border border-black border-opacity-20 justify-center items-center gap-2.5 inline-flex">
              <div className="text-neutral-700 text-[25px] font-medium">{remissionNumber}</div>
            </div>
          )}

          {!!button && <button>{button}</button>}
        </div>
      </div>
    )
}
