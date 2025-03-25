export interface Company {
    id: number;

    taxCode: string;

    name: string;

    description: string;

    createdAt: Date;

    updatedAt: Date;

    deletedAt: Date;

    representative: string;

    mainBusiness: string;

    address: string;

    issuedAt: Date;

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

    businesses: Business[];
}

interface Business {
    id: number;

    name: string;
}