import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function performDatabaseInserts() {
  try {
    await db.$transaction(async (db) => {
      await db.hierarchy.create({
        data: {
          name: 'office',
          jdata: {
            root: {
              index: "root",
              canMove: true,
              isFolder: true,
              children: ["Gasan", "Jeongja"],
              data: "Root item",
              canRename: true
            },
            Gasan: {
              index: "Gasan",
              canMove: true,
              isFolder: true,
              children: ["kyj", "lsh", "ljb"],
              data: "성남",
              canRename: true
            },
            Jeongja: {
              index: "Jeongja",
              canMove: true,
              isFolder: true,
              children: ["khj"],
              data: "가산",
              canRename: true
            },
            kyj: {
              index: "kyj",
              canMove: true,
              children: [],
              data: "강영진",
              canRename: true
            },
            lsh: {
              index: "lsh",
              canMove: true,
              children: [],
              data: "이승현",
              canRename: true
            },
            ljb: {
              index: "ljb",
              canMove: true,
              children: [],
              data: "임재범",
              canRename: true
            },
            khj: {
              index: "khj",
              canMove: true,
              children: [],
              data: "김효진",
              canRename: true
            }
          }
        }
      });
    });
  } catch (error) {
    console.error("Transaction failed:", error);
  } finally {
    await db.$disconnect();
  }
}

performDatabaseInserts();
