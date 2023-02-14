-- CreateEnum
CREATE TYPE "SSP" AS ENUM ('SSP119', 'SSP126', 'SSP245', 'SSP370', 'SSP434', 'SSP460', 'SSP534OS', 'SSP585');

-- CreateEnum
CREATE TYPE "Region" AS ENUM ('EU', 'US', 'China', 'SA', 'India', 'Island');

-- CreateEnum
CREATE TYPE "QuestionTopic" AS ENUM ('LandUseChange', 'EnergyProduction');

-- CreateEnum
CREATE TYPE "Model" AS ENUM ('CNRM_CM6_1', 'CNRM_ESM2_1');

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
    "questionId" INTEGER NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL
);

-- CreateTable
CREATE TABLE "Answer" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "cost" DOUBLE PRECISION NOT NULL,
    "questionId" INTEGER,

    CONSTRAINT "Answer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Data" (
    "ssp" "SSP" NOT NULL,
    "model" "Model" NOT NULL
);

-- CreateTable
CREATE TABLE "TempMaxRow" (
    "id" SERIAL NOT NULL,
    "year" TIMESTAMP(3) NOT NULL,
    "tasmax" DOUBLE PRECISION NOT NULL,
    "dataSsp" "SSP" NOT NULL,
    "dataModel" "Model" NOT NULL,

    CONSTRAINT "TempMaxRow_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RegionWeight_region_questionId_key" ON "RegionWeight"("region", "questionId");

-- CreateIndex
CREATE UNIQUE INDEX "Data_ssp_model_key" ON "Data"("ssp", "model");

-- AddForeignKey
ALTER TABLE "RegionWeight" ADD CONSTRAINT "RegionWeight_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TempMaxRow" ADD CONSTRAINT "TempMaxRow_dataSsp_dataModel_fkey" FOREIGN KEY ("dataSsp", "dataModel") REFERENCES "Data"("ssp", "model") ON DELETE CASCADE ON UPDATE CASCADE;
