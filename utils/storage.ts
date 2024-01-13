import {CacheProduct, Contact} from "@/interfaces/supabaseData";

const emptyObj: CacheProduct[] = []
export const setProductsStore = (data: CacheProduct[], id: string | number) => {
  const products = JSON.stringify(data)
  window.localStorage.setItem(`wa_cart_product_${id}`, products)
}

export const getProductsStore = (id: string | number): CacheProduct[] => {
  let result = [];

  if(typeof window === 'undefined') return []

  const products: string | null = window.localStorage.getItem(`wa_cart_product_${id}`)

  if(products) {
    result = JSON.parse(products)
  }

  return result
}

export const clearProductsStore = (id: string | number) => {
  setProductsStore(emptyObj, id)
}

export const addProduct = (product: CacheProduct, id: string | number) => {
  if(product) {
    const products = getProductsStore(id);

    const existProduct = products.find(p => p.id === product.id)

    if(!existProduct) {
      products.push(product)

      setProductsStore(products, id)
    }
  }
}

export const deleteOneProduct = (id: number, idContact: string | number) => {
  const products = getProductsStore(idContact);
  const deleteProducts = products.filter(p => p.id !== id)
  setProductsStore(deleteProducts, idContact)
}

export const getOneProduct = (id: number, idContact: string | number) => {
  const products = getProductsStore(idContact);
  const product = products.find(p => p.id !== id)
  return product
}

export const setOneProduct = (id: number, updatedProduct: CacheProduct, idContact: string | number) => {
  const products = getProductsStore(idContact);
  const updatedProducts = products.map((product) => {
    if (product.id === id) {
      // Si encontramos el producto con el id, lo actualizamos con los nuevos valores
      return { ...product, ...updatedProduct };
    }
    // Si no es el producto que buscamos, lo dejamos sin cambios
    return product;
  });
  setProductsStore(updatedProducts, idContact)
}
