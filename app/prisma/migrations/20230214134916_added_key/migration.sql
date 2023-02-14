/*
  Warnings:

  - A unique constraint covering the columns `[ssp,model,region]` on the table `Data` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `dataRegion` to the `TempMaxRow` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TempMaxRow" DROP CONSTRAINT "TempMaxRow_dataSsp_dataModel_fkey";

-- DropIndex
DROP INDEX "Data_ssp_model_key";

-- AlterTable
ALTER TABLE "TempMaxRow" ADD COLUMN     "dataRegion" "Region" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Data_ssp_model_region_key" ON "Data"("ssp", "model", "region");

-- AddForeignKey
ALTER TABLE "TempMaxRow" ADD CONSTRAINT "TempMaxRow_dataSsp_dataModel_dataRegion_fkey" FOREIGN KEY ("dataSsp", "dataModel", "dataRegion") REFERENCES "Data"("ssp", "model", "region") ON DELETE CASCADE ON UPDATE CASCADE;
