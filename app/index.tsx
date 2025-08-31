import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { THEME } from '@/lib/theme';
import { Link, router, Stack } from 'expo-router';
import { Calendar, Crown, MoonStarIcon, StarIcon, SunIcon, Trash2 } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Image, type ImageStyle, Modal, Pressable, ScrollView, TextInput, TouchableOpacity, View, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';
import axios from 'axios';
import { saveGoals, loadGoals } from '../storage/goalsStorage';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@rn-primitives/select';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton'
import DateTimePicker, { useDefaultClassNames } from "react-native-ui-datepicker";
import moment from 'moment';
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogClose, DialogTrigger } from '@/components/ui/dialog';

const SCREEN_OPTIONS = {
  light: {
    title: 'TracGoal',
    headerTransparent: true,
    headerShadowVisible: false,
    headerBackVisible: false,
    headerStyle: { backgroundColor: THEME.light.background },
    headerRight: () => <ThemeToggle />,
  },
  dark: {
    title: 'TracGoal',
    headerTransparent: true,
    headerShadowVisible: false,
    headerBackVisible: false,
    headerStyle: { backgroundColor: THEME.dark.background },
    headerRight: () => <ThemeToggle />,
  },
};

const IMAGE_STYLE: ImageStyle = {
  height: 76,
  width: 76,
};

export default function Screen() {
  const { colorScheme } = useColorScheme();
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingGoals, setLoadingGoals] = useState(true);
  const [goals, setGoals] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
    const defaultClassNames = useDefaultClassNames();


  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const status = "Pending";
  const [open, setOpen] = useState(false);

  const fetchQuote = async () => {
    try {
      const response = await axios.get("https://zenquotes.io/api/random");
      const { q, a } = response.data[0];
      console.log(response.data[0])
      setQuote({ text: q, author: a });
    } catch (error) {
      console.error("Error fetching quote:", error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchQuote();
  }, []);

  useEffect(() => {
    const fetchGoals = async () => {
      const storedGoals = await loadGoals();
      setGoals(storedGoals);
      setLoadingGoals(false);
    };
    fetchGoals();
  }, []);

  const handleAddGoal = async () => {
    if (!title.trim()) return;

    const now = new Date();
    const id = `${now.getFullYear()}${(now.getMonth() + 1)
      .toString()
      .padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}_${now
      .getHours()
      .toString()
      .padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}${now
      .getSeconds()
      .toString()
      .padStart(2, '0')}`;
    const deadline = selectedDate;
    const newGoal = {
      id,
      title,
      desc,
      status,
      deadline,
    };

    const updatedGoals = [...goals, newGoal];
    setGoals(updatedGoals);
    await saveGoals(updatedGoals);

    setTitle('');
    setDesc('');
    setSelectedDate('');  };

  const handleDelete = async (id: string) => {
    const updatedGoals = goals.filter((goal) => goal.id !== id);
    setGoals(updatedGoals);
    await saveGoals(updatedGoals);
  };
  
  return (
    <>
      <Stack.Screen options={SCREEN_OPTIONS[colorScheme ?? 'light']} />
      <View className="flex-1 items-center justify-start gap-8 p-4">
   
        <Card className="mt-24 w-[90%] bg-[#58C852] shadow-lg shadow-green-700">
          <CardHeader>
            <CardTitle className="font-black">FOOD FOR THOUGHT</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <>
                <Skeleton className="h-4 w-[80%] rounded mb-2 bg-white/50" />
                <Skeleton className="h-4 w-[60%] rounded bg-white/50" />
              </>
            ) : (
              quote && <Text>"{quote.text}"</Text>
            )}
          </CardContent>
          <CardFooter>
            {loading ? (
              <Skeleton className="h-3 w-[40%] rounded bg-white/50" />
            ) : (
              quote && <Text className="italic">{quote.author}</Text>
            )}
          </CardFooter>
        </Card>
        
        <View className='flex-1 w-[90%] justify-start align-top'>
          <Text variant="h2" className='color-[#58C852]'>CURRENT GOALS</Text>
          
          <ScrollView className="mt-5 w-full">
            {loadingGoals ? (
              <>
                <Skeleton className="h-16 w-full mb-3 rounded-xl" />
                <Skeleton className="h-16 w-full mb-3 rounded-xl" />
              </>
            ) : goals.length === 0 ? (
              <Text className="text-center text-gray-500 dark:text-gray-400">
                No goals yet.
              </Text>
            ) : (
              goals.map((goal, index) => (
                <Pressable
                  key={goal.id ?? index}
                  onPress={() =>
                    router.push({
                      pathname: "/goal-details",
                      params: {
                        id: goal.id,
                        title: goal.title,
                        status: goal.status,
                      },
                    })
                  }
                >
                  <Card
                    key={goal.id}
                    className="w-full mb-2 border border-[#58C852] rounded-xl dark:border-[#58C852]"
                  >
                    <CardContent className="flex-row justify-between items-center">
                      <View>
                        
                        <View className="flex-row items-center justify-between">
                          <Text className="font-bold text-base text-black dark:text-white mr-3">
                            {goal.title}
                          </Text>

                          <Badge
                            className={`rounded-[20px] px-3
                              ${goal.status === "Pending" ? "bg-red-500" : ""}
                              ${goal.status === "Ongoing" ? "bg-orange-500" : ""}
                              ${goal.status === "Done" ? "bg-green-500" : ""}`}
                          >
                            <Text className="text-white font-semibold">{goal.status}</Text>
                          </Badge>
                        </View>


                        <Text className="text-sm text-red-600 dark:text-red-600">
                          Deadline: {goal.deadline}
                        </Text>
                      </View>
                      <TouchableOpacity onPress={() => handleDelete(goal.id)}>
                        <Trash2 size={22} color="#ef4444" />
                      </TouchableOpacity>
                    </CardContent>
                  </Card>
                </Pressable>
              ))
            )}
          </ScrollView>
        </View>
        
        <Dialog className="w-[90%]">
          <DialogTrigger asChild>
            <Button className="mb-5 h-14 w-full self-center items-center justify-center rounded-lg bg-[#58C852] active:bg-[#46a942]">
              <Text className="font-black text-white">+ Add Goal</Text>
            </Button>
          </DialogTrigger>

          <DialogContent className="rounded-2xl border border-[#58C852] bg-white dark:bg-neutral-900 p-5 w-[100%] self-center">
            <DialogHeader className="w-auto">
              <Text className="mb-4 text-lg font-bold text-[#58C852]">Add Goal</Text>
            </DialogHeader>

            <Input
              placeholder="Title"
              placeholderTextColor="#9ca3af"
              value={title}
              onChangeText={setTitle}
              className="w-auto border-b border-[#58C852] text-black dark:text-white"
            />

            <Textarea
              placeholder="Goal Description"
              value={desc}
              onChangeText={setDesc}
              className="w-auto border-b border-[#58C852] text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
            />

            <Label className="mt-4 text-md font-medium text-[#58C852]">
              Due Date
            </Label>

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
              date={selectedDate || new Date()}
              classNames={{
                ...defaultClassNames 
              }}
              onChange={(params) => {
                setOpen(false);
                const actual = moment(params.date).format("MM/DD/YYYY");
                console.log(actual)
                setSelectedDate(actual);
              }}
            />
          </View>
        )}
           
            <DialogFooter className="flex-row justify-between w-full self-center mt-6">
              <DialogClose asChild>
                <Button variant="outline" className="border border-red-500 w-[40%]">
                  <Text className="text-red-500">Cancel</Text>
                </Button>
              </DialogClose>

              <DialogClose asChild>
                  <Button className="bg-[#58C852] w-[40%]" onPress={handleAddGoal}>
                <Text className="font-semibold text-white">Save</Text>
              </Button>
              </DialogClose>
              
            </DialogFooter>
          </DialogContent>
        </Dialog>


      </View>
    </>
  );
}

const THEME_ICONS = {
  light: SunIcon,
  dark: MoonStarIcon,
};

function ThemeToggle() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <>
      <Button
        onPressIn={toggleColorScheme}
        size="icon"
        variant="ghost"
        className="rounded-full web:mx-4">
        <Icon as={THEME_ICONS[colorScheme ?? 'light']} className="size-5" />
      </Button>

      <Button
        onPress={() => router.push('/payment')} // redirect to payment page
        size="icon"
        variant="ghost"
        className="rounded-full web:mx-4"
      >
        <Icon as={Crown} className="size-5 text-[#58C852]" />
      </Button>
    </>
  );
}
