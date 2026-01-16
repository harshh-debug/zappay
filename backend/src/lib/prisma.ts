import "dotenv/config";
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from "../generated/prisma/client.js";


const connectionString = `${process.env.DATABASE_URL}`

const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter,transactionOptions:{
    maxWait: 30000,  // ms to wait for a connection/transaction slot
    timeout: 30000,  // ms before the transaction itself times out
} })

export { prisma }