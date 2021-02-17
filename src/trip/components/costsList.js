import React from 'react';
import { Button } from '../../shared/components';

import {
    CostsListStyled,
    CostStyled,
    CostsDataStyled,
    CostContainerStyled,
    CostsButtonsStyled
} from './tripComponentStyle.scss';

const CostList = ({ costs, id, costListConfigStyled, showTripEditor, editMode, deleteCost }) => {

    let costsList = costs.map((cost, i) => (
        <CostStyled
            key={id + i}
        >
            <CostsDataStyled>
                <span style={{ width: '70%' }}>{cost.description}</span>
                <span style={{ width: '15%', textAlign: 'right' }}>{cost.amount}</span>
                <span style={{ width: '15%' }}>{cost.currency}</span>
            </CostsDataStyled>
            <CostsButtonsStyled>
                <Button
                    show={editMode}
                    clicked={() => showTripEditor([cost.description, cost.amount, cost.currency], 'koszt', [id, i, 'description', 'amount', 'currency'])}
                >edytuj</Button>
                <Button
                    show={editMode}
                    clicked={() => deleteCost(id, i, cost.description, costs.length)}
                >usuń</Button>
            </CostsButtonsStyled>
        </CostStyled>
    ))

    return (
        <CostContainerStyled configStyled={costListConfigStyled}>
            <h3>koszty</h3>
            {
                costs.length === 0
                    ? <h4>brak dodanych kosztów</h4>
                    : (
                        <CostsListStyled editMode={editMode} configStyled={costListConfigStyled}>
                            {costsList}
                        </CostsListStyled>
                    )
            }
            <Button
                show={editMode}
                clicked={() => showTripEditor(['', 1, 'PLN'], 'koszt', [id, costs.length, 'description', 'amount', 'currency'])}
            >dodaj koszt</Button>
        </CostContainerStyled>
    )
}

export default CostList;