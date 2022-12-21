import {
    View,
    Text,
    TextInput
} from "react-native";

import React, { useState } from 'react';

import DropDownPicker from 'react-native-dropdown-picker';
import { formatNumber } from "../utils/functions"

const styles = {
    label: {
        fontSize: 18,
        marginBottom: 6,
    },
    form: {
        marginTop: 20,
        display: 'flex',
        flexDirection: 'column'
    },
    dropdown: {
        width: "25%",
    },
    input: {
        borderWidth: 1,
        width: "70%",
        borderRadius: 6,
        display: "flex",
        justifyContent: "flex-end",
        textAlign: "right",
        fontSize: 18,
        padding: 12,
        backgroundColor: "white"
    },
    currencySelector: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    }
};

export default function CurrencyForm({ zindex, label, currencies, parentCurrency, setParentCurrency, parentAmount, setParentAmount, editable }) {
    const [open, setOpen] = useState(false);

    return (
        <View style={styles.form} zIndex={zindex}>
            <Text style={styles.label}>{ label }</Text>
            <View style={styles.currencySelector}>
                <View style={styles.dropdown}>
                    <DropDownPicker  
                        open={open}
                        setOpen={setOpen}
                        value={parentCurrency}
                        setValue={setParentCurrency}
                        items={currencies}
                    />
                </View>
                {editable 
                ? <TextInput
                    keyboardType = 'numeric'
                    style={styles.input}
                    onChangeText={setParentAmount}
                    placeholder={parentAmount.toString()}
                    value={parentAmount} />
                : <Text
                    style={styles.input}>
                        {formatNumber(parentCurrency, parentAmount)}
                </Text>}
                
            </View>
        </View>
    )
}