/*
  Warnings:

  - Added the required column `weight` to the `RegionWeight` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RegionWeight" ADD COLUMN     "weight" INTEGER NOT NULL;
