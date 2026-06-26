import type { CategoriesData, Category, Subcategory } from '../types';
import { loadYaml } from './loadYaml';

export function getCategoriesData(): CategoriesData {
  return loadYaml<CategoriesData>('categories.yaml');
}

export function getCategories(): Category[] {
  return getCategoriesData().categories;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return getCategories().find((category) => category.slug === slug);
}

export function getCategoryById(id: string): Category | undefined {
  return getCategories().find((category) => category.id === id);
}

export function getSubcategory(
  categorySlug: string,
  subcategorySlug: string,
): { category: Category; subcategory: Subcategory } | undefined {
  const category = getCategoryBySlug(categorySlug);
  if (!category) return undefined;

  const subcategory = category.subcategories.find((item) => item.slug === subcategorySlug);
  if (!subcategory) return undefined;

  return { category, subcategory };
}

export function getAllCategorySlugs(): string[] {
  return getCategories().map((category) => category.slug);
}

export function getAllSubcategoryPaths(): Array<{ category: string; subcategory: string }> {
  return getCategories().flatMap((category) =>
    category.subcategories.map((subcategory) => ({
      category: category.slug,
      subcategory: subcategory.slug,
    })),
  );
}
