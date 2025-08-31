import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@goals';

export const saveGoals = async (goals) => {
  try {
    const jsonValue = JSON.stringify(goals);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
  } catch (e) {
    console.error("Error saving goals:", e);
  }
};

export const loadGoals = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error("Error loading goals:", e);
    return [];
  }
};
