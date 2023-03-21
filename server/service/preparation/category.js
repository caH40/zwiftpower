import { updateCategorySeries } from './category-series.js';
import { updateCategoryTour } from './category-tour.js';

export async function updateCategoryDB(seriesId, result, categoryCurrent, type) {
	try {
		if (type === 'tour') {
			return await updateCategoryTour(seriesId, result, categoryCurrent, type);
		}
		if (type === 'series') {
			return await updateCategorySeries(seriesId, result, categoryCurrent, type);
		}
	} catch (error) {
		throw error;
	}
}
