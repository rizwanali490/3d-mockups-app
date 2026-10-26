import PaginationButton from '@/components/PaginationButton'

export default function PaginationControls({totalPages, currentPage}:{
  totalPages:number,
  currentPage:number
}){
  //[1, 2, 3, 4, 5]
  const pagesArray = Array.from({length:totalPages}, (_,i) => i + 1)
  return (
    <div className="flex justify-center gap-1">  
      {currentPage !== 1 && (
        <PaginationButton page={1} isActive={false} label="<<"/>
      )}
      {currentPage !== 1 && (
        <PaginationButton page={currentPage-1} isActive={false}/>
      )}
      <PaginationButton page={currentPage} isActive={true}/>
      {currentPage !== totalPages && (
        <PaginationButton page={currentPage+1} isActive={false}/>
      )}
      {currentPage !== totalPages && (
        <PaginationButton page={totalPages} isActive={false} label=">>"/>
      )}
    </div>
  )
}