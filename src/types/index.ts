// src/types/index.ts
export interface ProvinceDto {
  id: number;
  code: string;
  name: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  englishName: string;
  slug: string;
}

export interface CompanyDto {
  id: number;
  taxCode: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  representative: string;
  mainBusiness: string;
  address: string;
  issuedAt: string;
  currentStatus: string;
  alternateName: string;
  provinceId: number;
  districtId: number;
  mainBusinessId: number;
  slug: string;
  wardId: number;
  formattedAddress: string;
  provinceName: string;
  districtName: string;
  wardName: string;
  isCrawledFull: boolean;
  companyBusinessMappings: CompanyBusinessMappingDto[];
}

export interface CompanyBusinessMappingDto {
  businessId: number;
  companyId: number;
  company: CompanyDto;
}

export interface PartialJobDto {
  pages: number;
}

export interface PaginationParams {
  skip?: number;
  take?: number;
  provinceId?: number;
}