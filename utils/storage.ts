import {CacheProduct, Contact} from "@/interfaces/supabaseData";

const emptyObj: CacheProduct[] = []
export const setProductsStore = (data: CacheProduct[]) => {
  const products = JSON.stringify(data)
  window.localStorage.setItem('wa_cart_product', products)
}

export const getProductsStore = (): CacheProduct[] => {
  let result = [];

  if(typeof window === 'undefined') return []

  const products: string | null = window.localStorage.getItem('wa_cart_product')

  if(products) {
    result = JSON.parse(products)
  }

  return result
}

export const clearProductsStore = () => {
  setProductsStore(emptyObj)
}

export const addProduct = (product: CacheProduct) => {
  if(product) {
    const products = getProductsStore();

    const existProduct = products.find(p => p.id === product.id)

    if(!existProduct) {
      products.push(product)

      setProductsStore(products)
    }
  }
}

export const deleteOneProduct = (id: number) => {
  const products = getProductsStore();
  const deleteProducts = products.filter(p => p.id !== id)
  setProductsStore(deleteProducts)
}

export const getOneProduct = (id: number) => {
  const products = getProductsStore();
  const product = products.find(p => p.id !== id)
  return product
}

export const setOneProduct = (id: number, updatedProduct: CacheProduct) => {
  const products = getProductsStore();
  const updatedProducts = products.map((product) => {
    if (product.id === id) {
      // Si encontramos el producto con el id, lo actualizamos con los nuevos valores
      return { ...product, ...updatedProduct };
    }
    // Si no es el producto que buscamos, lo dejamos sin cambios
    return product;
  });
  setProductsStore(updatedProducts)
}

/*
* Aqui estara la logica del store del contact
* */
const emptyContect: Contact = {
  id: -1,
  id_contact: -1,
  name: '',
  identificacion: '',
  price_list_id: -1,
}
export const setContactStore = (data: Contact) => {
  const user = JSON.stringify(data)
  window.localStorage.setItem('wa_client', user)
}

export const getContactStore = () => {
  let result = emptyContect;
  const contact: string | null = window.localStorage.getItem('wa_client')

  if(contact) {
    result = JSON.parse(contact)
  }

  return result
}

export const clearContactStore = () => {
  setContactStore(emptyContect)
}
