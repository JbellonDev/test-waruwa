export interface Contact {
  id: number
  id_contact: number
  identificacion: string
  name: string
  mobile?: string | null
  principal_phone?: string | null
  secondary_phone?: string | null
  payment_term_days?: string | null
  price_list_id: number
  created_at?: Date
}

export interface Product {
  id_alegra: number
  name: string
  reference: string
  price: number
}

export interface AlegraDataToSendProduct {
  id: number
  quantity: number
  description: string
  observation: string
  price: number
}

export interface CacheProduct extends AlegraDataToSendProduct {
  name: string
}