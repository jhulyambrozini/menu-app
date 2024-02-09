import { CategoryButton } from '@/components/category-button';
import { Header } from '@/components/header';
import { Product } from '@/components/product';
import { useCartSore } from '@/stores/cart-store';
import { CATEGORIES, MENU } from '@/utils/data/products';
import { Link } from 'expo-router';
import { useRef, useState } from 'react';
import { View, FlatList, SectionList, Text } from 'react-native';

export default function Home() {
  const cartStore = useCartSore();

  const [category, setCategory] = useState(CATEGORIES[0]);

  const sectionListRef = useRef<SectionList>(null);

  const cartQuantity = cartStore.products.reduce(
    (total, product) => total + product.quantity,
    0
  );

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
      <Header title="Faça seu pedido" itemsCartQuantity={cartQuantity} />

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
        renderItem={({ item }) => (
          <Link href={`/product/${item.id}`} asChild>
            <Product data={item} />
          </Link>
        )}
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
