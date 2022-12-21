import {
    View,
    Text,
    ActivityIndicator
} from "react-native";

import React, { Component, useEffect, useState } from 'react';
import { Dimensions } from 'react-native';

import { readRemoteFile } from "react-native-csv";
import CurrencyForm from "../components/CurrencyForm";
import CurrenyList from "../components/CurrencyList";
import { calcTotal, getCurrency } from "../utils/functions";
import { Currency } from "../models/Currency";

const URL = "https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt"

const deviceHeight = Dimensions.get('screen').height
const styles = {
    header: {
        marginTop: 18,
        textAlign: "center",
        fontSize: 32,
        fontWeight: "200",
    },
    parentContainer: {
        marginHorizontal: 20,
        height: deviceHeight,
        justifyContent: 'flex-start',
    },
    container: {
        backgroundColor: "#fff"
    },
    loader: {
        flex:1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff"
    },
    list: {
        paddingVertical: 4,
        margin: 5,
        backgroundColor: "#fff"
    },
    placeholderStyles: {
        color: "grey",
    },
    dropdown: {
        width: "25%",
    },
    input: {
        borderWidth: 1,
        width: "75%"
    },
    currencySelector: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%'
    }
};

const ConverterView = (props) => {
    const {dataSource, loading } = props

    const [fromCurrency, setFromCurrency] = useState("CZK");
    const [fromAmount, setFromAmount] = useState(100);
    const [toCurrency, setToCurrency] = useState("USD");
    const [toAmount, setToAmount] = useState(0);

    useEffect(() => {        
        const result = calcTotal(dataSource, fromAmount, fromCurrency, toCurrency)
        setToAmount(result)
    }, [fromAmount, fromCurrency, toCurrency])

    return (
        <View style={styles.parentContainer}>
            <Text style={styles.header}> Currency Converter </Text>
            <CurrencyForm 
                zindex={3}
                label={"From"}
                currencies={dataSource.map((currency) => {
                    return {
                        value: currency.code,
                        label: currency.code
                    }      
                })}
                parentCurrency={fromCurrency}
                setParentCurrency={setFromCurrency}
                parentAmount={fromAmount}
                setParentAmount={setFromAmount}
                editable={true}
            />
            <CurrencyForm 
                zindex={2}
                label={"To"}
                currencies={dataSource.map((currency) => {
                    return {
                        value: currency.code,
                        label: currency.code
                    }      
                })}
                parentCurrency={toCurrency}
                setParentCurrency={setToCurrency}
                parentAmount={toAmount}
                setParentAmount={setToAmount}
                editable={false}
            />
            <CurrenyList
                currencies={dataSource}
                fromAmount={fromAmount}
                fromCurrency={fromCurrency}

                />
        </View>
    )
}

class CurrencyConverter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            dataSource: []
        };
    }

    componentDidMount() {
        this.fetch()
    }

    fetch = () => {
        this.setState({
            loading: true,
        })
        readRemoteFile(URL, {
            complete: (results) => {
              const mapValues = results.data
              .filter(x => x.length > 4 && x[0] != "Country")
              .map(x => getCurrency(x))

              mapValues.push(new Currency("Czech Republic", "Korona", 1, "CZK", 1))
              mapValues.sort((x, y) => x.code.localeCompare(y.code) )

              this.setState({
                loading: false,
                dataSource: mapValues
              })
            }
          });
    }

    render() {
        const { dataSource, loading } = this.state
        return (
            loading ? <ActivityIndicator /> :
            <ConverterView
                dataSource={dataSource}
                loading={loading}
                FlatListSeparator={this.FlatListSeparator}
                renderItem={this.renderItem}
            />
        );
    }
}

export default CurrencyConverter;