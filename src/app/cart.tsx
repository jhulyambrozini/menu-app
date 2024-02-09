import { Header } from '@/components/header';
import { useCartSore } from '@/stores/cart-store';
import { Alert, Linking, ScrollView, Text, View } from 'react-native';
import { Product } from '@/components/product';
import { formatCurrency } from '@/utils/data/functions/format-currency';
import { Input } from '@/components/input';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button } from '@/components/button';
import { Feather } from '@expo/vector-icons';
import { LinkButton } from '@/components/link-button';
import { ProductProps } from '@/utils/data/products';
import { useState } from 'react';
import { useNavigation } from 'expo-router';

const PHONE_NUMBER = '';

export default function Cart() {
  const cartSore = useCartSore();
  const [address, setAddress] = useState('');
  const navigation = useNavigation();

  const total = formatCurrency(
    cartSore.products.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    )
  );

  function handleRemoveProduct(product: ProductProps) {
    Alert.alert('Remover', `Deseja remover ${product.title} do carrinho?`, [
      {
        text: 'Cancelar',
      },
      {
        text: 'Remover',
        onPress: () => cartSore.remove(product.id),
      },
    ]);
  }

  function handleOrder() {
    if (address.trim().length === 0) {
      return Alert.alert('Pedido', 'Informe os dados da entrega.');
    }

    const products = cartSore.products
      .map(product => `\n ${product.quantity} ${product.title}`)
      .join('');

    const message = `
    NOVO PEDIDO
    \n Entregar em: ${address}

  Lanches:
    ${products}

    \n Valor total: ${total}
    `;

    Linking.openURL(
      `http://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${message}`
    );

    cartSore.clear();
    navigation.goBack();
  }

  return (
    <View className="flex-1 pt-16">
      <Header title="Seu carrinho" />

      <KeyboardAwareScrollView>
        <ScrollView className="p-5">
          <View className="flex-1">
            {cartSore.products.length > 0 ? (
              <View className="border-b border-slate-700">
                {cartSore.products.map(product => (
                  <Product
                    key={product.id}
                    data={product}
                    onPress={() => handleRemoveProduct(product)}
                  />
                ))}
              </View>
            ) : (
              <Text className="font-body text-slate-400 text-center my-8">
                Seu carrinho está vazio.
              </Text>
            )}

            <View className="flex-row gap-2 items-center mt-5 mb-4 flex-1">
              <Text className="text-white text-xl font-subtitle">Total: </Text>
              <Text className="text-lime-400 text-2xl font-heading">
                {total}
              </Text>
            </View>
            <Input
              placeholder="Informe o endereço de entrega com rua, bairro, CEP, número completo e complemento..."
              onChangeText={setAddress}
              onSubmitEditing={handleOrder}
              blurOnSubmit={true}
              returnKeyType="next"
            />
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>

      <View className="gap-5 p-5">
        <Button onPress={handleOrder}>
          <Button.Text>Enviar pedido</Button.Text>
          <Button.Icon>
            <Feather name="arrow-right-circle" size={20} />
          </Button.Icon>
        </Button>

        <LinkButton title="Voltar ao cardápio" href="/" />
      </View>
    </View>
  );
}
