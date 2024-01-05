'use client';

import { ShoppingCartIcon } from '@heroicons/react/24/outline';
// import Price from '@/components/price';
import {useEffect, useRef, useState} from 'react';
import EmptyCart from "@/components/Cart/EmptyCart";
import {CacheProduct} from "@/interfaces/supabaseData";
import DeleteItemButton from "@/components/Cart/DeleteItemButton";
import Price from "@/components/Cart/Price";
import {EditItemQuantityButton} from "@/components/Cart/EditButton";
import {getProductsStore} from "@/utils/storage";
// import { EditItemQuantityButton } from './edit-item-quantity-button';

interface  Props {
  products: CacheProduct[]
}

export default function ContentCart({ products }: Props) {
  const [total, setTotal] = useState(0)

  const setQuantity = (item: CacheProduct, qty: number) => {
    item.quantity = qty
  }

  useEffect(() => {
    console.warn('Estoy entrando')
  //   // Open cart modal when quantity changes.
  //   // if (cart?.totalQuantity !== quantityRef.current) {
  //   //   // Always update the quantity reference
  //   //   quantityRef.current = cart?.totalQuantity;
  //   // }
  }, [products]);

  return (
    <>
      <div className="flex h-full w-full flex-col p-6 text-black backdrop-blur-xl">
        {products.length === 0 ? (<EmptyCart />) : (
          <div className="flex h-full flex-col justify-between overflow-hidden p-1">
            <ul className="flex-grow overflow-auto py-4">
              {products.map(item => (
                  <li
                    key={item.id}
                    className="flex w-full flex-col border-b border-neutral-300 dark:border-neutral-700"
                  >
                    <div className="relative flex w-full flex-row justify-between px-1 py-4">
                      <div
                        className="z-30 flex flex-row space-x-4"
                      >
                        <div>
                          <DeleteItemButton id={item.id}/>
                        </div>
                        <div className="flex flex-1 flex-col text-base">
                              <span className="leading-tight">
                                {item.name}
                              </span>
                        </div>
                      </div>
                      <div className="flex h-16 flex-col justify-between">
                        <Price
                          className="flex justify-end space-y-2 text-right text-sm"
                          amount={item.price}
                        />
                        <div className="ml-auto flex h-9 flex-row items-center rounded-full border border-neutral-200 dark:border-neutral-700">
                          <EditItemQuantityButton item={item} type="minus" setQty={setQuantity} />
                          <p className="w-6 text-center">
                            <span className="w-full text-sm">{(item.quantity).toFixed(1)}</span>
                          </p>
                          <EditItemQuantityButton item={item} type="plus" setQty={setQuantity} />
                        </div>
                      </div>
                    </div>
                  </li>
                )
              )}
            </ul>
          {/*  <div className="py-4 text-sm text-neutral-500 dark:text-neutral-400">*/}
          {/*    <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 dark:border-neutral-700">*/}
          {/*      <p>Taxes</p>*/}
          {/*      <Price*/}
          {/*        className="text-right text-base text-black dark:text-white"*/}
          {/*        amount={cart.cost.totalTaxAmount.amount}*/}
          {/*        currencyCode={cart.cost.totalTaxAmount.currencyCode}*/}
          {/*      />*/}
          {/*    </div>*/}
          {/*    <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">*/}
          {/*      <p>Shipping</p>*/}
          {/*      <p className="text-right">Calculated at checkout</p>*/}
          {/*    </div>*/}
          {/*    <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">*/}
          {/*      <p>Total</p>*/}
          {/*      <Price*/}
          {/*        className="text-right text-base text-black dark:text-white"*/}
          {/*        amount={cart.cost.totalAmount.amount}*/}
          {/*        currencyCode={cart.cost.totalAmount.currencyCode}*/}
          {/*      />*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*  <a*/}
          {/*    href={cart.checkoutUrl}*/}
          {/*    className="block w-full rounded-full bg-blue-600 p-3 text-center text-sm font-medium text-white opacity-90 hover:opacity-100"*/}
          {/*  >*/}
          {/*    Proceed to Checkout*/}
          {/*  </a>*/}
          </div>
        )}
      </div>
    </>
  );
}
