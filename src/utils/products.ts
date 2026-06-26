import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'yaml';
import type { Product } from '../types';
import { getCategoryById } from './categories';

const PRODUCTS_DIR = join(process.cwd(), 'src/data/products');

function loadProductFile(filename: string): Product[] {
  const source = readFileSync(join(PRODUCTS_DIR, filename), 'utf-8');
  return parse(source) as Product[];
}

function validateProduct(product: Product, sourceFile: string): void {
  const category = getCategoryById(product.category);
  if (!category) {
    throw new Error(
      `[${sourceFile}] Product "${product.id}": unknown category "${product.category}"`,
    );
  }

  const subcategory = category.subcategories.find((item) => item.id === product.subcategory);
  if (!subcategory) {
    throw new Error(
      `[${sourceFile}] Product "${product.id}": unknown subcategory "${product.subcategory}" in category "${product.category}"`,
    );
  }
}

export function getAllProducts(): Product[] {
  const files = readdirSync(PRODUCTS_DIR).filter((file) => file.endsWith('.yaml'));

  return files.flatMap((file) => {
    const products = loadProductFile(file);
    products.forEach((product) => validateProduct(product, file));
    return products;
  });
}

export function getProductById(id: string): Product | undefined {
  return getAllProducts().find((product) => product.id === id);
}

export function getProductsByCategory(categoryId: string): Product[] {
  return getAllProducts().filter((product) => product.category === categoryId);
}

export function getProductsBySubcategory(
  categoryId: string,
  subcategoryId: string,
): Product[] {
  return getAllProducts().filter(
    (product) => product.category === categoryId && product.subcategory === subcategoryId,
  );
}

export function getPopularProducts(limit = 4): Product[] {
  return getAllProducts()
    .filter((product) => product.popular)
    .slice(0, limit);
}

export function filterInStock(products: Product[], inStockOnly: boolean): Product[] {
  if (!inStockOnly) return products;
  return products.filter((product) => product.inStock);
}

export function getAllProductIds(): string[] {
  return getAllProducts().map((product) => product.id);
}

export function countProductsInCategory(categoryId: string): number {
  return getProductsByCategory(categoryId).length;
}

export function countProductsInSubcategory(categoryId: string, subcategoryId: string): number {
  return getProductsBySubcategory(categoryId, subcategoryId).length;
}

export function countInStock(products: Product[]): number {
  return products.filter((product) => product.inStock).length;
}
