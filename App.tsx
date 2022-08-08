import React, { FC, useState } from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { Details, Main } from './components';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

const App: FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home">
          {() => (
            <Main activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="Details"
          options={{ presentation: 'transparentModal' }}
        >
          {() => <Details activeDataIndex={activeIndex} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
