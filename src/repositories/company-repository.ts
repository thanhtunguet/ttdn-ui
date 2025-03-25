import axios from "axios";
import { Company } from "../models/Company";

class CompanyRepository {
    private static instance: CompanyRepository;

    private baseURL = "/api/company";

    private constructor() { }

    public static getInstance(): CompanyRepository {
        if (!CompanyRepository.instance) {
            CompanyRepository.instance = new CompanyRepository();
        }
        return CompanyRepository.instance;
    }

    public async count(): Promise<number> {
        const response = await axios.get(`${this.baseURL}/count`);
        return response.data;
    }

    public async list(skip: number, take: number): Promise<Company[]> {
        const response = await axios.get(`${this.baseURL}/list`, {
            params: { skip, take }
        });
        return response.data;
    }
}

export const companyRepository = CompanyRepository.getInstance();
