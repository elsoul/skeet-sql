import { Prisma } from '@prisma/client'

export const handlePrismaError = (
  error: Prisma.PrismaClientKnownRequestError | any,
) => {
  // Show the error in the console
  console.error('Prisma Error:', error)

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002': // Violates unique constraint
        return {
          status: 'error',
          message: 'Resource already exists.',
          details: {
            model: error.meta?.model,
            field: error.meta?.target,
          },
        }
      case 'P2003': // Violates foreign key constraint
        return {
          status: 'error',
          message: 'Resource cannot be linked to or from other resources.',
        }
      case 'P2025': // No record found for the unique constraint
        return {
          status: 'error',
          message: 'Resource does not exist.',
        }
      // Add more Prisma error codes as needed
      default:
        // Unknown Prisma error
        return {
          status: 'error',
          message: 'A database error occurred.',
          details: error,
        }
    }
  } else {
    // Unknown error
    return {
      status: 'error',
      message: 'An unexpected error occurred.',
      details: error,
    }
  }
}
