-- DropForeignKey
ALTER TABLE "TempMaxMapRow" DROP CONSTRAINT "TempMaxMapRow_dataSsp_dataModel_fkey";

-- AddForeignKey
ALTER TABLE "TempMaxMapRow" ADD CONSTRAINT "TempMaxMapRow_dataSsp_dataModel_fkey" FOREIGN KEY ("dataSsp", "dataModel") REFERENCES "MapData"("ssp", "model") ON DELETE CASCADE ON UPDATE CASCADE;
