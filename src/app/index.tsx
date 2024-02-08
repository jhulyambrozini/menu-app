import { CategoryButton } from '@/components/category-button';
import { Header } from '@/components/header';
import { CATEGORIES } from '@/utils/data/products';
import { useState } from 'react';
import { View, FlatList } from 'react-native';

export default function Home() {
  const [category, setCategory] = useState(CATEGORIES[0]);

  return (
    <View className="flex-1 pt-16">
      <Header title="Faça seu pedido" itemsCartQuantity={1} />
      <FlatList
        data={CATEGORIES}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <CategoryButton
            title={item}
            isSelected={item == category}
            onPress={() => setCategory(item)}
          />
        )}
        horizontal
        className="mx-h-10 mt-5"
        contentContainerStyle={{ gap: 12, paddingHorizontal: 20 }}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}
