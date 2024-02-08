// src/models/user.ts
import { Prisma, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const createUser = async (userData: Prisma.UserCreateInput) => {
  return await prisma.user.create({ data: userData })
}

export const getUserById = async (id: number) => {
  return await prisma.user.findUnique({ where: { id } })
}

export const updateUser = async (id: number, userData: any) => {
  return await prisma.user.update({
    where: { id },
    data: userData,
  })
}

export const getAllUsers = async () => {
  return await prisma.user.findMany()
}
