'use client'

import SearchForm from '@/components/SearchForm'
import ModelsGrid from '@/components/ModelsGrid'
import type {Model} from '@/lib/types'
import {useTransition} from 'react'
import PaginationControls from './PaginationControls'

export default function ModelsBrowser({search, models, categoryName, totalPages, currentPage}:{
  search?:string,
  models:Model[],
  categoryName?:string,
  totalPages: number,
  currentPage: number
}){

  const [isPending, startTransition] = useTransition()

  return (
    <div>
      <SearchForm 
        startTransition={startTransition}
        search={search}
      />
      <ModelsGrid 
        isPending={isPending} 
        search={search} 
        models={models}
        categoryName={categoryName}
        startTransition={startTransition}
      />
      <PaginationControls 
        totalPages={totalPages}
        currentPage={currentPage}
      />
    </div>
  )
}