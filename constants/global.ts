export const MIN_QUANTITY = 0.5
export const VALUE_TO_SUM_SUBTRACT = 0.5

export const urlToRedirect = 'https://wa.me/573203599924'

export const STATUS_PAGE = {
  DONE: 1,
  ERROR: 3,
  INIT: 0
}

export const DONE_CARD_INFO = {
  description: "Se ha creado tu pedido con el Número de Orden",
  status: STATUS_PAGE.DONE,
  icon: '/checkIcon.png',
  remissionNumber: ''
}

export const ERROR_CARD_INFO = {
  description: "Ha ocurrido un error cuando intentamos traer los datos",
  status: STATUS_PAGE.ERROR,
  icon: '/error.png',
  title: 'Oh no!',
  button: 'Contáctanos',
  goTo: '#'
}