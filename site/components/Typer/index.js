import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';

import './style.css';

function TyperButton({type, onClick}) {
    return (
        <ButtonBase classes={{root: 'btn custom-btn typer-button'}} onClick={onClick}>
            <span>
                {type.img && <img src={type.img} title={type.name} alt={type.name} />}
            </span>
            <span>
                <span className="typer-button__size">{type.size} oz</span>
                {type.name}
            </span>
        </ButtonBase>
    );
};

function Typer({currentType, types, add2Queue, onChange}) {
    const typeItem = types[currentType];
    return (
        <div className="typer">
            <div className="typer_top">
                <div className="typer__info">
                    <div className="typer__info__img">
                        {typeItem.img && <img src={typeItem.img} title={typeItem.name} alt={typeItem.name} />}
                    </div>
                    <div>
                        Subscription price: <b>${typeItem.price}</b>
                        <br />
                        Size: <b>{typeItem.size} oz</b>
                    </div>
                </div>
                <Button classes={{root: 'btn shipping-btn'}} onClick={e => add2Queue()}>add to queue</Button>
            </div>
            <div className="typer__types">
                {types.map((it, index) => {
                    return <TyperButton type={it} onClick={e => onChange(e, it)} key={index} />
                })}
            </div>
        </div>
    );
};

export default Typer;
