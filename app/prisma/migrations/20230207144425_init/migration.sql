-- CreateEnum
CREATE TYPE "SSP" AS ENUM ('SSP126', 'SSP245', 'SSP370', 'SSP585');

-- CreateEnum
CREATE TYPE "MODEL" AS ENUM ('CNRM_CM6_1');

-- CreateTable
CREATE TABLE "Data" (
    "ssp" "SSP" NOT NULL,
    "model" "MODEL" NOT NULL
);

-- CreateTable
CREATE TABLE "TempMaxRow" (
    "id" SERIAL NOT NULL,
    "year" TIMESTAMP(3) NOT NULL,
    "tasmax" DECIMAL(65,30) NOT NULL,
    "dataSsp" "SSP" NOT NULL,
    "dataModel" "MODEL" NOT NULL,

    CONSTRAINT "TempMaxRow_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Data_ssp_model_key" ON "Data"("ssp", "model");

-- AddForeignKey
ALTER TABLE "TempMaxRow" ADD CONSTRAINT "TempMaxRow_dataSsp_dataModel_fkey" FOREIGN KEY ("dataSsp", "dataModel") REFERENCES "Data"("ssp", "model") ON DELETE RESTRICT ON UPDATE CASCADE;
