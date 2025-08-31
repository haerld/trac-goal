import { Stack, useLocalSearchParams, router } from "expo-router";
import { useEffect, useState } from "react";
import { View, ScrollView, TouchableOpacity, Modal } from "react-native";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { loadGoals, saveGoals } from "../storage/goalsStorage";
import { Calendar } from "lucide-react-native";
import moment from "moment";
import DateTimePicker, { useDefaultClassNames } from "react-native-ui-datepicker";
import { Label } from "@/components/ui/label";
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'react-native';


export default function GoalDetails() {
  const [proofImage, setProofImage] = useState<string | null>(goal?.proofImage || null);
  const { id } = useLocalSearchParams();
  const [goal, setGoal] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const defaultClassNames = useDefaultClassNames();
  const [proofModalVisible, setProofModalVisible] = useState(false);

  useEffect(() => {
    const fetchGoal = async () => {
      const storedGoals = await loadGoals();
      const found = storedGoals.find((g: any) => g.id === id);
      setGoal(found);
      setSelectedDate(found.deadline);
    };
    fetchGoal();
  }, [id]);

  if (!goal) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Loading...</Text>
      </View>
    );
  }

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
        alert('Permission denied!');
        return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.8,
    });

    if (!result.canceled) {
        const uri = result.assets[0].uri;
        setProofImage(uri);
        setGoal({ ...goal, proofImage: uri });
    }
  };




  const handleStatusChange = (newStatus: string) => {
    setGoal({ ...goal, status: newStatus });
  };

  const handleChangeTitle = (text: string) => {
    setGoal({ ...goal, title: text });
  };

  const handleChangeDesc = (text: string) => {
    setGoal({ ...goal, desc: text });
  };

  const handleDateChange = (date: string) => {
    setGoal({ ...goal, deadline: date });
  };

  const handleSave = async () => {
  const storedGoals = await loadGoals();
  const updated = storedGoals.map((g: any) =>
    g.id === goal.id ? goal : g
  );
  await saveGoals(updated);

  router.replace("/"); // Back to index and refresh
};

  return (
    <>
      <Stack.Screen
        options={{
          title: "Edit Goal Details",
          headerBackTitle: "Back",
          headerTintColor: "#58C852",
          headerShadowVisible: false,
        }}
      />

      <ScrollView className="flex-1 bg-white dark:bg-neutral-900 p-5">
        
        <Label className="color-[#58C852] mb-1" nativeID="title">Edit Title:</Label>
        <Input
        id="title"
          value={goal.title}
          onChangeText={handleChangeTitle}
          className="mb-4 border-b border-[#58C852] text-black dark:text-white"
        />

        <Label className="color-[#58C852] mb-1" nativeID="desc">Edit Description:</Label>
        <Textarea
          id="desc"
          value={goal.desc}
          onChangeText={handleChangeDesc}
          className="mb-4 border-b border-[#58C852] text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
        />

        <Label className="color-[#58C852] mb-1" nativeID="due date">Edit Due Date:</Label>
        <TouchableOpacity onPress={() => setOpen(true)} activeOpacity={0.8}>
          <View className="flex-row items-center border-b border-[#58C852] py-3">
            <Calendar size={20} color="#58C852" />
            <Text className="ml-2 text-black dark:text-white">
              {selectedDate ? selectedDate : "Select Due Date"}
            </Text>
          </View>
        </TouchableOpacity>

        {open && (
            <View className="mt-4 ">
            <DateTimePicker
            mode="single"
            date={new Date()}
            classNames={{
                ...defaultClassNames 
            }}
            onChange={(params) => {
                setOpen(false);
                const actual = moment(params.date).format("MM/DD/YYYY");
                setSelectedDate(actual);
                handleDateChange(actual);
            }}
            />
          </View>
        )}

        <Text className="font-semibold text-[#58C852] mb-2 mt-5">Status:</Text>
        <Badge
          className={`rounded-[10px] px-3 py-3 w-fit mb-4
            ${goal.status === "Pending" ? "bg-red-500" : ""}
            ${goal.status === "Ongoing" ? "bg-orange-500" : ""}
            ${goal.status === "Done" ? "bg-green-500" : ""}`}
        >
          <Text className="text-black dark:text-white">{goal.status}</Text>
        </Badge>
        <View className="flex-row justify-center gap-3 mb-10 w-full">
          <TouchableOpacity
            onPress={() => handleStatusChange("Pending")}
            className="px-4 py-2 rounded-xl border-2 border-red-500"
          >
            <Text className="text-black dark:text-white">Pending</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleStatusChange("Ongoing")}
            className="px-4 py-2 rounded-xl border-2 border-orange-500"
          >
            <Text className="text-black dark:text-white ">Ongoing</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleStatusChange("Done")}
            className="px-4 py-2 rounded-xl border-2 border-green-500"
          >
            <Text className="text-black dark:text-white">Done</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
            className="w-full bg-transparent items-center mb-4"
            onPress={pickImage}
        >
            <Text className="text-[#58C852] font-bold">+ Add Proof</Text>
        </TouchableOpacity>

        {/* Show selected proof image */}
        {proofImage && (
        <Image
            source={{ uri: proofImage }}
            style={{ width: 150, height: 150, borderRadius: 10, marginBottom: 20 }}
        />
        )}

        {/* Display attached proof image if available */}
        {goal.proofImage && (
        <View className="items-center mb-6">
            <Text className="text-[#58C852] mb-2 font-semibold">Attached Proof</Text>
            <TouchableOpacity onPress={() => setProofModalVisible(true)}>
            <Image
                source={{ uri: goal.proofImage }}
                style={{
                width: 200,
                height: 200,
                borderRadius: 10,
                borderWidth: 2,
                borderColor: '#58C852',
                }}
                resizeMode="cover"
            />
            </TouchableOpacity>
        </View>
        )}

        {proofModalVisible && (
        <Modal
            transparent={true}
            animationType="fade"
            visible={proofModalVisible}
            onRequestClose={() => setProofModalVisible(false)}
        >
            <View className="flex-1 bg-black bg-opacity-90 items-center justify-center">
            <TouchableOpacity
                className="absolute top-10 right-5"
                onPress={() => setProofModalVisible(false)}
            >
                <Text className="text-white text-lg font-bold mt-8">Close</Text>
            </TouchableOpacity>

            <Image
                source={{ uri: goal.proofImage }}
                style={{ width: '90%', height: '70%', borderRadius: 12 }}
                resizeMode="contain"
            />
            </View>
        </Modal>
        )}
        
      </ScrollView>

      <View className="p-5 bg-white dark:bg-neutral-900">
        <Button
          className="bg-[#58C852] rounded-lg w-full h-12 mb-5"
          onPress={handleSave}
        >
          <Text className="text-white font-bold">Save</Text>
        </Button>
      </View>
    </>
  );
}
