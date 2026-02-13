import api from './api.service';

export interface Realisation {
    _id?: string;
    id?: string;
    title: string;
    slug: string;
    category: string;
    location: string;
    year: string;
    surface: string;
    description: string;
    client?: string;
    duration?: string;
    budget?: string;
    status: 'completed' | 'ongoing' | 'planned';
    mainImage: string;
    imageAlt: string;
    gallery: Array<{
        url: string;
        alt: string;
        caption?: string;
        _id?: string;
    }>;
    challenges: string[];
    solutions: string[];
    seo: {
        metaTitle: string;
        metaDescription: string;
        keywords: string[];
    };
    createdAt: string;
    updatedAt: string;
    url?: string;
}

export interface RealisationResponse {
    success: boolean;
    count: number;
    total: number;
    page: number;
    pages: number;
    data: Realisation[];
}

export const realisationsService = {
    // Get all public realisations
    async getPublicRealisations(params: { limit?: number; page?: number; category?: string; status?: string } = {}) {
        const response = await api.get<RealisationResponse>('/realisations', { params });
        return response.data;
    },

    // Get single public realisation by slug
    async getRealisationBySlug(slug: string) {
        const response = await api.get<{ success: boolean; data: Realisation }>(`/realisations/${slug}`);
        return response.data;
    },

    // Admin: Get all realisations
    async getAllRealisations(params: { limit?: number; page?: number; category?: string; status?: string } = {}) {
        const response = await api.get<RealisationResponse>('/realisations/admin/all', { params });
        return response.data;
    },

    // Admin: Create realisation
    async createRealisation(formData: FormData) {
        const response = await api.post<{ success: boolean; data: Realisation }>('/realisations', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    },

    // Admin: Update realisation
    async updateRealisation(id: string, formData: FormData) {
        const response = await api.put<{ success: boolean; data: Realisation }>(`/realisations/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    },

    // Admin: Delete realisation
    async deleteRealisation(id: string) {
        const response = await api.delete<{ success: boolean; message: string }>(`/realisations/${id}`);
        return response.data;
    },

    // Admin: Upload gallery image
    async uploadGalleryImage(id: string, formData: FormData) {
        const response = await api.post<{ success: boolean; data: any }>(`/realisations/${id}/gallery`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    },

    // Admin: Delete gallery image
    async deleteGalleryImage(id: string, imageId: string) {
        const response = await api.delete<{ success: boolean; message: string }>(`/realisations/${id}/gallery/${imageId}`);
        return response.data;
    }
};
