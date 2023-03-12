-- CreateTable
CREATE TABLE "TempMapRow" (
    "id" SERIAL NOT NULL,
    "tas" DOUBLE PRECISION NOT NULL,
    "ISO3" TEXT NOT NULL,
    "dataSsp" "SSP" NOT NULL,
    "dataModel" "Model" NOT NULL,

    CONSTRAINT "TempMapRow_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TempMapRow" ADD CONSTRAINT "TempMapRow_dataSsp_dataModel_fkey" FOREIGN KEY ("dataSsp", "dataModel") REFERENCES "MapData"("ssp", "model") ON DELETE CASCADE ON UPDATE CASCADE;
