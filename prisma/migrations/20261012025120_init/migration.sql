-- CreateEnum
CREATE TYPE "Specie" AS ENUM ('dog', 'cat', 'other');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('lost', 'found');

-- CreateTable
CREATE TABLE "Pet" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "specie" "Specie" NOT NULL,
    "descricao" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "status" "Status" NOT NULL,
    "dateDisappearance" TIMESTAMP(3) NOT NULL,
    "contact" TEXT NOT NULL,

    CONSTRAINT "Pet_pkey" PRIMARY KEY ("id")
);
