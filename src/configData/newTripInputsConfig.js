import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../shared/components/input/validators';

export const NEW_TRIP_INPUT_DATA = [
    {
        variant:'secondary',
        label:'nazwa wycieczki',
        inputId:'title',
        type:'text',
        errorMessage:'wpisz nazwę',
        validators:[VALIDATOR_REQUIRE()]
    },
    {
        variant:'secondary',
        label:'opis',
        inputId:'description',
        type:'text',
        errorMessage:'uzupełnij opis',
        validators:[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]
    },
    {
        variant:'secondary',
        label:'adres począkowy',
        inputId:'startPoint',
        type:'text',
        errorMessage:'wpisz adres',
        validators:[VALIDATOR_REQUIRE()]
    },
    {
        variant:'secondary',
        label:'adres wycieczki',
        inputId:'address',
        type:'text',
        errorMessage:'wpisz adres',
        validators:[VALIDATOR_REQUIRE()]
    },
    {
        variant:'secondary',
        label:'budżet',
        inputId:'budget',
        type:'number',
        errorMessage:'podaj budżet w zł',
        validators:[VALIDATOR_REQUIRE()]
    },
    // {
    //     variant:'secondary',
    //     mode: 'multiple',
    //     config: [],
    //     label:'cost',
    //     inputId:'image',
    //     type:'file',
    //     errorMessage:'wybierz zdjęcie',
    //     validators:[VALIDATOR_REQUIRE()]
    // }
]