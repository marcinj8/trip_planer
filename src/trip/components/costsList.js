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
            <CostsDataStyled editMode={editMode}>
                <span style={{ width: '70%' }}>{cost.description}</span>
                <span style={{ width: '15%', textAlign: 'right' }}>{cost.amount}</span>
                <span style={{ width: '15%' }}>{cost.currency}</span>
            </CostsDataStyled>
            {editMode && <CostsButtonsStyled>
                <Button
                    variant='icon'
                    icon='editButton'
                    show={editMode}
                    clicked={() => showTripEditor(
                        [
                            ['description', cost.description],
                            ['amount', cost.amount],
                            ['currency', cost.currency]
                        ], 'koszt', [id, i,])}
                >edytuj</Button>
                <Button
                    variant='icon'
                    icon='deleteButton'
                    show={editMode}
                    clicked={() => deleteCost(id, i, cost.description, costs.length)}
                >usuń</Button>
            </CostsButtonsStyled>}
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
                clicked={() => showTripEditor(
                    [
                        ['description', '', 'opis'],
                        ['amount', 0, 'kwota'],
                        ['currency', 'PLN', 'waluta']
                    ], 'koszt', [id, costs.length,])}
            >dodaj koszt</Button>
        </CostContainerStyled>
    )
}

export default CostList;