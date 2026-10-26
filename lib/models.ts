import { getDBConnection } from '@/lib/db'

export async function getModels({search, sort, categorySlug, modelsPerPage, page}:{
  search?:string,
  sort?:string,
  categorySlug?:string,
  modelsPerPage?:number,
  page?:number
}){
  const db = await getDBConnection()

  let sql = "SELECT * FROM models"
  const placeholders = []

  if(search || categorySlug){
    const where = []

    if(search){
      where.push("(name LIKE ? OR description LIKE ?)")
      placeholders.push(`%${search}%`, `%${search}%`)
    }
    if (categorySlug){
      where.push("category=?")
      placeholders.push(categorySlug)
    }

    sql+= " WHERE " + where.join(" AND ")
  }

  if (sort){
    if (sort==="alpha"){
      sql += " ORDER BY name ASC"
    }
    if (sort==="popular"){
      sql += " ORDER BY likes DESC"
    }
    if (sort==="recent"){
      sql += " ORDER BY dateAdded DESC"
    }
  }

  if(page){
    const offset = (page - 1) * modelsPerPage
    sql += " LIMIT ? OFFSET ?"
    placeholders.push(modelsPerPage, offset)
  }

  try {
    return await db.all(sql, placeholders)
  } finally {
    await db.close()
  }
}

export async function getModelById(id:string){
  const db = await getDBConnection()
  try {
    return await db.get(`SELECT * FROM models WHERE id=?`, [id])
  } finally {
    await db.close()
  }
}

export async function getModelsCount({search, categorySlug}:{search?:string, categorySlug?:string}){
  const db = await getDBConnection()
  let sql = "SELECT COUNT(*) as count FROM models"
  const placeholders = []
  const conditions = []

  if(search || categorySlug){
    if(search){
      conditions.push("name LIKE ? OR description LIKE ?")
      placeholders.push(`%${search}%`, `%${search}%`)
    }
    if(categorySlug){
      conditions.push("category=?")
      placeholders.push(categorySlug)
    }
    sql+= " WHERE " + conditions.join(" AND ")
  }

  try{
    const result = await db.get(sql, placeholders)
    return result.count
  } finally{
    await db.close()
  }
}