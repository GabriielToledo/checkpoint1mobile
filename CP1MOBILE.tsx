import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App() {
    return (
        <View style={styles.container}>
            <Text>Open up App.tsx to start working on your app!</Text>
            <StatusBar style="auto" />
        </View>
    );
}


interface CalculatorButtonProps {
    value: string;
    onPress: (value: string) => void;
    isOperator?: boolean;
    isClear?: boolean;
    isEqual?: boolean;
}

const CalculatorButton: React.FC<CalculatorButtonProps> = ({
    value,
    onPress,
    isOperator,
    isClear,
    isEqual,
}) => (
    <TouchableOpacity
        style={[
            styles.button,
            isOperator && styles.operatorButton,
            isClear && styles.clearButton,
            isEqual && styles.equalButton,
        ]}
        onPress={() => onPress(value)}
    >
        <Text style={[styles.buttonText, (isClear || isEqual) && styles.specialButtonText]}>{value}</Text>
    </TouchableOpacity>
);

const App = () => {
    const [displayValue, setDisplayValue] = useState('0');
    const [operator, setOperator] = useState<string | null>(null);
    const [firstOperand, setFirstOperand] = useState<number | null>(null);

    const handleInputChange = (value: string) => {
        if (displayValue === '0' || operator === null) {
            setDisplayValue(value);
        } else {
            setDisplayValue(displayValue + value);
        }
    };

    const handleOperatorInput = (newOperator: string) => {
        if (firstOperand === null) {
            setFirstOperand(parseFloat(displayValue));
        } else if (operator) {
            calculateResult();
        }
        setOperator(newOperator);
        setDisplayValue('0');
    };

    const handleClear = () => {
        setDisplayValue('0');
        setOperator(null);
        setFirstOperand(null);
    };

    const handleEqual = () => {
        calculateResult();
        setOperator(null);
        setFirstOperand(null);
    };

    const calculateResult = () => {
        if (firstOperand !== null && operator) {
            const secondOperand = parseFloat(displayValue);
            let result: number;
            switch (operator) {
                case '+':
                    result = firstOperand + secondOperand;
                    break;
                case '-':
                    result = firstOperand - secondOperand;
                    break;
                case '*':
                    result = firstOperand * secondOperand;
                    break;
                case '/':
                    result = firstOperand / secondOperand;
                    break;
                default:
                    return;
            }
            setDisplayValue(String(result));
            setFirstOperand(result);
        }
    };

    const handleDecimal = () => {
        if (!displayValue.includes('.')) {
            setDisplayValue(displayValue + '.');
        }
    };

    const numbers = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '.'];
    const operators = ['+', '-', '*', '/'];

    return (
        <View style={styles.container}>
            <Text style={styles.display}>{displayValue}</Text>
            <View style={styles.buttonsContainer}>
                <View style={styles.row}>
                    <CalculatorButton value="C" onPress={handleClear} isClear />
                    <CalculatorButton value="+/-" onPress={() => setDisplayValue(String(parseFloat(displayValue) * -1))} />
                    <CalculatorButton value="%" onPress={() => setDisplayValue(String(parseFloat(displayValue) / 100))} />
                    <CalculatorButton value="/" onPress={handleOperatorInput} isOperator />
                </View>
                <View style={styles.row}>
                    {numbers.slice(0, 3).map((num) => (
                        <CalculatorButton key={num} value={num} onPress={handleInputChange} />
                    ))}
                    <CalculatorButton value="*" onPress={handleOperatorInput} isOperator />
                </View>
                <View style={styles.row}>
                    {numbers.slice(3, 6).map((num) => (
                        <CalculatorButton key={num} value={num} onPress={handleInputChange} />
                    ))}
                    <CalculatorButton value="-" onPress={handleOperatorInput} isOperator />
                </View>
                <View style={styles.row}>
                    {numbers.slice(6, 9).map((num) => (
                        <CalculatorButton key={num} value={num} onPress={handleInputChange} />
                    ))}
                    <CalculatorButton value="+" onPress={handleOperatorInput} isOperator />
                </View>
                <View style={styles.row}>
                    <CalculatorButton value="0" onPress={handleInputChange} />
                    <CalculatorButton value="." onPress={handleDecimal} />
                    <CalculatorButton value="=" onPress={handleEqual} isEqual />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        paddingTop: 50,
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    display: {
        fontSize: 48,
        marginBottom: 20,
        width: '100%',
        textAlign: 'right',
        paddingHorizontal: 10,
        backgroundColor: '#e0e0e0',
        borderRadius: 5,
        paddingVertical: 15,
    },
    buttonsContainer: {
        width: '100%',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#dcdcdc',
        borderRadius: 5,
        paddingVertical: 20,
        paddingHorizontal: 30,
        minWidth: 70,
        alignItems: 'center',
        justifyContent: 'center',
    },
    operatorButton: {
        backgroundColor: '#ffa500',
    },
    clearButton: {
        backgroundColor: '#f44336',
    },
    equalButton: {
        backgroundColor: '#4caf50',
        minWidth: 150,
    },
    buttonText: {
        fontSize: 24,
    },
    specialButtonText: {
        color: 'white',
    },
});

export default App;

function contarNotas(valorAlvo: number): { [key: number]: number } | string {
    if (valorAlvo !== 500) {
        return "O valor alvo deve ser exatamente 500 reais.";
    }

    const notasDisponiveis = [50, 20, 10];
    const contagemNotas: { [key: number]: number } = {
        50: 0,
        20: 0,
        10: 0,
    };
    let valorRestante = valorAlvo;

    // Priorizar a nota de maior valor (abordagem gulosa)
    for (const nota of notasDisponiveis) {
        while (valorRestante >= nota) {
            contagemNotas[nota]++;
            valorRestante -= nota;
        }
    }

    // Verificar se o valor foi exatamente atingido
    if (valorRestante === 0) {
        return contagemNotas;
    } else {

        return "Não foi possível atingir 500 reais exatamente com a priorização de notas (50, 20, 10).";
    }
}

// Exemplo de uso:
const resultadoContagem = contarNotas(500);

if (typeof resultadoContagem === 'string') {
    console.log(resultadoContagem);
} else {
    console.log("Contagem de notas para 500 reais:");
    console.log(`Notas de 50: ${resultadoContagem[50]}`);
    console.log(`Notas de 20: ${resultadoContagem[20]}`);
    console.log(`Notas de 10: ${resultadoContagem[10]}`);
}
