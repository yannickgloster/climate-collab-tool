-- CreateTable
CREATE TABLE "TempRow" (
    "id" SERIAL NOT NULL,
    "year" TIMESTAMP(3) NOT NULL,
    "tas" DOUBLE PRECISION NOT NULL,
    "dataSsp" "SSP" NOT NULL,
    "dataModel" "Model" NOT NULL,
    "dataRegion" "Region" NOT NULL,

    CONSTRAINT "TempRow_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TempRow" ADD CONSTRAINT "TempRow_dataSsp_dataModel_dataRegion_fkey" FOREIGN KEY ("dataSsp", "dataModel", "dataRegion") REFERENCES "Data"("ssp", "model", "region") ON DELETE CASCADE ON UPDATE CASCADE;
