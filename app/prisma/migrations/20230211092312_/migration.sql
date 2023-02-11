-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_questionId_fkey";

-- DropForeignKey
ALTER TABLE "RegionWeight" DROP CONSTRAINT "RegionWeight_questionId_fkey";

-- DropForeignKey
ALTER TABLE "TempMaxRow" DROP CONSTRAINT "TempMaxRow_dataSsp_dataModel_fkey";

-- AlterTable
ALTER TABLE "Answer" ALTER COLUMN "weight" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "cost" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "RegionWeight" ALTER COLUMN "weight" SET DATA TYPE DOUBLE PRECISION;

-- AddForeignKey
ALTER TABLE "RegionWeight" ADD CONSTRAINT "RegionWeight_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TempMaxRow" ADD CONSTRAINT "TempMaxRow_dataSsp_dataModel_fkey" FOREIGN KEY ("dataSsp", "dataModel") REFERENCES "Data"("ssp", "model") ON DELETE CASCADE ON UPDATE CASCADE;
