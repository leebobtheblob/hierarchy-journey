'use server';

import { HierarchyData } from "@/_types/types";
import { db } from "@/lib/utils";
import { Hierarchy } from "@prisma/client";
import { Prisma } from "@prisma/client";



export const getHierarchy = async() =>{
   const officeHierarchy = await db.hierarchy.findUnique({
        where: {
            name:"office"
            // id:1
        }
    })

    return officeHierarchy

    
}

export const updateHierarchy = async (updatedJSONData: HierarchyData) => {
    const dataToUpdate: Prisma.InputJsonValue = updatedJSONData as unknown as Prisma.InputJsonValue; // Ensure type compatibility
  
    await db.hierarchy.update({
      where: { name: "office" },
      data: {
        jdata: dataToUpdate,
      },
    });
  };