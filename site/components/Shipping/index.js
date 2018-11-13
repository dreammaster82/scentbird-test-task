import React from 'react';
import ReactDOM from 'react-dom';
import {withRouter} from "react-router-dom";
import {connect} from 'react-redux';
import { Form, Field, FormSection, reduxForm } from 'redux-form';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';

let FormText = ({input, label, meta: { touched, error, invalid }, ...custom}) => {
    return (
        <TextField
            label={label}
            error={invalid}
            variant="outlined"
            classes={{root: 'form-control-root ' + custom.className}}
            InputLabelProps={{classes: {root: 'label-field', focused: 'label-field-focused'}}}
            InputProps={{classes: {root: 'input-props', input: 'input-props__input', focused: 'input-props__focused', disabled: 'input-props__disabled'}}}
            helperText={error}
            {...input}
            {...custom}
        />
    );
};

class Selector extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {labelWidth: 0};
    }

    componentDidMount() {
        this.setState({
            labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
        });
    }

    render() {
        return (
            <FormControl variant="outlined" classes={{root: 'form-control-root'}} error={this.props.meta.invalid}>
                <InputLabel
                    ref={ref => {
                        this.InputLabelRef = ref;
                    }}
                    htmlFor={'outlined-selector-' + this.props.name}
                    classes={{root: 'label-field', focused: 'label-field-focused'}}
                >
                    {this.props.label}
                </InputLabel>
                <Select
                    value={this.props.input.value}
                    onChange={this.props.input.onChange}
                    input={
                        <OutlinedInput
                            labelWidth={this.state.labelWidth}
                            name={this.props.name}
                            id={'outlined-selector-' + this.props.name}
                            classes={{root: 'form-control__selector', input: 'input-props__input', focused: 'input-props__focused', disabled: 'input-props__disabled'}}
                        />
                    }
                >
                    {this.props.children.map((option, index) => {
                        let {value, children} = option.props;
                        return (
                            <MenuItem value={value || ''} key={index}>{children || <em>None</em>}</MenuItem>
                        );
                    })}
                </Select>
                {this.props.meta.invalid && <FormHelperText>{this.props.meta.error}</FormHelperText>}
            </FormControl>
        );
    }
};

let CheckboxField = ({label, input: {checked, onChange}}) => {
    return (
        <FormControlLabel control={
                              <Checkbox
                                  checked={checked}
                                  onChange={onChange}
                              />
                          }
                          label={label}
        />
    );
};

const required = value => (value ? undefined : 'This field is required');
const onlyLetters = value => (value && /[^A-zА-я]/.test(value) ? 'onlyLetters' : undefined);
const onlySymbols = value => (value && /[^A-zА-я0-9 -]/.test(value) ? 'onlySymbols' : undefined);
const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined;


function FormFields(props) {
    return (
        <FormSection name={props.name} className="form-fields">
            <div className="row">
                <Field name="firstName" component={FormText} label="First name" validate={[required, onlyLetters]}  />
                <Field name="lastName" component={FormText} label="Last name" validate={[required, onlyLetters]} />
            </div>
            <div className="row">
                <Field name="streetAddress" className="big-field" component={FormText} label="Street address" validate={[required, onlySymbols]} />
                <Field name="suite" component={FormText} label="Apt/Suite (Optional)" />
            </div>
            <div className="row">
                <Field name="zip" component={FormText} label="Zip code" validate={[required]} />
                <Field name="city" component={Selector} label="City" validate={[required]}>
                    <option></option>
                    <option value="dust">Dust</option>
                    <option value="kiev">Kiev</option>
                    <option value="new-york">New York</option>
                </Field>
            </div>
            <Field name="country" className="full-width-field" component={FormText} validate={[required]} />
            {!props.short && <div className="row">
                <Field name="phone" component={FormText} label="Mobile number (Optional)" validate={[number]} type="tel" />
                <div className="text-info">We may send you special discounts and offers</div>
            </div>}
        </FormSection>
    )
};

function mapStateToProps({form: {shippingForm}}) {
    return {
        shippingForm
    }
};

@withRouter
@connect(mapStateToProps)
@reduxForm({form:'shippingForm'})
class ShippingForm extends React.PureComponent {
    constructor(props){
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(data) {
        console.log(data);
    }

    render() {
        let useFull = this.props.shippingForm && this.props.shippingForm.values && this.props.shippingForm.values.useFull;
        return (
            <div className="shipping-form">
                <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    <div className="shipping-address">
                        <h3>Shipping address</h3>
                        <FormFields name="shipping" />
                    </div>
                    <Field type="checkbox" component={CheckboxField} name="useFull" label="Use this address as my billing address" style={{marginTop:10}}/>
                    {useFull && <div className="shipping-billing">
                        <h3>Billing address</h3>
                        <FormFields name="billing" short={true} />
                    </div>}
                    <div className="form-fields bottom-form">
                        <ButtonBase onClick={e => this.props.history.goBack()} className="form-button form-button__back">Back</ButtonBase>
                        <Button type="submit" className="btn shipping-btn form-button form-button__buy">Buy now</Button>
                    </div>
                </Form>
            </div>
        );
    }
};

export default ShippingForm;
