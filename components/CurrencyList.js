import {
    View,
    Text,
    ScrollView
} from "react-native";

import { calcTotal, formatNumber } from "../utils/functions";

const styles = {
    container: {
        height: 450,
        marginTop: 40,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: "white"
    },
    header: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
        fontWeight: "bold",
    },
    row: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
        alignItems: "center"
    },
    labels: {
        width: "25%",
    },
    code: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    country: {
        fontSize: 12
    },
    rate: {
        width: "25%",
        textAlign: "right",
        display: "flex",
        alignItems: "flex-end"
    },
    conversion: {
        width: "50%",
        display: "flex",
        alignItems: "flex-end"
    },
    bold: {
        fontWeight: 'bold'
    },
    divider: {
        borderWidth: 1
    }
}

function CurrencyItem({currencies, currency, fromAmount, fromCurrency, isHeader}) {
    return (
        <View style={styles.row}>
            <View style={styles.labels}>
                <Text style={isHeader ? null : styles.code}>{currency.code}</Text>
                {isHeader ? null : <Text style={styles.country}>{currency.country}</Text>}
            </View>
            <View style={styles.rate}>
                {isHeader
                    ? <Text>{currency.rate}</Text>
                    : <Text> { currency.rate.toFixed(2)  }
                </Text>}
            </View>
            <View style={styles.conversion}>
                {isHeader
                ? <Text>{currency.total}</Text>
                : <Text>{formatNumber(currency.code, calcTotal(currencies, fromAmount, fromCurrency, currency.code).toFixed(2))}</Text>}
            </View>
        </View>
    )
}

export default function CurrenyList({ currencies, fromAmount, fromCurrency }) {
    return (
        <View style={styles.container}>
            <CurrencyItem currency={{
                code: "Currency",
                rate: "Rate (CZK)",
                total: "Total"
            }}
            isHeader={true}/>
            <View style={styles.divider} />
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={styles.scrollView}>
                {currencies.map((currency, key) => { 
                    return <CurrencyItem
                    key={key}
                    currencies={currencies}
                    currency={currency}
                    fromAmount={fromAmount}
                    fromCurrency={fromCurrency}/>
                })}
            </ScrollView>
        </View>
   )
}