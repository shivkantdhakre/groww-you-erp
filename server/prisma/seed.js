import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../utils/password.js';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // 1. Create the default Groww You Company
  const company = await prisma.company.create({
    data: {
      name: 'Groww You ERP - HQ',
      gstNumber: '22AAAAA0000A1Z5',
      address: 'Agra, Uttar Pradesh, India',
      mobileNumber: '9999999999',
      financialYear: '2026-2027',
      invoicePrefix: 'GY-'
    }
  });
  console.log(`✅ Company created: ${company.name} (ID: ${company.id})`);

  // 2. Hash the initial password
  const hashedPassword = await hashPassword('admin123');

  // 3. Create the Super Admin User
  const superAdmin = await prisma.user.create({
    data: {
      companyId: company.id,
      name: 'Super Admin',
      email: 'admin@growwyou.com',
      password: hashedPassword,
      role: 'SUPER_ADMIN' 
    }
  });
  console.log(`✅ Super Admin created: ${superAdmin.email} (Role: ${superAdmin.role})`);
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
