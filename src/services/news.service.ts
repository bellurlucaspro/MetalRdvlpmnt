import api from './api.service';

export interface NewsArticle {
    _id?: string;
    id?: string; // For backward compatibility
    title: string;
    slug: string;
    category: string;
    excerpt: string;
    content: string;
    image: string;
    imageAlt: string;
    featured: boolean;
    status: 'published' | 'draft' | 'scheduled';
    views: number;
    author: string;
    badge?: string;
    seo: {
        metaTitle: string;
        metaDescription: string;
        keywords: string[];
    };
    publishedAt?: string;
    createdAt: string;
    updatedAt: string;
    url?: string;
}

export interface NewsResponse {
    success: boolean;
    count: number;
    total: number;
    page: number;
    pages: number;
    data: NewsArticle[];
}

export const newsService = {
    // Get all public news
    async getPublicNews(params: { limit?: number; page?: number; category?: string; featured?: boolean } = {}) {
        const response = await api.get<NewsResponse>('/news', { params });
        return response.data;
    },

    // Get single public news by slug
    async getNewsBySlug(slug: string) {
        const response = await api.get<{ success: boolean; data: NewsArticle }>(`/news/${slug}`);
        return response.data;
    },

    // Get related news
    async getRelatedNews(slug: string) {
        const response = await api.get<{ success: boolean; data: NewsArticle[] }>(`/news/${slug}/related`);
        return response.data;
    },

    // Admin: Get all news
    async getAllNews(params: { limit?: number; page?: number; category?: string; status?: string } = {}) {
        const response = await api.get<NewsResponse>('/news/admin/all', { params });
        return response.data;
    },

    // Admin: Create news
    async createNews(formData: FormData) {
        const response = await api.post<{ success: boolean; data: NewsArticle }>('/news', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    },

    // Admin: Update news
    async updateNews(id: string, formData: FormData) {
        const response = await api.put<{ success: boolean; data: NewsArticle }>(`/news/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    },

    // Admin: Delete news
    async deleteNews(id: string) {
        const response = await api.delete<{ success: boolean; message: string }>(`/news/${id}`);
        return response.data;
    }
};
