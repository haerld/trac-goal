import { View, Text, Image  } from 'react-native';
import { Stack } from 'expo-router';
import { Button } from '@/components/ui/button';
import { Crown } from 'lucide-react-native';
import { Icon } from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Label } from '@rn-primitives/select';

export default function PaymentScreen() {
    
  return (
    <>
      <Stack.Screen 
        options={{
          title: 'Go Pro',
          headerBackTitle: 'Back',
          headerTintColor: '#58C852',
        }}
      />
      <View className="flex-1 w-full justify-start items-center bg-white dark:bg-neutral-900 p-5">
            <View className="flex-row items-center mb-4">
                <Text className="text-lg font-bold text-[#58C852]">
                    Upgrade to Pro
                </Text>
                <Icon as={Crown} className="size-5 text-[#58C852] ml-2" />
            </View>


            <Text className="text-center text-gray-600 dark:text-gray-400 mb-6">
            Unlock premium features by upgrading to the Pro version.
            </Text>

            <View className="flex-1 w-full bg-white dark:bg-neutral-900 ">
                <Text className="self-center text-xl font-bold text-black dark:text-white mb-3">
                Complete Your Payment
                </Text>

                <View className="flex-row justify-center space-x-4 mb-6">
                    <Image source={require('@/assets/visa.png')} className="w-16 h-10" resizeMode="contain" />
                    <Image source={require('@/assets/mastercard.png')} className="w-16 h-10" resizeMode="contain" />
                    <Image source={require('@/assets/amex.png')} className="w-16 h-10" resizeMode="contain" />
                </View>

                <Text className="self-center text-lg font-semibold text-[#58C852] mb-2">Card Details</Text>

                <Label className="text-[#58C852] mb-1">Card Number</Label>
                <Input placeholder="1234 5678 9012 3456" className="mb-4" />

                <View className="flex-row justify-between space-x-2 mb-4 gap-3">
                <View className="flex-1">
                    <Label className="text-[#58C852] mb-1">Expiry</Label>
                    <Input placeholder="MM/YY" />
                </View>
                <View className="flex-1">
                    <Label className="text-[#58C852] mb-1">CVC</Label>
                    <Input placeholder="***" />
                </View>
                </View>

                <Text className="text-lg font-semibold text-black dark:text-white mb-2">Billing Details</Text>
                <Label className="text-[#58C852] mb-1">Name on Card</Label>
                <Input placeholder="John Doe" className="mb-4" />
                <Label className="text-[#58C852] mb-1">Email</Label>
                <Input placeholder="john@example.com" className="mb-4" />

                <View className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-6">
                <View className="flex-row justify-between mb-2">
                    <Text className="text-black dark:text-white">Subtotal</Text>
                    <Text className="text-black dark:text-white">$50.00</Text>
                </View>
                <View className="flex-row justify-between mb-2">
                    <Text className="text-black dark:text-white">Tax</Text>
                    <Text className="text-black dark:text-white">$5.00</Text>
                </View>
                <View className="flex-row justify-between font-bold text-black dark:text-white">
                    <Text className="font-semibold text-black dark:text-white">Total</Text>
                    <Text className="font-semibold text-black dark:text-white">$55.00</Text>
                </View>
                </View>

                <Button className="bg-[#58C852] w-full rounded-lg mb-10">
                <Text className="text-white font-bold text-center">Pay $55.00</Text>
                </Button>
            </View>
      </View>
    </>)};