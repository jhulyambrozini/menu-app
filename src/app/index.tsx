import { CategoryButton } from '@/components/category-button';
import { Header } from '@/components/header';
import { Product } from '@/components/product';
import { CATEGORIES, MENU } from '@/utils/data/products';
import { useRef, useState } from 'react';
import { View, FlatList, SectionList, Text } from 'react-native';

export default function Home() {
  const [category, setCategory] = useState(CATEGORIES[0]);

  const sectionListRef = useRef<SectionList>(null);

  function handleCategorySelect(selectedCategory: string) {
    setCategory(selectedCategory);

    const sectionIndex = CATEGORIES.findIndex(cat => cat === selectedCategory);

    if (sectionListRef.current) {
      sectionListRef.current.scrollToLocation({
        animated: true,
        sectionIndex,
        itemIndex: 0,
      });
    }
  }

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
            onPress={() => handleCategorySelect(item)}
          />
        )}
        horizontal
        className="h-20 mt-5"
        contentContainerStyle={{ gap: 12, paddingHorizontal: 20 }}
        showsHorizontalScrollIndicator={false}
      />

      <SectionList
        ref={sectionListRef}
        sections={MENU}
        keyExtractor={item => item.id}
        stickySectionHeadersEnabled={false}
        renderItem={({ item }) => <Product data={item} />}
        renderSectionHeader={({ section: { title } }) => (
          <Text className="text-xl text-white font-heading mt-8 mb-3">
            {title}
          </Text>
        )}
        className="p-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
}
