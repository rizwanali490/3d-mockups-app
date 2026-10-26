export default function getQueryParams(searchParams:{
  search?:string,
  sort?:string,
  page?:string
}){
  const search = searchParams.search?.toLowerCase() || ''
  const rawSort = searchParams.sort;
  const rawPage = searchParams.page
  const sortValues = ['alpha', 'popular', 'recent']

  let page
  if (rawPage === undefined){
   page = 1
  } else {
   const parsedPage = Number(rawPage)
   page = Number.isNaN(parsedPage) ? 0 : parsedPage
  }

  let sort 
  if(rawSort === undefined){
    sort = ''
  console.log('unde', sort)

  }else{
    sort = sortValues.includes(rawSort) ? rawSort : null
  console.log('defomed', sort)
    
  }
  return {search, sort, page}
}