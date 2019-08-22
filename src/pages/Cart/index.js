import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    MdRemoveCircleOutline,
    MdAddCircleOutline,
    MdDelete,
} from 'react-icons/md'; /*icone de aumentar e diminuir produto*/

import * as CartActions from '../../Store/modules/cart/action';

import { formatPrice } from '../../Util/format';

import { Container, ProductTable, Total } from './styles';

export default function Cart() {
    const total = useSelector(state =>
        formatPrice(
            state.cart.reduce((totalSum, product) => {
                return totalSum + product.price * product.amount;
            }, 0)
        )
    );

    const cart = useSelector(state =>
        state.cart.map(product => ({
            ...product,
            subTotal: formatPrice(product.price * product.amount),
        }))
    );

    const dispatch = useDispatch();

    function decrement(product) {
        dispatch(
            CartActions.updateAmountRequest(product.id, product.amount - 1)
        );
    }
    function increment(product) {
        dispatch(
            CartActions.updateAmountRequest(product.id, product.amount + 1)
        );
    }

    return (
        <Container>
            <ProductTable>
                <thead>
                    <tr>
                        <th />
                        <th>Produto</th>
                        <th>QTD</th>
                        <th>SubTotal</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {cart.map(product => (
                        <tr>
                            <td>
                                <img src={product.image} alt={product.title} />
                            </td>
                            <td>
                                <strong>{product.title}</strong>
                                <span>{product.priceFormatted}</span>
                            </td>
                            <td>
                                <div>
                                    <button
                                        type="button"
                                        onClick={() => decrement(product)}
                                    >
                                        <MdRemoveCircleOutline
                                            size={20}
                                            color="#7159c1"
                                        />
                                    </button>
                                    <input
                                        type="number"
                                        readyOnly
                                        value={product.amount}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => increment(product)}
                                    >
                                        <MdAddCircleOutline
                                            size={20}
                                            color="#7159c1"
                                        />
                                    </button>
                                </div>
                            </td>
                            <td>
                                <strong>{product.subTotal}</strong>
                            </td>
                            <td>
                                <button
                                    type="button"
                                    onClick={() =>
                                        dispatch(
                                            CartActions.removeFromCart(
                                                product.id
                                            )
                                        )
                                    }
                                >
                                    <MdDelete size={20} color="#7159c1" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </ProductTable>

            <footer>
                {' '}
                <button type="button">Finalizar Pedido</button>
                <Total>
                    <span>TOTAL </span>
                    <strong>{total}</strong>
                </Total>
            </footer>
        </Container>
    );
}
