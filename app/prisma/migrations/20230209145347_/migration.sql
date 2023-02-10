/*
  Warnings:

  - You are about to alter the column `tasmax` on the `TempMaxRow` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "TempMaxRow" ALTER COLUMN "tasmax" SET DATA TYPE DOUBLE PRECISION;
