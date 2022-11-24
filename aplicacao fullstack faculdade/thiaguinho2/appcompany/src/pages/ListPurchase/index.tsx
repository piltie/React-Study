import { useState, useEffect } from 'react'
import { format } from 'date-fns'

import { Container, Table, Content, LabelStyle } from "./styles";
import { Header } from '../../components/Header'

import api from '../../services/api'

interface IPurchase {
  id: string;
  purchase_date: Date;
  product: string;
  amount: number;
  unitary_value: number;
}

interface IPurchaseList extends IPurchase {
  total_price: number;
  discount: number;
  amount_to_pay: number;
}

export function ListPurchase() {
  const [dataIPurchaseList, setDataIPurchaseList] = useState<IPurchaseList[]>([])
  let dataIPurchase: IPurchase[] = []

  async function loadProvider() {
    const dados = await api.get('/purchase')
      .then(dados => dados.data)
    dataIPurchase = dados
    let totalPrice = 0
    let totalDiscount = 0
    let totalAmountToPay = 0
    setDataIPurchaseList(dataIPurchase.map(data => {
      totalPrice = calculateTotalPrice(data.unitary_value, data.amount)
      totalDiscount = calculateDiscount(totalPrice)
      totalAmountToPay = totalPrice - totalDiscount
      return {
        id: data.id,
        purchase_date: data.purchase_date,
        product: data.product,
        amount: data.amount,
        unitary_value: data.unitary_value,
        total_price: totalPrice,
        discount: totalDiscount,
        amount_to_pay: totalAmountToPay
      }
    }))
  }

  useEffect(() => {
    loadProvider()
  }, [])

  function calculateTotalPrice(unitary_value: number, amount: number) {
    return unitary_value * amount
  }

  function formatValues(value: number) {
    return (value)
      .toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      })
  }

  function calculateDiscount(total_price: number) {
    let discount = 0
    if (total_price < 1000) {
      discount = 0
    } else if (total_price >= 1000 && total_price < 3000) {
      discount = (total_price * 2 / 100)
    } else if (total_price >= 3000 && total_price < 5000) {
      discount = (total_price * 4 / 100)
    } else {
      discount = (total_price * 6 / 100)
    }
    return discount
  }

  function totalPurchase() {
    return dataIPurchaseList
      .reduce((total, value) => total += value.total_price, 0)
  }

  function totalDiscount() {
    return dataIPurchaseList
      .reduce((total, value) => total += value.discount, 0)
  }

  function totalAmountToPay() {
    return dataIPurchaseList
      .reduce((total, value) => total += value.amount_to_pay, 0)
  }

  function formatDate(data: Date) {
    return format(new Date(data), 'dd/MMM/yyyyy')
  }

  return (
    <Container>
      <Header title="Totais" />

      <Content>
        <LabelStyle>Total de Compras: {formatValues(totalPurchase())}</LabelStyle>

        <LabelStyle>Total de Desconto: {formatValues(totalDiscount())}</LabelStyle>

        <LabelStyle>Total do Valor a Pagar: {formatValues(totalAmountToPay())}</LabelStyle>
      </Content>

      <Header title="Listagem de Compras" />
      <Table>
        <thead>
          <tr>
            <th>Data da Compra</th>
            <th>Produto</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Valor Total</th>
            <th>Desconto</th>
            <th>Valor a Pagar</th>
          </tr>
        </thead>
        <tbody>
          {dataIPurchaseList.map(purc => (
            <tr key={purc.id}>
              <td>{formatDate(purc.purchase_date)}</td>
              <td>{purc.product}</td>
              <td>{purc.amount}</td>
              <td>{formatValues(purc.unitary_value)}</td>
              <td>{formatValues(purc.total_price)}</td>
              <td>{formatValues(purc.discount)}</td>
              <td>{formatValues(purc.amount_to_pay)}</td>
            </tr>
          ))}
        </tbody>
      </Table>

    </Container>
  )
}