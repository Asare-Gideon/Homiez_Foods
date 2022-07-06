import { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputKeyPressEventData,
  View,
} from "react-native";

interface props {
  length: number;
  label: string;
  loading?: boolean;
  onComplete: (code: string) => void;
}

const InputCode: React.FC<props> = ({ length, label, loading, onComplete }) => {
  const [code, setCode] = useState([...Array(length)].map(() => ""));
  const inputs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    setTimeout(() => {
      if (inputs.current) inputs.current[0]?.focus();
    }, 1000);
  }, []);
  const processInput = (num: string, slot: any) => {
    const newCode = [...code];
    if (/[^0-9]/.test(num)) return;
    newCode[slot] = num;
    setCode(newCode);
    if (slot !== length - 1 && num !== "") {
      (inputs.current[slot + 1] as any).focus();
    }
    if (num === "" && slot - 1 >= 0) {
      (inputs.current[slot - 1] as any).focus();
    }
    if (newCode.every((num) => num !== "")) {
      onComplete(newCode.join(""));
    }
  };

  const handleBackPressed = (e: TextInputKeyPressEventData, slot: number) => {
    if (e.key === "Backspace" && slot - 1 >= 0) {
      (inputs.current[slot - 1] as any).focus();
    }
  };

  return (
    <View style={styles.codeInput}>
      <Text style={styles.codeLabel}>{label}</Text>
      <View style={styles.codeInputs}>
        {code.map((num, idx) => {
          return (
            <TextInput
              key={idx}
              maxLength={1}
              style={styles.codeInputItem}
              keyboardType="number-pad"
              value={num}
              autoFocus={!code[0].length && idx === 0}
              editable={!loading}
              onChangeText={(text) => processInput(text, idx)}
              onKeyPress={({ nativeEvent }) => {
                handleBackPressed(nativeEvent, idx);
              }}
              ref={(ref) => inputs.current.push(ref)}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  codeInput: {
    alignItems: "center",
  },
  codeLabel: {
    marginBottom: 16,
  },
  codeInputs: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  codeInputItem: {
    width: 40,
    height: 60,
    textAlign: "center",
    borderRadius: 10,
    marginHorizontal: 4,
    fontSize: 18,
    borderColor: "#4f5b66",
    borderWidth: 2,
  },
});

export default InputCode;
