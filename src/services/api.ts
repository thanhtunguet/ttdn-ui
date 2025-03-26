// src/services/api.ts
import axios from 'axios';
import { CompanyDto, PartialJobDto, ProvinceDto, PaginationParams } from '../types';

const api = axios.create({
  baseURL: 'https://ttdn.supa.vn',
});

export const companyApi = {
  list: async (params: PaginationParams) => {
    const response = await api.get<CompanyDto[]>('/api/company/list', { params });
    return response.data;
  },
  
  count: async (params: PaginationParams) => {
    const response = await api.get<number>('/api/company/count', { params });
    return response.data;
  },
  
  getDetails: async (idOrTaxCode: string) => {
    const response = await api.get<CompanyDto>(`/api/company/${idOrTaxCode}`);
    return response.data;
  },
};

export const provinceApi = {
  list: async (params?: Pick<PaginationParams, 'skip' | 'take'>) => {
    const response = await api.get<ProvinceDto[]>('/api/area/list-provinces', { params });
    return response.data;
  },
  
  count: async () => {
    const response = await api.get<number>('/api/area/count-provinces');
    return response.data;
  },
};

export const crawlerApi = {
  triggerFullCrawl: async () => {
    return api.post('/api/crawler/full');
  },
  
  triggerProvinceCrawl: async (province: string) => {
    return api.post(`/api/crawler/province/${province}`);
  },
  
  triggerPageCrawl: async () => {
    return api.post('/api/crawler/page');
  },
  
  triggerDetailCrawlFull: async () => {
    return api.post('/api/crawler/detail-all');
  },
  
  triggerDetailCrawl: async (companyUrl: string) => {
    return api.get(`/api/crawler/detail/${companyUrl}`);
  },
  
  getJobStatus: async (jobId: string) => {
    return api.get(`/api/crawler/status/${jobId}`);
  },
  
  triggerPartialCrawl: async (data: PartialJobDto) => {
    return api.post('/api/crawler/partial-all', data);
  },
};