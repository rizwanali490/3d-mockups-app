import ModelsBrowser from '@/components/ModelsBrowser'
import {getModels, getModelsCount} from '@/lib/models'
import {getCategoryBySlug} from '@/lib/categories'
import {notFound, redirect} from 'next/navigation'
import {MODELS_PER_PAGE} from '@/lib/constants'
import getQueryParams from '@/lib/utils'

export default async function CategoryPage({params, searchParams}:{
  params: Promise<{categorySlug:string}>,
  searchParams: Promise<{sort?:string, search?:string, page?:string}>
}){


  const {search, sort, page} = getQueryParams(await searchParams)

  const {categorySlug} = await params

  const category = await getCategoryBySlug(categorySlug)
  if (!category){
    notFound()
  }

  const models = await getModels({sort, search, categorySlug, page, modelsPerPage:MODELS_PER_PAGE})
  const modelCount = await getModelsCount({search, categorySlug})
  const totalPages = Math.max(1, Math.ceil(modelCount/MODELS_PER_PAGE))

  if(page < 1 || page > totalPages || sort === null){
    redirect(`/3d-models/categories/${categorySlug}`)
  }
  return (
    <ModelsBrowser 
      search={search} 
      models={models} 
      categoryName={category.name}
      totalPages={totalPages}
      currentPage={page}
    />
  )
}