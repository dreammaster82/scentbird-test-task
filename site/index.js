import 'babel-polyfill'

import React from 'react'
import {render} from 'react-dom'
import { Provider } from 'react-redux';
import {Link, BrowserRouter as Router, Route} from 'react-router-dom/es';
import { createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import Button from '@material-ui/core/Button';

import reducers from "./reducers";
import Product from './components/Product';
import Shipping from './components/Shipping';

import './style.css';


const store = createStore(combineReducers({product: reducers, form: formReducer}), {
    product: {
        items: [
            {
                id: 0,
                name: 'scentbird',
                firm: 'rose & prosecco',
                type: 'hand cream',
                rate: 4.3,
                reviews: 10,
                forWho: 'mw',
                description: 'Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста рыбы на русском языке, а начинающему оратору отточить навык публичных выступлений в домашних условиях.',
                hiw: 'При создании генератора мы использовали небезизвестный универсальный код речей. Текст генерируется абзацами случайным образом от двух до десяти предложений в абзаце, что позволяет сделать текст более привлекательным и живым для визуально-слухового восприятия.',
                ingredients: 'По своей сути рыбатекст является альтернативой традиционному lorem ipsum, который вызывает у некторых людей недоумение при попытках прочитать рыбу текст.',
                types: [
                    {
                        name: 'Subscription',
                        size: '1.7',
                        price: 14.95,
                        img: '/img/img0.jpg'
                    },
                    {
                        name: 'One-time purchase',
                        size: '1.7',
                        price: 14.96,
                        img: '/img/img0.jpg'
                    },
                    {
                        name: 'One-time purchase',
                        size: '1',
                        price: 13.94,
                        img: '/img/img0.jpg'
                    },
                ]
            }
        ]
    }
});

render(
    <Provider store={store}>
        <Router>
            <section>
                <header>
                    <nav>
                        <ul>
                            <li><Button component={Link} to="/product/0" classes={{root: 'btn custom-btn'}}>Product</Button></li>
                            <li><Button component={Link} to="/profile/shipping" classes={{root: 'btn shipping-btn'}}>Shipping</Button></li>
                        </ul>
                    </nav>
                </header>
                <Route path="/" exact render={() => <div>Выберите элемент</div>} />
                <Route path="/product/:id" exact component={Product} />
                <Route path="/profile/shipping" component={Shipping} />
            </section>
        </Router>
    </Provider>,
    document.getElementById('root')
);