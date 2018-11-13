import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Rate from '../Rate';
import Tabs from '../Tabs';
import Typer from '../Typer';
import {add2Queue} from '../../actions';
import './style.css';

function TopInfo({name, firm, type, rate, onChangeRate, reviews}) {
    return (
        <div className="main-info">
            <div className="main-info__name">{name}</div>
            <div className="main-info__firm">{firm}</div>
            <div className="main-info__type">{type}</div>
            <Rate rate={rate} reviews={reviews} onChangeRate={onChangeRate} />
        </div>
    );
};

function mapStateToProps({product: {items}}) {
    return {
        items
    }
};

function mapDispatchToProps(dispatch) {
    return {
        onChangeRate(val) {
            console.log(val);
        },
        add2Queue(item) {
            dispatch(add2Queue(item));
        }
    };
};

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
class Product extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {type: 0, descriptionView: 'less', tab: 0, product: props.items[props.match.params.id]};
        this.changeProductType = this.changeProductType.bind(this);
        this.toggleDescriptionView = this.toggleDescriptionView.bind(this);
        this.changeTabs = this.changeTabs.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        if (state.product.id != props.match.params.id) {
            state.type = 0;
            state.tab = 0;
            state.product = props.items[props.match.params.id];
            return state;
        }
        return null;
    }

    changeProductType(event, type) {
        this.setState(state => {
            return {type: state.product.types.indexOf(type)};
        });
    }

    toggleDescriptionView() {
        this.setState(state => {
            return {descriptionView : state.descriptionView == 'more' ? 'less' : 'more'};
        });
    }

    changeTabs(event, value) {
        this.setState({tab: value});
    }

    render() {
        let {
            id,
            name,
            firm,
            type,
            rate,
            reviews,
            forWho,
            description,
            hiw,
            ingredients
        } = this.state.product;

        return (
            <div className="product">
                <div className="product_image">
                    <img src={`/img/img${id}.jpg`} title={name} alt={name} />
                    <div className={'product_image__for ' + forWho}></div>
                </div>
                <TopInfo name={name} firm={firm} type={type} rate={rate} onChangeRate={(e, val) => this.props.onChangeRate(val)} reviews={reviews} />
                <div className="product__info">
                    <Typer onChange={this.changeProductType} types={this.state.product.types} currentType={this.state.type}
                           add2Queue={() => this.props.add2Queue({id: this.state.product.id, itemType: this.state.type})} />
                    <div className="description">
                        <h3>Description</h3>
                        {this.state.descriptionView == 'more' ? description : description.substr(0, 100)}
                        {description.length > 100 && <a href="javascript:void(0)" className="show-more" onClick={this.toggleDescriptionView}>{this.state.descriptionView == 'more' ? '< Show less' : 'Read more >'}</a>}
                    </div>
                    <Tabs items={[
                        {label: 'how it works', text: hiw},
                        {label: 'ingredients', text: ingredients}
                    ]} tab={this.state.tab} onChange={this.changeTabs} />
                </div>
            </div>
        );
    }
};

export default Product;