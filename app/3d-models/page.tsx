import ModelsBrowser from '@/components/ModelsBrowser'
import {redirect} from 'next/navigation'
import {getModels, getModelsCount} from '@/lib/models'
import {MODELS_PER_PAGE} from '@/lib/constants'
import getQueryParams from '@/lib/utils'

export default async function ModelsPage({searchParams}:{
  searchParams:Promise<{
    search?:string,
    sort?:string,
    page?:string
  }>
}){

  const {search, sort, page} = getQueryParams(await searchParams)
  
  const modelsPage = await getModelsCount({search})
  const totalPages = Math.max(1, Math.ceil( modelsPage  / MODELS_PER_PAGE ))

  if (page < 1 || page > totalPages || sort === null){
      redirect('/3d-models')
  }
  
  const models = await getModels({search, sort, modelsPerPage: MODELS_PER_PAGE, page})

  return (
    <ModelsBrowser 
      search={search} 
      models={models}
      totalPages={totalPages}
      currentPage={page}
    />
  )
}
