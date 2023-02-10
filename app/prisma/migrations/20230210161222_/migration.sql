/*
  Warnings:

  - Changed the type of `model` on the `Data` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `dataModel` on the `TempMaxRow` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Region" AS ENUM ('EU', 'US', 'China', 'SA', 'India', 'Island');

-- CreateEnum
CREATE TYPE "QuestionTopic" AS ENUM ('LandUseChange', 'EnergyProduction');

-- CreateEnum
CREATE TYPE "Model" AS ENUM ('CNRM_CM6_1');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "SSP" ADD VALUE 'SSP119';
ALTER TYPE "SSP" ADD VALUE 'SSP434';
ALTER TYPE "SSP" ADD VALUE 'SSP460';
ALTER TYPE "SSP" ADD VALUE 'SSP534OS';

-- DropForeignKey
ALTER TABLE "TempMaxRow" DROP CONSTRAINT "TempMaxRow_dataSsp_dataModel_fkey";

-- AlterTable
ALTER TABLE "Data" DROP COLUMN "model",
ADD COLUMN     "model" "Model" NOT NULL;

-- AlterTable
ALTER TABLE "TempMaxRow" DROP COLUMN "dataModel",
ADD COLUMN     "dataModel" "Model" NOT NULL;

-- DropEnum
DROP TYPE "MODEL";

-- CreateTable
CREATE TABLE "Question" (
    "id" SERIAL NOT NULL,
    "imgUrl" TEXT,
    "topic" "QuestionTopic" NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RegionWeight" (
    "region" "Region" NOT NULL,
    "questionId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Answer" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "cost" INTEGER NOT NULL,
    "questionId" INTEGER,

    CONSTRAINT "Answer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RegionWeight_region_questionId_key" ON "RegionWeight"("region", "questionId");

-- CreateIndex
CREATE UNIQUE INDEX "Data_ssp_model_key" ON "Data"("ssp", "model");

-- AddForeignKey
ALTER TABLE "RegionWeight" ADD CONSTRAINT "RegionWeight_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TempMaxRow" ADD CONSTRAINT "TempMaxRow_dataSsp_dataModel_fkey" FOREIGN KEY ("dataSsp", "dataModel") REFERENCES "Data"("ssp", "model") ON DELETE RESTRICT ON UPDATE CASCADE;
