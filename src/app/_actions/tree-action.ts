'use server';

import { db } from "@/lib/utils";



export const getHierarchy = async() =>{
   const officeHierarchy = await db.hierarchy.findUnique({
        where: {name:"office"}
    })

    return officeHierarchy

    
}

export const updateHierarchy = async (updatedJSONData)=>{
    await db.hierarchy.update(
        {
            where:{name:"office"},
            data:{
                data:updatedJSONData
            }
        }
    )
}