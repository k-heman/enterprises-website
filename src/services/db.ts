import { collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc, query, where, limit } from 'firebase/firestore';
import { db } from '../firebase';

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  images?: string[];
  inStock: boolean;
  specifications?: string;
  brand?: string;
  material?: string;
  size?: string;
  capacity?: string;
};

export type Category = {
  id: string;
  name: string;
};

// CATEGORIES
export const getCategories = async (): Promise<Category[]> => {
  const querySnapshot = await getDocs(collection(db, 'categories'));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as any) } as Category));
};

export const addCategory = async (name: string): Promise<Category> => {
  const docRef = await addDoc(collection(db, 'categories'), { name });
  return { id: docRef.id, name };
};

export const deleteCategory = async (id: string): Promise<void> => {
  await deleteDoc(doc(db, 'categories', id));
};

// PRODUCTS
export const getProducts = async (categoryFilter?: string, resultLimit?: number): Promise<Product[]> => {
  let q = collection(db, 'products') as any;
  
  const constraints = [];
  if (categoryFilter && categoryFilter !== 'All') {
    constraints.push(where('category', '==', categoryFilter));
  }
  if (resultLimit) {
    constraints.push(limit(resultLimit));
  }
  
  if (constraints.length > 0) {
    q = query(q, ...constraints);
  }
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as any) } as Product));
};

export const getProductById = async (id: string): Promise<Product | null> => {
  const docRef = doc(db, 'products', id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...(docSnap.data() as any) } as Product;
  }
  return null;
};

export const addProduct = async (productData: Omit<Product, 'id'>): Promise<Product> => {
  const docRef = await addDoc(collection(db, 'products'), productData);
  return { id: docRef.id, ...productData } as Product;
};

export const updateProduct = async (id: string, productData: Partial<Product>): Promise<void> => {
  const docRef = doc(db, 'products', id);
  await updateDoc(docRef, productData as any);
};

export const deleteProduct = async (id: string): Promise<void> => {
  await deleteDoc(doc(db, 'products', id));
};
