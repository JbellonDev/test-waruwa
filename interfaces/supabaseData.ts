export interface Contact {
  id: number
  id_contact: number
  identificacion: string
  name: string
  mobile: string | null | undefined
  principal_phone: string | null | undefined
  secondary_phone: string | null | undefined
  payment_term_days: string | null | undefined
  price_list_id: number
  created_at: Date
}

export interface Product {
  id: number
  id_alegra: number
  name: string
  status: boolean
  reference: string
  unit: string | null | undefined
  price: number | null
  update_at: Date
  created_at: Date
}

export interface ProductPrice {
  id: number
  id_alegra_item: number
  id_price_list: number
  price: number
  created_at: Date
}