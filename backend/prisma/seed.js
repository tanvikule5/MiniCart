import prisma from "../src/config/prisma.js";

const categories = [
  "Electronics",
  "Books",
  "Furniture",
  "Clothing",
  "Sports",
  "Accessories",
  "Other",
];

async function main() {
  for (const category of categories) {
    await prisma.category.create({
      data: {
        name: category,
      },
    });
  }

  console.log("Categories added");
}

main()
  .catch((error) => {
    console.log(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });